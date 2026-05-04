import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createTextVNode as a, createVNode as o, customRef as s, defineComponent as c, getCurrentInstance as l, h as u, markRaw as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, openBlock as g, ref as _, renderList as v, resolveComponent as y, toDisplayString as b, unref as x, vModelCheckbox as S, vModelDynamic as C, vModelSelect as w, vModelText as T, vShow as E, watchEffect as ee, withDirectives as D, withKeys as te, withModifiers as O } from "vue";
//#region \0rolldown/runtime.js
var ne = Object.defineProperty, re = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ie = (e, t) => {
	let n = {};
	for (var r in e) ne(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || ne(n, Symbol.toStringTag, { value: "Module" }), n;
}, ae = "bottom", oe = "right", k = "left", A = "auto", j = [
	"top",
	ae,
	oe,
	k
], M = "start", N = "clippingParents", se = "viewport", ce = "popper", le = "reference", ue = /* @__PURE__ */ j.reduce(function(e, t) {
	return e.concat([t + "-" + M, t + "-end"]);
}, []), de = /* @__PURE__ */ [].concat(j, [A]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + M,
		t + "-end"
	]);
}, []), P = "beforeRead", fe = "read", pe = "afterRead", me = "beforeMain", he = "main", ge = "afterMain", _e = "beforeWrite", ve = "write", ye = "afterWrite", be = [
	P,
	fe,
	pe,
	me,
	he,
	ge,
	_e,
	ve,
	ye
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
function L(e) {
	return e instanceof I(e).Element || e instanceof Element;
}
function xe(e) {
	return e instanceof I(e).HTMLElement || e instanceof HTMLElement;
}
function Se(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof I(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function Ce(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!xe(i) || !F(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function we(e) {
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
			!xe(r) || !F(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var Te = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: Ce,
	effect: we,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function Ee(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var De = Math.max, Oe = Math.min, ke = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function Ae() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function je() {
	return !/^((?!chrome|android).)*safari/i.test(Ae());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function Me(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && xe(e) && (i = e.offsetWidth > 0 && ke(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && ke(r.height) / e.offsetHeight || 1);
	var o = (L(e) ? I(e) : window).visualViewport, s = !je() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
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
function Ne(e) {
	var t = Me(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function Pe(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && Se(n)) {
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
function Fe(e) {
	return I(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Ie(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(F(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function Le(e) {
	return ((L(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function Re(e) {
	return F(e) === "html" ? e : e.assignedSlot || e.parentNode || (Se(e) ? e.host : null) || Le(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function ze(e) {
	return !xe(e) || Fe(e).position === "fixed" ? null : e.offsetParent;
}
function Be(e) {
	var t = /firefox/i.test(Ae());
	if (/Trident/i.test(Ae()) && xe(e) && Fe(e).position === "fixed") return null;
	var n = Re(e);
	for (Se(n) && (n = n.host); xe(n) && ["html", "body"].indexOf(F(n)) < 0;) {
		var r = Fe(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function Ve(e) {
	for (var t = I(e), n = ze(e); n && Ie(n) && Fe(n).position === "static";) n = ze(n);
	return n && (F(n) === "html" || F(n) === "body" && Fe(n).position === "static") ? t : n || Be(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function He(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function Ue(e, t, n) {
	return De(e, Oe(t, n));
}
function We(e, t, n) {
	var r = Ue(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function Ge() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function Ke(e) {
	return Object.assign({}, Ge(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function qe(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var Je = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Ke(typeof e == "number" ? qe(e, j) : e);
};
function Ye(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = Ee(n.placement), c = He(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = Je(i.padding, n), d = Ne(a), f = c === "y" ? "top" : k, p = c === "y" ? ae : oe, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = Ve(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = Ue(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function Xe(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Pe(t.elements.popper, r) && (t.elements.arrow = r));
}
var Ze = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: Ye,
	effect: Xe,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function Qe(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var $e = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function et(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: ke(n * i) / i || 0,
		y: ke(r * i) / i || 0
	};
}
function tt(e) {
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
		var S = Ve(n), C = "clientHeight", w = "clientWidth";
		if (S === I(n) && (S = Le(n), Fe(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = ae;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = oe;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var ee = Object.assign({ position: s }, l && $e), D = u === !0 ? et({
		x: p,
		y: h
	}, I(n)) : {
		x: p,
		y: h
	};
	if (p = D.x, h = D.y, c) {
		var te;
		return Object.assign({}, ee, (te = {}, te[b] = v ? "0" : "", te[y] = _ ? "0" : "", te.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", te));
	}
	return Object.assign({}, ee, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function nt(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, a = n.adaptive, o = a === void 0 ? !0 : a, s = n.roundOffsets, c = s === void 0 ? !0 : s, l = {
		placement: Ee(t.placement),
		variation: Qe(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, tt(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, tt(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var rt = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: nt,
	data: {}
}, it = { passive: !0 };
function at(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 ? !0 : i, o = r.resize, s = o === void 0 ? !0 : o, c = I(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, it);
	}), s && c.addEventListener("resize", n.update, it), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, it);
		}), s && c.removeEventListener("resize", n.update, it);
	};
}
var ot = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: at,
	data: {}
}, st = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ct(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return st[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var lt = {
	start: "end",
	end: "start"
};
function ut(e) {
	return e.replace(/start|end/g, function(e) {
		return lt[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function dt(e) {
	var t = I(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function ft(e) {
	return Me(Le(e)).left + dt(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function pt(e, t) {
	var n = I(e), r = Le(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = je();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + ft(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function mt(e) {
	var t = Le(e), n = dt(e), r = e.ownerDocument?.body, i = De(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = De(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + ft(e), s = -n.scrollTop;
	return Fe(r || t).direction === "rtl" && (o += De(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function ht(e) {
	var t = Fe(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function gt(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(F(e)) >= 0 ? e.ownerDocument.body : xe(e) && ht(e) ? e : gt(Re(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function _t(e, t) {
	t === void 0 && (t = []);
	var n = gt(e), r = n === e.ownerDocument?.body, i = I(n), a = r ? [i].concat(i.visualViewport || [], ht(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(_t(Re(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function vt(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function yt(e, t) {
	var n = Me(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function bt(e, t, n) {
	return t === "viewport" ? vt(pt(e, n)) : L(t) ? yt(t, n) : vt(mt(Le(e)));
}
function xt(e) {
	var t = _t(Re(e)), n = ["absolute", "fixed"].indexOf(Fe(e).position) >= 0 && xe(e) ? Ve(e) : e;
	return L(n) ? t.filter(function(e) {
		return L(e) && Pe(e, n) && F(e) !== "body";
	}) : [];
}
function St(e, t, n, r) {
	var i = t === "clippingParents" ? xt(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = bt(e, n, r);
		return t.top = De(i.top, t.top), t.right = Oe(i.right, t.right), t.bottom = Oe(i.bottom, t.bottom), t.left = De(i.left, t.left), t;
	}, bt(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Ct(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? Ee(r) : null, a = r ? Qe(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case ae:
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
	var l = i ? He(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case M:
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
function wt(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? N : s, l = n.rootBoundary, u = l === void 0 ? se : l, d = n.elementContext, f = d === void 0 ? ce : d, p = n.altBoundary, m = p === void 0 ? !1 : p, h = n.padding, g = h === void 0 ? 0 : h, _ = Ke(typeof g == "number" ? qe(g, j) : g), v = f === "popper" ? le : ce, y = e.rects.popper, b = e.elements[m ? v : f], x = St(L(b) ? b : b.contextElement || Le(e.elements.popper), c, u, o), S = Me(e.elements.reference), C = Ct({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = vt(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, ee = e.modifiersData.offset;
	if (f === "popper" && ee) {
		var D = ee[i];
		Object.keys(E).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			E[e] += D[n] * t;
		});
	}
	return E;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Tt(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? de : c, u = Qe(r), d = u ? s ? ue : ue.filter(function(e) {
		return Qe(e) === u;
	}) : j, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = wt(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[Ee(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function Et(e) {
	if (Ee(e) === "auto") return [];
	var t = ct(e);
	return [
		ut(e),
		t,
		ut(t)
	];
}
function Dt(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !0 : o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, g = t.options.placement, _ = Ee(g) === g, v = c || (_ || !m ? [ct(g)] : Et(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(Ee(n) === "auto" ? Tt(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], ee = Ee(E), D = Qe(E) === M, te = ["top", ae].indexOf(ee) >= 0, O = te ? "width" : "height", ne = wt(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), re = te ? D ? oe : k : D ? ae : "top";
			b[O] > x[O] && (re = ct(re));
			var ie = ct(re), A = [];
			if (a && A.push(ne[ee] <= 0), s && A.push(ne[re] <= 0, ne[ie] <= 0), A.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, A);
		}
		if (C) for (var j = m ? 3 : 1, N = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, se = j; se > 0 && N(se) !== "break"; se--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var Ot = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: Dt,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function kt(e, t, n) {
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
function At(e) {
	return [
		"top",
		oe,
		ae,
		k
	].some(function(t) {
		return e[t] >= 0;
	});
}
function jt(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = wt(t, { elementContext: "reference" }), s = wt(t, { altBoundary: !0 }), c = kt(o, r), l = kt(s, i, a), u = At(c), d = At(l);
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
var Mt = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: jt
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function Nt(e, t, n) {
	var r = Ee(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function Pt(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = de.reduce(function(e, n) {
		return e[n] = Nt(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var Ft = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: Pt
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function It(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Ct({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var Lt = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: It,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function Rt(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function zt(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !1 : o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 ? !0 : f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = wt(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = Ee(t.placement), v = Qe(t.placement), y = !v, b = He(_), x = Rt(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
		mainAxis: T,
		altAxis: T
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, T), ee = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, D = {
		x: 0,
		y: 0
	};
	if (S) {
		if (a) {
			var te = b === "y" ? "top" : k, O = b === "y" ? ae : oe, ne = b === "y" ? "height" : "width", re = S[b], ie = re + g[te], A = re - g[O], j = p ? -w[ne] / 2 : 0, M = v === "start" ? C[ne] : w[ne], N = v === "start" ? -w[ne] : -C[ne], se = t.elements.arrow, ce = p && se ? Ne(se) : {
				width: 0,
				height: 0
			}, le = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ge(), ue = le[te], de = le[O], P = Ue(0, C[ne], ce[ne]), fe = y ? C[ne] / 2 - j - P - ue - E.mainAxis : M - P - ue - E.mainAxis, pe = y ? -C[ne] / 2 + j + P + de + E.mainAxis : N + P + de + E.mainAxis, me = t.elements.arrow && Ve(t.elements.arrow), he = me ? b === "y" ? me.clientTop || 0 : me.clientLeft || 0 : 0, ge = ee?.[b] ?? 0, _e = re + fe - ge - he, ve = re + pe - ge, ye = Ue(p ? Oe(ie, _e) : ie, re, p ? De(A, ve) : A);
			S[b] = ye, D[b] = ye - re;
		}
		if (s) {
			var be = b === "x" ? "top" : k, F = b === "x" ? ae : oe, I = S[x], L = x === "y" ? "height" : "width", xe = I + g[be], Se = I - g[F], Ce = ["top", k].indexOf(_) !== -1, we = ee?.[x] ?? 0, Te = Ce ? xe : I - C[L] - w[L] - we + E.altAxis, ke = Ce ? I + C[L] + w[L] - we - E.altAxis : Se, Ae = p && Ce ? We(Te, I, ke) : Ue(p ? Te : xe, I, p ? ke : Se);
			S[x] = Ae, D[x] = Ae - I;
		}
		t.modifiersData[r] = D;
	}
}
var Bt = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: zt,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function Vt(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function Ht(e) {
	return e === I(e) || !xe(e) ? dt(e) : Vt(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function Ut(e) {
	var t = e.getBoundingClientRect(), n = ke(t.width) / e.offsetWidth || 1, r = ke(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function Wt(e, t, n) {
	n === void 0 && (n = !1);
	var r = xe(t), i = xe(t) && Ut(t), a = Le(t), o = Me(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((F(t) !== "body" || ht(a)) && (s = Ht(t)), xe(t) ? (c = Me(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = ft(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function Gt(e) {
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
function Kt(e) {
	var t = Gt(e);
	return be.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function qt(e) {
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
function Jt(e) {
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
var Yt = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function Xt() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function Zt(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? Yt : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, Yt, a),
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
					reference: L(e) ? _t(e) : e.contextElement ? _t(e.contextElement) : [],
					popper: _t(t)
				};
				var s = Kt(Jt([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (Xt(t, n)) {
						i.rects = {
							reference: Wt(t, Ve(n), i.options.strategy === "fixed"),
							popper: Ne(n)
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
			update: qt(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!Xt(e, t)) return c;
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
var Qt = /* @__PURE__ */ Zt(), $t = /* @__PURE__ */ Zt({ defaultModifiers: [
	ot,
	Lt,
	rt,
	Te
] }), en = /* @__PURE__ */ Zt({ defaultModifiers: [
	ot,
	Lt,
	rt,
	Te,
	Ft,
	Ot,
	Bt,
	Ze,
	Mt
] }), tn = /* @__PURE__ */ ie({
	afterMain: () => ge,
	afterRead: () => pe,
	afterWrite: () => ye,
	applyStyles: () => Te,
	arrow: () => Ze,
	auto: () => A,
	basePlacements: () => j,
	beforeMain: () => me,
	beforeRead: () => P,
	beforeWrite: () => _e,
	bottom: () => ae,
	clippingParents: () => N,
	computeStyles: () => rt,
	createPopper: () => en,
	createPopperBase: () => Qt,
	createPopperLite: () => $t,
	detectOverflow: () => wt,
	end: () => "end",
	eventListeners: () => ot,
	flip: () => Ot,
	hide: () => Mt,
	left: () => k,
	main: () => he,
	modifierPhases: () => be,
	offset: () => Ft,
	placements: () => de,
	popper: () => ce,
	popperGenerator: () => Zt,
	popperOffsets: () => Lt,
	preventOverflow: () => Bt,
	read: () => fe,
	reference: () => le,
	right: () => oe,
	start: () => M,
	top: () => "top",
	variationPlacements: () => ue,
	viewport: () => se,
	write: () => ve
}), nn = /* @__PURE__ */ new Map(), rn = {
	set(e, t, n) {
		nn.has(e) || nn.set(e, /* @__PURE__ */ new Map());
		let r = nn.get(e);
		if (!r.has(t) && r.size !== 0) {
			console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
			return;
		}
		r.set(t, n);
	},
	get(e, t) {
		return nn.has(e) && nn.get(e).get(t) || null;
	},
	remove(e, t) {
		if (!nn.has(e)) return;
		let n = nn.get(e);
		n.delete(t), n.size === 0 && nn.delete(e);
	}
}, an = 1e6, on = 1e3, sn = "transitionend", cn = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)), e), ln = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), un = (e) => {
	do
		e += Math.floor(Math.random() * an);
	while (document.getElementById(e));
	return e;
}, dn = (e) => {
	if (!e) return 0;
	let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
	return !Number.parseFloat(t) && !Number.parseFloat(n) ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * on);
}, fn = (e) => {
	e.dispatchEvent(new Event(sn));
}, pn = (e) => !e || typeof e != "object" ? !1 : (e.jquery !== void 0 && (e = e[0]), e.nodeType !== void 0), mn = (e) => pn(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(cn(e)) : null, hn = (e) => {
	if (!pn(e) || e.getClientRects().length === 0) return !1;
	let t = getComputedStyle(e).getPropertyValue("visibility") === "visible", n = e.closest("details:not([open])");
	if (!n) return t;
	if (n !== e) {
		let t = e.closest("summary");
		if (t && t.parentNode !== n || t === null) return !1;
	}
	return t;
}, gn = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : e.disabled === void 0 ? e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false" : e.disabled, _n = (e) => {
	if (!document.documentElement.attachShadow) return null;
	if (typeof e.getRootNode == "function") {
		let t = e.getRootNode();
		return t instanceof ShadowRoot ? t : null;
	}
	return e instanceof ShadowRoot ? e : e.parentNode ? _n(e.parentNode) : null;
}, vn = () => {}, yn = (e) => {
	e.offsetHeight;
}, bn = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, xn = [], Sn = (e) => {
	document.readyState === "loading" ? (xn.length || document.addEventListener("DOMContentLoaded", () => {
		for (let e of xn) e();
	}), xn.push(e)) : e();
}, Cn = () => document.documentElement.dir === "rtl", wn = (e) => {
	Sn(() => {
		let t = bn();
		/* istanbul ignore if */
		if (t) {
			let n = e.NAME, r = t.fn[n];
			t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
		}
	});
}, Tn = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, En = (e, t, n = !0) => {
	if (!n) {
		Tn(e);
		return;
	}
	let r = dn(t) + 5, i = !1, a = ({ target: n }) => {
		n === t && (i = !0, t.removeEventListener(sn, a), Tn(e));
	};
	t.addEventListener(sn, a), setTimeout(() => {
		i || fn(t);
	}, r);
}, Dn = (e, t, n, r) => {
	let i = e.length, a = e.indexOf(t);
	return a === -1 ? !n && r ? e[i - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + i) % i), e[Math.max(0, Math.min(a, i - 1))]);
}, On = /[^.]*(?=\..*)\.|.*/, kn = /\..*/, An = /::\d+$/, jn = {}, Mn = 1, Nn = {
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, Pn = new Set(/* @__PURE__ */ "click.dblclick.mouseup.mousedown.contextmenu.mousewheel.DOMMouseScroll.mouseover.mouseout.mousemove.selectstart.selectend.keydown.keypress.keyup.orientationchange.touchstart.touchmove.touchend.touchcancel.pointerdown.pointermove.pointerup.pointerleave.pointercancel.gesturestart.gesturechange.gestureend.focus.blur.change.reset.select.submit.focusin.focusout.load.unload.beforeunload.resize.move.DOMContentLoaded.readystatechange.error.abort.scroll".split("."));
function Fn(e, t) {
	return t && `${t}::${Mn++}` || e.uidEvent || Mn++;
}
function In(e) {
	let t = Fn(e);
	return e.uidEvent = t, jn[t] = jn[t] || {}, jn[t];
}
function Ln(e, t) {
	return function n(r) {
		return Gn(r, { delegateTarget: e }), n.oneOff && R.off(e, r.type, t), t.apply(e, [r]);
	};
}
function Rn(e, t, n) {
	return function r(i) {
		let a = e.querySelectorAll(t);
		for (let { target: o } = i; o && o !== this; o = o.parentNode) for (let s of a) if (s === o) return Gn(i, { delegateTarget: o }), r.oneOff && R.off(e, i.type, t, n), n.apply(o, [i]);
	};
}
function zn(e, t, n = null) {
	return Object.values(e).find((e) => e.callable === t && e.delegationSelector === n);
}
function Bn(e, t, n) {
	let r = typeof t == "string", i = r ? n : t || n, a = Wn(e);
	return Pn.has(a) || (a = e), [
		r,
		i,
		a
	];
}
function Vn(e, t, n, r, i) {
	if (typeof t != "string" || !e) return;
	let [a, o, s] = Bn(t, n, r);
	t in Nn && (o = ((e) => function(t) {
		if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t);
	})(o));
	let c = In(e), l = c[s] || (c[s] = {}), u = zn(l, o, a ? n : null);
	if (u) {
		u.oneOff = u.oneOff && i;
		return;
	}
	let d = Fn(o, t.replace(On, "")), f = a ? Rn(e, n, o) : Ln(e, o);
	f.delegationSelector = a ? n : null, f.callable = o, f.oneOff = i, f.uidEvent = d, l[d] = f, e.addEventListener(s, f, a);
}
function Hn(e, t, n, r, i) {
	let a = zn(t[n], r, i);
	a && (e.removeEventListener(n, a, !!i), delete t[n][a.uidEvent]);
}
function Un(e, t, n, r) {
	let i = t[n] || {};
	for (let [a, o] of Object.entries(i)) a.includes(r) && Hn(e, t, n, o.callable, o.delegationSelector);
}
function Wn(e) {
	return e = e.replace(kn, ""), Nn[e] || e;
}
var R = {
	on(e, t, n, r) {
		Vn(e, t, n, r, !1);
	},
	one(e, t, n, r) {
		Vn(e, t, n, r, !0);
	},
	off(e, t, n, r) {
		if (typeof t != "string" || !e) return;
		let [i, a, o] = Bn(t, n, r), s = o !== t, c = In(e), l = c[o] || {}, u = t.startsWith(".");
		if (a !== void 0) {
			if (!Object.keys(l).length) return;
			Hn(e, c, o, a, i ? n : null);
			return;
		}
		if (u) for (let n of Object.keys(c)) Un(e, c, n, t.slice(1));
		for (let [n, r] of Object.entries(l)) {
			let i = n.replace(An, "");
			(!s || t.includes(i)) && Hn(e, c, o, r.callable, r.delegationSelector);
		}
	},
	trigger(e, t, n) {
		if (typeof t != "string" || !e) return null;
		let r = bn(), i = t !== Wn(t), a = null, o = !0, s = !0, c = !1;
		i && r && (a = r.Event(t, n), r(e).trigger(a), o = !a.isPropagationStopped(), s = !a.isImmediatePropagationStopped(), c = a.isDefaultPrevented());
		let l = Gn(new Event(t, {
			bubbles: o,
			cancelable: !0
		}), n);
		return c && l.preventDefault(), s && e.dispatchEvent(l), l.defaultPrevented && a && a.preventDefault(), l;
	}
};
function Gn(e, t = {}) {
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
function Kn(e) {
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
function qn(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
var Jn = {
	setDataAttribute(e, t, n) {
		e.setAttribute(`data-bs-${qn(t)}`, n);
	},
	removeDataAttribute(e, t) {
		e.removeAttribute(`data-bs-${qn(t)}`);
	},
	getDataAttributes(e) {
		if (!e) return {};
		let t = {}, n = Object.keys(e.dataset).filter((e) => e.startsWith("bs") && !e.startsWith("bsConfig"));
		for (let r of n) {
			let n = r.replace(/^bs/, "");
			n = n.charAt(0).toLowerCase() + n.slice(1), t[n] = Kn(e.dataset[r]);
		}
		return t;
	},
	getDataAttribute(e, t) {
		return Kn(e.getAttribute(`data-bs-${qn(t)}`));
	}
}, Yn = class {
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
		let n = pn(t) ? Jn.getDataAttribute(t, "config") : {};
		return {
			...this.constructor.Default,
			...typeof n == "object" ? n : {},
			...pn(t) ? Jn.getDataAttributes(t) : {},
			...typeof e == "object" ? e : {}
		};
	}
	_typeCheckConfig(e, t = this.constructor.DefaultType) {
		for (let [n, r] of Object.entries(t)) {
			let t = e[n], i = pn(t) ? "element" : ln(t);
			if (!new RegExp(r).test(i)) throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${i}" but expected type "${r}".`);
		}
	}
}, Xn = "5.3.8", Zn = class extends Yn {
	constructor(e, t) {
		super(), e = mn(e), e && (this._element = e, this._config = this._getConfig(t), rn.set(this._element, this.constructor.DATA_KEY, this));
	}
	dispose() {
		rn.remove(this._element, this.constructor.DATA_KEY), R.off(this._element, this.constructor.EVENT_KEY);
		for (let e of Object.getOwnPropertyNames(this)) this[e] = null;
	}
	_queueCallback(e, t, n = !0) {
		En(e, t, n);
	}
	_getConfig(e) {
		return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	static getInstance(e) {
		return rn.get(mn(e), this.DATA_KEY);
	}
	static getOrCreateInstance(e, t = {}) {
		return this.getInstance(e) || new this(e, typeof t == "object" ? t : null);
	}
	static get VERSION() {
		return Xn;
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
}, Qn = (e) => {
	let t = e.getAttribute("data-bs-target");
	if (!t || t === "#") {
		let n = e.getAttribute("href");
		if (!n || !n.includes("#") && !n.startsWith(".")) return null;
		n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
	}
	return t ? t.split(",").map((e) => cn(e)).join(",") : null;
}, z = {
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
		return this.find(t, e).filter((e) => !gn(e) && hn(e));
	},
	getSelectorFromElement(e) {
		let t = Qn(e);
		return t && z.findOne(t) ? t : null;
	},
	getElementFromSelector(e) {
		let t = Qn(e);
		return t ? z.findOne(t) : null;
	},
	getMultipleElementsFromSelector(e) {
		let t = Qn(e);
		return t ? z.find(t) : [];
	}
}, $n = (e, t = "hide") => {
	let n = `click.dismiss${e.EVENT_KEY}`, r = e.NAME;
	R.on(document, n, `[data-bs-dismiss="${r}"]`, function(n) {
		if (["A", "AREA"].includes(this.tagName) && n.preventDefault(), gn(this)) return;
		let i = z.getElementFromSelector(this) || this.closest(`.${r}`);
		e.getOrCreateInstance(i)[t]();
	});
}, er = "alert", tr = ".bs.alert", nr = `close${tr}`, rr = `closed${tr}`, ir = "fade", ar = "show", or = class e extends Zn {
	static get NAME() {
		return er;
	}
	close() {
		if (R.trigger(this._element, nr).defaultPrevented) return;
		this._element.classList.remove(ar);
		let e = this._element.classList.contains(ir);
		this._queueCallback(() => this._destroyElement(), this._element, e);
	}
	_destroyElement() {
		this._element.remove(), R.trigger(this._element, rr), this.dispose();
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
$n(or, "close"), wn(or);
var sr = "button", cr = ".bs.button", lr = ".data-api", ur = "active", dr = "[data-bs-toggle=\"button\"]", fr = `click${cr}${lr}`, pr = class e extends Zn {
	static get NAME() {
		return sr;
	}
	toggle() {
		this._element.setAttribute("aria-pressed", this._element.classList.toggle(ur));
	}
	static jQueryInterface(t) {
		return this.each(function() {
			let n = e.getOrCreateInstance(this);
			t === "toggle" && n[t]();
		});
	}
};
R.on(document, fr, dr, (e) => {
	e.preventDefault();
	let t = e.target.closest(dr);
	pr.getOrCreateInstance(t).toggle();
}), wn(pr);
var mr = "swipe", hr = ".bs.swipe", gr = `touchstart${hr}`, _r = `touchmove${hr}`, vr = `touchend${hr}`, yr = `pointerdown${hr}`, br = `pointerup${hr}`, xr = "touch", Sr = "pen", Cr = "pointer-event", wr = 40, Tr = {
	endCallback: null,
	leftCallback: null,
	rightCallback: null
}, Er = {
	endCallback: "(function|null)",
	leftCallback: "(function|null)",
	rightCallback: "(function|null)"
}, Dr = class e extends Yn {
	constructor(t, n) {
		super(), this._element = t, !(!t || !e.isSupported()) && (this._config = this._getConfig(n), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
	}
	static get Default() {
		return Tr;
	}
	static get DefaultType() {
		return Er;
	}
	static get NAME() {
		return mr;
	}
	dispose() {
		R.off(this._element, hr);
	}
	_start(e) {
		if (!this._supportPointerEvents) {
			this._deltaX = e.touches[0].clientX;
			return;
		}
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX);
	}
	_end(e) {
		this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), Tn(this._config.endCallback);
	}
	_move(e) {
		this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
	}
	_handleSwipe() {
		let e = Math.abs(this._deltaX);
		if (e <= wr) return;
		let t = e / this._deltaX;
		this._deltaX = 0, t && Tn(t > 0 ? this._config.rightCallback : this._config.leftCallback);
	}
	_initEvents() {
		this._supportPointerEvents ? (R.on(this._element, yr, (e) => this._start(e)), R.on(this._element, br, (e) => this._end(e)), this._element.classList.add(Cr)) : (R.on(this._element, gr, (e) => this._start(e)), R.on(this._element, _r, (e) => this._move(e)), R.on(this._element, vr, (e) => this._end(e)));
	}
	_eventIsPointerPenTouch(e) {
		return this._supportPointerEvents && (e.pointerType === Sr || e.pointerType === xr);
	}
	static isSupported() {
		return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
	}
}, Or = "carousel", kr = ".bs.carousel", Ar = ".data-api", jr = "ArrowLeft", Mr = "ArrowRight", Nr = 500, Pr = "next", Fr = "prev", Ir = "left", Lr = "right", Rr = `slide${kr}`, zr = `slid${kr}`, Br = `keydown${kr}`, Vr = `mouseenter${kr}`, Hr = `mouseleave${kr}`, Ur = `dragstart${kr}`, Wr = `load${kr}${Ar}`, Gr = `click${kr}${Ar}`, Kr = "carousel", qr = "active", Jr = "slide", Yr = "carousel-item-end", Xr = "carousel-item-start", Zr = "carousel-item-next", Qr = "carousel-item-prev", $r = ".active", ei = ".carousel-item", ti = $r + ei, ni = ".carousel-item img", ri = ".carousel-indicators", ii = "[data-bs-slide], [data-bs-slide-to]", ai = "[data-bs-ride=\"carousel\"]", oi = {
	[jr]: Lr,
	[Mr]: Ir
}, si = {
	interval: 5e3,
	keyboard: !0,
	pause: "hover",
	ride: !1,
	touch: !0,
	wrap: !0
}, ci = {
	interval: "(number|boolean)",
	keyboard: "boolean",
	pause: "(string|boolean)",
	ride: "(boolean|string)",
	touch: "boolean",
	wrap: "boolean"
}, li = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = z.findOne(ri, this._element), this._addEventListeners(), this._config.ride === Kr && this.cycle();
	}
	static get Default() {
		return si;
	}
	static get DefaultType() {
		return ci;
	}
	static get NAME() {
		return Or;
	}
	next() {
		this._slide(Pr);
	}
	nextWhenVisible() {
		!document.hidden && hn(this._element) && this.next();
	}
	prev() {
		this._slide(Fr);
	}
	pause() {
		this._isSliding && fn(this._element), this._clearInterval();
	}
	cycle() {
		this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	}
	_maybeEnableCycle() {
		if (this._config.ride) {
			if (this._isSliding) {
				R.one(this._element, zr, () => this.cycle());
				return;
			}
			this.cycle();
		}
	}
	to(e) {
		let t = this._getItems();
		if (e > t.length - 1 || e < 0) return;
		if (this._isSliding) {
			R.one(this._element, zr, () => this.to(e));
			return;
		}
		let n = this._getItemIndex(this._getActive());
		if (n === e) return;
		let r = e > n ? Pr : Fr;
		this._slide(r, t[e]);
	}
	dispose() {
		this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.defaultInterval = e.interval, e;
	}
	_addEventListeners() {
		this._config.keyboard && R.on(this._element, Br, (e) => this._keydown(e)), this._config.pause === "hover" && (R.on(this._element, Vr, () => this.pause()), R.on(this._element, Hr, () => this._maybeEnableCycle())), this._config.touch && Dr.isSupported() && this._addTouchEventListeners();
	}
	_addTouchEventListeners() {
		for (let e of z.find(ni, this._element)) R.on(e, Ur, (e) => e.preventDefault());
		let e = {
			leftCallback: () => this._slide(this._directionToOrder(Ir)),
			rightCallback: () => this._slide(this._directionToOrder(Lr)),
			endCallback: () => {
				this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Nr + this._config.interval));
			}
		};
		this._swipeHelper = new Dr(this._element, e);
	}
	_keydown(e) {
		if (/input|textarea/i.test(e.target.tagName)) return;
		let t = oi[e.key];
		t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
	}
	_getItemIndex(e) {
		return this._getItems().indexOf(e);
	}
	_setActiveIndicatorElement(e) {
		if (!this._indicatorsElement) return;
		let t = z.findOne($r, this._indicatorsElement);
		t.classList.remove(qr), t.removeAttribute("aria-current");
		let n = z.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
		n && (n.classList.add(qr), n.setAttribute("aria-current", "true"));
	}
	_updateInterval() {
		let e = this._activeElement || this._getActive();
		if (!e) return;
		let t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
		this._config.interval = t || this._config.defaultInterval;
	}
	_slide(e, t = null) {
		if (this._isSliding) return;
		let n = this._getActive(), r = e === Pr, i = t || Dn(this._getItems(), n, r, this._config.wrap);
		if (i === n) return;
		let a = this._getItemIndex(i), o = (t) => R.trigger(this._element, t, {
			relatedTarget: i,
			direction: this._orderToDirection(e),
			from: this._getItemIndex(n),
			to: a
		});
		if (o(Rr).defaultPrevented || !n || !i) return;
		let s = !!this._interval;
		this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = i;
		let c = r ? Xr : Yr, l = r ? Zr : Qr;
		i.classList.add(l), yn(i), n.classList.add(c), i.classList.add(c), this._queueCallback(() => {
			i.classList.remove(c, l), i.classList.add(qr), n.classList.remove(qr, l, c), this._isSliding = !1, o(zr);
		}, n, this._isAnimated()), s && this.cycle();
	}
	_isAnimated() {
		return this._element.classList.contains(Jr);
	}
	_getActive() {
		return z.findOne(ti, this._element);
	}
	_getItems() {
		return z.find(ei, this._element);
	}
	_clearInterval() {
		this._interval &&= (clearInterval(this._interval), null);
	}
	_directionToOrder(e) {
		return Cn() ? e === Ir ? Fr : Pr : e === Ir ? Pr : Fr;
	}
	_orderToDirection(e) {
		return Cn() ? e === Fr ? Ir : Lr : e === Fr ? Lr : Ir;
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
R.on(document, Gr, ii, function(e) {
	let t = z.getElementFromSelector(this);
	if (!t || !t.classList.contains(Kr)) return;
	e.preventDefault();
	let n = li.getOrCreateInstance(t), r = this.getAttribute("data-bs-slide-to");
	if (r) {
		n.to(r), n._maybeEnableCycle();
		return;
	}
	if (Jn.getDataAttribute(this, "slide") === "next") {
		n.next(), n._maybeEnableCycle();
		return;
	}
	n.prev(), n._maybeEnableCycle();
}), R.on(window, Wr, () => {
	let e = z.find(ai);
	for (let t of e) li.getOrCreateInstance(t);
}), wn(li);
var ui = "collapse", di = ".bs.collapse", fi = ".data-api", pi = `show${di}`, mi = `shown${di}`, hi = `hide${di}`, gi = `hidden${di}`, _i = `click${di}${fi}`, vi = "show", yi = "collapse", bi = "collapsing", xi = "collapsed", Si = `:scope .${yi} .${yi}`, Ci = "collapse-horizontal", wi = "width", Ti = "height", Ei = ".collapse.show, .collapse.collapsing", Di = "[data-bs-toggle=\"collapse\"]", Oi = {
	parent: null,
	toggle: !0
}, ki = {
	parent: "(null|element)",
	toggle: "boolean"
}, Ai = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._isTransitioning = !1, this._triggerArray = [];
		let n = z.find(Di);
		for (let e of n) {
			let t = z.getSelectorFromElement(e), n = z.find(t).filter((e) => e === this._element);
			t !== null && n.length && this._triggerArray.push(e);
		}
		this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
	}
	static get Default() {
		return Oi;
	}
	static get DefaultType() {
		return ki;
	}
	static get NAME() {
		return ui;
	}
	toggle() {
		this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (this._isTransitioning || this._isShown()) return;
		let t = [];
		if (this._config.parent && (t = this._getFirstLevelChildren(Ei).filter((e) => e !== this._element).map((t) => e.getOrCreateInstance(t, { toggle: !1 }))), t.length && t[0]._isTransitioning || R.trigger(this._element, pi).defaultPrevented) return;
		for (let e of t) e.hide();
		let n = this._getDimension();
		this._element.classList.remove(yi), this._element.classList.add(bi), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
		let r = () => {
			this._isTransitioning = !1, this._element.classList.remove(bi), this._element.classList.add(yi, vi), this._element.style[n] = "", R.trigger(this._element, mi);
		}, i = `scroll${n[0].toUpperCase() + n.slice(1)}`;
		this._queueCallback(r, this._element, !0), this._element.style[n] = `${this._element[i]}px`;
	}
	hide() {
		if (this._isTransitioning || !this._isShown() || R.trigger(this._element, hi).defaultPrevented) return;
		let e = this._getDimension();
		this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, yn(this._element), this._element.classList.add(bi), this._element.classList.remove(yi, vi);
		for (let e of this._triggerArray) {
			let t = z.getElementFromSelector(e);
			t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
		}
		this._isTransitioning = !0;
		let t = () => {
			this._isTransitioning = !1, this._element.classList.remove(bi), this._element.classList.add(yi), R.trigger(this._element, gi);
		};
		this._element.style[e] = "", this._queueCallback(t, this._element, !0);
	}
	_isShown(e = this._element) {
		return e.classList.contains(vi);
	}
	_configAfterMerge(e) {
		return e.toggle = !!e.toggle, e.parent = mn(e.parent), e;
	}
	_getDimension() {
		return this._element.classList.contains(Ci) ? wi : Ti;
	}
	_initializeChildren() {
		if (!this._config.parent) return;
		let e = this._getFirstLevelChildren(Di);
		for (let t of e) {
			let e = z.getElementFromSelector(t);
			e && this._addAriaAndCollapsedClass([t], this._isShown(e));
		}
	}
	_getFirstLevelChildren(e) {
		let t = z.find(Si, this._config.parent);
		return z.find(e, this._config.parent).filter((e) => !t.includes(e));
	}
	_addAriaAndCollapsedClass(e, t) {
		if (e.length) for (let n of e) n.classList.toggle(xi, !t), n.setAttribute("aria-expanded", t);
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
R.on(document, _i, Di, function(e) {
	(e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
	for (let e of z.getMultipleElementsFromSelector(this)) Ai.getOrCreateInstance(e, { toggle: !1 }).toggle();
}), wn(Ai);
var ji = "dropdown", Mi = ".bs.dropdown", Ni = ".data-api", Pi = "Escape", Fi = "Tab", Ii = "ArrowUp", Li = "ArrowDown", Ri = 2, zi = `hide${Mi}`, Bi = `hidden${Mi}`, Vi = `show${Mi}`, Hi = `shown${Mi}`, Ui = `click${Mi}${Ni}`, Wi = `keydown${Mi}${Ni}`, Gi = `keyup${Mi}${Ni}`, Ki = "show", qi = "dropup", Ji = "dropend", Yi = "dropstart", Xi = "dropup-center", Zi = "dropdown-center", Qi = "[data-bs-toggle=\"dropdown\"]:not(.disabled):not(:disabled)", $i = `${Qi}.${Ki}`, ea = ".dropdown-menu", ta = ".navbar", na = ".navbar-nav", ra = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", ia = Cn() ? "top-end" : "top-start", aa = Cn() ? "top-start" : "top-end", oa = Cn() ? "bottom-end" : "bottom-start", sa = Cn() ? "bottom-start" : "bottom-end", ca = Cn() ? "left-start" : "right-start", la = Cn() ? "right-start" : "left-start", ua = "top", da = "bottom", fa = {
	autoClose: !0,
	boundary: "clippingParents",
	display: "dynamic",
	offset: [0, 2],
	popperConfig: null,
	reference: "toggle"
}, pa = {
	autoClose: "(boolean|string)",
	boundary: "(string|element)",
	display: "string",
	offset: "(array|string|function)",
	popperConfig: "(null|object|function)",
	reference: "(string|element|object)"
}, ma = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = z.next(this._element, ea)[0] || z.prev(this._element, ea)[0] || z.findOne(ea, this._parent), this._inNavbar = this._detectNavbar();
	}
	static get Default() {
		return fa;
	}
	static get DefaultType() {
		return pa;
	}
	static get NAME() {
		return ji;
	}
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (gn(this._element) || this._isShown()) return;
		let e = { relatedTarget: this._element };
		if (!R.trigger(this._element, Vi, e).defaultPrevented) {
			if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(na)) for (let e of [].concat(...document.body.children)) R.on(e, "mouseover", vn);
			this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ki), this._element.classList.add(Ki), R.trigger(this._element, Hi, e);
		}
	}
	hide() {
		if (gn(this._element) || !this._isShown()) return;
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
		if (!R.trigger(this._element, zi, e).defaultPrevented) {
			if ("ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) R.off(e, "mouseover", vn);
			this._popper && this._popper.destroy(), this._menu.classList.remove(Ki), this._element.classList.remove(Ki), this._element.setAttribute("aria-expanded", "false"), Jn.removeDataAttribute(this._menu, "popper"), R.trigger(this._element, Bi, e);
		}
	}
	_getConfig(e) {
		if (e = super._getConfig(e), typeof e.reference == "object" && !pn(e.reference) && typeof e.reference.getBoundingClientRect != "function") throw TypeError(`${ji.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		return e;
	}
	_createPopper() {
		if (tn === void 0) throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
		let e = this._element;
		this._config.reference === "parent" ? e = this._parent : pn(this._config.reference) ? e = mn(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
		let t = this._getPopperConfig();
		this._popper = en(e, this._menu, t);
	}
	_isShown() {
		return this._menu.classList.contains(Ki);
	}
	_getPlacement() {
		let e = this._parent;
		if (e.classList.contains(Ji)) return ca;
		if (e.classList.contains(Yi)) return la;
		if (e.classList.contains(Xi)) return ua;
		if (e.classList.contains(Zi)) return da;
		let t = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
		return e.classList.contains(qi) ? t ? aa : ia : t ? sa : oa;
	}
	_detectNavbar() {
		return this._element.closest(ta) !== null;
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
		return (this._inNavbar || this._config.display === "static") && (Jn.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
			name: "applyStyles",
			enabled: !1
		}]), {
			...e,
			...Tn(this._config.popperConfig, [void 0, e])
		};
	}
	_selectMenuItem({ key: e, target: t }) {
		let n = z.find(ra, this._menu).filter((e) => hn(e));
		n.length && Dn(n, t, e === Li, !n.includes(t)).focus();
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
		if (t.button === Ri || t.type === "keyup" && t.key !== Fi) return;
		let n = z.find($i);
		for (let r of n) {
			let n = e.getInstance(r);
			if (!n || n._config.autoClose === !1) continue;
			let i = t.composedPath(), a = i.includes(n._menu);
			if (i.includes(n._element) || n._config.autoClose === "inside" && !a || n._config.autoClose === "outside" && a || n._menu.contains(t.target) && (t.type === "keyup" && t.key === Fi || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
			let o = { relatedTarget: n._element };
			t.type === "click" && (o.clickEvent = t), n._completeHide(o);
		}
	}
	static dataApiKeydownHandler(t) {
		let n = /input|textarea/i.test(t.target.tagName), r = t.key === Pi, i = [Ii, Li].includes(t.key);
		if (!i && !r || n && !r) return;
		t.preventDefault();
		let a = this.matches(Qi) ? this : z.prev(this, Qi)[0] || z.next(this, Qi)[0] || z.findOne(Qi, t.delegateTarget.parentNode), o = e.getOrCreateInstance(a);
		if (i) {
			t.stopPropagation(), o.show(), o._selectMenuItem(t);
			return;
		}
		o._isShown() && (t.stopPropagation(), o.hide(), a.focus());
	}
};
R.on(document, Wi, Qi, ma.dataApiKeydownHandler), R.on(document, Wi, ea, ma.dataApiKeydownHandler), R.on(document, Ui, ma.clearMenus), R.on(document, Gi, ma.clearMenus), R.on(document, Ui, Qi, function(e) {
	e.preventDefault(), ma.getOrCreateInstance(this).toggle();
}), wn(ma);
var ha = "backdrop", ga = "fade", _a = "show", va = `mousedown.bs.${ha}`, ya = {
	className: "modal-backdrop",
	clickCallback: null,
	isAnimated: !1,
	isVisible: !0,
	rootElement: "body"
}, ba = {
	className: "string",
	clickCallback: "(function|null)",
	isAnimated: "boolean",
	isVisible: "boolean",
	rootElement: "(element|string)"
}, xa = class extends Yn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null;
	}
	static get Default() {
		return ya;
	}
	static get DefaultType() {
		return ba;
	}
	static get NAME() {
		return ha;
	}
	show(e) {
		if (!this._config.isVisible) {
			Tn(e);
			return;
		}
		this._append();
		let t = this._getElement();
		this._config.isAnimated && yn(t), t.classList.add(_a), this._emulateAnimation(() => {
			Tn(e);
		});
	}
	hide(e) {
		if (!this._config.isVisible) {
			Tn(e);
			return;
		}
		this._getElement().classList.remove(_a), this._emulateAnimation(() => {
			this.dispose(), Tn(e);
		});
	}
	dispose() {
		this._isAppended &&= (R.off(this._element, va), this._element.remove(), !1);
	}
	_getElement() {
		if (!this._element) {
			let e = document.createElement("div");
			e.className = this._config.className, this._config.isAnimated && e.classList.add(ga), this._element = e;
		}
		return this._element;
	}
	_configAfterMerge(e) {
		return e.rootElement = mn(e.rootElement), e;
	}
	_append() {
		if (this._isAppended) return;
		let e = this._getElement();
		this._config.rootElement.append(e), R.on(e, va, () => {
			Tn(this._config.clickCallback);
		}), this._isAppended = !0;
	}
	_emulateAnimation(e) {
		En(e, this._getElement(), this._config.isAnimated);
	}
}, Sa = "focustrap", Ca = ".bs.focustrap", wa = `focusin${Ca}`, Ta = `keydown.tab${Ca}`, Ea = "Tab", Da = "forward", Oa = "backward", ka = {
	autofocus: !0,
	trapElement: null
}, Aa = {
	autofocus: "boolean",
	trapElement: "element"
}, ja = class extends Yn {
	constructor(e) {
		super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null;
	}
	static get Default() {
		return ka;
	}
	static get DefaultType() {
		return Aa;
	}
	static get NAME() {
		return Sa;
	}
	activate() {
		this._isActive ||= (this._config.autofocus && this._config.trapElement.focus(), R.off(document, Ca), R.on(document, wa, (e) => this._handleFocusin(e)), R.on(document, Ta, (e) => this._handleKeydown(e)), !0);
	}
	deactivate() {
		this._isActive && (this._isActive = !1, R.off(document, Ca));
	}
	_handleFocusin(e) {
		let { trapElement: t } = this._config;
		if (e.target === document || e.target === t || t.contains(e.target)) return;
		let n = z.focusableChildren(t);
		n.length === 0 ? t.focus() : this._lastTabNavDirection === Oa ? n[n.length - 1].focus() : n[0].focus();
	}
	_handleKeydown(e) {
		e.key === Ea && (this._lastTabNavDirection = e.shiftKey ? Oa : Da);
	}
}, Ma = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Na = ".sticky-top", Pa = "padding-right", Fa = "margin-right", Ia = class {
	constructor() {
		this._element = document.body;
	}
	getWidth() {
		let e = document.documentElement.clientWidth;
		return Math.abs(window.innerWidth - e);
	}
	hide() {
		let e = this.getWidth();
		this._disableOverFlow(), this._setElementAttributes(this._element, Pa, (t) => t + e), this._setElementAttributes(Ma, Pa, (t) => t + e), this._setElementAttributes(Na, Fa, (t) => t - e);
	}
	reset() {
		this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Pa), this._resetElementAttributes(Ma, Pa), this._resetElementAttributes(Na, Fa);
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
		n && Jn.setDataAttribute(e, t, n);
	}
	_resetElementAttributes(e, t) {
		this._applyManipulationCallback(e, (e) => {
			let n = Jn.getDataAttribute(e, t);
			if (n === null) {
				e.style.removeProperty(t);
				return;
			}
			Jn.removeDataAttribute(e, t), e.style.setProperty(t, n);
		});
	}
	_applyManipulationCallback(e, t) {
		if (pn(e)) {
			t(e);
			return;
		}
		for (let n of z.find(e, this._element)) t(n);
	}
}, La = "modal", Ra = ".bs.modal", za = ".data-api", Ba = "Escape", Va = `hide${Ra}`, Ha = `hidePrevented${Ra}`, Ua = `hidden${Ra}`, Wa = `show${Ra}`, Ga = `shown${Ra}`, Ka = `resize${Ra}`, qa = `click.dismiss${Ra}`, Ja = `mousedown.dismiss${Ra}`, Ya = `keydown.dismiss${Ra}`, Xa = `click${Ra}${za}`, Za = "modal-open", Qa = "fade", $a = "show", eo = "modal-static", to = ".modal.show", no = ".modal-dialog", ro = ".modal-body", io = "[data-bs-toggle=\"modal\"]", ao = {
	backdrop: !0,
	focus: !0,
	keyboard: !0
}, oo = {
	backdrop: "(boolean|string)",
	focus: "boolean",
	keyboard: "boolean"
}, so = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._dialog = z.findOne(no, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Ia(), this._addEventListeners();
	}
	static get Default() {
		return ao;
	}
	static get DefaultType() {
		return oo;
	}
	static get NAME() {
		return La;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || this._isTransitioning || R.trigger(this._element, Wa, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Za), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
	}
	hide() {
		!this._isShown || this._isTransitioning || R.trigger(this._element, Va).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove($a), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
	}
	dispose() {
		R.off(window, Ra), R.off(this._dialog, Ra), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	handleUpdate() {
		this._adjustDialog();
	}
	_initializeBackDrop() {
		return new xa({
			isVisible: !!this._config.backdrop,
			isAnimated: this._isAnimated()
		});
	}
	_initializeFocusTrap() {
		return new ja({ trapElement: this._element });
	}
	_showElement(e) {
		document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
		let t = z.findOne(ro, this._dialog);
		t && (t.scrollTop = 0), yn(this._element), this._element.classList.add($a), this._queueCallback(() => {
			this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, R.trigger(this._element, Ga, { relatedTarget: e });
		}, this._dialog, this._isAnimated());
	}
	_addEventListeners() {
		R.on(this._element, Ya, (e) => {
			if (e.key === Ba) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				this._triggerBackdropTransition();
			}
		}), R.on(window, Ka, () => {
			this._isShown && !this._isTransitioning && this._adjustDialog();
		}), R.on(this._element, Ja, (e) => {
			R.one(this._element, qa, (t) => {
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
			document.body.classList.remove(Za), this._resetAdjustments(), this._scrollBar.reset(), R.trigger(this._element, Ua);
		});
	}
	_isAnimated() {
		return this._element.classList.contains(Qa);
	}
	_triggerBackdropTransition() {
		if (R.trigger(this._element, Ha).defaultPrevented) return;
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._element.style.overflowY;
		t === "hidden" || this._element.classList.contains(eo) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(eo), this._queueCallback(() => {
			this._element.classList.remove(eo), this._queueCallback(() => {
				this._element.style.overflowY = t;
			}, this._dialog);
		}, this._dialog), this._element.focus());
	}
	_adjustDialog() {
		let e = this._element.scrollHeight > document.documentElement.clientHeight, t = this._scrollBar.getWidth(), n = t > 0;
		if (n && !e) {
			let e = Cn() ? "paddingLeft" : "paddingRight";
			this._element.style[e] = `${t}px`;
		}
		if (!n && e) {
			let e = Cn() ? "paddingRight" : "paddingLeft";
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
R.on(document, Xa, io, function(e) {
	let t = z.getElementFromSelector(this);
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), R.one(t, Wa, (e) => {
		e.defaultPrevented || R.one(t, Ua, () => {
			hn(this) && this.focus();
		});
	});
	let n = z.findOne(to);
	n && so.getInstance(n).hide(), so.getOrCreateInstance(t).toggle(this);
}), $n(so), wn(so);
var co = "offcanvas", lo = ".bs.offcanvas", uo = ".data-api", fo = `load${lo}${uo}`, po = "Escape", mo = "show", ho = "showing", go = "hiding", _o = "offcanvas-backdrop", vo = ".offcanvas.show", yo = `show${lo}`, bo = `shown${lo}`, xo = `hide${lo}`, So = `hidePrevented${lo}`, Co = `hidden${lo}`, wo = `resize${lo}`, To = `click${lo}${uo}`, Eo = `keydown.dismiss${lo}`, Do = "[data-bs-toggle=\"offcanvas\"]", Oo = {
	backdrop: !0,
	keyboard: !0,
	scroll: !1
}, ko = {
	backdrop: "(boolean|string)",
	keyboard: "boolean",
	scroll: "boolean"
}, Ao = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
	}
	static get Default() {
		return Oo;
	}
	static get DefaultType() {
		return ko;
	}
	static get NAME() {
		return co;
	}
	toggle(e) {
		return this._isShown ? this.hide() : this.show(e);
	}
	show(e) {
		this._isShown || R.trigger(this._element, yo, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || new Ia().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(ho), this._queueCallback(() => {
			(!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(mo), this._element.classList.remove(ho), R.trigger(this._element, bo, { relatedTarget: e });
		}, this._element, !0));
	}
	hide() {
		!this._isShown || R.trigger(this._element, xo).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(go), this._backdrop.hide(), this._queueCallback(() => {
			this._element.classList.remove(mo, go), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Ia().reset(), R.trigger(this._element, Co);
		}, this._element, !0));
	}
	dispose() {
		this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
	}
	_initializeBackDrop() {
		let e = () => {
			if (this._config.backdrop === "static") {
				R.trigger(this._element, So);
				return;
			}
			this.hide();
		}, t = !!this._config.backdrop;
		return new xa({
			className: _o,
			isVisible: t,
			isAnimated: !0,
			rootElement: this._element.parentNode,
			clickCallback: t ? e : null
		});
	}
	_initializeFocusTrap() {
		return new ja({ trapElement: this._element });
	}
	_addEventListeners() {
		R.on(this._element, Eo, (e) => {
			if (e.key === po) {
				if (this._config.keyboard) {
					this.hide();
					return;
				}
				R.trigger(this._element, So);
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
R.on(document, To, Do, function(e) {
	let t = z.getElementFromSelector(this);
	if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), gn(this)) return;
	R.one(t, Co, () => {
		hn(this) && this.focus();
	});
	let n = z.findOne(vo);
	n && n !== t && Ao.getInstance(n).hide(), Ao.getOrCreateInstance(t).toggle(this);
}), R.on(window, fo, () => {
	for (let e of z.find(vo)) Ao.getOrCreateInstance(e).show();
}), R.on(window, wo, () => {
	for (let e of z.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(e).position !== "fixed" && Ao.getOrCreateInstance(e).hide();
}), $n(Ao), wn(Ao);
var jo = {
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
}, Mo = new Set([
	"background",
	"cite",
	"href",
	"itemtype",
	"longdesc",
	"poster",
	"src",
	"xlink:href"
]), No = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Po = (e, t) => {
	let n = e.nodeName.toLowerCase();
	return t.includes(n) ? Mo.has(n) ? !!No.test(e.nodeValue) : !0 : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
};
function Fo(e, t, n) {
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
		for (let t of r) Po(t, i) || e.removeAttribute(t.nodeName);
	}
	return r.body.innerHTML;
}
var Io = "TemplateFactory", Lo = {
	allowList: jo,
	content: {},
	extraClass: "",
	html: !1,
	sanitize: !0,
	sanitizeFn: null,
	template: "<div></div>"
}, Ro = {
	allowList: "object",
	content: "object",
	extraClass: "(string|function)",
	html: "boolean",
	sanitize: "boolean",
	sanitizeFn: "(null|function)",
	template: "string"
}, zo = {
	entry: "(string|element|function|null)",
	selector: "(string|element)"
}, Bo = class extends Yn {
	constructor(e) {
		super(), this._config = this._getConfig(e);
	}
	static get Default() {
		return Lo;
	}
	static get DefaultType() {
		return Ro;
	}
	static get NAME() {
		return Io;
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
		}, zo);
	}
	_setContent(e, t, n) {
		let r = z.findOne(n, e);
		if (r) {
			if (t = this._resolvePossibleFunction(t), !t) {
				r.remove();
				return;
			}
			if (pn(t)) {
				this._putElementInTemplate(mn(t), r);
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
		return this._config.sanitize ? Fo(e, this._config.allowList, this._config.sanitizeFn) : e;
	}
	_resolvePossibleFunction(e) {
		return Tn(e, [void 0, this]);
	}
	_putElementInTemplate(e, t) {
		if (this._config.html) {
			t.innerHTML = "", t.append(e);
			return;
		}
		t.textContent = e.textContent;
	}
}, Vo = "tooltip", Ho = new Set([
	"sanitize",
	"allowList",
	"sanitizeFn"
]), Uo = "fade", Wo = "modal", Go = "show", Ko = ".tooltip-inner", qo = `.${Wo}`, Jo = "hide.bs.modal", Yo = "hover", Xo = "focus", Zo = "click", Qo = "manual", $o = "hide", es = "hidden", ts = "show", ns = "shown", rs = "inserted", is = "click", as = "focusin", ss = "focusout", cs = "mouseenter", ls = "mouseleave", us = {
	AUTO: "auto",
	TOP: "top",
	RIGHT: Cn() ? "left" : "right",
	BOTTOM: "bottom",
	LEFT: Cn() ? "right" : "left"
}, ds = {
	allowList: jo,
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
}, fs = {
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
}, ps = class e extends Zn {
	constructor(e, t) {
		if (tn === void 0) throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
		super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
	}
	static get Default() {
		return ds;
	}
	static get DefaultType() {
		return fs;
	}
	static get NAME() {
		return Vo;
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
		clearTimeout(this._timeout), R.off(this._element.closest(qo), Jo, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
	}
	show() {
		if (this._element.style.display === "none") throw Error("Please use show on visible elements");
		if (!(this._isWithContent() && this._isEnabled)) return;
		let e = R.trigger(this._element, this.constructor.eventName(ts)), t = (_n(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
		if (e.defaultPrevented || !t) return;
		this._disposePopper();
		let n = this._getTipElement();
		this._element.setAttribute("aria-describedby", n.getAttribute("id"));
		let { container: r } = this._config;
		if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(n), R.trigger(this._element, this.constructor.eventName(rs))), this._popper = this._createPopper(n), n.classList.add(Go), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) R.on(e, "mouseover", vn);
		this._queueCallback(() => {
			R.trigger(this._element, this.constructor.eventName(ns)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
		}, this.tip, this._isAnimated());
	}
	hide() {
		if (!(!this._isShown() || R.trigger(this._element, this.constructor.eventName($o)).defaultPrevented)) {
			if (this._getTipElement().classList.remove(Go), "ontouchstart" in document.documentElement) for (let e of [].concat(...document.body.children)) R.off(e, "mouseover", vn);
			this._activeTrigger[Zo] = !1, this._activeTrigger[Xo] = !1, this._activeTrigger[Yo] = !1, this._isHovered = null, this._queueCallback(() => {
				this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), R.trigger(this._element, this.constructor.eventName(es)));
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
		t.classList.remove(Uo, Go), t.classList.add(`bs-${this.constructor.NAME}-auto`);
		let n = un(this.constructor.NAME).toString();
		return t.setAttribute("id", n), this._isAnimated() && t.classList.add(Uo), t;
	}
	setContent(e) {
		this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
	}
	_getTemplateFactory(e) {
		return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new Bo({
			...this._config,
			content: e,
			extraClass: this._resolvePossibleFunction(this._config.customClass)
		}), this._templateFactory;
	}
	_getContentForTemplate() {
		return { [Ko]: this._getTitle() };
	}
	_getTitle() {
		return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
	}
	_initializeOnDelegatedTarget(e) {
		return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
	}
	_isAnimated() {
		return this._config.animation || this.tip && this.tip.classList.contains(Uo);
	}
	_isShown() {
		return this.tip && this.tip.classList.contains(Go);
	}
	_createPopper(e) {
		let t = us[Tn(this._config.placement, [
			this,
			e,
			this._element
		]).toUpperCase()];
		return en(this._element, e, this._getPopperConfig(t));
	}
	_getOffset() {
		let { offset: e } = this._config;
		return typeof e == "string" ? e.split(",").map((e) => Number.parseInt(e, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
	}
	_resolvePossibleFunction(e) {
		return Tn(e, [this._element, this._element]);
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
			...Tn(this._config.popperConfig, [void 0, t])
		};
	}
	_setListeners() {
		let e = this._config.trigger.split(" ");
		for (let t of e) if (t === "click") R.on(this._element, this.constructor.eventName(is), this._config.selector, (e) => {
			let t = this._initializeOnDelegatedTarget(e);
			t._activeTrigger[Zo] = !(t._isShown() && t._activeTrigger[Zo]), t.toggle();
		});
		else if (t !== Qo) {
			let e = t === Yo ? this.constructor.eventName(cs) : this.constructor.eventName(as), n = t === Yo ? this.constructor.eventName(ls) : this.constructor.eventName(ss);
			R.on(this._element, e, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusin" ? Xo : Yo] = !0, t._enter();
			}), R.on(this._element, n, this._config.selector, (e) => {
				let t = this._initializeOnDelegatedTarget(e);
				t._activeTrigger[e.type === "focusout" ? Xo : Yo] = t._element.contains(e.relatedTarget), t._leave();
			});
		}
		this._hideModalHandler = () => {
			this._element && this.hide();
		}, R.on(this._element.closest(qo), Jo, this._hideModalHandler);
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
		let t = Jn.getDataAttributes(this._element);
		for (let e of Object.keys(t)) Ho.has(e) && delete t[e];
		return e = {
			...t,
			...typeof e == "object" && e ? e : {}
		}, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
	}
	_configAfterMerge(e) {
		return e.container = e.container === !1 ? document.body : mn(e.container), typeof e.delay == "number" && (e.delay = {
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
wn(ps);
var ms = "popover", hs = ".popover-header", gs = ".popover-body", _s = {
	...ps.Default,
	content: "",
	offset: [0, 8],
	placement: "right",
	template: "<div class=\"popover\" role=\"tooltip\"><div class=\"popover-arrow\"></div><h3 class=\"popover-header\"></h3><div class=\"popover-body\"></div></div>",
	trigger: "click"
}, vs = {
	...ps.DefaultType,
	content: "(null|string|element|function)"
};
wn(class e extends ps {
	static get Default() {
		return _s;
	}
	static get DefaultType() {
		return vs;
	}
	static get NAME() {
		return ms;
	}
	_isWithContent() {
		return this._getTitle() || this._getContent();
	}
	_getContentForTemplate() {
		return {
			[hs]: this._getTitle(),
			[gs]: this._getContent()
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
var ys = "scrollspy", bs = ".bs.scrollspy", xs = ".data-api", Ss = `activate${bs}`, Cs = `click${bs}`, ws = `load${bs}${xs}`, Ts = "dropdown-item", Es = "active", Ds = "[data-bs-spy=\"scroll\"]", Os = "[href]", ks = ".nav, .list-group", As = ".nav-link", js = `${As}, .nav-item > ${As}, .list-group-item`, Ms = ".dropdown", Ns = ".dropdown-toggle", Ps = {
	offset: null,
	rootMargin: "0px 0px -25%",
	smoothScroll: !1,
	target: null,
	threshold: [
		.1,
		.5,
		1
	]
}, Fs = {
	offset: "(number|null)",
	rootMargin: "string",
	smoothScroll: "boolean",
	target: "element",
	threshold: "array"
}, Is = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
			visibleEntryTop: 0,
			parentScrollTop: 0
		}, this.refresh();
	}
	static get Default() {
		return Ps;
	}
	static get DefaultType() {
		return Fs;
	}
	static get NAME() {
		return ys;
	}
	refresh() {
		this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
		for (let e of this._observableSections.values()) this._observer.observe(e);
	}
	dispose() {
		this._observer.disconnect(), super.dispose();
	}
	_configAfterMerge(e) {
		return e.target = mn(e.target) || document.body, e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin, typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map((e) => Number.parseFloat(e))), e;
	}
	_maybeEnableSmoothScroll() {
		this._config.smoothScroll && (R.off(this._config.target, Cs), R.on(this._config.target, Cs, Os, (e) => {
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
		let e = z.find(Os, this._config.target);
		for (let t of e) {
			if (!t.hash || gn(t)) continue;
			let e = z.findOne(decodeURI(t.hash), this._element);
			hn(e) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e));
		}
	}
	_process(e) {
		this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(Es), this._activateParents(e), R.trigger(this._element, Ss, { relatedTarget: e }));
	}
	_activateParents(e) {
		if (e.classList.contains(Ts)) {
			z.findOne(Ns, e.closest(Ms)).classList.add(Es);
			return;
		}
		for (let t of z.parents(e, ks)) for (let e of z.prev(t, js)) e.classList.add(Es);
	}
	_clearActiveClass(e) {
		e.classList.remove(Es);
		let t = z.find(`${Os}.${Es}`, e);
		for (let e of t) e.classList.remove(Es);
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
R.on(window, ws, () => {
	for (let e of z.find(Ds)) Is.getOrCreateInstance(e);
}), wn(Is);
var Ls = "tab", Rs = ".bs.tab", zs = `hide${Rs}`, Bs = `hidden${Rs}`, Vs = `show${Rs}`, Hs = `shown${Rs}`, Us = `click${Rs}`, Ws = `keydown${Rs}`, Gs = `load${Rs}`, Ks = "ArrowLeft", qs = "ArrowRight", Js = "ArrowUp", Ys = "ArrowDown", Xs = "Home", Zs = "End", Qs = "active", $s = "fade", ec = "show", tc = "dropdown", nc = ".dropdown-toggle", rc = ".dropdown-menu", ic = `:not(${nc})`, ac = ".list-group, .nav, [role=\"tablist\"]", oc = ".nav-item, .list-group-item", sc = `.nav-link${ic}, .list-group-item${ic}, [role="tab"]${ic}`, cc = "[data-bs-toggle=\"tab\"], [data-bs-toggle=\"pill\"], [data-bs-toggle=\"list\"]", lc = `${sc}, ${cc}`, uc = `.${Qs}[data-bs-toggle="tab"], .${Qs}[data-bs-toggle="pill"], .${Qs}[data-bs-toggle="list"]`, dc = class e extends Zn {
	constructor(e) {
		super(e), this._parent = this._element.closest(ac), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), R.on(this._element, Ws, (e) => this._keydown(e)));
	}
	static get NAME() {
		return Ls;
	}
	show() {
		let e = this._element;
		if (this._elemIsActive(e)) return;
		let t = this._getActiveElem(), n = t ? R.trigger(t, zs, { relatedTarget: e }) : null;
		R.trigger(e, Vs, { relatedTarget: t }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(t, e), this._activate(e, t));
	}
	_activate(e, t) {
		e && (e.classList.add(Qs), this._activate(z.getElementFromSelector(e)), this._queueCallback(() => {
			if (e.getAttribute("role") !== "tab") {
				e.classList.add(ec);
				return;
			}
			e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), R.trigger(e, Hs, { relatedTarget: t });
		}, e, e.classList.contains($s)));
	}
	_deactivate(e, t) {
		e && (e.classList.remove(Qs), e.blur(), this._deactivate(z.getElementFromSelector(e)), this._queueCallback(() => {
			if (e.getAttribute("role") !== "tab") {
				e.classList.remove(ec);
				return;
			}
			e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), R.trigger(e, Bs, { relatedTarget: t });
		}, e, e.classList.contains($s)));
	}
	_keydown(t) {
		if (![
			Ks,
			qs,
			Js,
			Ys,
			Xs,
			Zs
		].includes(t.key)) return;
		t.stopPropagation(), t.preventDefault();
		let n = this._getChildren().filter((e) => !gn(e)), r;
		if ([Xs, Zs].includes(t.key)) r = n[t.key === Xs ? 0 : n.length - 1];
		else {
			let e = [qs, Ys].includes(t.key);
			r = Dn(n, t.target, e, !0);
		}
		r && (r.focus({ preventScroll: !0 }), e.getOrCreateInstance(r).show());
	}
	_getChildren() {
		return z.find(lc, this._parent);
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
		let t = z.getElementFromSelector(e);
		t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
	}
	_toggleDropDown(e, t) {
		let n = this._getOuterElement(e);
		if (!n.classList.contains(tc)) return;
		let r = (e, r) => {
			let i = z.findOne(e, n);
			i && i.classList.toggle(r, t);
		};
		r(nc, Qs), r(rc, ec), n.setAttribute("aria-expanded", t);
	}
	_setAttributeIfNotExists(e, t, n) {
		e.hasAttribute(t) || e.setAttribute(t, n);
	}
	_elemIsActive(e) {
		return e.classList.contains(Qs);
	}
	_getInnerElement(e) {
		return e.matches(lc) ? e : z.findOne(lc, e);
	}
	_getOuterElement(e) {
		return e.closest(oc) || e;
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
R.on(document, Us, cc, function(e) {
	["A", "AREA"].includes(this.tagName) && e.preventDefault(), !gn(this) && dc.getOrCreateInstance(this).show();
}), R.on(window, Gs, () => {
	for (let e of z.find(uc)) dc.getOrCreateInstance(e);
}), wn(dc);
var fc = "toast", pc = ".bs.toast", mc = `mouseover${pc}`, hc = `mouseout${pc}`, gc = `focusin${pc}`, _c = `focusout${pc}`, vc = `hide${pc}`, yc = `hidden${pc}`, bc = `show${pc}`, xc = `shown${pc}`, Sc = "fade", Cc = "hide", wc = "show", Tc = "showing", Ec = {
	animation: "boolean",
	autohide: "boolean",
	delay: "number"
}, Dc = {
	animation: !0,
	autohide: !0,
	delay: 5e3
}, Oc = class e extends Zn {
	constructor(e, t) {
		super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
	}
	static get Default() {
		return Dc;
	}
	static get DefaultType() {
		return Ec;
	}
	static get NAME() {
		return fc;
	}
	show() {
		R.trigger(this._element, bc).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add(Sc), this._element.classList.remove(Cc), yn(this._element), this._element.classList.add(wc, Tc), this._queueCallback(() => {
			this._element.classList.remove(Tc), R.trigger(this._element, xc), this._maybeScheduleHide();
		}, this._element, this._config.animation));
	}
	hide() {
		!this.isShown() || R.trigger(this._element, vc).defaultPrevented || (this._element.classList.add(Tc), this._queueCallback(() => {
			this._element.classList.add(Cc), this._element.classList.remove(Tc, wc), R.trigger(this._element, yc);
		}, this._element, this._config.animation));
	}
	dispose() {
		this._clearTimeout(), this.isShown() && this._element.classList.remove(wc), super.dispose();
	}
	isShown() {
		return this._element.classList.contains(wc);
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
		R.on(this._element, mc, (e) => this._onInteraction(e, !0)), R.on(this._element, hc, (e) => this._onInteraction(e, !1)), R.on(this._element, gc, (e) => this._onInteraction(e, !0)), R.on(this._element, _c, (e) => this._onInteraction(e, !1));
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
$n(Oc), wn(Oc);
//#endregion
//#region node_modules/mitt/dist/mitt.mjs
function kc(e) {
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
function Ac(e, t) {
	for (let n in t) n === "__proto__" || n === "constructor" || n === "prototype" || t[n] instanceof Object && n in e && Object.assign(t[n], Ac(e[n], t[n]));
	return Object.assign(e || {}, t);
}
function jc(e, t, n, r) {
	try {
		return typeof e == "function" ? e(t, n, r) : e;
	} catch (e) {
		return console.error(e), null;
	}
}
async function Mc(e) {
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
function Nc(e, t) {
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
var Pc = Date.now() ^ (typeof performance < "u" && performance.now ? performance.now() : 0) << 16;
function Fc() {
	return Pc ^= Pc << 13, Pc ^= Pc >>> 17, Pc ^= Pc << 5, (Pc >>> 0) / 4294967295;
}
function Ic(e = 16) {
	let t = Math.max(0, e), n = new Uint8Array(t);
	if (typeof crypto < "u" && crypto.getRandomValues) return crypto.getRandomValues(n), n;
	for (let e = 0; e < t; e++) n[e] = Math.floor(Fc() * 256);
	return n;
}
function Lc() {
	let e = Ic(4);
	return ((e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]) >>> 0) / 4294967295;
}
function Rc(e) {
	return !e || e <= 0 ? 0 : Math.floor(Lc() * e);
}
function zc(e = 12, t = "abcdefghijklmnopqrstuvwxyz0123456789") {
	let n = Ic(e), r = "", i = t.length;
	for (let e = 0; e < n.length; e++) r += t[n[e] % i];
	return r;
}
function Bc(e, t, n, r) {
	if (t.options ||= {}, t.options.headers || (t.options.headers = {}), e != "GET" && (t.options.headers["Content-Type"] || (t.options.headers["Content-Type"] = "application/json")), r && r.header) for (let e of Object.keys(r.header)) t.options.headers[e] = r.header[e];
	return t.options.body = void 0, t.options.method = e, n && Object.assign(t.options, n), t.debug && console.log("FETCH OPTIONS", t.options), t.options;
}
function Vc(e, t, n, r) {
	let i = !1, a = Object.assign({}, r || {});
	return r && (r.filter && (a.filter = JSON.stringify(r.filter)), r.order && (a.order = JSON.stringify(r.order)), i = Object.keys(a).length), t.url + (n ? "/" + n : "") + (i ? "?" + new URLSearchParams(a).toString() : "");
}
function Hc(e, t = "-") {
	return e.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}
function Uc(e) {
	let t = [];
	for (let n of e) t.push(Wc(n));
	return t;
}
function Wc(e, t = "", n = {}) {
	for (let r in e) {
		let i = t ? t + "." + r : r;
		typeof e[r] == "object" && !Array.isArray(e[r]) ? Wc(e[r], i, n) : n[i] = e[r];
	}
	return n;
}
function Gc(e) {
	let t = {};
	for (let n in e) {
		let r = n.split(".");
		r.reduce((t, i, a) => t[i] || (t[i] = isNaN(Number(r[a + 1])) ? r.length - 1 === a ? e[n] : {} : []), t);
	}
	return t;
}
function Kc(e, t, n, r) {
	let i = (e, t) => !e || !t ? e : e.replace(/{([^}]*)}/g, (e, n) => {
		let r = n.trim();
		return t[r] ? t[r] : "";
	});
	return !t || (r ||= document.documentElement.lang, !r || !t[r]) || !t[r][e] ? i(e, n) : i(t[r][e]);
}
function qc(e, t, n = ";") {
	return [t.map((e) => e.title ? e.title : e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(n), ...e.map((r) => t.map((t) => {
		let n = r[t.name];
		return t.template ? t.template(n, r, e) : n === void 0 ? "" : n;
	}).join(n))].join("\n");
}
function Jc(e, t = "export.csv") {
	e = "﻿" + e;
	let n = new Blob([e], { type: "text/csv;charset=utf-8;" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = t, i.click(), URL.revokeObjectURL(r);
}
function Yc(e) {
	return [...new Set(e)];
}
function Xc(e, t) {
	e.indexOf(t) >= 0 ? e.splice(e.indexOf(t), 1) : e.push(t);
}
function Zc(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 && e.push(n.value);
}
function Qc(e, t) {
	for (let n of t) e.indexOf(n.value) < 0 ? e.push(n.value) : e.splice(e.indexOf(n.value), 1);
}
function $c(e) {
	e.length = 0;
}
function el(e, t) {
	t <= 0 || t >= e.length || ([e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function tl(e, t) {
	t <= 0 || t >= e.length || (console.log(e[t - 1], e[t]), [e[t - 1], e[t]] = [e[t], e[t - 1]]);
}
function nl(e, t) {
	Object.keys(e).forEach((n) => {
		typeof e[n] == "function" && (e[n] = e[n](t));
	});
}
function rl(e, t) {
	let n = 1024, r = n * 1024, i = r * 1024;
	return e < n ? e + (t ? " Byte" : "") : e < r ? (e / n).toFixed(0) + (t ? "<span class=\"text-muted fw-light\"> KB</span>" : "") : e < i ? (e / r).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> MB</span>" : "") : (e / i).toFixed(2) + (t ? "<span class=\"text-muted fw-light\"> GB</span>" : "");
}
function il(e) {
	return e.split(".").reverse()[0];
}
//#endregion
//#region node_modules/orderedmap/dist/index.js
function al(e) {
	this.content = e;
}
al.prototype = {
	constructor: al,
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
		return i == -1 ? a.push(n || e, t) : (a[i + 1] = t, n && (a[i] = n)), new al(a);
	},
	remove: function(e) {
		var t = this.find(e);
		if (t == -1) return this;
		var n = this.content.slice();
		return n.splice(t, 2), new al(n);
	},
	addToStart: function(e, t) {
		return new al([e, t].concat(this.remove(e).content));
	},
	addToEnd: function(e, t) {
		var n = this.remove(e).content.slice();
		return n.push(e, t), new al(n);
	},
	addBefore: function(e, t, n) {
		var r = this.remove(t), i = r.content.slice(), a = r.find(e);
		return i.splice(a == -1 ? i.length : a, 0, t, n), new al(i);
	},
	forEach: function(e) {
		for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1]);
	},
	prepend: function(e) {
		return e = al.from(e), e.size ? new al(e.content.concat(this.subtract(e).content)) : this;
	},
	append: function(e) {
		return e = al.from(e), e.size ? new al(this.subtract(e).content.concat(e.content)) : this;
	},
	subtract: function(e) {
		var t = this;
		e = al.from(e);
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
}, al.from = function(e) {
	if (e instanceof al) return e;
	var t = [];
	if (e) for (var n in e) t.push(n, e[n]);
	return new al(t);
};
//#endregion
//#region node_modules/prosemirror-model/dist/index.js
function ol(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) {
			n += i.nodeSize;
			continue;
		}
		if (!i.sameMarkup(a)) return n;
		if (i.isText && i.text != a.text) {
			for (let e = 0; i.text[e] == a.text[e]; e++) n++;
			return n;
		}
		if (i.content.size || a.content.size) {
			let e = ol(i.content, a.content, n + 1);
			if (e != null) return e;
		}
		n += i.nodeSize;
	}
}
function sl(e, t, n, r) {
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
			let e = 0, t = Math.min(o.text.length, s.text.length);
			for (; e < t && o.text[o.text.length - e - 1] == s.text[s.text.length - e - 1];) e++, n--, r--;
			return {
				a: n,
				b: r
			};
		}
		if (o.content.size || s.content.size) {
			let e = sl(o.content, s.content, n - 1, r - 1);
			if (e) return e;
		}
		n -= c, r -= c;
	}
}
var B = class e {
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
		return ol(this, e, t);
	}
	findDiffEnd(e, t = this.size, n = e.size) {
		return sl(this, e, t, n);
	}
	findIndex(e) {
		if (e == 0) return ll(0, e);
		if (e == this.size) return ll(this.content.length, e);
		if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
		for (let t = 0, n = 0;; t++) {
			let r = this.child(t), i = n + r.nodeSize;
			if (i >= e) return i == e ? ll(t + 1, i) : ll(t, n);
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
		return new e(n.map(t.nodeFromJSON));
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
B.empty = new B([], 0);
var cl = {
	index: 0,
	offset: 0
};
function ll(e, t) {
	return cl.index = e, cl.offset = t, cl;
}
function ul(e, t) {
	if (e === t) return !0;
	if (!(e && typeof e == "object") || !(t && typeof t == "object")) return !1;
	let n = Array.isArray(e);
	if (Array.isArray(t) != n) return !1;
	if (n) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!ul(e[n], t[n])) return !1;
	} else {
		for (let n in e) if (!(n in t) || !ul(e[n], t[n])) return !1;
		for (let n in t) if (!(n in e)) return !1;
	}
	return !0;
}
var V = class e {
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
		return this == e || this.type == e.type && ul(this.attrs, e.attrs);
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
V.none = [];
var dl = class extends Error {}, H = class e {
	constructor(e, t, n) {
		this.content = e, this.openStart = t, this.openEnd = n;
	}
	get size() {
		return this.content.size - this.openStart - this.openEnd;
	}
	insertAt(t, n) {
		let r = pl(this.content, t + this.openStart, n);
		return r && new e(r, this.openStart, this.openEnd);
	}
	removeBetween(t, n) {
		return new e(fl(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
		return new e(B.fromJSON(t, n.content), r, i);
	}
	static maxOpen(t, n = !0) {
		let r = 0, i = 0;
		for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
		for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
		return new e(t, r, i);
	}
};
H.empty = new H(B.empty, 0, 0);
function fl(e, t, n) {
	let { index: r, offset: i } = e.findIndex(t), a = e.maybeChild(r), { index: o, offset: s } = e.findIndex(n);
	if (i == t || a.isText) {
		if (s != n && !e.child(o).isText) throw RangeError("Removing non-flat range");
		return e.cut(0, t).append(e.cut(n));
	}
	if (r != o) throw RangeError("Removing non-flat range");
	return e.replaceChild(r, a.copy(fl(a.content, t - i - 1, n - i - 1)));
}
function pl(e, t, n, r) {
	let { index: i, offset: a } = e.findIndex(t), o = e.maybeChild(i);
	if (a == t || o.isText) return r && !r.canReplace(i, i, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
	let s = pl(o.content, t - a - 1, n, o);
	return s && e.replaceChild(i, o.copy(s));
}
function ml(e, t, n) {
	if (n.openStart > e.depth) throw new dl("Inserted content deeper than insertion position");
	if (e.depth - n.openStart != t.depth - n.openEnd) throw new dl("Inconsistent open depths");
	return hl(e, t, n, 0);
}
function hl(e, t, n, r) {
	let i = e.index(r), a = e.node(r);
	if (i == t.index(r) && r < e.depth - n.openStart) {
		let o = hl(e, t, n, r + 1);
		return a.copy(a.content.replaceChild(i, o));
	} else if (!n.content.size) return bl(a, Sl(e, t, r));
	else if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return bl(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	} else {
		let { start: i, end: o } = Cl(n, e);
		return bl(a, xl(e, i, o, t, r));
	}
}
function gl(e, t) {
	if (!t.type.compatibleContent(e.type)) throw new dl("Cannot join " + t.type.name + " onto " + e.type.name);
}
function _l(e, t, n) {
	let r = e.node(n);
	return gl(r, t.node(n)), r;
}
function vl(e, t) {
	let n = t.length - 1;
	n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e);
}
function yl(e, t, n, r) {
	let i = (t || e).node(n), a = 0, o = t ? t.index(n) : i.childCount;
	e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (vl(e.nodeAfter, r), a++));
	for (let e = a; e < o; e++) vl(i.child(e), r);
	t && t.depth == n && t.textOffset && vl(t.nodeBefore, r);
}
function bl(e, t) {
	return e.type.checkContent(t), e.copy(t);
}
function xl(e, t, n, r, i) {
	let a = e.depth > i && _l(e, t, i + 1), o = r.depth > i && _l(n, r, i + 1), s = [];
	return yl(null, e, i, s), a && o && t.index(i) == n.index(i) ? (gl(a, o), vl(bl(a, xl(e, t, n, r, i + 1)), s)) : (a && vl(bl(a, Sl(e, t, i + 1)), s), yl(t, n, i, s), o && vl(bl(o, Sl(n, r, i + 1)), s)), yl(r, null, i, s), new B(s);
}
function Sl(e, t, n) {
	let r = [];
	return yl(null, e, n, r), e.depth > n && vl(bl(_l(e, t, n + 1), Sl(e, t, n + 1)), r), yl(t, null, n, r), new B(r);
}
function Cl(e, t) {
	let n = t.depth - e.openStart, r = t.node(n).copy(e.content);
	for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(B.from(r));
	return {
		start: r.resolveNoCache(e.openStart + n),
		end: r.resolveNoCache(r.content.size - e.openEnd - n)
	};
}
var wl = class e {
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
		if (e.content.size == 0) return V.none;
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
		for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--) if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new Ol(this, e, n);
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
		let r = Dl.get(t);
		if (r) for (let e = 0; e < r.elts.length; e++) {
			let t = r.elts[e];
			if (t.pos == n) return t;
		}
		else Dl.set(t, r = new Tl());
		let i = r.elts[r.i] = e.resolve(t, n);
		return r.i = (r.i + 1) % El, i;
	}
}, Tl = class {
	constructor() {
		this.elts = [], this.i = 0;
	}
}, El = 12, Dl = /* @__PURE__ */ new WeakMap(), Ol = class {
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
}, kl = Object.create(null), Al = class e {
	constructor(e, t, n, r = V.none) {
		this.type = e, this.attrs = t, this.marks = r, this.content = n || B.empty;
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
		return this.type == e && ul(this.attrs, t || e.defaultAttrs || kl) && V.sameSet(this.marks, n || V.none);
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
		if (e == t) return H.empty;
		let r = this.resolve(e), i = this.resolve(t), a = n ? 0 : r.sharedDepth(t), o = r.start(a);
		return new H(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a);
	}
	replace(e, t, n) {
		return ml(this.resolve(e), this.resolve(t), n);
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
		return wl.resolveCached(this, e);
	}
	resolveNoCache(e) {
		return wl.resolve(this, e);
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
		return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ml(this.marks, e);
	}
	contentMatchAt(e) {
		let t = this.type.contentMatch.matchFragment(this.content, 0, e);
		if (!t) throw Error("Called contentMatchAt on a node with invalid content");
		return t;
	}
	canReplace(e, t, n = B.empty, r = 0, i = n.childCount) {
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
		let e = V.none;
		for (let t = 0; t < this.marks.length; t++) {
			let n = this.marks[t];
			n.type.checkAttrs(n.attrs), e = n.addToSet(e);
		}
		if (!V.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
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
		let r = B.fromJSON(e, t.content), i = e.nodeType(t.type).create(t.attrs, r, n);
		return i.type.checkAttrs(i.attrs), i;
	}
};
Al.prototype.text = void 0;
var jl = class e extends Al {
	constructor(e, t, n, r) {
		if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
		this.text = n;
	}
	toString() {
		return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ml(this.marks, JSON.stringify(this.text));
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
function Ml(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
var Nl = class e {
	constructor(e) {
		this.validEnd = e, this.next = [], this.wrapCache = [];
	}
	static parse(t, n) {
		let r = new Pl(t, n);
		if (r.next == null) return e.empty;
		let i = Fl(r);
		r.next && r.err("Unexpected trailing text");
		let a = Gl(Hl(i));
		return Kl(a, r), a;
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
			if (s && (!t || s.validEnd)) return B.from(o.map((e) => e.createAndFill()));
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
Nl.empty = new Nl(!0);
var Pl = class {
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
function Fl(e) {
	let t = [];
	do
		t.push(Il(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function Il(e) {
	let t = [];
	do
		t.push(Ll(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function Ll(e) {
	let t = Vl(e);
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
	else if (e.eat("{")) t = zl(e, t);
	else break;
	return t;
}
function Rl(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function zl(e, t) {
	let n = Rl(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : Rl(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function Bl(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function Vl(e) {
	if (e.eat("(")) {
		let t = Fl(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	} else if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = Bl(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function Hl(e) {
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
function Ul(e, t) {
	return t - e;
}
function Wl(e, t) {
	let n = [];
	return r(t), n.sort(Ul);
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
function Gl(e) {
	let t = Object.create(null);
	return n(Wl(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				Wl(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new Nl(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(Ul);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function Kl(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function ql(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function Jl(e, t) {
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
function Yl(e, t, n, r) {
	for (let r in t) if (!(r in e)) throw RangeError(`Unsupported attribute ${r} for ${n} of type ${r}`);
	for (let n in e) {
		let r = e[n];
		r.validate && r.validate(t[n]);
	}
}
function Xl(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new $l(e, r, t[r]);
	return n;
}
var Zl = class e {
	constructor(e, t, n) {
		this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = Xl(e, n.attrs), this.defaultAttrs = ql(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
	}
	get isInline() {
		return !this.isBlock;
	}
	get isTextblock() {
		return this.isBlock && this.inlineContent;
	}
	get isLeaf() {
		return this.contentMatch == Nl.empty;
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
		return !e && this.defaultAttrs ? this.defaultAttrs : Jl(this.attrs, e);
	}
	create(e = null, t, n) {
		if (this.isText) throw Error("NodeType.create can't construct text nodes");
		return new Al(this, this.computeAttrs(e), B.from(t), V.setFrom(n));
	}
	createChecked(e = null, t, n) {
		return t = B.from(t), this.checkContent(t), new Al(this, this.computeAttrs(e), t, V.setFrom(n));
	}
	createAndFill(e = null, t, n) {
		if (e = this.computeAttrs(e), t = B.from(t), t.size) {
			let e = this.contentMatch.fillBefore(t);
			if (!e) return null;
			t = e.append(t);
		}
		let r = this.contentMatch.matchFragment(t), i = r && r.fillBefore(B.empty, !0);
		return i ? new Al(this, e, t.append(i), V.setFrom(n)) : null;
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
		Yl(this.attrs, e, "node", this.name);
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
		return t ? t.length ? t : V.none : e;
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
function Ql(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
var $l = class {
	constructor(e, t, n) {
		this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? Ql(e, t, n.validate) : n.validate;
	}
	get isRequired() {
		return !this.hasDefault;
	}
}, eu = class e {
	constructor(e, t, n, r) {
		this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Xl(e, r.attrs), this.excluded = null;
		let i = ql(this.attrs);
		this.instance = i ? new V(this, i) : null;
	}
	create(e = null) {
		return !e && this.instance ? this.instance : new V(this, Jl(this.attrs, e));
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
		Yl(this.attrs, e, "mark", this.name);
	}
	excludes(e) {
		return this.excluded.indexOf(e) > -1;
	}
}, tu = class {
	constructor(e) {
		this.linebreakReplacement = null, this.cached = Object.create(null);
		let t = this.spec = {};
		for (let n in e) t[n] = e[n];
		t.nodes = al.from(e.nodes), t.marks = al.from(e.marks || {}), this.nodes = Zl.compile(this.spec.nodes, this), this.marks = eu.compile(this.spec.marks, this);
		let n = Object.create(null);
		for (let e in this.nodes) {
			if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
			let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
			if (t.contentMatch = n[r] || (n[r] = Nl.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
				if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
				if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
				this.linebreakReplacement = t;
			}
			t.markSet = i == "_" ? null : i ? nu(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
		}
		for (let e in this.marks) {
			let t = this.marks[e], n = t.spec.excludes;
			t.excluded = n == null ? [t] : n == "" ? [] : nu(this, n.split(" "));
		}
		this.nodeFromJSON = (e) => Al.fromJSON(this, e), this.markFromJSON = (e) => V.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
	}
	node(e, t = null, n, r) {
		if (typeof e == "string") e = this.nodeType(e);
		else if (!(e instanceof Zl)) throw RangeError("Invalid node type: " + e);
		else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
		return e.createChecked(t, n, r);
	}
	text(e, t) {
		let n = this.nodes.text;
		return new jl(n, n.defaultAttrs, e, V.setFrom(t));
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
function nu(e, t) {
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
function ru(e) {
	return e.tag != null;
}
function iu(e) {
	return e.style != null;
}
var au = class e {
	constructor(e, t) {
		this.schema = e, this.rules = t, this.tags = [], this.styles = [];
		let n = this.matchedStyles = [];
		t.forEach((e) => {
			if (ru(e)) this.tags.push(e);
			else if (iu(e)) {
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
		let n = new mu(this, t, !1);
		return n.addAll(e, V.none, t.from, t.to), n.finish();
	}
	parseSlice(e, t = {}) {
		let n = new mu(this, t, !0);
		return n.addAll(e, V.none, t.from, t.to), H.maxOpen(n.finish());
	}
	matchTag(e, t, n) {
		for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
			let n = this.tags[r];
			if (gu(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
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
				n(e = _u(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
			});
		}
		for (let t in e.nodes) {
			let r = e.nodes[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = _u(e)), e.node || e.ignore || e.mark || (e.node = t);
			});
		}
		return t;
	}
	static fromSchema(t) {
		return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
	}
}, ou = {
	address: !0,
	article: !0,
	aside: !0,
	blockquote: !0,
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
}, su = {
	head: !0,
	noscript: !0,
	object: !0,
	script: !0,
	style: !0,
	title: !0
}, cu = {
	ol: !0,
	ul: !0
}, lu = 1, uu = 2, du = 4;
function fu(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? lu | uu : n & ~du : (t ? lu : 0) | (t === "full" ? uu : 0);
}
var pu = class {
	constructor(e, t, n, r, i, a) {
		this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = V.none, this.match = i || (a & du ? null : e.contentMatch);
	}
	findWrapping(e) {
		if (!this.match) {
			if (!this.type) return [];
			let t = this.type.contentMatch.fillBefore(B.from(e));
			if (t) this.match = this.type.contentMatch.matchFragment(t);
			else {
				let t = this.type.contentMatch, n;
				return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null;
			}
		}
		return this.match.findWrapping(e.type);
	}
	finish(e) {
		if (!(this.options & lu)) {
			let e = this.content[this.content.length - 1], t;
			if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
				let n = e;
				e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length));
			}
		}
		let t = B.from(this.content);
		return !e && this.match && (t = t.append(this.match.fillBefore(B.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
	}
	inlineContext(e) {
		return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !ou.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
	}
}, mu = class {
	constructor(e, t, n) {
		this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
		let r = t.topNode, i, a = fu(null, t.preserveWhitespace, 0) | (n ? du : 0);
		i = r ? new pu(r.type, r.attrs, V.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new pu(null, null, V.none, !0, null, a) : new pu(e.schema.topNodeType, null, V.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
	}
	get top() {
		return this.nodes[this.open];
	}
	addDOM(e, t) {
		e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
	}
	addTextNode(e, t) {
		let n = e.nodeValue, r = this.top, i = r.options & uu ? "full" : this.localPreserveWS || (r.options & lu) > 0, { schema: a } = this.parser;
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
		cu.hasOwnProperty(a) && this.parser.normalizeLists && hu(e);
		let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
		out: if (s ? s.ignore : su.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
		else if (!s || s.skip || s.closeParent) {
			s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
			let n, r = this.needsBlock;
			if (ou.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
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
			let n = V.none;
			for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : vu(i.type, e.type)) && (n = i.addToSet(n));
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
		let o = fu(e, i, a.options);
		a.options & du && a.content.length == 0 && (o |= du);
		let s = V.none;
		return n = n.filter((t) => (a.type ? a.type.allowsMarkType(t.type) : vu(t.type, e)) ? (s = t.addToSet(s), !1) : !0), this.nodes.push(new pu(e, t, s, r, null, o)), this.open++, n;
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
		else this.localPreserveWS && (this.nodes[t].options |= lu);
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
function hu(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && cu.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function gu(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function _u(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function vu(e, t) {
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
var yu = class e {
	constructor(e, t) {
		this.nodes = e, this.marks = t;
	}
	serializeFragment(e, t = {}, n) {
		n ||= xu(t).createDocumentFragment();
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
		let { dom: n, contentDOM: r } = Tu(xu(t), this.nodes[e.type.name](e), null, e.attrs);
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
		return r && Tu(xu(n), r(e, t), null, e.attrs);
	}
	static renderSpec(e, t, n = null, r) {
		return Tu(e, t, n, r);
	}
	static fromSchema(t) {
		return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
	}
	static nodesFromSchema(e) {
		let t = bu(e.nodes);
		return t.text ||= (e) => e.text, t;
	}
	static marksFromSchema(e) {
		return bu(e.marks);
	}
};
function bu(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function xu(e) {
	return e.document || window.document;
}
var Su = /* @__PURE__ */ new WeakMap();
function Cu(e) {
	let t = Su.get(e);
	return t === void 0 && Su.set(e, t = wu(e)), t;
}
function wu(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") if (Array.isArray(e)) if (typeof e[0] == "string") t ||= [], t.push(e);
		else for (let t = 0; t < e.length; t++) n(e[t]);
		else for (let t in e) n(e[t]);
	}
	return n(e), t;
}
function Tu(e, t, n, r) {
	if (typeof t == "string") return { dom: e.createTextNode(t) };
	if (t.nodeType != null) return { dom: t };
	if (t.dom && t.dom.nodeType != null) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = Cu(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
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
		} else {
			let { dom: t, contentDOM: i } = Tu(e, a, n, r);
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
var Eu = 65535, Du = 2 ** 16;
function Ou(e, t) {
	return e + t * Du;
}
function ku(e) {
	return e & Eu;
}
function Au(e) {
	return (e - (e & Eu)) / Du;
}
var ju = 1, Mu = 2, Nu = 4, Pu = 8, Fu = class {
	constructor(e, t, n) {
		this.pos = e, this.delInfo = t, this.recover = n;
	}
	get deleted() {
		return (this.delInfo & Pu) > 0;
	}
	get deletedBefore() {
		return (this.delInfo & (ju | Nu)) > 0;
	}
	get deletedAfter() {
		return (this.delInfo & (Mu | Nu)) > 0;
	}
	get deletedAcross() {
		return (this.delInfo & Nu) > 0;
	}
}, Iu = class e {
	constructor(t, n = !1) {
		if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
	}
	recover(e) {
		let t = 0, n = ku(e);
		if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
		return this.ranges[n * 3] + t + Au(e);
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
				let d = e == (t < 0 ? s : u) ? null : Ou(o / 3, e - s), f = e == s ? Mu : e == u ? ju : Nu;
				return (t < 0 ? e != s : e != u) && (f |= Pu), new Fu(a, f, d);
			}
			r += l - c;
		}
		return n ? e + r : new Fu(e + r, 0, null);
	}
	touches(e, t) {
		let n = 0, r = ku(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
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
Iu.empty = new Iu([]);
var Lu = class e {
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
		return n ? e : new Fu(e, r, null);
	}
}, Ru = Object.create(null), zu = class {
	getMap() {
		return Iu.empty;
	}
	merge(e) {
		return null;
	}
	static fromJSON(e, t) {
		if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
		let n = Ru[t.stepType];
		if (!n) throw RangeError(`No step type ${t.stepType} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in Ru) throw RangeError("Duplicate use of step JSON ID " + e);
		return Ru[e] = t, t.prototype.jsonID = e, t;
	}
}, Bu = class e {
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
			if (t instanceof dl) return e.fail(t.message);
			throw t;
		}
	}
};
function Vu(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(Vu(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return B.fromArray(r);
}
var Hu = class e extends zu {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new H(Vu(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
		return Bu.fromReplace(e, this.from, this.to, i);
	}
	invert() {
		return new Uu(this.from, this.to, this.mark);
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
zu.jsonID("addMark", Hu);
var Uu = class e extends zu {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = new H(Vu(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
		return Bu.fromReplace(e, this.from, this.to, n);
	}
	invert() {
		return new Hu(this.from, this.to, this.mark);
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
zu.jsonID("removeMark", Uu);
var Wu = class e extends zu {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Bu.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
		return Bu.fromReplace(e, this.pos, this.pos + 1, new H(B.from(n), 0, +!t.isLeaf));
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
		return new Gu(this.pos, this.mark);
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
zu.jsonID("addNodeMark", Wu);
var Gu = class e extends zu {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Bu.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
		return Bu.fromReplace(e, this.pos, this.pos + 1, new H(B.from(n), 0, +!t.isLeaf));
	}
	invert(e) {
		let t = e.nodeAt(this.pos);
		return !t || !this.mark.isInSet(t.marks) ? this : new Wu(this.pos, this.mark);
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
zu.jsonID("removeNodeMark", Gu);
var Ku = class e extends zu {
	constructor(e, t, n, r = !1) {
		super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
	}
	apply(e) {
		return this.structure && Ju(e, this.from, this.to) ? Bu.fail("Structure replace would overwrite content") : Bu.fromReplace(e, this.from, this.to, this.slice);
	}
	getMap() {
		return new Iu([
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
			let n = this.slice.size + t.slice.size == 0 ? H.empty : new H(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
			return new e(this.from, this.to + (t.to - t.from), n, this.structure);
		} else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
			let n = this.slice.size + t.slice.size == 0 ? H.empty : new H(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
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
		return new e(n.from, n.to, H.fromJSON(t, n.slice), !!n.structure);
	}
};
Ku.MAP_BIAS = 1, zu.jsonID("replace", Ku);
var qu = class e extends zu {
	constructor(e, t, n, r, i, a, o = !1) {
		super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
	}
	apply(e) {
		if (this.structure && (Ju(e, this.from, this.gapFrom) || Ju(e, this.gapTo, this.to))) return Bu.fail("Structure gap-replace would overwrite content");
		let t = e.slice(this.gapFrom, this.gapTo);
		if (t.openStart || t.openEnd) return Bu.fail("Gap is not a flat range");
		let n = this.slice.insertAt(this.insert, t.content);
		return n ? Bu.fromReplace(e, this.from, this.to, n) : Bu.fail("Content does not fit in gap");
	}
	getMap() {
		return new Iu([
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
		return new e(n.from, n.to, n.gapFrom, n.gapTo, H.fromJSON(t, n.slice), n.insert, !!n.structure);
	}
};
zu.jsonID("replaceAround", qu);
function Ju(e, t, n) {
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
function Yu(e, t, n, r) {
	let i = [], a = [], o, s;
	e.doc.nodesBetween(t, n, (e, c, l) => {
		if (!e.isInline) return;
		let u = e.marks;
		if (!r.isInSet(u) && l.type.allowsMarkType(r.type)) {
			let l = Math.max(c, t), d = Math.min(c + e.nodeSize, n), f = r.addToSet(u);
			for (let e = 0; e < u.length; e++) u[e].isInSet(f) || (o && o.to == l && o.mark.eq(u[e]) ? o.to = d : i.push(o = new Uu(l, d, u[e])));
			s && s.to == l ? s.to = d : a.push(s = new Hu(l, d, r));
		}
	}), i.forEach((t) => e.step(t)), a.forEach((t) => e.step(t));
}
function Xu(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline) return;
		a++;
		let s = null;
		if (r instanceof eu) {
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
	}), i.forEach((t) => e.step(new Uu(t.from, t.to, t.style)));
}
function Zu(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new Ku(s, l, H.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new Uu(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new H(B.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new Ku(s + e.index, s + e.index + e[0].length, r));
			}
		}
		s = l;
	}
	if (!r.validEnd) {
		let t = r.fillBefore(B.empty, !0);
		e.replace(s, s, new H(t, 0, 0));
	}
	for (let t = o.length - 1; t >= 0; t--) e.step(o[t]);
}
function Qu(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function $u(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !Qu(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function ed(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = B.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = B.from(r.node(e).copy(u)), d++) : c--;
	let f = B.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = B.from(i.node(e).copy(f)), p++) : l++;
	e.step(new qu(c, l, o, s, new H(u.append(f), d, p), u.size - d, !0));
}
function td(e, t, n = null, r = e) {
	let i = rd(e, t), a = i && id(r, t);
	return a ? i.map(nd).concat({
		type: t,
		attrs: n
	}).concat(a.map(nd)) : null;
}
function nd(e) {
	return {
		type: e,
		attrs: null
	};
}
function rd(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function id(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function ad(e, t, n) {
	let r = B.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = B.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new qu(i, a, i, a, new H(r, 0, 0), n.length, !0));
}
function od(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && ld(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && cd(e, t, n, a), Zu(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new qu(c, l, c + 1, l - 1, new H(B.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && sd(e, t, n, a), !1;
		}
	});
}
function sd(e, t, n, r) {
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
function cd(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function ld(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function ud(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new qu(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new H(B.from(o), 0, 0), 1, !0));
}
function dd(e, t, n = 1, r) {
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
function fd(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = B.empty, o = B.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = B.from(i.node(e).copy(a));
		let t = r && r[s];
		o = B.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new Ku(t, t, new H(a.append(o), n, n), !0));
}
function pd(e, t) {
	let n = e.resolve(t), r = n.index();
	return hd(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function md(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function hd(e, t) {
	return !!(e && t && !e.isLeaf && md(e, t));
}
function gd(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && hd(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function _d(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		cd(e, r.node(), r.before(), s);
	}
	o.inlineContent && Zu(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new Ku(l, c.map(t + n, -1), H.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		sd(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function vd(e, t, n) {
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
function yd(e, t, n) {
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
function bd(e, t, n = t, r = H.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return xd(i, a, r) ? new Ku(t, n, r) : new Sd(i, a, r).fit();
}
function xd(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
var Sd = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = B.empty;
		for (let t = 0; t <= e.depth; t++) {
			let n = e.node(t);
			this.frontier.push({
				type: n.type,
				match: n.contentMatchAt(e.indexAfter(t))
			});
		}
		for (let t = e.depth; t > 0; t--) this.placed = B.from(e.node(t).copy(this.placed));
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
		let s = new H(i, a, o);
		return e > -1 ? new qu(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Ku(n.pos, r.pos, s) : null;
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
			n ? (r = Td(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
			let i = e.firstChild;
			for (let e = this.depth; e >= 0; e--) {
				let { type: a, match: o } = this.frontier[e], s, c = null;
				if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(B.from(i), !1)) : r && a.compatibleContent(r.type))) return {
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
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = Td(e, t);
		return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new H(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0);
	}
	dropNode() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = Td(e, t);
		if (r.childCount <= 1 && t > 0) {
			let i = e.size - t <= t + r.size;
			this.unplaced = new H(Cd(e, t - 1, 1), t - 1, i ? t - 1 : n);
		} else this.unplaced = new H(Cd(e, t, 1), t, n);
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
			c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(Ed(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
		}
		let p = c == o.childCount;
		p || (f = -1), this.placed = wd(this.placed, t, B.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
		for (let e = 0, t = o; e < f; e++) {
			let e = t.lastChild;
			this.frontier.push({
				type: e.type,
				match: e.contentMatchAt(e.childCount)
			}), t = e.content;
		}
		this.unplaced = p ? e == 0 ? H.empty : new H(Cd(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new H(Cd(a.content, e, c), a.openStart, a.openEnd);
	}
	mustMoveInline() {
		if (!this.$to.parent.isTextblock) return -1;
		let e = this.frontier[this.depth], t;
		if (!e.type.isTextblock || !Dd(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
		let { depth: n } = this.$to, r = this.$to.after(n);
		for (; n > 1 && r == this.$to.end(--n);) ++r;
		return r;
	}
	findCloseLevel(e) {
		scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
			let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = Dd(e, t, r, n, i);
			if (a) {
				for (let n = t - 1; n >= 0; n--) {
					let { match: t, type: r } = this.frontier[n], i = Dd(e, n, r, t, !0);
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
		t.fit.childCount && (this.placed = wd(this.placed, t.depth, t.fit)), e = t.move;
		for (let n = t.depth + 1; n <= e.depth; n++) {
			let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
			this.openFrontierNode(t.type, t.attrs, r);
		}
		return e;
	}
	openFrontierNode(e, t = null, n) {
		let r = this.frontier[this.depth];
		r.match = r.match.matchType(e), this.placed = wd(this.placed, this.depth, B.from(e.create(t, n))), this.frontier.push({
			type: e,
			match: e.contentMatch
		});
	}
	closeFrontierNode() {
		let e = this.frontier.pop().match.fillBefore(B.empty, !0);
		e.childCount && (this.placed = wd(this.placed, this.frontier.length, e));
	}
};
function Cd(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(Cd(e.firstChild.content, t - 1, n)));
}
function wd(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(wd(e.lastChild.content, t - 1, n)));
}
function Td(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function Ed(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, Ed(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(B.empty, !0)))), e.copy(r);
}
function Dd(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !Od(n, a.content, o) ? s : null;
}
function Od(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function kd(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function Ad(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (xd(i, a, r)) return e.step(new Ku(t, n, r));
	let o = Pd(i, a);
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
		let t = l[e], n = kd(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new H(jd(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function jd(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(jd(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(B.empty, !0));
	}
	return e;
}
function Md(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = vd(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new H(B.from(r), 0, 0));
}
function Nd(e, t, n) {
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
	let a = Pd(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function Pd(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var Fd = class e extends zu {
	constructor(e, t, n) {
		super(), this.pos = e, this.attr = t, this.value = n;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return Bu.fail("No node at attribute step's position");
		let n = Object.create(null);
		for (let e in t.attrs) n[e] = t.attrs[e];
		n[this.attr] = this.value;
		let r = t.type.create(n, null, t.marks);
		return Bu.fromReplace(e, this.pos, this.pos + 1, new H(B.from(r), 0, +!t.isLeaf));
	}
	getMap() {
		return Iu.empty;
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
zu.jsonID("attr", Fd);
var Id = class e extends zu {
	constructor(e, t) {
		super(), this.attr = e, this.value = t;
	}
	apply(e) {
		let t = Object.create(null);
		for (let n in e.attrs) t[n] = e.attrs[n];
		t[this.attr] = this.value;
		let n = e.type.create(t, e.content, e.marks);
		return Bu.ok(n);
	}
	getMap() {
		return Iu.empty;
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
zu.jsonID("docAttr", Id);
var Ld = class extends Error {};
Ld = function e(t) {
	let n = Error.call(this, t);
	return n.__proto__ = e.prototype, n;
}, Ld.prototype = Object.create(Error.prototype), Ld.prototype.constructor = Ld, Ld.prototype.name = "TransformError";
var Rd = class {
	constructor(e) {
		this.doc = e, this.steps = [], this.docs = [], this.mapping = new Lu();
	}
	get before() {
		return this.docs.length ? this.docs[0] : this.doc;
	}
	step(e) {
		let t = this.maybeStep(e);
		if (t.failed) throw new Ld(t.failed);
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
	replace(e, t = e, n = H.empty) {
		let r = bd(this.doc, e, t, n);
		return r && this.step(r), this;
	}
	replaceWith(e, t, n) {
		return this.replace(e, t, new H(B.from(n), 0, 0));
	}
	delete(e, t) {
		return this.replace(e, t, H.empty);
	}
	insert(e, t) {
		return this.replaceWith(e, e, t);
	}
	replaceRange(e, t, n) {
		return Ad(this, e, t, n), this;
	}
	replaceRangeWith(e, t, n) {
		return Md(this, e, t, n), this;
	}
	deleteRange(e, t) {
		return Nd(this, e, t), this;
	}
	lift(e, t) {
		return ed(this, e, t), this;
	}
	join(e, t = 1) {
		return _d(this, e, t), this;
	}
	wrap(e, t) {
		return ad(this, e, t), this;
	}
	setBlockType(e, t = e, n, r = null) {
		return od(this, e, t, n, r), this;
	}
	setNodeMarkup(e, t, n = null, r) {
		return ud(this, e, t, n, r), this;
	}
	setNodeAttribute(e, t, n) {
		return this.step(new Fd(e, t, n)), this;
	}
	setDocAttribute(e, t) {
		return this.step(new Id(e, t)), this;
	}
	addNodeMark(e, t) {
		return this.step(new Wu(e, t)), this;
	}
	removeNodeMark(e, t) {
		let n = this.doc.nodeAt(e);
		if (!n) throw RangeError("No node at position " + e);
		if (t instanceof V) t.isInSet(n.marks) && this.step(new Gu(e, t));
		else {
			let r = n.marks, i, a = [];
			for (; i = t.isInSet(r);) a.push(new Gu(e, i)), r = i.removeFromSet(r);
			for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
		}
		return this;
	}
	split(e, t = 1, n) {
		return fd(this, e, t, n), this;
	}
	addMark(e, t, n) {
		return Yu(this, e, t, n), this;
	}
	removeMark(e, t, n) {
		return Xu(this, e, t, n), this;
	}
	clearIncompatible(e, t, n) {
		return Zu(this, e, t, n), this;
	}
}, zd = Object.create(null), U = class {
	constructor(e, t, n) {
		this.$anchor = e, this.$head = t, this.ranges = n || [new Bd(e.min(t), e.max(t))];
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
	replace(e, t = H.empty) {
		let n = t.content.lastChild, r = null;
		for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
		let i = e.steps.length, a = this.ranges;
		for (let o = 0; o < a.length; o++) {
			let { $from: s, $to: c } = a[o], l = e.mapping.slice(i);
			e.replaceRange(l.map(s.pos), l.map(c.pos), o ? H.empty : t), o == 0 && Jd(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
		}
	}
	replaceWith(e, t) {
		let n = e.steps.length, r = this.ranges;
		for (let i = 0; i < r.length; i++) {
			let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
			i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), Jd(e, n, t.isInline ? -1 : 1));
		}
	}
	static findFrom(e, t, n = !1) {
		let r = e.parent.inlineContent ? new W(e) : qd(e.node(0), e.parent, e.pos, e.index(), t, n);
		if (r) return r;
		for (let r = e.depth - 1; r >= 0; r--) {
			let i = t < 0 ? qd(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : qd(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
			if (i) return i;
		}
		return null;
	}
	static near(e, t = 1) {
		return this.findFrom(e, t) || this.findFrom(e, -t) || new Gd(e.node(0));
	}
	static atStart(e) {
		return qd(e, e, 0, 0, 1) || new Gd(e);
	}
	static atEnd(e) {
		return qd(e, e, e.content.size, e.childCount, -1) || new Gd(e);
	}
	static fromJSON(e, t) {
		if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
		let n = zd[t.type];
		if (!n) throw RangeError(`No selection type ${t.type} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in zd) throw RangeError("Duplicate use of selection JSON ID " + e);
		return zd[e] = t, t.prototype.jsonID = e, t;
	}
	getBookmark() {
		return W.between(this.$anchor, this.$head).getBookmark();
	}
};
U.prototype.visible = !0;
var Bd = class {
	constructor(e, t) {
		this.$from = e, this.$to = t;
	}
}, Vd = !1;
function Hd(e) {
	!Vd && !e.parent.inlineContent && (Vd = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
var W = class e extends U {
	constructor(e, t = e) {
		Hd(e), Hd(t), super(e, t);
	}
	get $cursor() {
		return this.$anchor.pos == this.$head.pos ? this.$head : null;
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		if (!r.parent.inlineContent) return U.near(r);
		let i = t.resolve(n.map(this.anchor));
		return new e(i.parent.inlineContent ? i : r, r);
	}
	replace(e, t = H.empty) {
		if (super.replace(e, t), t == H.empty) {
			let t = this.$from.marksAcross(this.$to);
			t && e.ensureMarks(t);
		}
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor && t.head == this.head;
	}
	getBookmark() {
		return new Ud(this.anchor, this.head);
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
			let e = U.findFrom(n, r, !0) || U.findFrom(n, -r, !0);
			if (e) n = e.$head;
			else return U.near(n, r);
		}
		return t.parent.inlineContent || (i == 0 ? t = n : (t = (U.findFrom(t, -r, !0) || U.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n);
	}
};
U.jsonID("text", W);
var Ud = class e {
	constructor(e, t) {
		this.anchor = e, this.head = t;
	}
	map(t) {
		return new e(t.map(this.anchor), t.map(this.head));
	}
	resolve(e) {
		return W.between(e.resolve(this.anchor), e.resolve(this.head));
	}
}, G = class e extends U {
	constructor(e) {
		let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
		super(e, n), this.node = t;
	}
	map(t, n) {
		let { deleted: r, pos: i } = n.mapResult(this.anchor), a = t.resolve(i);
		return r ? U.near(a) : new e(a);
	}
	content() {
		return new H(B.from(this.node), 0, 0);
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
		return new Wd(this.anchor);
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
G.prototype.visible = !1, U.jsonID("node", G);
var Wd = class e {
	constructor(e) {
		this.anchor = e;
	}
	map(t) {
		let { deleted: n, pos: r } = t.mapResult(this.anchor);
		return n ? new Ud(r, r) : new e(r);
	}
	resolve(e) {
		let t = e.resolve(this.anchor), n = t.nodeAfter;
		return n && G.isSelectable(n) ? new G(t) : U.near(t);
	}
}, Gd = class e extends U {
	constructor(e) {
		super(e.resolve(0), e.resolve(e.content.size));
	}
	replace(e, t = H.empty) {
		if (t == H.empty) {
			e.delete(0, e.doc.content.size);
			let t = U.atStart(e.doc);
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
		return Kd;
	}
};
U.jsonID("all", Gd);
var Kd = {
	map() {
		return this;
	},
	resolve(e) {
		return new Gd(e);
	}
};
function qd(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return W.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = qd(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && G.isSelectable(r)) return G.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function Jd(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Ku || i instanceof qu)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(U.near(e.doc.resolve(o), n));
}
var Yd = 1, Xd = 2, Zd = 4, Qd = class extends Rd {
	constructor(e) {
		super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
	}
	get selection() {
		return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
	}
	setSelection(e) {
		if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
		return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Yd) & ~Xd, this.storedMarks = null, this;
	}
	get selectionSet() {
		return (this.updated & Yd) > 0;
	}
	setStoredMarks(e) {
		return this.storedMarks = e, this.updated |= Xd, this;
	}
	ensureMarks(e) {
		return V.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
	}
	addStoredMark(e) {
		return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
	}
	removeStoredMark(e) {
		return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
	}
	get storedMarksSet() {
		return (this.updated & Xd) > 0;
	}
	addStep(e, t) {
		super.addStep(e, t), this.updated &= ~Xd, this.storedMarks = null;
	}
	setTime(e) {
		return this.time = e, this;
	}
	replaceSelection(e) {
		return this.selection.replace(this, e), this;
	}
	replaceSelectionWith(e, t = !0) {
		let n = this.selection;
		return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || V.none))), n.replaceWith(this, e), this;
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
			return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(U.near(this.selection.$to)), this;
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
		return this.updated |= Zd, this;
	}
	get scrolledIntoView() {
		return (this.updated & Zd) > 0;
	}
};
function $d(e, t) {
	return !t || !e ? e : e.bind(t);
}
var ef = class {
	constructor(e, t, n) {
		this.name = e, this.init = $d(t.init, n), this.apply = $d(t.apply, n);
	}
}, tf = [
	new ef("doc", {
		init(e) {
			return e.doc || e.schema.topNodeType.createAndFill();
		},
		apply(e) {
			return e.doc;
		}
	}),
	new ef("selection", {
		init(e, t) {
			return e.selection || U.atStart(t.doc);
		},
		apply(e) {
			return e.selection;
		}
	}),
	new ef("storedMarks", {
		init(e) {
			return e.storedMarks || null;
		},
		apply(e, t, n, r) {
			return r.selection.$cursor ? e.storedMarks : null;
		}
	}),
	new ef("scrollToSelection", {
		init() {
			return 0;
		},
		apply(e, t) {
			return e.scrolledIntoView ? t + 1 : t;
		}
	})
], nf = class {
	constructor(e, t) {
		this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = tf.slice(), t && t.forEach((e) => {
			if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
			this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new ef(e.key, e.spec.state, e));
		});
	}
}, rf = class e {
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
		return new Qd(this);
	}
	static create(t) {
		let n = new nf(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
		for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
		return r;
	}
	reconfigure(t) {
		let n = new nf(this.schema, t.plugins), r = n.fields, i = new e(n);
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
		let i = new nf(t.schema, t.plugins), a = new e(i);
		return i.fields.forEach((e) => {
			if (e.name == "doc") a.doc = Al.fromJSON(t.schema, n.doc);
			else if (e.name == "selection") a.selection = U.fromJSON(a.doc, n.selection);
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
function af(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = af(i, t, {})), n[r] = i;
	}
	return n;
}
var K = class {
	constructor(e) {
		this.spec = e, this.props = {}, e.props && af(e.props, this, this.props), this.key = e.key ? e.key.key : sf("plugin");
	}
	getState(e) {
		return e[this.key];
	}
}, of = Object.create(null);
function sf(e) {
	return e in of ? e + "$" + ++of[e] : (of[e] = 0, e + "$");
}
var cf = class {
	constructor(e = "key") {
		this.key = sf(e);
	}
	get(e) {
		return e.config.pluginsByKey[this.key];
	}
	getState(e) {
		return e[this.key];
	}
}, lf = (e, t) => e.selection.empty ? !1 : (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function uf(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
var df = (e, t, n) => {
	let r = uf(e, n);
	if (!r) return !1;
	let i = _f(r);
	if (!i) {
		let n = r.blockRange(), i = n && $u(n);
		return i == null ? !1 : (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
	}
	let a = i.nodeBefore;
	if (Ff(e, i, t, -1)) return !0;
	if (r.parent.content.size == 0 && (hf(a, "end") || G.isSelectable(a))) for (let n = r.depth;; n--) {
		let o = bd(e.doc, r.before(n), r.after(n), H.empty);
		if (o && o.slice.size < o.to - o.from) {
			if (t) {
				let n = e.tr.step(o);
				n.setSelection(hf(a, "end") ? U.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : G.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
			}
			return !0;
		}
		if (n == 1 || r.node(n - 1).childCount > 1) break;
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, ff = (e, t, n) => {
	let r = uf(e, n);
	if (!r) return !1;
	let i = _f(r);
	return i ? mf(e, i, t) : !1;
}, pf = (e, t, n) => {
	let r = vf(e, n);
	if (!r) return !1;
	let i = xf(r);
	return i ? mf(e, i, t) : !1;
};
function mf(e, t, n) {
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
	let s = bd(e.doc, i, o, H.empty);
	if (!s || s.from != i || s instanceof Ku && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(W.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function hf(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
var gf = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
		a = _f(r);
	}
	let o = a && a.nodeBefore;
	return !o || !G.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(G.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
};
function _f(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function vf(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
var yf = (e, t, n) => {
	let r = vf(e, n);
	if (!r) return !1;
	let i = xf(r);
	if (!i) return !1;
	let a = i.nodeAfter;
	if (Ff(e, i, t, 1)) return !0;
	if (r.parent.content.size == 0 && (hf(a, "start") || G.isSelectable(a))) {
		let n = bd(e.doc, r.before(), r.after(), H.empty);
		if (n && n.slice.size < n.to - n.from) {
			if (t) {
				let r = e.tr.step(n);
				r.setSelection(hf(a, "start") ? U.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : G.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
			}
			return !0;
		}
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
}, bf = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
		a = xf(r);
	}
	let o = a && a.nodeAfter;
	return !o || !G.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(G.create(e.doc, a.pos)).scrollIntoView()), !0);
};
function xf(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
var Sf = (e, t) => {
	let n = e.selection, r = n instanceof G, i;
	if (r) {
		if (n.node.isTextblock || !pd(e.doc, n.from)) return !1;
		i = n.from;
	} else if (i = gd(e.doc, n.from, -1), i == null) return !1;
	if (t) {
		let n = e.tr.join(i);
		r && n.setSelection(G.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
	}
	return !0;
}, Cf = (e, t) => {
	let n = e.selection, r;
	if (n instanceof G) {
		if (n.node.isTextblock || !pd(e.doc, n.to)) return !1;
		r = n.to;
	} else if (r = gd(e.doc, n.to, 1), r == null) return !1;
	return t && t(e.tr.join(r).scrollIntoView()), !0;
}, wf = (e, t) => {
	let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && $u(i);
	return a == null ? !1 : (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
}, Tf = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
};
function Ef(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var Df = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
	let i = n.node(-1), a = n.indexAfter(-1), o = Ef(i.contentMatchAt(a));
	if (!o || !i.canReplaceWith(a, a, o)) return !1;
	if (t) {
		let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
		i.setSelection(U.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
	}
	return !0;
}, Of = (e, t) => {
	let n = e.selection, { $from: r, $to: i } = n;
	if (n instanceof Gd || r.parent.inlineContent || i.parent.inlineContent) return !1;
	let a = Ef(i.parent.contentMatchAt(i.indexAfter()));
	if (!a || !a.isTextblock) return !1;
	if (t) {
		let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
		o.setSelection(W.create(o.doc, n + 1)), t(o.scrollIntoView());
	}
	return !0;
}, kf = (e, t) => {
	let { $cursor: n } = e.selection;
	if (!n || n.parent.content.size) return !1;
	if (n.depth > 1 && n.after() != n.end(-1)) {
		let r = n.before();
		if (dd(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
	}
	let r = n.blockRange(), i = r && $u(r);
	return i == null ? !1 : (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
};
function Af(e) {
	return (t, n) => {
		let { $from: r, $to: i } = t.selection;
		if (t.selection instanceof G && t.selection.node.isBlock) return !r.parentOffset || !dd(t.doc, r.pos) ? !1 : (n && n(t.tr.split(r.pos).scrollIntoView()), !0);
		if (!r.depth) return !1;
		let a = [], o, s, c = !1, l = !1;
		for (let t = r.depth;; t--) if (r.node(t).isBlock) {
			c = r.end(t) == r.pos + (r.depth - t), l = r.start(t) == r.pos - (r.depth - t), s = Ef(r.node(t - 1).contentMatchAt(r.indexAfter(t - 1)));
			let n = e && e(i.parent, c, r);
			a.unshift(n || (c && s ? { type: s } : null)), o = t;
			break;
		} else {
			if (t == 1) return !1;
			a.unshift(null);
		}
		let u = t.tr;
		(t.selection instanceof W || t.selection instanceof Gd) && u.deleteSelection();
		let d = u.mapping.map(r.pos), f = dd(u.doc, d, a.length, a);
		if (f ||= (a[0] = s ? { type: s } : null, dd(u.doc, d, a.length, a)), !f) return !1;
		if (u.split(d, a.length, a), !c && l && r.node(o).type != s) {
			let e = u.mapping.map(r.before(o)), t = u.doc.resolve(e);
			s && r.node(o - 1).canReplaceWith(t.index(), t.index() + 1, s) && u.setNodeMarkup(u.mapping.map(r.before(o)), s);
		}
		return n && n(u.scrollIntoView()), !0;
	};
}
var jf = Af(), Mf = (e, t) => {
	let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
	return a == 0 ? !1 : (i = n.before(a), t && t(e.tr.setSelection(G.create(e.doc, i))), !0);
}, Nf = (e, t) => (t && t(e.tr.setSelection(new Gd(e.doc))), !0);
function Pf(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || pd(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function Ff(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && Pf(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = B.empty;
			for (let e = o.length - 1; e >= 0; e--) s = B.from(o[e].create(null, s));
			s = B.from(i.copy(s));
			let c = e.tr.step(new qu(t.pos - 1, r, t.pos, r, new H(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && pd(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : U.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && $u(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && hf(a, "start", !0) && hf(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = B.empty;
				for (let e = o.length - 1; e >= 0; e--) r = B.from(o[e].copy(r));
				n(e.tr.step(new qu(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new H(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function If(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(W.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
var Lf = If(-1), Rf = If(1);
function zf(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && td(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function Bf(e, t = null) {
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
function Vf(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var Hf = Vf(lf, df, gf), Uf = Vf(lf, yf, bf), Wf = {
	Enter: Vf(Tf, Of, kf, jf),
	"Mod-Enter": Df,
	Backspace: Hf,
	"Mod-Backspace": Hf,
	"Shift-Backspace": Hf,
	Delete: Uf,
	"Mod-Delete": Uf,
	"Mod-a": Nf
}, Gf = {
	"Ctrl-h": Wf.Backspace,
	"Alt-Backspace": Wf["Mod-Backspace"],
	"Ctrl-d": Wf.Delete,
	"Ctrl-Alt-Backspace": Wf["Mod-Delete"],
	"Alt-Delete": Wf["Mod-Delete"],
	"Alt-d": Wf["Mod-Delete"],
	"Ctrl-a": Lf,
	"Ctrl-e": Rf
};
for (let e in Wf) Gf[e] = Wf[e];
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
//#endregion
//#region node_modules/prosemirror-schema-list/dist/index.js
function Kf(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return qf(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function qf(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new Ol(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new Ol(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = td(a, n, r, t);
	return s ? (e && Jf(e, t, s, i, n), !0) : !1;
}
function Jf(e, t, n, r, i) {
	let a = B.empty;
	for (let e = n.length - 1; e >= 0; e--) a = B.from(n[e].type.create(n[e].attrs, a));
	e.step(new qu(t.start - (r ? 2 : 0), t.end, t.start, t.end, new H(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && dd(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function Yf(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		return a ? n ? r.node(a.depth - 1).type == e ? Xf(t, n, e, a) : Zf(t, n, a) : !0 : !1;
	};
}
function Xf(e, t, n, r) {
	let i = e.tr, a = r.end, o = r.$to.end(r.depth);
	a < o && (i.step(new qu(a - 1, o, a, o, new H(B.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Ol(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
	let s = $u(r);
	if (s == null) return !1;
	i.lift(r, s);
	let c = i.doc.resolve(i.mapping.map(a, -1) - 1);
	return pd(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), t(i.scrollIntoView()), !0;
}
function Zf(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? B.empty : B.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new qu(d - +!!s, f + +!!c, d + 1, f - 1, new H((s ? B.empty : B.from(i.copy(B.empty))).append(c ? B.empty : B.from(i.copy(B.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function Qf(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (c.type != e) return !1;
		if (n) {
			let r = c.lastChild && c.lastChild.type == s.type, i = B.from(r ? e.create() : null), o = new H(B.from(e.create(null, B.from(s.type.create(null, i)))), r ? 3 : 1, 0), l = a.start, u = a.end;
			n(t.tr.step(new qu(l - (r ? 3 : 1), u, l, u, o, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
//#endregion
//#region node_modules/prosemirror-view/dist/index.js
var $f = function(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}, ep = function(e) {
	let t = e.assignedSlot || e.parentNode;
	return t && t.nodeType == 11 ? t.host : t;
}, tp = null, np = function(e, t, n) {
	let r = tp ||= document.createRange();
	return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
}, rp = function() {
	tp = null;
}, ip = function(e, t, n, r) {
	return n && (op(e, t, n, r, -1) || op(e, t, n, r, 1));
}, ap = /^(img|br|input|textarea|hr)$/i;
function op(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : sp(e))) {
			let n = e.parentNode;
			if (!n || n.nodeType != 1 || dp(e) || ap.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = $f(e) + (i < 0 ? 0 : 1), e = n;
		} else if (e.nodeType == 1) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (n.nodeType == 1 && n.contentEditable == "false") if (n.pmViewDesc?.ignoreForSelection) t += i;
			else return !1;
			else e = n, t = i < 0 ? sp(e) : 0;
		} else return !1;
	}
}
function sp(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function cp(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t) return e;
		if (e.nodeType == 1 && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = sp(e);
		} else if (e.parentNode && !dp(e)) t = $f(e), e = e.parentNode;
		else return null;
	}
}
function lp(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t < e.nodeValue.length) return e;
		if (e.nodeType == 1 && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !dp(e)) t = $f(e) + 1, e = e.parentNode;
		else return null;
	}
}
function up(e, t, n) {
	for (let r = t == 0, i = t == sp(e); r || i;) {
		if (e == n) return !0;
		let t = $f(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == sp(e);
	}
}
function dp(e) {
	let t;
	for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
	return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
var fp = function(e) {
	return e.focusNode && ip(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
};
function pp(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function mp(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function hp(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(sp(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(sp(r.startContainer), r.startOffset)
		};
	}
}
var gp = typeof navigator < "u" ? navigator : null, _p = typeof document < "u" ? document : null, vp = gp && gp.userAgent || "", yp = /Edge\/(\d+)/.exec(vp), bp = /MSIE \d/.exec(vp), xp = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(vp), Sp = !!(bp || xp || yp), Cp = bp ? document.documentMode : xp ? +xp[1] : yp ? +yp[1] : 0, wp = !Sp && /gecko\/(\d+)/i.test(vp);
wp && +(/Firefox\/(\d+)/.exec(vp) || [0, 0])[1];
var Tp = !Sp && /Chrome\/(\d+)/.exec(vp), Ep = !!Tp, Dp = Tp ? +Tp[1] : 0, Op = !Sp && !!gp && /Apple Computer/.test(gp.vendor), kp = Op && (/Mobile\/\w+/.test(vp) || !!gp && gp.maxTouchPoints > 2), Ap = kp || (gp ? /Mac/.test(gp.platform) : !1), jp = gp ? /Win/.test(gp.platform) : !1, Mp = /Android \d/.test(vp), Np = !!_p && "webkitFontSmoothing" in _p.documentElement.style, Pp = Np ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Fp(e) {
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
function Ip(e, t) {
	return typeof e == "number" ? e : e[t];
}
function Lp(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function Rp(e, t, n) {
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (o.nodeType != 1) {
			o = ep(o);
			continue;
		}
		let e = o, n = e == a.body, s = n ? Fp(a) : Lp(e), c = 0, l = 0;
		if (t.top < s.top + Ip(r, "top") ? l = -(s.top - t.top + Ip(i, "top")) : t.bottom > s.bottom - Ip(r, "bottom") && (l = t.bottom - t.top > s.bottom - s.top ? t.top + Ip(i, "top") - s.top : t.bottom - s.bottom + Ip(i, "bottom")), t.left < s.left + Ip(r, "left") ? c = -(s.left - t.left + Ip(i, "left")) : t.right > s.right - Ip(r, "right") && (c = t.right - s.right + Ip(i, "right")), c || l) if (n) a.defaultView.scrollBy(c, l);
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
		o = u == "absolute" ? o.offsetParent : ep(o);
	}
}
function zp(e) {
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
		stack: Bp(e.dom)
	};
}
function Bp(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = ep(r));
	return t;
}
function Vp({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	Hp(n, r == 0 ? 0 : r - t);
}
function Hp(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
var Up = null;
function Wp(e) {
	if (e.setActive) return e.setActive();
	if (Up) return e.focus(Up);
	let t = Bp(e);
	e.focus(Up == null ? { get preventScroll() {
		return Up = { preventScroll: !0 }, !0;
	} } : void 0), Up || (Up = !1, Hp(t, 0));
}
function Gp(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (u.nodeType == 1) e = u.getClientRects();
		else if (u.nodeType == 3) e = np(u).getClientRects();
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
	return !n && c && (n = c, i = l, r = 0), n && n.nodeType == 3 ? Kp(n, i) : !n || r && n.nodeType == 1 ? {
		node: e,
		offset: a
	} : Gp(n, i);
}
function Kp(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = em(r, 1);
		if (n.top != n.bottom && qp(t, n)) {
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
function qp(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function Jp(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function Yp(e, t, n) {
	let { node: r, offset: i } = Gp(t, n), a = -1;
	if (r.nodeType == 1 && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function Xp(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (t.dom.nodeType == 1 && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function Zp(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (n.nodeType == 1) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (qp(t, i)) return Zp(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function Qp(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = hp(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o.nodeType == 1 ? o : o.parentNode)) {
		let n = e.dom.getBoundingClientRect();
		if (!qp(t, n) || (o = Zp(e.dom, t, n), !o)) return null;
	}
	if (Op) for (let e = o; r && e; e = ep(e)) e.draggable && (r = void 0);
	if (o = Jp(o, t), r) {
		if (wp && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		Np && i && r.nodeType == 1 && (n = r.childNodes[i - 1]).nodeType == 1 && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (s = Xp(e, r, i, t));
	}
	s ??= Yp(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function $p(e) {
	return e.top < e.bottom || e.left < e.right;
}
function em(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if ($p(e)) return e;
	}
	return Array.prototype.find.call(n, $p) || e.getBoundingClientRect();
}
var tm = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function nm(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = Np || wp;
	if (r.nodeType == 3) if (o && (tm.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
		let e = em(np(r, i, i), n);
		if (wp && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
			let t = em(np(r, i - 1, i - 1), -1);
			if (t.top == e.top) {
				let n = em(np(r, i, i + 1), -1);
				if (n.top != e.top) return rm(n, n.left < t.left);
			}
		}
		return e;
	} else {
		let e = i, t = i, a = n < 0 ? 1 : -1;
		return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, rm(em(np(r, e, t), a), a < 0);
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == sp(r))) {
			let e = r.childNodes[i - 1];
			if (e.nodeType == 1) return im(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < sp(r)) {
			let e = r.childNodes[i];
			if (e.nodeType == 1) return im(e.getBoundingClientRect(), !0);
		}
		return im(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == sp(r))) {
		let e = r.childNodes[i - 1], t = e.nodeType == 3 ? np(e, sp(e) - +!o) : e.nodeType == 1 && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return rm(em(t, 1), !1);
	}
	if (a == null && i < sp(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? e.nodeType == 3 ? np(e, 0, +!o) : e.nodeType == 1 ? e : null : null;
		if (t) return rm(em(t, -1), !0);
	}
	return rm(em(r.nodeType == 3 ? np(r) : r, -n), n >= 0);
}
function rm(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function im(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function am(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function om(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return am(e, t, () => {
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
		let r = nm(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (e.nodeType == 1) t = e.getClientRects();
			else if (e.nodeType == 3) t = np(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
var sm = /[\u0590-\u08ac]/;
function cm(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !sm.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : am(e, t, () => {
		let { focusNode: t, focusOffset: i, anchorNode: a, anchorOffset: o } = e.domSelectionRange(), c = s.caretBidiLevel;
		s.modify("move", n, "character");
		let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: u, focusOffset: d } = e.domSelectionRange(), f = u && !l.contains(u.nodeType == 1 ? u : u.parentNode) || t == u && i == d;
		try {
			s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i);
		} catch {}
		return c != null && (s.caretBidiLevel = c), f;
	}) : r.pos == r.start() || r.pos == r.end();
}
var lm = null, um = null, dm = !1;
function fm(e, t, n) {
	return lm == t && um == n ? dm : (lm = t, um = n, dm = n == "up" || n == "down" ? om(e, t, n) : cm(e, t, n));
}
var pm = 0, mm = 1, hm = 2, gm = 3, _m = class {
	constructor(e, t, n, r) {
		this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = pm, n.pmViewDesc = this;
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
		if (e == this.dom && this.contentDOM) r = t > $f(this.contentDOM);
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
			if (a > e || i instanceof wm) {
				r = e - t;
				break;
			}
			t = a;
		}
		if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
		for (let e; n && !(e = this.children[n - 1]).size && e instanceof vm && e.side >= 0; n--);
		if (t <= 0) {
			let e, r = !0;
			for (; e = n ? this.children[n - 1] : null, !(!e || e.dom.parentNode == this.contentDOM); n--, r = !1);
			return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
				node: this.contentDOM,
				offset: e ? $f(e.dom) + 1 : 0
			};
		} else {
			let e, r = !0;
			for (; e = n < this.children.length ? this.children[n] : null, !(!e || e.dom.parentNode == this.contentDOM); n++, r = !1);
			return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
				node: this.contentDOM,
				offset: e ? $f(e.dom) : this.contentDOM.childNodes.length
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
						r = $f(n.dom) + 1;
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
						i = $f(n.dom);
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
		if ((wp || Op) && e == t) {
			let { node: e, offset: t } = o;
			if (e.nodeType == 3) {
				if (u = !!(t && e.nodeValue[t - 1] == "\n"), u && t == e.nodeValue.length) for (let t = e, n; t; t = t.parentNode) {
					if (n = t.nextSibling) {
						n.nodeName == "BR" && (o = s = {
							node: n.parentNode,
							offset: $f(n) + 1
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
		if (wp && l.focusNode && l.focusNode != s.node && l.focusNode.nodeType == 1) {
			let e = l.focusNode.childNodes[l.focusOffset];
			e && e.contentEditable == "false" && (r = !0);
		}
		if (!(r || u && Op) && ip(o.node, o.offset, l.anchorNode, l.anchorOffset) && ip(s.node, s.offset, l.focusNode, l.focusOffset)) return;
		let d = !1;
		if ((c.extend || e == t) && !(u && wp)) {
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
					this.dirty = e == n || t == a ? hm : mm, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = gm : i.markDirty(e - r, t - r);
					return;
				} else i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? hm : gm;
			}
			n = a;
		}
		this.dirty = hm;
	}
	markParentsDirty() {
		let e = 1;
		for (let t = this.parent; t; t = t.parent, e++) {
			let n = e == 1 ? hm : mm;
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
}, vm = class extends _m {
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
		return this.dirty == pm && e.type.eq(this.widget.type);
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
}, ym = class extends _m {
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
}, bm = class e extends _m {
	constructor(e, t, n, r, i) {
		super(e, [], n, r), this.mark = t, this.spec = i;
	}
	static create(t, n, r, i) {
		let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
		return (!o || !o.dom) && (o = yu.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
	}
	parseRule() {
		return this.dirty & gm || this.mark.type.spec.reparseInView ? null : {
			mark: this.mark.type.name,
			attrs: this.mark.attrs,
			contentElement: this.contentDOM
		};
	}
	matchesMark(e) {
		return this.dirty != gm && this.mark.eq(e);
	}
	markDirty(e, t) {
		if (super.markDirty(e, t), this.dirty != pm) {
			let e = this.parent;
			for (; !e.node;) e = e.parent;
			e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = pm;
		}
	}
	slice(t, n, r) {
		let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
		n < o && (a = Vm(a, n, o, r)), t > 0 && (a = Vm(a, 0, t, r));
		for (let e = 0; e < a.length; e++) a[e].parent = i;
		return i.children = a, i;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
}, xm = class e extends _m {
	constructor(e, t, n, r, i, a, o, s, c) {
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
			let e = yu.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
			({dom: u, contentDOM: d} = e);
		}
		!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
		let f = u;
		return u = Mm(u, r, n), l ? c = new Tm(t, n, r, i, u, d || null, f, l, a, o + 1) : n.isText ? new Cm(t, n, r, i, u, f, a) : new e(t, n, r, i, u, d || null, f, a, o + 1);
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
			e.contentElement || (e.getContent = () => B.empty);
		}
		return e;
	}
	matchesNode(e, t, n) {
		return this.dirty == pm && e.eq(this.node) && Nm(t, this.outerDeco) && n.eq(this.innerDeco);
	}
	get size() {
		return this.node.nodeSize;
	}
	get border() {
		return +!this.node.isLeaf;
	}
	updateChildren(e, t) {
		let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new Fm(this, a && a.node, e);
		Rm(this.node, this.innerDeco, (t, i, a) => {
			t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? V.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
		}, (t, a, c, l) => {
			s.syncToMarks(t.marks, n, e, l);
			let u;
			s.findNodeMatch(t, a, c, l) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (u = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, c, u, e) || s.updateNextNode(t, a, c, e, l, r) || s.addNode(t, a, c, e, r), r += t.nodeSize;
		}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == hm) && (a && this.protectLocalComposition(e, a), Em(this.contentDOM, this.children, e), kp && zm(this.dom));
	}
	localCompositionInfo(e, t) {
		let { from: n, to: r } = e.state.selection;
		if (!(e.state.selection instanceof W) || n < t || r > t + this.node.content.size) return null;
		let i = e.input.compositionNode;
		if (!i || !this.dom.contains(i.parentNode)) return null;
		if (this.node.inlineContent) {
			let e = i.nodeValue, a = Bm(this.node.content, e, n - t, r - t);
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
		let a = new ym(this, i, t, r);
		e.input.compositionNodes.push(a), this.children = Vm(this.children, n, n + r.length, e, a);
	}
	update(e, t, n, r) {
		return this.dirty == gm || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0);
	}
	updateInner(e, t, n, r) {
		this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = pm;
	}
	updateOuterDeco(e) {
		if (Nm(e, this.outerDeco)) return;
		let t = this.nodeDOM.nodeType != 1, n = this.dom;
		this.dom = Am(this.dom, this.nodeDOM, km(this.outerDeco, this.node, t), km(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
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
function Sm(e, t, n, r, i) {
	Mm(r, t, e);
	let a = new xm(void 0, e, t, n, r, r, r, i, 0);
	return a.contentDOM && a.updateChildren(i, 0), a;
}
var Cm = class e extends xm {
	constructor(e, t, n, r, i, a, o) {
		super(e, t, n, r, i, null, a, o, 0);
	}
	parseRule() {
		let e = this.nodeDOM.parentNode;
		for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
		return { skip: e || !0 };
	}
	update(e, t, n, r) {
		return this.dirty == gm || this.dirty != pm && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != pm || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = pm, !0);
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
		return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a, r);
	}
	markDirty(e, t) {
		super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = gm);
	}
	get domAtom() {
		return !1;
	}
	isText(e) {
		return this.node.text == e;
	}
}, wm = class extends _m {
	parseRule() {
		return { ignore: !0 };
	}
	matchesHack(e) {
		return this.dirty == pm && this.dom.nodeName == e;
	}
	get domAtom() {
		return !0;
	}
	get ignoreForCoords() {
		return this.dom.nodeName == "IMG";
	}
}, Tm = class extends xm {
	constructor(e, t, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, c, l), this.spec = s;
	}
	update(e, t, n, r) {
		if (this.dirty == gm) return !1;
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
function Em(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = Pm(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof bm) {
			let t = r ? r.previousSibling : e.lastChild;
			Em(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = Pm(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
var Dm = function(e) {
	e && (this.nodeName = e);
};
Dm.prototype = Object.create(null);
var Om = [new Dm()];
function km(e, t, n) {
	if (e.length == 0) return Om;
	let r = n ? Om[0] : new Dm(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new Dm(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new Dm(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function Am(e, t, n, r) {
	if (n == Om && r == Om) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName ? i = t : (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = Om[0], i = t);
		}
		jm(i, o || Om[0], a);
	}
	return i;
}
function jm(e, t, n) {
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
function Mm(e, t, n) {
	return Am(e, e, Om, km(t, n, e.nodeType != 1));
}
function Nm(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function Pm(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var Fm = class {
	constructor(e, t, n) {
		this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Im(e.node.content, e);
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
		for (; i < a;) this.destroyRest(), this.top.dirty = pm, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
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
			if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
			else {
				let r = bm.create(this.top, e[a], t, n);
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
		return a.dirty == gm && a.dom == a.contentDOM && (a.dirty = hm), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
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
			if (s instanceof xm) {
				let c = this.preMatch.matched.get(s);
				if (c != null && c != i) return !1;
				let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != gm && Nm(t, s.outerDeco));
				if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
				if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = hm, u.updateChildren(r, a + 1), u.dirty = pm), this.changed = !0, this.index++, !0;
				break;
			}
		}
		return !1;
	}
	recreateWrapper(e, t, n, r, i, a) {
		if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Nm(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
		let o = xm.create(this.top, t, n, r, i, a);
		if (o.contentDOM) {
			o.children = e.children, e.children = [];
			for (let e of o.children) e.parent = o;
		}
		return e.destroy(), o;
	}
	addNode(e, t, n, r, i) {
		let a = xm.create(this.top, e, t, n, r, i);
		a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
	}
	placeWidget(e, t, n) {
		let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
		if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
		else {
			let r = new vm(this.top, e, t, n);
			this.top.children.splice(this.index++, 0, r), this.changed = !0;
		}
	}
	addTextblockHacks() {
		let e = this.top.children[this.index - 1], t = this.top;
		for (; e instanceof bm;) t = e, e = t.children[t.children.length - 1];
		(!e || !(e instanceof Cm) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Op || Ep) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
	}
	addHackNode(e, t) {
		if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
		else {
			let n = document.createElement(e);
			e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
			let r = new wm(this.top, [], n, null);
			t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
		}
	}
	isLocked(e) {
		return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
	}
};
function Im(e, t) {
	let n = t, r = n.children.length, i = e.childCount, a = /* @__PURE__ */ new Map(), o = [];
	outer: for (; i > 0;) {
		let s;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof bm) n = e, r = e.children.length;
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
function Lm(e, t) {
	return e.type.side - t.type.side;
}
function Rm(e, t, n, r) {
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
			d.sort(Lm);
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
function zm(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function Bm(e, t, n, r) {
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
function Vm(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function Hm(e, t = null) {
	let n = e.domSelectionRange(), r = e.state.doc;
	if (!n.focusNode) return null;
	let i = e.docView.nearestDesc(n.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if (fp(n)) {
		for (c = o; i && !i.node;) i = i.parent;
		let e = i.node;
		if (i && e.isAtom && G.isSelectable(e) && i.parent && !(e.isInline && up(n.focusNode, n.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new G(o == e ? s : r.resolve(e));
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
		l = $m(e, u, s, n);
	}
	return l;
}
function Um(e) {
	return e.editable ? e.hasFocus() : th(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Wm(e, t = !1) {
	let n = e.state.selection;
	if (Zm(e, n), Um(e)) {
		if (!t && e.input.mouseDown && e.input.mouseDown.allowDefault && Ep) {
			let t = e.domSelectionRange(), n = e.domObserver.currentSelection;
			if (t.anchorNode && n.anchorNode && ip(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset)) {
				e.input.mouseDown.delayedSelectionSync = !0, e.domObserver.setCurSelection();
				return;
			}
		}
		if (e.domObserver.disconnectSelection(), e.cursorWrapper) Xm(e);
		else {
			let { anchor: r, head: i } = n, a, o;
			Gm && !(n instanceof W) && (n.$from.parent.inlineContent || (a = Km(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = Km(e, n.to))), e.docView.setSelection(r, i, e, t), Gm && (a && Jm(a), o && Jm(o)), n.visible ? e.dom.classList.remove("ProseMirror-hideselection") : (e.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Ym(e));
		}
		e.domObserver.setCurSelection(), e.domObserver.connectSelection();
	}
}
var Gm = Op || Ep && Dp < 63;
function Km(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (Op && i && i.contentEditable == "false") return qm(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return qm(i);
		if (a) return qm(a);
	}
}
function qm(e) {
	return e.contentEditable = "true", Op && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function Jm(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function Ym(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Um(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function Xm(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom, r = n.nodeName == "IMG";
	r ? t.collapse(n.parentNode, $f(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && Sp && Cp <= 11 && (n.disabled = !0, n.disabled = !1);
}
function Zm(e, t) {
	if (t instanceof G) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && (Qm(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else Qm(e);
}
function Qm(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function $m(e, t, n, r) {
	return e.someProp("createSelectionBetween", (r) => r(e, t, n)) || W.between(t, n, r);
}
function eh(e) {
	return e.editable && !e.hasFocus() ? !1 : th(e);
}
function th(e) {
	let t = e.domSelectionRange();
	if (!t.anchorNode) return !1;
	try {
		return e.dom.contains(t.anchorNode.nodeType == 3 ? t.anchorNode.parentNode : t.anchorNode) && (e.editable || e.dom.contains(t.focusNode.nodeType == 3 ? t.focusNode.parentNode : t.focusNode));
	} catch {
		return !1;
	}
}
function nh(e) {
	let t = e.docView.domFromPos(e.state.selection.anchor, 0), n = e.domSelectionRange();
	return ip(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function rh(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && U.findFrom(a, t);
}
function ih(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function ah(e, t, n) {
	let r = e.state.selection;
	if (r instanceof W) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return ih(e, new W(r.$anchor, a));
		} else if (!r.empty) return !1;
		else if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = rh(e.state, t);
			return n && n instanceof G ? ih(e, n) : !1;
		} else if (!(Ap && n.indexOf("m") > -1)) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? G.isSelectable(i) ? ih(e, new G(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : Np ? ih(e, new W(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1 : !1;
		}
	} else if (r instanceof G && r.node.isInline) return ih(e, new W(t > 0 ? r.$to : r.$from));
	else {
		let n = rh(e.state, t);
		return n ? ih(e, n) : !1;
	}
}
function oh(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function sh(e, t) {
	let n = e.pmViewDesc;
	return n && n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR");
}
function ch(e, t) {
	return t < 0 ? lh(e) : uh(e);
}
function lh(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (wp && n.nodeType == 1 && r < oh(n) && sh(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (n.nodeType != 1) break;
		{
			let e = n.childNodes[r - 1];
			if (sh(e, -1)) i = n, a = --r;
			else if (e.nodeType == 3) n = e, r = n.nodeValue.length;
			else break;
		}
	} else if (dh(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && sh(t, -1);) i = n.parentNode, a = $f(t), t = t.previousSibling;
		if (t) n = t, r = oh(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? mh(e, n, r) : i && mh(e, i, a);
}
function uh(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = oh(n), a, o;
	for (;;) if (r < i) {
		if (n.nodeType != 1) break;
		let e = n.childNodes[r];
		if (sh(e, 1)) a = n, o = ++r;
		else break;
	} else if (dh(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && sh(t, 1);) a = t.parentNode, o = $f(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = oh(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && mh(e, a, o);
}
function dh(e) {
	let t = e.pmViewDesc;
	return t && t.node && t.node.isBlock;
}
function fh(e, t) {
	for (; e && t == e.childNodes.length && !dp(e);) t = $f(e) + 1, e = e.parentNode;
	for (; e && t < e.childNodes.length;) {
		let n = e.childNodes[t];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = 0;
	}
}
function ph(e, t) {
	for (; e && !t && !dp(e);) t = $f(e), e = e.parentNode;
	for (; e && t;) {
		let n = e.childNodes[t - 1];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = e.childNodes.length;
	}
}
function mh(e, t, n) {
	if (t.nodeType != 3) {
		let e, r;
		(r = fh(t, n)) ? (t = r, n = 0) : (e = ph(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection();
	if (!r) return;
	if (fp(r)) {
		let e = document.createRange();
		e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e);
	} else r.extend && r.extend(t, n);
	e.domObserver.setCurSelection();
	let { state: i } = e;
	setTimeout(() => {
		e.state == i && Wm(e);
	}, 50);
}
function hh(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(Ep || jp) && n.parent.inlineContent) {
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
function gh(e, t, n) {
	let r = e.state.selection;
	if (r instanceof W && !r.empty || n.indexOf("s") > -1 || Ap && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = rh(e.state, t);
		if (n && n instanceof G) return ih(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Gd ? U.near(n, t) : U.findFrom(n, t);
		return o ? ih(e, o) : !1;
	}
	return !1;
}
function _h(e, t) {
	if (!(e.state.selection instanceof W)) return !0;
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
function vh(e, t, n) {
	e.domObserver.stop(), t.contentEditable = n, e.domObserver.start();
}
function yh(e) {
	if (!Op || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (t && t.nodeType == 1 && n == 0 && t.firstChild && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		vh(e, n, "true"), setTimeout(() => vh(e, n, "false"), 20);
	}
	return !1;
}
function bh(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function xh(e, t) {
	let n = t.keyCode, r = bh(t);
	if (n == 8 || Ap && n == 72 && r == "c") return _h(e, -1) || ch(e, -1);
	if (n == 46 && !t.shiftKey || Ap && n == 68 && r == "c") return _h(e, 1) || ch(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || Ap && n == 66 && r == "c") {
		let t = n == 37 ? hh(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return ah(e, t, r) || ch(e, t);
	} else if (n == 39 || Ap && n == 70 && r == "c") {
		let t = n == 39 ? hh(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return ah(e, t, r) || ch(e, t);
	} else if (n == 38 || Ap && n == 80 && r == "c") return gh(e, -1, r) || ch(e, -1);
	else if (n == 40 || Ap && n == 78 && r == "c") return yh(e) || gh(e, 1, r) || ch(e, 1);
	else if (r == (Ap ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90)) return !0;
	return !1;
}
function Sh(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || yu.fromSchema(e.state.schema), s = Nh(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && l.nodeType == 1 && (u = jh[l.nodeName.toLowerCase()]);) {
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
function Ch(e, t, n, r, i) {
	let a = i.parent.type.spec.code, o, s;
	if (!n && !t) return null;
	let c = !!t && (r || a || !n);
	if (c) {
		if (e.someProp("transformPastedText", (n) => {
			t = n(t, a || r, e);
		}), a) return s = new H(B.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0), e.someProp("transformPasted", (t) => {
			s = t(s, e, !0);
		}), s;
		let n = e.someProp("clipboardTextParser", (n) => n(t, i, r, e));
		if (n) s = n;
		else {
			let n = i.marks(), { schema: r } = e.state, a = yu.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = Ih(n), Np && Lh(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && e.nodeType != 1;) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || au.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !wh.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = Rh(Ah(s, +u[1], +u[2]), u[4]);
	else if (s = H.maxOpen(Th(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = Ah(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, c);
	}), s;
}
var wh = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Th(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && Dh(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = Oh(a[a.length - 1], i.length));
				let n = Eh(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return B.from(a);
	}
	return e;
}
function Eh(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, B.from(e));
	return e;
}
function Dh(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = Dh(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(B.from(Eh(n, e, i + 1))));
	}
}
function Oh(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, Oh(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(B.empty, !0);
	return e.copy(n.append(r));
}
function kh(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = kh(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(B.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function Ah(e, t, n) {
	return t < e.openStart && (e = new H(kh(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new H(kh(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
var jh = {
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
}, Mh = null;
function Nh() {
	return Mh ||= document.implementation.createHTMLDocument("title");
}
var Ph = null;
function Fh(e) {
	let t = window.trustedTypes;
	return t ? (Ph ||= t.defaultPolicy || t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e }), Ph.createHTML(e)) : e;
}
function Ih(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = Nh().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(e), i;
	if ((i = r && jh[r[1].toLowerCase()]) && (e = i.map((e) => "<" + e + ">").join("") + e + i.map((e) => "</" + e + ">").reverse().join("")), n.innerHTML = Fh(e), i) for (let e = 0; e < i.length; e++) n = n.querySelector(i[e]) || n;
	return n;
}
function Lh(e) {
	let t = e.querySelectorAll(Ep ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function Rh(e, t) {
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
		i = B.from(t.create(r[e + 1], i)), a++, o++;
	}
	return new H(i, a, o);
}
var zh = {}, Bh = {}, Vh = {
	touchstart: !0,
	touchmove: !0
}, Hh = class {
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
function Uh(e) {
	for (let t in zh) {
		let n = zh[t];
		e.dom.addEventListener(t, e.input.eventHandlers[t] = (t) => {
			Jh(e, t) && !qh(e, t) && (e.editable || !(t.type in Bh)) && n(e, t);
		}, Vh[t] ? { passive: !0 } : void 0);
	}
	Op && e.dom.addEventListener("input", () => null), Kh(e);
}
function Wh(e, t) {
	e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now();
}
function Gh(e) {
	e.domObserver.stop();
	for (let t in e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
	clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function Kh(e) {
	e.someProp("handleDOMEvents", (t) => {
		for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = (t) => qh(e, t));
	});
}
function qh(e, t) {
	return e.someProp("handleDOMEvents", (n) => {
		let r = n[t.type];
		return r ? r(e, t) || t.defaultPrevented : !1;
	});
}
function Jh(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target; n != e.dom; n = n.parentNode) if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
	return !0;
}
function Yh(e, t) {
	!qh(e, t) && zh[t.type] && (e.editable || !(t.type in Bh)) && zh[t.type](e, t);
}
Bh.keydown = (e, t) => {
	let n = t;
	if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !lg(e, n) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), !(Mp && Ep && n.keyCode == 13))) if (n.keyCode != 229 && e.domObserver.forceFlush(), kp && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
		let t = Date.now();
		e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
			e.input.lastIOSEnter == t && (e.someProp("handleKeyDown", (t) => t(e, pp(13, "Enter"))), e.input.lastIOSEnter = 0);
		}, 200);
	} else e.someProp("handleKeyDown", (t) => t(e, n)) || xh(e, n) ? n.preventDefault() : Wh(e, "key");
}, Bh.keyup = (e, t) => {
	t.keyCode == 16 && (e.input.shiftKey = !1);
}, Bh.keypress = (e, t) => {
	let n = t;
	if (lg(e, n) || !n.charCode || n.ctrlKey && !n.altKey || Ap && n.metaKey) return;
	if (e.someProp("handleKeyPress", (t) => t(e, n))) {
		n.preventDefault();
		return;
	}
	let r = e.state.selection;
	if (!(r instanceof W) || !r.$from.sameParent(r.$to)) {
		let t = String.fromCharCode(n.charCode), i = () => e.state.tr.insertText(t).scrollIntoView();
		!/[\r\n]/.test(t) && !e.someProp("handleTextInput", (n) => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault();
	}
};
function Xh(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Zh(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function Qh(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function $h(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	n == "pointer" && r.setMeta("pointer", !0), e.dispatch(r);
}
function eg(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && G.isSelectable(r) ? ($h(e, new G(n), "pointer"), !0) : !1;
}
function tg(e, t) {
	if (t == -1) return !1;
	let n = e.state.selection, r, i;
	n instanceof G && (r = n.node);
	let a = e.state.doc.resolve(t);
	for (let e = a.depth + 1; e > 0; e--) {
		let t = e > a.depth ? a.nodeAfter : a.node(e);
		if (G.isSelectable(t)) {
			i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
			break;
		}
	}
	return i == null ? !1 : ($h(e, G.create(e.state.doc, i), "pointer"), !0);
}
function ng(e, t, n, r, i) {
	return Qh(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? tg(e, n) : eg(e, n));
}
function rg(e, t, n, r) {
	return Qh(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function ig(e, t, n, r) {
	return Qh(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r)) || ag(e, n, r);
}
function ag(e, t, n) {
	if (n.button != 0) return !1;
	let r = e.state.doc;
	if (t == -1) return r.inlineContent ? ($h(e, W.create(r, 0, r.content.size), "pointer"), !0) : !1;
	let i = r.resolve(t);
	for (let t = i.depth + 1; t > 0; t--) {
		let n = t > i.depth ? i.nodeAfter : i.node(t), a = i.before(t);
		if (n.inlineContent) $h(e, W.create(r, a + 1, a + 1 + n.content.size), "pointer");
		else if (G.isSelectable(n)) $h(e, G.create(r, a), "pointer");
		else continue;
		return !0;
	}
}
function og(e) {
	return gg(e);
}
var sg = Ap ? "metaKey" : "ctrlKey";
zh.mousedown = (e, t) => {
	let n = t;
	e.input.shiftKey = n.shiftKey;
	let r = og(e), i = Date.now(), a = "singleClick";
	i - e.input.lastClick.time < 500 && Zh(n, e.input.lastClick) && !n[sg] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? a = "doubleClick" : e.input.lastClick.type == "doubleClick" && (a = "tripleClick")), e.input.lastClick = {
		time: i,
		x: n.clientX,
		y: n.clientY,
		type: a,
		button: n.button
	};
	let o = e.posAtCoords(Xh(n));
	o && (a == "singleClick" ? (e.input.mouseDown && e.input.mouseDown.done(), e.input.mouseDown = new cg(e, o, n, !!r)) : (a == "doubleClick" ? rg : ig)(e, o.pos, o.inside, n) ? n.preventDefault() : Wh(e, "pointer"));
};
var cg = class {
	constructor(e, t, n, r) {
		this.view = e, this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!n[sg], this.allowDefault = n.shiftKey;
		let i, a;
		if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
		else {
			let n = e.state.doc.resolve(t.pos);
			i = n.parent, a = n.depth ? n.before() : 0;
		}
		let o = r ? null : n.target, s = o ? e.docView.nearestDesc(o, !0) : null;
		this.target = s && s.nodeDOM.nodeType == 1 ? s.nodeDOM : null;
		let { selection: c } = e.state;
		n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof G && c.from <= a && c.to > a) && (this.mightDrag = {
			node: i,
			pos: a,
			addAttr: !!(this.target && !this.target.draggable),
			setUneditable: !!(this.target && wp && !this.target.hasAttribute("contentEditable"))
		}), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
			this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
		}, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Wh(e, "pointer");
	}
	done() {
		this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => Wm(this.view)), this.view.input.mouseDown = null;
	}
	up(e) {
		if (this.done(), !this.view.dom.contains(e.target)) return;
		let t = this.pos;
		this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Xh(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Wh(this.view, "pointer") : ng(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || Op && this.mightDrag && !this.mightDrag.node.isAtom || Ep && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? ($h(this.view, U.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : Wh(this.view, "pointer");
	}
	move(e) {
		this.updateAllowDefault(e), Wh(this.view, "pointer"), e.buttons == 0 && this.done();
	}
	updateAllowDefault(e) {
		!this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
	}
};
zh.touchstart = (e) => {
	e.input.lastTouch = Date.now(), og(e), Wh(e, "pointer");
}, zh.touchmove = (e) => {
	e.input.lastTouch = Date.now(), Wh(e, "pointer");
}, zh.contextmenu = (e) => og(e);
function lg(e, t) {
	return e.composing ? !0 : Op && Math.abs(t.timeStamp - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
var ug = Mp ? 5e3 : -1;
Bh.compositionstart = Bh.compositionupdate = (e) => {
	if (!e.composing) {
		e.domObserver.flush();
		let { state: t } = e, n = t.selection.$to;
		if (t.selection instanceof W && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || Ep && jp && dg(e))) e.markCursor = e.state.storedMarks || n.marks(), gg(e, !0), e.markCursor = null;
		else if (gg(e, !t.selection.empty), wp && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
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
	fg(e, ug);
};
function dg(e) {
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (!t || t.nodeType != 1 || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return r.nodeType == 1 && r.contentEditable == "false";
}
Bh.compositionend = (e, t) => {
	e.composing && (e.input.composing = !1, e.input.compositionEndedAt = t.timeStamp, e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, fg(e, 20));
};
function fg(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => gg(e), t));
}
function pg(e) {
	for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = hg()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty();
}
function mg(e) {
	let t = e.domSelectionRange();
	if (!t.focusNode) return null;
	let n = cp(t.focusNode, t.focusOffset), r = lp(t.focusNode, t.focusOffset);
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
function hg() {
	let e = document.createEvent("Event");
	return e.initEvent("event", !0, !0), e.timeStamp;
}
function gg(e, t = !1) {
	if (!(Mp && e.domObserver.flushingSoon >= 0)) {
		if (e.domObserver.forceFlush(), pg(e), t || e.docView && e.docView.dirty) {
			let n = Hm(e), r = e.state.selection;
			return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0;
		}
		return !1;
	}
}
function _g(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
var vg = Sp && Cp < 15 || kp && Pp < 604;
zh.copy = Bh.cut = (e, t) => {
	let n = t, r = e.state.selection, i = n.type == "cut";
	if (r.empty) return;
	let a = vg ? null : n.clipboardData, { dom: o, text: s } = Sh(e, r.content());
	a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : _g(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function yg(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function bg(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? xg(e, r.value, null, i, t) : xg(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function xg(e, t, n, r, i) {
	let a = Ch(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || H.empty))) return !0;
	if (!a) return !1;
	let o = yg(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Sg(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
Bh.paste = (e, t) => {
	let n = t;
	if (e.composing && !Mp) return;
	let r = vg ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
	r && xg(e, Sg(r), r.getData("text/html"), i, n) ? n.preventDefault() : bg(e, n);
};
var Cg = class {
	constructor(e, t, n) {
		this.slice = e, this.move = t, this.node = n;
	}
}, wg = Ap ? "altKey" : "ctrlKey";
function Tg(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[wg] : !n;
}
zh.dragstart = (e, t) => {
	let n = t, r = e.input.mouseDown;
	if (r && r.done(), !n.dataTransfer) return;
	let i = e.state.selection, a = i.empty ? null : e.posAtCoords(Xh(n)), o;
	if (!(a && a.pos >= i.from && a.pos <= (i instanceof G ? i.to - 1 : i.to))) {
		if (r && r.mightDrag) o = G.create(e.state.doc, r.mightDrag.pos);
		else if (n.target && n.target.nodeType == 1) {
			let t = e.docView.nearestDesc(n.target, !0);
			t && t.node.type.spec.draggable && t != e.docView && (o = G.create(e.state.doc, t.posBefore));
		}
	}
	let { dom: s, text: c, slice: l } = Sh(e, (o || e.state.selection).content());
	(!n.dataTransfer.files.length || !Ep || Dp > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(vg ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", vg || n.dataTransfer.setData("text/plain", c), e.dragging = new Cg(l, Tg(e, n), o);
}, zh.dragend = (e) => {
	let t = e.dragging;
	window.setTimeout(() => {
		e.dragging == t && (e.dragging = null);
	}, 50);
}, Bh.dragover = Bh.dragenter = (e, t) => t.preventDefault(), Bh.drop = (e, t) => {
	try {
		Eg(e, t, e.dragging);
	} finally {
		e.dragging = null;
	}
};
function Eg(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(Xh(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = Ch(e, Sg(t.dataTransfer), vg ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && Tg(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || H.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? yd(e.state.doc, i.pos, a) : i.pos;
	s ??= i.pos;
	let c = e.state.tr;
	if (o) {
		let { node: e } = n;
		e ? e.replace(c) : c.deleteSelection();
	}
	let l = c.mapping.map(s), u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1, d = c.doc;
	if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
	let f = c.doc.resolve(l);
	if (u && G.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new G(f));
	else {
		let t = c.mapping.map(s);
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection($m(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
zh.focus = (e) => {
	e.input.lastFocus = Date.now(), e.focused || (e.domObserver.stop(), e.dom.classList.add("ProseMirror-focused"), e.domObserver.start(), e.focused = !0, setTimeout(() => {
		e.docView && e.hasFocus() && !e.domObserver.currentSelection.eq(e.domSelectionRange()) && Wm(e);
	}, 20));
}, zh.blur = (e, t) => {
	let n = t;
	e.focused &&= (e.domObserver.stop(), e.dom.classList.remove("ProseMirror-focused"), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1);
}, zh.beforeinput = (e, t) => {
	if (Ep && Mp && t.inputType == "deleteContentBackward") {
		e.domObserver.flushSoon();
		let { domChangeCount: t } = e.input;
		setTimeout(() => {
			if (e.input.domChangeCount != t || (e.dom.blur(), e.focus(), e.someProp("handleKeyDown", (t) => t(e, pp(8, "Backspace"))))) return;
			let { $cursor: n } = e.state.selection;
			n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
		}, 50);
	}
};
for (let e in Bh) zh[e] = Bh[e];
function Dg(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
var Og = class e {
	constructor(e, t) {
		this.toDOM = e, this.spec = t || Ng, this.side = this.spec.side || 0;
	}
	map(e, t, n, r) {
		let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
		return a ? null : new jg(i - n, i - n, this);
	}
	valid() {
		return !0;
	}
	eq(t) {
		return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && Dg(this.spec, t.spec));
	}
	destroy(e) {
		this.spec.destroy && this.spec.destroy(e);
	}
}, kg = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Ng;
	}
	map(e, t, n, r) {
		let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
		return i >= a ? null : new jg(i, a, this);
	}
	valid(e, t) {
		return t.from < t.to;
	}
	eq(t) {
		return this == t || t instanceof e && Dg(this.attrs, t.attrs) && Dg(this.spec, t.spec);
	}
	static is(t) {
		return t.type instanceof e;
	}
	destroy() {}
}, Ag = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Ng;
	}
	map(e, t, n, r) {
		let i = e.mapResult(t.from + r, 1);
		if (i.deleted) return null;
		let a = e.mapResult(t.to + r, -1);
		return a.deleted || a.pos <= i.pos ? null : new jg(i.pos - n, a.pos - n, this);
	}
	valid(e, t) {
		let { index: n, offset: r } = e.content.findIndex(t.from), i;
		return r == t.from && !(i = e.child(n)).isText && r + i.nodeSize == t.to;
	}
	eq(t) {
		return this == t || t instanceof e && Dg(this.attrs, t.attrs) && Dg(this.spec, t.spec);
	}
	destroy() {}
}, jg = class e {
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
		return new e(t, t, new Og(n, r));
	}
	static inline(t, n, r, i) {
		return new e(t, n, new kg(r, i));
	}
	static node(t, n, r, i) {
		return new e(t, n, new Ag(r, i));
	}
	get spec() {
		return this.type.spec;
	}
	get inline() {
		return this.type instanceof kg;
	}
	get widget() {
		return this.type instanceof Og;
	}
}, Mg = [], Ng = {}, Pg = class e {
	constructor(e, t) {
		this.local = e.length ? e : Mg, this.children = t.length ? t : Mg;
	}
	static create(e, t) {
		return t.length ? Hg(t, e, 0, Ng) : Fg;
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
		return this == Fg || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Ng);
	}
	mapInner(t, n, r, i, a) {
		let o;
		for (let e = 0; e < this.local.length; e++) {
			let s = this.local[e].map(t, r, i);
			s && s.type.valid(n, s) ? (o ||= []).push(s) : a.onRemove && a.onRemove(this.local[e].spec);
		}
		return this.children.length ? Lg(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(Ug), Mg) : Fg;
	}
	add(t, n) {
		return n.length ? this == Fg ? e.create(t, n) : this.addInner(t, n, 0) : this;
	}
	addInner(t, n, r) {
		let i, a = 0;
		t.forEach((e, t) => {
			let o = t + r, s;
			if (s = Bg(n, e, o)) {
				for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
				i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, Hg(s, e, o + 1, Ng)), a += 3;
			}
		});
		let o = Rg(a ? Vg(n) : n, -r);
		for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || o.splice(e--, 1);
		return new e(o.length ? this.local.concat(o).sort(Ug) : this.local, i || this.children);
	}
	remove(e) {
		return e.length == 0 || this == Fg ? this : this.removeInner(e, 0);
	}
	removeInner(t, n) {
		let r = this.children, i = this.local;
		for (let e = 0; e < r.length; e += 3) {
			let i, a = r[e] + n, o = r[e + 1] + n;
			for (let e = 0, n; e < t.length; e++) (n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
			if (!i) continue;
			r == this.children && (r = this.children.slice());
			let s = r[e + 2].removeInner(i, a + 1);
			s == Fg ? (r.splice(e, 3), e -= 3) : r[e + 2] = s;
		}
		if (i.length) {
			for (let e = 0, r; e < t.length; e++) if (r = t[e]) for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
		}
		return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : Fg;
	}
	forChild(t, n) {
		if (this == Fg) return this;
		if (n.isLeaf) return e.empty;
		let r, i;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] >= t) {
			this.children[e] == t && (r = this.children[e + 2]);
			break;
		}
		let a = t + 1, o = a + n.content.size;
		for (let e = 0; e < this.local.length; e++) {
			let t = this.local[e];
			if (t.from < o && t.to > a && t.type instanceof kg) {
				let e = Math.max(a, t.from) - a, n = Math.min(o, t.to) - a;
				e < n && (i ||= []).push(t.copy(e, n));
			}
		}
		if (i) {
			let t = new e(i.sort(Ug), Mg);
			return r ? new Ig([t, r]) : t;
		}
		return r || Fg;
	}
	eq(t) {
		if (this == t) return !0;
		if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
		for (let e = 0; e < this.local.length; e++) if (!this.local[e].eq(t.local[e])) return !1;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
		return !0;
	}
	locals(e) {
		return Wg(this.localsInner(e));
	}
	localsInner(e) {
		if (this == Fg) return Mg;
		if (e.inlineContent || !this.local.some(kg.is)) return this.local;
		let t = [];
		for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof kg || t.push(this.local[e]);
		return t;
	}
	forEachSet(e) {
		e(this);
	}
};
Pg.empty = new Pg([], []), Pg.removeOverlap = Wg;
var Fg = Pg.empty, Ig = class e {
	constructor(e) {
		this.members = e;
	}
	map(t, n) {
		let r = this.members.map((e) => e.map(t, n, Ng));
		return e.from(r);
	}
	forChild(t, n) {
		if (n.isLeaf) return Pg.empty;
		let r = [];
		for (let i = 0; i < this.members.length; i++) {
			let a = this.members[i].forChild(t, n);
			a != Fg && (a instanceof e ? r = r.concat(a.members) : r.push(a));
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
		return t ? Wg(n ? t : t.sort(Ug)) : Mg;
	}
	static from(t) {
		switch (t.length) {
			case 0: return Fg;
			case 1: return t[0];
			default: return new e(t.every((e) => e instanceof Pg) ? t : t.reduce((e, t) => e.concat(t instanceof Pg ? t : t.members), []));
		}
	}
	forEachSet(e) {
		for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
	}
};
function Lg(e, t, n, r, i, a, o) {
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
			r == Fg ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r);
		} else c = !0;
	}
	if (c) {
		let c = Hg(zg(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new Pg(t.sort(Ug), s);
}
function Rg(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new jg(i.from + t, i.to + t, i.type));
	}
	return n;
}
function zg(e, t, n, r, i, a, o) {
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
function Bg(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function Vg(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function Hg(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = Bg(e, t, o + n);
		if (s) {
			a = !0;
			let e = Hg(s, t, n + o + 1, r);
			e != Fg && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = Rg(a ? Vg(e) : e, -n).sort(Ug);
	for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || (r.onRemove && r.onRemove(o[e].spec), o.splice(e--, 1));
	return o.length || i.length ? new Pg(o, i) : Fg;
}
function Ug(e, t) {
	return e.from - t.from || e.to - t.to;
}
function Wg(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) {
				a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), Gg(t, i + 1, a.copy(r.to, a.to)));
				continue;
			} else {
				a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), Gg(t, i, r.copy(a.from, r.to)));
				break;
			}
		}
	}
	return t;
}
function Gg(e, t, n) {
	for (; t < e.length && Ug(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function Kg(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != Fg && t.push(r);
	}), e.cursorWrapper && t.push(Pg.create(e.state.doc, [e.cursorWrapper.deco])), Ig.from(t);
}
var qg = {
	childList: !0,
	characterData: !0,
	characterDataOldValue: !0,
	attributes: !0,
	attributeOldValue: !0,
	subtree: !0
}, Jg = Sp && Cp <= 11, Yg = class {
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
}, Xg = class {
	constructor(e, t) {
		this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Yg(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((t) => {
			for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
			Sp && Cp <= 11 && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : Op && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
		}), Jg && (this.onCharData = (e) => {
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
		this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, qg)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
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
		if (eh(this.view)) {
			if (this.suppressingSelectionUpdates) return Wm(this.view);
			if (Sp && Cp <= 11 && !this.view.state.selection.empty) {
				let e = this.view.domSelectionRange();
				if (e.focusNode && ip(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon();
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
		for (let n = e.focusNode; n; n = ep(n)) t.add(n);
		for (let r = e.anchorNode; r; r = ep(r)) if (t.has(r)) {
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
		let n = e.domSelectionRange(), r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && eh(e) && !this.ignoreSelectionChange(n), i = -1, a = -1, o = !1, s = [];
		if (e.editable) for (let e = 0; e < t.length; e++) {
			let n = this.registerMutation(t[e], s);
			n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0));
		}
		if (s.some((e) => e.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46)) {
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
		} else if (wp && s.length) {
			let t = s.filter((e) => e.nodeName == "BR");
			if (t.length == 2) {
				let [e, n] = t;
				e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove();
			} else {
				let { focusNode: n } = this.currentSelection;
				for (let r of t) {
					let t = r.parentNode;
					t && t.nodeName == "LI" && (!n || n_(e, n) != t) && r.remove();
				}
			}
		}
		let c = null;
		i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && fp(n) && (c = Hm(e)) && c.eq(U.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Wm(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), $g(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, r_(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || Wm(e), this.currentSelection.set(n));
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
			if (Sp && Cp <= 11 && e.addedNodes.length) for (let t = 0; t < e.addedNodes.length; t++) {
				let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
				(!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a);
			}
			let a = r && r.parentNode == e.target ? $f(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? $f(i) : e.target.childNodes.length;
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
}, Zg = /* @__PURE__ */ new WeakMap(), Qg = !1;
function $g(e) {
	if (!Zg.has(e) && (Zg.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = wp, Qg) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Qg = !0;
	}
}
function e_(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return ip(o.node, o.offset, i, a) && ([n, r, i, a] = [
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
function t_(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return e_(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? e_(e, n) : null;
}
function n_(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function r_(e, t) {
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
function i_(e, t, n) {
	let { node: r, fromOffset: i, toOffset: a, from: o, to: s } = e.docView.parseRange(t, n), c = e.domSelectionRange(), l, u = c.anchorNode;
	if (u && e.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (l = [{
		node: u,
		offset: c.anchorOffset
	}], fp(c) || l.push({
		node: c.focusNode,
		offset: c.focusOffset
	})), Ep && e.input.lastKeyCode === 8) for (let e = a; e > i; e--) {
		let t = r.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			a = e;
			break;
		}
		if (!n || n.size) break;
	}
	let d = e.state.doc, f = e.someProp("domParser") || au.fromSchema(e.state.schema), p = d.resolve(o), m = null, h = f.parse(r, {
		topNode: p.parent,
		topMatch: p.parent.contentMatchAt(p.index()),
		topOpen: !0,
		from: i,
		to: a,
		preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
		findPositions: l,
		ruleFromNode: a_,
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
function a_(e) {
	let t = e.pmViewDesc;
	if (t) return t.parseRule();
	if (e.nodeName == "BR" && e.parentNode) {
		if (Op && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
			let e = document.createElement("div");
			return e.appendChild(document.createElement("li")), { skip: e };
		} else if (e.parentNode.lastChild == e || Op && /^(tr|table)$/i.test(e.parentNode.nodeName)) return { ignore: !0 };
	} else if (e.nodeName == "IMG" && e.getAttribute("mark-placeholder")) return { ignore: !0 };
	return null;
}
var o_ = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function s_(e, t, n, r, i) {
	let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = Hm(e, t);
		if (n && !e.state.selection.eq(n)) {
			if (Ep && Mp && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && e.someProp("handleKeyDown", (t) => t(e, pp(13, "Enter")))) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), a && r.setMeta("composition", a), e.dispatch(r);
		}
		return;
	}
	let o = e.state.doc.resolve(t), s = o.sharedDepth(n);
	t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
	let c = e.state.selection, l = i_(e, t, n), u = e.state.doc, d = u.slice(l.from, l.to), f, p;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = "end") : (f = e.state.selection.from, p = "start"), e.input.lastKeyCode = null;
	let m = f_(d.content, l.doc.content, l.from, f, p);
	if (m && e.input.domChangeCount++, (kp && e.input.lastIOSEnter > Date.now() - 225 || Mp) && i.some((e) => e.nodeType == 1 && !o_.test(e.nodeName)) && (!m || m.endA >= m.endB) && e.someProp("handleKeyDown", (t) => t(e, pp(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!m) if (r && c instanceof W && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
		start: c.from,
		endA: c.to,
		endB: c.to
	};
	else {
		if (l.sel) {
			let t = c_(e, e.state.doc, l.sel);
			if (t && !t.eq(e.state.selection)) {
				let n = e.state.tr.setSelection(t);
				a && n.setMeta("composition", a), e.dispatch(n);
			}
		}
		return;
	}
	e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof W && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), Sp && Cp <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == " \xA0" && (m.start--, m.endA--, m.endB--);
	let h = l.doc.resolveNoCache(m.start - l.from), g = l.doc.resolveNoCache(m.endB - l.from), _ = u.resolve(m.start), v = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
	if ((kp && e.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !v && h.pos < l.doc.content.size && (!h.sameParent(g) || !h.parent.inlineContent) && h.pos < g.pos && !/\S/.test(l.doc.textBetween(h.pos, g.pos, "", ""))) && e.someProp("handleKeyDown", (t) => t(e, pp(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > m.start && u_(u, m.start, m.endA, h, g) && e.someProp("handleKeyDown", (t) => t(e, pp(8, "Backspace")))) {
		Mp && Ep && e.domObserver.suppressSelectionUpdates();
		return;
	}
	Ep && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), Mp && !v && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => {
		e.someProp("handleKeyDown", function(t) {
			return t(e, pp(13, "Enter"));
		});
	}, 20));
	let y = m.start, b = m.endA, x = (t) => {
		let n = t || e.state.tr.replace(y, b, l.doc.slice(m.start - l.from, m.endB - l.from));
		if (l.sel) {
			let t = c_(e, n.doc, l.sel);
			t && !(Ep && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == y || t.head == n.mapping.map(b) - 1) || Sp && t.empty && t.head == y) && n.setSelection(t);
		}
		return a && n.setMeta("composition", a), n.scrollIntoView();
	}, S;
	if (v) if (h.pos == g.pos) {
		Sp && Cp <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Wm(e), 20));
		let t = x(e.state.tr.delete(y, b)), n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
		n && t.ensureMarks(n), e.dispatch(t);
	} else if (m.endA == m.endB && (S = l_(h.parent.content.cut(h.parentOffset, g.parentOffset), _.parent.content.cut(_.parentOffset, m.endA - _.start())))) {
		let t = x(e.state.tr);
		S.type == "add" ? t.addMark(y, b, S.mark) : t.removeMark(y, b, S.mark), e.dispatch(t);
	} else if (h.parent.child(h.index()).isText && h.index() == g.index() - +!g.textOffset) {
		let t = h.parent.textBetween(h.parentOffset, g.parentOffset), n = () => x(e.state.tr.insertText(t, y, b));
		e.someProp("handleTextInput", (r) => r(e, y, b, t, n)) || e.dispatch(n());
	} else e.dispatch(x());
	else e.dispatch(x());
}
function c_(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : $m(e, t.resolve(n.anchor), t.resolve(n.head));
}
function l_(e, t) {
	let n = e.firstChild.marks, r = t.firstChild.marks, i = n, a = r, o, s, c;
	for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
	for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
	if (i.length == 1 && a.length == 0) s = i[0], o = "add", c = (e) => e.mark(s.addToSet(e.marks));
	else if (i.length == 0 && a.length == 1) s = a[0], o = "remove", c = (e) => e.mark(s.removeFromSet(e.marks));
	else return null;
	let l = [];
	for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
	if (B.from(l).eq(e)) return {
		mark: s,
		type: o
	};
}
function u_(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || d_(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.isTextblock) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(d_(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || d_(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function d_(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function f_(e, t, n, r, i) {
	let a = e.findDiffStart(t, n);
	if (a == null) return null;
	let { a: o, b: s } = e.findDiffEnd(t, n + e.size, n + t.size);
	if (i == "end") {
		let e = Math.max(0, a - Math.min(o, s));
		r -= o + e - a;
	}
	if (o < a && e.size < t.size) {
		let e = r <= a && r >= o ? a - r : 0;
		a -= e, a && a < t.size && p_(t.textBetween(a - 1, a + 1)) && (a += e ? 1 : -1), s = a + (s - o), o = a;
	} else if (s < a) {
		let t = r <= a && r >= s ? a - r : 0;
		a -= t, a && a < e.size && p_(e.textBetween(a - 1, a + 1)) && (a += t ? 1 : -1), o = a + (o - s), s = a;
	}
	return {
		start: a,
		endA: o,
		endB: s
	};
}
function p_(e) {
	if (e.length != 2) return !1;
	let t = e.charCodeAt(0), n = e.charCodeAt(1);
	return t >= 56320 && t <= 57343 && n >= 55296 && n <= 56319;
}
var m_ = class {
	constructor(e, t) {
		this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Hh(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(x_), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = __(this), g_(this), this.nodeViews = y_(this), this.docView = Sm(this.state.doc, h_(this), Kg(this), this.dom, this), this.domObserver = new Xg(this, (e, t, n, r) => s_(this, e, t, n, r)), this.domObserver.start(), Uh(this), this.updatePluginViews();
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
		e.handleDOMEvents != this._props.handleDOMEvents && Kh(this);
		let t = this._props;
		this._props = e, e.plugins && (e.plugins.forEach(x_), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
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
		e.storedMarks && this.composing && (pg(this), i = !0), this.state = e;
		let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
		if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
			let e = y_(this);
			b_(e, this.nodeViews) && (this.nodeViews = e, r = !0);
		}
		(a || t.handleDOMEvents != this._props.handleDOMEvents) && Kh(this), this.editable = __(this), g_(this);
		let o = Kg(this), s = h_(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
		(l || !e.selection.eq(n.selection)) && (i = !0);
		let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && zp(this);
		if (i) {
			this.domObserver.stop();
			let t = l && (Sp || Ep) && !this.composing && !n.selection.empty && !e.selection.empty && v_(n.selection, e.selection);
			if (l) {
				let n = Ep ? this.trackWrites = this.domSelectionRange().focusNode : null;
				this.composing && (this.input.compositionNode = mg(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = Sm(e.doc, s, o, this.dom, this)), n && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (t = !0);
			}
			t || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && nh(this)) ? Wm(this, t) : (Zm(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
		}
		this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && Vp(u);
	}
	scrollToSelection() {
		let e = this.domSelectionRange().focusNode;
		if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode)) && !this.someProp("handleScrollToSelection", (e) => e(this))) if (this.state.selection instanceof G) {
			let t = this.docView.domAfterPos(this.state.selection.from);
			t.nodeType == 1 && Rp(this, t.getBoundingClientRect(), e);
		} else Rp(this, this.coordsAtPos(this.state.selection.head, 1), e);
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
		this.dragging = new Cg(e.slice, e.move, r < 0 ? void 0 : G.create(this.state.doc, r));
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
		if (Sp) {
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
		this.domObserver.stop(), this.editable && Wp(this.dom), Wm(this), this.domObserver.start();
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
		return Qp(this, e);
	}
	coordsAtPos(e, t = 1) {
		return nm(this, e, t);
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
		return fm(this, t || this.state, e);
	}
	pasteHTML(e, t) {
		return xg(this, "", e, !1, t || new ClipboardEvent("paste"));
	}
	pasteText(e, t) {
		return xg(this, e, null, !0, t || new ClipboardEvent("paste"));
	}
	serializeForClipboard(e) {
		return Sh(this, e);
	}
	destroy() {
		this.docView && (Gh(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Kg(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, rp());
	}
	get isDestroyed() {
		return this.docView == null;
	}
	dispatchEvent(e) {
		return Yh(this, e);
	}
	domSelectionRange() {
		let e = this.domSelection();
		return e ? Op && this.root.nodeType === 11 && mp(this.dom.ownerDocument) == this.dom && t_(this, e) || e : {
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
m_.prototype.dispatch = function(e) {
	let t = this._props.dispatchTransaction;
	t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function h_(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [jg.node(0, e.state.doc.content.size, t)];
}
function g_(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: jg.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function __(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function v_(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function y_(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function b_(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function x_(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
for (var S_ = {
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
}, C_ = {
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
}, w_ = typeof navigator < "u" && /Mac/.test(navigator.platform), T_ = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), E_ = 0; E_ < 10; E_++) S_[48 + E_] = S_[96 + E_] = String(E_);
for (var E_ = 1; E_ <= 24; E_++) S_[E_ + 111] = "F" + E_;
for (var E_ = 65; E_ <= 90; E_++) S_[E_] = String.fromCharCode(E_ + 32), C_[E_] = String.fromCharCode(E_);
for (var D_ in S_) C_.hasOwnProperty(D_) || (C_[D_] = S_[D_]);
function O_(e) {
	var t = !(w_ && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || T_ && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? C_ : S_)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
//#endregion
//#region node_modules/prosemirror-keymap/dist/index.js
var k_ = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), A_ = typeof navigator < "u" && /Win/.test(navigator.platform);
function j_(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) k_ ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function M_(e) {
	let t = Object.create(null);
	for (let n in e) t[j_(n)] = e[n];
	return t;
}
function N_(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function P_(e) {
	return new K({ props: { handleKeyDown: F_(e) } });
}
function F_(e) {
	let t = M_(e);
	return function(e, n) {
		let r = O_(n), i, a = t[N_(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[N_(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(A_ && n.ctrlKey && n.altKey) && (i = S_[n.keyCode]) && i != r) {
				let r = t[N_(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
//#endregion
//#region node_modules/@tiptap/core/dist/index.js
var I_ = Object.defineProperty, L_ = (e, t) => {
	for (var n in t) I_(e, n, {
		get: t[n],
		enumerable: !0
	});
};
function R_(e) {
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
var z_ = class {
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
			state: R_({
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
}, B_ = {};
L_(B_, {
	blur: () => V_,
	clearContent: () => H_,
	clearNodes: () => U_,
	command: () => W_,
	createParagraphNear: () => G_,
	cut: () => K_,
	deleteCurrentNode: () => q_,
	deleteNode: () => Y_,
	deleteRange: () => X_,
	deleteSelection: () => Z_,
	enter: () => Q_,
	exitCode: () => $_,
	extendMarkRange: () => ov,
	first: () => sv,
	focus: () => mv,
	forEach: () => hv,
	insertContent: () => gv,
	insertContentAt: () => Sv,
	joinBackward: () => Tv,
	joinDown: () => wv,
	joinForward: () => Ev,
	joinItemBackward: () => Dv,
	joinItemForward: () => Ov,
	joinTextblockBackward: () => kv,
	joinTextblockForward: () => Av,
	joinUp: () => Cv,
	keyboardShortcut: () => Nv,
	lift: () => Fv,
	liftEmptyBlock: () => Iv,
	liftListItem: () => Lv,
	newlineInCode: () => Rv,
	resetAttributes: () => Vv,
	scrollIntoView: () => Hv,
	selectAll: () => Uv,
	selectNodeBackward: () => Wv,
	selectNodeForward: () => Gv,
	selectParentNode: () => Kv,
	selectTextblockEnd: () => qv,
	selectTextblockStart: () => Jv,
	setContent: () => Xv,
	setMark: () => Ky,
	setMeta: () => qy,
	setNode: () => Jy,
	setNodeSelection: () => Yy,
	setTextDirection: () => Xy,
	setTextSelection: () => Zy,
	sinkListItem: () => Qy,
	splitBlock: () => eb,
	splitListItem: () => tb,
	toggleList: () => ab,
	toggleMark: () => ob,
	toggleNode: () => sb,
	toggleWrap: () => cb,
	undoInputRule: () => lb,
	unsetAllMarks: () => ub,
	unsetMark: () => db,
	unsetTextDirection: () => fb,
	updateAttributes: () => pb,
	wrapIn: () => mb,
	wrapInList: () => hb
});
var V_ = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
	var n;
	e.isDestroyed || (t.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), H_ = (e = !0) => ({ commands: t }) => t.setContent("", { emitUpdate: e }), U_ = () => ({ state: e, tr: t, dispatch: n }) => {
	let { selection: r } = t, { ranges: i } = r;
	return n && i.forEach(({ $from: n, $to: r }) => {
		e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
			if (e.type.isText) return;
			let { doc: r, mapping: i } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
			if (!s) return;
			let c = $u(s);
			if (e.type.isTextblock) {
				let { defaultType: e } = a.parent.contentMatchAt(a.index());
				t.setNodeMarkup(s.start, e);
			}
			(c || c === 0) && t.lift(s, c);
		});
	}), !0;
}, W_ = (e) => (t) => e(t), G_ = () => ({ state: e, dispatch: t }) => Of(e, t), K_ = (e, t) => ({ editor: n, tr: r }) => {
	let { state: i } = n, a = i.doc.slice(e.from, e.to);
	r.deleteRange(e.from, e.to);
	let o = r.mapping.map(t);
	return r.insert(o, a.content), r.setSelection(new W(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, q_ = () => ({ tr: e, dispatch: t }) => {
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
function J_(e, t) {
	if (typeof e == "string") {
		if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
		return t.nodes[e];
	}
	return e;
}
var Y_ = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let i = J_(e, n.schema), a = t.selection.$anchor;
	for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
		if (r) {
			let n = a.before(e), r = a.after(e);
			t.delete(n, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, X_ = (e) => ({ tr: t, dispatch: n }) => {
	let { from: r, to: i } = e;
	return n && t.delete(r, i), !0;
}, Z_ = () => ({ state: e, dispatch: t }) => lf(e, t), Q_ = () => ({ commands: e }) => e.keyboardShortcut("Enter"), $_ = () => ({ state: e, dispatch: t }) => Df(e, t);
function ev(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function tv(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return r.length ? r.every((r) => n.strict ? t[r] === e[r] : ev(t[r]) ? t[r].test(e[r]) : t[r] === e[r]) : !0;
}
function nv(e, t, n = {}) {
	return e.find((e) => e.type === t && tv(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function rv(e, t, n = {}) {
	return !!nv(e, t, n);
}
function iv(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if ((!r.node || !r.node.marks.some((e) => e.type === t)) && (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t)) return;
	if (!n) {
		let e = r.node.marks.find((e) => e.type === t);
		e && (n = e.attrs);
	}
	if (!nv([...r.node.marks], t, n)) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && rv([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && rv([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function av(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
var ov = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = av(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
	if (i) {
		let e = iv(c, a, t);
		if (e && e.from <= l && e.to >= u) {
			let t = W.create(o, e.from, e.to);
			n.setSelection(t);
		}
	}
	return !0;
}, sv = (e) => (t) => {
	let n = typeof e == "function" ? e(t) : e;
	for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
	return !1;
};
function cv(e) {
	return e instanceof W;
}
function lv(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function uv(e, t = null) {
	if (!t) return null;
	let n = U.atStart(e), r = U.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? W.create(e, lv(0, i, a), lv(e.content.size, i, a)) : W.create(e, lv(t, i, a), lv(t, i, a));
}
function dv() {
	return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function fv() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function pv() {
	return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
var mv = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
	t = {
		scrollIntoView: !0,
		...t
	};
	let o = () => {
		(fv() || dv()) && r.dom.focus(), pv() && !fv() && !dv() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
			n.isDestroyed || (r.focus(), t?.scrollIntoView && n.commands.scrollIntoView());
		});
	};
	try {
		if (r.hasFocus() && e === null || e === !1) return !0;
	} catch {
		return !1;
	}
	if (a && e === null && !cv(n.state.selection)) return o(), !0;
	let s = uv(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
	return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, hv = (e, t) => (n) => e.every((e, r) => t(e, {
	...n,
	index: r
})), gv = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
	from: n.selection.from,
	to: n.selection.to
}, e, t), _v = (e) => {
	let t = e.childNodes;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && _v(r);
	}
	return e;
};
function vv(e) {
	if (typeof window > "u") throw Error("[tiptap error]: there is no window object available, so this function cannot be used");
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return _v(n);
}
function yv(e, t, n) {
	if (e instanceof Al || e instanceof B) return e;
	n = {
		slice: !0,
		parseOptions: {},
		...n
	};
	let r = typeof e == "object" && !!e, i = typeof e == "string";
	if (r) try {
		if (Array.isArray(e) && e.length > 0) return B.fromArray(e.map((e) => t.nodeFromJSON(e)));
		let r = t.nodeFromJSON(e);
		return n.errorOnInvalidContent && r.check(), r;
	} catch (r) {
		if (n.errorOnInvalidContent) throw Error("[tiptap error]: Invalid JSON content", { cause: r });
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), yv("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new tu({
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
			if (n.slice ? au.fromSchema(a).parseSlice(vv(e), n.parseOptions) : au.fromSchema(a).parse(vv(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = au.fromSchema(t);
		return n.slice ? r.parseSlice(vv(e), n.parseOptions).content : r.parse(vv(e), n.parseOptions);
	}
	return yv("", t, n);
}
function bv(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Ku || i instanceof qu)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(U.near(e.doc.resolve(o), n));
}
var xv = (e) => !("type" in e), Sv = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
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
			yv(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: !0
			});
		} catch (e) {
			o(e);
		}
		try {
			i = yv(t, a.schema, {
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
		if ((xv(i) ? i : [i]).forEach((e) => {
			e.check(), u = u ? e.isText && e.marks.length === 0 : !1, d = d ? e.isBlock : !1;
		}), c === l && d) {
			let { parent: e } = r.doc.resolve(c);
			e.isTextblock && !e.type.spec.code && !e.childCount && (--c, l += 1);
		}
		let f;
		if (u) {
			if (Array.isArray(t)) f = t.map((e) => e.text || "").join("");
			else if (t instanceof B) {
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
		n.updateSelection && bv(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
			from: c,
			text: f
		}), n.applyPasteRules && r.setMeta("applyPasteRules", {
			from: c,
			text: f
		});
	}
	return !0;
}, Cv = () => ({ state: e, dispatch: t }) => Sf(e, t), wv = () => ({ state: e, dispatch: t }) => Cf(e, t), Tv = () => ({ state: e, dispatch: t }) => df(e, t), Ev = () => ({ state: e, dispatch: t }) => yf(e, t), Dv = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = gd(e.doc, e.selection.$from.pos, -1);
		return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Ov = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = gd(e.doc, e.selection.$from.pos, 1);
		return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, kv = () => ({ state: e, dispatch: t }) => ff(e, t), Av = () => ({ state: e, dispatch: t }) => pf(e, t);
function jv() {
	return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Mv(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) fv() || jv() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
var Nv = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
	let a = Mv(e).split(/-(?!$)/), o = a.find((e) => ![
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
function Pv(e, t, n = {}) {
	let { from: r, to: i, empty: a } = e.selection, o = t ? J_(t, e.schema) : null, s = [];
	e.doc.nodesBetween(r, i, (e, t) => {
		if (e.isText) return;
		let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize);
		s.push({
			node: e,
			from: n,
			to: a
		});
	});
	let c = i - r, l = s.filter((e) => o ? o.name === e.node.type.name : !0).filter((e) => tv(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
var Fv = (e, t = {}) => ({ state: n, dispatch: r }) => Pv(n, J_(e, n.schema), t) ? wf(n, r) : !1, Iv = () => ({ state: e, dispatch: t }) => kf(e, t), Lv = (e) => ({ state: t, dispatch: n }) => Yf(J_(e, t.schema))(t, n), Rv = () => ({ state: e, dispatch: t }) => Tf(e, t);
function zv(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function Bv(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
var Vv = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = zv(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = J_(e, r.schema)), s === "mark" && (o = av(e, r.schema));
	let c = !1;
	return n.selection.ranges.forEach((e) => {
		r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
			a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, Bv(e.attrs, t))), o && e.marks.length && e.marks.forEach((a) => {
				o === a.type && (c = !0, i && n.addMark(r, r + e.nodeSize, o.create(Bv(a.attrs, t))));
			});
		});
	}), c;
}, Hv = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), Uv = () => ({ tr: e, dispatch: t }) => {
	if (t) {
		let t = new Gd(e.doc);
		e.setSelection(t);
	}
	return !0;
}, Wv = () => ({ state: e, dispatch: t }) => gf(e, t), Gv = () => ({ state: e, dispatch: t }) => bf(e, t), Kv = () => ({ state: e, dispatch: t }) => Mf(e, t), qv = () => ({ state: e, dispatch: t }) => Rf(e, t), Jv = () => ({ state: e, dispatch: t }) => Lf(e, t);
function Yv(e, t, n = {}, r = {}) {
	return yv(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
var Xv = (e, { errorOnInvalidContent: t, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
	let { doc: c } = a;
	if (r.preserveWhitespace !== "full") {
		let s = Yv(e, i.schema, r, { errorOnInvalidContent: t ?? i.options.enableContentCheck });
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
function Zv(e, t) {
	let n = av(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function Qv(e, t) {
	let n = new Rd(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function $v(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
function ey(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function ty(e, t) {
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
function ny(e) {
	return (t) => ty(t.$from, e);
}
function q(e, t, n) {
	return e.config[t] === void 0 && e.parent ? q(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
		...n,
		parent: e.parent ? q(e.parent, t, n) : null
	}) : e.config[t];
}
function ry(e) {
	return e.map((e) => {
		let t = q(e, "addExtensions", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		return t ? [e, ...ry(t())] : e;
	}).flat(10);
}
function iy(e, t) {
	let n = yu.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
function ay(e) {
	return typeof e == "function";
}
function J(e, t = void 0, ...n) {
	return ay(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function oy(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function sy(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function cy(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = sy(e), i = [...n, ...r], a = {
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
function ly(e) {
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
function uy(e) {
	let t = [], n = ly(e || ""), r = n.length;
	for (let e = 0; e < r; e += 1) {
		let r = n[e], i = r.indexOf(":");
		if (i === -1) continue;
		let a = r.slice(0, i).trim(), o = r.slice(i + 1).trim();
		a && o && t.push([a, o]);
	}
	return t;
}
function dy(...e) {
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
				let r = new Map([...uy(n[e]), ...uy(t)]);
				n[e] = Array.from(r.entries()).map(([e, t]) => `${e}: ${t}`).join("; ");
			} else n[e] = t;
		}), n;
	}, {});
}
function fy(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => dy(e, t), {});
}
function py(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" ? !0 : e === "false" ? !1 : e : e;
}
function my(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : py(n.getAttribute(t.name));
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
function hy(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && oy(t) ? !1 : t != null));
}
function gy(e) {
	let t = {};
	return !e?.attribute?.isRequired && "default" in (e?.attribute || {}) && (t.default = e.attribute.default), e?.attribute?.validate !== void 0 && (t.validate = e.attribute.validate), [e.name, t];
}
function _y(e, t) {
	let n = cy(e), { nodeExtensions: r, markExtensions: i } = sy(e);
	return new tu({
		topNode: r.find((e) => q(e, "topNode"))?.name,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = hy({
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
				attrs: Object.fromEntries(i.map(gy))
			}), s = J(q(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => my(e, i)));
			let c = q(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: fy(e, i)
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
			}, o = hy({
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
				attrs: Object.fromEntries(i.map(gy))
			}), s = J(q(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => my(e, i)));
			let c = q(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: fy(e, i)
			})), [r.name, o];
		}))
	});
}
function vy(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
function yy(e) {
	return e.sort((e, t) => {
		let n = q(e, "priority") || 100, r = q(t, "priority") || 100;
		return n > r ? -1 : +(n < r);
	});
}
function by(e) {
	let t = yy(ry(e)), n = vy(t.map((e) => e.name));
	return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((e) => `'${e}'`).join(", ")}]. This can lead to issues.`), t;
}
function xy(e, t, n) {
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
function Sy(e, t) {
	return xy(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function Cy(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function wy(e, t) {
	let n = J_(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function Ty(e, t) {
	let n = zv(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? wy(e, t) : n === "mark" ? Zv(e, t) : {};
}
function Ey(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function Dy(e) {
	let t = Ey(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function Oy(e) {
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
	}), Dy(r);
}
function ky(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = iv(n.resolve(e), t.type);
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
var Ay = (e, t, n, r = 20) => {
	let i = e.doc.resolve(n), a = r, o = null;
	for (; a > 0 && o === null;) {
		let e = i.node(a);
		e?.type.name === t ? o = e : --a;
	}
	return [o, a];
};
function jy(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function My(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
var Ny = (e, t = 500) => {
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
function Py(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? av(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => a ? a.name === e.type.name : !0).find((e) => tv(e.attrs, n, { strict: !1 }));
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
	let c = s.filter((e) => a ? a.name === e.mark.type.name : !0).filter((e) => tv(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => a ? e.mark.type !== a && e.mark.type.excludes(a) : !0).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function Fy(e, t, n = {}) {
	if (!t) return Pv(e, null, n) || Py(e, null, n);
	let r = zv(t, e.schema);
	return r === "node" ? Pv(e, t, n) : r === "mark" ? Py(e, t, n) : !1;
}
var Iy = (e, t) => {
	let { $from: n, $to: r, $anchor: i } = e.selection;
	if (t) {
		let n = ny((e) => e.type.name === t)(e.selection);
		if (!n) return !1;
		let r = e.doc.resolve(n.pos + 1);
		return i.pos + 1 === r.end();
	}
	return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, Ly = (e) => {
	let { $from: t, $to: n } = e.selection;
	return !(t.parentOffset > 0 || t.pos !== n.pos);
};
function Ry(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function zy(e, t) {
	let { nodeExtensions: n } = sy(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = J(q(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" ? i.split(" ").includes("list") : !1;
}
function By(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
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
			r !== !1 && (By(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function Vy(e) {
	return e instanceof G;
}
var Hy = class e {
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
function Uy(e, t) {
	let n = t.mapping.mapResult(e.position);
	return {
		position: new Hy(n.pos),
		mapResult: n
	};
}
function Wy(e) {
	return new Hy(e);
}
function Gy(e, t, n) {
	let { selection: r } = t, i = null;
	if (cv(r) && (i = r.$cursor), i) {
		let t = e.storedMarks ?? i.marks();
		return i.parent.type.allowsMarkType(n) && (!!n.isInSet(t) || !t.some((e) => e.type.excludes(n)));
	}
	let { ranges: a } = r;
	return a.some(({ $from: t, $to: r }) => {
		let i = t.depth === 0 ? e.doc.inlineContent && e.doc.type.allowsMarkType(n) : !1;
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
var Ky = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = n, { empty: o, ranges: s } = a, c = av(e, r.schema);
	if (i) if (o) {
		let e = Zv(r, c);
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
	return Gy(r, n, c);
}, qy = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), Jy = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
	let a = J_(e, n.schema), o;
	return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => Bf(a, {
		...o,
		...t
	})(n) ? !0 : e.clearNodes()).command(({ state: e }) => Bf(a, {
		...o,
		...t
	})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
}, Yy = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, r = lv(e, 0, n.content.size), i = G.create(n, r);
		t.setSelection(i);
	}
	return !0;
}, Xy = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = r, o, s;
	return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = a.from, s = a.to), i && n.doc.nodesBetween(o, s, (t, r) => {
		t.isText || n.setNodeMarkup(r, void 0, {
			...t.attrs,
			dir: e
		});
	}), !0;
}, Zy = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
			from: e,
			to: e
		} : e, a = W.atStart(n).from, o = W.atEnd(n).to, s = lv(r, a, o), c = lv(i, a, o), l = W.create(n, s, c);
		t.setSelection(l);
	}
	return !0;
}, Qy = (e) => ({ state: t, dispatch: n }) => Qf(J_(e, t.schema))(t, n);
function $y(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
var eb = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
	let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = My(l, s.node().type.name, s.node().attrs);
	if (a instanceof G && a.node.isBlock) return !s.parentOffset || !dd(o, s.pos) ? !1 : (r && (e && $y(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
	if (!s.parent.isBlock) return !1;
	let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : $v(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
		type: f,
		attrs: u
	}] : void 0, m = dd(t.doc, t.mapping.map(s.pos), 1, p);
	if (!p && !m && dd(t.doc, t.mapping.map(s.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
		type: f,
		attrs: u
	}] : void 0), r) {
		if (m && (a instanceof W && t.deleteSelection(), t.split(t.mapping.map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f)) {
			let e = t.mapping.map(s.before()), n = t.doc.resolve(e);
			s.node(-1).canReplaceWith(n.index(), n.index() + 1, f) && t.setNodeMarkup(t.mapping.map(s.before()), f);
		}
		e && $y(n, i.extensionManager.splittableMarks), t.scrollIntoView();
	}
	return m;
}, tb = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
	let o = J_(e, r.schema), { $from: s, $to: c } = r.selection, l = r.selection.node;
	if (l && l.isBlock || s.depth < 2 || !s.sameParent(c)) return !1;
	let u = s.node(-1);
	if (u.type !== o) return !1;
	let d = a.extensionManager.attributes;
	if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
		if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
		if (i) {
			let e = B.empty, r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
			for (let t = s.depth - r; t >= s.depth - 3; --t) e = B.from(s.node(t).copy(e));
			let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, a = {
				...My(d, s.node().type.name, s.node().attrs),
				...t
			}, c = o.contentMatch.defaultType?.createAndFill(a) || void 0;
			e = e.append(B.from(o.createAndFill(null, c) || void 0));
			let l = s.before(s.depth - (r - 1));
			n.replace(l, s.after(-i), new H(e, 4 - r, 0));
			let u = -1;
			n.doc.nodesBetween(l, n.doc.content.size, (e, t) => {
				if (u > -1) return !1;
				e.isTextblock && e.content.size === 0 && (u = t + 1);
			}), u > -1 && n.setSelection(W.near(n.doc.resolve(u))), n.scrollIntoView();
		}
		return !0;
	}
	let f = c.pos === s.end() ? u.contentMatchAt(0).defaultType : null, p = {
		...My(d, u.type.name, u.attrs),
		...t
	}, m = {
		...My(d, s.node().type.name, s.node().attrs),
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
	if (!dd(n.doc, s.pos, 2)) return !1;
	if (i) {
		let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
		if (n.split(s.pos, 2, h).scrollIntoView(), !c || !i) return !0;
		let l = c.filter((e) => o.includes(e.type.name));
		n.ensureMarks(l);
	}
	return !0;
}, nb = (e, t) => {
	let n = ny((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return n.node.type === i?.type && pd(e.doc, n.pos) && e.join(n.pos), !0;
}, rb = (e, t) => {
	let n = ny((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(n.start).after(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return n.node.type === i?.type && pd(e.doc, r) && e.join(r), !0;
};
function ib(e) {
	let t = e.doc, n = t.firstChild;
	if (!n) return null;
	let r = t.resolve(1), i = t.resolve(n.nodeSize - 1);
	return W.between(r, i);
}
var ab = (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
	let { extensions: d, splittableMarks: f } = i.extensionManager, p = J_(e, o.schema), m = J_(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: v } = h, y = _.blockRange(v), b = g || h.$to.parentOffset && h.$from.marks();
	if (!y) return !1;
	let x = ny((e) => zy(e.type.name, d))(h), S = h.from === 0 && h.to === o.doc.content.size, C = o.doc.content.content, w = C.length === 1 ? C[0] : null, T = S && w && zy(w.type.name, d) ? {
		node: w,
		pos: 0,
		depth: 0
	} : null, E = x ?? T, ee = !!x && y.depth >= 1 && y.depth - x.depth <= 1, D = !!T;
	if ((ee || D) && E) {
		if (E.node.type === p) return S && D ? c().command(({ tr: e, dispatch: t }) => {
			let n = ib(e);
			return n ? (e.setSelection(n), t && t(e), !0) : !1;
		}).liftListItem(m).run() : l.liftListItem(m);
		if (zy(E.node.type.name, d) && p.validContent(E.node.content)) return c().command(() => (a.setNodeMarkup(E.pos, p), !0)).command(() => nb(a, p)).command(() => rb(a, p)).run();
	}
	return !n || !b || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => nb(a, p)).command(() => rb(a, p)).run() : c().command(() => {
		let e = u().wrapInList(p, r), t = b.filter((e) => f.includes(e.type.name));
		return a.ensureMarks(t), e ? !0 : l.clearNodes();
	}).wrapInList(p, r).command(() => nb(a, p)).command(() => rb(a, p)).run();
}, ob = (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
	let { extendEmptyMarkRange: a = !1 } = n, o = av(e, r.schema);
	return Py(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
}, sb = (e, t, n = {}) => ({ state: r, commands: i }) => {
	let a = J_(e, r.schema), o = J_(t, r.schema), s = Pv(r, a, n), c;
	return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
		...c,
		...n
	});
}, cb = (e, t = {}) => ({ state: n, commands: r }) => {
	let i = J_(e, n.schema);
	return Pv(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
}, lb = () => ({ state: e, dispatch: t }) => {
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
}, ub = () => ({ tr: e, dispatch: t }) => {
	let { selection: n } = e, { empty: r, ranges: i } = n;
	return r || t && i.forEach((t) => {
		e.removeMark(t.$from.pos, t.$to.pos);
	}), !0;
}, db = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = av(e, r.schema), { $from: c, empty: l, ranges: u } = o;
	if (!i) return !0;
	if (l && a) {
		let { from: e, to: t } = o, r = iv(c, s, c.marks().find((e) => e.type === s)?.attrs);
		r && (e = r.from, t = r.to), n.removeMark(e, t, s);
	} else u.forEach((e) => {
		n.removeMark(e.$from.pos, e.$to.pos, s);
	});
	return n.removeStoredMark(s), !0;
}, fb = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let { selection: i } = n, a, o;
	return typeof e == "number" ? (a = e, o = e) : e && "from" in e && "to" in e ? (a = e.from, o = e.to) : (a = i.from, o = i.to), r && t.doc.nodesBetween(a, o, (e, n) => {
		if (e.isText) return;
		let r = { ...e.attrs };
		delete r.dir, t.setNodeMarkup(n, void 0, r);
	}), !0;
}, pb = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = zv(typeof e == "string" ? e : e.name, r.schema);
	if (!s) return !1;
	s === "node" && (a = J_(e, r.schema)), s === "mark" && (o = av(e, r.schema));
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
}, mb = (e, t = {}) => ({ state: n, dispatch: r }) => zf(J_(e, n.schema), t)(n, r), hb = (e, t = {}) => ({ state: n, dispatch: r }) => Kf(J_(e, n.schema), t)(n, r), gb = class {
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
}, _b = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler, this.undoable = e.undoable ?? !0;
	}
}, vb = (e, t) => {
	if (ev(t)) return t.exec(e);
	let n = t(e);
	if (!n) return null;
	let r = [n.text];
	return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
};
function yb(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o } = e, { view: s } = t;
	if (s.composing) return !1;
	let c = s.state.doc.resolve(n);
	if (c.parent.type.spec.code || (c.nodeBefore || c.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let l = !1, u = Ny(c) + i;
	return a.forEach((e) => {
		if (l) return;
		let a = vb(u, e.find);
		if (!a) return;
		let c = s.state.tr, d = R_({
			state: s.state,
			transaction: c
		}), f = {
			from: n - (a[0].length - i.length),
			to: r
		}, { commands: p, chain: m, can: h } = new z_({
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
function bb(e) {
	let { editor: t, rules: n } = e, r = new K({
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
					e = typeof e == "string" ? e : iy(B.from(e), a.schema);
					let { from: i } = s;
					yb({
						editor: t,
						from: i,
						to: i + e.length,
						text: e,
						rules: n,
						plugin: r
					});
				}), e.selectionSet || e.docChanged ? null : i;
			}
		},
		props: {
			handleTextInput(e, i, a, o) {
				return yb({
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
				i && yb({
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
				return a ? yb({
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
function xb(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function Sb(e) {
	return xb(e) === "Object" ? e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype : !1;
}
function Cb(e, t) {
	let n = { ...e };
	return Sb(e) && Sb(t) && Object.keys(t).forEach((r) => {
		Sb(t[r]) && Sb(e[r]) ? n[r] = Cb(e[r], t[r]) : n[r] = t[r];
	}), n;
}
var wb = class {
	constructor(e = {}) {
		this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name;
	}
	get options() {
		return { ...J(q(this, "addOptions", { name: this.name })) || {} };
	}
	get storage() {
		return { ...J(q(this, "addStorage", {
			name: this.name,
			options: this.options
		})) || {} };
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => Cb(this.options, e)
		});
		return t.name = this.name, t.parent = this.parent, t;
	}
	extend(e = {}) {
		let t = new this.constructor({
			...this.config,
			...e
		});
		return t.parent = this, this.child = t, t.name = "name" in e ? e.name : t.parent.name, t;
	}
}, Tb = class e extends wb {
	constructor() {
		super(...arguments), this.type = "mark";
	}
	static create(t = {}) {
		return new e(typeof t == "function" ? t() : t);
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
};
function Eb(e) {
	return typeof e == "number";
}
var Db = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, Ob = (e, t, n) => {
	if (ev(t)) return [...e.matchAll(t)];
	let r = t(e, n);
	return r ? r.map((t) => {
		let n = [t.text];
		return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
	}) : [];
};
function kb(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new z_({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		if (e.type?.spec?.code || !(e.isText || e.isTextblock || e.isInline)) return;
		let f = e.content?.size ?? e.nodeSize ?? 0, p = Math.max(r, t), m = Math.min(i, t + f);
		p >= m || Ob(e.isText ? e.text || "" : e.textBetween(p - t, m - t, void 0, "￼"), a.find, o).forEach((e) => {
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
var Ab = null, jb = (e) => {
	var t;
	let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
	return (t = n.clipboardData) == null || t.setData("text/html", e), n;
};
function Mb(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr;
		if (!(!kb({
			editor: t,
			state: R_({
				state: e,
				transaction: c
			}),
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
	return n.map((e) => new K({
		view(e) {
			let n = (n) => {
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (Ab = t);
			}, i = () => {
				Ab &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = Ab;
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
				t = typeof t == "string" ? t : iy(B.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = jb(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if (!(!Eb(p) || !m || p === m.b)) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
var Nb = class {
	constructor(e, t) {
		this.splittableMarks = [], this.editor = t, this.baseExtensions = e, this.extensions = by(e), this.schema = _y(this.extensions, t), this.setupExtensions();
	}
	get commands() {
		return this.extensions.reduce((e, t) => {
			let n = q(t, "addCommands", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: this.editor,
				type: jy(t.name, this.schema)
			});
			return n ? {
				...e,
				...n()
			} : e;
		}, {});
	}
	get plugins() {
		let { editor: e } = this;
		return yy([...this.extensions].reverse()).flatMap((t) => {
			let n = {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: jy(t.name, this.schema)
			}, r = [], i = q(t, "addKeyboardShortcuts", n), a = {};
			if (t.type === "mark" && q(t, "exitable", n) && (a.ArrowRight = () => Tb.handleExit({
				editor: e,
				mark: t
			})), i) {
				let t = Object.fromEntries(Object.entries(i()).map(([t, n]) => [t, () => n({ editor: e })]));
				a = {
					...a,
					...t
				};
			}
			let o = P_(a);
			r.push(o);
			let s = q(t, "addInputRules", n);
			if (Ry(t, e.options.enableInputRules) && s) {
				let t = s();
				if (t && t.length) {
					let n = bb({
						editor: e,
						rules: t
					}), i = Array.isArray(n) ? n : [n];
					r.push(...i);
				}
			}
			let c = q(t, "addPasteRules", n);
			if (Ry(t, e.options.enablePasteRules) && c) {
				let t = c();
				if (t && t.length) {
					let n = Mb({
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
		});
	}
	get attributes() {
		return cy(this.extensions);
	}
	get nodeViews() {
		let { editor: e } = this, { nodeExtensions: t } = sy(this.extensions);
		return Object.fromEntries(t.filter((e) => !!q(e, "addNodeView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = q(t, "addNodeView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: J_(t.name, this.schema)
			});
			if (!r) return [];
			let i = r();
			return i ? [t.name, (r, a, o, s, c) => i({
				node: r,
				view: a,
				getPos: o,
				decorations: s,
				innerDecorations: c,
				editor: e,
				extension: t,
				HTMLAttributes: fy(r, n)
			})] : [];
		}));
	}
	dispatchTransaction(e) {
		let { editor: t } = this;
		return yy([...this.extensions].reverse()).reduceRight((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: jy(n.name, this.schema)
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
		return yy([...this.extensions]).reduce((e, n) => {
			let r = {
				name: n.name,
				options: n.options,
				storage: this.editor.extensionStorage[n.name],
				editor: t,
				type: jy(n.name, this.schema)
			}, i = q(n, "transformPastedHTML", r);
			return i ? (t, n) => {
				let a = e(t, n);
				return i.call(r, a);
			} : e;
		}, e || ((e) => e));
	}
	get markViews() {
		let { editor: e } = this, { markExtensions: t } = sy(this.extensions);
		return Object.fromEntries(t.filter((e) => !!q(e, "addMarkView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = q(t, "addMarkView", {
				name: t.name,
				options: t.options,
				storage: this.editor.extensionStorage[t.name],
				editor: e,
				type: av(t.name, this.schema)
			});
			return r ? [t.name, (i, a, o) => {
				let s = fy(i, n);
				return r()({
					mark: i,
					view: a,
					inline: o,
					editor: e,
					extension: t,
					HTMLAttributes: s,
					updateAttributes: (t) => {
						dx(i, e, t);
					}
				});
			}] : [];
		}));
	}
	setupExtensions() {
		let e = this.extensions;
		this.editor.extensionStorage = Object.fromEntries(e.map((e) => [e.name, e.storage])), e.forEach((e) => {
			let t = {
				name: e.name,
				options: e.options,
				storage: this.editor.extensionStorage[e.name],
				editor: this.editor,
				type: jy(e.name, this.schema)
			};
			e.type === "mark" && (J(q(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name);
			let n = q(e, "onBeforeCreate", t), r = q(e, "onCreate", t), i = q(e, "onUpdate", t), a = q(e, "onSelectionUpdate", t), o = q(e, "onTransaction", t), s = q(e, "onFocus", t), c = q(e, "onBlur", t), l = q(e, "onDestroy", t);
			n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
		});
	}
};
Nb.resolve = by, Nb.sort = yy, Nb.flatten = ry, L_({}, {
	ClipboardTextSerializer: () => Pb,
	Commands: () => Fb,
	Delete: () => Ib,
	Drop: () => Lb,
	Editable: () => Rb,
	FocusEvents: () => Bb,
	Keymap: () => Vb,
	Paste: () => Hb,
	Tabindex: () => Ub,
	TextDirection: () => Wb,
	focusEventsPluginKey: () => zb
});
var Y = class e extends wb {
	constructor() {
		super(...arguments), this.type = "extension";
	}
	static create(t = {}) {
		return new e(typeof t == "function" ? t() : t);
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
}, Pb = Y.create({
	name: "clipboardTextSerializer",
	addOptions() {
		return { blockSeparator: void 0 };
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("clipboardTextSerializer"),
			props: { clipboardTextSerializer: () => {
				let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, { ranges: a } = i, o = Math.min(...a.map((e) => e.$from.pos)), s = Math.max(...a.map((e) => e.$to.pos)), c = Cy(n);
				return xy(r, {
					from: o,
					to: s
				}, {
					...this.options.blockSeparator === void 0 ? {} : { blockSeparator: this.options.blockSeparator },
					textSerializers: c
				});
			} }
		})];
	}
}), Fb = Y.create({
	name: "commands",
	addCommands() {
		return { ...B_ };
	}
}), Ib = Y.create({
	name: "delete",
	onUpdate({ transaction: e, appendedTransactions: t }) {
		let n = () => {
			var n;
			if (((n = this.editor.options.coreExtensionOptions?.delete)?.filterTransaction)?.call(n, e) ?? e.getMeta("y-sync$")) return;
			let r = Qv(e.before, [e, ...t]);
			Oy(r).forEach((t) => {
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
				if (t instanceof Uu) {
					let a = i.slice(n).map(t.from, -1), o = i.slice(n).map(t.to), s = i.invert().map(a, -1), c = i.invert().map(o), l = a > 0 ? r.doc.nodeAt(a - 1)?.marks.some((e) => e.eq(t.mark)) : !1, u = r.doc.nodeAt(o)?.marks.some((e) => e.eq(t.mark));
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
}), Lb = Y.create({
	name: "drop",
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("tiptapDrop"),
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
}), Rb = Y.create({
	name: "editable",
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("editable"),
			props: { editable: () => this.editor.options.editable }
		})];
	}
}), zb = new cf("focusEvents"), Bb = Y.create({
	name: "focusEvents",
	addProseMirrorPlugins() {
		let { editor: e } = this;
		return [new K({
			key: zb,
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
}), Vb = Y.create({
	name: "keymap",
	addKeyboardShortcuts() {
		let e = () => this.editor.commands.first(({ commands: e }) => [
			() => e.undoInputRule(),
			() => e.command(({ tr: t }) => {
				let { selection: n, doc: r } = t, { empty: i, $anchor: a } = n, { pos: o, parent: s } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : U.atStart(r).from === o;
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
		return fv() || jv() ? i : r;
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("clearDocument"),
			appendTransaction: (e, t, n) => {
				if (e.some((e) => e.getMeta("composition"))) return;
				let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
				if (!r || i) return;
				let { empty: a, from: o, to: s } = t.selection, c = U.atStart(t.doc).from, l = U.atEnd(t.doc).to;
				if (a || !(o === c && s === l) || !By(n.doc)) return;
				let u = n.tr, d = R_({
					state: n,
					transaction: u
				}), { commands: f } = new z_({
					editor: this.editor,
					state: d
				});
				if (f.clearNodes(), u.steps.length) return u;
			}
		})];
	}
}), Hb = Y.create({
	name: "paste",
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("tiptapPaste"),
			props: { handlePaste: (e, t, n) => {
				this.editor.emit("paste", {
					editor: this.editor,
					event: t,
					slice: n
				});
			} }
		})];
	}
}), Ub = Y.create({
	name: "tabindex",
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("tabindex"),
			props: { attributes: () => this.editor.isEditable ? { tabindex: "0" } : {} }
		})];
	}
}), Wb = Y.create({
	name: "textDirection",
	addOptions() {
		return { direction: void 0 };
	},
	addGlobalAttributes() {
		if (!this.options.direction) return [];
		let { nodeExtensions: e } = sy(this.extensions);
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
		return [new K({
			key: new cf("textDirection"),
			props: { attributes: () => {
				let e = this.options.direction;
				return e ? { dir: e } : {};
			} }
		})];
	}
}), Gb = class e {
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
		let t = this.resolvedPos.start(this.resolvedPos.depth - 1);
		return new e(this.resolvedPos.doc.resolve(t), this.editor);
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
}, Kb = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}";
function qb(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
var Jb = class extends gb {
	constructor(e = {}) {
		super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
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
			getUpdatedPosition: Uy,
			createMappablePosition: Wy
		}, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: e, slice: t, moved: n }) => this.options.onDrop(e, t, n)), this.on("paste", ({ event: e, slice: t }) => this.options.onPaste(e, t)), this.on("delete", this.options.onDelete);
		let t = this.createDoc(), n = uv(t, this.options.autofocus);
		this.editorState = rf.create({
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
		this.options.injectCSS && typeof document < "u" && (this.css = qb(Kb, this.options.injectNonce));
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
		let n = ay(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
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
			Rb,
			Pb.configure({ blockSeparator: this.options.coreExtensionOptions?.clipboardTextSerializer?.blockSeparator }),
			Fb,
			Bb,
			Vb,
			Ub,
			Lb,
			Hb,
			Ib,
			Wb.configure({ direction: this.options.textDirection })
		].filter((e) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[e.name] !== !1 : !0) : [], ...this.options.extensions].filter((e) => [
			"extension",
			"node",
			"mark"
		].includes(e?.type));
		this.extensionManager = new Nb(e, this);
	}
	createCommandManager() {
		this.commandManager = new z_({ editor: this });
	}
	createSchema() {
		this.schema = this.extensionManager.schema;
	}
	createDoc() {
		let e;
		try {
			e = Yv(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
		} catch (t) {
			if (!(t instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(t.message)) throw t;
			this.emit("contentError", {
				editor: this,
				error: t,
				disableCollaboration: () => {
					"collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
				}
			}), e = Yv(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
		}
		return e;
	}
	createView(e) {
		let { editorProps: t, enableExtensionDispatchTransaction: n } = this.options, r = t.dispatchTransaction || this.dispatchTransaction.bind(this), i = n ? this.extensionManager.dispatchTransaction(r) : r, a = t.transformPastedHTML, o = this.extensionManager.transformPastedHTML(a);
		this.editorView = new m_(e, {
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
		return Ty(this.state, e);
	}
	isActive(e, t) {
		let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
		return Fy(this.state, n, r);
	}
	getJSON() {
		return this.state.doc.toJSON();
	}
	getHTML() {
		return iy(this.state.doc.content, this.schema);
	}
	getText(e) {
		let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
		return Sy(this.state.doc, {
			blockSeparator: t,
			textSerializers: {
				...Cy(this.schema),
				...n
			}
		});
	}
	get isEmpty() {
		return By(this.state.doc);
	}
	destroy() {
		this.emit("destroy"), this.unmount(), this.removeAllListeners();
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
		return new Gb(this.state.doc.resolve(e), this);
	}
	get $doc() {
		return this.$pos(0);
	}
};
function Yb(e) {
	return new _b({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (ky(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		},
		undoable: e.undoable
	});
}
function Xb(e) {
	return new _b({
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
function Zb(e) {
	return new _b({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = J(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		},
		undoable: e.undoable
	});
}
function Qb(e) {
	return new _b({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = J(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && td(s, e.type, a);
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
			l && l.type === e.type && pd(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		},
		undoable: e.undoable
	});
}
var $b = (e) => "touches" in e, ex = class {
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
		}, this.node = e.node, this.editor = e.editor, this.element = e.element, this.contentElement = e.contentElement, this.getPos = e.getPos, this.onResize = e.onResize, this.onCommit = e.onCommit, this.onUpdate = e.onUpdate, e.options?.min && (this.minSize = {
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
		return e.type === this.node.type ? (this.node = e, this.onUpdate ? this.onUpdate(e, t, n) : !0) : !1;
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
		e.preventDefault(), e.stopPropagation(), this.isResizing = !0, this.activeHandle = t, $b(e) ? (this.startX = e.touches[0].clientX, this.startY = e.touches[0].clientY) : (this.startX = e.clientX, this.startY = e.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
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
};
function tx(e, t) {
	let { selection: n } = e, { $from: r } = n;
	if (n instanceof G) {
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
L_({}, {
	createAtomBlockMarkdownSpec: () => ix,
	createBlockMarkdownSpec: () => ax,
	createInlineMarkdownSpec: () => cx,
	parseAttributes: () => nx,
	parseIndentedBlocks: () => lx,
	renderNestedMarkdownContent: () => ux,
	serializeAttributes: () => rx
});
function nx(e) {
	if (!e?.trim()) return {};
	let t = {}, n = [], r = e.replace(/["']([^"']*)["']/g, (e) => (n.push(e), `__QUOTED_${n.length - 1}__`)), i = r.match(/(?:^|\s)\.([a-zA-Z][\w-]*)/g);
	i && (t.class = i.map((e) => e.trim().slice(1)).join(" "));
	let a = r.match(/(?:^|\s)#([a-zA-Z][\w-]*)/);
	a && (t.id = a[1]), Array.from(r.matchAll(/([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g)).forEach(([, e, r]) => {
		let i = n[parseInt(r.match(/__QUOTED_(\d+)__/)?.[1] || "0", 10)];
		i && (t[e] = i.slice(1, -1));
	});
	let o = r.replace(/(?:^|\s)\.([a-zA-Z][\w-]*)/g, "").replace(/(?:^|\s)#([a-zA-Z][\w-]*)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
	return o && o.split(/\s+/).filter(Boolean).forEach((e) => {
		e.match(/^[a-zA-Z][\w-]*$/) && (t[e] = !0);
	}), t;
}
function rx(e) {
	if (!e || Object.keys(e).length === 0) return "";
	let t = [];
	return e.class && String(e.class).split(/\s+/).filter(Boolean).forEach((e) => t.push(`.${e}`)), e.id && t.push(`#${e.id}`), Object.entries(e).forEach(([e, n]) => {
		e === "class" || e === "id" || (n === !0 ? t.push(e) : n !== !1 && n != null && t.push(`${e}="${String(n)}"`));
	}), t.join(" ");
}
function ix(e) {
	let { nodeName: t, name: n, parseAttributes: r = nx, serializeAttributes: i = rx, defaultAttributes: a = {}, requiredAttributes: o = [], allowedAttributes: s } = e, c = n || t, l = (e) => {
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
				let l = r(s[1] || "");
				if (!o.find((e) => !(e in l))) return {
					type: t,
					raw: s[0],
					attributes: l
				};
			}
		},
		renderMarkdown: (e) => {
			let t = i(l(e.attrs || {}));
			return `:::${c}${t ? ` {${t}}` : ""} :::`;
		}
	};
}
function ax(e) {
	let { nodeName: t, name: n, getContent: r, parseAttributes: i = nx, serializeAttributes: a = rx, defaultAttributes: o = {}, content: s = "block", allowedAttributes: c } = e, l = n || t, u = (e) => {
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
			let n = a(u(e.attrs || {}));
			return `:::${l}${n ? ` {${n}}` : ""}

${t.renderChildren(e.content || [], "\n\n")}

:::`;
		}
	};
}
function ox(e) {
	if (!e.trim()) return {};
	let t = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g, r = n.exec(e);
	for (; r !== null;) {
		let [, i, a, o] = r;
		t[i] = a || o, r = n.exec(e);
	}
	return t;
}
function sx(e) {
	return Object.entries(e).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function cx(e) {
	let { nodeName: t, name: n, getContent: r, parseAttributes: i = ox, serializeAttributes: a = sx, defaultAttributes: o = {}, selfClosing: s = !1, allowedAttributes: c } = e, l = n || t, u = (e) => {
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
			let n = a(u(e.attrs || {})), i = n ? ` ${n}` : "";
			return s ? `[${l}${i}]` : `[${l}${i}]${t}[/${l}]`;
		}
	};
}
function lx(e, t, n) {
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
function ux(e, t, n, r) {
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
function dx(e, t, n = {}) {
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
var fx = class e extends wb {
	constructor() {
		super(...arguments), this.type = "node";
	}
	static create(t = {}) {
		return new e(typeof t == "function" ? t() : t);
	}
	configure(e) {
		return super.configure(e);
	}
	extend(e) {
		let t = typeof e == "function" ? e() : e;
		return super.extend(t);
	}
};
function px(e) {
	return new Db({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = J(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let i = c.search(/\S/), u = n.from + c.indexOf(s), d = u + s.length;
				if (ky(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > u).length) return null;
				d < n.to && o.delete(d, n.to), u > n.from && o.delete(n.from + i, u), l = n.from + i + s.length, o.addMark(n.from + i, l, e.type.create(a || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(e.type);
			}
		}
	});
}
//#endregion
//#region node_modules/@tiptap/vue-3/dist/index.js
function mx(e) {
	return s((t, n) => ({
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
var hx = class extends Jb {
	constructor(e = {}) {
		return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = mx(this.view.state), this.reactiveExtensionStorage = mx(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
			this.reactiveState.value = e, this.reactiveExtensionStorage.value = this.extensionStorage;
		}), d(this);
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
}, gx = c({
	name: "EditorContent",
	props: { editor: {
		default: null,
		type: Object
	} },
	setup(e) {
		let t = _(), n = l();
		return ee(() => {
			let r = e.editor;
			r && r.options.element && t.value && f(() => {
				if (!t.value || !r.view.dom?.parentNode) return;
				let e = x(t.value);
				t.value.append(...r.view.dom.parentNode.childNodes), r.contentComponent = n.ctx._, n && (r.appContext = {
					...n.appContext,
					provides: n.provides
				}), r.setOptions({ element: e }), r.createNodeViews();
			});
		}), h(() => {
			let t = e.editor;
			t && (t.contentComponent = null, t.appContext = null);
		}), { rootEl: t };
	},
	render() {
		return u("div", { ref: (e) => {
			this.rootEl = e;
		} });
	}
});
c({
	name: "NodeViewContent",
	props: { as: {
		type: String,
		default: "div"
	} },
	render() {
		return u(this.as, {
			style: { whiteSpace: "pre-wrap" },
			"data-node-view-content": ""
		});
	}
}), c({
	name: "NodeViewWrapper",
	props: { as: {
		type: String,
		default: "div"
	} },
	inject: ["onDragStart", "decorationClasses"],
	render() {
		var e;
		return u(this.as, {
			class: this.decorationClasses,
			style: { whiteSpace: "normal" },
			"data-node-view-wrapper": "",
			onDragstart: this.onDragStart
		}, (e = this.$slots).default?.call(e));
	}
}), c({
	name: "MarkViewContent",
	props: { as: {
		type: String,
		default: "span"
	} },
	render() {
		return u(this.as, {
			style: { whiteSpace: "inherit" },
			"data-mark-view-content": ""
		});
	}
});
//#endregion
//#region node_modules/@tiptap/core/dist/jsx-runtime/jsx-runtime.js
var _x = (e, t) => {
	if (e === "slot") return 0;
	if (e instanceof Function) return e(t);
	let { children: n, ...r } = t ?? {};
	if (e === "svg") throw Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
	return [
		e,
		r,
		n
	];
}, vx = /^\s*>\s$/, yx = fx.create({
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
		return /* @__PURE__ */ _x("blockquote", {
			...dy(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ _x("slot", {})
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
		return { "Mod-Shift-b": () => this.editor.commands.toggleBlockquote() };
	},
	addInputRules() {
		return [Qb({
			find: vx,
			type: this.type
		})];
	}
}), bx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, xx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, Sx = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, Cx = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, wx = Tb.create({
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
		return /* @__PURE__ */ _x("strong", {
			...dy(this.options.HTMLAttributes, e),
			children: /* @__PURE__ */ _x("slot", {})
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
		return [Yb({
			find: bx,
			type: this.type
		}), Yb({
			find: Sx,
			type: this.type
		})];
	},
	addPasteRules() {
		return [px({
			find: xx,
			type: this.type
		}), px({
			find: Cx,
			type: this.type
		})];
	}
}), Tx = /(^|[^`])`([^`]+)`(?!`)$/, Ex = /(^|[^`])`([^`]+)`(?!`)/g, Dx = Tb.create({
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
			dy(this.options.HTMLAttributes, e),
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
		return [Yb({
			find: Tx,
			type: this.type
		})];
	},
	addPasteRules() {
		return [px({
			find: Ex,
			type: this.type
		})];
	}
}), Ox = 4, kx = /^```([a-z]+)?[\s\n]$/, Ax = /^~~~([a-z]+)?[\s\n]$/, jx = fx.create({
	name: "codeBlock",
	addOptions() {
		return {
			languageClassPrefix: "language-",
			exitOnTripleEnter: !0,
			exitOnArrowDown: !0,
			defaultLanguage: null,
			enableTabIndentation: !1,
			tabSize: Ox,
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
			dy(this.options.HTMLAttributes, t),
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
				let t = this.options.tabSize ?? Ox, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
				if (i.parent.type !== this.type) return !1;
				let o = " ".repeat(t);
				return a ? e.commands.insertContent(o) : e.commands.command(({ tr: e }) => {
					let { from: t, to: i } = r, a = n.doc.textBetween(t, i, "\n", "\n").split("\n").map((e) => o + e).join("\n");
					return e.replaceWith(t, i, n.schema.text(a)), !0;
				});
			},
			"Shift-Tab": ({ editor: e }) => {
				if (!this.options.enableTabIndentation) return !1;
				let t = this.options.tabSize ?? Ox, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
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
					return e.delete(p, p + f), r - p <= f && e.setSelection(W.create(e.doc, p)), !0;
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
				return o === void 0 ? !1 : r.nodeAt(o) ? e.commands.command(({ tr: e }) => (e.setSelection(U.near(r.resolve(o))), !0)) : e.commands.exitCode();
			}
		};
	},
	addInputRules() {
		return [Zb({
			find: kx,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		}), Zb({
			find: Ax,
			type: this.type,
			getAttributes: (e) => ({ language: e[1] })
		})];
	},
	addProseMirrorPlugins() {
		return [new K({
			key: new cf("codeBlockVSCodeHandler"),
			props: { handlePaste: (e, t) => {
				if (!t.clipboardData || this.editor.isActive(this.type.name)) return !1;
				let n = t.clipboardData.getData("text/plain"), r = t.clipboardData.getData("vscode-editor-data"), i = (r ? JSON.parse(r) : void 0)?.mode;
				if (!n || !i) return !1;
				let { tr: a, schema: o } = e.state, s = o.text(n.replace(/\r\n?/g, "\n"));
				return a.replaceSelectionWith(this.type.create({ language: i }, s)), a.selection.$from.parent.type !== this.type && a.setSelection(W.near(a.doc.resolve(Math.max(0, a.selection.from - 2)))), a.setMeta("paste", !0), e.dispatch(a), !0;
			} }
		})];
	}
}), Mx = fx.create({
	name: "doc",
	topNode: !0,
	content: "block+",
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n\n") : ""
}), Nx = fx.create({
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
		return ["br", dy(this.options.HTMLAttributes, e)];
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
}), Px = fx.create({
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
			dy(this.options.HTMLAttributes, t),
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
		return this.options.levels.map((e) => Zb({
			find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
			type: this.type,
			getAttributes: { level: e }
		}));
	}
}), Fx = fx.create({
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
		return ["hr", dy(this.options.HTMLAttributes, e)];
	},
	markdownTokenName: "hr",
	parseMarkdown: (e, t) => t.createNode("horizontalRule"),
	renderMarkdown: () => "---",
	addCommands() {
		return { setHorizontalRule: () => ({ chain: e, state: t }) => {
			if (!tx(t, t.schema.nodes[this.name])) return !1;
			let { selection: n } = t, { $to: r } = n, i = e();
			return Vy(n) ? i.insertContentAt(r.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: e, tr: t, dispatch: n }) => {
				if (n) {
					let { $to: n } = t.selection, r = n.end();
					if (n.nodeAfter) n.nodeAfter.isTextblock ? t.setSelection(W.create(t.doc, n.pos + 1)) : n.nodeAfter.isBlock ? t.setSelection(G.create(t.doc, n.pos)) : t.setSelection(W.create(t.doc, n.pos));
					else {
						let i = (e.schema.nodes[this.options.nextNodeType] || n.parent.type.contentMatch.defaultType)?.create();
						i && (t.insert(r, i), t.setSelection(W.create(t.doc, r + 1)));
					}
					t.scrollIntoView();
				}
				return !0;
			}).run();
		} };
	},
	addInputRules() {
		return [Xb({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
}), Ix = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, Lx = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, Rx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, zx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, Bx = Tb.create({
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
			dy(this.options.HTMLAttributes, e),
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
		return [Yb({
			find: Ix,
			type: this.type
		}), Yb({
			find: Rx,
			type: this.type
		})];
	},
	addPasteRules() {
		return [px({
			find: Lx,
			type: this.type
		}), px({
			find: zx,
			type: this.type
		})];
	}
}), Vx = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Hx = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Ux = "numeric", Wx = "ascii", Gx = "alpha", Kx = "asciinumeric", qx = "alphanumeric", Jx = "domain", Yx = "emoji", Xx = "scheme", Zx = "slashscheme", Qx = "whitespace";
function $x(e, t) {
	return e in t || (t[e] = []), t[e];
}
function eS(e, t, n) {
	t[Ux] && (t[Kx] = !0, t[qx] = !0), t[Wx] && (t[Kx] = !0, t[Gx] = !0), t[Kx] && (t[qx] = !0), t[Gx] && (t[qx] = !0), t[qx] && (t[Jx] = !0), t[Yx] && (t[Jx] = !0);
	for (let r in t) {
		let t = $x(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function tS(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function nS(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
nS.groups = {}, nS.prototype = {
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
		r ||= nS.groups;
		let i;
		return t && t.j ? i = t : (i = new nS(t), n && r && eS(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= nS.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new nS(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new nS(), a && (r && (o.t && typeof o.t == "string" ? eS(a, Object.assign(tS(o.t, r), n), r) : n && eS(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var X = (e, t, n, r, i) => e.ta(t, n, r, i), Z = (e, t, n, r, i) => e.tr(t, n, r, i), rS = (e, t, n, r, i) => e.ts(t, n, r, i), Q = (e, t, n, r, i) => e.tt(t, n, r, i), iS = "WORD", aS = "UWORD", oS = "ASCIINUMERICAL", sS = "ALPHANUMERICAL", cS = "LOCALHOST", lS = "TLD", uS = "UTLD", dS = "SCHEME", fS = "SLASH_SCHEME", pS = "NUM", mS = "WS", hS = "NL", gS = "OPENBRACE", _S = "CLOSEBRACE", vS = "OPENBRACKET", yS = "CLOSEBRACKET", bS = "OPENPAREN", xS = "CLOSEPAREN", SS = "OPENANGLEBRACKET", CS = "CLOSEANGLEBRACKET", wS = "FULLWIDTHLEFTPAREN", TS = "FULLWIDTHRIGHTPAREN", ES = "LEFTCORNERBRACKET", DS = "RIGHTCORNERBRACKET", OS = "LEFTWHITECORNERBRACKET", kS = "RIGHTWHITECORNERBRACKET", AS = "FULLWIDTHLESSTHAN", jS = "FULLWIDTHGREATERTHAN", MS = "AMPERSAND", NS = "APOSTROPHE", PS = "ASTERISK", FS = "AT", IS = "BACKSLASH", LS = "BACKTICK", RS = "CARET", zS = "COLON", BS = "COMMA", VS = "DOLLAR", HS = "DOT", US = "EQUALS", WS = "EXCLAMATION", GS = "HYPHEN", KS = "PERCENT", qS = "PIPE", JS = "PLUS", YS = "POUND", XS = "QUERY", ZS = "QUOTE", QS = "FULLWIDTHMIDDLEDOT", $S = "SEMI", eC = "SLASH", tC = "TILDE", nC = "UNDERSCORE", rC = "EMOJI", iC = "SYM", aC = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: sS,
	AMPERSAND: MS,
	APOSTROPHE: NS,
	ASCIINUMERICAL: oS,
	ASTERISK: PS,
	AT: FS,
	BACKSLASH: IS,
	BACKTICK: LS,
	CARET: RS,
	CLOSEANGLEBRACKET: CS,
	CLOSEBRACE: _S,
	CLOSEBRACKET: yS,
	CLOSEPAREN: xS,
	COLON: zS,
	COMMA: BS,
	DOLLAR: VS,
	DOT: HS,
	EMOJI: rC,
	EQUALS: US,
	EXCLAMATION: WS,
	FULLWIDTHGREATERTHAN: jS,
	FULLWIDTHLEFTPAREN: wS,
	FULLWIDTHLESSTHAN: AS,
	FULLWIDTHMIDDLEDOT: QS,
	FULLWIDTHRIGHTPAREN: TS,
	HYPHEN: GS,
	LEFTCORNERBRACKET: ES,
	LEFTWHITECORNERBRACKET: OS,
	LOCALHOST: cS,
	NL: hS,
	NUM: pS,
	OPENANGLEBRACKET: SS,
	OPENBRACE: gS,
	OPENBRACKET: vS,
	OPENPAREN: bS,
	PERCENT: KS,
	PIPE: qS,
	PLUS: JS,
	POUND: YS,
	QUERY: XS,
	QUOTE: ZS,
	RIGHTCORNERBRACKET: DS,
	RIGHTWHITECORNERBRACKET: kS,
	SCHEME: dS,
	SEMI: $S,
	SLASH: eC,
	SLASH_SCHEME: fS,
	SYM: iC,
	TILDE: tC,
	TLD: lS,
	UNDERSCORE: nC,
	UTLD: uS,
	UWORD: aS,
	WORD: iS,
	WS: mS
}), oC = /[a-z]/, sC = /\p{L}/u, cC = /\p{Emoji}/u, lC = /\d/, uC = /\s/, dC = "\r", fC = "\n", pC = "️", mC = "‍", hC = "￼", gC = null, _C = null;
function vC(e = []) {
	let t = {};
	nS.groups = t;
	let n = new nS();
	gC ??= SC(Vx), _C ??= SC(Hx), Q(n, "'", NS), Q(n, "{", gS), Q(n, "}", _S), Q(n, "[", vS), Q(n, "]", yS), Q(n, "(", bS), Q(n, ")", xS), Q(n, "<", SS), Q(n, ">", CS), Q(n, "（", wS), Q(n, "）", TS), Q(n, "「", ES), Q(n, "」", DS), Q(n, "『", OS), Q(n, "』", kS), Q(n, "＜", AS), Q(n, "＞", jS), Q(n, "&", MS), Q(n, "*", PS), Q(n, "@", FS), Q(n, "`", LS), Q(n, "^", RS), Q(n, ":", zS), Q(n, ",", BS), Q(n, "$", VS), Q(n, ".", HS), Q(n, "=", US), Q(n, "!", WS), Q(n, "-", GS), Q(n, "%", KS), Q(n, "|", qS), Q(n, "+", JS), Q(n, "#", YS), Q(n, "?", XS), Q(n, "\"", ZS), Q(n, "/", eC), Q(n, ";", $S), Q(n, "~", tC), Q(n, "_", nC), Q(n, "\\", IS), Q(n, "・", QS);
	let r = Z(n, lC, pS, { [Ux]: !0 });
	Z(r, lC, r);
	let i = Z(r, oC, oS, { [Kx]: !0 }), a = Z(r, sC, sS, { [qx]: !0 }), o = Z(n, oC, iS, { [Wx]: !0 });
	Z(o, lC, i), Z(o, oC, o), Z(i, lC, i), Z(i, oC, i);
	let s = Z(n, sC, aS, { [Gx]: !0 });
	Z(s, oC), Z(s, lC, a), Z(s, sC, s), Z(a, lC, a), Z(a, oC), Z(a, sC, a);
	let c = Q(n, fC, hS, { [Qx]: !0 }), l = Q(n, dC, mS, { [Qx]: !0 }), u = Z(n, uC, mS, { [Qx]: !0 });
	Q(n, hC, u), Q(l, fC, c), Q(l, hC, u), Z(l, uC, u), Q(u, dC), Q(u, fC), Z(u, uC, u), Q(u, hC, u);
	let d = Z(n, cC, rC, { [Yx]: !0 });
	Q(d, "#"), Z(d, cC, d), Q(d, pC, d);
	let f = Q(d, mC);
	Q(f, "#"), Z(f, cC, d);
	let p = [[oC, o], [lC, i]], m = [
		[oC, null],
		[sC, s],
		[lC, a]
	];
	for (let e = 0; e < gC.length; e++) xC(n, gC[e], lS, iS, p);
	for (let e = 0; e < _C.length; e++) xC(n, _C[e], uS, aS, m);
	eS(lS, {
		tld: !0,
		ascii: !0
	}, t), eS(uS, {
		utld: !0,
		alpha: !0
	}, t), xC(n, "file", dS, iS, p), xC(n, "mailto", dS, iS, p), xC(n, "http", fS, iS, p), xC(n, "https", fS, iS, p), xC(n, "ftp", fS, iS, p), xC(n, "ftps", fS, iS, p), eS(dS, {
		scheme: !0,
		ascii: !0
	}, t), eS(fS, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [Xx]: !0 } : { [Zx]: !0 };
		r.indexOf("-") >= 0 ? i[Jx] = !0 : oC.test(r) ? lC.test(r) ? i[Kx] = !0 : i[Wx] = !0 : i[Ux] = !0, rS(n, r, r, i);
	}
	return rS(n, "localhost", cS, { ascii: !0 }), n.jd = new nS(iC), {
		start: n,
		tokens: Object.assign({ groups: t }, aC)
	};
}
function yC(e, t) {
	let n = bC(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function bC(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function xC(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new nS(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new nS(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function SC(e) {
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
var CC = {
	defaultProtocol: "http",
	events: null,
	format: TC,
	formatHref: TC,
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
function wC(e, t = null) {
	let n = Object.assign({}, CC);
	e && (n = Object.assign(n, e instanceof wC ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
wC.prototype = {
	o: CC,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : CC[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function TC(e) {
	return e;
}
function EC(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
EC.prototype = {
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
	toObject(e = CC.defaultProtocol) {
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
function DC(e, t) {
	class n extends EC {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var OC = DC("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), kC = DC("text"), AC = DC("nl"), jC = DC("url", {
	isLink: !0,
	toHref(e = CC.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== cS && e[1].t === zS;
	}
}), MC = (e) => new nS(e);
function NC({ groups: e }) {
	let t = e.domain.concat([
		MS,
		PS,
		FS,
		IS,
		LS,
		RS,
		VS,
		US,
		GS,
		pS,
		KS,
		qS,
		JS,
		YS,
		eC,
		iC,
		tC,
		nC
	]), n = [
		NS,
		zS,
		BS,
		HS,
		WS,
		KS,
		XS,
		ZS,
		$S,
		SS,
		CS,
		gS,
		_S,
		yS,
		vS,
		bS,
		xS,
		wS,
		TS,
		ES,
		DS,
		OS,
		kS,
		AS,
		jS
	], r = [
		MS,
		NS,
		PS,
		IS,
		LS,
		RS,
		VS,
		US,
		GS,
		gS,
		_S,
		KS,
		qS,
		JS,
		YS,
		XS,
		eC,
		iC,
		tC,
		nC
	], i = MC(), a = Q(i, tC);
	X(a, r, a), X(a, e.domain, a);
	let o = MC(), s = MC(), c = MC();
	X(i, e.domain, o), X(i, e.scheme, s), X(i, e.slashscheme, c), X(o, r, a), X(o, e.domain, o);
	let l = Q(o, FS);
	Q(a, FS, l), Q(s, FS, l), Q(c, FS, l);
	let u = Q(a, HS);
	X(u, r, a), X(u, e.domain, a);
	let d = MC();
	X(l, e.domain, d), X(d, e.domain, d);
	let f = Q(d, HS);
	X(f, e.domain, d);
	let p = MC(OC);
	X(f, e.tld, p), X(f, e.utld, p), Q(l, cS, p);
	let m = Q(d, GS);
	Q(m, GS, m), X(m, e.domain, d), X(p, e.domain, d), Q(p, HS, f), Q(p, GS, m), X(Q(p, zS), e.numeric, OC);
	let h = Q(o, GS), g = Q(o, HS);
	Q(h, GS, h), X(h, e.domain, o), X(g, r, a), X(g, e.domain, o);
	let _ = MC(jC);
	X(g, e.tld, _), X(g, e.utld, _), X(_, e.domain, o), X(_, r, a), Q(_, HS, g), Q(_, GS, h), Q(_, FS, l);
	let v = Q(_, zS), y = MC(jC);
	X(v, e.numeric, y);
	let b = MC(jC), x = MC();
	X(b, t, b), X(b, n, x), X(x, t, b), X(x, n, x), Q(_, eC, b), Q(y, eC, b);
	let S = Q(s, zS), C = Q(Q(Q(c, zS), eC), eC);
	X(s, e.domain, o), Q(s, HS, g), Q(s, GS, h), X(c, e.domain, o), Q(c, HS, g), Q(c, GS, h), X(S, e.domain, b), Q(S, eC, b), Q(S, XS, b), X(C, e.domain, b), X(C, t, b), Q(C, eC, b);
	let w = [
		[gS, _S],
		[vS, yS],
		[bS, xS],
		[SS, CS],
		[wS, TS],
		[ES, DS],
		[OS, kS],
		[AS, jS]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = Q(b, r);
		Q(x, r, a), Q(a, i, b);
		let o = MC(jC);
		X(a, t, o);
		let s = MC();
		X(a, n), X(o, t, o), X(o, n, s), X(s, t, o), X(s, n, s), Q(o, i, b), Q(s, i, b);
	}
	return Q(i, cS, _), Q(i, hS, AC), {
		start: i,
		tokens: aC
	};
}
function PC(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(FC(kC, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(FC(e, t, r));
		}
	}
	return o.length > 0 && a.push(FC(kC, t, o)), a;
}
function FC(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var IC = typeof console < "u" && console && console.warn || (() => {}), LC = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", $ = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function RC() {
	return nS.groups = {}, $.scanner = null, $.parser = null, $.tokenQueue = [], $.pluginQueue = [], $.customSchemes = [], $.initialized = !1, $;
}
function zC(e, t = !1) {
	if ($.initialized && IC(`linkifyjs: already initialized - will not register custom scheme "${e}" ${LC}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	$.customSchemes.push([e, t]);
}
function BC() {
	$.scanner = vC($.customSchemes);
	for (let e = 0; e < $.tokenQueue.length; e++) $.tokenQueue[e][1]({ scanner: $.scanner });
	$.parser = NC($.scanner.tokens);
	for (let e = 0; e < $.pluginQueue.length; e++) $.pluginQueue[e][1]({
		scanner: $.scanner,
		parser: $.parser
	});
	return $.initialized = !0, $;
}
function VC(e) {
	return $.initialized || BC(), PC($.parser.start, e, yC($.scanner.start, e));
}
VC.scan = yC;
function HC(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new wC(n), i = VC(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var UC = "[\0- \xA0 ᠎ -\u2029 　]", WC = new RegExp(UC), GC = RegExp(`${UC}$`), KC = new RegExp(UC, "g");
function qC(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function JC(e) {
	return new K({
		key: new cf("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r;
			if (Oy(Qv(n.doc, [...t])).forEach(({ newRange: t }) => {
				let n = ey(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!GC.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(WC).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = VC(n).map((t) => t.toObject(e.defaultProtocol));
					if (!qC(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => r.schema.marks.code ? !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code) : !0).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						ky(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function YC(e) {
	return new K({
		key: new cf("handleClickLink"),
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
				let n = Ty(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
function XC(e) {
	return new K({
		key: new cf("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = HC(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function ZC(e, t) {
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
	}), !e || e.replace(KC, "").match(RegExp(`^(?:(?:${n.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`, "i"));
}
var QC = Tb.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				zC(e);
				return;
			}
			zC(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		RC();
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
			isAllowedUri: (e, t) => !!ZC(e, t.protocols),
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
			target: { default: this.options.HTMLAttributes.target },
			rel: { default: this.options.HTMLAttributes.rel },
			class: { default: this.options.HTMLAttributes.class },
			title: { default: null }
		};
	},
	parseHTML() {
		return [{
			tag: "a[href]",
			getAttrs: (e) => {
				let t = e.getAttribute("href");
				return !t || !this.options.isAllowedUri(t, {
					defaultValidate: (e) => !!ZC(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!ZC(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			dy(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			dy(this.options.HTMLAttributes, {
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
					defaultValidate: (e) => !!ZC(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!ZC(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addPasteRules() {
		return [px({
			find: (e) => {
				let t = [];
				if (e) {
					let { protocols: n, defaultProtocol: r } = this.options, i = HC(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
						defaultValidate: (e) => !!ZC(e, n),
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
		return this.options.autolink && e.push(JC({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!ZC(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(YC({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" ? !0 : this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(XC({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), $C = QC, ew = Object.defineProperty, tw = (e, t) => {
	for (var n in t) ew(e, n, {
		get: t[n],
		enumerable: !0
	});
}, nw = "listItem", rw = "textStyle", iw = /^\s*([-+*])\s$/, aw = fx.create({
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
			dy(this.options.HTMLAttributes, e),
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
		return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(nw, this.editor.getAttributes(rw)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
	},
	addInputRules() {
		let e = Qb({
			find: iw,
			type: this.type
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = Qb({
			find: iw,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: () => this.editor.getAttributes(rw),
			editor: this.editor
		})), [e];
	}
}), ow = fx.create({
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
			dy(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list_item",
	parseMarkdown: (e, t) => {
		if (e.type !== "list_item") return [];
		let n = t.parseBlockChildren ?? t.parseChildren, r = [];
		if (e.tokens && e.tokens.length > 0) if (e.tokens.some((e) => e.type === "paragraph")) r = n(e.tokens);
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
		return r.length === 0 && (r = [{
			type: "paragraph",
			content: []
		}]), {
			type: "listItem",
			content: r
		};
	},
	renderMarkdown: (e, t, n) => ux(e, t, (e) => e.parentType === "bulletList" ? "- " : e.parentType === "orderedList" ? `${(e.meta?.parentAttrs?.start || 1) + e.index}. ` : "- ", n),
	addKeyboardShortcuts() {
		return {
			Enter: () => this.editor.commands.splitListItem(this.name),
			Tab: () => this.editor.commands.sinkListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
	}
});
tw({}, {
	findListItemPos: () => sw,
	getNextListDepth: () => cw,
	handleBackspace: () => fw,
	handleDelete: () => hw,
	hasListBefore: () => lw,
	hasListItemAfter: () => gw,
	hasListItemBefore: () => uw,
	listItemHasSubList: () => dw,
	nextListIsDeeper: () => pw,
	nextListIsHigher: () => mw
});
var sw = (e, t) => {
	let { $from: n } = t.selection, r = J_(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
	for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
	return s === null ? null : {
		$pos: t.doc.resolve(o),
		depth: s
	};
}, cw = (e, t) => {
	let n = sw(e, t);
	if (!n) return !1;
	let [, r] = Ay(t, e, n.$pos.pos + 4);
	return r;
}, lw = (e, t, n) => {
	let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
	return !(!a || !n.includes(a.type.name));
}, uw = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - 2);
	return !(r.index() === 0 || r.nodeBefore?.type.name !== e);
}, dw = (e, t, n) => {
	if (!n) return !1;
	let r = J_(e, t.schema), i = !1;
	return n.descendants((e) => {
		e.type === r && (i = !0);
	}), i;
}, fw = (e, t, n) => {
	if (e.commands.undoInputRule()) return !0;
	if (e.state.selection.from !== e.state.selection.to) return !1;
	if (!Pv(e.state, t) && lw(e.state, t, n)) {
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
	if (!Pv(e.state, t) || !Ly(e.state)) return !1;
	let r = sw(t, e.state);
	if (!r) return !1;
	let i = e.state.doc.resolve(r.$pos.pos - 2).node(r.depth), a = dw(t, e.state, i);
	return uw(t, e.state) && !a ? e.commands.joinItemBackward() : e.chain().liftListItem(t).run();
}, pw = (e, t) => {
	let n = cw(e, t), r = sw(e, t);
	return !r || !n ? !1 : n > r.depth;
}, mw = (e, t) => {
	let n = cw(e, t), r = sw(e, t);
	return !r || !n ? !1 : n < r.depth;
}, hw = (e, t) => {
	if (!Pv(e.state, t) || !Iy(e.state, t)) return !1;
	let { selection: n } = e.state, { $from: r, $to: i } = n;
	return !n.empty && r.sameParent(i) ? !1 : pw(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : mw(t, e.state) ? e.chain().joinForward().joinBackward().run() : e.commands.joinItemForward();
}, gw = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - n.parentOffset - 2);
	return !(r.index() === r.parent.childCount - 1 || r.nodeAfter?.type.name !== e);
}, _w = Y.create({
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
					e.state.schema.nodes[n] !== void 0 && hw(e, n) && (t = !0);
				}), t;
			},
			"Mod-Delete": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && hw(e, n) && (t = !0);
				}), t;
			},
			Backspace: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && fw(e, n, r) && (t = !0);
				}), t;
			},
			"Mod-Backspace": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && fw(e, n, r) && (t = !0);
				}), t;
			}
		};
	}
}), vw = /^(\s*)(\d+)\.\s+(.*)$/, yw = /^\s/;
function bw(e) {
	let t = e.trimStart();
	return /^[-+*]\s+/.test(t) || /^\d+\.\s+/.test(t) || /^>\s?/.test(t) || /^```/.test(t) || /^~~~/.test(t);
}
function xw(e) {
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
		if (t.length > 0 && bw(e)) {
			r = !0, n.push(e);
			return;
		}
		t.push(e);
	}), {
		paragraphLines: t,
		blockLines: n
	};
}
function Sw(e) {
	let t = [], n = 0, r = 0;
	for (; n < e.length;) {
		let i = e[n], a = i.match(vw);
		if (!a) break;
		let [, o, s, c] = a, l = o.length, u = [c], d = n + 1, f = [i], p = !1;
		for (; d < e.length;) {
			let t = e[d];
			if (t.match(vw)) break;
			if (t.trim() === "") f.push(t), u.push(""), p = !0, d += 1;
			else if (t.match(yw)) f.push(t), u.push(t.slice(l + 2)), d += 1;
			else {
				if (p) break;
				f.push(t), u.push(t), d += 1;
			}
		}
		t.push({
			indent: l,
			number: parseInt(s, 10),
			content: u.join("\n").trim(),
			contentLines: u,
			raw: f.join("\n")
		}), r = d, n = d;
	}
	return [t, r];
}
function Cw(e, t, n) {
	let r = [], i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a.indent === t) {
			let { paragraphLines: o, blockLines: s } = xw(a.contentLines), c = o.join("\n").trim(), l = [];
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
				let e = Cw(f, Math.min(...f.map((e) => e.indent)), n);
				l.push({
					type: "list",
					ordered: !0,
					start: f[0].number,
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
function ww(e, t) {
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
var Tw = "listItem", Ew = "textStyle", Dw = /^(\d+)\.\s$/, Ow = fx.create({
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
				parseHTML: (e) => e.getAttribute("type")
			}
		};
	},
	parseHTML() {
		return [{ tag: "ol" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		let { start: t, ...n } = e;
		return t === 1 ? [
			"ol",
			dy(this.options.HTMLAttributes, n),
			0
		] : [
			"ol",
			dy(this.options.HTMLAttributes, e),
			0
		];
	},
	markdownTokenName: "list",
	parseMarkdown: (e, t) => {
		if (e.type !== "list" || !e.ordered) return [];
		let n = e.start || 1, r = e.items ? ww(e.items, t) : [];
		return n === 1 ? {
			type: "orderedList",
			content: r
		} : {
			type: "orderedList",
			attrs: { start: n },
			content: r
		};
	},
	renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
	markdownTokenizer: {
		name: "orderedList",
		level: "block",
		start: (e) => {
			let t = e.match(/^(\s*)(\d+)\.\s+/)?.index;
			return t === void 0 ? -1 : t;
		},
		tokenize: (e, t, n) => {
			let r = e.split("\n"), [i, a] = Sw(r);
			if (i.length === 0) return;
			let o = Cw(i, 0, n);
			if (o.length !== 0) return {
				type: "list",
				ordered: !0,
				start: i[0]?.number || 1,
				items: o,
				raw: r.slice(0, a).join("\n")
			};
		}
	},
	markdownOptions: { indentsContent: !0 },
	addCommands() {
		return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Tw, this.editor.getAttributes(Ew)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
	},
	addInputRules() {
		let e = Qb({
			find: Dw,
			type: this.type,
			getAttributes: (e) => ({ start: +e[1] }),
			joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = Qb({
			find: Dw,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: (e) => ({
				start: +e[1],
				...this.editor.getAttributes(Ew)
			}),
			joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
			editor: this.editor
		})), [e];
	}
}), kw = /^\s*(\[([( |x])?\])\s$/, Aw = fx.create({
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
			dy(this.options.HTMLAttributes, t, { "data-type": this.name }),
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
	renderMarkdown: (e, t) => ux(e, t, `- [${e.attrs?.checked ? "x" : " "}] `),
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
					let t = r.extensionManager.attributes, n = fy(e, t), a = new Set(Object.keys(n)), o = this.options.HTMLAttributes;
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
		return [Qb({
			find: kw,
			type: this.type,
			getAttributes: (e) => ({ checked: e[e.length - 1] === "x" })
		})];
	}
}), jw = fx.create({
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
			dy(this.options.HTMLAttributes, e, { "data-type": this.name }),
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
				let t = lx(e, {
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
				return t ? [{
					type: "taskList",
					raw: t.raw,
					items: t.items
				}] : n.blockTokens(e);
			}, i = lx(e, {
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
		return this.options.bulletList !== !1 && e.push(aw.configure(this.options.bulletList)), this.options.listItem !== !1 && e.push(ow.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(_w.configure(this.options.listKeymap)), this.options.orderedList !== !1 && e.push(Ow.configure(this.options.orderedList)), this.options.taskItem !== !1 && e.push(Aw.configure(this.options.taskItem)), this.options.taskList !== !1 && e.push(jw.configure(this.options.taskList)), e;
	}
});
//#endregion
//#region node_modules/@tiptap/extension-paragraph/dist/index.js
var Mw = "&nbsp;", Nw = "\xA0", Pw = fx.create({
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
			dy(this.options.HTMLAttributes, e),
			0
		];
	},
	parseMarkdown: (e, t) => {
		let n = e.tokens || [];
		if (n.length === 1 && n[0].type === "image") return t.parseChildren([n[0]]);
		let r = t.parseInline(n);
		return n.length === 1 && n[0].type === "text" && (n[0].raw === Mw || n[0].text === Mw || n[0].raw === Nw || n[0].text === Nw) && r.length === 1 && r[0].type === "text" && (r[0].text === Mw || r[0].text === Nw) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
	},
	renderMarkdown: (e, t, n) => {
		if (!e) return "";
		let r = Array.isArray(e.content) ? e.content : [];
		if (r.length === 0) {
			let e = Array.isArray(n?.previousNode?.content) ? n.previousNode.content : [];
			return n?.previousNode?.type === "paragraph" && e.length === 0 ? Mw : "";
		}
		return t.renderChildren(r);
	},
	addCommands() {
		return { setParagraph: () => ({ commands: e }) => e.setNode(this.name) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
	}
}), Fw = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, Iw = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Lw = Tb.create({
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
			dy(this.options.HTMLAttributes, e),
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
		return [Yb({
			find: Fw,
			type: this.type
		})];
	},
	addPasteRules() {
		return [px({
			find: Iw,
			type: this.type
		})];
	}
}), Rw = fx.create({
	name: "text",
	group: "inline",
	parseMarkdown: (e) => ({
		type: "text",
		text: e.text || ""
	}),
	renderMarkdown: (e) => e.text || ""
}), zw = Tb.create({
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
			dy(this.options.HTMLAttributes, e),
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
}), Bw = zw;
//#endregion
//#region node_modules/prosemirror-dropcursor/dist/index.js
function Vw(e = {}) {
	return new K({ view(t) {
		return new Hw(t, e);
	} });
}
var Hw = class {
	constructor(e, t) {
		this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = t.width ?? 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = [
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
		this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
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
	dragover(e) {
		if (!this.editorView.editable) return;
		let t = this.editorView.posAtCoords({
			left: e.clientX,
			top: e.clientY
		}), n = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), r = n && n.type.spec.disableDropCursor, i = typeof r == "function" ? r(this.editorView, t, e) : r;
		if (t && !i) {
			let e = t.pos;
			if (this.editorView.dragging && this.editorView.dragging.slice) {
				let t = yd(this.editorView.state.doc, e, this.editorView.dragging.slice);
				t != null && (e = t);
			}
			this.setCursor(e), this.scheduleRemoval(5e3);
		}
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
}, Uw = class e extends U {
	constructor(e) {
		super(e, e);
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		return e.valid(r) ? new e(r) : U.near(r);
	}
	content() {
		return H.empty;
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
		return new Ww(this.anchor);
	}
	static valid(e) {
		let t = e.parent;
		if (t.inlineContent || !Kw(e) || !qw(e)) return !1;
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
					if (a.isAtom && !a.isText && !G.isSelectable(a)) {
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
Uw.prototype.visible = !1, Uw.findFrom = Uw.findGapCursorFrom, U.jsonID("gapcursor", Uw);
var Ww = class e {
	constructor(e) {
		this.pos = e;
	}
	map(t) {
		return new e(t.map(this.pos));
	}
	resolve(e) {
		let t = e.resolve(this.pos);
		return Uw.valid(t) ? new Uw(t) : U.near(t);
	}
};
function Gw(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function Kw(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || Gw(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function qw(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || Gw(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function Jw() {
	return new K({ props: {
		decorations: $w,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && Uw.valid(n) ? new Uw(n) : null;
		},
		handleClick: Zw,
		handleKeyDown: Yw,
		handleDOMEvents: { beforeinput: Qw }
	} });
}
var Yw = F_({
	ArrowLeft: Xw("horiz", -1),
	ArrowRight: Xw("horiz", 1),
	ArrowUp: Xw("vert", -1),
	ArrowDown: Xw("vert", 1)
});
function Xw(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof W) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = Uw.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new Uw(c))), !0) : !1;
	};
}
function Zw(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!Uw.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && G.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new Uw(r))), !0);
}
function Qw(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof Uw)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = B.empty;
	for (let e = r.length - 1; e >= 0; e--) i = B.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new H(i, 0, 0));
	return a.setSelection(W.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function $w(e) {
	if (!(e.selection instanceof Uw)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", Pg.create(e.doc, [jg.widget(e.selection.head, t, { key: "gapcursor" })]);
}
//#endregion
//#region node_modules/rope-sequence/dist/index.js
var eT = 200, tT = function() {};
tT.prototype.append = function(e) {
	return e.length ? (e = tT.from(e), !this.length && e || e.length < eT && this.leafAppend(e) || this.length < eT && e.leafPrepend(this) || this.appendInner(e)) : this;
}, tT.prototype.prepend = function(e) {
	return e.length ? tT.from(e).append(this) : this;
}, tT.prototype.appendInner = function(e) {
	return new rT(this, e);
}, tT.prototype.slice = function(e, t) {
	return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? tT.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
}, tT.prototype.get = function(e) {
	if (!(e < 0 || e >= this.length)) return this.getInner(e);
}, tT.prototype.forEach = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
}, tT.prototype.map = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length);
	var r = [];
	return this.forEach(function(t, n) {
		return r.push(e(t, n));
	}, t, n), r;
}, tT.from = function(e) {
	return e instanceof tT ? e : e && e.length ? new nT(e) : tT.empty;
};
var nT = /* @__PURE__ */ function(e) {
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
		if (this.length + e.length <= eT) return new t(this.values.concat(e.flatten()));
	}, t.prototype.leafPrepend = function(e) {
		if (this.length + e.length <= eT) return new t(e.flatten().concat(this.values));
	}, n.length.get = function() {
		return this.values.length;
	}, n.depth.get = function() {
		return 0;
	}, Object.defineProperties(t.prototype, n), t;
}(tT);
tT.empty = new nT([]);
var rT = /* @__PURE__ */ function(e) {
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
}(tT), iT = 500, aT = class e {
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
				u.push(new sT(t.map));
				let e = t.step.map(i.slice(a)), n;
				e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new sT(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
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
			let r = t.steps[e].invert(t.docs[e]), l = new sT(t.mapping.maps[e], r, n), u;
			(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
		}
		let l = o - r.depth;
		return l > lT && (s = oT(s, l), o -= l), new e(s.append(a), o);
	}
	remapping(e, t) {
		let n = new Lu();
		return this.items.forEach((t, r) => {
			let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
			n.appendMap(t.map, i);
		}, e, t), n;
	}
	addMaps(t) {
		return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new sT(e))), this.eventCount);
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
				l && s++, r.push(new sT(i, o, l));
			} else r.push(new sT(i));
		}, i);
		let l = [];
		for (let e = n; e < o; e++) l.push(new sT(a.maps[e]));
		let u = new e(this.items.slice(0, i).append(l).append(r), s);
		return u.emptyItemCount() > iT && (u = u.compress(this.items.length - r.length)), u;
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
					let c = new sT(o.invert(), t, s), l, u = i.length - 1;
					(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
				}
			} else e.map && r--;
		}, this.items.length, 0), new e(tT.from(i.reverse()), a);
	}
};
aT.empty = new aT(tT.empty, 0);
function oT(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
var sT = class e {
	constructor(e, t, n, r) {
		this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
	}
	merge(t) {
		if (this.step && t.step && !t.selection) {
			let n = t.step.merge(this.step);
			if (n) return new e(n.getMap().invert(), n, this.selection);
		}
	}
}, cT = class {
	constructor(e, t, n, r, i) {
		this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
	}
}, lT = 20;
function uT(e, t, n, r) {
	let i = n.getMeta(vT), a;
	if (i) return i.historyState;
	n.getMeta(yT) && (e = new cT(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(vT)) return o.getMeta(vT).redo ? new cT(e.done.addTransform(n, void 0, r, _T(t)), e.undone, fT(n.mapping.maps), e.prevTime, e.prevComposition) : new cT(e.done, e.undone.addTransform(n, void 0, r, _T(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !dT(n, e.prevRanges)), s = o ? pT(e.prevRanges, n.mapping) : fT(n.mapping.maps);
		return new cT(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, _T(t)), aT.empty, s, n.time, i ?? e.prevComposition);
	} else if (a = n.getMeta("rebased")) return new cT(e.done.rebased(n, a), e.undone.rebased(n, a), pT(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
	else return new cT(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), pT(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function dT(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function fT(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function pT(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function mT(e, t, n) {
	let r = _T(t), i = vT.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, t.selection.getBookmark(), i, r), c = new cT(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(vT, {
		redo: n,
		historyState: c
	});
}
var hT = !1, gT = null;
function _T(e) {
	let t = e.plugins;
	if (gT != t) {
		hT = !1, gT = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			hT = !0;
			break;
		}
	}
	return hT;
}
var vT = new cf("history"), yT = new cf("closeHistory");
function bT(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new K({
		key: vT,
		state: {
			init() {
				return new cT(aT.empty, aT.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return uT(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? ST : n == "historyRedo" ? CT : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function xT(e, t) {
	return (n, r) => {
		let i = vT.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = mT(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
var ST = xT(!1, !0), CT = xT(!0, !0);
Y.create({
	name: "characterCount",
	addOptions() {
		return {
			limit: null,
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
		return [new K({
			key: new cf("characterCount"),
			appendTransaction: (t, n, r) => {
				if (e) return;
				let i = this.options.limit;
				if (i == null || i === 0) {
					e = !0;
					return;
				}
				let a = this.storage.characters({ node: r.doc });
				if (a > i) {
					let t = a - i;
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
var wT = Y.create({
	name: "dropCursor",
	addOptions() {
		return {
			color: "currentColor",
			width: 1,
			class: void 0
		};
	},
	addProseMirrorPlugins() {
		return [Vw(this.options)];
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
		return [new K({
			key: new cf("focus"),
			props: { decorations: ({ doc: e, selection: t }) => {
				let { isEditable: n, isFocused: r } = this.editor, { anchor: i } = t, a = [];
				if (!n || !r) return Pg.create(e, []);
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
					a.push(jg.node(t, t + e.nodeSize, { class: this.options.className }));
				}), Pg.create(e, a);
			} }
		})];
	}
});
var TT = Y.create({
	name: "gapCursor",
	addProseMirrorPlugins() {
		return [Jw()];
	},
	extendNodeSchema(e) {
		return { allowGapCursor: J(q(e, "allowGapCursor", {
			name: e.name,
			options: e.options,
			storage: e.storage
		})) ?? null };
	}
}), ET = "placeholder";
function DT(e) {
	return e.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
var OT = Y.create({
	name: "placeholder",
	addOptions() {
		return {
			emptyEditorClass: "is-editor-empty",
			emptyNodeClass: "is-empty",
			dataAttribute: ET,
			placeholder: "Write something …",
			showOnlyWhenEditable: !0,
			showOnlyCurrent: !0,
			includeChildren: !1
		};
	},
	addProseMirrorPlugins() {
		let e = this.options.dataAttribute ? `data-${DT(this.options.dataAttribute)}` : `data-${ET}`;
		return [new K({
			key: new cf("placeholder"),
			props: { decorations: ({ doc: t, selection: n }) => {
				let r = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: i } = n, a = [];
				if (!r) return null;
				let o = this.editor.isEmpty;
				return t.descendants((t, n) => {
					let r = i >= n && i <= n + t.nodeSize, s = !t.isLeaf && By(t);
					if (!t.type.isTextblock) return this.options.includeChildren;
					if ((r || !this.options.showOnlyCurrent) && s) {
						let i = [this.options.emptyNodeClass];
						o && i.push(this.options.emptyEditorClass);
						let s = jg.node(n, n + t.nodeSize, {
							class: i.join(" "),
							[e]: typeof this.options.placeholder == "function" ? this.options.placeholder({
								editor: this.editor,
								node: t,
								pos: n,
								hasAnchor: r
							}) : this.options.placeholder
						});
						a.push(s);
					}
					return this.options.includeChildren;
				}), Pg.create(t, a);
			} }
		})];
	}
});
Y.create({
	name: "selection",
	addOptions() {
		return { className: "selection" };
	},
	addProseMirrorPlugins() {
		let { editor: e, options: t } = this;
		return [new K({
			key: new cf("selection"),
			props: { decorations(n) {
				return n.selection.empty || e.isFocused || !e.isEditable || Vy(n.selection) || e.view.dragging ? null : Pg.create(n.doc, [jg.inline(n.selection.from, n.selection.to, { class: t.className })]);
			} }
		})];
	}
});
function kT({ types: e, node: t }) {
	return t && Array.isArray(e) && e.includes(t.type) || t?.type === e;
}
var AT = Y.create({
	name: "trailingNode",
	addOptions() {
		return {
			node: void 0,
			notAfter: []
		};
	},
	addProseMirrorPlugins() {
		let e = new cf(this.name), t = this.options.node || this.editor.schema.topNodeType.contentMatch.defaultType?.name || "paragraph", n = Object.entries(this.editor.schema.nodes).map(([, e]) => e).filter((e) => (this.options.notAfter || []).concat(t).includes(e.name));
		return [new K({
			key: e,
			appendTransaction: (n, r, i) => {
				let { doc: a, tr: o, schema: s } = i, c = e.getState(i), l = a.content.size, u = s.nodes[t];
				if (!n.some((e) => e.getMeta("skipTrailingNode")) && c) return o.insert(l, u.create());
			},
			state: {
				init: (e, t) => {
					let r = t.tr.doc.lastChild;
					return !kT({
						node: r,
						types: n
					});
				},
				apply: (e, t) => {
					if (!e.docChanged || e.getMeta("__uniqueIDTransaction")) return t;
					let r = e.doc.lastChild;
					return !kT({
						node: r,
						types: n
					});
				}
			}
		})];
	}
}), jT = Y.create({
	name: "undoRedo",
	addOptions() {
		return {
			depth: 100,
			newGroupDelay: 500
		};
	},
	addCommands() {
		return {
			undo: () => ({ state: e, dispatch: t }) => ST(e, t),
			redo: () => ({ state: e, dispatch: t }) => CT(e, t)
		};
	},
	addProseMirrorPlugins() {
		return [bT(this.options)];
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
}), MT = Y.create({
	name: "starterKit",
	addExtensions() {
		let e = [];
		return this.options.bold !== !1 && e.push(wx.configure(this.options.bold)), this.options.blockquote !== !1 && e.push(yx.configure(this.options.blockquote)), this.options.bulletList !== !1 && e.push(aw.configure(this.options.bulletList)), this.options.code !== !1 && e.push(Dx.configure(this.options.code)), this.options.codeBlock !== !1 && e.push(jx.configure(this.options.codeBlock)), this.options.document !== !1 && e.push(Mx.configure(this.options.document)), this.options.dropcursor !== !1 && e.push(wT.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && e.push(TT.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && e.push(Nx.configure(this.options.hardBreak)), this.options.heading !== !1 && e.push(Px.configure(this.options.heading)), this.options.undoRedo !== !1 && e.push(jT.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && e.push(Fx.configure(this.options.horizontalRule)), this.options.italic !== !1 && e.push(Bx.configure(this.options.italic)), this.options.listItem !== !1 && e.push(ow.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(_w.configure(this.options?.listKeymap)), this.options.link !== !1 && e.push(QC.configure(this.options?.link)), this.options.orderedList !== !1 && e.push(Ow.configure(this.options.orderedList)), this.options.paragraph !== !1 && e.push(Pw.configure(this.options.paragraph)), this.options.strike !== !1 && e.push(Lw.configure(this.options.strike)), this.options.text !== !1 && e.push(Rw.configure(this.options.text)), this.options.underline !== !1 && e.push(zw.configure(this.options?.underline)), this.options.trailingNode !== !1 && e.push(AT.configure(this.options?.trailingNode)), e;
	}
}), NT = Y.create({
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
}), PT = OT, FT = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, IT = fx.create({
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
		return ["img", dy(this.options.HTMLAttributes, e)];
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
			Object.entries(o).forEach(([e, t]) => {
				if (t != null) switch (e) {
					case "width":
					case "height": break;
					default:
						c.setAttribute(e, t);
						break;
				}
			}), c.src = o.src;
			let l = new ex({
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
			}), u = l.dom;
			return u.style.visibility = "hidden", u.style.pointerEvents = "none", c.onload = () => {
				u.style.visibility = "", u.style.pointerEvents = "";
			}, l;
		};
	},
	addCommands() {
		return { setImage: (e) => ({ commands: t }) => t.insertContent({
			type: this.name,
			attrs: e
		}) };
	},
	addInputRules() {
		return [Xb({
			find: FT,
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
}), LT = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
};
//#endregion
//#region src/components/VuAdminHtmlEditor.vue
function RT(e) {
	let t = (e || "").trim();
	if (!t || t === "<p></p>" || t === "<p><br></p>") return "";
	let n = document.createElement("div");
	return n.innerHTML = t, !(n.textContent || "").replace(/\u00a0/g, " ").trim() && !n.querySelector("img, iframe, video, hr, table") ? "" : t;
}
function zT(e) {
	return [...e].sort((e, t) => e.key === "default" ? -1 : t.key === "default" ? 1 : String(e.key).localeCompare(String(t.key)));
}
function BT(e, t) {
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
var VT = {
	components: { EditorContent: gx },
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
				height: ""
			},
			htmlSourceModalOpen: !1,
			htmlSourceText: ""
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
						let n = zT(t), o = e.types[a], s = o && (o.url || o.data) || n[0].src, c = typeof i.label == "string" && i.label ? i.label : i.name, l = i.params && Array.isArray(i.params.tags) ? i.params.tags : [];
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
			t !== RT(this.editor.getHTML()) && this.editor.commands.setContent(t || "<p></p>", !1);
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
			return Kc(e, this.formSettings && this.formSettings.translate, t, n ?? (this.formSettings && this.formSettings.language));
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
		findGalleryMatchForSrc(e) {
			if (!e || typeof e != "string") return null;
			for (let t of this.imageGalleryEntries) for (let n of t.presets) if (n.src === e) return {
				entry: t,
				presetKey: n.key
			};
			return null;
		},
		getImageAttrsFromForm() {
			let e = parseInt(String(this.imageEditForm.width).trim(), 10), t = parseInt(String(this.imageEditForm.height).trim(), 10), n = String(this.imageEditForm.alt || "").trim();
			return {
				alt: n || null,
				title: n || null,
				width: Number.isFinite(e) && e > 0 ? e : null,
				height: Number.isFinite(t) && t > 0 ? t : null
			};
		},
		getImageSelectionPos(e) {
			let t = e.selection;
			return t instanceof G && t.node.type.name === "image" ? t.from : null;
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
				MT.configure({
					heading: { levels: [
						1,
						2,
						3,
						4,
						5
					] },
					codeBlock: !1,
					horizontalRule: !0
				}),
				Bw,
				$C.configure({
					openOnClick: !1,
					autolink: !0,
					defaultProtocol: "https"
				}),
				NT.configure({
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
				IT.extend({ atom: !0 }).configure({
					inline: !1,
					allowBase64: !0
				})
			];
			this.placeholderText && n.push(PT.configure({
				placeholder: this.placeholderText,
				showOnlyWhenEditable: !0,
				showOnlyCurrent: !1
			})), this.editor = new hx({
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
							return !a || a.type.name !== "image" ? !1 : (e.dispatch(e.state.tr.setSelection(G.create(e.state.doc, i))), e.focus(), !0);
						},
						dblclick: (e, t) => {
							let n = t.target;
							if (!e.editable || !(n instanceof Element) || n.tagName !== "IMG") return !1;
							let r = e.dom.querySelector?.(".ProseMirror");
							if (!r || !r.contains(n)) return !1;
							let i = e.posAtDOM(n, 0);
							if (i == null || i < 0) return !1;
							let a = e.state.doc.nodeAt(i);
							return !a || a.type.name !== "image" ? !1 : (e.dispatch(e.state.tr.setSelection(G.create(e.state.doc, i))), e.focus(), this.openImageModal("edit", i), !0);
						}
					}
				},
				onUpdate: () => {
					let e = RT(this.editor.getHTML());
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
				height: ""
			}, this.$nextTick(() => {
				this.createEditor(RT(e));
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
			let t = RT(this.editor.getHTML());
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
				let n = this.findGalleryMatchForSrc(t), r = e.attrs.alt && String(e.attrs.alt).trim() || "", i = n ? BT(n.entry.file, n.entry.tagOptions) : "";
				this.imageEditForm = {
					alt: r || i,
					width: e.attrs.width == null ? "" : String(e.attrs.width),
					height: e.attrs.height == null ? "" : String(e.attrs.height)
				}, n ? (this.selectedImageId = n.entry.id, this.selectedPresetKey = n.presetKey) : (this.selectedImageId = null, this.selectedPresetKey = "default");
			} else this.editOriginalSrc = "", this.manualImageUrl = "", this.imageEditForm = {
				alt: "",
				width: "",
				height: ""
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
			let n = BT(e.file, e.tagOptions);
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
}, HT = {
	key: 0,
	class: "tiptap-toolbar btn-toolbar flex-wrap gap-1 mb-1",
	role: "toolbar"
}, UT = { class: "btn-group btn-group-sm" }, WT = ["title"], GT = ["title"], KT = ["title"], qT = ["title"], JT = { class: "btn-group btn-group-sm" }, YT = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, XT = { class: "dropdown-menu dropdown-menu-end" }, ZT = ["onClick"], QT = { class: "btn-group btn-group-sm" }, $T = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, eE = { class: "dropdown-menu dropdown-menu-end" }, tE = { class: "btn-group btn-group-sm" }, nE = {
	type: "button",
	class: "btn btn-sm btn-outline-secondary dropdown-toggle",
	"data-bs-toggle": "dropdown",
	"data-bs-auto-close": "true",
	"aria-expanded": "false"
}, rE = { class: "dropdown-menu dropdown-menu-end" }, iE = { class: "btn-group btn-group-sm" }, aE = ["title"], oE = ["title"], sE = { class: "btn-group btn-group-sm" }, cE = ["title"], lE = { class: "btn-group btn-group-sm" }, uE = ["title"], dE = { class: "btn-group btn-group-sm" }, fE = ["title"], pE = ["title"], mE = { class: "tiptap-modal-header" }, hE = { class: "mb-0" }, gE = ["aria-label"], _E = { class: "tiptap-modal-body" }, vE = { class: "row g-2 mb-3" }, yE = { class: "col-12 col-md-5" }, bE = { class: "form-label small text-secondary mb-0" }, xE = ["placeholder"], SE = { class: "col-6 col-md-3" }, CE = { class: "form-label small text-secondary mb-0" }, wE = ["placeholder"], TE = { class: "col-6 col-md-3" }, EE = { class: "form-label small text-secondary mb-0" }, DE = ["placeholder"], OE = {
	key: 0,
	class: "text-secondary small mb-3"
}, kE = {
	key: 1,
	class: "text-secondary small mb-2"
}, AE = {
	key: 2,
	class: "row g-2 mb-3"
}, jE = ["onClick"], ME = ["src", "alt"], NE = ["title"], PE = {
	class: "text-muted",
	style: { "font-size": "0.7rem" }
}, FE = {
	key: 3,
	class: "mb-3"
}, IE = { class: "form-label small text-secondary mb-1" }, LE = { class: "d-flex flex-wrap gap-1" }, RE = ["onClick"], zE = { class: "border-top pt-3 mt-1" }, BE = { class: "form-label small text-secondary" }, VE = { class: "input-group input-group-sm" }, HE = ["placeholder"], UE = { class: "tiptap-modal-footer" }, WE = ["disabled"], GE = { class: "tiptap-modal-header" }, KE = { class: "mb-0" }, qE = ["aria-label"], JE = { class: "tiptap-modal-body" }, YE = { class: "tiptap-modal-footer" };
function XE(a, o, s, c, l, u) {
	let d = y("editor-content");
	return g(), r("div", { class: p(["tiptap-html-editor", [a.$attrs.class]]) }, [
		a.editor ? (g(), r("div", HT, [
			i("span", UT, [
				i("button", {
					type: "button",
					class: p(["btn btn-sm btn-outline-secondary", { active: a.editor.isActive("bold") }]),
					title: a.translate("Bold"),
					onClick: o[0] ||= (e) => a.editor.chain().focus().toggleBold().run()
				}, "B", 10, WT),
				i("button", {
					type: "button",
					class: p(["btn btn-sm btn-outline-secondary", { active: a.editor.isActive("italic") }]),
					title: a.translate("Italic"),
					onClick: o[1] ||= (e) => a.editor.chain().focus().toggleItalic().run()
				}, [...o[36] ||= [i("i", null, "I", -1)]], 10, GT),
				i("button", {
					type: "button",
					class: p(["btn btn-sm btn-outline-secondary", { active: a.editor.isActive("underline") }]),
					title: a.translate("Underline"),
					onClick: o[2] ||= (e) => a.editor.chain().focus().toggleUnderline().run()
				}, [...o[37] ||= [i("u", null, "U", -1)]], 10, KT),
				i("button", {
					type: "button",
					class: p(["btn btn-sm btn-outline-secondary", { active: a.editor.isActive("strike") }]),
					title: a.translate("Strikethrough"),
					onClick: o[3] ||= (e) => a.editor.chain().focus().toggleStrike().run()
				}, [...o[38] ||= [i("s", null, "S", -1)]], 10, qT)
			]),
			i("div", JT, [i("button", YT, b(a.headingDropdownLabel), 1), i("ul", XT, [
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: !a.editor.isActive("heading") }]),
					onClick: o[4] ||= (e) => a.setHeadingLevel(null)
				}, b(a.translate("Normal text")), 3)]),
				o[39] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
				(g(!0), r(e, null, v(a.headingLevels, (e) => (g(), r("li", { key: e }, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive("heading", { level: e }) }]),
					onClick: (t) => a.setHeadingLevel(e)
				}, " H" + b(e), 11, ZT)]))), 128))
			])]),
			i("div", QT, [i("button", $T, b(a.listDropdownLabel), 1), i("ul", eE, [
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive("bulletList") }]),
					onClick: o[5] ||= (e) => a.toggleListType("bullet")
				}, b(a.translate("Bullet list")), 3)]),
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive("orderedList") }]),
					onClick: o[6] ||= (e) => a.toggleListType("ordered")
				}, b(a.translate("Numbered list")), 3)]),
				o[40] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive("blockquote") }]),
					onClick: o[7] ||= (e) => a.toggleListType("blockquote")
				}, b(a.translate("Quote")), 3)])
			])]),
			i("div", tE, [i("button", nE, b(a.alignDropdownLabel), 1), i("ul", rE, [
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive({ textAlign: "left" }) }]),
					onClick: o[8] ||= (e) => a.setTextAlignValue("left")
				}, b(a.translate("Align left")), 3)]),
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive({ textAlign: "center" }) }]),
					onClick: o[9] ||= (e) => a.setTextAlignValue("center")
				}, b(a.translate("Align center")), 3)]),
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive({ textAlign: "right" }) }]),
					onClick: o[10] ||= (e) => a.setTextAlignValue("right")
				}, b(a.translate("Align right")), 3)]),
				i("li", null, [i("button", {
					type: "button",
					class: p(["dropdown-item", { active: a.editor.isActive({ textAlign: "justify" }) }]),
					onClick: o[11] ||= (e) => a.setTextAlignValue("justify")
				}, b(a.translate("Align justify")), 3)])
			])]),
			i("span", iE, [i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: a.translate("Link"),
				onClick: o[12] ||= (...e) => a.toggleLink && a.toggleLink(...e)
			}, "🔗", 8, aE), i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: a.translate("Remove link"),
				onClick: o[13] ||= (e) => a.editor.chain().focus().unsetLink().run()
			}, "✕", 8, oE)]),
			i("span", sE, [i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: a.selectedImagePos === null ? a.translate("Insert image") : a.translate("Edit image"),
				onClick: o[14] ||= (...e) => a.openImageModalFromToolbar && a.openImageModalFromToolbar(...e)
			}, "🖼", 8, cE)]),
			i("span", lE, [i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary font-monospace small",
				title: a.translate("HTML source"),
				onClick: o[15] ||= (...e) => a.openHtmlSourceModal && a.openHtmlSourceModal(...e)
			}, "HTML", 8, uE)]),
			i("span", dE, [i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: a.translate("Undo"),
				onClick: o[16] ||= (e) => a.editor.chain().focus().undo().run()
			}, "↶", 8, fE), i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-secondary",
				title: a.translate("Redo"),
				onClick: o[17] ||= (e) => a.editor.chain().focus().redo().run()
			}, "↷", 8, pE)])
		])) : n("", !0),
		a.editor ? (g(), t(d, {
			key: 1,
			editor: a.editor,
			class: "tiptap-content-wrap"
		}, null, 8, ["editor"])) : n("", !0),
		a.imageModalOpen ? (g(), r("div", {
			key: 2,
			class: "tiptap-modal-overlay",
			onClick: o[29] ||= O((...e) => a.closeImageModal && a.closeImageModal(...e), ["self"])
		}, [i("div", {
			class: "tiptap-modal-content",
			onClick: o[28] ||= O(() => {}, ["stop"])
		}, [
			i("div", mE, [i("h5", hE, b(a.imageModalTitle), 1), i("button", {
				type: "button",
				class: "btn-close",
				"aria-label": a.translate("Close"),
				onClick: o[18] ||= (...e) => a.closeImageModal && a.closeImageModal(...e)
			}, null, 8, gE)]),
			i("div", _E, [
				i("div", vE, [
					i("div", yE, [i("label", bE, b(a.translate("Alt text")), 1), D(i("input", {
						"onUpdate:modelValue": o[19] ||= (e) => a.imageEditForm.alt = e,
						type: "text",
						class: "form-control form-control-sm",
						placeholder: a.translate("Description for the image")
					}, null, 8, xE), [[T, a.imageEditForm.alt]])]),
					i("div", SE, [i("label", CE, b(a.translate("Width (px)")), 1), D(i("input", {
						"onUpdate:modelValue": o[20] ||= (e) => a.imageEditForm.width = e,
						type: "number",
						min: "1",
						class: "form-control form-control-sm",
						placeholder: a.translate("auto")
					}, null, 8, wE), [[T, a.imageEditForm.width]])]),
					i("div", TE, [i("label", EE, b(a.translate("Height (px)")), 1), D(i("input", {
						"onUpdate:modelValue": o[21] ||= (e) => a.imageEditForm.height = e,
						type: "number",
						min: "1",
						class: "form-control form-control-sm",
						placeholder: a.translate("auto")
					}, null, 8, DE), [[T, a.imageEditForm.height]])])
				]),
				a.imageModalMode === "insert" && !a.imageGalleryEntries.length ? (g(), r("p", OE, b(a.translate("No images in form fields yet. Upload an image or enter an image URL below.")), 1)) : a.imageModalMode === "edit" && !a.imageGalleryEntries.length ? (g(), r("p", kE, b(a.translate("No images in form. You can edit the source in the URL field.")), 1)) : n("", !0),
				a.imageGalleryEntries.length ? (g(), r("div", AE, [(g(!0), r(e, null, v(a.imageGalleryEntries, (e) => (g(), r("div", {
					key: e.id,
					class: "col-6 col-md-4 col-lg-3"
				}, [i("button", {
					type: "button",
					class: p(["tiptap-gallery-card w-100 h-100 text-start p-2 border rounded", { "border-primary": a.selectedImageId === e.id }]),
					onClick: (t) => a.selectGalleryEntry(e)
				}, [
					i("img", {
						src: e.thumbSrc,
						class: "img-fluid rounded mb-1",
						style: {
							"max-height": "72px",
							"object-fit": "contain",
							width: "100%"
						},
						alt: e.fileTitle
					}, null, 8, ME),
					i("div", {
						class: "small text-truncate",
						title: e.fileTitle
					}, b(e.fileTitle), 9, NE),
					i("div", PE, b(e.fieldLabel), 1)
				], 10, jE)]))), 128))])) : n("", !0),
				a.selectedGalleryEntry && a.selectedGalleryEntry.presets.length ? (g(), r("div", FE, [i("label", IE, b(a.translate("Preset (size / format)")), 1), i("div", LE, [(g(!0), r(e, null, v(a.selectedGalleryEntry.presets, (e) => (g(), r("button", {
					key: e.key,
					type: "button",
					class: p(["btn btn-sm", a.selectedPresetKey === e.key ? "btn-primary" : "btn-outline-secondary"]),
					onClick: (t) => {
						a.selectedPresetKey = e.key, a.syncManualFromPreset();
					}
				}, b(e.key), 11, RE))), 128))])])) : n("", !0),
				i("div", zE, [i("label", BE, b(a.translate("Image URL")), 1), i("div", VE, [D(i("input", {
					"onUpdate:modelValue": o[22] ||= (e) => a.manualImageUrl = e,
					type: "text",
					class: "form-control font-monospace",
					placeholder: a.translate("https:// or data: URL"),
					onKeydown: o[23] ||= te(O((...e) => a.confirmImageModalPrimary && a.confirmImageModalPrimary(...e), ["prevent"]), ["enter"])
				}, null, 40, HE), [[T, a.manualImageUrl]]), a.imageModalMode === "insert" ? (g(), r("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-secondary",
					onClick: o[24] ||= (...e) => a.insertFromModalUrlOnly && a.insertFromModalUrlOnly(...e)
				}, b(a.translate("URL only")), 1)) : n("", !0)])])
			]),
			i("div", UE, [
				a.imageModalMode === "edit" ? (g(), r("button", {
					key: 0,
					type: "button",
					class: "btn btn-outline-danger me-auto",
					onClick: o[25] ||= (...e) => a.deleteImageFromModal && a.deleteImageFromModal(...e)
				}, b(a.translate("Delete image")), 1)) : n("", !0),
				i("button", {
					type: "button",
					class: "btn btn-secondary",
					onClick: o[26] ||= (...e) => a.closeImageModal && a.closeImageModal(...e)
				}, b(a.translate("Cancel")), 1),
				i("button", {
					type: "button",
					class: "btn btn-primary",
					disabled: !a.canConfirmImageModal,
					onClick: o[27] ||= (...e) => a.confirmImageModalPrimary && a.confirmImageModalPrimary(...e)
				}, b(a.imageModalMode === "edit" ? a.translate("Save") : a.translate("Insert")), 9, WE)
			])
		])])) : n("", !0),
		a.htmlSourceModalOpen ? (g(), r("div", {
			key: 3,
			class: "tiptap-modal-overlay",
			onClick: o[35] ||= O((...e) => a.closeHtmlSourceModal && a.closeHtmlSourceModal(...e), ["self"])
		}, [i("div", {
			class: "tiptap-modal-content tiptap-html-modal-wide",
			onClick: o[34] ||= O(() => {}, ["stop"])
		}, [
			i("div", GE, [i("h5", KE, b(a.translate("HTML source")), 1), i("button", {
				type: "button",
				class: "btn-close",
				"aria-label": a.translate("Close"),
				onClick: o[30] ||= (...e) => a.closeHtmlSourceModal && a.closeHtmlSourceModal(...e)
			}, null, 8, qE)]),
			i("div", JE, [D(i("textarea", {
				ref: "htmlSourceTextarea",
				"onUpdate:modelValue": o[31] ||= (e) => a.htmlSourceText = e,
				class: "form-control font-monospace tiptap-html-source",
				rows: "18",
				spellcheck: "false"
			}, null, 512), [[T, a.htmlSourceText]])]),
			i("div", YE, [i("button", {
				type: "button",
				class: "btn btn-secondary",
				onClick: o[32] ||= (...e) => a.closeHtmlSourceModal && a.closeHtmlSourceModal(...e)
			}, b(a.translate("Cancel")), 1), i("button", {
				type: "button",
				class: "btn btn-primary",
				onClick: o[33] ||= (...e) => a.applyHtmlSource && a.applyHtmlSource(...e)
			}, b(a.translate("Apply")), 1)])
		])])) : n("", !0)
	], 2);
}
var ZE = /* @__PURE__ */ LT(VT, [["render", XE]]), QE = {
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
}, $E = {
	key: 0,
	class: "table table-sm w-100 vsa-file-info"
}, eD = { class: "text-nowrap text-center" }, tD = { class: "text-center" }, nD = { class: "text-nowrap text-end" }, rD = ["innerHTML"], iD = { class: "text-end" }, aD = { class: "text-nowrap text-center" }, oD = { class: "text-center" }, sD = { class: "text-end" }, cD = ["innerHTML"], lD = { class: "text-end" }, uD = {
	key: 0,
	class: "fw-normal bg-light text-dark p-0 px-1 shadow-sm"
}, dD = { colspan: "3" }, fD = { class: "text-end" }, pD = ["innerHTML"], mD = { class: "d-flex justify-content-between text-nowrap" }, hD = { class: "d-flex justify-content-between text-nowrap" }, gD = { class: "text-muted fw-light me-3" }, _D = {
	key: 1,
	class: "d-flex justify-content-between"
};
function vD(t, o, s, c, l, u) {
	return g(), r("div", null, [
		t.file ? (g(), r("table", $E, [
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
				i("td", eD, b(t.file.original.width) + " x " + b(t.file.original.height), 1),
				i("td", tD, b(t.file.original.ratio), 1),
				i("td", nD, [i("span", { innerHTML: t.roundFileSize(t.file.original.bytes, !0) }, null, 8, rD)]),
				i("td", iD, b(t.file.original.extension), 1),
				o[1] ||= i("td", null, null, -1)
			]), (g(!0), r(e, null, v(t.file.types, (e, a) => (g(), r("tr", { key: e }, [
				i("td", null, b(a), 1),
				i("td", aD, b(e.width) + " x " + b(e.height), 1),
				i("td", oD, b(e.ratio), 1),
				i("td", sD, [i("span", {
					class: p(["text-nowrap", { "text-danger": e.bytes > t.file.original.bytes }]),
					innerHTML: t.roundFileSize(e.bytes, !0)
				}, null, 10, cD)]),
				i("td", lD, b(e.extension), 1),
				i("td", null, [e.crop ? (g(), r("small", uD, b(e.crop), 1)) : n("", !0)])
			]))), 128))]),
			i("tfoot", null, [i("tr", null, [
				i("td", dD, b(t.file.uploaded ? "uploaded" : "uploading"), 1),
				i("td", fD, [i("span", {
					class: "text-nowrap",
					innerHTML: t.roundFileSize(t.file.bytes, !0)
				}, null, 8, pD)]),
				o[2] ||= i("td", { colspan: "2" }, null, -1)
			])])
		])) : n("", !0),
		i("small", mD, [o[4] ||= i("span", { class: "text-muted fw-light me-3" }, "original filename", -1), a(" " + b(t.file.original.name), 1)]),
		i("small", hD, [
			i("span", gD, b(t.file.uploaded ? "uploaded" : "uploading") + " filename", 1),
			o[5] ||= a(),
			i("span", null, b(t.file.slug), 1)
		]),
		t.file.uploaded ? (g(), r("small", _D, [
			o[6] ||= i("span", { class: "text-muted fw-light me-3" }, "uploaded at", -1),
			o[7] ||= a(),
			i("span", null, b(t.dateFormat(t.file.timestamp * 1e3)), 1)
		])) : n("", !0)
	]);
}
var yD = /* @__PURE__ */ LT(QE, [["render", vD]]), bD = {
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
}, xD = {
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
	components: { VuAdminFileUploadInfo: yD },
	created() {
		let e = Rc(1e5);
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
			return rl(e, t);
		},
		extensionByFilename(e) {
			return il(e);
		},
		getAcceptMimeTypes(e) {
			let t = [];
			for (let n in bD) if (bD.hasOwnProperty(n)) {
				let r = bD[n];
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
			this.setDefaults(e), e.bytes = 0, e.types = { default: {} }, e.title = e.name.split(".").slice(0, -1).join("."), e.uid = Rc(9999999).toString(32) + Date.now().toString(32), e.slug = Hc(e.title), e.timestamp = Math.round(Date.now() / 1e3), e.original = {
				bytes: e.size,
				mime: e.type,
				name: e.name,
				modified: e.lastModified,
				extension: this.extensionByFilename(e.name)
			}, Object.values(bD.video).indexOf(e.original.mime) >= 0 ? e.isVideo = !0 : Object.values(bD.image).indexOf(e.original.mime) >= 0 ? e.isImage = !0 : Object.values(bD.document).indexOf(e.original.mime) >= 0 ? e.isDocument = !0 : e.isUnknown = !0, (e.isVideo || e.isImage && !this.params.presets.default) && (this.params.presets.default = {
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
					n.currentTime = n.duration * Lc(), e.video = n;
				}), n.addEventListener("seeked", () => {
					this.forEachPresets(e, n), e.loaded = !0, this.bytes += e.bytes;
				});
			}, r.readAsDataURL(e);
		},
		seekRandom(e) {
			e.video && (e.video.currentTime = e.video.duration * Lc());
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
							slug: Hc(t.title) + "-" + t.uid,
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
				}, e.types[c.key].slug = Hc(e.title) + "-" + r.width + "x" + r.height + "-" + e.uid, e.types[c.key].mime = this.getMimeTypeByExtension(e.types[c.key].extension), e.types[c.key].data = r.toDataURL(e.types[c.key].mime, e.types[c.key].quality), e.types[c.key].blob = await this.getBlob(r, e.types[c.key].mime, e.types[c.key].quality), e.types[c.key].blob && (e.types[c.key].bytes = e.types[c.key].blob.size), e.types[c.key].bytes && (e.bytes += e.types[c.key].bytes), n && n(c, e);
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
						slug: Hc(e.title) + "-" + e.uid,
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
						slug: Hc(e.title) + "-" + t + "-" + e.uid
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
				e.slug = Hc(e.title);
				for (let t in e.types) {
					let n = this.params.presets[t];
					e.types[t].slug = Hc(e.title) + "-" + n.width + "x" + n.height;
				}
				this.$forceUpdate();
			}
		},
		arrayItemMoveUp(e, t) {
			el(e, t);
		},
		arrayItemMoveDown(e, t) {
			tl(e, t);
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
			for (let t in bD) if (bD.hasOwnProperty(t)) {
				let n = bD[t];
				if (n[e]) return n[e];
			}
			return null;
		},
		getExtensionByMimeType(e) {
			for (let t in bD) if (bD.hasOwnProperty(t)) {
				let n = bD[t];
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
			return Kc(e, this.settings.translate, t, n || this.settings.language);
		},
		dropdownSelectToggleOne(e, t) {
			Xc(e, t), this.$forceUpdate();
		},
		dropdownSelectAll(e, t) {
			Zc(e, t), this.$forceUpdate();
		},
		dropdownSelectInvert(e, t) {
			Qc(e, t), this.$forceUpdate();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? $c(e) : e.value = null, this.$forceUpdate();
		},
		handleDrop(e) {
			e.preventDefault(), this.isDragging = !1;
			let t = e.dataTransfer.files;
			this.handleFileChange({ target: { files: t } });
		}
	}
}, SD = { class: "" }, CD = {
	key: 0,
	class: "vsa-image-editor p-2 text-center"
}, wD = { class: "row" }, TD = { class: "badge bg-dark text-light fw-light mx-1 text-uppercase" }, ED = { class: "badge bg-dark text-light fw-light mx-1" }, DD = { class: "badge bg-dark text-light fw-light mx-1" }, OD = ["src"], kD = { class: "row g-1" }, AD = { class: "col-md-6" }, jD = { class: "col-md-6" }, MD = { class: "col-md-6" }, ND = ["href"], PD = {
	key: 1,
	class: "row g-2 mb-1"
}, FD = { key: 0 }, ID = { class: "table table-sm table-responsive table-borderless" }, LD = { class: "align-middle px-0" }, RD = { class: "input-group border" }, zD = { class: "d-block p-1 px-2" }, BD = ["onClick"], VD = ["onClick"], HD = {
	key: 0,
	class: "fs-5 mx-2"
}, UD = {
	key: 1,
	class: "fs-5 mx-2"
}, WD = {
	key: 2,
	class: "fs-5 mx-2"
}, GD = ["onUpdate:modelValue", "onInput"], KD = {
	key: 3,
	class: "mx-0"
}, qD = ["href"], JD = ["src", "alt"], YD = ["src", "alt"], XD = {
	key: 4,
	class: "dropdown rounded-bottom"
}, ZD = {
	class: "btn btn-sm border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, QD = { class: "dropdown-menu" }, $D = ["onClick"], eO = {
	key: 0,
	class: "bi bi-check-square"
}, tO = {
	key: 1,
	class: "bi bi-square"
}, nO = ["onClick"], rO = ["onClick"], iO = ["onClick"], aO = { class: "dropdown" }, oO = { class: "dropdown-menu" }, sO = { class: "p-2" }, cO = { class: "fw-light" }, lO = ["onClick"], uO = { class: "vsa-image-container h-100 position-relative" }, dO = {
	key: 0,
	class: "w-100 h-100 d-flex align-items-center flex-column"
}, fO = {
	key: 1,
	class: "vsa-image-frame mb-auto border border-bottom-0 p-1 text-center w-100 h-100 d-flex justify-content-center align-items-center"
}, pO = ["href"], mO = ["src", "alt"], hO = ["src", "alt"], gO = {
	key: 2,
	class: "display-3 w-100 h-100 text-center mb-auto d-flex align-items-center justify-content-center"
}, _O = ["onUpdate:modelValue", "onInput"], vO = { class: "w-100 mb-2 d-flex justify-content-around align-items-center" }, yO = { class: "p-1 px-2 border border-end-0 h-100" }, bO = ["onClick"], xO = ["onClick"], SO = {
	key: 0,
	class: "dropdown border border-end-0 h-100 w-100"
}, CO = {
	class: "btn btn-sm rounded-0 h-100 w-100",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, wO = { class: "dropdown-menu" }, TO = ["onClick"], EO = {
	key: 0,
	class: "bi bi-check-square"
}, DO = {
	key: 1,
	class: "bi bi-square"
}, OO = ["onClick"], kO = ["onClick"], AO = ["onClick"], jO = { class: "dropdown border h-100 w-100" }, MO = { class: "dropdown-menu" }, NO = { class: "p-2" }, PO = { class: "fw-light" }, FO = ["onClick"], IO = {
	key: 1,
	class: "w-100 h-100 vsa-image-loading d-flex align-items-center justify-content-center"
}, LO = { class: "row g-1" }, RO = { class: "col-12 d-flex align-items-center justify-content-center" }, zO = ["for"], BO = { key: 0 }, VO = { key: 0 }, HO = { class: "" }, UO = { class: "" }, WO = {
	key: 1,
	class: "fs-6"
}, GO = {
	key: 0,
	class: "bi bi-list-ol"
}, KO = {
	key: 1,
	class: "bi bi-grid"
}, qO = ["disabled"], JO = { class: "col-12 text-center" }, YO = { key: 0 }, XO = ["id", "accept"];
function ZO(t, s, c, l, u, d) {
	let f = y("VuAdminFileUploadInfo");
	return g(), r("div", SD, [i("div", { class: p(["vsa-upload", { wait: t.wait }]) }, [
		t.editfile && t.editfile.presets ? (g(), r("div", CD, [
			i("div", wD, [(g(!0), r(e, null, v(t.editfile.types, (e, a) => (g(), r("div", {
				class: "col-md-3",
				key: a
			}, [
				i("span", TD, b(e.extension), 1),
				i("span", ED, b(e.width) + " x " + b(e.height), 1),
				i("span", DD, "~" + b(t.roundFileSize(e.bytes)), 1),
				e ? (g(), r("img", {
					key: 0,
					class: "img-thumbnail rounded",
					src: e.url ? e.url : e.data
				}, null, 8, OD)) : n("", !0)
			]))), 128))]),
			D(i("input", {
				type: "text",
				class: "form-control form-control-sm w-100 mt-1",
				"onUpdate:modelValue": s[0] ||= (e) => t.editfile.title = e
			}, null, 512), [[T, t.editfile.title]]),
			i("div", kD, [
				i("div", AD, [i("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: s[1] ||= (e) => t.editfile = null
				}, " Close ")]),
				i("div", jD, [i("button", {
					type: "button",
					class: "btn btn-sm btn-outline-danger mt-1 w-100",
					onClick: s[2] ||= (e) => t.remove(t.index)
				}, " Remove ")]),
				i("div", MD, [t.type && !t.type.url ? (g(), r("button", {
					key: 0,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					onClick: s[3] ||= (e) => t.download(t.index, t.params)
				}, " Download ")) : n("", !0), t.type && t.type.url ? (g(), r("a", {
					key: 1,
					type: "button",
					class: "btn btn-sm btn-outline-light mt-1 w-100",
					href: t.type.url
				}, " Download ", 8, ND)) : n("", !0)])
			])
		])) : n("", !0),
		t.files && t.files.length ? (g(), r("div", PD, [t.params.ui === "list" ? (g(), r("div", FD, [i("table", ID, [i("tbody", null, [(g(!0), r(e, null, v(t.files, (c, l) => (g(), r("tr", { key: l }, [i("td", LD, [i("div", RD, [
			i("span", zD, b(l + 1), 1),
			i("span", {
				class: "cursor-pointer p-1 border-start border-end h-100",
				onClick: (e) => t.arrayItemMoveDown(t.files, l)
			}, [i("i", { class: p(["bi bi-arrow-up", { "opacity-25": l < 1 }]) }, null, 2)], 8, BD),
			i("span", {
				class: "cursor-pointer p-1 border-start border-end h-100",
				onClick: (e) => t.arrayItemMoveUp(t.files, l + 1)
			}, [i("i", { class: p(["bi bi-arrow-down", { "opacity-25": l >= t.files.length - 1 }]) }, null, 2)], 8, VD),
			c.isDocument ? (g(), r("span", HD, [i("i", { class: p(["bi bi-filetype-" + c.types.default.extension]) }, null, 2)])) : c.isImage ? (g(), r("span", UD, [...s[12] ||= [i("i", { class: "bi bi-file-image" }, null, -1)]])) : c.isVideo ? (g(), r("span", WD, [...s[13] ||= [i("i", { class: "bi bi-file-play" }, null, -1)]])) : n("", !0),
			D(i("input", {
				required: "text",
				class: "form-control py-1 px-2 border-top-0 border-bottom-0 border-start-1 fw-light",
				"onUpdate:modelValue": (e) => c.title = e,
				onInput: (e) => t.slug(c),
				onKeydown: s[4] ||= te(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, GD), [[T, c.title]]),
			!c.isDocument && c.types && c.types[t.params.thumbnail] ? (g(), r("span", KD, [c.types.default.url ? (g(), r("a", {
				key: 0,
				target: "_blank",
				href: c.types.default.url
			}, [i("img", {
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: c.types[t.params.thumbnail].url,
				alt: c.name
			}, null, 8, JD)], 8, qD)) : (g(), r("img", {
				key: 1,
				height: "32",
				width: "auto",
				class: "transparent-background",
				src: c.types[t.params.thumbnail].data,
				alt: c.name
			}, null, 8, YD))])) : n("", !0),
			t.params.tags ? (g(), r("div", XD, [i("button", ZD, [s[14] ||= i("i", { class: "bi bi-tag" }, null, -1), a(" " + b(c.tags ? c.tags.length : 0), 1)]), i("ul", QD, [
				i("li", null, [(g(!0), r(e, null, v(t.params.tags, (e) => (g(), r("span", {
					key: e,
					class: "dropdown-item cursor-pointer",
					onClick: (n) => t.dropdownSelectToggleOne(c.tags, e.value)
				}, [c.tags && c.tags.indexOf(e.value) >= 0 ? (g(), r("i", eO)) : (g(), r("i", tO)), a(" " + b(t.translate(e.label ? e.label : e.value)), 1)], 8, $D))), 128))]),
				s[15] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectAll(c.tags, t.params.tags)
				}, b(t.translate("Select all")), 9, nO)]),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectClear(c.tags)
				}, b(t.translate("Unselect all")), 9, rO)]),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (e) => t.dropdownSelectInvert(c.tags, t.params.tags)
				}, b(t.translate("Invert all")), 9, iO)])
			])])) : n("", !0),
			i("div", aO, [s[16] ||= i("button", {
				class: "btn btn-sm _dropdown-toggle border border-start-1 border-top-0 border-bottom-0 rounded-0 h-100",
				type: "button",
				"data-bs-toggle": "dropdown",
				"aria-expanded": "false"
			}, [i("i", { class: "bi bi-list" })], -1), i("ul", oO, [i("li", sO, [i("small", cO, [o(f, { file: c }, null, 8, ["file"])])])])]),
			i("button", {
				class: "btn btn-sm btn-outline-danger border border-start-1 border-top-0 border-bottom-0 border-end-0 rounded-0 px-2",
				onClick: (e) => t.remove(l),
				type: "button"
			}, [...s[17] ||= [i("i", { class: "bi bi-x-circle" }, null, -1)]], 8, lO)
		])])]))), 128))])])])) : (g(!0), r(e, { key: 1 }, v(t.files, (c, l) => (g(), r("div", {
			class: p([t.params.colclass ? t.params.colclass : "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"]),
			key: l
		}, [i("div", uO, [c.loaded ? (g(), r("div", dO, [
			n("", !0),
			c.types && c.types[t.params.thumbnail] ? (g(), r("div", fO, [c.types.default.url ? (g(), r("a", {
				key: 0,
				target: "_blank",
				href: c.types.default.url
			}, [i("img", {
				class: "img-fluid transparent-background",
				src: c.types[t.params.thumbnail].url,
				alt: c.name
			}, null, 8, mO)], 8, pO)) : (g(), r("img", {
				key: 1,
				class: "img-fluid transparent-background",
				src: c.types[t.params.thumbnail].data,
				alt: c.name
			}, null, 8, hO))])) : n("", !0),
			c.isDocument ? (g(), r("div", gO, [i("i", { class: p(["bi bi-filetype-" + c.types.default.extension]) }, null, 2)])) : n("", !0),
			D(i("input", {
				required: "text",
				class: "form-control rounded-0 border-bottom-0 py-1 px-2 fw-light",
				"onUpdate:modelValue": (e) => c.title = e,
				onInput: (e) => t.slug(c),
				onKeydown: s[5] ||= te(O(() => {}, ["prevent"]), ["enter"])
			}, null, 40, _O), [[T, c.title]]),
			i("div", vO, [
				i("span", yO, b(l + 1), 1),
				i("span", {
					class: "cursor-pointer p-1 border border-end-0 h-100",
					onClick: (e) => t.arrayItemMoveDown(t.files, l)
				}, [i("i", { class: p(["bi bi-arrow-up", { "opacity-25": l < 1 }]) }, null, 2)], 8, bO),
				i("span", {
					class: "cursor-pointer p-1 border border-end-0 h-100",
					onClick: (e) => t.arrayItemMoveUp(t.files, l + 1)
				}, [i("i", { class: p(["bi bi-arrow-down", { "opacity-25": l >= t.files.length - 1 }]) }, null, 2)], 8, xO),
				t.params.tags ? (g(), r("div", SO, [i("button", CO, [s[21] ||= i("i", { class: "bi bi-tag" }, null, -1), a(" " + b(c.tags ? c.tags.length : 0), 1)]), i("ul", wO, [
					i("li", null, [(g(!0), r(e, null, v(t.params.tags, (e) => (g(), r("span", {
						key: e,
						class: "dropdown-item cursor-pointer",
						onClick: (n) => t.dropdownSelectToggleOne(c.tags, e.value)
					}, [c.tags && c.tags.indexOf(e.value) >= 0 ? (g(), r("i", EO)) : (g(), r("i", DO)), a(" " + b(t.translate(e.label ? e.label : e.value)), 1)], 8, TO))), 128))]),
					s[22] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
					i("li", null, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectAll(c.tags, t.params.tags)
					}, b(t.translate("Select all")), 9, OO)]),
					i("li", null, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectClear(c.tags)
					}, b(t.translate("Unselect all")), 9, kO)]),
					i("li", null, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => t.dropdownSelectInvert(c.tags, t.params.tags)
					}, b(t.translate("Invert all")), 9, AO)])
				])])) : n("", !0),
				i("div", jO, [s[23] ||= i("button", {
					class: "btn btn-sm rounded-0 h-100 _dropdown-toggle w-100",
					type: "button",
					"data-bs-toggle": "dropdown",
					"aria-expanded": "false"
				}, [i("i", { class: "bi bi-list" })], -1), i("ul", MO, [i("li", NO, [i("small", PO, [o(f, { file: c }, null, 8, ["file"])])])])]),
				i("button", {
					class: "btn btn-outline-danger border rounded-0 border-start-0 px-2 py-1",
					onClick: (e) => t.remove(l),
					type: "button"
				}, [...s[24] ||= [i("i", { class: "bi bi-x-circle" }, null, -1)]], 8, FO)
			])
		])) : (g(), r("div", IO, [...s[25] ||= [i("span", null, null, -1)]]))])], 2))), 128))])) : n("", !0),
		i("div", LO, [i("div", RO, [
			i("label", {
				for: t.uploadId,
				class: p([
					{ "disabled bg-secondary": t.files && t.params.limit <= t.files.length },
					"btn btn-light border border-dark cursor-pointer w-100 vsa-drop-zone",
					{ "vsa-drop-zone-active": t.isDragging }
				]),
				onDragover: s[6] ||= O(() => {}, ["prevent"]),
				onDragenter: s[7] ||= O(() => {}, ["prevent"]),
				onDrop: s[8] ||= O((...e) => t.handleDrop && t.handleDrop(...e), ["prevent"])
			}, [t.files && t.params.limit > t.files.length ? (g(), r("span", BO, [
				s[29] ||= i("i", { class: "bi bi-upload me-2" }, null, -1),
				a(" " + b(t.params.text) + " ", 1),
				t.params.limit ? (g(), r("small", VO, [
					s[26] ||= a(" ( ", -1),
					i("strong", HO, b(t.files.length), 1),
					s[27] ||= a(" / ", -1),
					i("span", UO, b(t.params.limit), 1),
					s[28] ||= a(" ) ", -1)
				])) : n("", !0)
			])) : (g(), r("span", WO, [...s[30] ||= [i("i", { class: "bi bi-exclamation-circle" }, null, -1), a(" You've reached the upload limit ", -1)]]))], 42, zO),
			i("button", {
				type: "button",
				class: "btn btn-outline-primary ms-1",
				onClick: s[9] ||= (e) => t.toggleView()
			}, [t.params.ui == "list" ? n("", !0) : (g(), r("i", GO)), t.params.ui == "list" ? (g(), r("i", KO)) : n("", !0)]),
			i("button", {
				disabled: !t.files.length,
				type: "button",
				class: "btn btn-outline-danger ms-1",
				onClick: s[10] ||= (e) => t.resetConfirm()
			}, [...s[31] ||= [i("i", { class: "bi bi-trash" }, null, -1)]], 8, qO)
		]), i("div", JO, [i("small", null, [t.params.accept ? (g(), r("div", YO, [s[32] ||= i("span", { class: "text-secondary" }, "accept only", -1), (g(!0), r(e, null, v(t.params.accept, (e) => (g(), r("strong", {
			class: "ms-1 text-muted",
			key: e
		}, b(e), 1))), 128))])) : n("", !0), n("", !0)])])]),
		t.uploadId ? (g(), r("input", {
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
			onChange: s[11] ||= (...e) => t.handleFileChange && t.handleFileChange(...e)
		}, null, 40, XO)) : n("", !0)
	], 2)]);
}
var QO = /* @__PURE__ */ LT(xD, [["render", ZO]]), $O = {
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
			return jc(e, t, this.settings, this);
		},
		async selectOptions(e, t) {
			return typeof e == "function" ? await e(this.item, t, this) : e;
		},
		async fetchCustom(e, t) {
			let n = await fetch(Vc("GET", { url: e }, t), Bc("GET", this.settings.form.api, null, this.auth)), r = await Mc(n);
			if (!Nc(n, r.data)) return r.data;
		},
		handleChange(e) {
			if (this.optionValue === "object") {
				let e = this.options.find((e) => e.value === this.newitem);
				e && this.$emit("update:modelValue", e);
			} else this.$emit("update:modelValue", this.newitem);
		}
	},
	components: {}
}, ek = [
	"name",
	"id",
	"disabled",
	"readonly",
	"required"
], tk = ["value"];
function nk(t, n, i, a, o, s) {
	return D((g(), r("select", {
		class: p(["form-select", t.getValueOrFunction(t.field.inputclass ? t.field.inputclass : "", {
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
	}, [(g(!0), r(e, null, v(t.options, (e) => (g(), r("option", {
		class: p(t.getValueOrFunction(t.field.optionclass ? t.field.optionclass : "", {
			field: t.field,
			item: t.item,
			option: e
		})),
		key: e,
		value: e.value
	}, b(e.label ? e.label : e.value), 11, tk))), 128))], 42, ek)), [[w, t.newitem]]);
}
var rk = /* @__PURE__ */ LT($O, [["render", nk]]), ik = {
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
			return jc(e, t, this.settings, this);
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
			el(e, t);
		},
		arrayItemMoveDown(e, t) {
			tl(e, t);
		}
	},
	components: { VuAdminFormSelect: rk }
}, ak = { class: "row g-1 d-flex align-items-center justify-content-between mb-1" }, ok = { class: "col-10" }, sk = { class: "row g-1 d-flex align-items-center justify-content-between" }, ck = { class: "col-10" }, lk = { class: "row g-1 d-flex align-items-center justify-content-between" }, uk = ["innerHTML"], dk = {
	key: 1,
	class: "input-group input-group-sm"
}, fk = [
	"type",
	"required",
	"placeholder",
	"onUpdate:modelValue"
], pk = { class: "col-2 text-nowrap text-end" }, mk = ["onClick"], hk = ["onClick"], gk = ["onClick"], _k = { key: 0 }, vk = { class: "row g-1 d-flex align-items-center justify-content-between" }, yk = { class: "col-10" }, bk = { class: "row g-1 d-flex align-items-center justify-content-between" }, xk = { class: "input-group input-group-sm" }, Sk = {
	key: 0,
	class: "input-group-text"
}, Ck = [
	"type",
	"placeholder",
	"onUpdate:modelValue"
], wk = {
	key: 3,
	class: "input-group-text"
}, Tk = { class: "col-2" };
function Ek(a, o, s, c, l, u) {
	let d = y("VuAdminFormSelect");
	return g(), r("div", null, [
		i("div", ak, [i("div", ok, [i("div", sk, [(g(!0), r(e, null, v(a.field.elements, (e) => (g(), r("div", {
			key: e,
			class: p(e.class || "col")
		}, [i("small", null, b(e.placeholder ? e.placeholder : e.prefix ? e.prefix : ""), 1)], 2))), 128))])]), o[1] ||= i("div", { class: "col-2 text-nowrap text-end" }, null, -1)]),
		(g(!0), r(e, null, v(a.value, (s, c) => (g(), r("div", {
			class: "row g-1 d-flex align-items-center justify-content-between mb-1",
			key: c
		}, [i("div", ck, [i("div", lk, [(g(!0), r(e, null, v(s, (e, n) => (g(), r("div", {
			key: n,
			class: p(a.field.elements[n].class || "col")
		}, [a.field.elements[n].template ? (g(), r("span", {
			key: 0,
			innerHTML: a.getValueOrFunction(a.field.elements[n].template, a.value[c])
		}, null, 8, uk)) : (g(), r("div", dk, [a.field.elements[n].type == "select" && a.value[c][n] ? (g(), t(d, {
			key: 0,
			modelValue: a.value[c][n],
			"onUpdate:modelValue": (e) => a.value[c][n] = e,
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
		])) : D((g(), r("input", {
			key: 1,
			type: a.field.elements[n].type,
			required: a.field.elements[n].required,
			placeholder: a.field.elements[n].placeholder || n,
			class: "form-control",
			"onUpdate:modelValue": (e) => a.value[c][n] = e
		}, null, 8, fk)), [[C, a.value[c][n]]])]))], 2))), 128))])]), i("div", pk, [
			a.field.sortable ? (g(), r("button", {
				key: 0,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => a.arrayItemMoveUp(a.value, c)
			}, [...o[2] ||= [i("i", { class: "bi bi-arrow-up" }, null, -1)]], 8, mk)) : n("", !0),
			a.field.sortable ? (g(), r("button", {
				key: 1,
				type: "button",
				class: "btn btn-sm btn-outline-secondary p-1 me-1",
				onClick: (e) => a.arrayItemMoveDown(a.value, c + 1)
			}, [...o[3] ||= [i("i", { class: "bi bi-arrow-down" }, null, -1)]], 8, hk)) : n("", !0),
			i("button", {
				type: "button",
				class: "btn btn-sm btn-outline-danger p-1 me-1",
				onClick: (e) => a.arrayRemoveItem(a.value, c)
			}, [...o[4] ||= [i("i", { class: "bi bi-trash" }, null, -1)]], 8, gk)
		])]))), 128)),
		a.item[a.field.name] && a.item[a.field.name].length ? (g(), r("hr", _k)) : n("", !0),
		i("div", vk, [i("div", yk, [i("div", bk, [(g(!0), r(e, null, v(a.field.elements, (e) => (g(), r("div", {
			key: e,
			class: p(e.class || "col")
		}, [i("div", xk, [
			e.prefix ? (g(), r("span", Sk, b(e.prefix), 1)) : n("", !0),
			e.type == "select" && (!e.relation || e.relation && e.relation.items) ? (g(), t(d, {
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
			])) : D((g(), r("input", {
				key: 2,
				type: e.type,
				placeholder: e.placeholder || e.name,
				class: "form-control form-control-sm",
				"onUpdate:modelValue": (t) => e.value = t
			}, null, 8, Ck)), [[C, e.value]]),
			e.suffix ? (g(), r("span", wk, b(e.suffix), 1)) : n("", !0)
		]), n("", !0)], 2))), 128))])]), i("div", Tk, [i("button", {
			type: "button",
			class: "btn btn-sm btn-outline-primary my-1 w-100",
			onClick: o[0] ||= (e) => a.arrayAddNewItem(a.field, a.item)
		}, [...o[5] ||= [i("i", { class: "bi bi-plus" }, null, -1)]])])])
	]);
}
//#endregion
//#region src/components/VuAdminFormGroup.vue
var Dk = {
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
			return jc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return Kc(e, this.settings.translate, t, n || this.settings.language);
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
			el(e, t);
		},
		arrayItemMoveDown(e, t) {
			tl(e, t);
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
			Xc(t, n.value ? n.value : n);
		},
		dropdownSelectAll(e, t) {
			Zc(e, t);
		},
		dropdownSelectInvert(e, t) {
			Qc(e, t);
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? $c(e) : e.value = null;
		}
	},
	components: {
		HtmlEditor: ZE,
		FileUpload: QO,
		VuAdminFormSelect: rk,
		VuAdminFormList: /* @__PURE__ */ LT(ik, [["render", Ek]])
	}
}, Ok = { class: "row m-1" }, kk = ["innerHTML"], Ak = {
	key: 1,
	class: "row"
}, jk = { class: "form-group pb-3" }, Mk = { key: 0 }, Nk = {
	key: 0,
	class: "badge text-secondary fw-light"
}, Pk = ["for", "innerHTML"], Fk = {
	key: 1,
	class: "input-group"
}, Ik = ["innerHTML"], Lk = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"disabled",
	"readonly",
	"required"
], Rk = [
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
], zk = [
	"type",
	"name",
	"id",
	"onUpdate:modelValue",
	"min",
	"max",
	"disabled",
	"readonly",
	"required"
], Bk = {
	key: 4,
	class: "form-check"
}, Vk = [
	"name",
	"id",
	"true-value",
	"false-value",
	"onUpdate:modelValue",
	"disabled",
	"readonly",
	"required"
], Hk = ["for"], Uk = [
	"name",
	"id",
	"onUpdate:modelValue",
	"minlength",
	"maxlength",
	"placeholder",
	"readonly",
	"disabled",
	"required"
], Wk = [
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
], Gk = ["innerHTML"], Kk = { class: "dropdown d-inline-block" }, qk = { class: "dropdown-menu" }, Jk = ["onClick"], Yk = {
	key: 0,
	class: "bi bi-check-square"
}, Xk = {
	key: 1,
	class: "bi bi-square"
}, Zk = ["onClick"], Qk = ["onClick"], $k = ["onClick"], eA = ["onClick"], tA = { key: 6 }, nA = { key: 0 }, rA = ["for"], iA = [
	"name",
	"id",
	"onUpdate:modelValue"
], aA = ["onClick"], oA = ["innerHTML"], sA = {
	key: 8,
	class: "p-1"
}, cA = ["innerHTML"];
function lA(o, s, c, l, u, d) {
	let f = y("VuAdminFormSelect"), m = y("HtmlEditor"), h = y("FileUpload"), _ = y("VuAdminFormList");
	return g(), r("div", Ok, [(g(!0), r(e, null, v(o.settings.form.groups, (c) => (g(), r("div", {
		key: c,
		class: p([c.class ? c.class : "col-md-12"])
	}, [c.title ? (g(), r("h2", {
		key: 0,
		class: "form-row-title mb-4 fw-lighter",
		innerHTML: c.title ? c.title : ""
	}, null, 8, kk)) : n("", !0), o.item && c.fields ? (g(), r("div", Ak, [(g(!0), r(e, null, v(c.fields, (c) => (g(), r("div", {
		class: p([o.getValueOrFunction(c.class ? c.class : "col-md-12"), "input_type_" + c.type]),
		key: c
	}, [i("div", jk, [
		c.label ? (g(), r("span", Mk, [[
			"html",
			"image",
			"upload"
		].indexOf(c.type) >= 0 ? (g(), r("label", {
			key: 0,
			class: p([{ required: c.required }, "form-label text-secondary mb-1"])
		}, [a(b(c.label ? c.label : o.translate(c.name)) + " ", 1), c.maxlength ? (g(), r("span", Nk, b(o.item[c.name] ? o.item[c.name].length : 0) + " / " + b(c.maxlength), 1)) : n("", !0)], 2)) : (g(), r("label", {
			key: 1,
			class: p([{ required: c.required }, "form-label text-secondary mb-1"]),
			for: o.formId + "_" + c.name,
			innerHTML: o.getValueOrFunction(c.label ? c.label : o.translate(c.name), {
				field: c,
				item: o.item
			})
		}, null, 10, Pk))])) : n("", !0),
		[
			"html",
			"image",
			"list",
			"addresses",
			"template"
		].indexOf(c.type) < 0 ? (g(), r("div", Fk, [
			c.prefix ? (g(), r("span", {
				key: 0,
				class: "input-group-text",
				innerHTML: o.getValueOrFunction(c.prefix, {
					field: c,
					item: o.item
				})
			}, null, 8, Ik)) : n("", !0),
			c.type == "text" ? D((g(), r("input", {
				key: 1,
				class: p(["form-control", o.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: o.item
				})]),
				type: "text",
				name: c.name,
				id: o.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				minlength: c.minlength,
				maxlength: c.maxlength,
				placeholder: c.placeholder ? c.placeholder : "",
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, Lk)), [[T, o.item[c.name]]]) : n("", !0),
			c.type == "number" ? D((g(), r("input", {
				key: 2,
				class: p(["form-control", o.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: o.item
				})]),
				type: "number",
				name: c.name,
				id: o.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				min: c.min,
				max: c.max,
				step: c.step,
				placeholder: c.placeholder ? c.placeholder : "",
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, Rk)), [[T, o.item[c.name]]]) : n("", !0),
			[
				"date",
				"datetime",
				"datetime-local"
			].indexOf(c.type) >= 0 ? D((g(), r("input", {
				key: 3,
				class: p(["form-control", o.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: o.item
				})]),
				type: c.type,
				name: c.name,
				id: o.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				min: c.min,
				max: c.max,
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, zk)), [[C, o.item[c.name]]]) : n("", !0),
			c.type == "checkbox" ? (g(), r("div", Bk, [D(i("input", {
				class: p(["form-check-input", o.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: o.item
				})]),
				type: "checkbox",
				name: c.name,
				id: o.formId + "_" + c.name,
				"true-value": c.true == null ? !0 : c.true,
				"false-value": c.false == null ? !1 : c.false,
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, null, 10, Vk), [[S, o.item[c.name]]]), i("label", {
				class: "form-check-label cursor-pointer",
				for: o.formId + "_" + c.name
			}, b(c.checkbox), 9, Hk)])) : n("", !0),
			c.type == "email" ? D((g(), r("input", {
				key: 5,
				autocomplete: "on",
				class: p(["form-control", o.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: o.item
				})]),
				type: "email",
				name: c.name,
				id: o.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				minlength: c.minlength,
				maxlength: c.maxlength,
				placeholder: c.placeholder ? c.placeholder : "",
				readonly: c.readonly,
				disabled: c.disabled,
				required: c.required
			}, null, 10, Uk)), [[T, o.item[c.name]]]) : n("", !0),
			c.type == "select" && (!c.relation || c.relation && c.relation.items) ? (g(), t(f, {
				key: 6,
				modelValue: o.item[c.name],
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				field: c,
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
			c.type == "textarea" ? D((g(), r("textarea", {
				key: 7,
				class: p(["form-control", o.getValueOrFunction(c.inputclass ? c.inputclass : "", {
					field: c,
					item: o.item
				})]),
				name: c.name,
				id: o.formId + "_" + c.name,
				"onUpdate:modelValue": (e) => o.item[c.name] = e,
				rows: c.rows,
				minlength: c.minlength,
				maxlength: c.maxlength,
				placeholder: c.placeholder ? c.placeholder : "",
				disabled: c.disabled,
				readonly: c.readonly,
				required: c.required
			}, "              ", 10, Wk)), [[T, o.item[c.name]]]) : n("", !0),
			c.suffix ? (g(), r("span", {
				key: 8,
				class: "input-group-text",
				innerHTML: o.getValueOrFunction(c.suffix, {
					field: c,
					item: o.item
				})
			}, null, 8, Gk)) : n("", !0)
		])) : n("", !0),
		c.type == "html" ? (g(), t(m, {
			key: 2,
			modelValue: o.item[c.name],
			"onUpdate:modelValue": (e) => o.item[c.name] = e,
			class: p([c.class]),
			tiptapOptions: c.tiptap,
			"form-item": o.item,
			"form-settings": o.settings
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"class",
			"tiptapOptions",
			"form-item",
			"form-settings"
		])) : n("", !0),
		c.type == "image" || c.type == "upload" ? (g(), t(h, {
			key: 3,
			modelValue: o.item[c.name],
			"onUpdate:modelValue": (e) => o.item[c.name] = e,
			class: p([c.class]),
			field: c,
			settings: o.settings
		}, null, 8, [
			"modelValue",
			"onUpdate:modelValue",
			"class",
			"field",
			"settings"
		])) : n("", !0),
		c.type == "list" && (!c.relation || c.relation && c.relation.items) ? (g(), t(_, {
			key: 4,
			modelValue: o.item[c.name],
			"onUpdate:modelValue": (e) => o.item[c.name] = e,
			field: c,
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
		c.type == "dropdown" && o.item[c.name] ? (g(), r("div", {
			key: 5,
			class: p([c.class])
		}, [i("div", Kk, [i("button", {
			class: p(["btn dropdown-toggle", [c.dropdown ? c.dropdown.class : ""]]),
			type: "button",
			"data-bs-auto-close": "outside",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false"
		}, [i("span", null, b(o.translate(c.dropdown ? c.dropdown.label : "Select")), 1)], 2), i("ul", qk, [
			i("li", null, [(g(!0), r(e, null, v(c.options, (e) => (g(), r("span", {
				key: e,
				class: p(["dropdown-item cursor-pointer", { selected: o.item[c.name].indexOf(e.value) >= 0 }]),
				onClick: (t) => o.dropdownSelectToggleOne(c, o.item[c.name], e)
			}, [o.item[c.name].indexOf(e.value) >= 0 ? (g(), r("i", Yk)) : (g(), r("i", Xk)), a(" " + b(o.translate(e.label ? e.label : e.value)), 1)], 10, Jk))), 128))]),
			s[0] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
			i("li", null, [i("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => o.dropdownSelectAll(o.item[c.name], c.options)
			}, b(o.translate("Select all")), 9, Zk)]),
			i("li", null, [i("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => o.dropdownSelectClear(o.item[c.name])
			}, b(o.translate("Unselect all")), 9, Qk)]),
			i("li", null, [i("span", {
				class: "dropdown-item cursor-pointer",
				onClick: (e) => o.dropdownSelectInvert(o.item[c.name], c.options)
			}, b(o.translate("Invert all")), 9, $k)])
		])]), o.item[c.name].length ? (g(), r("span", {
			key: 0,
			class: p([c.list && c.list.wrapperClass ? c.list.wrapperClass : "d-block mt-1"])
		}, [(g(!0), r(e, null, v(o.item[c.name], (e) => (g(), r("span", {
			class: p(["cursor-pointer", [c.list ? c.list.class : ""]]),
			key: e,
			onClick: (t) => o.dropdownSelectToggleOne(c, o.item[c.name], e)
		}, [a(b(o.translate(e)) + " ", 1), s[1] ||= i("i", { class: "bi bi-x" }, null, -1)], 10, eA))), 128))], 2)) : n("", !0)], 2)) : n("", !0),
		c.type == "addresses" ? (g(), r("span", tA, [o.item[c.name] ? (g(), r("div", nA, [(g(!0), r(e, null, v(o.item[c.name], (e) => (g(), r("div", { key: e }, [
			a(b(e) + " ", 1),
			i("label", {
				class: "form-label text-secondary mb-1",
				for: o.formId + "_" + c.name
			}, b(c.label), 9, rA),
			D(i("input", {
				class: "form-control",
				type: "text",
				name: c.name,
				id: o.formId + "_" + c.name,
				"onUpdate:modelValue": (t) => e.country = t
			}, null, 8, iA), [[T, e.country]])
		]))), 128))])) : n("", !0), i("button", {
			type: "button",
			class: "btn btn-sm btn-secondary",
			onClick: (e) => o.insertAddress(c.name)
		}, " Add ", 8, aA)])) : n("", !0),
		c.type == "template" ? (g(), r("div", {
			key: 7,
			innerHTML: o.getValueOrFunction(c.template, {
				field: c,
				item: o.item
			})
		}, null, 8, oA)) : n("", !0),
		c.description ? (g(), r("div", sA, [i("small", null, [i("i", {
			class: "text-muted",
			innerHTML: o.getValueOrFunction(c.description, {
				field: c,
				item: o.item
			})
		}, null, 8, cA)])])) : n("", !0)
	])], 2))), 128))])) : n("", !0)], 2))), 128))]);
}
//#endregion
//#region src/components/VuAdminForm.vue
var uA = {
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
			return Kc(e, this.settings.translate, t, n || this.settings.language);
		},
		getValueOrFunction(e, t) {
			return jc(e, t, this.settings, this);
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
			let a = `${Date.now().toString(36)}-${zc(8)}`;
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
				let r = await fetch(Vc("GET", t.form.api, e), Bc("GET", t.api, null, n)).catch((e) => {}), i = await Mc(r);
				if (Nc(r, i.data, "form") || !i.data) return this.formNoWait(), !1;
				t.form.default && (i.data = Object.assign({}, t.form.default, i.data)), t.events && t.events.afterItemLoad && t.events.afterItemLoad(i.data, r);
				let a;
				a = t.form.api.input.item ? typeof t.form.api.input.item == "string" ? i.data[t.form.api.input.item] : t.form.api.input.item(i.data, r) : i.data;
				for (let e of t.form.groups) for (let r of e.fields) r.type === "dropdown" && r.name !== "__proto__" && r.name !== "constructor" && r.name !== "prototype" && !a[r.name] && (a[r.name] = []), r.relation && t.relations[r.relation.config] && (r.relation = Ac(t.relations[r.relation.config], r.relation), console.log(r.relation, n), await this.fetchRelation(r, [a], n));
				this.item = Wc(a), this.itemOriginal = Object.assign({}, a), this.loaded = !0, this.formNoWait();
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
				n = this.settings.form.api.input.item ? typeof this.settings.form.api.input.item == "string" ? t[this.settings.form.api.input.item] : this.settings.form.api.input.item(t, response) : t, n && (this.addFormMessage(this.translate("Saved") + ` <small>( ${this.settings.pkey}:  ${n[this.settings.pkey]} )</small>`, 2500), this.item = Wc(n), this.itemOriginal = Object.assign({}, n)), e === !0 && this.modalWindow.hide(), this.reloadTable();
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
				let r = await fetch(Vc("DELETE", this.settings.form.api, n, t), Bc("DELETE", this.settings.api, null, this.auth));
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
	components: { VuAdminFormGroup: /* @__PURE__ */ LT(Dk, [["render", lA]]) }
}, dA = ["id", "data-bs-theme"], fA = { class: "modal-header" }, pA = {
	key: 0,
	class: "modal-title"
}, mA = ["innerHTML"], hA = { key: 1 }, gA = { key: 2 }, _A = {
	key: 3,
	class: "rounded border ms-2 px-2 py-0 fs-6"
}, vA = {
	key: 1,
	class: "d-inline-block ms-3 mt-1"
}, yA = ["innerHTML"], bA = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, xA = {
	key: 0,
	class: "modal-header bg-body sticky-top"
}, SA = {
	key: 0,
	class: "d-inline-block m-1"
}, CA = { class: "dropdown d-inline-block" }, wA = ["innerHTML"], TA = { class: "dropdown-menu text-start" }, EA = { class: "me-2 text-muted" }, DA = ["innerHTML"], OA = ["disabled", "onClick"], kA = {
	key: 1,
	class: "dropdown d-inline-block"
}, AA = { class: "mx-1" }, jA = { class: "dropdown-menu px-2" }, MA = ["onClick"], NA = {
	key: 1,
	class: "modal-body custom-scroll"
}, PA = {
	key: 2,
	class: "modal-footer d-flex justify-content-between"
}, FA = {
	key: 3,
	class: "bg-light text-dark"
};
function IA(o, s, c, l, u, d) {
	let f = y("VuAdminFormGroup");
	return o.item ? (g(), r("form", {
		key: 0,
		ref: "form",
		id: o.formId,
		class: p(["form", [o.settings.form.class, { wait: o.ui.wait.form }]]),
		onSubmit: s[1] ||= O((...e) => o.submitItem && o.submitItem(...e), ["prevent"]),
		"data-bs-theme": [o.settings.theme]
	}, [
		i("div", { class: p(["vua-overlay", { blocked: o.ui.block.form }]) }, null, 2),
		i("div", fA, [
			o.loaded ? (g(), r("h5", pA, [
				o.settings.form.title && typeof o.settings.form.title == "function" ? (g(), r("span", {
					key: 0,
					innerHTML: o.settings.form.title(o.item, o.settings)
				}, null, 8, mA)) : n("", !0),
				o.settings.form.title && typeof o.settings.form.title == "string" ? (g(), r("span", hA, b(o.translate(o.settings.form.title)), 1)) : n("", !0),
				o.settings.form.title ? n("", !0) : (g(), r("span", gA, b(o.translate("Edit")), 1)),
				o.item[o.settings.pkey] ? (g(), r("small", _A, [s[2] ||= i("span", { class: "text-muted fw-light" }, "id", -1), a(" " + b(o.item[o.settings.pkey]), 1)])) : n("", !0)
			])) : n("", !0),
			o.message.form ? (g(), r("span", vA, [i("span", { class: p(["text-" + o.message.form.priority]) }, [s[3] ||= i("i", { class: "bi bi-envelope-fill me-2" }, null, -1), i("span", { innerHTML: o.message.form.msg }, null, 8, yA)], 2)])) : n("", !0),
			D(i("span", bA, [...s[4] ||= [i("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[E, o.ui.wait.form]]),
			s[5] ||= i("button", {
				type: "button",
				class: "btn-close",
				"data-bs-dismiss": "modal",
				"aria-label": "Close"
			}, null, -1)
		]),
		o.item ? (g(), r("div", xA, [o.settings.form.control ? (g(), r("div", {
			key: 0,
			class: p(["w-100", o.settings.form.control.class == null ? "d-flex justify-content-center" : o.settings.form.control.class])
		}, [o.messages.form.length ? (g(), r("span", SA, [i("div", CA, [i("button", {
			class: p(["btn btn-sm dropdown-toggle", ["btn-" + o.messages.form[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: o.messages.form.length + " " + (o.messages.form.length > 1 ? o.translate("messages") : o.translate("message"))
		}, null, 10, wA), i("ul", TA, [(g(!0), r(e, null, v(o.messages.form, (e) => (g(), r("li", { key: e }, [i("span", { class: p(["dropdown-item disabled", ["text-" + e.priority]]) }, [i("small", EA, b(e.datetime), 1), i("span", { innerHTML: e.msg }, null, 8, DA)], 2)]))), 128))])])])) : n("", !0), (g(!0), r(e, null, v(o.settings.form.control.buttons, (t) => (g(), r("span", { key: t.action }, [t.dropdowns ? n("", !0) : (g(), r("button", {
			key: 0,
			type: "button",
			disabled: t.disabled === void 0 ? !1 : o.getValueOrFunction(t.disabled, {
				button: t,
				item: o.item,
				form: this
			}),
			class: p([t.class ? t.class : o.getButtonClassByAction(t.action)]),
			onClick: (e) => o.formAction(t, {
				button: t,
				item: o.item,
				form: this,
				$event: e
			})
		}, [i("i", { class: p([t.icon === void 0 ? o.getButtonIconClassByAction(t.action) : o.getValueOrFunction(t.icon, {
			button: t,
			item: o.item,
			form: this
		})]) }, null, 2), a(" " + b(o.translate(t.title)), 1)], 10, OA)), t.dropdowns ? (g(), r("div", kA, [i("button", {
			type: "button",
			class: p([[t.class], "dropdown-toggle"]),
			"data-bs-toggle": "dropdown",
			"data-bs-auto-close": "outside",
			"aria-expanded": "false"
		}, [i("span", AA, [i("i", { class: p([t.icon === void 0 ? o.getButtonIconClassByAction(t.action) : o.getValueOrFunction(t.icon, {
			button: t,
			table: this
		})]) }, null, 2), a(" " + b(o.translate(t.title)), 1)])], 2), i("ul", jA, [(g(!0), r(e, null, v(t.dropdowns, (e) => (g(), r("li", { key: e }, [i("span", {
			class: p([e.class ? e.class : ""]),
			onClick: (n) => o.formAction(e, {
				button: t,
				item: o.item,
				form: this,
				$event: n
			})
		}, [e.icon ? (g(), r("i", {
			key: 0,
			class: p([e.icon])
		}, null, 2)) : n("", !0), a(" " + b(o.translate(e.title)), 1)], 10, MA)]))), 128))])])) : n("", !0)]))), 128))], 2)) : n("", !0)])) : n("", !0),
		o.settings.form ? (g(), r("div", NA, [o.settings.form.visible && o.settings.form.groups ? (g(), t(f, {
			key: 0,
			modelValue: o.item,
			"onUpdate:modelValue": s[0] ||= (e) => o.item = e,
			formid: o.formId,
			settings: o.settings
		}, null, 8, [
			"modelValue",
			"formid",
			"settings"
		])) : n("", !0)])) : n("", !0),
		o.item ? (g(), r("div", PA)) : n("", !0),
		o.settings.debug > 1 ? (g(), r("pre", FA, "        " + b(o.item) + "\n    ", 1)) : n("", !0)
	], 42, dA)) : n("", !0);
}
var LA = /* @__PURE__ */ LT(uA, [["render", IA]]), RA = {
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
			return Kc(e, this.settings.translate, t, n || this.settings.language);
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
}, zA = {
	key: 0,
	"aria-label": "Page navigation",
	class: "mt-2 d-flex align-items-center justify-content-between"
}, BA = { class: "dropdown d-inline-block m-1" }, VA = { class: "mx-1" }, HA = { key: 0 }, UA = {
	key: 0,
	class: "dropdown-menu text-end"
}, WA = ["onClick"], GA = { class: "ms-2" }, KA = {
	key: 0,
	class: "bi bi-check-circle-fill ms-2"
}, qA = {
	key: 1,
	class: "bi bi-circle ms-2"
}, JA = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, YA = { class: "pagination pagination-sm m-1" }, XA = { class: "page-item" }, ZA = ["innerHTML"], QA = { class: "page-item" }, $A = ["innerHTML"], ej = ["onClick"], tj = { class: "page-item" }, nj = ["innerHTML"], rj = {
	key: 0,
	class: "page-item"
}, ij = ["innerHTML"];
function aj(t, a, o, s, c, l) {
	return o.config.pagination.hidden ? n("", !0) : (g(), r("nav", zA, [i("div", null, [i("div", BA, [i("button", {
		type: "button",
		class: p(["btn btn-sm btn-secondary", { "dropdown-toggle": o.config.pagination.limits }]),
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [D(i("span", VA, [i("strong", null, b(o.config.pagination.from) + "-" + b(o.config.pagination.to), 1), o.config.pagination.total ? (g(), r("span", HA, " / " + b(o.config.pagination.total), 1)) : n("", !0)], 512), [[E, o.config.pagination.from > 0]])], 2), o.config.pagination.limits ? (g(), r("ul", UA, [i("li", null, [(g(!0), r(e, null, v(o.config.pagination.limits, (e) => (g(), r("span", {
		class: p(["dropdown-item cursor-pointer", { selected: o.config.pagination.limit == e }]),
		key: e,
		onClick: (t) => l.setPageLimit(e)
	}, [
		i("strong", null, b(e), 1),
		i("small", GA, b(l.translate("row")) + "/" + b(l.translate("page")), 1),
		o.config.pagination.limit == e ? (g(), r("i", KA)) : n("", !0),
		o.config.pagination.limit == e ? n("", !0) : (g(), r("i", qA))
	], 10, WA))), 128))])])) : n("", !0)]), D(i("div", JA, [...a[4] ||= [i("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[E, o.ui && o.ui.wait.table]])]), i("ul", YA, [
		i("li", XA, [i("a", {
			class: p(["page-link cursor-pointer", { disabled: l.firstDisabled() }]),
			onClick: a[0] ||= (e) => l.setPage(1),
			"aria-label": "{{  translate('First')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("First")
		}, null, 8, ZA)], 2)]),
		i("li", QA, [i("a", {
			class: p(["page-link cursor-pointer", { disabled: l.prevDisabled() }]),
			onClick: a[1] ||= (e) => l.setPage(o.config.pagination.page - 1),
			"aria-label": "{{ translate('Prev')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("Prev")
		}, null, 8, $A)], 2)]),
		(g(!0), r(e, null, v(o.config.pagination.numbers, (e) => (g(), r("li", {
			key: e,
			class: "page-item"
		}, [i("a", {
			class: p(["page-link cursor-pointer", {
				disabled: e > o.config.pagination.pages,
				current: e == o.config.pagination.page
			}]),
			onClick: (t) => l.setPage(e)
		}, b(e), 11, ej)]))), 128)),
		i("li", tj, [i("a", {
			class: p(["page-link cursor-pointer", { disabled: l.nextDisabled() }]),
			onClick: a[2] ||= (e) => l.setPage(o.config.pagination.page + 1),
			"aria-label": "{{  translate('Next')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("Next")
		}, null, 8, nj)], 2)]),
		o.config.pagination.total ? (g(), r("li", rj, [i("a", {
			class: p(["page-link cursor-pointer", { disabled: l.lastDisabled() }]),
			onClick: a[3] ||= (e) => l.setPage(o.config.pagination.total),
			"aria-label": "{{  translate('Last')  }}"
		}, [i("span", {
			"aria-hidden": "true",
			innerHTML: l.translate("Last")
		}, null, 8, ij)], 2)])) : n("", !0)
	])]));
}
var oj = /* @__PURE__ */ LT(RA, [["render", aj]]), sj = kc(), cj = {
	name: "VuAdminTable",
	props: {
		settings: Object,
		auth: Object
	},
	components: {
		VuAdminForm: LA,
		VuAdminTablePagination: oj
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
		let e = Rc(1e5);
		this.formId = "form_" + this.settings.entity + "_" + e, this.modalId = "modal_" + this.settings.entity + "_" + e;
	},
	mounted() {
		this.modalElement = document.getElementById(this.modalId), this.modalWindow = new so(this.modalElement), this.modalElement.addEventListener("hidden.bs.modal", (e) => {
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
			sj.emit(e + "-" + t, {
				from: this.settings.entity,
				payload: n
			});
		},
		listenEvent() {
			if (sj.on(`EDIT-${this.settings.entity}`, (e) => {
				this.editItem(e.payload.item);
			}), this.settings.table && this.settings.table.filterListen) {
				let e = this.settings.table.filterListen, t = `FILTER-${this.settings.entity}`;
				this._filterListenerRegistered ||= (sj.on(t, (t) => {
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
			return jc(e, t, this.settings, this);
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
				t.relation = Ac(this.settings.relations[t.relation.config], t.relation);
				for (let r of e) r[t.relation.local] && n.push(r[t.relation.local]);
				t.relation.ids = Yc(n), await this.fetchRelation(t, e, this.auth);
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
			let i = await fetch(Vc("GET", e.table.api, null, t), Bc("GET", e.table.api, null, r)), a = await Mc(i), o = Nc(i, a.data);
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
			let c = Uc(s);
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
				r.filter = JSON.stringify(i), nl(r, { column: e });
				let a = await fetch(Vc("GET", e.relation.api, null, r), Bc("GET", e.relation.api, null, n));
				if (a.status !== 200) throw Error(this.translate("Response status: " + a.status));
				let o = await Mc(a);
				if (Nc(a, o.data) || !o.data) return;
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
				let r = await fetch(Vc("DELETE", this.settings.form.api, n, t), Bc("DELETE", this.settings.api, null, this.auth));
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
				let n = await fetch(Vc("DELETE", this.settings.table.api), Bc("DELETE", this.settings.api, { body: JSON.stringify({ ids: e }) }, this.auth));
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
				if (this.convertOut(this.settings.table.columns, [i]), (!this.settings.form.api.output.flatten || !a) && (i = Gc(i)), this.settings.events && this.settings.events.beforeItemSave && this.settings.events.beforeItemSave(i, r, e), !this.settings.form.api.output.item) o = JSON.stringify(i);
				else if (typeof this.settings.form.api.output.item == "string") {
					let e = {};
					e[this.settings.form.api.output.item] = i, o = JSON.stringify(e);
				} else o = JSON.stringify(this.settings.form.api.output.item(i, options));
				let c = a ? "PUT" : "POST";
				s = await fetch(Vc(c, this.settings.form.api, a, r), Bc(c, this.settings.form.api, { body: o }, this.auth));
				let l = await Mc(s), u = Nc(s, l.data);
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
				let n = await fetch(Vc("PUT", this.settings.table.api), Bc("PUT", this.settings.table.api, { body: JSON.stringify({
					item: t,
					ids: this.selected
				}) }, this.auth)).catch((e) => {
					console.error(e), this.addTableMessage(e.message, 3500, "danger", e);
				}), r = await Mc(n), i = Nc(n, r.data);
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
			e.multiple ? Xc(e.value, n) : e.value = e.value === n ? null : n, this.reloadTable();
		},
		dropdownSelectAll(e, t) {
			Zc(e, t), this.reloadTable();
		},
		dropdownSelectInvert(e, t) {
			Qc(e, t), this.reloadTable();
		},
		dropdownSelectClear(e) {
			typeof e == "object" ? $c(e) : e.value = null, this.reloadTable();
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
				this.settings.events && this.settings.events.beforeItemsExport && this.settings.events.beforeItemsExport(r), Jc(qc(r, this.settings.table.exports[e.type].fields), this.settings.entity + ".csv");
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
			let a = `${Date.now().toString(36)}-${zc(8)}`;
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
			return Kc(e, this.settings.translate, t, n || this.settings.language);
		},
		convertIn(e, t) {
			for (let n of e) if (n.convert && n.convert.in) for (let e of t) e[n.name] = n.convert.in(e[n.name], e, n);
		},
		convertOut(e, t) {
			for (let n of e) if (n.convert && n.convert.out) for (let e of t) e[n.name] = n.convert.out(e[n.name], e, n);
		}
	}
}, lj = ["data-bs-theme"], uj = { class: "vua-table-title" }, dj = { class: "d-flex align-items-center justify-content-between" }, fj = { class: "d-inline-block" }, pj = {
	key: 0,
	class: "card-title d-inline-block mb-2"
}, mj = {
	class: "spinner-border spinner-border-sm mx-2",
	role: "status"
}, hj = {
	key: 0,
	class: "d-inline-block"
}, gj = {
	key: 0,
	class: "d-inline-block px-1 mx-1"
}, _j = ["innerHTML"], vj = { class: "dropdown d-inline-block" }, yj = ["innerHTML"], bj = { class: "dropdown-menu text-start" }, xj = { class: "me-2 text-muted" }, Sj = ["innerHTML"], Cj = ["onClick"], wj = {
	key: 1,
	class: "dropdown d-inline-block"
}, Tj = { class: "mx-1" }, Ej = { key: 0 }, Dj = { class: "dropdown-menu" }, Oj = ["onClick"], kj = {
	key: 0,
	class: "bi bi-check-square-fill me-2"
}, Aj = {
	key: 1,
	class: "bi bi-x-square me-2 text-danger"
}, jj = { class: "badge text-secondary fw-normal" }, Mj = {
	key: 2,
	class: "dropdown d-inline-block"
}, Nj = { class: "mx-1" }, Pj = { class: "dropdown-menu" }, Fj = ["onClick"], Ij = { class: "vua-table-header" }, Lj = ["width"], Rj = ["onClick"], zj = ["innerHTML"], Bj = {
	key: 0,
	class: "bi bi-arrow-down"
}, Vj = {
	key: 1,
	class: "bi bi-arrow-up"
}, Hj = { key: 0 }, Uj = ["disabled", "onClick"], Wj = {
	key: 0,
	class: "vua-table-filter"
}, Gj = ["width"], Kj = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, qj = { class: "bi bi-check-all" }, Jj = { class: "bi bi-x-lg" }, Yj = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, Xj = ["onUpdate:modelValue"], Zj = ["disabled", "onClick"], Qj = {
	key: 2,
	class: "input-group input-group-sm my-1"
}, $j = ["onUpdate:modelValue", "disabled"], eM = { value: "=" }, tM = { value: ">" }, nM = { value: ">=" }, rM = { value: "<" }, iM = { value: "<=" }, aM = ["onUpdate:modelValue", "disabled"], oM = ["value"], sM = [
	"onUpdate:modelValue",
	"disabled",
	"min",
	"max"
], cM = ["disabled", "onClick"], lM = { key: 3 }, uM = {
	key: 0,
	class: "dropdown"
}, dM = {
	class: "btn btn-sm btn-secondary dropdown-toggle my-1",
	type: "button",
	"data-bs-auto-close": "outside",
	"data-bs-toggle": "dropdown",
	"aria-expanded": "false"
}, fM = { class: "dropdown-menu" }, pM = ["onClick"], mM = {
	key: 0,
	class: "bi bi-check-square"
}, hM = {
	key: 1,
	class: "bi bi-square"
}, gM = { key: 0 }, _M = { key: 1 }, vM = ["onClick"], yM = { key: 2 }, bM = ["onClick"], xM = { key: 3 }, SM = ["onClick"], CM = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, wM = ["onUpdate:modelValue", "multiple"], TM = ["value"], EM = ["disabled", "onClick"], DM = {
	key: 4,
	class: "input-group input-group-sm my-1"
}, OM = ["onUpdate:modelValue"], kM = { value: "=" }, AM = { value: ">" }, jM = { value: ">=" }, MM = { value: "<" }, NM = { value: "<=" }, PM = ["onUpdate:modelValue"], FM = ["value"], IM = ["type", "onUpdate:modelValue"], LM = ["disabled", "onClick"], RM = ["disabled", "onClick"], zM = { class: "align-middle" }, BM = [
	"data-label",
	"width",
	"onClick"
], VM = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, HM = ["innerHTML"], UM = { key: 1 }, WM = ["innerHTML"], GM = ["aria-valuenow", "aria-valuemax"], KM = { key: 0 }, qM = {
	key: 4,
	class: "input-group input-group-sm"
}, JM = ["innerHTML"], YM = {
	key: 1,
	class: "input-group-text"
}, XM = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], ZM = [
	"type",
	"onChange",
	"onUpdate:modelValue"
], QM = ["onChange", "onUpdate:modelValue"], $M = ["value"], eN = ["innerHTML"], tN = {
	key: 5,
	class: "input-group-text"
}, nN = [
	"name",
	"onUpdate:modelValue",
	"onChange"
], rN = { key: 5 }, iN = ["disabled", "onClick"], aN = ["innerHTML"], oN = { key: 2 }, sN = { key: 0 }, cN = ["colspan"], lN = { class: "row g-3 align-items-center" }, uN = { class: "col-form-label" }, dN = [
	"type",
	"onUpdate:modelValue",
	"onChange"
], fN = ["onUpdate:modelValue", "onChange"], pN = ["onUpdate:modelValue", "onChange"], mN = ["value"], hN = ["innerHTML"], gN = {
	key: 0,
	class: "bg-light text-dark"
}, _N = {
	key: 0,
	class: "vua-table-bulk border-info"
}, vN = ["data-label", "width"], yN = {
	key: 0,
	class: "d-inline-block w-100 px-1"
}, bN = {
	key: 1,
	class: "input-group input-group-sm my-1"
}, xN = [
	"type",
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], SN = [
	"disabled",
	"onChange",
	"onUpdate:modelValue"
], CN = ["value"], wN = ["onClick"], TN = {
	key: 0,
	class: "bi bi-square text-secondary"
}, EN = {
	key: 1,
	class: "bi bi-check-square"
}, DN = { key: 2 }, ON = ["disabled", "onClick"], kN = ["innerHTML"], AN = { key: 2 }, jN = ["id"], MN = { class: "modal-dialog modal-xl" }, NN = { class: "modal-content h-100" };
function PN(s, c, l, u, d, f) {
	let h = y("VuAdminTablePagination"), _ = y("VuAdminForm");
	return g(), r("div", null, [f.authAndSettings() ? (g(), r("div", {
		key: 0,
		class: p(["vua-table-container", [l.settings.class]]),
		"data-bs-theme": [l.settings.theme]
	}, [
		i("div", { class: p(["vua-overlay", { blocked: d.ui.block.table }]) }, null, 2),
		i("div", uj, [i("div", dj, [i("div", fj, [l.settings.table.title ? (g(), r("h5", pj, b(l.settings.table.title), 1)) : n("", !0), D(i("div", mj, [...c[15] ||= [i("span", { class: "visually-hidden" }, "Loading...", -1)]], 512), [[E, d.ui.wait.table && l.settings.table.title]])]), d.messages.table.length ? (g(), r("div", hj, [d.message.table ? (g(), r("small", gj, [i("span", { class: p(["text-" + d.message.table.priority]) }, [i("span", {
			class: "fw-bold",
			innerHTML: d.message.table.msg
		}, null, 8, _j)], 2)])) : n("", !0), i("div", vj, [i("button", {
			class: p(["btn btn-sm dropdown-toggle", ["btn-" + d.messages.table[0].priority]]),
			type: "button",
			"data-bs-toggle": "dropdown",
			"aria-expanded": "false",
			innerHTML: d.messages.table.length + " " + (d.messages.table.length > 1 ? f.translate("messages") : f.translate("message"))
		}, null, 10, yj), i("ul", bj, [(g(!0), r(e, null, v(d.messages.table, (e) => (g(), r("li", { key: e }, [i("span", { class: p(["dropdown-item", ["text-" + e.priority]]) }, [i("small", xj, b(e.datetime), 1), i("span", {
			class: "fw-bold",
			innerHTML: e.msg
		}, null, 8, Sj)], 2)]))), 128))])])])) : n("", !0)])]),
		l.settings.table.control ? (g(), r("div", {
			key: 0,
			class: p(["vua-table-control", [l.settings.table.control.class]])
		}, [(g(!0), r(e, null, v(l.settings.table.control.buttons, (t) => (g(), r("span", { key: t.action }, [
			t.action !== "TABLE_COLUMNS" && !t.dropdowns ? (g(), r("button", {
				key: 0,
				type: "button",
				class: p([t.class ? t.class : f.getButtonClassByAction(t.action)]),
				onClick: (e) => f.tableAction(t, {
					items: d.items,
					$event: e
				})
			}, [i("i", { class: p([t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
				button: t,
				table: this
			})]) }, null, 2), a(" " + b(f.translate(t.title)), 1)], 10, Cj)) : n("", !0),
			t.action === "TABLE_COLUMNS" ? (g(), r("div", wj, [i("button", {
				type: "button",
				class: p([[t.class ? t.class : f.getButtonClassByAction(t.action)], "dropdown-toggle"]),
				"data-bs-toggle": "dropdown",
				"data-bs-auto-close": "outside",
				"aria-expanded": "false"
			}, [D(i("span", Tj, [
				i("i", { class: p([t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
					button: t,
					table: this
				})]) }, null, 2),
				a(" " + b(f.translate(t.title)) + " ", 1),
				f.countHiddenColumns() ? (g(), r("span", Ej, " ( " + b(f.countHiddenColumns()) + " " + b(f.translate("hidden")) + " ) ", 1)) : n("", !0)
			], 512), [[E, l.settings.table.columns.length > 0]])], 2), i("ul", Dj, [
				(g(!0), r(e, null, v(l.settings.table.columns, (e) => (g(), r("li", { key: e }, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: (t) => f.toggleColumn(e)
				}, [
					e.hidden ? n("", !0) : (g(), r("i", kj)),
					e.hidden ? (g(), r("i", Aj)) : n("", !0),
					a(" " + b(e.title) + " ", 1),
					i("small", jj, b(e.name), 1)
				], 8, Oj)]))), 128)),
				c[16] ||= i("li", null, [i("hr", { class: "dropdown-divider" })], -1),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: c[0] ||= (e) => f.toggleColumn(!0)
				}, b(f.translate("Visible all")), 1)]),
				i("li", null, [i("span", {
					class: "dropdown-item cursor-pointer",
					onClick: c[1] ||= (e) => f.toggleColumn(!1)
				}, b(f.translate("Hidden all")), 1)])
			])])) : n("", !0),
			t.dropdowns ? (g(), r("div", Mj, [i("button", {
				type: "button",
				class: p([[t.class], "dropdown-toggle"]),
				"data-bs-toggle": "dropdown",
				"data-bs-auto-close": "outside",
				"aria-expanded": "false"
			}, [i("span", Nj, [i("i", { class: p([t.icon === void 0 ? f.getButtonIconClassByAction(t.action) : f.getValueOrFunction(t.icon, {
				button: t,
				table: this
			})]) }, null, 2), a(" " + b(f.translate(t.title)), 1)])], 2), i("ul", Pj, [(g(!0), r(e, null, v(t.dropdowns, (e) => (g(), r("li", { key: e }, [i("span", {
				class: p(["dropdown-item cursor-pointer", [e.class]]),
				onClick: (t) => f.tableAction(e, {
					items: d.items,
					$event: t
				})
			}, [e.icon ? (g(), r("i", {
				key: 0,
				class: p([e.icon])
			}, null, 2)) : n("", !0), a(" " + b(f.translate(e.title)), 1)], 10, Fj)]))), 128))])])) : n("", !0)
		]))), 128))], 2)) : n("", !0),
		l.settings.table ? (g(), r("table", {
			key: 1,
			class: p(["table vua-table mb-0", [l.settings.table.class]])
		}, [
			i("thead", null, [i("tr", Ij, [(g(!0), r(e, null, v(l.settings.table.columns, (t) => (g(), r("th", {
				class: p(["", [t.header ? t.header.class : ""]]),
				style: m([t.hidden ? "display: none" : ""]),
				key: t,
				width: t.width
			}, [i("span", {
				class: p(["d-inline-block no-select text-nowrap", { "cursor-pointer": f.isSortable(t) }]),
				onClick: (e) => f.sortTable(t)
			}, [i("span", { innerHTML: t.header && t.header.title !== void 0 ? f.translate(t.header.title) : t.title ? f.translate(t.title) : f.translate(t.name) }, null, 8, zj), d.config.order[t.name] ? (g(), r("span", {
				key: 0,
				class: p(["badge text-bg-light ms-1 p-badge", { "opacity-50": d.config.order[t.name].fixed }])
			}, [
				d.config.order[t.name].dir === "ASC" ? (g(), r("i", Bj)) : n("", !0),
				d.config.order[t.name].dir === "DESC" ? (g(), r("i", Vj)) : n("", !0),
				a(" " + b(d.config.order[t.name].idx + 1), 1)
			], 2)) : n("", !0)], 10, Rj), t.header && t.header.buttons ? (g(), r("span", Hj, [(g(!0), r(e, null, v(t.header.buttons, (e) => (g(), r("button", {
				key: e.action,
				type: "button",
				disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
				class: p([e.class ? e.class : f.getButtonClassByAction(e.action)]),
				onClick: (t) => f.tableAction(e, {
					items: d.items,
					$event: t
				})
			}, [i("i", { class: p([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
				button: e,
				column: t,
				table: this
			})]) }, null, 2), a(" " + b(f.translate(e.title)), 1)], 10, Uj))), 128))])) : n("", !0)], 14, Lj))), 128))]), f.countFilters() ? (g(), r("tr", Wj, [(g(!0), r(e, null, v(l.settings.table.columns, (t) => (g(), r("th", {
				style: m([t.hidden ? "display: none" : ""]),
				key: t,
				width: t.width,
				class: p([t.filter ? t.filter.class : ""])
			}, [
				t.index && t.click ? (g(), r("div", Kj, [i("span", {
					class: p(["cursor-pointer badge border badge-index-toggle py-1 px-2 me-1 my-2 w-100", { active: f.haveSelectedRowInPage() }]),
					onClick: c[2] ||= (e) => f.toggleSelectedRowInPage()
				}, [D(i("i", qj, null, 512), [[E, !f.haveSelectedRowInPage()]]), D(i("i", Jj, null, 512), [[E, f.haveSelectedRowInPage()]])], 2)])) : n("", !0),
				t.filter && t.filter.type == "text" ? (g(), r("div", Yj, [D(i("input", {
					type: "text",
					class: p([{ fixed: t.filter.fixed }, "form-control form-control-sm"]),
					"onUpdate:modelValue": (e) => t.filter.value = e,
					onKeyup: c[3] ||= te((e) => f.reloadTable(), ["enter"])
				}, null, 42, Xj), [[T, t.filter.value]]), t.filter.buttonx && t.filter.buttonx != 0 ? (g(), r("button", {
					key: 0,
					class: p(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
					disabled: t.filter.value == null,
					onClick: (e) => {
						t.filter.value = void 0, f.reloadTable();
					}
				}, [...c[17] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, Zj)) : n("", !0)])) : n("", !0),
				t.filter && t.filter.type == "number" ? (g(), r("div", Qj, [
					t.filter.operators == 1 ? D((g(), r("select", {
						key: 0,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						disabled: t.filter.fixed,
						onChange: c[4] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [
						i("option", eM, b(f.translate("=")), 1),
						i("option", tM, b(f.translate(">")), 1),
						i("option", nM, b(f.translate(">=")), 1),
						i("option", rM, b(f.translate("<")), 1),
						i("option", iM, b(f.translate("<=")), 1)
					], 40, $j)), [[w, t.filter.operator]]) : n("", !0),
					t.filter.operators && t.filter.operators.length > 0 ? D((g(), r("select", {
						key: 1,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						disabled: t.filter.fixed,
						onChange: c[5] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [(g(!0), r(e, null, v(t.filter.operators, (e) => (g(), r("option", {
						key: e,
						value: e.value
					}, b(e.label), 9, oM))), 128))], 40, aM)), [[w, t.filter.operator]]) : n("", !0),
					D(i("input", {
						type: "number",
						class: p(["form-control", { fixed: t.filter.fixed }]),
						"onUpdate:modelValue": (e) => t.filter.value = e,
						disabled: t.filter.fixed,
						min: t.filter.min,
						max: t.filter.max,
						onChange: c[6] ||= (e) => f.reloadTable(),
						onKeyup: c[7] ||= te((e) => f.reloadTable(), ["enter"])
					}, null, 42, sM), [[T, t.filter.value]]),
					!t.filter.fixed && t.filter.buttonx && t.filter.buttonx != 0 ? (g(), r("button", {
						key: 2,
						class: p(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
						disabled: t.filter.value == null,
						onClick: (e) => {
							t.filter.value = void 0, f.reloadTable();
						}
					}, [...c[18] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, cM)) : n("", !0)
				])) : n("", !0),
				t.filter && t.filter.type == "select" ? (g(), r("div", lM, [t.filter.dropdown ? (g(), r("div", uM, [i("button", dM, b(t.filter.multiple ? t.filter.value.length + " selected" : t.filter.value ? t.filter.value : "not selected"), 1), i("ul", fM, [
					i("li", null, [(g(!0), r(e, null, v(t.filter.options, (e) => (g(), r("span", {
						key: e,
						class: p(["dropdown-item cursor-pointer", { selected: t.filter.multiple ? t.filter.value.indexOf(e.value) >= 0 : t.filter.value === e.value }]),
						onClick: (n) => f.dropdownSelectToggleOne(t.filter, e)
					}, [(t.filter.multiple ? t.filter.value.indexOf(e.value) >= 0 : t.filter.value === e.value) ? (g(), r("i", mM)) : (g(), r("i", hM)), a(" " + b(f.translate(e.label ? e.label : e.value)), 1)], 10, pM))), 128))]),
					t.filter.multiple ? (g(), r("li", gM, [...c[19] ||= [i("hr", { class: "dropdown-divider" }, null, -1)]])) : n("", !0),
					t.filter.multiple ? (g(), r("li", _M, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => f.dropdownSelectAll(t.filter.value, t.filter.options)
					}, b(f.translate("Select all")), 9, vM)])) : n("", !0),
					t.filter.multiple ? (g(), r("li", yM, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => f.dropdownSelectClear(t.filter.value)
					}, b(f.translate("Unselect all")), 9, bM)])) : n("", !0),
					t.filter.multiple ? (g(), r("li", xM, [i("span", {
						class: "dropdown-item cursor-pointer",
						onClick: (e) => f.dropdownSelectInvert(t.filter.value, t.filter.options)
					}, b(f.translate("Invert all")), 9, SM)])) : n("", !0)
				])])) : (g(), r("div", CM, [D(i("select", {
					"onUpdate:modelValue": (e) => t.filter.value = e,
					onChange: c[8] ||= (e) => f.reloadTable(),
					multiple: t.filter.multiple,
					class: "form-select form-select-sm pe-0"
				}, [(g(!0), r(e, null, v(t.filter.options, (e) => (g(), r("option", {
					key: e,
					value: e.value
				}, b(f.translate(e.label ? e.label : e.value)), 9, TM))), 128))], 40, wM), [[w, t.filter.value]]), t.filter.buttonx && t.filter.buttonx != 0 ? (g(), r("button", {
					key: 0,
					class: p(["btn btn-outline-secondary", { "opacity-25": t.filter.value == null }]),
					disabled: t.filter.value == null,
					onClick: (e) => {
						t.filter.value = void 0, f.reloadTable();
					}
				}, [...c[20] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, EM)) : n("", !0)]))])) : n("", !0),
				t.filter && (t.filter.type == "datetime-local" || t.filter.type == "date") ? (g(), r("div", DM, [
					t.filter.operators == 1 ? D((g(), r("select", {
						key: 0,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						onChange: c[9] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [
						i("option", kM, b(f.translate("=")), 1),
						i("option", AM, b(f.translate(">")), 1),
						i("option", jM, b(f.translate(">=")), 1),
						i("option", MM, b(f.translate("<")), 1),
						i("option", NM, b(f.translate("<=")), 1)
					], 40, OM)), [[w, t.filter.operator]]) : n("", !0),
					t.filter.operators && t.filter.operators.length > 0 ? D((g(), r("select", {
						key: 1,
						"onUpdate:modelValue": (e) => t.filter.operator = e,
						onChange: c[10] ||= (e) => f.reloadTable(),
						class: "form-select form-select-sm pe-0"
					}, [(g(!0), r(e, null, v(t.filter.operators, (e) => (g(), r("option", {
						key: e,
						value: e.value
					}, b(f.translate(e.label)), 9, FM))), 128))], 40, PM)), [[w, t.filter.operator]]) : n("", !0),
					D(i("input", {
						type: t.filter.type,
						class: p([{ fixed: t.filter.fixed }, "form-control form-control-sm"]),
						"onUpdate:modelValue": (e) => t.filter.value = e,
						onChange: c[11] ||= (e) => f.reloadTable(),
						onKeyup: c[12] ||= te((e) => f.reloadTable(), ["enter"])
					}, null, 42, IM), [[C, t.filter.value]]),
					i("button", {
						class: p(["btn btn-outline-secondary", { "opacity-25": !t.filter.value }]),
						disabled: !t.filter.value,
						onClick: (e) => {
							t.filter.value = void 0, f.reloadTable();
						}
					}, [...c[21] ||= [i("i", { class: "bi bi-x" }, null, -1)]], 10, LM)
				])) : n("", !0),
				t.filter && t.filter.buttons ? (g(), r("span", {
					key: 5,
					class: p(f.getValueOrFunction(t.filter.buttons, { column: t }))
				}, [(g(!0), r(e, null, v(t.filter.buttons, (e) => (g(), r("span", { key: e.action }, [i("button", {
					type: "button",
					disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
					class: p([e.class ? e.class : f.getButtonClassByAction(e.action)]),
					onClick: (t) => f.tableAction(e, {
						items: d.items,
						$event: t
					})
				}, [i("i", { class: p([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
					button: e,
					column: t,
					table: this
				})]) }, null, 2), a(" " + b(f.translate(e.title)), 1)], 10, RM)]))), 128))], 2)) : n("", !0)
			], 14, Gj))), 128))])) : n("", !0)]),
			i("tbody", null, [(g(!0), r(e, null, v(this.items, (t, a) => (g(), r(e, { key: t.id }, [i("tr", zM, [(g(!0), r(e, null, v(l.settings.table.columns, (o) => (g(), r("td", {
				style: m([o.hidden ? "display: none" : ""]),
				key: o.name,
				"data-label": o.title ? o.title : f.translate(o.name),
				width: o.width,
				class: p(f.getValueOrFunction(o.class, {
					column: o,
					item: t
				})),
				onClick: (e) => f.tableAction(o, {
					item: t,
					index: a,
					$event: e
				})
			}, [
				o.index ? (g(), r("div", VM, [i("span", {
					class: p(["cursor-pointer badge border badge-index p-1 w-100", { selected: d.selected.indexOf(t[l.settings.pkey]) >= 0 }]),
					innerHTML: a + 1 + (d.config.pagination.page - 1) * d.config.pagination.limit
				}, null, 10, HM)])) : n("", !0),
				!o.template && !o.input && !o.progressbar ? (g(), r("span", UM, b(f.tableCellValue(o.name, t, a, o)), 1)) : n("", !0),
				o.template ? (g(), r("span", {
					key: 2,
					innerHTML: f.tableCellTemplate(o.template, t, a, o)
				}, null, 8, WM)) : n("", !0),
				o.progressbar ? (g(), r("div", {
					key: 3,
					class: "progress",
					role: "progressbar",
					"aria-label": "Warning example",
					"aria-valuenow": t[o.name],
					"aria-valuemax": o.progressbar.max
				}, [i("div", {
					class: p(["progress-bar", [o.progressbar.class]]),
					style: m({ width: Math.round(t[o.name] / o.progressbar.max * 100) + "%" })
				}, [o.progressbar.value ? (g(), r("span", KM, b(t[o.name]), 1)) : n("", !0)], 6)], 8, GM)) : n("", !0),
				o.input ? (g(), r("div", qM, [
					o.input.prefix ? (g(), r("span", {
						key: 0,
						class: "input-group-text",
						innerHTML: f.getValueOrFunction(o.input.prefix, {
							column: o,
							item: t
						})
					}, null, 8, JM)) : n("", !0),
					o.input.prefixcheck ? (g(), r("span", YM, [D(i("input", {
						class: "form-check p-0 m-0",
						type: "checkbox",
						name: o.input.prefixcheck.name,
						"onUpdate:modelValue": (e) => t[o.input.prefixcheck.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.input.prefixcheck.name], o, t, a)
					}, null, 40, XM), [[S, t[o.input.prefixcheck.name]]])])) : n("", !0),
					[
						"text",
						"number",
						"date",
						"datetime-local"
					].indexOf(o.input.type) >= 0 ? D((g(), r("input", {
						key: 2,
						type: o.input.type,
						class: p(["form-control form-control-sm", f.getValueOrFunction(o.input.class, {
							column: o,
							item: t
						})]),
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, a),
						"onUpdate:modelValue": (e) => t[o.name] = e
					}, null, 42, ZM)), [[C, t[o.name]]]) : n("", !0),
					o.input.type == "select" ? D((g(), r("select", {
						key: 3,
						class: p(["form-select form-select-sm pe-0", f.getValueOrFunction(o.input.class, {
							column: o,
							item: t
						})]),
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, a),
						"onUpdate:modelValue": (e) => t[o.name] = e
					}, [(g(!0), r(e, null, v(o.input.options, (e) => (g(), r("option", {
						value: e.value,
						key: e
					}, b(f.translate(e.label)), 9, $M))), 128))], 42, QM)), [[w, t[o.name]]]) : n("", !0),
					o.input.suffix ? (g(), r("span", {
						key: 4,
						class: "input-group-text",
						innerHTML: f.getValueOrFunction(o.input.suffix, {
							column: o,
							item: t
						})
					}, null, 8, eN)) : n("", !0),
					o.input.suffixcheck ? (g(), r("span", tN, [D(i("input", {
						class: "form-check p-0 m-0",
						type: "checkbox",
						name: o.input.suffixcheck.name,
						"onUpdate:modelValue": (e) => t[o.input.suffixcheck.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.input.suffixcheck.name], o, t, a)
					}, null, 40, nN), [[S, t[o.input.suffixcheck.name]]])])) : n("", !0)
				])) : n("", !0),
				o.buttons ? (g(), r("span", rN, [(g(!0), r(e, null, v(o.buttons, (e) => (g(), r("span", { key: e.action }, [e.hidden ? n("", !0) : (g(), r("button", {
					key: 0,
					type: "button",
					disabled: e.disabled === void 0 ? null : f.getValueOrFunction(e.disabled),
					class: p([e.class ? f.getValueOrFunction(e.class, {
						button: e,
						column: o,
						item: t,
						table: this
					}) : f.getButtonClassByAction(e.action)]),
					onClick: (n) => f.tableAction(e, {
						column: o,
						item: t,
						index: a,
						$event: n
					})
				}, [e.icon === null ? n("", !0) : (g(), r("i", {
					key: 0,
					class: p([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
						button: e,
						column: o,
						item: t,
						table: this
					})])
				}, null, 2)), e.template ? (g(), r("span", {
					key: 1,
					innerHTML: f.tableCellTemplate(e.template, t, a, o)
				}, null, 8, aN)) : (g(), r("span", oN, b(f.translate(e.title)), 1))], 10, iN))]))), 128))])) : n("", !0)
			], 14, BM))), 128))]), l.settings.table.details && d.details.indexOf(t[l.settings.pkey]) >= 0 ? (g(), r("tr", sN, [i("td", {
				class: p([l.settings.table.details.class]),
				colspan: l.settings.table.columns.length
			}, [
				(g(!0), r(e, null, v(l.settings.table.details.fields, (o) => (g(), r("div", {
					class: "m-0",
					key: o
				}, [i("div", lN, [i("div", { class: p(["col text-end", [o.class]]) }, [i("label", uN, b(o.label), 1)], 2), i("div", { class: p(["col", [o.input.class]]) }, [
					["select", "textarea"].indexOf(o.input.type) < 0 ? D((g(), r("input", {
						key: 0,
						type: o.input.type,
						class: "form-control form-control-sm",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, a)
					}, null, 40, dN)), [[C, t[o.name]]]) : n("", !0),
					o.input.type == "textarea" ? D((g(), r("textarea", {
						key: 1,
						class: "form-control form-control-sm",
						rows: "3",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, a)
					}, "\r\n                    ", 40, fN)), [[T, t[o.name]]]) : n("", !0),
					o.input.type == "select" ? D((g(), r("select", {
						key: 2,
						class: "form-select form-select-sm pe-0",
						"onUpdate:modelValue": (e) => t[o.name] = e,
						onChange: (e) => f.onRowInputChange(t[o.name], o, t, a)
					}, [(g(!0), r(e, null, v(o.input.options, (e) => (g(), r("option", {
						value: e.value,
						key: e
					}, b(f.translate(e.label)), 9, mN))), 128))], 40, pN)), [[w, t[o.name]]]) : n("", !0)
				], 2)])]))), 128)),
				i("span", { innerHTML: l.settings.table.details.raw(t) }, null, 8, hN),
				l.settings.debug > 1 ? (g(), r("pre", gN, "                  " + b(t) + "\n                ", 1)) : n("", !0)
			], 10, cN)])) : n("", !0)], 64))), 128))]),
			i("tfoot", null, [d.selected.length > 0 ? (g(), r("tr", _N, [(g(!0), r(e, null, v(l.settings.table.columns, (t) => (g(), r("td", {
				style: m([t.hidden ? "display: none" : ""]),
				key: t.name,
				"data-label": t.title,
				width: t.width,
				class: p(t.class)
			}, [
				t.index ? (g(), r("div", yN, [i("span", {
					class: "cursor-pointer d-inline-block badge border badge-index-toggle active py-1 px-2 me-1 my-2 w-100",
					onClick: c[13] ||= (e) => f.toggleSelectedAll()
				}, b(d.selected.length), 1)])) : n("", !0),
				t.input && t.bulk && t.bulk.enabled ? (g(), r("div", bN, [
					[
						"text",
						"number",
						"date",
						"datetime-local"
					].indexOf(t.input.type) >= 0 ? D((g(), r("input", {
						key: 0,
						type: t.input.type,
						class: p(["form-control form-control-sm", t.input.class]),
						disabled: d.bulkinputs.indexOf(t.name) < 0,
						onChange: (e) => f.onBulkInputChange(d.bulkitem[t.name], d.bulkitem, t),
						"onUpdate:modelValue": (e) => d.bulkitem[t.name] = e
					}, null, 42, xN)), [[C, d.bulkitem[t.name]]]) : n("", !0),
					t.input.type == "select" ? D((g(), r("select", {
						key: 1,
						class: p(["form-select form-select-sm pe-0", t.input.class]),
						disabled: d.bulkinputs.indexOf(t.name) < 0,
						onChange: (e) => f.onBulkInputChange(d.bulkitem[t.name], d.bulkitem, t),
						"onUpdate:modelValue": (e) => d.bulkitem[t.name] = e
					}, [(g(!0), r(e, null, v(t.input.options, (e) => (g(), r("option", {
						value: e.value,
						key: e
					}, b(f.translate(e.label)), 9, CN))), 128))], 42, SN)), [[w, d.bulkitem[t.name]]]) : n("", !0),
					i("span", {
						class: "input-group-text cursor-pointer",
						onClick: (e) => f.ifBulkInputClick(t)
					}, [d.bulkitem[t.name] === void 0 ? (g(), r("i", TN)) : (g(), r("i", EN))], 8, wN)
				])) : n("", !0),
				t.bulk ? (g(), r("span", DN, [(g(!0), r(e, null, v(t.bulk.buttons, (e) => (g(), r("span", { key: e.action }, [i("button", {
					type: "button",
					class: p([e.class ? e.class : f.getButtonClassByAction(e.action)]),
					disabled: e.action === "save" && !this.bulkinputs.length,
					onClick: (n) => f.tableBulkAction(e.action, d.bulkitem, t, n)
				}, [e.icon === null ? n("", !0) : (g(), r("i", {
					key: 0,
					class: p([e.icon === void 0 ? f.getButtonIconClassByAction(e.action) : f.getValueOrFunction(e.icon, {
						button: e,
						column: t,
						table: this
					})])
				}, null, 2)), e.template ? (g(), r("span", {
					key: 1,
					innerHTML: f.tableCellTemplate(e.template, d.bulkitem, null, t)
				}, null, 8, kN)) : (g(), r("span", AN, b(f.translate(e.title)), 1))], 10, ON)]))), 128))])) : n("", !0)
			], 14, vN))), 128))])) : n("", !0)])
		], 2)) : n("", !0),
		o(h, {
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
	], 10, lj)) : n("", !0), i("div", {
		class: "modal shadow",
		id: d.modalId,
		tabindex: "-1"
	}, [i("div", MN, [i("div", NN, [f.authAndSettings() && l.settings.form.visible && l.settings.form.groups ? (g(), t(_, {
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
		fetchRelation: f.fetchRelation
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
	])) : n("", !0)])])], 8, jN)]);
}
var FN = {
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
				if (this.settings = Ac(this.defaults, e), this.settings.entity = this.entity, this.settings.preset = this.preset ? this.preset : "default", !this.settings.theme) {
					let e = document.documentElement.getAttribute("data-bs-theme");
					this.settings.theme = e || "light";
				}
				this.settings.events.afterSettingsInit && this.settings.events.afterSettingsInit(this.settings), this.settings.debug && (console.log(`Entity config (${this.entity}) initialized`), this.settings.debug > 1 && console.log(this.settings));
			} else console.error(`Entity config (${this.entity}) not found`);
			this.$forceUpdate();
		}
	},
	components: { VuAdminTable: /* @__PURE__ */ LT(cj, [["render", PN]]) }
}, IN = { key: 0 }, LN = ["data-bs-theme"];
function RN(e, t, i, a, s, c) {
	let l = y("vu-admin-table");
	return e.entity && e.settings ? (g(), r("div", IN, [e.auth ? (g(), r("div", {
		key: 0,
		class: "vu-admin",
		"data-bs-theme": [e.settings.theme]
	}, [o(l, {
		settings: e.settings,
		auth: e.auth
	}, null, 8, ["settings", "auth"])], 8, LN)) : n("", !0)])) : n("", !0);
}
var zN = /* @__PURE__ */ LT(FN, [["render", RN]]), BN = (/* @__PURE__ */ re(((e, t) => {
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
			var e = this.h0h, t = this.h0l, n = this.h1h, r = this.h1l, i = this.h2h, a = this.h2l, o = this.h3h, s = this.h3l, c = this.h4h, l = this.h4l, u = this.h5h, d = this.h5l, p = this.h6h, m = this.h6l, h = this.h7h, g = this.h7l, _ = this.blocks, v, y, b, x, S, C, w, T, E, ee, D, te, O, ne, re, ie, ae, oe, k, A, j, M, N, se, ce;
			for (v = 32; v < 160; v += 2) A = _[v - 30], j = _[v - 29], y = (A >>> 1 | j << 31) ^ (A >>> 8 | j << 24) ^ A >>> 7, b = (j >>> 1 | A << 31) ^ (j >>> 8 | A << 24) ^ (j >>> 7 | A << 25), A = _[v - 4], j = _[v - 3], x = (A >>> 19 | j << 13) ^ (j >>> 29 | A << 3) ^ A >>> 6, S = (j >>> 19 | A << 13) ^ (A >>> 29 | j << 3) ^ (j >>> 6 | A << 26), A = _[v - 32], j = _[v - 31], M = _[v - 14], N = _[v - 13], C = (N & 65535) + (j & 65535) + (b & 65535) + (S & 65535), w = (N >>> 16) + (j >>> 16) + (b >>> 16) + (S >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (y & 65535) + (x & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (y >>> 16) + (x >>> 16) + (T >>> 16), _[v] = E << 16 | T & 65535, _[v + 1] = w << 16 | C & 65535;
			var le = e, ue = t, de = n, P = r, fe = i, pe = a, me = o, he = s, ge = c, _e = l, ve = u, ye = d, be = p, F = m, I = h, L = g;
			for (ie = de & fe, ae = P & pe, v = 0; v < 160; v += 8) y = (le >>> 28 | ue << 4) ^ (ue >>> 2 | le << 30) ^ (ue >>> 7 | le << 25), b = (ue >>> 28 | le << 4) ^ (le >>> 2 | ue << 30) ^ (le >>> 7 | ue << 25), x = (ge >>> 14 | _e << 18) ^ (ge >>> 18 | _e << 14) ^ (_e >>> 9 | ge << 23), S = (_e >>> 14 | ge << 18) ^ (_e >>> 18 | ge << 14) ^ (ge >>> 9 | _e << 23), ee = le & de, D = ue & P, oe = ee ^ le & fe ^ ie, k = D ^ ue & pe ^ ae, se = ge & ve ^ ~ge & be, ce = _e & ye ^ ~_e & F, A = _[v], j = _[v + 1], M = f[v], N = f[v + 1], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (L & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (L >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (I & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (I >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (he & 65535) + (j & 65535), w = (he >>> 16) + (j >>> 16) + (C >>> 16), T = (me & 65535) + (A & 65535) + (w >>> 16), E = (me >>> 16) + (A >>> 16) + (T >>> 16), I = E << 16 | T & 65535, L = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), me = E << 16 | T & 65535, he = w << 16 | C & 65535, y = (me >>> 28 | he << 4) ^ (he >>> 2 | me << 30) ^ (he >>> 7 | me << 25), b = (he >>> 28 | me << 4) ^ (me >>> 2 | he << 30) ^ (me >>> 7 | he << 25), x = (I >>> 14 | L << 18) ^ (I >>> 18 | L << 14) ^ (L >>> 9 | I << 23), S = (L >>> 14 | I << 18) ^ (L >>> 18 | I << 14) ^ (I >>> 9 | L << 23), te = me & le, O = he & ue, oe = te ^ me & de ^ ee, k = O ^ he & P ^ D, se = I & ge ^ ~I & ve, ce = L & _e ^ ~L & ye, A = _[v + 2], j = _[v + 3], M = f[v + 2], N = f[v + 3], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (F & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (F >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (be & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (be >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (pe & 65535) + (j & 65535), w = (pe >>> 16) + (j >>> 16) + (C >>> 16), T = (fe & 65535) + (A & 65535) + (w >>> 16), E = (fe >>> 16) + (A >>> 16) + (T >>> 16), be = E << 16 | T & 65535, F = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), fe = E << 16 | T & 65535, pe = w << 16 | C & 65535, y = (fe >>> 28 | pe << 4) ^ (pe >>> 2 | fe << 30) ^ (pe >>> 7 | fe << 25), b = (pe >>> 28 | fe << 4) ^ (fe >>> 2 | pe << 30) ^ (fe >>> 7 | pe << 25), x = (be >>> 14 | F << 18) ^ (be >>> 18 | F << 14) ^ (F >>> 9 | be << 23), S = (F >>> 14 | be << 18) ^ (F >>> 18 | be << 14) ^ (be >>> 9 | F << 23), ne = fe & me, re = pe & he, oe = ne ^ fe & le ^ te, k = re ^ pe & ue ^ O, se = be & I ^ ~be & ge, ce = F & L ^ ~F & _e, A = _[v + 4], j = _[v + 5], M = f[v + 4], N = f[v + 5], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (ye & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (ye >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (ve & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (ve >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (P & 65535) + (j & 65535), w = (P >>> 16) + (j >>> 16) + (C >>> 16), T = (de & 65535) + (A & 65535) + (w >>> 16), E = (de >>> 16) + (A >>> 16) + (T >>> 16), ve = E << 16 | T & 65535, ye = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), de = E << 16 | T & 65535, P = w << 16 | C & 65535, y = (de >>> 28 | P << 4) ^ (P >>> 2 | de << 30) ^ (P >>> 7 | de << 25), b = (P >>> 28 | de << 4) ^ (de >>> 2 | P << 30) ^ (de >>> 7 | P << 25), x = (ve >>> 14 | ye << 18) ^ (ve >>> 18 | ye << 14) ^ (ye >>> 9 | ve << 23), S = (ye >>> 14 | ve << 18) ^ (ye >>> 18 | ve << 14) ^ (ve >>> 9 | ye << 23), ie = de & fe, ae = P & pe, oe = ie ^ de & me ^ ne, k = ae ^ P & he ^ re, se = ve & be ^ ~ve & I, ce = ye & F ^ ~ye & L, A = _[v + 6], j = _[v + 7], M = f[v + 6], N = f[v + 7], C = (N & 65535) + (j & 65535) + (ce & 65535) + (S & 65535) + (_e & 65535), w = (N >>> 16) + (j >>> 16) + (ce >>> 16) + (S >>> 16) + (_e >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (se & 65535) + (x & 65535) + (ge & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (se >>> 16) + (x >>> 16) + (ge >>> 16) + (T >>> 16), A = E << 16 | T & 65535, j = w << 16 | C & 65535, C = (k & 65535) + (b & 65535), w = (k >>> 16) + (b >>> 16) + (C >>> 16), T = (oe & 65535) + (y & 65535) + (w >>> 16), E = (oe >>> 16) + (y >>> 16) + (T >>> 16), M = E << 16 | T & 65535, N = w << 16 | C & 65535, C = (ue & 65535) + (j & 65535), w = (ue >>> 16) + (j >>> 16) + (C >>> 16), T = (le & 65535) + (A & 65535) + (w >>> 16), E = (le >>> 16) + (A >>> 16) + (T >>> 16), ge = E << 16 | T & 65535, _e = w << 16 | C & 65535, C = (N & 65535) + (j & 65535), w = (N >>> 16) + (j >>> 16) + (C >>> 16), T = (M & 65535) + (A & 65535) + (w >>> 16), E = (M >>> 16) + (A >>> 16) + (T >>> 16), le = E << 16 | T & 65535, ue = w << 16 | C & 65535;
			C = (t & 65535) + (ue & 65535), w = (t >>> 16) + (ue >>> 16) + (C >>> 16), T = (e & 65535) + (le & 65535) + (w >>> 16), E = (e >>> 16) + (le >>> 16) + (T >>> 16), this.h0h = E << 16 | T & 65535, this.h0l = w << 16 | C & 65535, C = (r & 65535) + (P & 65535), w = (r >>> 16) + (P >>> 16) + (C >>> 16), T = (n & 65535) + (de & 65535) + (w >>> 16), E = (n >>> 16) + (de >>> 16) + (T >>> 16), this.h1h = E << 16 | T & 65535, this.h1l = w << 16 | C & 65535, C = (a & 65535) + (pe & 65535), w = (a >>> 16) + (pe >>> 16) + (C >>> 16), T = (i & 65535) + (fe & 65535) + (w >>> 16), E = (i >>> 16) + (fe >>> 16) + (T >>> 16), this.h2h = E << 16 | T & 65535, this.h2l = w << 16 | C & 65535, C = (s & 65535) + (he & 65535), w = (s >>> 16) + (he >>> 16) + (C >>> 16), T = (o & 65535) + (me & 65535) + (w >>> 16), E = (o >>> 16) + (me >>> 16) + (T >>> 16), this.h3h = E << 16 | T & 65535, this.h3l = w << 16 | C & 65535, C = (l & 65535) + (_e & 65535), w = (l >>> 16) + (_e >>> 16) + (C >>> 16), T = (c & 65535) + (ge & 65535) + (w >>> 16), E = (c >>> 16) + (ge >>> 16) + (T >>> 16), this.h4h = E << 16 | T & 65535, this.h4l = w << 16 | C & 65535, C = (d & 65535) + (ye & 65535), w = (d >>> 16) + (ye >>> 16) + (C >>> 16), T = (u & 65535) + (ve & 65535) + (w >>> 16), E = (u >>> 16) + (ve >>> 16) + (T >>> 16), this.h5h = E << 16 | T & 65535, this.h5l = w << 16 | C & 65535, C = (m & 65535) + (F & 65535), w = (m >>> 16) + (F >>> 16) + (C >>> 16), T = (p & 65535) + (be & 65535) + (w >>> 16), E = (p >>> 16) + (be >>> 16) + (T >>> 16), this.h6h = E << 16 | T & 65535, this.h6l = w << 16 | C & 65535, C = (g & 65535) + (L & 65535), w = (g >>> 16) + (L >>> 16) + (C >>> 16), T = (h & 65535) + (I & 65535) + (w >>> 16), E = (h >>> 16) + (I >>> 16) + (T >>> 16), this.h7h = E << 16 | T & 65535, this.h7l = w << 16 | C & 65535;
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
kc();
var VN = {
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
	components: { VuAdminForm: LA },
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
			for (let e = 0; e < t; e++) n = (0, BN.sha512)(n);
			return n;
		},
		authUpdate() {
			this.$emit("update:modelValue", this.auth);
		},
		handleEscapeKey(e) {
			e.key === "Escape" && this.close();
		},
		getValueOrFunction(e, t) {
			return jc(e, t, this.settings, this);
		},
		translate(e, t, n) {
			return Kc(e, this.settings.translate, t, n || this.settings.language);
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
		let e = Rc(1e5);
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
		}, console.log(this.auth), this.checkStorage(), this.reset(), this.updateInputs(), this.$forceUpdate(), this.detectQuery(), this.captchaRequired && this.fetchCaptcha(), this.settings.debug && console.log("vu-auth mounted ", "2.0.0");
	},
	beforeUnmount() {
		window.removeEventListener("keydown", this.handleEscapeKey);
	}
}, HN = ["data-bs-theme"], UN = { class: "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto" }, WN = { class: "position-absolute top-0 end-0 p-0 m-2" }, GN = {
	key: 0,
	class: "spinner-border spinner-border-sm text-primary"
}, KN = { class: "text-center mt-2 mb-4" }, qN = {
	key: 0,
	class: "mb-3"
}, JN = {
	for: "email",
	class: "form-label text-primary"
}, YN = { class: "input-group" }, XN = [
	"type",
	"placeholder",
	"disabled"
], ZN = ["innerHTML"], QN = { class: "mb-3" }, $N = {
	key: 0,
	for: "password",
	class: "form-label text-primary"
}, eP = { class: "input-group" }, tP = [
	"type",
	"placeholder",
	"pattern",
	"minlength",
	"disabled"
], nP = {
	key: 0,
	class: "bi bi-eye"
}, rP = {
	key: 1,
	class: "bi bi-eye-slash"
}, iP = ["innerHTML"], aP = {
	key: 0,
	class: "mb-4"
}, oP = {
	for: "password_again",
	class: "form-label text-primary"
}, sP = ["innerHTML"], cP = { class: "input-group" }, lP = [
	"type",
	"placeholder",
	"minlength",
	"disabled"
], uP = {
	key: 0,
	class: "bi bi-eye"
}, dP = {
	key: 1,
	class: "bi bi-eye-slash"
}, fP = ["innerHTML"], pP = {
	key: 2,
	class: "mb-3"
}, mP = {
	key: 0,
	class: "text-center py-2"
}, hP = { key: 1 }, gP = ["innerHTML"], _P = { class: "d-flex justify-content-center gap-2 flex-wrap" }, vP = ["onClick"], yP = {
	key: 3,
	class: "text-danger text-center small mt-2 mb-3 fw-semibold"
}, bP = {
	key: 4,
	class: "mb-3"
}, xP = ["innerHTML"], SP = { class: "form-label text-primary" }, CP = { class: "input-group" }, wP = ["placeholder", "disabled"], TP = { class: "text-end mt-2" }, EP = ["disabled"], DP = {
	key: 5,
	class: "mb-4 text-center"
}, OP = ["innerHTML"], kP = {
	key: 6,
	class: "d-flex mb-4"
}, AP = ["innerHTML"], jP = { class: "row" }, MP = { class: "mb-3" }, NP = ["for", "innerHTML"], PP = { class: "input-group" }, FP = ["innerHTML"], IP = [
	"disabled",
	"required",
	"onUpdate:modelValue",
	"multiple"
], LP = ["value", "innerHTML"], RP = [
	"id",
	"name",
	"type",
	"onUpdate:modelValue",
	"placeholder",
	"required",
	"disabled"
], zP = ["innerHTML"], BP = ["innerHTML"], VP = {
	key: 0,
	class: "form-check"
}, HP = [
	"id",
	"name",
	"onUpdate:modelValue",
	"required",
	"disabled"
], UP = ["for", "innerHTML"], WP = {
	key: 7,
	class: "mt-4"
}, GP = ["innerHTML"], KP = {
	key: 8,
	class: "mt-3 text-center"
}, qP = ["innerHTML"], JP = { class: "mt-4 d-flex justify-content-between" }, YP = ["disabled"], XP = ["disabled"], ZP = ["disabled"], QP = {
	key: 0,
	class: "bi bi-person-plus mx-1"
}, $P = {
	key: 1,
	class: "bi bi-arrow-right-square mx-1"
}, eF = { class: "mt-2 text-end" }, tF = ["disabled"], nF = ["id"], rF = { class: "modal-dialog modal-xl" }, iF = { class: "modal-content h-100" };
function aF(o, s, c, l, u, d) {
	let f = y("VuAdminForm");
	return o.auth && o.auth.visible ? (g(), r("div", {
		key: 0,
		class: "vua-auth",
		"data-bs-theme": [o.theme]
	}, [i("div", {
		class: "row d-flex justify-content-center align-items-center min-vh-100",
		onClick: s[16] ||= O((...e) => o.close && o.close(...e), ["stop"])
	}, [i("div", UN, [i("div", {
		class: "card shadow p-4 position-relative",
		onClick: s[15] ||= O(() => {}, ["stop"])
	}, [
		i("div", WN, [o.loading ? (g(), r("i", GN)) : n("", !0), i("button", {
			type: "button",
			class: "btn p-2",
			onClick: s[0] ||= O((...e) => o.close && o.close(...e), ["stop"])
		}, [...s[18] ||= [i("i", { class: "bi bi-x px-1 text-muted" }, null, -1)]])]),
		i("h1", KN, b(o.settings.title[o.auth.panel]), 1),
		i("form", {
			onSubmit: s[13] ||= O((e) => o.handleSubmit(), ["prevent"]),
			onClick: s[14] ||= O(() => {}, ["stop"])
		}, [
			o.auth.panel != "activation" && o.auth.panel != "password" && o.auth.panel != "twofa" ? (g(), r("div", qN, [
				i("label", JN, b(o.settings.username.label), 1),
				i("div", YN, [o.settings.username.icon ? (g(), r("span", {
					key: 0,
					class: p(["input-group-text", { "rounded-bottom-0": o.settings.username.help }])
				}, [i("i", { class: p([o.settings.username.icon]) }, null, 2)], 2)) : n("", !0), D(i("input", {
					id: "email",
					name: "email",
					type: o.settings.username.type,
					"onUpdate:modelValue": s[1] ||= (e) => o.username = e,
					class: p(["form-control", { "rounded-bottom-0": o.settings.username.help }]),
					placeholder: o.settings.username.placeholder,
					required: "",
					disabled: o.loading
				}, null, 10, XN), [[C, o.username]])]),
				o.settings.username.help ? (g(), r("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.settings.username.help
				}, null, 8, ZN)) : n("", !0)
			])) : n("", !0),
			o.auth.panel != "forgot" && o.auth.panel != "activation" && o.auth.panel != "twofa" ? (g(), r(e, { key: 1 }, [i("div", QN, [
				o.settings.password.label ? (g(), r("label", $N, b(o.settings.password.label), 1)) : n("", !0),
				i("div", eP, [
					o.settings.password.icon ? (g(), r("span", {
						key: 0,
						class: p(["input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help }])
					}, [i("i", { class: p([o.settings.password.icon]) }, null, 2)], 2)) : n("", !0),
					D(i("input", {
						id: "password",
						name: "password",
						type: o.settings.password.type,
						"onUpdate:modelValue": s[2] ||= (e) => o.password = e,
						class: p(["form-control", { "rounded-bottom-0": o.auth.panel == "registration" && o.settings.password.help }]),
						placeholder: o.settings.password.placeholder,
						pattern: o.settings.password.pattern,
						minlength: o.auth.panel == "registration" ? o.settings.password.minlength : 1,
						required: "",
						disabled: o.loading
					}, null, 10, tP), [[C, o.password]]),
					o.auth.panel == "registration" || o.auth.panel == "password" ? (g(), r("span", {
						key: 1,
						class: p(["input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help }])
					}, [i("small", { class: p(["", {
						"text-success": o.password.length >= o.settings.password.minlength,
						"text-danger": o.password.length < o.settings.password.minlength
					}]) }, b(o.password.length), 3)], 2)) : n("", !0),
					i("span", {
						class: p(["cursor-pointer input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help }]),
						onClick: s[3] ||= O((e) => o.toggleType("password"), ["stop"])
					}, [o.settings.password.type == "password" ? (g(), r("i", nP)) : (g(), r("i", rP))], 2)
				]),
				(o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password.help ? (g(), r("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.settings.password.help
				}, null, 8, iP)) : n("", !0)
			]), o.auth.panel === "registration" || o.auth.panel === "password" ? (g(), r("div", aP, [
				i("label", oP, [a(b(o.settings.password_again.label) + " ", 1), o.password_again.length > 0 && o.password_again != o.password ? (g(), r("small", {
					key: 0,
					class: "text-danger",
					innerHTML: o.settings.password_again.nomatch
				}, null, 8, sP)) : n("", !0)]),
				i("div", cP, [
					o.settings.password.icon ? (g(), r("span", {
						key: 0,
						class: p(["input-group-text", { "rounded-bottom-0": o.settings.password_again.help }])
					}, [i("i", { class: p([o.settings.password_again.icon]) }, null, 2)], 2)) : n("", !0),
					D(i("input", {
						id: "password_again",
						name: "password_again",
						type: o.settings.password_again.type,
						"onUpdate:modelValue": s[4] ||= (e) => o.password_again = e,
						class: p(["form-control", { "rounded-bottom-0": o.settings.password_again.help }]),
						placeholder: o.settings.password_again.placeholder,
						minlength: o.settings.password.minlength,
						required: "",
						disabled: o.loading
					}, null, 10, lP), [[C, o.password_again]]),
					i("span", { class: p(["input-group-text", { "rounded-bottom-0": o.settings.password_again.help }]) }, [i("small", { class: p(["", {
						"text-success": o.password_again.length >= o.settings.password.minlength,
						"text-danger": o.password_again.length < o.settings.password.minlength
					}]) }, b(o.password_again.length), 3)], 2),
					i("span", {
						class: p(["cursor-pointer input-group-text", { "rounded-bottom-0": (o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password_again.help }]),
						onClick: s[5] ||= O((e) => o.toggleType("password_again"), ["stop"])
					}, [o.settings.password_again.type == "password" ? (g(), r("i", uP)) : (g(), r("i", dP))], 2)
				]),
				(o.auth.panel == "registration" || o.auth.panel == "password") && o.settings.password_again.help ? (g(), r("small", {
					key: 0,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.settings.password_again.help
				}, null, 8, fP)) : n("", !0)
			])) : n("", !0)], 64)) : n("", !0),
			o.captchaRequired ? (g(), r("div", pP, [o.captcha.loading ? (g(), r("div", mP, [...s[19] ||= [i("span", { class: "spinner-border spinner-border-sm text-secondary" }, null, -1)]])) : o.captcha.items.length ? (g(), r("div", hP, [i("div", {
				class: "text-center small mb-2",
				innerHTML: o.captcha.question
			}, null, 8, gP), i("div", _P, [(g(!0), r(e, null, v(o.captcha.items, (e) => (g(), r("button", {
				key: e.id,
				type: "button",
				class: p(["btn btn-outline-secondary px-2 py-1", { "btn-primary border-primary": o.captcha.answers.includes(e.id) }]),
				onClick: O((t) => {
					o.toggleCaptchaAnswer(e.id), o.captchaError = !1;
				}, ["stop"])
			}, [i("i", {
				class: p(["bi", e.icon]),
				style: {
					"font-size": "1.2rem",
					display: "block"
				}
			}, null, 2)], 10, vP))), 128))])])) : n("", !0)])) : n("", !0),
			o.captchaError ? (g(), r("p", yP, b(o.settings.captcha.error), 1)) : n("", !0),
			o.auth.panel === "twofa" && o.settings.twofa ? (g(), r("div", bP, [
				i("p", {
					class: "text-center small text-muted mb-3",
					innerHTML: o.settings.twofa.info
				}, null, 8, xP),
				i("label", SP, b(o.settings.twofa.label), 1),
				i("div", CP, [s[20] ||= i("span", { class: "input-group-text" }, [i("i", { class: "bi bi-shield-lock" })], -1), D(i("input", {
					type: "text",
					inputmode: "numeric",
					pattern: "[0-9]{6}",
					maxlength: "6",
					"onUpdate:modelValue": s[6] ||= (e) => o.twofaCode = e,
					class: "form-control text-center fw-bold fs-5",
					placeholder: o.settings.twofa.placeholder,
					required: "",
					disabled: o.loading,
					autocomplete: "one-time-code"
				}, null, 8, wP), [[T, o.twofaCode]])]),
				i("div", TP, [i("button", {
					type: "button",
					class: "btn btn-link btn-sm p-0 text-decoration-none",
					onClick: s[7] ||= O((...e) => o.resendTwofa && o.resendTwofa(...e), ["stop"]),
					disabled: o.loading
				}, [s[21] ||= i("i", { class: "bi bi-arrow-repeat me-1" }, null, -1), a(b(o.settings.submit.resend), 1)], 8, EP)])
			])) : n("", !0),
			D(i("input", {
				type: "text",
				name: "vu_b4t",
				tabindex: "-1",
				autocomplete: "new-password",
				"aria-hidden": "true",
				"onUpdate:modelValue": s[8] ||= (e) => o.honeypot = e,
				style: {
					position: "absolute",
					left: "-9999px",
					width: "1px",
					height: "1px",
					opacity: "0"
				}
			}, null, 512), [[T, o.honeypot]]),
			o.auth.panel == "login" && o.settings.password.forgot ? (g(), r("div", DP, [i("button", {
				type: "button",
				class: "btn btn-link p-0 text-decoration-none text-nowrap",
				onClick: s[9] ||= O((...e) => o.toggleForgotPassword && o.toggleForgotPassword(...e), ["stop"]),
				innerHTML: o.settings.password.forgot
			}, null, 8, OP)])) : n("", !0),
			o.auth.panel == "forgot" && o.settings.help && o.settings.help.forgot ? (g(), r("div", kP, [i("small", {
				class: "text-muted",
				innerHTML: o.settings.help.forgot
			}, null, 8, AP)])) : n("", !0),
			i("div", jP, [(g(!0), r(e, null, v(o.settings.inputs, (t, a) => (g(), r(e, { key: a }, [t.panels.indexOf(o.auth.panel) >= 0 && !t.hidden ? (g(), r("div", {
				key: 0,
				class: p([t.colclass ? t.colclass : "col-md-12"])
			}, [i("div", MP, [
				t.label ? (g(), r("label", {
					key: 0,
					for: a,
					class: p(["form-label text-primary", { required: t.required }]),
					innerHTML: o.getValueOrFunction(t.label)
				}, null, 10, NP)) : n("", !0),
				i("div", PP, [
					t.prefix ? (g(), r("span", {
						key: 0,
						class: p(["input-group-text", { "rounded-bottom-0": t.help }]),
						innerHTML: o.getValueOrFunction(t.prefix)
					}, null, 10, FP)) : n("", !0),
					t.type == "select" ? D((g(), r("select", {
						key: 1,
						class: "form-select",
						disabled: o.loading,
						required: t.required,
						"onUpdate:modelValue": (e) => o.inputs[a] = e,
						multiple: t.multiple
					}, [s[22] ||= i("option", null, null, -1), (g(!0), r(e, null, v(t.options, (e) => (g(), r("option", {
						key: e,
						value: e.value,
						innerHTML: o.getValueOrFunction(e.label)
					}, null, 8, LP))), 128))], 8, IP)), [[w, o.inputs[a]]]) : D((g(), r("input", {
						key: 2,
						id: a,
						name: a,
						type: t.type,
						"onUpdate:modelValue": (e) => o.inputs[a] = e,
						class: p(["form-control", { "rounded-bottom-0": t.help }]),
						placeholder: t.placeholder,
						required: t.required,
						disabled: o.loading
					}, null, 10, RP)), [[C, o.inputs[a]]]),
					t.suffix ? (g(), r("span", {
						key: 3,
						class: p(["input-group-text", { "rounded-bottom-0": t.help }]),
						innerHTML: o.getValueOrFunction(t.suffix)
					}, null, 10, zP)) : n("", !0)
				]),
				t.help ? (g(), r("small", {
					key: 1,
					class: "d-block border border-top-0 rounded-bottom p-2 text-muted",
					innerHTML: o.getValueOrFunction(t.help)
				}, null, 8, BP)) : n("", !0)
			])], 2)) : n("", !0)], 64))), 128))]),
			(g(!0), r(e, null, v(o.settings.accepts, (e) => (g(), r("div", { key: e }, [e.panels.indexOf(o.auth.panel) >= 0 ? (g(), r("div", VP, [D(i("input", {
				type: "checkbox",
				class: "form-check-input",
				id: "accept_" + e.name,
				name: "accept_" + e.name,
				"onUpdate:modelValue": (t) => o.accepts[e.name] = t,
				required: e.required,
				disabled: o.loading
			}, null, 8, HP), [[S, o.accepts[e.name]]]), e.label ? (g(), r("label", {
				key: 0,
				class: "form-check-label",
				for: "accept_" + e.name,
				innerHTML: o.getValueOrFunction(e.label)
			}, null, 8, UP)) : n("", !0)])) : n("", !0)]))), 128)),
			o.auth.panel == "registration" && o.settings.help && o.settings.help.registration ? (g(), r("div", WP, [i("div", { innerHTML: o.getValueOrFunction(o.settings.help.registration) }, null, 8, GP)])) : n("", !0),
			o.auth.response.message ? (g(), r("div", KP, [i("div", {
				class: p({
					"text-danger": !o.auth.response.ok,
					"text-success": o.auth.response.ok
				}),
				innerHTML: o.auth.response.message
			}, null, 10, qP)])) : n("", !0),
			i("div", JP, [
				o.auth.panel != "login" && o.auth.panel != "activation" ? (g(), r("button", {
					key: 0,
					type: "button",
					onClick: s[10] ||= O((...e) => o.toggleClear && o.toggleClear(...e), ["stop"]),
					class: "btn btn-secondary w-100 me-2 text-nowrap",
					disabled: o.loading
				}, [s[23] ||= i("i", { class: "bi bi-arrow-left-square mx-1" }, null, -1), a(" " + b(o.settings.submit.login), 1)], 8, YP)) : n("", !0),
				o.auth.panel == "login" ? (g(), r("button", {
					key: 1,
					type: "button",
					class: "btn btn-warning w-100 me-2 text-nowrap",
					onClick: s[11] ||= O((...e) => o.toggleNewRegistration && o.toggleNewRegistration(...e), ["stop"]),
					disabled: o.loading
				}, [s[24] ||= i("i", { class: "bi bi-person-plus mx-1" }, null, -1), a(" " + b(o.settings.submit.registration), 1)], 8, XP)) : n("", !0),
				i("button", {
					type: "submit",
					class: p(["btn w-100 text-nowrap", {
						"btn-primary": o.auth.panel != "registration",
						"btn-warning": o.auth.panel == "registration"
					}]),
					disabled: o.loading
				}, [a(b(o.settings.submit[o.auth.panel]) + " ", 1), o.auth.panel == "registration" ? (g(), r("i", QP)) : (g(), r("i", $P))], 10, ZP)
			]),
			i("div", eF, [i("button", {
				type: "button",
				onClick: s[12] ||= O((...e) => o.close && o.close(...e), ["stop"]),
				class: "btn btn-light border w-100 me-1",
				disabled: o.loading
			}, [a(b(o.settings.submit.cancel) + " ", 1), s[25] ||= i("i", { class: "bi bi-x-square mx-1" }, null, -1)], 8, tF)])
		], 32)
	])])]), i("div", {
		class: "modal shadow",
		id: o.modalId,
		tabindex: "-1"
	}, [i("div", rF, [i("div", iF, [o.settings.form && o.settings.form.visible && o.settings.form.groups ? (g(), t(f, {
		key: 0,
		modelValue: o.item,
		"onUpdate:modelValue": s[17] ||= (e) => o.item = e,
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
	])) : n("", !0)])])], 8, nF)], 8, HN)) : n("", !0);
}
var oF = /* @__PURE__ */ LT(VN, [["render", aF]]);
//#endregion
//#region src/components/VuUserButton.vue
kc();
var sF = {
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
			return jc(e, t, this.settings, this);
		}
	},
	created() {
		window.VuSettings && window.VuSettings.button && (this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light", window.VuSettings.button[this.panel] && (this.settings = window.VuSettings.button[this.panel]));
	},
	mounted() {}
}, cF = ["data-bs-theme"], lF = {
	key: 0,
	class: "dropdown"
}, uF = ["innerHTML"], dF = {
	class: "dropdown-menu dropdown-menu-end",
	"aria-labelledby": "userDropdown"
}, fF = ["innerHTML"], pF = ["onClick"], mF = ["onClick", "innerHTML"], hF = {
	key: 1,
	class: "d-inline-block"
}, gF = ["innerHTML"];
function _F(t, a, o, s, c, l) {
	return !t.auth.user && t.panel != "login" || t.panel == "login" ? (g(), r("div", {
		key: 0,
		class: "vua-user-button d-inline-block",
		"data-bs-theme": [t.theme]
	}, [t.auth.user ? (g(), r("div", lF, [i("button", {
		class: p(["dropdown-toggle", [t.settings.class]]),
		type: "button",
		id: "userDropdown",
		"data-bs-toggle": "dropdown",
		"aria-expanded": "false"
	}, [i("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, uF)], 2), i("ul", dF, [(g(!0), r(e, null, v(t.settings.dropdowns, (n) => (g(), r(e, { key: n }, [n.action == "BUTTON_ROLES" ? (g(), r("li", {
		key: 0,
		class: p([[n.class], "d-flex items-align-center"])
	}, [i("span", {
		innerHTML: t.getValueOrFunction(n.label),
		class: "me-2"
	}, null, 8, fF), (g(!0), r(e, null, v(t.auth.user.roles, (e) => (g(), r("button", {
		key: e,
		onClick: (n) => t.setSelectedRole(e),
		class: p(["btn btn-sm btn-secondary p-0 px-1 me-1", { "bg-primary text-light": e == t.auth.user.role }])
	}, b(e), 11, pF))), 128))], 2)) : (g(), r("li", {
		key: 1,
		class: p([n.class]),
		onClick: (e) => t.dropdownAction(n),
		innerHTML: t.getValueOrFunction(n.label)
	}, null, 10, mF))], 64))), 128))])])) : (g(), r("div", hF, [i("button", {
		class: p([t.settings.class]),
		type: "button",
		onClick: a[0] ||= (...e) => t.togglePanel && t.togglePanel(...e)
	}, [t.settings.icon ? (g(), r("i", {
		key: 0,
		class: p([t.settings.icon])
	}, null, 2)) : n("", !0), i("span", { innerHTML: t.getValueOrFunction(t.settings.label) }, null, 8, gF)], 2)]))], 8, cF)) : n("", !0);
}
var vF = /* @__PURE__ */ LT(sF, [["render", _F]]);
//#endregion
export { zN as VuAdmin, oF as VuAuth, vF as VuUserButton };
