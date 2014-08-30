(function(a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cv(a) {
        if (!ck[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
            }
            ck[a] = e
        }
        return ck[a]
    }

    function cu(a, b) {
        var c = {};
        f.each(cq.concat.apply([], cq.slice(0, b)), function() {
            c[this] = a
        });
        return c
    }

    function ct() {
        cr = b
    }

    function cs() {
        setTimeout(ct, 0);
        return cr = f.now()
    }

    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function ci() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {},
            g, h, i = d.length,
            j, k = d[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function cb(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        } if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function(b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
        });
        else if (!c && b != null && typeof b == "object")
            for (var e in b) ca(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }

    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bT,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
        return l
    }

    function bZ(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP),
                    e = 0,
                    g = d.length,
                    h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? bx : by,
            g = 0,
            h = e.length;
        if (d > 0) {
            if (c !== "border")
                for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px"
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c)
            for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px"
    }

    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
            if (c === "object") b.outerHTML = a.outerHTML;
            else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected;
                else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(f.expando)
        }
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a),
                h = f._data(b, g),
                i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)
                    for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function(a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function(a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function(a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {},
            c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function() {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(J, 1);
                        return
                    }
                    e.ready()
                }
            }
            var e = function(a, b) {
                    return new e.fn.init(a, b, h)
                },
                f = a.jQuery,
                g = a.$,
                h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function(a, b) {
                    return (b + "").toUpperCase()
                },
                y = d.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            e.fn = e.prototype = {
                constructor: e,
                init: function(a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) {
                        this.context = this[0] = a, this.length = 1;
                        return this
                    }
                    if (a === "body" && !d && c.body) {
                        this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                        return this
                    }
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                        if (g && (g[1] || !d)) {
                            if (g[1]) {
                                d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                return e.merge(this, a)
                            }
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            this.context = c, this.selector = a;
                            return this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    if (e.isFunction(a)) return f.ready(a);
                    a.selector !== b && (this.selector = a.selector, this.context = a.context);
                    return e.makeArray(a, this)
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return F.call(this, 0)
                },
                get: function(a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function(a, b, c) {
                    var d = this.constructor();
                    e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                    return d
                },
                each: function(a, b) {
                    return e.each(this, a, b)
                },
                ready: function(a) {
                    e.bindReady(), A.add(a);
                    return this
                },
                eq: function(a) {
                    a = +a;
                    return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function(a) {
                    return this.pushStack(e.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
                var a, c, d, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++)
                    if ((a = arguments[j]) != null)
                        for (c in a) {
                            d = i[c], f = a[c];
                            if (i === f) continue;
                            l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                        }
                    return i
            }, e.extend({
                noConflict: function(b) {
                    a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                    return e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function(a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        e.isReady = !0;
                        if (a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function() {
                    if (!A) {
                        A = e.Callbacks("once memory");
                        if (c.readyState === "complete") return setTimeout(e.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (d) {}
                            c.documentElement.doScroll && b && J()
                        }
                    }
                },
                isFunction: function(a) {
                    return e.type(a) === "function"
                },
                isArray: Array.isArray || function(a) {
                    return e.type(a) === "array"
                },
                isWindow: function(a) {
                    return a && typeof a == "object" && "setInterval" in a
                },
                isNumeric: function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function(a) {
                    return a == null ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function(a) {
                    if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function(a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function(a) {
                    throw new Error(a)
                },
                parseJSON: function(b) {
                    if (typeof b != "string" || !b) return null;
                    b = e.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    e.error("Invalid JSON: " + b)
                },
                parseXML: function(c) {
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch (g) {
                        d = b
                    }(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                    return d
                },
                noop: function() {},
                globalEval: function(b) {
                    b && j.test(b) && (a.execScript || function(b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function(a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function(a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d) {
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], d) === !1) break
                        } else
                            for (; g < h;)
                                if (c.apply(a[g++], d) === !1) break
                    } else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    } else
                        for (; g < h;)
                            if (c.call(a[g], g, a[g++]) === !1) break; return a
                },
                trim: G ? function(a) {
                    return a == null ? "" : G.call(a)
                } : function(a) {
                    return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                },
                makeArray: function(a, b) {
                    var c = b || [];
                    if (a != null) {
                        var d = e.type(a);
                        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function(a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number")
                        for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else
                        while (c[e] !== b) a[d++] = c[e++];
                    a.length = d;
                    return a
                },
                grep: function(a, b, c) {
                    var d = [],
                        e;
                    c = !!c;
                    for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function(a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                    if (k)
                        for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
                    else
                        for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function(a, c) {
                    if (typeof c == "string") {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function() {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    g.guid = a.guid = a.guid || g.guid || e.guid++;
                    return g
                },
                access: function(a, c, d, f, g, h) {
                    var i = a.length;
                    if (typeof c == "object") {
                        for (var j in c) e.access(a, j, c[j], f, g, d);
                        return a
                    }
                    if (d !== b) {
                        f = !h && f && e.isFunction(d);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function() {
                    return (new Date).getTime()
                },
                uaMatch: function(a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function() {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
                        f && f instanceof e && !(f instanceof a) && (f = a(f));
                        return e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test("?") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function() {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
            });
            return e
        }(),
        g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var c = [],
            d = [],
            e, i, j, k, l, m = function(b) {
                var d, e, g, h, i;
                for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
            },
            n = function(b, f) {
                f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
                for (; c && l < k; l++)
                    if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
            },
            o = {
                add: function() {
                    if (c) {
                        var a = c.length;
                        m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                    }
                    return this
                },
                remove: function() {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++)
                            for (var f = 0; f < c.length; f++)
                                if (b[d] === c[f]) {
                                    i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                                    if (a.unique) break
                                }
                    }
                    return this
                },
                has: function(a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++)
                            if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function() {
                    c = [];
                    return this
                },
                disable: function() {
                    c = d = e = b;
                    return this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    d = b, (!e || e === !0) && o.disable();
                    return this
                },
                locked: function() {
                    return !d
                },
                fireWith: function(b, c) {
                    d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                    return this
                },
                fire: function() {
                    o.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!e
                }
            };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                },
                h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function() {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function(a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    },
                    always: function() {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    },
                    pipe: function(a, b, c) {
                        return f.Deferred(function(d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function(a, b) {
                                var c = b[0],
                                    e = b[1],
                                    g;
                                f.isFunction(c) ? i[a](function() {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function(a) {
                        if (a == null) a = h;
                        else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                },
                i = h.promise({}),
                j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function() {
                e = "resolved"
            }, c.disable, d.lock).fail(function() {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        },
        when: function(a) {
            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = Array(d),
                g = d,
                h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function() {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
            r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent)
            for (o in {
                submit: 1,
                change: 1,
                focusin: 1
            }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        k.removeChild(q), k = g = h = j = q = i = null, f(function() {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            !r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function(a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando,
                    k = typeof c == "string",
                    l = a.nodeType,
                    m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j,
                    o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function(a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando,
                    i = a.nodeType,
                    j = i ? f.cache : a,
                    k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function(a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            if (typeof a == "object") return this.each(function() {
                f.data(this, a)
            });
            d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
            if (c === b) {
                h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
                return h === b && d[1] ? this.data(d[0]) : h
            }
            return this.each(function() {
                var b = f(this),
                    e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function(a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function(a, c) {
            typeof a != "string" && (c = a, a = "fx");
            if (c === b) return f.queue(this[0], a);
            return this.each(function() {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(),
                e = this,
                g = e.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise()
        }
    });
    var o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute,
        w, x, y;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, a, b, !0, f.attr)
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return f.access(this, a, b, !0, f.prop)
        },
        removeProp: function(a) {
            a = f.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1) e.className = a;
                        else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function(c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function() {
                if (c === "string") {
                    var e, g = 0,
                        h = f(this),
                        i = b,
                        j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, g = this[0]; {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function(d) {
                        var g = f(this),
                            h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                },
                set: function(a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /\bhover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function(a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        },
        H = function(a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        },
        I = function(a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
            add: function(a, c, d, e, g) {
                var h, i, j, k, l, m, n, o, p, q, r, s;
                if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                    d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
                        return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                    }, i.elem = a), c = f.trim(I(c)).split(" ");
                    for (k = 0; k < c.length; k++) {
                        l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                            type: m,
                            origType: l[1],
                            data: e,
                            handler: d,
                            guid: d.guid,
                            selector: g,
                            quick: G(g),
                            namespace: n.join(".")
                        }, p), r = j[m];
                        if (!r) {
                            r = j[m] = [], r.delegateCount = 0;
                            if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                        }
                        s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                    }
                    a = null
                }
            },
            global: {},
            remove: function(a, b, c, d, e) {
                var g = f.hasData(a) && f._data(a),
                    h, i, j, k, l, m, n, o, p, q, r, s;
                if (!!g && !!(o = g.events)) {
                    b = f.trim(I(b || "")).split(" ");
                    for (h = 0; h < b.length; h++) {
                        i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                        if (!j) {
                            for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                            continue
                        }
                        p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                        for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                        r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                    }
                    f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(c, d, e, g) {
                if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                    var h = c.type || c,
                        i = [],
                        j, k, l, m, n, o, p, q, r, s;
                    if (E.test(h + f.event.triggered)) return;
                    h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                    if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                    c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                    if (!e) {
                        j = f.cache;
                        for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                        return
                    }
                    c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                    if (p.trigger && p.trigger.apply(e, d) === !1) return;
                    r = [
                        [e, p.bindType || h]
                    ];
                    if (!g && !p.noBubble && !f.isWindow(e)) {
                        s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                        for (; m; m = m.parentNode) r.push([m, s]), n = m;
                        n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                    }
                    for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                    c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                    return c.result
                }
            },
            dispatch: function(c) {
                c = f.event.fix(c || a.event);
                var d = (f._data(this, "events") || {})[c.type] || [],
                    e = d.delegateCount,
                    g = [].slice.call(arguments, 0),
                    h = !c.exclusive && !c.namespace,
                    i = [],
                    j, k, l, m, n, o, p, q, r, s, t;
                g[0] = c, c.delegateTarget = this;
                if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                    m = f(this), m.context = this.ownerDocument || this;
                    for (l = c.target; l != this; l = l.parentNode || this) {
                        o = {}, q = [], m[0] = l;
                        for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                        q.length && i.push({
                            elem: l,
                            matches: q
                        })
                    }
                }
                d.length > e && i.push({
                    elem: this,
                    matches: d.slice(e)
                });
                for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                    p = i[j], c.currentTarget = p.elem;
                    for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                        r = p.matches[k];
                        if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
                return c.result
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(a, b) {
                    a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                    return a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(a, d) {
                    var e, f, g, h = d.button,
                        i = d.fromElement;
                    a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                    return a
                }
            },
            fix: function(a) {
                if (a[f.expando]) return a;
                var d, e, g = a,
                    h = f.event.fixHooks[a.type] || {},
                    i = h.props ? this.props.concat(h.props) : this.props;
                a = f.Event(g);
                for (d = i.length; d;) e = i[--d], a[e] = g[e];
                a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
                return h.filter ? h.filter(a, g) : a
            },
            special: {
                ready: {
                    setup: f.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(a, b, c) {
                        f.isWindow(this) && (this.onbeforeunload = c)
                    },
                    teardown: function(a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function(a, b, c, d) {
                var e = f.extend(new f.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function(a, b, c) {
            a.detachEvent && a.detachEvent("on" + b, c)
        }, f.Event = function(a, b) {
            if (!(this instanceof f.Event)) return new f.Event(a, b);
            a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
        }, f.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = K;
                var a = this.originalEvent;
                !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = K;
                var a = this.originalEvent;
                !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = K, this.stopPropagation()
            },
            isDefaultPrevented: J,
            isPropagationStopped: J,
            isImmediatePropagationStopped: J
        }, f.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(a, b) {
            f.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function(a) {
                    var c = this,
                        d = a.relatedTarget,
                        e = a.handleObj,
                        g = e.selector,
                        h;
                    if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                    return h
                }
            }
        }), f.support.submitBubbles || (f.event.special.submit = {
            setup: function() {
                if (f.nodeName(this, "form")) return !1;
                f.event.add(this, "click._submit keypress._submit", function(a) {
                    var c = a.target,
                        d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                    d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                        this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                    }), d._submit_attached = !0)
                })
            },
            teardown: function() {
                if (f.nodeName(this, "form")) return !1;
                f.event.remove(this, "._submit")
            }
        }), f.support.changeBubbles || (f.event.special.change = {
            setup: function() {
                if (z.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }), f.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                    });
                    return !1
                }
                f.event.add(this, "beforeactivate._change", function(a) {
                    var b = a.target;
                    z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                    }), b._change_attached = !0)
                })
            },
            handle: function(a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                f.event.remove(this, "._change");
                return z.test(this.nodeName)
            }
        }), f.support.focusinBubbles || f.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            var d = 0,
                e = function(a) {
                    f.event.simulate(b, a.target, f.event.fix(a), !0)
                };
            f.event.special[b] = {
                setup: function() {
                    d++ === 0 && c.addEventListener(a, e, !0)
                },
                teardown: function() {
                    --d === 0 && c.removeEventListener(a, e, !0)
                }
            }
        }), f.fn.extend({
            on: function(a, c, d, e, g) {
                var h, i;
                if (typeof a == "object") {
                    typeof c != "string" && (d = c, c = b);
                    for (i in a) this.on(i, c, d, a[i], g);
                    return this
                }
                d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
                if (e === !1) e = J;
                else if (!e) return this;
                g === 1 && (h = e, e = function(a) {
                    f().off(a);
                    return h.apply(this, arguments)
                }, e.guid = h.guid || (h.guid = f.guid++));
                return this.each(function() {
                    f.event.add(this, a, e, d, c)
                })
            },
            one: function(a, b, c, d) {
                return this.on.call(this, a, b, c, d, 1)
            },
            off: function(a, c, d) {
                if (a && a.preventDefault && a.handleObj) {
                    var e = a.handleObj;
                    f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                    return this
                }
                if (typeof a == "object") {
                    for (var g in a) this.off(g, c, a[g]);
                    return this
                }
                if (c === !1 || typeof c == "function") d = c, c = b;
                d === !1 && (d = J);
                return this.each(function() {
                    f.event.remove(this, a, d, c)
                })
            },
            bind: function(a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function(a, b) {
                return this.off(a, null, b)
            },
            live: function(a, b, c) {
                f(this.context).on(a, this.selector, b, c);
                return this
            },
            die: function(a, b) {
                f(this.context).off(a, this.selector || "**", b);
                return this
            },
            delegate: function(a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function(a, b, c) {
                return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
            },
            trigger: function(a, b) {
                return this.each(function() {
                    f.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                if (this[0]) return f.event.trigger(a, b, this[0], !0)
            },
            toggle: function(a) {
                var b = arguments,
                    c = a.guid || f.guid++,
                    d = 0,
                    e = function(c) {
                        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                        f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                        return b[e].apply(this, arguments) || !1
                    };
                e.guid = c;
                while (d < b.length) b[d++].guid = c;
                return this.click(e)
            },
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
            f.fn[b] = function(a, c) {
                c == null && (c = a, a = null);
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
        }),
        function() {
            function x(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; h < i; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        j = j[a];
                        while (j) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            if (j.nodeType === 1) {
                                g || (j[d] = c, j.sizset = h);
                                if (typeof b != "string") {
                                    if (j === b) {
                                        k = !0;
                                        break
                                    }
                                } else if (m.filter(b, [j]).length > 0) {
                                    k = j;
                                    break
                                }
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }

            function w(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; h < i; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        j = j[a];
                        while (j) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                            if (j.nodeName.toLowerCase() === b) {
                                k = j;
                                break
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }
            var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                d = "sizcache" + (Math.random() + "").replace(".", ""),
                e = 0,
                g = Object.prototype.toString,
                h = !1,
                i = !0,
                j = /\\/g,
                k = /\r\n/g,
                l = /\W/;
            [0, 0].sort(function() {
                i = !1;
                return 0
            });
            var m = function(b, d, e, f) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b != "string") return e;
                var i, j, k, l, n, q, r, t, u = !0,
                    v = m.isXML(d),
                    w = [],
                    x = b;
                do {
                    a.exec(""), i = a.exec(x);
                    if (i) {
                        x = i[3], w.push(i[1]);
                        if (i[2]) {
                            l = i[3];
                            break
                        }
                    }
                } while (i);
                if (w.length > 1 && p.exec(b))
                    if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                    else {
                        j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                        while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                    } else {
                    !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                    if (d) {
                        n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                        while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    } else k = w = []
                }
                k || (k = j), k || m.error(q || b);
                if (g.call(k) === "[object Array]")
                    if (!u) e.push.apply(e, k);
                    else if (d && d.nodeType === 1)
                    for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
                else
                    for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
                else s(k, e);
                l && (m(l, h, e, f), m.uniqueSort(e));
                return e
            };
            m.uniqueSort = function(a) {
                if (u) {
                    h = i, a.sort(u);
                    if (h)
                        for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
                }
                return a
            }, m.matches = function(a, b) {
                return m(a, null, null, b)
            }, m.matchesSelector = function(a, b) {
                return m(b, null, null, [a]).length > 0
            }, m.find = function(a, b, c) {
                var d, e, f, g, h, i;
                if (!a) return [];
                for (e = 0, f = o.order.length; e < f; e++) {
                    h = o.order[e];
                    if (g = o.leftMatch[h].exec(a)) {
                        i = g[1], g.splice(1, 1);
                        if (i.substr(i.length - 1) !== "\\") {
                            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                            if (d != null) {
                                a = a.replace(o.match[h], "");
                                break
                            }
                        }
                    }
                }
                d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
                return {
                    set: d,
                    expr: a
                }
            }, m.filter = function(a, c, d, e) {
                var f, g, h, i, j, k, l, n, p, q = a,
                    r = [],
                    s = c,
                    t = c && c[0] && m.isXML(c[0]);
                while (a && c.length) {
                    for (h in o.filter)
                        if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                            k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                            if (l.substr(l.length - 1) === "\\") continue;
                            s === r && (r = []);
                            if (o.preFilter[h]) {
                                f = o.preFilter[h](f, s, d, r, e, t);
                                if (!f) g = i = !0;
                                else if (f === !0) continue
                            }
                            if (f)
                                for (n = 0;
                                    (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                            if (i !== b) {
                                d || (s = r), a = a.replace(o.match[h], "");
                                if (!g) return [];
                                break
                            }
                        }
                    if (a === q)
                        if (g == null) m.error(a);
                        else break;
                    q = a
                }
                return s
            }, m.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            };
            var n = m.getText = function(a) {
                    var b, c, d = a.nodeType,
                        e = "";
                    if (d) {
                        if (d === 1 || d === 9) {
                            if (typeof a.textContent == "string") return a.textContent;
                            if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                            for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                        } else if (d === 3 || d === 4) return a.nodeValue
                    } else
                        for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
                    return e
                },
                o = m.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function(a) {
                            return a.getAttribute("href")
                        },
                        type: function(a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function(a, b) {
                            var c = typeof b == "string",
                                d = c && !l.test(b),
                                e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++)
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h.nodeType !== 1);
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            e && m.filter(b, a, !0)
                        },
                        ">": function(a, b) {
                            var c, d = typeof b == "string",
                                e = 0,
                                f = a.length;
                            if (d && !l.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && m.filter(b, a, !0)
                            }
                        },
                        "": function(a, b, c) {
                            var d, f = e++,
                                g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                        },
                        "~": function(a, b, c) {
                            var d, f = e++,
                                g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function(a, b, c) {
                            if (typeof b.getElementById != "undefined" && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function(a, b) {
                            if (typeof b.getElementsByName != "undefined") {
                                var c = [],
                                    d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function(a, b) {
                            if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                        }
                    },
                    preFilter: {
                        CLASS: function(a, b, c, d, e, f) {
                            a = " " + a[1].replace(j, "") + " ";
                            if (f) return a;
                            for (var g = 0, h;
                                (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                            return !1
                        },
                        ID: function(a) {
                            return a[1].replace(j, "")
                        },
                        TAG: function(a, b) {
                            return a[1].replace(j, "").toLowerCase()
                        },
                        CHILD: function(a) {
                            if (a[1] === "nth") {
                                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                            } else a[2] && m.error(a[0]);
                            a[0] = e++;
                            return a
                        },
                        ATTR: function(a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(j, "");
                            !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                            return a
                        },
                        PSEUDO: function(b, c, d, e, f) {
                            if (b[1] === "not")
                                if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
                                else {
                                    var g = m.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                            return b
                        },
                        POS: function(a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function(a) {
                            return a.disabled === !1 && a.type !== "hidden"
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            return a.checked === !0
                        },
                        selected: function(a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function(a) {
                            return !!a.firstChild
                        },
                        empty: function(a) {
                            return !a.firstChild
                        },
                        has: function(a, b, c) {
                            return !!m(c[3], a).length
                        },
                        header: function(a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function(a) {
                            var b = a.getAttribute("type"),
                                c = a.type;
                            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                        },
                        radio: function(a) {
                            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                        },
                        checkbox: function(a) {
                            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                        },
                        file: function(a) {
                            return a.nodeName.toLowerCase() === "input" && "file" === a.type
                        },
                        password: function(a) {
                            return a.nodeName.toLowerCase() === "input" && "password" === a.type
                        },
                        submit: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "submit" === a.type
                        },
                        image: function(a) {
                            return a.nodeName.toLowerCase() === "input" && "image" === a.type
                        },
                        reset: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "reset" === a.type
                        },
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && "button" === a.type || b === "button"
                        },
                        input: function(a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        focus: function(a) {
                            return a === a.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function(a, b) {
                            return b === 0
                        },
                        last: function(a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function(a, b) {
                            return b % 2 === 0
                        },
                        odd: function(a, b) {
                            return b % 2 === 1
                        },
                        lt: function(a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function(a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function(a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function(a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function(a, b, c, d) {
                            var e = b[1],
                                f = o.filters[e];
                            if (f) return f(a, c, b, d);
                            if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++)
                                    if (g[h] === a) return !1;
                                return !0
                            }
                            m.error(e)
                        },
                        CHILD: function(a, b) {
                            var c, e, f, g, h, i, j, k = b[1],
                                l = a;
                            switch (k) {
                                case "only":
                                case "first":
                                    while (l = l.previousSibling)
                                        if (l.nodeType === 1) return !1;
                                    if (k === "first") return !0;
                                    l = a;
                                case "last":
                                    while (l = l.nextSibling)
                                        if (l.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    c = b[2], e = b[3];
                                    if (c === 1 && e === 0) return !0;
                                    f = b[0], g = a.parentNode;
                                    if (g && (g[d] !== f || !a.nodeIndex)) {
                                        i = 0;
                                        for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                        g[d] = f
                                    }
                                    j = a.nodeIndex - e;
                                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                            }
                        },
                        ID: function(a, b) {
                            return a.nodeType === 1 && a.getAttribute("id") === b
                        },
                        TAG: function(a, b) {
                            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                        },
                        CLASS: function(a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function(a, b) {
                            var c = b[1],
                                d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                                e = d + "",
                                f = b[2],
                                g = b[4];
                            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function(a, b, c, d) {
                            var e = b[2],
                                f = o.setFilters[e];
                            if (f) return f(a, c, b, d)
                        }
                    }
                },
                p = o.match.POS,
                q = function(a, b) {
                    return "\\" + (b - 0 + 1)
                };
            for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
            var s = function(a, b) {
                a = Array.prototype.slice.call(a, 0);
                if (b) {
                    b.push.apply(b, a);
                    return b
                }
                return a
            };
            try {
                Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
            } catch (t) {
                s = function(a, b) {
                    var c = 0,
                        d = b || [];
                    if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                    else if (typeof a.length == "number")
                        for (var e = a.length; c < e; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
            }
            var u, v;
            c.documentElement.compareDocumentPosition ? u = function(a, b) {
                    if (a === b) {
                        h = !0;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                } : (u = function(a, b) {
                    if (a === b) {
                        h = !0;
                        return 0
                    }
                    if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                    var c, d, e = [],
                        f = [],
                        g = a.parentNode,
                        i = b.parentNode,
                        j = g;
                    if (g === i) return v(a, b);
                    if (!g) return -1;
                    if (!i) return 1;
                    while (j) e.unshift(j), j = j.parentNode;
                    j = i;
                    while (j) f.unshift(j), j = j.parentNode;
                    c = e.length, d = f.length;
                    for (var k = 0; k < c && k < d; k++)
                        if (e[k] !== f[k]) return v(e[k], f[k]);
                    return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
                }, v = function(a, b, c) {
                    if (a === b) return c;
                    var d = a.nextSibling;
                    while (d) {
                        if (d === b) return -1;
                        d = d.nextSibling
                    }
                    return 1
                }),
                function() {
                    var a = c.createElement("div"),
                        d = "script" + (new Date).getTime(),
                        e = c.documentElement;
                    a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
                        if (typeof c.getElementById != "undefined" && !d) {
                            var e = c.getElementById(a[1]);
                            return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                        }
                    }, o.filter.ID = function(a, b) {
                        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                        return a.nodeType === 1 && c && c.nodeValue === b
                    }), e.removeChild(a), e = a = null
                }(),
                function() {
                    var a = c.createElement("div");
                    a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                        var c = b.getElementsByTagName(a[1]);
                        if (a[1] === "*") {
                            var d = [];
                            for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                            c = d
                        }
                        return c
                    }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
                        return a.getAttribute("href", 2)
                    }), a = null
                }(), c.querySelectorAll && function() {
                    var a = m,
                        b = c.createElement("div"),
                        d = "__sizzle__";
                    b.innerHTML = "<p class='TEST'></p>";
                    if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                        m = function(b, e, f, g) {
                            e = e || c;
                            if (!g && !m.isXML(e)) {
                                var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                                    if (h[1]) return s(e.getElementsByTagName(b), f);
                                    if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                                }
                                if (e.nodeType === 9) {
                                    if (b === "body" && e.body) return s([e.body], f);
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode) return s([], f);
                                        if (i.id === h[3]) return s([i], f)
                                    }
                                    try {
                                        return s(e.querySelectorAll(b), f)
                                    } catch (j) {}
                                } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                    var k = e,
                                        l = e.getAttribute("id"),
                                        n = l || d,
                                        p = e.parentNode,
                                        q = /^\s*[+~]/.test(b);
                                    l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                                    try {
                                        if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                    } catch (r) {} finally {
                                        l || k.removeAttribute("id")
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        };
                        for (var e in a) m[e] = a[e];
                        b = null
                    }
                }(),
                function() {
                    var a = c.documentElement,
                        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                    if (b) {
                        var d = !b.call(c.createElement("div"), "div"),
                            e = !1;
                        try {
                            b.call(c.documentElement, "[test!='']:sizzle")
                        } catch (f) {
                            e = !0
                        }
                        m.matchesSelector = function(a, c) {
                            c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                            if (!m.isXML(a)) try {
                                if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                    var f = b.call(a, c);
                                    if (f || !d || a.document && a.document.nodeType !== 11) return f
                                }
                            } catch (g) {}
                            return m(c, null, null, [a]).length > 0
                        }
                    }
                }(),
                function() {
                    var a = c.createElement("div");
                    a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                    if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                        a.lastChild.className = "e";
                        if (a.getElementsByClassName("e").length === 1) return;
                        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
                            if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                        }, a = null
                    }
                }(), c.documentElement.contains ? m.contains = function(a, b) {
                    return a !== b && (a.contains ? a.contains(b) : !0)
                } : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
                    return !!(a.compareDocumentPosition(b) & 16)
                } : m.contains = function() {
                    return !1
                }, m.isXML = function(a) {
                    var b = (a ? a.ownerDocument || a : 0).documentElement;
                    return b ? b.nodeName !== "HTML" : !1
                };
            var y = function(a, b, c) {
                var d, e = [],
                    f = "",
                    g = b.nodeType ? [b] : b;
                while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
                a = o.relative[a] ? a + "*" : a;
                for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
                return m.filter(f, e)
            };
            m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
        }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.POS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function(a) {
            var b = this,
                c, d;
            if (typeof a != "string") return f(a).filter(function() {
                for (c = 0, d = b.length; c < d; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var c = [],
                d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function(a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function(a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return f.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return f.sibling(a.firstChild)
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function(a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function(a, c, d) {
            var e = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ba = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")", "i"),
        bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
        be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
        bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()))
            });
            if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return f.text(this)
        },
        wrapAll: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function() {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        },
        remove: function(a, b) {
            for (var c = 0, d;
                (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var a = 0, b;
                (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function(a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function() {
                return f.clone(this, a, b)
            })
        },
        html: function(a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function(b) {
                    var c = f(this),
                        d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function() {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function(e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, bp)
            }
            return this
        }
    }), f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = [],
                e = f(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        },
        clean: function(a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [],
                i;
            for (var j = 0, k;
                (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string")
                    if (!_.test(k)) k = b.createTextNode(k);
                    else {
                        k = k.replace(Y, "<$1></$2>");
                        var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
                            m = bg[l] || bg._default,
                            n = m[0],
                            o = b.createElement("div");
                        b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                        while (n--) o = o.lastChild;
                        if (!f.support.tbody) {
                            var p = $.test(k),
                                q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                            for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                        }!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                    }
                var r;
                if (!f.support.appendChecked)
                    if (k[0] && typeof(r = k.length) == "number")
                        for (i = 0; i < r; i++) bn(k[i]);
                    else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function(a) {
                    return !a.type || be.test(a.type)
                };
                for (j = 0; h[j]; j++)
                    if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
                    else {
                        if (h[j].nodeType === 1) {
                            var s = f.grep(h[j].getElementsByTagName("script"), g);
                            h.splice.apply(h, [j + 1, 0].concat(s))
                        }
                        d.appendChild(h[j])
                    }
            }
            return h
        },
        cleanData: function(a) {
            var b, c, d = f.cache,
                e = f.event.special,
                g = f.support.deleteExpando;
            for (var h = 0, i;
                (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i,
        br = /opacity=([^)]*)/,
        bs = /([A-Z]|^ms)/g,
        bt = /^-?\d+(?:px)?$/i,
        bu = /^-?\d/,
        bv = /^([\-+])=([\-+.\de]+)/,
        bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bx = ["Left", "Right"],
        by = ["Top", "Bottom"],
        bz, bA, bB;
    f.fn.css = function(a, c) {
        if (arguments.length === 2 && c === b) return this;
        return f.access(this, a, c, !0, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c),
                    j = a.style,
                    k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {}
            }
        },
        css: function(a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c)
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                var e;
                if (c) {
                    if (a.offsetWidth !== 0) return bC(a, b, d);
                    f.swap(a, bw, function() {
                        e = bC(a, b, d)
                    });
                    return e
                }
            },
            set: function(a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
        }
    }), f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                f.swap(a, {
                    display: "inline-block"
                }, function() {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                });
                return c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
        var c, d, e;
        b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
        return c
    }), c.documentElement.currentStyle && (bB = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a)
    });
    var bD = /%20/g,
        bE = /\[\]$/,
        bF = /\r?\n/g,
        bG = /#.*$/,
        bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        bK = /^(?:GET|HEAD)$/,
        bL = /^\/\//,
        bM = /\?/,
        bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bO = /^(?:select|textarea)/i,
        bP = /\s+/,
        bQ = /([?&])_=[^&]*/,
        bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        bS = f.fn.load,
        bT = {},
        bU = {},
        bV, bW, bX = ["*/"] + ["*"];
    try {
        bV = e.href
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function(a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        },
        serialize: function() {
            return f.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
            }).map(function(a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bF, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bF, "\r\n")
                }
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function(a, c) {
        f[c] = function(a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
            return a
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c,
                        x = l ? cb(d, v, l) : b,
                        y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0;
                        else try {
                            r = cc(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {},
                k, l = {},
                m = {},
                n, o, p, q, r, s = 0,
                t, u, v = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return s === 2 ? n : null
                    },
                    getResponseHeader: function(a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function(a) {
                        s || (d.mimeType = a);
                        return this
                    },
                    abort: function(a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a) j[b] = [j[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(),
                        y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {
                success: 1,
                error: 1,
                complete: 1
            }) v[u](d[u]);
            p = b$(bU, d, c, v);
            if (!p) w(-1, "No Transport");
            else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z);
                    else throw z
                }
            }
            return v
        },
        param: function(a, c) {
            var d = [],
                e = function(a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cd = f.now(),
        ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + cd++
        }
    }), f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
                g = [a]
            }, d.always(function() {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function() {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var cf = a.ActiveXObject ? function() {
            for (var a in ch) ch[a](0, 1)
        } : !1,
        cg = 0,
        ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
            return !this.isLocal && ci() || cj()
        } : ci,
        function(a) {
            f.extend(f.support, {
                ajax: !!a,
                cors: !!a && "withCredentials" in a
            })
        }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
            if (!c.crossDomain || f.support.cors) {
                var d;
                return {
                    send: function(e, g) {
                        var h = c.xhr(),
                            i, j;
                        c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                        if (c.xhrFields)
                            for (j in c.xhrFields) h[j] = c.xhrFields[j];
                        c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (j in e) h.setRequestHeader(j, e[j])
                        } catch (k) {}
                        h.send(c.hasContent && c.data || null), d = function(a, e) {
                            var j, k, l, m, n;
                            try {
                                if (d && (e || h.readyState === 4)) {
                                    d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                    if (e) h.readyState !== 4 && h.abort();
                                    else {
                                        j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                        try {
                                            k = h.statusText
                                        } catch (o) {
                                            k = ""
                                        }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                    }
                                }
                            } catch (p) {
                                e || g(-1, p)
                            }
                            m && g(j, k, m, l)
                        }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
                    },
                    abort: function() {
                        d && d(0, 1)
                    }
                }
            }
        });
    var ck = {},
        cl, cm, cn = /^(?:toggle|show|hide)$/,
        co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        cp, cq = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        cr;
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(cu("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e),
                    c = this.nodeType === 1,
                    d = c && f(this).is(":hidden"),
                    g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        },
        stop: function(a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function(a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b, c, d, e = cr || cs(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function() {
            var a, b = f.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(cp), cp = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function(a, b) {
        f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem
        }).length
    });
    var cw = /^t(?:able|d|h)$/i,
        cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
        var b = this[0],
            c;
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (d) {}
        var e = b.ownerDocument,
            g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body,
            i = cy(e),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : f.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent,
            e = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {
            top: l,
            left: m
        }
    }, f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                k = {},
                l = {},
                m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = cx.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each(["Left", "Top"], function(a, c) {
        var d = "scroll" + c;
        f.fn[d] = function(c) {
            var e, g;
            if (c === b) {
                e = this[0];
                if (!e) return null;
                g = cy(e);
                return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
            }
            return this.each(function() {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function(a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function(a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c],
                    h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d),
                    j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return f
    })
})(window);

(function(a) {
    var b = "0.4.0",
        c = "hasOwnProperty",
        d = /[\.\/]/,
        e = "*",
        f = function() {},
        g = function(a, b) {
            return a - b
        },
        h, i, j = {
            n: {}
        },
        k = function(a, b) {
            var c = j,
                d = i,
                e = Array.prototype.slice.call(arguments, 2),
                f = k.listeners(a),
                l = 0,
                m = !1,
                n, o = [],
                p = {},
                q = [],
                r = [];
            h = a, i = 0;
            for (var s = 0, t = f.length; s < t; s++) "zIndex" in f[s] && (o.push(f[s].zIndex), f[s].zIndex < 0 && (p[f[s].zIndex] = f[s]));
            o.sort(g);
            while (o[l] < 0) {
                n = p[o[l++]], q.push(n.apply(b, e));
                if (i) {
                    i = d;
                    return q
                }
            }
            for (s = 0; s < t; s++) {
                n = f[s];
                if ("zIndex" in n)
                    if (n.zIndex == o[l]) {
                        q.push(n.apply(b, e));
                        if (i) {
                            i = d;
                            return q
                        }
                        do {
                            l++, n = p[o[l]], n && q.push(n.apply(b, e));
                            if (i) {
                                i = d;
                                return q
                            }
                        } while (n)
                    } else p[n.zIndex] = n;
                else {
                    q.push(n.apply(b, e));
                    if (i) {
                        i = d;
                        return q
                    }
                }
            }
            i = d;
            return q.length ? q : null
        };
    k.listeners = function(a) {
        var b = a.split(d),
            c = j,
            f, g, h, i, k, l, m, n, o = [c],
            p = [];
        for (i = 0, k = b.length; i < k; i++) {
            n = [];
            for (l = 0, m = o.length; l < m; l++) {
                c = o[l].n, g = [c[b[i]], c[e]], h = 2;
                while (h--) f = g[h], f && (n.push(f), p = p.concat(f.f || []))
            }
            o = n
        }
        return p
    }, k.on = function(a, b) {
        var c = a.split(d),
            e = j;
        for (var g = 0, h = c.length; g < h; g++) e = e.n, !e[c[g]] && (e[c[g]] = {
            n: {}
        }), e = e[c[g]];
        e.f = e.f || [];
        for (g = 0, h = e.f.length; g < h; g++)
            if (e.f[g] == b) return f;
        e.f.push(b);
        return function(a) {
            +a == +a && (b.zIndex = +a)
        }
    }, k.stop = function() {
        i = 1
    }, k.nt = function(a) {
        if (a) return (new RegExp("(?:\\.|\\/|^)" + a + "(?:\\.|\\/|$)")).test(h);
        return h
    }, k.unbind = function(a, b) {
        var f = a.split(d),
            g, h, i, k, l, m, n, o = [j];
        for (k = 0, l = f.length; k < l; k++)
            for (m = 0; m < o.length; m += i.length - 2) {
                i = [m, 1], g = o[m].n;
                if (f[k] != e) g[f[k]] && i.push(g[f[k]]);
                else
                    for (h in g) g[c](h) && i.push(g[h]);
                o.splice.apply(o, i)
            }
        for (k = 0, l = o.length; k < l; k++) {
            g = o[k];
            while (g.n) {
                if (b) {
                    if (g.f) {
                        for (m = 0, n = g.f.length; m < n; m++)
                            if (g.f[m] == b) {
                                g.f.splice(m, 1);
                                break
                            }!g.f.length && delete g.f
                    }
                    for (h in g.n)
                        if (g.n[c](h) && g.n[h].f) {
                            var p = g.n[h].f;
                            for (m = 0, n = p.length; m < n; m++)
                                if (p[m] == b) {
                                    p.splice(m, 1);
                                    break
                                }!p.length && delete g.n[h].f
                        }
                } else {
                    delete g.f;
                    for (h in g.n) g.n[c](h) && g.n[h].f && delete g.n[h].f
                }
                g = g.n
            }
        }
    }, k.once = function(a, b) {
        var c = function() {
            b.apply(this, arguments), k.unbind(a, c)
        };
        return k.on(a, c)
    }, k.version = b, k.toString = function() {
        return "You are running Eve " + b
    }, typeof module != "undefined" && module.exports ? module.exports = k : a.eve = k
})(this),
function() {
    function cr(b, d, e, f, h, i) {
        e = Q(e);
        var j, k, l, m = [],
            o, p, q, t = b.ms,
            u = {},
            v = {},
            w = {};
        if (f)
            for (y = 0, z = cl.length; y < z; y++) {
                var x = cl[y];
                if (x.el.id == d.id && x.anim == b) {
                    x.percent != e ? (cl.splice(y, 1), l = 1) : k = x, d.attr(x.totalOrigin);
                    break
                }
            } else f = +v;
        for (var y = 0, z = b.percents.length; y < z; y++) {
            if (b.percents[y] == e || b.percents[y] > f * b.top) {
                e = b.percents[y], p = b.percents[y - 1] || 0, t = t / b.top * (e - p), o = b.percents[y + 1], j = b.anim[e];
                break
            }
            f && d.attr(b.anim[b.percents[y]])
        }
        if (!!j) {
            if (!k) {
                for (var A in j)
                    if (j[g](A))
                        if (U[g](A) || d.paper.customAttributes[g](A)) {
                            u[A] = d.attr(A), u[A] == null && (u[A] = T[A]), v[A] = j[A];
                            switch (U[A]) {
                                case C:
                                    w[A] = (v[A] - u[A]) / t;
                                    break;
                                case "colour":
                                    u[A] = a.getRGB(u[A]);
                                    var B = a.getRGB(v[A]);
                                    w[A] = {
                                        r: (B.r - u[A].r) / t,
                                        g: (B.g - u[A].g) / t,
                                        b: (B.b - u[A].b) / t
                                    };
                                    break;
                                case "path":
                                    var D = bG(u[A], v[A]),
                                        E = D[1];
                                    u[A] = D[0], w[A] = [];
                                    for (y = 0, z = u[A].length; y < z; y++) {
                                        w[A][y] = [0];
                                        for (var F = 1, G = u[A][y].length; F < G; F++) w[A][y][F] = (E[y][F] - u[A][y][F]) / t
                                    }
                                    break;
                                case "transform":
                                    var H = d._,
                                        I = bP(H[A], v[A]);
                                    if (I) {
                                        u[A] = I.from, v[A] = I.to, w[A] = [], w[A].real = !0;
                                        for (y = 0, z = u[A].length; y < z; y++) {
                                            w[A][y] = [u[A][y][0]];
                                            for (F = 1, G = u[A][y].length; F < G; F++) w[A][y][F] = (v[A][y][F] - u[A][y][F]) / t
                                        }
                                    } else {
                                        var J = d.matrix || new bQ,
                                            K = {
                                                _: {
                                                    transform: H.transform
                                                },
                                                getBBox: function() {
                                                    return d.getBBox(1)
                                                }
                                            };
                                        u[A] = [J.a, J.b, J.c, J.d, J.e, J.f], bN(K, v[A]), v[A] = K._.transform, w[A] = [(K.matrix.a - J.a) / t, (K.matrix.b - J.b) / t, (K.matrix.c - J.c) / t, (K.matrix.d - J.d) / t, (K.matrix.e - J.e) / t, (K.matrix.e - J.f) / t]
                                    }
                                    break;
                                case "csv":
                                    var L = r(j[A])[s](c),
                                        M = r(u[A])[s](c);
                                    if (A == "clip-rect") {
                                        u[A] = M, w[A] = [], y = M.length;
                                        while (y--) w[A][y] = (L[y] - u[A][y]) / t
                                    }
                                    v[A] = L;
                                    break;
                                default:
                                    L = [][n](j[A]), M = [][n](u[A]), w[A] = [], y = d.paper.customAttributes[A].length;
                                    while (y--) w[A][y] = ((L[y] || 0) - (M[y] || 0)) / t
                            }
                        }
                var O = j.easing,
                    P = a.easing_formulas[O];
                if (!P) {
                    P = r(O).match(N);
                    if (P && P.length == 5) {
                        var R = P;
                        P = function(a) {
                            return cp(a, +R[1], +R[2], +R[3], +R[4], t)
                        }
                    } else P = be
                }
                q = j.start || b.start || +(new Date), x = {
                    anim: b,
                    percent: e,
                    timestamp: q,
                    start: q + (b.del || 0),
                    status: 0,
                    initstatus: f || 0,
                    stop: !1,
                    ms: t,
                    easing: P,
                    from: u,
                    diff: w,
                    to: v,
                    el: d,
                    callback: j.callback,
                    prev: p,
                    next: o,
                    repeat: i || b.times,
                    origin: d.attr(),
                    totalOrigin: h
                }, cl.push(x);
                if (f && !k && !l) {
                    x.stop = !0, x.start = new Date - t * f;
                    if (cl.length == 1) return cn()
                }
                l && (x.start = new Date - x.ms * f), cl.length == 1 && cm(cn)
            } else k.initstatus = f, k.start = new Date - k.ms * f;
            eve("anim.start." + d.id, d, b)
        }
    }

    function cq(a, b) {
        var c = [],
            d = {};
        this.ms = b, this.times = 1;
        if (a) {
            for (var e in a) a[g](e) && (d[Q(e)] = a[e], c.push(Q(e)));
            c.sort(bc)
        }
        this.anim = d, this.top = c[c.length - 1], this.percents = c
    }

    function cp(a, b, c, d, e, f) {
        function o(a, b) {
            var c, d, e, f, j, k;
            for (e = a, k = 0; k < 8; k++) {
                f = m(e) - a;
                if (z(f) < b) return e;
                j = (3 * i * e + 2 * h) * e + g;
                if (z(j) < 1e-6) break;
                e = e - f / j
            }
            c = 0, d = 1, e = a;
            if (e < c) return c;
            if (e > d) return d;
            while (c < d) {
                f = m(e);
                if (z(f - a) < b) return e;
                a > f ? c = e : d = e, e = (d - c) / 2 + c
            }
            return e
        }

        function n(a, b) {
            var c = o(a, b);
            return ((l * c + k) * c + j) * c
        }

        function m(a) {
            return ((i * a + h) * a + g) * a
        }
        var g = 3 * b,
            h = 3 * (d - b) - g,
            i = 1 - g - h,
            j = 3 * c,
            k = 3 * (e - c) - j,
            l = 1 - j - k;
        return n(a, 1 / (200 * f))
    }

    function cd() {
        return this.x + q + this.y + q + this.width + " ¡Á " + this.height
    }

    function cc() {
        return this.x + q + this.y
    }

    function bQ(a, b, c, d, e, f) {
        a != null ? (this.a = +a, this.b = +b, this.c = +c, this.d = +d, this.e = +e, this.f = +f) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
    }

    function bw(a) {
        var b = [];
        for (var c = 0, d = a.length; d - 2 > c; c += 2) {
            var e = [{
                x: +a[c],
                y: +a[c + 1]
            }, {
                x: +a[c],
                y: +a[c + 1]
            }, {
                x: +a[c + 2],
                y: +a[c + 3]
            }, {
                x: +a[c + 4],
                y: +a[c + 5]
            }];
            d - 4 == c ? (e[0] = {
                x: +a[c - 2],
                y: +a[c - 1]
            }, e[3] = e[2]) : c && (e[0] = {
                x: +a[c - 2],
                y: +a[c - 1]
            }), b.push(["C", (-e[0].x + 6 * e[1].x + e[2].x) / 6, (-e[0].y + 6 * e[1].y + e[2].y) / 6, (e[1].x + 6 * e[2].x - e[3].x) / 6, (e[1].y + 6 * e[2].y - e[3].y) / 6, e[2].x, e[2].y])
        }
        return b
    }

    function bv() {
        return this.hex
    }

    function bt(a, b, c) {
        function d() {
            var e = Array.prototype.slice.call(arguments, 0),
                f = e.join("?"),
                h = d.cache = d.cache || {},
                i = d.count = d.count || [];
            if (h[g](f)) {
                bs(i, f);
                return c ? c(h[f]) : h[f]
            }
            i.length >= 1e3 && delete h[i.shift()], i.push(f), h[f] = a[m](b, e);
            return c ? c(h[f]) : h[f]
        }
        return d
    }

    function bs(a, b) {
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] === b) return a.push(a.splice(c, 1)[0])
    }

    function a(c) {
        if (a.is(c, "function")) return b ? c() : eve.on("DOMload", c);
        if (a.is(c, E)) return a._engine.create[m](a, c.splice(0, 3 + a.is(c[0], C))).add(c);
        var d = Array.prototype.slice.call(arguments, 0);
        if (a.is(d[d.length - 1], "function")) {
            var e = d.pop();
            return b ? e.call(a._engine.create[m](a, d)) : eve.on("DOMload", function() {
                e.call(a._engine.create[m](a, d))
            })
        }
        return a._engine.create[m](a, arguments)
    }
    a.version = "2.0.1", a.eve = eve;
    var b, c = /[, ]+/,
        d = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        },
        e = /\{(\d+)\}/g,
        f = "prototype",
        g = "hasOwnProperty",
        h = {
            doc: document,
            win: window
        },
        i = {
            was: Object.prototype[g].call(h.win, "Raphael"),
            is: h.win.Raphael
        },
        j = function() {
            this.ca = this.customAttributes = {}
        },
        k, l = "appendChild",
        m = "apply",
        n = "concat",
        o = "createTouch" in h.doc,
        p = "",
        q = " ",
        r = String,
        s = "split",
        t = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [s](q),
        u = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        v = r.prototype.toLowerCase,
        w = Math,
        x = w.max,
        y = w.min,
        z = w.abs,
        A = w.pow,
        B = w.PI,
        C = "number",
        D = "string",
        E = "array",
        F = "toString",
        G = "fill",
        H = Object.prototype.toString,
        I = {},
        J = "push",
        K = a._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        L = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        M = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        },
        N = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        O = w.round,
        P = "setAttribute",
        Q = parseFloat,
        R = parseInt,
        S = r.prototype.toUpperCase,
        T = a._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        U = a._availableAnimAttrs = {
            blur: C,
            "clip-rect": "csv",
            cx: C,
            cy: C,
            fill: "colour",
            "fill-opacity": C,
            "font-size": C,
            height: C,
            opacity: C,
            path: "path",
            r: C,
            rx: C,
            ry: C,
            stroke: "colour",
            "stroke-opacity": C,
            "stroke-width": C,
            transform: "transform",
            width: C,
            x: C,
            y: C
        },
        V = /\s*,\s*/,
        W = {
            hs: 1,
            rg: 1
        },
        X = /,?([achlmqrstvxz]),?/gi,
        Y = /([achlmrqstvz])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?\s*,?\s*)+)/ig,
        Z = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?\s*,?\s*)+)/ig,
        $ = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)\s*,?\s*/ig,
        _ = a._radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,
        ba = {},
        bb = function(a, b) {
            return a.key - b.key
        },
        bc = function(a, b) {
            return Q(a) - Q(b)
        },
        bd = function() {},
        be = function(a) {
            return a
        },
        bf = a._rectPath = function(a, b, c, d, e) {
            if (e) return [
                ["M", a + e, b],
                ["l", c - e * 2, 0],
                ["a", e, e, 0, 0, 1, e, e],
                ["l", 0, d - e * 2],
                ["a", e, e, 0, 0, 1, -e, e],
                ["l", e * 2 - c, 0],
                ["a", e, e, 0, 0, 1, -e, -e],
                ["l", 0, e * 2 - d],
                ["a", e, e, 0, 0, 1, e, -e],
                ["z"]
            ];
            return [
                ["M", a, b],
                ["l", c, 0],
                ["l", 0, d],
                ["l", -c, 0],
                ["z"]
            ]
        },
        bg = function(a, b, c, d) {
            d == null && (d = c);
            return [
                ["M", a, b],
                ["m", 0, -d],
                ["a", c, d, 0, 1, 1, 0, 2 * d],
                ["a", c, d, 0, 1, 1, 0, -2 * d],
                ["z"]
            ]
        },
        bh = a._getPath = {
            path: function(a) {
                return a.attr("path")
            },
            circle: function(a) {
                var b = a.attrs;
                return bg(b.cx, b.cy, b.r)
            },
            ellipse: function(a) {
                var b = a.attrs;
                return bg(b.cx, b.cy, b.rx, b.ry)
            },
            rect: function(a) {
                var b = a.attrs;
                return bf(b.x, b.y, b.width, b.height, b.r)
            },
            image: function(a) {
                var b = a.attrs;
                return bf(b.x, b.y, b.width, b.height)
            },
            text: function(a) {
                var b = a._getBBox();
                return bf(b.x, b.y, b.width, b.height)
            }
        },
        bi = a.mapPath = function(a, b) {
            if (!b) return a;
            var c, d, e, f, g, h, i;
            a = bG(a);
            for (e = 0, g = a.length; e < g; e++) {
                i = a[e];
                for (f = 1, h = i.length; f < h; f += 2) c = b.x(i[f], i[f + 1]), d = b.y(i[f], i[f + 1]), i[f] = c, i[f + 1] = d
            }
            return a
        };
    a._g = h, a.type = h.win.SVGAngle || h.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
    if (a.type == "VML") {
        var bj = h.doc.createElement("div"),
            bk;
        bj.innerHTML = '<v:shape adj="1"/>', bk = bj.firstChild, bk.style.behavior = "url(#default#VML)";
        if (!bk || typeof bk.adj != "object") return a.type = p;
        bj = null
    }
    a.svg = !(a.vml = a.type == "VML"), a._Paper = j, a.fn = k = j.prototype = a.prototype, a._id = 0, a._oid = 0, a.is = function(a, b) {
        b = v.call(b);
        if (b == "finite") return !M[g](+a);
        if (b == "array") return a instanceof Array;
        return b == "null" && a === null || b == typeof a && a !== null || b == "object" && a === Object(a) || b == "array" && Array.isArray && Array.isArray(a) || H.call(a).slice(8, -1).toLowerCase() == b
    }, a.angle = function(b, c, d, e, f, g) {
        if (f == null) {
            var h = b - d,
                i = c - e;
            if (!h && !i) return 0;
            return (180 + w.atan2(-i, -h) * 180 / B + 360) % 360
        }
        return a.angle(b, c, f, g) - a.angle(d, e, f, g)
    }, a.rad = function(a) {
        return a % 360 * B / 180
    }, a.deg = function(a) {
        return a * 180 / B % 360
    }, a.snapTo = function(b, c, d) {
        d = a.is(d, "finite") ? d : 10;
        if (a.is(b, E)) {
            var e = b.length;
            while (e--)
                if (z(b[e] - c) <= d) return b[e]
        } else {
            b = +b;
            var f = c % b;
            if (f < d) return c - f;
            if (f > b - d) return c - f + b
        }
        return c
    };
    var bl = a.createUUID = function(a, b) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a, b).toUpperCase()
        }
    }(/[xy]/g, function(a) {
        var b = w.random() * 16 | 0,
            c = a == "x" ? b : b & 3 | 8;
        return c.toString(16)
    });
    a.setWindow = function(b) {
        eve("setWindow", a, h.win, b), h.win = b, h.doc = h.win.document, a._engine.initWin && a._engine.initWin(h.win)
    };
    var bm = function(b) {
            if (a.vml) {
                var c = /^\s+|\s+$/g,
                    d;
                try {
                    var e = new ActiveXObject("htmlfile");
                    e.write("<body>"), e.close(), d = e.body
                } catch (f) {
                    d = createPopup().document.body
                }
                var g = d.createTextRange();
                bm = bt(function(a) {
                    try {
                        d.style.color = r(a).replace(c, p);
                        var b = g.queryCommandValue("ForeColor");
                        b = (b & 255) << 16 | b & 65280 | (b & 16711680) >>> 16;
                        return "#" + ("000000" + b.toString(16)).slice(-6)
                    } catch (e) {
                        return "none"
                    }
                })
            } else {
                var i = h.doc.createElement("i");
                i.title = "Colour Picker", i.style.display = "none", h.doc.body.appendChild(i), bm = bt(function(a) {
                    i.style.color = a;
                    return h.doc.defaultView.getComputedStyle(i, p).getPropertyValue("color")
                })
            }
            return bm(b)
        },
        bn = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        bo = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        bp = function() {
            return this.hex
        },
        bq = function(b, c, d) {
            c == null && a.is(b, "object") && "r" in b && "g" in b && "b" in b && (d = b.b, c = b.g, b = b.r);
            if (c == null && a.is(b, D)) {
                var e = a.getRGB(b);
                b = e.r, c = e.g, d = e.b
            }
            if (b > 1 || c > 1 || d > 1) b /= 255, c /= 255, d /= 255;
            return [b, c, d]
        },
        br = function(b, c, d, e) {
            b *= 255, c *= 255, d *= 255;
            var f = {
                r: b,
                g: c,
                b: d,
                hex: a.rgb(b, c, d),
                toString: bp
            };
            a.is(e, "finite") && (f.opacity = e);
            return f
        };
    a.color = function(b) {
        var c;
        a.is(b, "object") && "h" in b && "s" in b && "b" in b ? (c = a.hsb2rgb(b), b.r = c.r, b.g = c.g, b.b = c.b, b.hex = c.hex) : a.is(b, "object") && "h" in b && "s" in b && "l" in b ? (c = a.hsl2rgb(b), b.r = c.r, b.g = c.g, b.b = c.b, b.hex = c.hex) : (a.is(b, "string") && (b = a.getRGB(b)), a.is(b, "object") && "r" in b && "g" in b && "b" in b ? (c = a.rgb2hsl(b), b.h = c.h, b.s = c.s, b.l = c.l, c = a.rgb2hsb(b), b.v = c.b) : (b = {
            hex: "none"
        }, b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1)), b.toString = bp;
        return b
    }, a.hsb2rgb = function(a, b, c, d) {
        this.is(a, "object") && "h" in a && "s" in a && "b" in a && (c = a.b, b = a.s, a = a.h, d = a.o), a *= 360;
        var e, f, g, h, i;
        a = a % 360 / 60, i = c * b, h = i * (1 - z(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a];
        return br(e, f, g, d)
    }, a.hsl2rgb = function(a, b, c, d) {
        this.is(a, "object") && "h" in a && "s" in a && "l" in a && (c = a.l, b = a.s, a = a.h);
        if (a > 1 || b > 1 || c > 1) a /= 360, b /= 100, c /= 100;
        a *= 360;
        var e, f, g, h, i;
        a = a % 360 / 60, i = 2 * b * (c < .5 ? c : 1 - c), h = i * (1 - z(a % 2 - 1)), e = f = g = c - i / 2, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a];
        return br(e, f, g, d)
    }, a.rgb2hsb = function(a, b, c) {
        c = bq(a, b, c), a = c[0], b = c[1], c = c[2];
        var d, e, f, g;
        f = x(a, b, c), g = f - y(a, b, c), d = g == 0 ? null : f == a ? (b - c) / g : f == b ? (c - a) / g + 2 : (a - b) / g + 4, d = (d + 360) % 6 * 60 / 360, e = g == 0 ? 0 : g / f;
        return {
            h: d,
            s: e,
            b: f,
            toString: bn
        }
    }, a.rgb2hsl = function(a, b, c) {
        c = bq(a, b, c), a = c[0], b = c[1], c = c[2];
        var d, e, f, g, h, i;
        g = x(a, b, c), h = y(a, b, c), i = g - h, d = i == 0 ? null : g == a ? (b - c) / i : g == b ? (c - a) / i + 2 : (a - b) / i + 4, d = (d + 360) % 6 * 60 / 360, f = (g + h) / 2, e = i == 0 ? 0 : f < .5 ? i / (2 * f) : i / (2 - 2 * f);
        return {
            h: d,
            s: e,
            l: f,
            toString: bo
        }
    }, a._path2string = function() {
        return this.join(",").replace(X, "$1")
    };
    var bu = a._preload = function(a, b) {
        var c = h.doc.createElement("img");
        c.style.cssText = "position:absolute;left:-9999em;top:-9999em", c.onload = function() {
            b.call(this), this.onload = null, h.doc.body.removeChild(this)
        }, c.onerror = function() {
            h.doc.body.removeChild(this)
        }, h.doc.body.appendChild(c), c.src = a
    };
    a.getRGB = bt(function(b) {
        if (!b || !!((b = r(b)).indexOf("-") + 1)) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: bv
        };
        if (b == "none") return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            toString: bv
        };
        !W[g](b.toLowerCase().substring(0, 2)) && b.charAt() != "#" && (b = bm(b));
        var c, d, e, f, h, i, j, k = b.match(L);
        if (k) {
            k[2] && (f = R(k[2].substring(5), 16), e = R(k[2].substring(3, 5), 16), d = R(k[2].substring(1, 3), 16)), k[3] && (f = R((i = k[3].charAt(3)) + i, 16), e = R((i = k[3].charAt(2)) + i, 16), d = R((i = k[3].charAt(1)) + i, 16)), k[4] && (j = k[4][s](V), d = Q(j[0]), j[0].slice(-1) == "%" && (d *= 2.55), e = Q(j[1]), j[1].slice(-1) == "%" && (e *= 2.55), f = Q(j[2]), j[2].slice(-1) == "%" && (f *= 2.55), k[1].toLowerCase().slice(0, 4) == "rgba" && (h = Q(j[3])), j[3] && j[3].slice(-1) == "%" && (h /= 100));
            if (k[5]) {
                j = k[5][s](V), d = Q(j[0]), j[0].slice(-1) == "%" && (d *= 2.55), e = Q(j[1]), j[1].slice(-1) == "%" && (e *= 2.55), f = Q(j[2]), j[2].slice(-1) == "%" && (f *= 2.55), (j[0].slice(-3) == "deg" || j[0].slice(-1) == "¡ã") && (d /= 360), k[1].toLowerCase().slice(0, 4) == "hsba" && (h = Q(j[3])), j[3] && j[3].slice(-1) == "%" && (h /= 100);
                return a.hsb2rgb(d, e, f, h)
            }
            if (k[6]) {
                j = k[6][s](V), d = Q(j[0]), j[0].slice(-1) == "%" && (d *= 2.55), e = Q(j[1]), j[1].slice(-1) == "%" && (e *= 2.55), f = Q(j[2]), j[2].slice(-1) == "%" && (f *= 2.55), (j[0].slice(-3) == "deg" || j[0].slice(-1) == "¡ã") && (d /= 360), k[1].toLowerCase().slice(0, 4) == "hsla" && (h = Q(j[3])), j[3] && j[3].slice(-1) == "%" && (h /= 100);
                return a.hsl2rgb(d, e, f, h)
            }
            k = {
                r: d,
                g: e,
                b: f,
                toString: bv
            }, k.hex = "#" + (16777216 | f | e << 8 | d << 16).toString(16).slice(1), a.is(h, "finite") && (k.opacity = h);
            return k
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: bv
        }
    }, a), a.hsb = bt(function(b, c, d) {
        return a.hsb2rgb(b, c, d).hex
    }), a.hsl = bt(function(b, c, d) {
        return a.hsl2rgb(b, c, d).hex
    }), a.rgb = bt(function(a, b, c) {
        return "#" + (16777216 | c | b << 8 | a << 16).toString(16).slice(1)
    }), a.getColor = function(a) {
        var b = this.getColor.start = this.getColor.start || {
                h: 0,
                s: 1,
                b: a || .75
            },
            c = this.hsb2rgb(b.h, b.s, b.b);
        b.h += .075, b.h > 1 && (b.h = 0, b.s -= .2, b.s <= 0 && (this.getColor.start = {
            h: 0,
            s: 1,
            b: b.b
        }));
        return c.hex
    }, a.getColor.reset = function() {
        delete this.start
    }, a.parsePathString = bt(function(b) {
        if (!b) return null;
        var c = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            d = [];
        a.is(b, E) && a.is(b[0], E) && (d = by(b)), d.length || r(b).replace(Y, function(a, b, e) {
            var f = [],
                g = b.toLowerCase();
            e.replace($, function(a, b) {
                b && f.push(+b)
            }), g == "m" && f.length > 2 && (d.push([b][n](f.splice(0, 2))), g = "l", b = b == "m" ? "l" : "L");
            if (g == "r") d.push([b][n](f));
            else
                while (f.length >= c[g]) {
                    d.push([b][n](f.splice(0, c[g])));
                    if (!c[g]) break
                }
        }), d.toString = a._path2string;
        return d
    }), a.parseTransformString = bt(function(b) {
        if (!b) return null;
        var c = {
                r: 3,
                s: 4,
                t: 2,
                m: 6
            },
            d = [];
        a.is(b, E) && a.is(b[0], E) && (d = by(b)), d.length || r(b).replace(Z, function(a, b, c) {
            var e = [],
                f = v.call(b);
            c.replace($, function(a, b) {
                b && e.push(+b)
            }), d.push([b][n](e))
        }), d.toString = a._path2string;
        return d
    }), a.findDotsAtSegment = function(a, b, c, d, e, f, g, h, i) {
        var j = 1 - i,
            k = A(j, 3),
            l = A(j, 2),
            m = i * i,
            n = m * i,
            o = k * a + l * 3 * i * c + j * 3 * i * i * e + n * g,
            p = k * b + l * 3 * i * d + j * 3 * i * i * f + n * h,
            q = a + 2 * i * (c - a) + m * (e - 2 * c + a),
            r = b + 2 * i * (d - b) + m * (f - 2 * d + b),
            s = c + 2 * i * (e - c) + m * (g - 2 * e + c),
            t = d + 2 * i * (f - d) + m * (h - 2 * f + d),
            u = j * a + i * c,
            v = j * b + i * d,
            x = j * e + i * g,
            y = j * f + i * h,
            z = 90 - w.atan2(q - s, r - t) * 180 / B;
        (q > s || r < t) && (z += 180);
        return {
            x: o,
            y: p,
            m: {
                x: q,
                y: r
            },
            n: {
                x: s,
                y: t
            },
            start: {
                x: u,
                y: v
            },
            end: {
                x: x,
                y: y
            },
            alpha: z
        }
    }, a._removedFactory = function(a) {
        return function() {
            throw new Error("you are calling to method ¡°" + a + "¡± of removed object")
        }
    };
    var bx = bt(function(a) {
            if (!a) return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            a = bG(a);
            var b = 0,
                c = 0,
                d = [],
                e = [],
                f;
            for (var g = 0, h = a.length; g < h; g++) {
                f = a[g];
                if (f[0] == "M") b = f[1], c = f[2], d.push(b), e.push(c);
                else {
                    var i = bF(b, c, f[1], f[2], f[3], f[4], f[5], f[6]);
                    d = d[n](i.min.x, i.max.x), e = e[n](i.min.y, i.max.y), b = f[5], c = f[6]
                }
            }
            var j = y[m](0, d),
                k = y[m](0, e);
            return {
                x: j,
                y: k,
                width: x[m](0, d) - j,
                height: x[m](0, e) - k
            }
        }, null, function(a) {
            return {
                x: a.x,
                y: a.y,
                width: a.width,
                height: a.height
            }
        }),
        by = function(b) {
            var c = [];
            if (!a.is(b, E) || !a.is(b && b[0], E)) b = a.parsePathString(b);
            for (var d = 0, e = b.length; d < e; d++) {
                c[d] = [];
                for (var f = 0, g = b[d].length; f < g; f++) c[d][f] = b[d][f]
            }
            c.toString = a._path2string;
            return c
        },
        bz = a._pathToRelative = bt(function(b) {
            if (!a.is(b, E) || !a.is(b && b[0], E)) b = a.parsePathString(b);
            var c = [],
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
            b[0][0] == "M" && (d = b[0][1], e = b[0][2], f = d, g = e, h++, c.push(["M", d, e]));
            for (var i = h, j = b.length; i < j; i++) {
                var k = c[i] = [],
                    l = b[i];
                if (l[0] != v.call(l[0])) {
                    k[0] = v.call(l[0]);
                    switch (k[0]) {
                        case "a":
                            k[1] = l[1], k[2] = l[2], k[3] = l[3], k[4] = l[4], k[5] = l[5], k[6] = +(l[6] - d).toFixed(3), k[7] = +(l[7] - e).toFixed(3);
                            break;
                        case "v":
                            k[1] = +(l[1] - e).toFixed(3);
                            break;
                        case "m":
                            f = l[1], g = l[2];
                        default:
                            for (var m = 1, n = l.length; m < n; m++) k[m] = +(l[m] - (m % 2 ? d : e)).toFixed(3)
                    }
                } else {
                    k = c[i] = [], l[0] == "m" && (f = l[1] + d, g = l[2] + e);
                    for (var o = 0, p = l.length; o < p; o++) c[i][o] = l[o]
                }
                var q = c[i].length;
                switch (c[i][0]) {
                    case "z":
                        d = f, e = g;
                        break;
                    case "h":
                        d += +c[i][q - 1];
                        break;
                    case "v":
                        e += +c[i][q - 1];
                        break;
                    default:
                        d += +c[i][q - 2], e += +c[i][q - 1]
                }
            }
            c.toString = a._path2string;
            return c
        }, 0, by),
        bA = a._pathToAbsolute = bt(function(b) {
            if (!a.is(b, E) || !a.is(b && b[0], E)) b = a.parsePathString(b);
            if (!b || !b.length) return [
                ["M", 0, 0]
            ];
            var c = [],
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;
            b[0][0] == "M" && (d = +b[0][1], e = +b[0][2], f = d, g = e, h++, c[0] = ["M", d, e]);
            for (var i, j, k = h, l = b.length; k < l; k++) {
                c.push(i = []), j = b[k];
                if (j[0] != S.call(j[0])) {
                    i[0] = S.call(j[0]);
                    switch (i[0]) {
                        case "A":
                            i[1] = j[1], i[2] = j[2], i[3] = j[3], i[4] = j[4], i[5] = j[5], i[6] = +(j[6] + d), i[7] = +(j[7] + e);
                            break;
                        case "V":
                            i[1] = +j[1] + e;
                            break;
                        case "H":
                            i[1] = +j[1] + d;
                            break;
                        case "R":
                            var m = [d, e][n](j.slice(1));
                            for (var o = 2, p = m.length; o < p; o++) m[o] = +m[o] + d, m[++o] = +m[o] + e;
                            c.pop(), c = c[n](bw(m));
                            break;
                        case "M":
                            f = +j[1] + d, g = +j[2] + e;
                        default:
                            for (o = 1, p = j.length; o < p; o++) i[o] = +j[o] + (o % 2 ? d : e)
                    }
                } else if (j[0] == "R") m = [d, e][n](j.slice(1)), c.pop(), c = c[n](bw(m)), i = ["R"][n](j.slice(-2));
                else
                    for (var q = 0, r = j.length; q < r; q++) i[q] = j[q];
                switch (i[0]) {
                    case "Z":
                        d = f, e = g;
                        break;
                    case "H":
                        d = i[1];
                        break;
                    case "V":
                        e = i[1];
                        break;
                    case "M":
                        f = i[i.length - 2], g = i[i.length - 1];
                    default:
                        d = i[i.length - 2], e = i[i.length - 1]
                }
            }
            c.toString = a._path2string;
            return c
        }, null, by),
        bB = function(a, b, c, d) {
            return [a, b, c, d, c, d]
        },
        bC = function(a, b, c, d, e, f) {
            var g = 1 / 3,
                h = 2 / 3;
            return [g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
        },
        bD = function(a, b, c, d, e, f, g, h, i, j) {
            var k = B * 120 / 180,
                l = B / 180 * (+e || 0),
                m = [],
                o, p = bt(function(a, b, c) {
                    var d = a * w.cos(c) - b * w.sin(c),
                        e = a * w.sin(c) + b * w.cos(c);
                    return {
                        x: d,
                        y: e
                    }
                });
            if (!j) {
                o = p(a, b, -l), a = o.x, b = o.y, o = p(h, i, -l), h = o.x, i = o.y;
                var q = w.cos(B / 180 * e),
                    r = w.sin(B / 180 * e),
                    t = (a - h) / 2,
                    u = (b - i) / 2,
                    v = t * t / (c * c) + u * u / (d * d);
                v > 1 && (v = w.sqrt(v), c = v * c, d = v * d);
                var x = c * c,
                    y = d * d,
                    A = (f == g ? -1 : 1) * w.sqrt(z((x * y - x * u * u - y * t * t) / (x * u * u + y * t * t))),
                    C = A * c * u / d + (a + h) / 2,
                    D = A * -d * t / c + (b + i) / 2,
                    E = w.asin(((b - D) / d).toFixed(9)),
                    F = w.asin(((i - D) / d).toFixed(9));
                E = a < C ? B - E : E, F = h < C ? B - F : F, E < 0 && (E = B * 2 + E), F < 0 && (F = B * 2 + F), g && E > F && (E = E - B * 2), !g && F > E && (F = F - B * 2)
            } else E = j[0], F = j[1], C = j[2], D = j[3];
            var G = F - E;
            if (z(G) > k) {
                var H = F,
                    I = h,
                    J = i;
                F = E + k * (g && F > E ? 1 : -1), h = C + c * w.cos(F), i = D + d * w.sin(F), m = bD(h, i, c, d, e, 0, g, I, J, [F, H, C, D])
            }
            G = F - E;
            var K = w.cos(E),
                L = w.sin(E),
                M = w.cos(F),
                N = w.sin(F),
                O = w.tan(G / 4),
                P = 4 / 3 * c * O,
                Q = 4 / 3 * d * O,
                R = [a, b],
                S = [a + P * L, b - Q * K],
                T = [h + P * N, i - Q * M],
                U = [h, i];
            S[0] = 2 * R[0] - S[0], S[1] = 2 * R[1] - S[1];
            if (j) return [S, T, U][n](m);
            m = [S, T, U][n](m).join()[s](",");
            var V = [];
            for (var W = 0, X = m.length; W < X; W++) V[W] = W % 2 ? p(m[W - 1], m[W], l).y : p(m[W], m[W + 1], l).x;
            return V
        },
        bE = function(a, b, c, d, e, f, g, h, i) {
            var j = 1 - i;
            return {
                x: A(j, 3) * a + A(j, 2) * 3 * i * c + j * 3 * i * i * e + A(i, 3) * g,
                y: A(j, 3) * b + A(j, 2) * 3 * i * d + j * 3 * i * i * f + A(i, 3) * h
            }
        },
        bF = bt(function(a, b, c, d, e, f, g, h) {
            var i = e - 2 * c + a - (g - 2 * e + c),
                j = 2 * (c - a) - 2 * (e - c),
                k = a - c,
                l = (-j + w.sqrt(j * j - 4 * i * k)) / 2 / i,
                n = (-j - w.sqrt(j * j - 4 * i * k)) / 2 / i,
                o = [b, h],
                p = [a, g],
                q;
            z(l) > "1e12" && (l = .5), z(n) > "1e12" && (n = .5), l > 0 && l < 1 && (q = bE(a, b, c, d, e, f, g, h, l), p.push(q.x), o.push(q.y)), n > 0 && n < 1 && (q = bE(a, b, c, d, e, f, g, h, n), p.push(q.x), o.push(q.y)), i = f - 2 * d + b - (h - 2 * f + d), j = 2 * (d - b) - 2 * (f - d), k = b - d, l = (-j + w.sqrt(j * j - 4 * i * k)) / 2 / i, n = (-j - w.sqrt(j * j - 4 * i * k)) / 2 / i, z(l) > "1e12" && (l = .5), z(n) > "1e12" && (n = .5), l > 0 && l < 1 && (q = bE(a, b, c, d, e, f, g, h, l), p.push(q.x), o.push(q.y)), n > 0 && n < 1 && (q = bE(a, b, c, d, e, f, g, h, n), p.push(q.x), o.push(q.y));
            return {
                min: {
                    x: y[m](0, p),
                    y: y[m](0, o)
                },
                max: {
                    x: x[m](0, p),
                    y: x[m](0, o)
                }
            }
        }),
        bG = a._path2curve = bt(function(a, b) {
            var c = bA(a),
                d = b && bA(b),
                e = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                f = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                },
                g = function(a, b) {
                    var c, d;
                    if (!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                    !(a[0] in {
                        T: 1,
                        Q: 1
                    }) && (b.qx = b.qy = null);
                    switch (a[0]) {
                        case "M":
                            b.X = a[1], b.Y = a[2];
                            break;
                        case "A":
                            a = ["C"][n](bD[m](0, [b.x, b.y][n](a.slice(1))));
                            break;
                        case "S":
                            c = b.x + (b.x - (b.bx || b.x)), d = b.y + (b.y - (b.by || b.y)), a = ["C", c, d][n](a.slice(1));
                            break;
                        case "T":
                            b.qx = b.x + (b.x - (b.qx || b.x)), b.qy = b.y + (b.y - (b.qy || b.y)), a = ["C"][n](bC(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                            break;
                        case "Q":
                            b.qx = a[1], b.qy = a[2], a = ["C"][n](bC(b.x, b.y, a[1], a[2], a[3], a[4]));
                            break;
                        case "L":
                            a = ["C"][n](bB(b.x, b.y, a[1], a[2]));
                            break;
                        case "H":
                            a = ["C"][n](bB(b.x, b.y, a[1], b.y));
                            break;
                        case "V":
                            a = ["C"][n](bB(b.x, b.y, b.x, a[1]));
                            break;
                        case "Z":
                            a = ["C"][n](bB(b.x, b.y, b.X, b.Y))
                    }
                    return a
                },
                h = function(a, b) {
                    if (a[b].length > 7) {
                        a[b].shift();
                        var e = a[b];
                        while (e.length) a.splice(b++, 0, ["C"][n](e.splice(0, 6)));
                        a.splice(b, 1), k = x(c.length, d && d.length || 0)
                    }
                },
                i = function(a, b, e, f, g) {
                    a && b && a[g][0] == "M" && b[g][0] != "M" && (b.splice(g, 0, ["M", f.x, f.y]), e.bx = 0, e.by = 0, e.x = a[g][1], e.y = a[g][2], k = x(c.length, d && d.length || 0))
                };
            for (var j = 0, k = x(c.length, d && d.length || 0); j < k; j++) {
                c[j] = g(c[j], e), h(c, j), d && (d[j] = g(d[j], f)), d && h(d, j), i(c, d, e, f, j), i(d, c, f, e, j);
                var l = c[j],
                    o = d && d[j],
                    p = l.length,
                    q = d && o.length;
                e.x = l[p - 2], e.y = l[p - 1], e.bx = Q(l[p - 4]) || e.x, e.by = Q(l[p - 3]) || e.y, f.bx = d && (Q(o[q - 4]) || f.x), f.by = d && (Q(o[q - 3]) || f.y), f.x = d && o[q - 2], f.y = d && o[q - 1]
            }
            return d ? [c, d] : c
        }, null, by),
        bH = a._parseDots = bt(function(b) {
            var c = [];
            for (var d = 0, e = b.length; d < e; d++) {
                var f = {},
                    g = b[d].match(/^([^:]*):?([\d\.]*)/);
                f.color = a.getRGB(g[1]);
                if (f.color.error) return null;
                f.color = f.color.hex, g[2] && (f.offset = g[2] + "%"), c.push(f)
            }
            for (d = 1, e = c.length - 1; d < e; d++)
                if (!c[d].offset) {
                    var h = Q(c[d - 1].offset || 0),
                        i = 0;
                    for (var j = d + 1; j < e; j++)
                        if (c[j].offset) {
                            i = c[j].offset;
                            break
                        }
                    i || (i = 100, j = e), i = Q(i);
                    var k = (i - h) / (j - d + 1);
                    for (; d < j; d++) h += k, c[d].offset = h + "%"
                }
            return c
        }),
        bI = a._tear = function(a, b) {
            a == b.top && (b.top = a.prev), a == b.bottom && (b.bottom = a.next), a.next && (a.next.prev = a.prev), a.prev && (a.prev.next = a.next)
        },
        bJ = a._tofront = function(a, b) {
            b.top !== a && (bI(a, b), a.next = null, a.prev = b.top, b.top.next = a, b.top = a)
        },
        bK = a._toback = function(a, b) {
            b.bottom !== a && (bI(a, b), a.next = b.bottom, a.prev = null, b.bottom.prev = a, b.bottom = a)
        },
        bL = a._insertafter = function(a, b, c) {
            bI(a, c), b == c.top && (c.top = a), b.next && (b.next.prev = a), a.next = b.next, a.prev = b, b.next = a
        },
        bM = a._insertbefore = function(a, b, c) {
            bI(a, c), b == c.bottom && (c.bottom = a), b.prev && (b.prev.next = a), a.prev = b.prev, b.prev = a, a.next = b
        },
        bN = a._extractTransform = function(b, c) {
            if (c == null) return b._.transform;
            c = r(c).replace(/\.{3}|\u2026/g, b._.transform || p);
            var d = a.parseTransformString(c),
                e = 0,
                f = 0,
                g = 0,
                h = 1,
                i = 1,
                j = b._,
                k = new bQ;
            j.transform = d || [];
            if (d)
                for (var l = 0, m = d.length; l < m; l++) {
                    var n = d[l],
                        o = n.length,
                        q = r(n[0]).toLowerCase(),
                        s = n[0] != q,
                        t = s ? k.invert() : 0,
                        u, v, w, x, y;
                    q == "t" && o == 3 ? s ? (u = t.x(0, 0), v = t.y(0, 0), w = t.x(n[1], n[2]), x = t.y(n[1], n[2]), k.translate(w - u, x - v)) : k.translate(n[1], n[2]) : q == "r" ? o == 2 ? (y = y || b.getBBox(1), k.rotate(n[1], y.x + y.width / 2, y.y + y.height / 2), e += n[1]) : o == 4 && (s ? (w = t.x(n[2], n[3]), x = t.y(n[2], n[3]), k.rotate(n[1], w, x)) : k.rotate(n[1], n[2], n[3]), e += n[1]) : q == "s" ? o == 2 || o == 3 ? (y = y || b.getBBox(1), k.scale(n[1], n[o - 1], y.x + y.width / 2, y.y + y.height / 2), h *= n[1], i *= n[o - 1]) : o == 5 && (s ? (w = t.x(n[3], n[4]), x = t.y(n[3], n[4]), k.scale(n[1], n[2], w, x)) : k.scale(n[1], n[2], n[3], n[4]), h *= n[1], i *= n[2]) : q == "m" && o == 7 && k.add(n[1], n[2], n[3], n[4], n[5], n[6]), j.dirtyT = 1, b.matrix = k
                }
            b.matrix = k, j.sx = h, j.sy = i, j.deg = e, j.dx = f = k.e, j.dy = g = k.f, h == 1 && i == 1 && !e && j.bbox ? (j.bbox.x += +f, j.bbox.y += +g) : j.dirtyT = 1
        },
        bO = function(a) {
            var b = a[0];
            switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    return a.length == 4 ? [b, 0, a[2], a[3]] : [b, 0];
                case "s":
                    return a.length == 5 ? [b, 1, 1, a[3], a[4]] : a.length == 3 ? [b, 1, 1] : [b, 1]
            }
        },
        bP = a._equaliseTransform = function(b, c) {
            c = r(c).replace(/\.{3}|\u2026/g, b), b = a.parseTransformString(b) || [], c = a.parseTransformString(c) || [];
            var d = x(b.length, c.length),
                e = [],
                f = [],
                g = 0,
                h, i, j, k;
            for (; g < d; g++) {
                j = b[g] || bO(c[g]), k = c[g] || bO(j);
                if (j[0] != k[0] || j[0].toLowerCase() == "r" && (j[2] != k[2] || j[3] != k[3]) || j[0].toLowerCase() == "s" && (j[3] != k[3] || j[4] != k[4])) return;
                e[g] = [], f[g] = [];
                for (h = 0, i = x(j.length, k.length); h < i; h++) h in j && (e[g][h] = j[h]), h in k && (f[g][h] = k[h])
            }
            return {
                from: e,
                to: f
            }
        };
    a._getContainer = function(b, c, d, e) {
            var f;
            f = e == null && !a.is(b, "object") ? h.doc.getElementById(b) : b;
            if (f != null) {
                if (f.tagName) return c == null ? {
                    container: f,
                    width: f.style.pixelWidth || f.offsetWidth,
                    height: f.style.pixelHeight || f.offsetHeight
                } : {
                    container: f,
                    width: c,
                    height: d
                };
                return {
                    container: 1,
                    x: b,
                    y: c,
                    width: d,
                    height: e
                }
            }
        }, a.pathToRelative = bz, a._engine = {}, a.path2curve = bG, a.matrix = function(a, b, c, d, e, f) {
            return new bQ(a, b, c, d, e, f)
        },
        function(b) {
            function d(a) {
                var b = w.sqrt(c(a));
                a[0] && (a[0] /= b), a[1] && (a[1] /= b)
            }

            function c(a) {
                return a[0] * a[0] + a[1] * a[1]
            }
            b.add = function(a, b, c, d, e, f) {
                var g = [
                        [],
                        [],
                        []
                    ],
                    h = [
                        [this.a, this.c, this.e],
                        [this.b, this.d, this.f],
                        [0, 0, 1]
                    ],
                    i = [
                        [a, c, e],
                        [b, d, f],
                        [0, 0, 1]
                    ],
                    j, k, l, m;
                a && a instanceof bQ && (i = [
                    [a.a, a.c, a.e],
                    [a.b, a.d, a.f],
                    [0, 0, 1]
                ]);
                for (j = 0; j < 3; j++)
                    for (k = 0; k < 3; k++) {
                        m = 0;
                        for (l = 0; l < 3; l++) m += h[j][l] * i[l][k];
                        g[j][k] = m
                    }
                this.a = g[0][0], this.b = g[1][0], this.c = g[0][1], this.d = g[1][1], this.e = g[0][2], this.f = g[1][2]
            }, b.invert = function() {
                var a = this,
                    b = a.a * a.d - a.b * a.c;
                return new bQ(a.d / b, -a.b / b, -a.c / b, a.a / b, (a.c * a.f - a.d * a.e) / b, (a.b * a.e - a.a * a.f) / b)
            }, b.clone = function() {
                return new bQ(this.a, this.b, this.c, this.d, this.e, this.f)
            }, b.translate = function(a, b) {
                this.add(1, 0, 0, 1, a, b)
            }, b.scale = function(a, b, c, d) {
                b == null && (b = a), (c || d) && this.add(1, 0, 0, 1, c, d), this.add(a, 0, 0, b, 0, 0), (c || d) && this.add(1, 0, 0, 1, -c, -d)
            }, b.rotate = function(b, c, d) {
                b = a.rad(b), c = c || 0, d = d || 0;
                var e = +w.cos(b).toFixed(9),
                    f = +w.sin(b).toFixed(9);
                this.add(e, f, -f, e, c, d), this.add(1, 0, 0, 1, -c, -d)
            }, b.x = function(a, b) {
                return a * this.a + b * this.c + this.e
            }, b.y = function(a, b) {
                return a * this.b + b * this.d + this.f
            }, b.get = function(a) {
                return +this[r.fromCharCode(97 + a)].toFixed(4)
            }, b.toString = function() {
                return a.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
            }, b.toFilter = function() {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
            }, b.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)]
            }, b.split = function() {
                var b = {};
                b.dx = this.e, b.dy = this.f;
                var e = [
                    [this.a, this.c],
                    [this.b, this.d]
                ];
                b.scalex = w.sqrt(c(e[0])), d(e[0]), b.shear = e[0][0] * e[1][0] + e[0][1] * e[1][1], e[1] = [e[1][0] - e[0][0] * b.shear, e[1][1] - e[0][1] * b.shear], b.scaley = w.sqrt(c(e[1])), d(e[1]), b.shear /= b.scaley;
                var f = -e[0][1],
                    g = e[1][1];
                g < 0 ? (b.rotate = a.deg(w.acos(g)), f < 0 && (b.rotate = 360 - b.rotate)) : b.rotate = a.deg(w.asin(f)), b.isSimple = !+b.shear.toFixed(9) && (b.scalex.toFixed(9) == b.scaley.toFixed(9) || !b.rotate), b.isSuperSimple = !+b.shear.toFixed(9) && b.scalex.toFixed(9) == b.scaley.toFixed(9) && !b.rotate, b.noRotation = !+b.shear.toFixed(9) && !b.rotate;
                return b
            }, b.toTransformString = function(a) {
                var b = a || this[s]();
                if (b.isSimple) {
                    b.scalex = +b.scalex.toFixed(4), b.scaley = +b.scaley.toFixed(4), b.rotate = +b.rotate.toFixed(4);
                    return (b.dx && b.dy ? "t" + [b.dx, b.dy] : p) + (b.scalex != 1 || b.scaley != 1 ? "s" + [b.scalex, b.scaley, 0, 0] : p) + (b.rotate ? "r" + [b.rotate, 0, 0] : p)
                }
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        }(bQ.prototype);
    var bR = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    navigator.vendor == "Apple Computer, Inc." && (bR && bR[1] < 4 || navigator.platform.slice(0, 2) == "iP") || navigator.vendor == "Google Inc." && bR && bR[1] < 8 ? k.safari = function() {
        var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function() {
            a.remove()
        })
    } : k.safari = bd;
    var bS = function() {
            this.returnValue = !1
        },
        bT = function() {
            return this.originalEvent.preventDefault()
        },
        bU = function() {
            this.cancelBubble = !0
        },
        bV = function() {
            return this.originalEvent.stopPropagation()
        },
        bW = function() {
            if (h.doc.addEventListener) return function(a, b, c, d) {
                var e = o && u[b] ? u[b] : b,
                    f = function(e) {
                        var f = h.doc.documentElement.scrollTop || h.doc.body.scrollTop,
                            i = h.doc.documentElement.scrollLeft || h.doc.body.scrollLeft,
                            j = e.clientX + i,
                            k = e.clientY + f;
                        if (o && u[g](b))
                            for (var l = 0, m = e.targetTouches && e.targetTouches.length; l < m; l++)
                                if (e.targetTouches[l].target == a) {
                                    var n = e;
                                    e = e.targetTouches[l], e.originalEvent = n, e.preventDefault = bT, e.stopPropagation = bV;
                                    break
                                }
                        return c.call(d, e, j, k)
                    };
                a.addEventListener(e, f, !1);
                return function() {
                    a.removeEventListener(e, f, !1);
                    return !0
                }
            };
            if (h.doc.attachEvent) return function(a, b, c, d) {
                var e = function(a) {
                    a = a || h.win.event;
                    var b = h.doc.documentElement.scrollTop || h.doc.body.scrollTop,
                        e = h.doc.documentElement.scrollLeft || h.doc.body.scrollLeft,
                        f = a.clientX + e,
                        g = a.clientY + b;
                    a.preventDefault = a.preventDefault || bS, a.stopPropagation = a.stopPropagation || bU;
                    return c.call(d, a, f, g)
                };
                a.attachEvent("on" + b, e);
                var f = function() {
                    a.detachEvent("on" + b, e);
                    return !0
                };
                return f
            }
        }(),
        bX = [],
        bY = function(a) {
            var b = a.clientX,
                c = a.clientY,
                d = h.doc.documentElement.scrollTop || h.doc.body.scrollTop,
                e = h.doc.documentElement.scrollLeft || h.doc.body.scrollLeft,
                f, g = bX.length;
            while (g--) {
                f = bX[g];
                if (o) {
                    var i = a.touches.length,
                        j;
                    while (i--) {
                        j = a.touches[i];
                        if (j.identifier == f.el._drag.id) {
                            b = j.clientX, c = j.clientY, (a.originalEvent ? a.originalEvent : a).preventDefault();
                            break
                        }
                    }
                } else a.preventDefault();
                var k = f.el.node,
                    l, m = k.nextSibling,
                    n = k.parentNode,
                    p = k.style.display;
                h.win.opera && n.removeChild(k), k.style.display = "none", l = f.el.paper.getElementByPoint(b, c), k.style.display = p, h.win.opera && (m ? n.insertBefore(k, m) : n.appendChild(k)), l && eve("drag.over." + f.el.id, f.el, l), b += e, c += d, eve("drag.move." + f.el.id, f.move_scope || f.el, b - f.el._drag.x, c - f.el._drag.y, b, c, a)
            }
        },
        bZ = function(b) {
            a.unmousemove(bY).unmouseup(bZ);
            var c = bX.length,
                d;
            while (c--) d = bX[c], d.el._drag = {}, eve("drag.end." + d.el.id, d.end_scope || d.start_scope || d.move_scope || d.el, b);
            bX = []
        },
        b$ = a.el = {};
    for (var b_ = t.length; b_--;)(function(b) {
        a[b] = b$[b] = function(c, d) {
            a.is(c, "function") && (this.events = this.events || [], this.events.push({
                name: b,
                f: c,
                unbind: bW(this.shape || this.node || h.doc, b, c, d || this)
            }));
            return this
        }, a["un" + b] = b$["un" + b] = function(a) {
            var c = this.events,
                d = c.length;
            while (d--)
                if (c[d].name == b && c[d].f == a) {
                    c[d].unbind(), c.splice(d, 1), !c.length && delete this.events;
                    return this
                }
            return this
        }
    })(t[b_]);
    b$.data = function(b, c) {
        var d = ba[this.id] = ba[this.id] || {};
        if (arguments.length == 1) {
            if (a.is(b, "object")) {
                for (var e in b) b[g](e) && this.data(e, b[e]);
                return this
            }
            eve("data.get." + this.id, this, d[b], b);
            return d[b]
        }
        d[b] = c, eve("data.set." + this.id, this, c, b);
        return this
    }, b$.removeData = function(a) {
        a == null ? ba[this.id] = {} : ba[this.id] && delete ba[this.id][a];
        return this
    }, b$.hover = function(a, b, c, d) {
        return this.mouseover(a, c).mouseout(b, d || c)
    }, b$.unhover = function(a, b) {
        return this.unmouseover(a).unmouseout(b)
    };
    var ca = [];
    b$.drag = function(b, c, d, e, f, g) {
        function i(i) {
            (i.originalEvent || i).preventDefault();
            var j = h.doc.documentElement.scrollTop || h.doc.body.scrollTop,
                k = h.doc.documentElement.scrollLeft || h.doc.body.scrollLeft;
            this._drag.x = i.clientX + k, this._drag.y = i.clientY + j, this._drag.id = i.identifier, !bX.length && a.mousemove(bY).mouseup(bZ), bX.push({
                el: this,
                move_scope: e,
                start_scope: f,
                end_scope: g
            }), c && eve.on("drag.start." + this.id, c), b && eve.on("drag.move." + this.id, b), d && eve.on("drag.end." + this.id, d), eve("drag.start." + this.id, f || e || this, i.clientX + k, i.clientY + j, i)
        }
        this._drag = {}, ca.push({
            el: this,
            start: i
        }), this.mousedown(i);
        return this
    }, b$.onDragOver = function(a) {
        a ? eve.on("drag.over." + this.id, a) : eve.unbind("drag.over." + this.id)
    }, b$.undrag = function() {
        var b = ca.length;
        while (b--) ca[b].el == this && (this.unmousedown(ca[b].start), ca.splice(b, 1), eve.unbind("drag.*." + this.id));
        !ca.length && a.unmousemove(bY).unmouseup(bZ)
    }, k.circle = function(b, c, d) {
        var e = a._engine.circle(this, b || 0, c || 0, d || 0);
        this.__set__ && this.__set__.push(e);
        return e
    }, k.rect = function(b, c, d, e, f) {
        var g = a._engine.rect(this, b || 0, c || 0, d || 0, e || 0, f || 0);
        this.__set__ && this.__set__.push(g);
        return g
    }, k.ellipse = function(b, c, d, e) {
        var f = a._engine.ellipse(this, b || 0, c || 0, d || 0, e || 0);
        this.__set__ && this.__set__.push(f);
        return f
    }, k.path = function(b) {
        b && !a.is(b, D) && !a.is(b[0], E) && (b += p);
        var c = a._engine.path(a.format[m](a, arguments), this);
        this.__set__ && this.__set__.push(c);
        return c
    }, k.image = function(b, c, d, e, f) {
        var g = a._engine.image(this, b || "about:blank", c || 0, d || 0, e || 0, f || 0);
        this.__set__ && this.__set__.push(g);
        return g
    }, k.text = function(b, c, d) {
        var e = a._engine.text(this, b || 0, c || 0, r(d));
        this.__set__ && this.__set__.push(e);
        return e
    }, k.set = function(b) {
        !a.is(b, "array") && (b = Array.prototype.splice.call(arguments, 0, arguments.length));
        var c = new cs(b);
        this.__set__ && this.__set__.push(c);
        return c
    }, k.setStart = function(a) {
        this.__set__ = a || this.set()
    }, k.setFinish = function(a) {
        var b = this.__set__;
        delete this.__set__;
        return b
    }, k.setSize = function(b, c) {
        return a._engine.setSize.call(this, b, c)
    }, k.setViewBox = function(b, c, d, e, f) {
        return a._engine.setViewBox.call(this, b, c, d, e, f)
    }, k.top = k.bottom = null, k.raphael = a;
    var cb = function(a) {
        var b = a.getBoundingClientRect(),
            c = a.ownerDocument,
            d = c.body,
            e = c.documentElement,
            f = e.clientTop || d.clientTop || 0,
            g = e.clientLeft || d.clientLeft || 0,
            i = b.top + (h.win.pageYOffset || e.scrollTop || d.scrollTop) - f,
            j = b.left + (h.win.pageXOffset || e.scrollLeft || d.scrollLeft) - g;
        return {
            y: i,
            x: j
        }
    };
    k.getElementByPoint = function(a, b) {
        var c = this,
            d = c.canvas,
            e = h.doc.elementFromPoint(a, b);
        if (h.win.opera && e.tagName == "svg") {
            var f = cb(d),
                g = d.createSVGRect();
            g.x = a - f.x, g.y = b - f.y, g.width = g.height = 1;
            var i = d.getIntersectionList(g, null);
            i.length && (e = i[i.length - 1])
        }
        if (!e) return null;
        while (e.parentNode && e != d.parentNode && !e.raphael) e = e.parentNode;
        e == c.canvas.parentNode && (e = d), e = e && e.raphael ? c.getById(e.raphaelid) : null;
        return e
    }, k.getById = function(a) {
        var b = this.bottom;
        while (b) {
            if (b.id == a) return b;
            b = b.next
        }
        return null
    }, k.forEach = function(a, b) {
        var c = this.bottom;
        while (c) {
            if (a.call(b, c) === !1) return this;
            c = c.next
        }
        return this
    }, b$.getBBox = function(a) {
        if (this.removed) return {};
        var b = this._;
        if (a) {
            if (b.dirty || !b.bboxwt) this.realPath = bh[this.type](this), b.bboxwt = bx(this.realPath), b.bboxwt.toString = cd, b.dirty = 0;
            return b.bboxwt
        }
        if (b.dirty || b.dirtyT || !b.bbox) {
            if (b.dirty || !this.realPath) b.bboxwt = 0, this.realPath = bh[this.type](this);
            b.bbox = bx(bi(this.realPath, this.matrix)), b.bbox.toString = cd, b.dirty = b.dirtyT = 0
        }
        return b.bbox
    }, b$.clone = function() {
        if (this.removed) return null;
        var a = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(a);
        return a
    }, b$.glow = function(a) {
        if (this.type == "text") return null;
        a = a || {};
        var b = {
                width: (a.width || 10) + (+this.attr("stroke-width") || 1),
                fill: a.fill || !1,
                opacity: a.opacity || .5,
                offsetx: a.offsetx || 0,
                offsety: a.offsety || 0,
                color: a.color || "#000"
            },
            c = b.width / 2,
            d = this.paper,
            e = d.set(),
            f = this.realPath || bh[this.type](this);
        f = this.matrix ? bi(f, this.matrix) : f;
        for (var g = 1; g < c + 1; g++) e.push(d.path(f).attr({
            stroke: b.color,
            fill: b.fill ? b.color : "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
            "stroke-width": +(b.width / c * g).toFixed(3),
            opacity: +(b.opacity / c).toFixed(3)
        }));
        return e.insertBefore(this).translate(b.offsetx, b.offsety)
    };
    var ce = {},
        cf = function(b, c, d, e, f, g, h, i, j) {
            var k = 0,
                l = 100,
                m = [b, c, d, e, f, g, h, i].join(),
                n = ce[m],
                o, p;
            !n && (ce[m] = n = {
                data: []
            }), n.timer && clearTimeout(n.timer), n.timer = setTimeout(function() {
                delete ce[m]
            }, 2e3);
            if (j != null && !n.precision) {
                var q = cf(b, c, d, e, f, g, h, i);
                n.precision = ~~q * 10, n.data = []
            }
            l = n.precision || l;
            for (var r = 0; r < l + 1; r++) {
                n.data[r * l] ? p = n.data[r * l] : (p = a.findDotsAtSegment(b, c, d, e, f, g, h, i, r / l), n.data[r * l] = p), r && (k += A(A(o.x - p.x, 2) + A(o.y - p.y, 2), .5));
                if (j != null && k >= j) return p;
                o = p
            }
            if (j == null) return k
        },
        cg = function(b, c) {
            return function(d, e, f) {
                d = bG(d);
                var g, h, i, j, k = "",
                    l = {},
                    m, n = 0;
                for (var o = 0, p = d.length; o < p; o++) {
                    i = d[o];
                    if (i[0] == "M") g = +i[1], h = +i[2];
                    else {
                        j = cf(g, h, i[1], i[2], i[3], i[4], i[5], i[6]);
                        if (n + j > e) {
                            if (c && !l.start) {
                                m = cf(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n), k += ["C" + m.start.x, m.start.y, m.m.x, m.m.y, m.x, m.y];
                                if (f) return k;
                                l.start = k, k = ["M" + m.x, m.y + "C" + m.n.x, m.n.y, m.end.x, m.end.y, i[5], i[6]].join(), n += j, g = +i[5], h = +i[6];
                                continue
                            }
                            if (!b && !c) {
                                m = cf(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n);
                                return {
                                    x: m.x,
                                    y: m.y,
                                    alpha: m.alpha
                                }
                            }
                        }
                        n += j, g = +i[5], h = +i[6]
                    }
                    k += i.shift() + i
                }
                l.end = k, m = b ? n : c ? l : a.findDotsAtSegment(g, h, i[0], i[1], i[2], i[3], i[4], i[5], 1), m.alpha && (m = {
                    x: m.x,
                    y: m.y,
                    alpha: m.alpha
                });
                return m
            }
        },
        ch = cg(1),
        ci = cg(),
        cj = cg(0, 1);
    a.getTotalLength = ch, a.getPointAtLength = ci, a.getSubpath = function(a, b, c) {
        if (this.getTotalLength(a) - c < 1e-6) return cj(a, b).end;
        var d = cj(a, c, 1);
        return b ? cj(d, b).end : d
    }, b$.getTotalLength = function() {
        if (this.type == "path") {
            if (this.node.getTotalLength) return this.node.getTotalLength();
            return ch(this.attrs.path)
        }
    }, b$.getPointAtLength = function(a) {
        if (this.type == "path") return ci(this.attrs.path, a)
    }, b$.getSubpath = function(b, c) {
        if (this.type == "path") return a.getSubpath(this.attrs.path, b, c)
    };
    var ck = a.easing_formulas = {
        linear: function(a) {
            return a
        },
        "<": function(a) {
            return A(a, 1.7)
        },
        ">": function(a) {
            return A(a, .48)
        },
        "<>": function(a) {
            var b = .48 - a / 1.04,
                c = w.sqrt(.1734 + b * b),
                d = c - b,
                e = A(z(d), 1 / 3) * (d < 0 ? -1 : 1),
                f = -c - b,
                g = A(z(f), 1 / 3) * (f < 0 ? -1 : 1),
                h = e + g + .5;
            return (1 - h) * 3 * h * h + h * h * h
        },
        backIn: function(a) {
            var b = 1.70158;
            return a * a * ((b + 1) * a - b)
        },
        backOut: function(a) {
            a = a - 1;
            var b = 1.70158;
            return a * a * ((b + 1) * a + b) + 1
        },
        elastic: function(a) {
            if (a == !!a) return a;
            return A(2, -10 * a) * w.sin((a - .075) * 2 * B / .3) + 1
        },
        bounce: function(a) {
            var b = 7.5625,
                c = 2.75,
                d;
            a < 1 / c ? d = b * a * a : a < 2 / c ? (a -= 1.5 / c, d = b * a * a + .75) : a < 2.5 / c ? (a -= 2.25 / c, d = b * a * a + .9375) : (a -= 2.625 / c, d = b * a * a + .984375);
            return d
        }
    };
    ck.easeIn = ck["ease-in"] = ck["<"], ck.easeOut = ck["ease-out"] = ck[">"], ck.easeInOut = ck["ease-in-out"] = ck["<>"], ck["back-in"] = ck.backIn, ck["back-out"] = ck.backOut;
    var cl = [],
        cm = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            setTimeout(a, 16)
        },
        cn = function() {
            var b = +(new Date),
                c = 0;
            for (; c < cl.length; c++) {
                var d = cl[c];
                if (d.el.removed || d.paused) continue;
                var e = b - d.start,
                    f = d.ms,
                    h = d.easing,
                    i = d.from,
                    j = d.diff,
                    k = d.to,
                    l = d.t,
                    m = d.el,
                    o = {},
                    p, r = {},
                    s;
                d.initstatus ? (e = (d.initstatus * d.anim.top - d.prev) / (d.percent - d.prev) * f, d.status = d.initstatus, delete d.initstatus, d.stop && cl.splice(c--, 1)) : d.status = (d.prev + (d.percent - d.prev) * (e / f)) / d.anim.top;
                if (e < 0) continue;
                if (e < f) {
                    var t = h(e / f);
                    for (var u in i)
                        if (i[g](u)) {
                            switch (U[u]) {
                                case C:
                                    p = +i[u] + t * f * j[u];
                                    break;
                                case "colour":
                                    p = "rgb(" + [co(O(i[u].r + t * f * j[u].r)), co(O(i[u].g + t * f * j[u].g)), co(O(i[u].b + t * f * j[u].b))].join(",") + ")";
                                    break;
                                case "path":
                                    p = [];
                                    for (var v = 0, w = i[u].length; v < w; v++) {
                                        p[v] = [i[u][v][0]];
                                        for (var x = 1, y = i[u][v].length; x < y; x++) p[v][x] = +i[u][v][x] + t * f * j[u][v][x];
                                        p[v] = p[v].join(q)
                                    }
                                    p = p.join(q);
                                    break;
                                case "transform":
                                    if (j[u].real) {
                                        p = [];
                                        for (v = 0, w = i[u].length; v < w; v++) {
                                            p[v] = [i[u][v][0]];
                                            for (x = 1, y = i[u][v].length; x < y; x++) p[v][x] = i[u][v][x] + t * f * j[u][v][x]
                                        }
                                    } else {
                                        var z = function(a) {
                                            return +i[u][a] + t * f * j[u][a]
                                        };
                                        p = [
                                            ["m", z(0), z(1), z(2), z(3), z(4), z(5)]
                                        ]
                                    }
                                    break;
                                case "csv":
                                    if (u == "clip-rect") {
                                        p = [], v = 4;
                                        while (v--) p[v] = +i[u][v] + t * f * j[u][v]
                                    }
                                    break;
                                default:
                                    var A = [][n](i[u]);
                                    p = [], v = m.paper.customAttributes[u].length;
                                    while (v--) p[v] = +A[v] + t * f * j[u][v]
                            }
                            o[u] = p
                        }
                    m.attr(o),
                        function(a, b, c) {
                            setTimeout(function() {
                                eve("anim.frame." + a, b, c)
                            })
                        }(m.id, m, d.anim)
                } else {
                    (function(b, c, d) {
                        setTimeout(function() {
                            eve("anim.frame." + c.id, c, d), eve("anim.finish." + c.id, c, d), a.is(b, "function") && b.call(c)
                        })
                    })(d.callback, m, d.anim), m.attr(k), cl.splice(c--, 1);
                    if (d.repeat > 1 && !d.next) {
                        for (s in k) k[g](s) && (r[s] = d.totalOrigin[s]);
                        d.el.attr(r), cr(d.anim, d.el, d.anim.percents[0], null, d.totalOrigin, d.repeat - 1)
                    }
                    d.next && !d.stop && cr(d.anim, d.el, d.next, null, d.totalOrigin, d.repeat)
                }
            }
            a.svg && m && m.paper && m.paper.safari(), cl.length && cm(cn)
        },
        co = function(a) {
            return a > 255 ? 255 : a < 0 ? 0 : a
        };
    b$.animateWith = function(b, c, d, e, f, g) {
        var h = d ? a.animation(d, e, f, g) : c,
            i = b.status(c);
        return this.animate(h).status(h, i * c.ms / h.ms)
    }, b$.onAnimation = function(a) {
        a ? eve.on("anim.frame." + this.id, a) : eve.unbind("anim.frame." + this.id);
        return this
    }, cq.prototype.delay = function(a) {
        var b = new cq(this.anim, this.ms);
        b.times = this.times, b.del = +a || 0;
        return b
    }, cq.prototype.repeat = function(a) {
        var b = new cq(this.anim, this.ms);
        b.del = this.del, b.times = w.floor(x(a, 0)) || 1;
        return b
    }, a.animation = function(b, c, d, e) {
        if (b instanceof cq) return b;
        if (a.is(d, "function") || !d) e = e || d || null, d = null;
        b = Object(b), c = +c || 0;
        var f = {},
            h, i;
        for (i in b) b[g](i) && Q(i) != i && Q(i) + "%" != i && (h = !0, f[i] = b[i]);
        if (!h) return new cq(b, c);
        d && (f.easing = d), e && (f.callback = e);
        return new cq({
            100: f
        }, c)
    }, b$.animate = function(b, c, d, e) {
        var f = this;
        if (f.removed) {
            e && e.call(f);
            return f
        }
        var g = b instanceof cq ? b : a.animation(b, c, d, e);
        cr(g, f, g.percents[0], null, f.attr());
        return f
    }, b$.setTime = function(a, b) {
        a && b != null && this.status(a, y(b, a.ms) / a.ms);
        return this
    }, b$.status = function(a, b) {
        var c = [],
            d = 0,
            e, f;
        if (b != null) {
            cr(a, this, -1, y(b, 1));
            return this
        }
        e = cl.length;
        for (; d < e; d++) {
            f = cl[d];
            if (f.el.id == this.id && (!a || f.anim == a)) {
                if (a) return f.status;
                c.push({
                    anim: f.anim,
                    status: f.status
                })
            }
        }
        if (a) return 0;
        return c
    }, b$.pause = function(a) {
        for (var b = 0; b < cl.length; b++) cl[b].el.id == this.id && (!a || cl[b].anim == a) && eve("anim.pause." + this.id, this, cl[b].anim) !== !1 && (cl[b].paused = !0);
        return this
    }, b$.resume = function(a) {
        for (var b = 0; b < cl.length; b++)
            if (cl[b].el.id == this.id && (!a || cl[b].anim == a)) {
                var c = cl[b];
                eve("anim.resume." + this.id, this, c.anim) !== !1 && (delete c.paused, this.status(c.anim, c.status))
            }
        return this
    }, b$.stop = function(a) {
        for (var b = 0; b < cl.length; b++) cl[b].el.id == this.id && (!a || cl[b].anim == a) && eve("anim.stop." + this.id, this, cl[b].anim) !== !1 && cl.splice(b--, 1);
        return this
    }, b$.toString = function() {
        return "¡¯s object"
    };
    var cs = function(a) {
            this.items = [], this.length = 0, this.type = "set";
            if (a)
                for (var b = 0, c = a.length; b < c; b++) a[b] && (a[b].constructor == b$.constructor || a[b].constructor == cs) && (this[this.items.length] = this.items[this.items.length] = a[b], this.length++)
        },
        ct = cs.prototype;
    ct.push = function() {
        var a, b;
        for (var c = 0, d = arguments.length; c < d; c++) a = arguments[c], a && (a.constructor == b$.constructor || a.constructor == cs) && (b = this.items.length, this[b] = this.items[b] = a, this.length++);
        return this
    }, ct.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop()
    }, ct.forEach = function(a, b) {
        for (var c = 0, d = this.items.length; c < d; c++)
            if (a.call(b, this.items[c], c) === !1) return this;
        return this
    };
    for (var cu in b$) b$[g](cu) && (ct[cu] = function(a) {
        return function() {
            var b = arguments;
            return this.forEach(function(c) {
                c[a][m](c, b)
            })
        }
    }(cu));
    ct.attr = function(b, c) {
            if (b && a.is(b, E) && a.is(b[0], "object"))
                for (var d = 0, e = b.length; d < e; d++) this.items[d].attr(b[d]);
            else
                for (var f = 0, g = this.items.length; f < g; f++) this.items[f].attr(b, c);
            return this
        }, ct.clear = function() {
            while (this.length) this.pop()
        }, ct.splice = function(a, b, c) {
            a = a < 0 ? x(this.length + a, 0) : a, b = x(0, y(this.length - a, b));
            var d = [],
                e = [],
                f = [],
                g;
            for (g = 2; g < arguments.length; g++) f.push(arguments[g]);
            for (g = 0; g < b; g++) e.push(this[a + g]);
            for (; g < this.length - a; g++) d.push(this[a + g]);
            var h = f.length;
            for (g = 0; g < h + d.length; g++) this.items[a + g] = this[a + g] = g < h ? f[g] : d[g - h];
            g = this.items.length = this.length -= b - h;
            while (this[g]) delete this[g++];
            return new cs(e)
        }, ct.exclude = function(a) {
            for (var b = 0, c = this.length; b < c; b++)
                if (this[b] == a) {
                    this.splice(b, 1);
                    return !0
                }
        }, ct.animate = function(b, c, d, e) {
            (a.is(d, "function") || !d) && (e = d || null);
            var f = this.items.length,
                g = f,
                h, i = this,
                j;
            if (!f) return this;
            e && (j = function() {
                !--f && e.call(i)
            }), d = a.is(d, D) ? d : j;
            var k = a.animation(b, c, d, j);
            h = this.items[--g].animate(k);
            while (g--) this.items[g] && !this.items[g].removed && this.items[g].animateWith(h, k);
            return this
        }, ct.insertAfter = function(a) {
            var b = this.items.length;
            while (b--) this.items[b].insertAfter(a);
            return this
        }, ct.getBBox = function() {
            var a = [],
                b = [],
                c = [],
                d = [];
            for (var e = this.items.length; e--;)
                if (!this.items[e].removed) {
                    var f = this.items[e].getBBox();
                    a.push(f.x), b.push(f.y), c.push(f.x + f.width), d.push(f.y + f.height)
                }
            a = y[m](0, a), b = y[m](0, b);
            return {
                x: a,
                y: b,
                width: x[m](0, c) - a,
                height: x[m](0, d) - b
            }
        }, ct.clone = function(a) {
            a = new cs;
            for (var b = 0, c = this.items.length; b < c; b++) a.push(this.items[b].clone());
            return a
        }, ct.toString = function() {
            return "¡®s set"
        }, a.registerFont = function(a) {
            if (!a.face) return a;
            this.fonts = this.fonts || {};
            var b = {
                    w: a.w,
                    face: {},
                    glyphs: {}
                },
                c = a.face["font-family"];
            for (var d in a.face) a.face[g](d) && (b.face[d] = a.face[d]);
            this.fonts[c] ? this.fonts[c].push(b) : this.fonts[c] = [b];
            if (!a.svg) {
                b.face["units-per-em"] = R(a.face["units-per-em"], 10);
                for (var e in a.glyphs)
                    if (a.glyphs[g](e)) {
                        var f = a.glyphs[e];
                        b.glyphs[e] = {
                            w: f.w,
                            k: {},
                            d: f.d && "M" + f.d.replace(/[mlcxtrv]/g, function(a) {
                                return {
                                    l: "L",
                                    c: "C",
                                    x: "z",
                                    t: "m",
                                    r: "l",
                                    v: "c"
                                }[a] || "M"
                            }) + "z"
                        };
                        if (f.k)
                            for (var h in f.k) f[g](h) && (b.glyphs[e].k[h] = f.k[h])
                    }
            }
            return a
        }, k.getFont = function(b, c, d, e) {
            e = e || "normal", d = d || "normal", c = +c || {
                normal: 400,
                bold: 700,
                lighter: 300,
                bolder: 800
            }[c] || 400;
            if (!!a.fonts) {
                var f = a.fonts[b];
                if (!f) {
                    var h = new RegExp("(^|\\s)" + b.replace(/[^\w\d\s+!~.:_-]/g, p) + "(\\s|$)", "i");
                    for (var i in a.fonts)
                        if (a.fonts[g](i) && h.test(i)) {
                            f = a.fonts[i];
                            break
                        }
                }
                var j;
                if (f)
                    for (var k = 0, l = f.length; k < l; k++) {
                        j = f[k];
                        if (j.face["font-weight"] == c && (j.face["font-style"] == d || !j.face["font-style"]) && j.face["font-stretch"] == e) break
                    }
                return j
            }
        }, k.print = function(b, d, e, f, g, h, i) {
            h = h || "middle", i = x(y(i || 0, 1), -1);
            var j = this.set(),
                k = r(e)[s](p),
                l = 0,
                m = p,
                n;
            a.is(f, e) && (f = this.getFont(f));
            if (f) {
                n = (g || 16) / f.face["units-per-em"];
                var o = f.face.bbox[s](c),
                    q = +o[0],
                    t = +o[1] + (h == "baseline" ? o[3] - o[1] + +f.face.descent : (o[3] - o[1]) / 2);
                for (var u = 0, v = k.length; u < v; u++) {
                    var w = u && f.glyphs[k[u - 1]] || {},
                        z = f.glyphs[k[u]];
                    l += u ? (w.w || f.w) + (w.k && w.k[k[u]] || 0) + f.w * i : 0, z && z.d && j.push(this.path(z.d).attr({
                        fill: "#000",
                        stroke: "none",
                        transform: [
                            ["t", l * n, 0]
                        ]
                    }))
                }
                j.transform(["...s", n, n, q, t, "t", (b - q) / n, (d - t) / n])
            }
            return j
        }, k.add = function(b) {
            if (a.is(b, "array")) {
                var c = this.set(),
                    e = 0,
                    f = b.length,
                    h;
                for (; e < f; e++) h = b[e] || {}, d[g](h.type) && c.push(this[h.type]().attr(h))
            }
            return c
        }, a.format = function(b, c) {
            var d = a.is(c, E) ? [0][n](c) : arguments;
            b && a.is(b, D) && d.length - 1 && (b = b.replace(e, function(a, b) {
                return d[++b] == null ? p : d[b]
            }));
            return b || p
        }, a.fullfill = function() {
            var a = /\{([^\}]+)\}/g,
                b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                c = function(a, c, d) {
                    var e = d;
                    c.replace(b, function(a, b, c, d, f) {
                        b = b || d, e && (b in e && (e = e[b]), typeof e == "function" && f && (e = e()))
                    }), e = (e == null || e == d ? a : e) + "";
                    return e
                };
            return function(b, d) {
                return String(b).replace(a, function(a, b) {
                    return c(a, b, d)
                })
            }
        }(), a.ninja = function() {
            i.was ? h.win.Raphael = i.is : delete Raphael;
            return a
        }, a.st = ct,
        function(b, c, d) {
            function e() {
                /in/.test(b.readyState) ? setTimeout(e, 9) : a.eve("DOMload")
            }
            b.readyState == null && b.addEventListener && (b.addEventListener(c, d = function() {
                b.removeEventListener(c, d, !1), b.readyState = "complete"
            }, !1), b.readyState = "loading"), e()
        }(document, "DOMContentLoaded"), i.was ? h.win.Raphael = a : Raphael = a, eve.on("DOMload", function() {
            b = !0
        })
}(), window.Raphael.svg && function(a) {
    var b = "hasOwnProperty",
        c = String,
        d = parseFloat,
        e = parseInt,
        f = Math,
        g = f.max,
        h = f.abs,
        i = f.pow,
        j = /[, ]+/,
        k = a.eve,
        l = "",
        m = " ",
        n = "http://www.w3.org/1999/xlink",
        o = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        p = {};
    a.toString = function() {
        return "Your browser supports SVG.\nYou are running  " + this.version
    };
    var q = function(d, e) {
            if (e) {
                typeof d == "string" && (d = q(d));
                for (var f in e) e[b](f) && (f.substring(0, 6) == "xlink:" ? d.setAttributeNS(n, f.substring(6), c(e[f])) : d.setAttribute(f, c(e[f])))
            } else d = a._g.doc.createElementNS("http://www.w3.org/2000/svg", d), d.style && (d.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            return d
        },
        r = function(b, e) {
            var j = "linear",
                k = b.id + e,
                m = .5,
                n = .5,
                o = b.node,
                p = b.paper,
                r = o.style,
                s = a._g.doc.getElementById(k);
            if (!s) {
                e = c(e).replace(a._radial_gradient, function(a, b, c) {
                    j = "radial";
                    if (b && c) {
                        m = d(b), n = d(c);
                        var e = (n > .5) * 2 - 1;
                        i(m - .5, 2) + i(n - .5, 2) > .25 && (n = f.sqrt(.25 - i(m - .5, 2)) * e + .5) && n != .5 && (n = n.toFixed(5) - 1e-5 * e)
                    }
                    return l
                }), e = e.split(/\s*\-\s*/);
                if (j == "linear") {
                    var t = e.shift();
                    t = -d(t);
                    if (isNaN(t)) return null;
                    var u = [0, 0, f.cos(a.rad(t)), f.sin(a.rad(t))],
                        v = 1 / (g(h(u[2]), h(u[3])) || 1);
                    u[2] *= v, u[3] *= v, u[2] < 0 && (u[0] = -u[2], u[2] = 0), u[3] < 0 && (u[1] = -u[3], u[3] = 0)
                }
                var w = a._parseDots(e);
                if (!w) return null;
                k = k.replace(/[\(\)\s,\xb0#]/g, "_"), b.gradient && k != b.gradient.id && (p.defs.removeChild(b.gradient), delete b.gradient);
                if (!b.gradient) {
                    s = q(j + "Gradient", {
                        id: k
                    }), b.gradient = s, q(s, j == "radial" ? {
                        fx: m,
                        fy: n
                    } : {
                        x1: u[0],
                        y1: u[1],
                        x2: u[2],
                        y2: u[3],
                        gradientTransform: b.matrix.invert()
                    }), p.defs.appendChild(s);
                    for (var x = 0, y = w.length; x < y; x++) s.appendChild(q("stop", {
                        offset: w[x].offset ? w[x].offset : x ? "100%" : "0%",
                        "stop-color": w[x].color || "#fff"
                    }))
                }
            }
            q(o, {
                fill: "url(#" + k + ")",
                opacity: 1,
                "fill-opacity": 1
            }), r.fill = l, r.opacity = 1, r.fillOpacity = 1;
            return 1
        },
        s = function(a) {
            var b = a.getBBox(1);
            q(a.pattern, {
                patternTransform: a.matrix.invert() + " translate(" + b.x + "," + b.y + ")"
            })
        },
        t = function(d, e, f) {
            if (d.type == "path") {
                var g = c(e).toLowerCase().split("-"),
                    h = d.paper,
                    i = f ? "end" : "start",
                    j = d.node,
                    k = d.attrs,
                    l = k["stroke-width"],
                    n = g.length,
                    r = "classic",
                    s, t, u, v, w, x = 3,
                    y = 3,
                    z = 5;
                while (n--) switch (g[n]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        r = g[n];
                        break;
                    case "wide":
                        y = 5;
                        break;
                    case "narrow":
                        y = 2;
                        break;
                    case "long":
                        x = 5;
                        break;
                    case "short":
                        x = 2
                }
                r == "open" ? (x += 2, y += 2, z += 2, u = 1, v = f ? 4 : 1, w = {
                    fill: "none",
                    stroke: k.stroke
                }) : (v = u = x / 2, w = {
                    fill: k.stroke,
                    stroke: "none"
                }), d._.arrows ? f ? (d._.arrows.endPath && p[d._.arrows.endPath] --, d._.arrows.endMarker && p[d._.arrows.endMarker] --) : (d._.arrows.startPath && p[d._.arrows.startPath] --, d._.arrows.startMarker && p[d._.arrows.startMarker] --) : d._.arrows = {};
                if (r != "none") {
                    var A = "raphael-marker-" + r,
                        B = "raphael-marker-" + i + r + x + y;
                    a._g.doc.getElementById(A) ? p[A] ++ : (h.defs.appendChild(q(q("path"), {
                        "stroke-linecap": "round",
                        d: o[r],
                        id: A
                    })), p[A] = 1);
                    var C = a._g.doc.getElementById(B),
                        D;
                    C ? (p[B] ++, D = C.getElementsByTagName("use")[0]) : (C = q(q("marker"), {
                        id: B,
                        markerHeight: y,
                        markerWidth: x,
                        orient: "auto",
                        refX: v,
                        refY: y / 2
                    }), D = q(q("use"), {
                        "xlink:href": "#" + A,
                        transform: (f ? " rotate(180 " + x / 2 + " " + y / 2 + ") " : m) + "scale(" + x / z + "," + y / z + ")",
                        "stroke-width": 1 / ((x / z + y / z) / 2)
                    }), C.appendChild(D), h.defs.appendChild(C), p[B] = 1), q(D, w);
                    var E = u * (r != "diamond" && r != "oval");
                    f ? (s = d._.arrows.startdx * l || 0, t = a.getTotalLength(k.path) - E * l) : (s = E * l, t = a.getTotalLength(k.path) - (d._.arrows.enddx * l || 0)), w = {}, w["marker-" + i] = "url(#" + B + ")";
                    if (t || s) w.d = Raphael.getSubpath(k.path, s, t);
                    q(j, w), d._.arrows[i + "Path"] = A, d._.arrows[i + "Marker"] = B, d._.arrows[i + "dx"] = E, d._.arrows[i + "Type"] = r, d._.arrows[i + "String"] = e
                } else f ? (s = d._.arrows.startdx * l || 0, t = a.getTotalLength(k.path) - s) : (s = 0, t = a.getTotalLength(k.path) - (d._.arrows.enddx * l || 0)), d._.arrows[i + "Path"] && q(j, {
                    d: Raphael.getSubpath(k.path, s, t)
                }), delete d._.arrows[i + "Path"], delete d._.arrows[i + "Marker"], delete d._.arrows[i + "dx"], delete d._.arrows[i + "Type"], delete d._.arrows[i + "String"];
                for (w in p)
                    if (p[b](w) && !p[w]) {
                        var F = a._g.doc.getElementById(w);
                        F && F.parentNode.removeChild(F)
                    }
            }
        },
        u = {
            "": [0],
            none: [0],
            "-": [3, 1],
            ".": [1, 1],
            "-.": [3, 1, 1, 1],
            "-..": [3, 1, 1, 1, 1, 1],
            ". ": [1, 3],
            "- ": [4, 3],
            "--": [8, 3],
            "- .": [4, 3, 1, 3],
            "--.": [8, 3, 1, 3],
            "--..": [8, 3, 1, 3, 1, 3]
        },
        v = function(a, b, d) {
            b = u[c(b).toLowerCase()];
            if (b) {
                var e = a.attrs["stroke-width"] || "1",
                    f = {
                        round: e,
                        square: e,
                        butt: 0
                    }[a.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0,
                    g = [],
                    h = b.length;
                while (h--) g[h] = b[h] * e + (h % 2 ? 1 : -1) * f;
                q(a.node, {
                    "stroke-dasharray": g.join(",")
                })
            }
        },
        w = function(d, f) {
            var i = d.node,
                k = d.attrs,
                m = i.style.visibility;
            i.style.visibility = "hidden";
            for (var o in f)
                if (f[b](o)) {
                    if (!a._availableAttrs[b](o)) continue;
                    var p = f[o];
                    k[o] = p;
                    switch (o) {
                        case "blur":
                            d.blur(p);
                            break;
                        case "href":
                        case "title":
                        case "target":
                            var u = i.parentNode;
                            if (u.tagName.toLowerCase() != "a") {
                                var w = q("a");
                                u.insertBefore(w, i), w.appendChild(i), u = w
                            }
                            o == "target" && p == "blank" ? u.setAttributeNS(n, "show", "new") : u.setAttributeNS(n, o, p);
                            break;
                        case "cursor":
                            i.style.cursor = p;
                            break;
                        case "transform":
                            d.transform(p);
                            break;
                        case "arrow-start":
                            t(d, p);
                            break;
                        case "arrow-end":
                            t(d, p, 1);
                            break;
                        case "clip-rect":
                            var x = c(p).split(j);
                            if (x.length == 4) {
                                d.clip && d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);
                                var z = q("clipPath"),
                                    A = q("rect");
                                z.id = a.createUUID(), q(A, {
                                    x: x[0],
                                    y: x[1],
                                    width: x[2],
                                    height: x[3]
                                }), z.appendChild(A), d.paper.defs.appendChild(z), q(i, {
                                    "clip-path": "url(#" + z.id + ")"
                                }), d.clip = A
                            }
                            if (!p) {
                                var B = i.getAttribute("clip-path");
                                if (B) {
                                    var C = a._g.doc.getElementById(B.replace(/(^url\(#|\)$)/g, l));
                                    C && C.parentNode.removeChild(C), q(i, {
                                        "clip-path": l
                                    }), delete d.clip
                                }
                            }
                            break;
                        case "path":
                            d.type == "path" && (q(i, {
                                d: p ? k.path = a._pathToAbsolute(p) : "M0,0"
                            }), d._.dirty = 1, d._.arrows && ("startString" in d._.arrows && t(d, d._.arrows.startString), "endString" in d._.arrows && t(d, d._.arrows.endString, 1)));
                            break;
                        case "width":
                            i.setAttribute(o, p), d._.dirty = 1;
                            if (k.fx) o = "x", p = k.x;
                            else break;
                        case "x":
                            k.fx && (p = -k.x - (k.width || 0));
                        case "rx":
                            if (o == "rx" && d.type == "rect") break;
                        case "cx":
                            i.setAttribute(o, p), d.pattern && s(d), d._.dirty = 1;
                            break;
                        case "height":
                            i.setAttribute(o, p), d._.dirty = 1;
                            if (k.fy) o = "y", p = k.y;
                            else break;
                        case "y":
                            k.fy && (p = -k.y - (k.height || 0));
                        case "ry":
                            if (o == "ry" && d.type == "rect") break;
                        case "cy":
                            i.setAttribute(o, p), d.pattern && s(d), d._.dirty = 1;
                            break;
                        case "r":
                            d.type == "rect" ? q(i, {
                                rx: p,
                                ry: p
                            }) : i.setAttribute(o, p), d._.dirty = 1;
                            break;
                        case "src":
                            d.type == "image" && i.setAttributeNS(n, "href", p);
                            break;
                        case "stroke-width":
                            if (d._.sx != 1 || d._.sy != 1) p /= g(h(d._.sx), h(d._.sy)) || 1;
                            d.paper._vbSize && (p *= d.paper._vbSize), i.setAttribute(o, p), k["stroke-dasharray"] && v(d, k["stroke-dasharray"], f), d._.arrows && ("startString" in d._.arrows && t(d, d._.arrows.startString), "endString" in d._.arrows && t(d, d._.arrows.endString, 1));
                            break;
                        case "stroke-dasharray":
                            v(d, p, f);
                            break;
                        case "fill":
                            var D = c(p).match(a._ISURL);
                            if (D) {
                                z = q("pattern");
                                var F = q("image");
                                z.id = a.createUUID(), q(z, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    }), q(F, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": D[1]
                                    }), z.appendChild(F),
                                    function(b) {
                                        a._preload(D[1], function() {
                                            var a = this.offsetWidth,
                                                c = this.offsetHeight;
                                            q(b, {
                                                width: a,
                                                height: c
                                            }), q(F, {
                                                width: a,
                                                height: c
                                            }), d.paper.safari()
                                        })
                                    }(z), d.paper.defs.appendChild(z), i.style.fill = "url(#" + z.id + ")", q(i, {
                                        fill: "url(#" + z.id + ")"
                                    }), d.pattern = z, d.pattern && s(d);
                                break
                            }
                            var G = a.getRGB(p);
                            if (!G.error) delete f.gradient, delete k.gradient, !a.is(k.opacity, "undefined") && a.is(f.opacity, "undefined") && q(i, {
                                opacity: k.opacity
                            }), !a.is(k["fill-opacity"], "undefined") && a.is(f["fill-opacity"], "undefined") && q(i, {
                                "fill-opacity": k["fill-opacity"]
                            });
                            else if ((d.type == "circle" || d.type == "ellipse" || c(p).charAt() != "r") && r(d, p)) {
                                if ("opacity" in k || "fill-opacity" in k) {
                                    var H = a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g, l));
                                    if (H) {
                                        var I = H.getElementsByTagName("stop");
                                        q(I[I.length - 1], {
                                            "stop-opacity": ("opacity" in k ? k.opacity : 1) * ("fill-opacity" in k ? k["fill-opacity"] : 1)
                                        })
                                    }
                                }
                                k.gradient = p, k.fill = "none";
                                break
                            }
                            G[b]("opacity") && q(i, {
                                "fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
                            });
                        case "stroke":
                            G = a.getRGB(p), i.setAttribute(o, G.hex), o == "stroke" && G[b]("opacity") && q(i, {
                                "stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
                            }), o == "stroke" && d._.arrows && ("startString" in d._.arrows && t(d, d._.arrows.startString), "endString" in d._.arrows && t(d, d._.arrows.endString, 1));
                            break;
                        case "gradient":
                            (d.type == "circle" || d.type == "ellipse" || c(p).charAt() != "r") && r(d, p);
                            break;
                        case "opacity":
                            k.gradient && !k[b]("stroke-opacity") && q(i, {
                                "stroke-opacity": p > 1 ? p / 100 : p
                            });
                        case "fill-opacity":
                            if (k.gradient) {
                                H = a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g, l)), H && (I = H.getElementsByTagName("stop"), q(I[I.length - 1], {
                                    "stop-opacity": p
                                }));
                                break
                            };
                        default:
                            o == "font-size" && (p = e(p, 10) + "px");
                            var J = o.replace(/(\-.)/g, function(a) {
                                return a.substring(1).toUpperCase()
                            });
                            i.style[J] = p, d._.dirty = 1, i.setAttribute(o, p)
                    }
                }
            y(d, f), i.style.visibility = m
        },
        x = 1.2,
        y = function(d, f) {
            if (d.type == "text" && !!(f[b]("text") || f[b]("font") || f[b]("font-size") || f[b]("x") || f[b]("y"))) {
                var g = d.attrs,
                    h = d.node,
                    i = h.firstChild ? e(a._g.doc.defaultView.getComputedStyle(h.firstChild, l).getPropertyValue("font-size"), 10) : 10;
                if (f[b]("text")) {
                    g.text = f.text;
                    while (h.firstChild) h.removeChild(h.firstChild);
                    var j = c(f.text).split("\n"),
                        k = [],
                        m;
                    for (var n = 0, o = j.length; n < o; n++) m = q("tspan"), n && q(m, {
                        dy: i * x,
                        x: g.x
                    }), m.appendChild(a._g.doc.createTextNode(j[n])), h.appendChild(m), k[n] = m
                } else {
                    k = h.getElementsByTagName("tspan");
                    for (n = 0, o = k.length; n < o; n++) n ? q(k[n], {
                        dy: i * x,
                        x: g.x
                    }) : q(k[0], {
                        dy: 0
                    })
                }
                q(h, {
                    x: g.x,
                    y: g.y
                }), d._.dirty = 1;
                var p = d._getBBox(),
                    r = g.y - (p.y + p.height / 2);
                r && a.is(r, "finite") && q(k[0], {
                    dy: r
                })
            }
        },
        z = function(b, c) {
            var d = 0,
                e = 0;
            this[0] = this.node = b, b.raphael = !0, this.id = a._oid++, b.raphaelid = this.id, this.matrix = a.matrix(), this.realPath = null, this.paper = c, this.attrs = this.attrs || {}, this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                deg: 0,
                dx: 0,
                dy: 0,
                dirty: 1
            }, !c.bottom && (c.bottom = this), this.prev = c.top, c.top && (c.top.next = this), c.top = this, this.next = null
        },
        A = a.el;
    z.prototype = A, A.constructor = z, a._engine.path = function(a, b) {
        var c = q("path");
        b.canvas && b.canvas.appendChild(c);
        var d = new z(c, b);
        d.type = "path", w(d, {
            fill: "none",
            stroke: "#000",
            path: a
        });
        return d
    }, A.rotate = function(a, b, e) {
        if (this.removed) return this;
        a = c(a).split(j), a.length - 1 && (b = d(a[1]), e = d(a[2])), a = d(a[0]), e == null && (b = e);
        if (b == null || e == null) {
            var f = this.getBBox(1);
            b = f.x + f.width / 2, e = f.y + f.height / 2
        }
        this.transform(this._.transform.concat([
            ["r", a, b, e]
        ]));
        return this
    }, A.scale = function(a, b, e, f) {
        if (this.removed) return this;
        a = c(a).split(j), a.length - 1 && (b = d(a[1]), e = d(a[2]), f = d(a[3])), a = d(a[0]), b == null && (b = a), f == null && (e = f);
        if (e == null || f == null) var g = this.getBBox(1);
        e = e == null ? g.x + g.width / 2 : e, f = f == null ? g.y + g.height / 2 : f, this.transform(this._.transform.concat([
            ["s", a, b, e, f]
        ]));
        return this
    }, A.translate = function(a, b) {
        if (this.removed) return this;
        a = c(a).split(j), a.length - 1 && (b = d(a[1])), a = d(a[0]) || 0, b = +b || 0, this.transform(this._.transform.concat([
            ["t", a, b]
        ]));
        return this
    }, A.transform = function(c) {
        var d = this._;
        if (c == null) return d.transform;
        a._extractTransform(this, c), this.clip && q(this.clip, {
            transform: this.matrix.invert()
        }), this.pattern && s(this), this.node && q(this.node, {
            transform: this.matrix
        });
        if (d.sx != 1 || d.sy != 1) {
            var e = this.attrs[b]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({
                "stroke-width": e
            })
        }
        return this
    }, A.hide = function() {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this
    }, A.show = function() {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this
    }, A.remove = function() {
        if (!this.removed) {
            var b = this.paper;
            b.__set__ && b.__set__.exclude(this), k.unbind("*.*." + this.id), this.gradient && b.defs.removeChild(this.gradient), a._tear(this, b), this.node.parentNode.removeChild(this.node);
            for (var c in this) this[c] = typeof this[c] == "function" ? a._removedFactory(c) : null;
            this.removed = !0
        }
    }, A._getBBox = function() {
        if (this.node.style.display == "none") {
            this.show();
            var a = !0
        }
        var b = {};
        try {
            b = this.node.getBBox()
        } catch (c) {} finally {
            b = b || {}
        }
        a && this.hide();
        return b
    }, A.attr = function(c, d) {
        if (this.removed) return this;
        if (c == null) {
            var e = {};
            for (var f in this.attrs) this.attrs[b](f) && (e[f] = this.attrs[f]);
            e.gradient && e.fill == "none" && (e.fill = e.gradient) && delete e.gradient, e.transform = this._.transform;
            return e
        }
        if (d == null && a.is(c, "string")) {
            if (c == "fill" && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
            if (c == "transform") return this._.transform;
            var g = c.split(j),
                h = {};
            for (var i = 0, l = g.length; i < l; i++) c = g[i], c in this.attrs ? h[c] = this.attrs[c] : a.is(this.paper.customAttributes[c], "function") ? h[c] = this.paper.customAttributes[c].def : h[c] = a._availableAttrs[c];
            return l - 1 ? h : h[g[0]]
        }
        if (d == null && a.is(c, "array")) {
            h = {};
            for (i = 0, l = c.length; i < l; i++) h[c[i]] = this.attr(c[i]);
            return h
        }
        if (d != null) {
            var m = {};
            m[c] = d
        } else c != null && a.is(c, "object") && (m = c);
        for (var n in m) k("attr." + n + "." + this.id, this, m[n]);
        for (n in this.paper.customAttributes)
            if (this.paper.customAttributes[b](n) && m[b](n) && a.is(this.paper.customAttributes[n], "function")) {
                var o = this.paper.customAttributes[n].apply(this, [].concat(m[n]));
                this.attrs[n] = m[n];
                for (var p in o) o[b](p) && (m[p] = o[p])
            }
        w(this, m);
        return this
    }, A.toFront = function() {
        if (this.removed) return this;
        this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
        var b = this.paper;
        b.top != this && a._tofront(this, b);
        return this
    }, A.toBack = function() {
        if (this.removed) return this;
        var b = this.node.parentNode;
        b.tagName.toLowerCase() == "a" ? b.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : b.firstChild != this.node && b.insertBefore(this.node, this.node.parentNode.firstChild), a._toback(this, this.paper);
        var c = this.paper;
        return this
    }, A.insertAfter = function(b) {
        if (this.removed) return this;
        var c = b.node || b[b.length - 1].node;
        c.nextSibling ? c.parentNode.insertBefore(this.node, c.nextSibling) : c.parentNode.appendChild(this.node), a._insertafter(this, b, this.paper);
        return this
    }, A.insertBefore = function(b) {
        if (this.removed) return this;
        var c = b.node || b[0].node;
        c.parentNode.insertBefore(this.node, c), a._insertbefore(this, b, this.paper);
        return this
    }, A.blur = function(b) {
        var c = this;
        if (+b !== 0) {
            var d = q("filter"),
                e = q("feGaussianBlur");
            c.attrs.blur = b, d.id = a.createUUID(), q(e, {
                stdDeviation: +b || 1.5
            }), d.appendChild(e), c.paper.defs.appendChild(d), c._blur = d, q(c.node, {
                filter: "url(#" + d.id + ")"
            })
        } else c._blur && (c._blur.parentNode.removeChild(c._blur), delete c._blur, delete c.attrs.blur), c.node.removeAttribute("filter")
    }, a._engine.circle = function(a, b, c, d) {
        var e = q("circle");
        a.canvas && a.canvas.appendChild(e);
        var f = new z(e, a);
        f.attrs = {
            cx: b,
            cy: c,
            r: d,
            fill: "none",
            stroke: "#000"
        }, f.type = "circle", q(e, f.attrs);
        return f
    }, a._engine.rect = function(a, b, c, d, e, f) {
        var g = q("rect");
        a.canvas && a.canvas.appendChild(g);
        var h = new z(g, a);
        h.attrs = {
            x: b,
            y: c,
            width: d,
            height: e,
            r: f || 0,
            rx: f || 0,
            ry: f || 0,
            fill: "none",
            stroke: "#000"
        }, h.type = "rect", q(g, h.attrs);
        return h
    }, a._engine.ellipse = function(a, b, c, d, e) {
        var f = q("ellipse");
        a.canvas && a.canvas.appendChild(f);
        var g = new z(f, a);
        g.attrs = {
            cx: b,
            cy: c,
            rx: d,
            ry: e,
            fill: "none",
            stroke: "#000"
        }, g.type = "ellipse", q(f, g.attrs);
        return g
    }, a._engine.image = function(a, b, c, d, e, f) {
        var g = q("image");
        q(g, {
            x: c,
            y: d,
            width: e,
            height: f,
            preserveAspectRatio: "none"
        }), g.setAttributeNS(n, "href", b), a.canvas && a.canvas.appendChild(g);
        var h = new z(g, a);
        h.attrs = {
            x: c,
            y: d,
            width: e,
            height: f,
            src: b
        }, h.type = "image";
        return h
    }, a._engine.text = function(b, c, d, e) {
        var f = q("text");
        b.canvas && b.canvas.appendChild(f);
        var g = new z(f, b);
        g.attrs = {
            x: c,
            y: d,
            "text-anchor": "middle",
            text: e,
            font: a._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        }, g.type = "text", w(g, g.attrs);
        return g
    }, a._engine.setSize = function(a, b) {
        this.width = a || this.width, this.height = b || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox);
        return this
    }, a._engine.create = function() {
        var b = a._getContainer.apply(0, arguments),
            c = b && b.container,
            d = b.x,
            e = b.y,
            f = b.width,
            g = b.height;
        if (!c) throw new Error("SVG container not found.");
        var h = q("svg"),
            i = "overflow:hidden;",
            j;
        d = d || 0, e = e || 0, f = f || 512, g = g || 342, q(h, {
            height: g,
            version: 1.1,
            width: f,
            xmlns: "http://www.w3.org/2000/svg"
        }), c == 1 ? (h.style.cssText = i + "position:absolute;left:" + d + "px;top:" + e + "px", a._g.doc.body.appendChild(h), j = 1) : (h.style.cssText = i + "position:relative", c.firstChild ? c.insertBefore(h, c.firstChild) : c.appendChild(h)), c = new a._Paper, c.width = f, c.height = g, c.canvas = h, c.clear(), c._left = c._top = 0, j && (c.renderfix = function() {}), c.renderfix();
        return c
    }, a._engine.setViewBox = function(a, b, c, d, e) {
        k("setViewBox", this, this._viewBox, [a, b, c, d, e]);
        var f = g(c / this.width, d / this.height),
            h = this.top,
            i = e ? "meet" : "xMinYMin",
            j, l;
        a == null ? (this._vbSize && (f = 1), delete this._vbSize, j = "0 0 " + this.width + m + this.height) : (this._vbSize = f, j = a + m + b + m + c + m + d), q(this.canvas, {
            viewBox: j,
            preserveAspectRatio: i
        });
        while (f && h) l = "stroke-width" in h.attrs ? h.attrs["stroke-width"] : 1, h.attr({
            "stroke-width": l
        }), h._.dirty = 1, h._.dirtyT = 1, h = h.prev;
        this._viewBox = [a, b, c, d, !!e];
        return this
    }, a.prototype.renderfix = function() {
        var a = this.canvas,
            b = a.style,
            c = a.getScreenCTM() || a.createSVGMatrix(),
            d = -c.e % 1,
            e = -c.f % 1;
        if (d || e) d && (this._left = (this._left + d) % 1, b.left = this._left + "px"), e && (this._top = (this._top + e) % 1, b.top = this._top + "px")
    }, a.prototype.clear = function() {
        a.eve("clear", this);
        var b = this.canvas;
        while (b.firstChild) b.removeChild(b.firstChild);
        this.bottom = this.top = null, (this.desc = q("desc")).appendChild(a._g.doc.createTextNode("Created with  " + a.version)), b.appendChild(this.desc), b.appendChild(this.defs = q("defs"))
    }, a.prototype.remove = function() {
        k("remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var b in this) this[b] = typeof this[b] == "function" ? a._removedFactory(b) : null
    };
    var B = a.st;
    for (var C in A) A[b](C) && !B[b](C) && (B[C] = function(a) {
        return function() {
            var b = arguments;
            return this.forEach(function(c) {
                c[a].apply(c, b)
            })
        }
    }(C))
}(window.Raphael), window.Raphael.vml && function(a) {
    var b = "hasOwnProperty",
        c = String,
        d = parseFloat,
        e = Math,
        f = e.round,
        g = e.max,
        h = e.min,
        i = e.abs,
        j = "fill",
        k = /[, ]+/,
        l = a.eve,
        m = " progid:DXImageTransform.Microsoft",
        n = " ",
        o = "",
        p = {
            M: "m",
            L: "l",
            C: "c",
            Z: "x",
            m: "t",
            l: "r",
            c: "v",
            z: "x"
        },
        q = /([clmz]),?([^clmz]*)/gi,
        r = / progid:\S+Blur\([^\)]+\)/g,
        s = /-?[^,\s-]+/g,
        t = "position:absolute;left:0;top:0;width:1px;height:1px",
        u = 21600,
        v = {
            path: 1,
            rect: 1,
            image: 1
        },
        w = {
            circle: 1,
            ellipse: 1
        },
        x = function(b) {
            var d = /[ahqstv]/ig,
                e = a._pathToAbsolute;
            c(b).match(d) && (e = a._path2curve), d = /[clmz]/g;
            if (e == a._pathToAbsolute && !c(b).match(d)) {
                var g = c(b).replace(q, function(a, b, c) {
                    var d = [],
                        e = b.toLowerCase() == "m",
                        g = p[b];
                    c.replace(s, function(a) {
                        e && d.length == 2 && (g += d + p[b == "m" ? "l" : "L"], d = []), d.push(f(a * u))
                    });
                    return g + d
                });
                return g
            }
            var h = e(b),
                i, j;
            g = [];
            for (var k = 0, l = h.length; k < l; k++) {
                i = h[k], j = h[k][0].toLowerCase(), j == "z" && (j = "x");
                for (var m = 1, r = i.length; m < r; m++) j += f(i[m] * u) + (m != r - 1 ? "," : o);
                g.push(j)
            }
            return g.join(n)
        },
        y = function(b, c, d) {
            var e = a.matrix();
            e.rotate(-b, .5, .5);
            return {
                dx: e.x(c, d),
                dy: e.y(c, d)
            }
        },
        z = function(a, b, c, d, e, f) {
            var g = a._,
                h = a.matrix,
                k = g.fillpos,
                l = a.node,
                m = l.style,
                o = 1,
                p = "",
                q, r = u / b,
                s = u / c;
            m.visibility = "hidden";
            if (!!b && !!c) {
                l.coordsize = i(r) + n + i(s), m.rotation = f * (b * c < 0 ? -1 : 1);
                if (f) {
                    var t = y(f, d, e);
                    d = t.dx, e = t.dy
                }
                b < 0 && (p += "x"), c < 0 && (p += " y") && (o = -1), m.flip = p, l.coordorigin = d * -r + n + e * -s;
                if (k || g.fillsize) {
                    var v = l.getElementsByTagName(j);
                    v = v && v[0], l.removeChild(v), k && (t = y(f, h.x(k[0], k[1]), h.y(k[0], k[1])), v.position = t.dx * o + n + t.dy * o), g.fillsize && (v.size = g.fillsize[0] * i(b) + n + g.fillsize[1] * i(c)), l.appendChild(v)
                }
                m.visibility = "visible"
            }
        };
    a.toString = function() {
        return "Your browser doesn¡¯t support SVG. Falling down to VML.\nYou are running  " + this.version
    };
    var A = function(a, b, d) {
            var e = c(b).toLowerCase().split("-"),
                f = d ? "end" : "start",
                g = e.length,
                h = "classic",
                i = "medium",
                j = "medium";
            while (g--) switch (e[g]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    h = e[g];
                    break;
                case "wide":
                case "narrow":
                    j = e[g];
                    break;
                case "long":
                case "short":
                    i = e[g]
            }
            var k = a.node.getElementsByTagName("stroke")[0];
            k[f + "arrow"] = h, k[f + "arrowlength"] = i, k[f + "arrowwidth"] = j
        },
        B = function(e, i) {
            e.attrs = e.attrs || {};
            var l = e.node,
                m = e.attrs,
                p = l.style,
                q, r = v[e.type] && (i.x != m.x || i.y != m.y || i.width != m.width || i.height != m.height || i.cx != m.cx || i.cy != m.cy || i.rx != m.rx || i.ry != m.ry || i.r != m.r),
                s = w[e.type] && (m.cx != i.cx || m.cy != i.cy || m.r != i.r || m.rx != i.rx || m.ry != i.ry),
                t = e;
            for (var y in i) i[b](y) && (m[y] = i[y]);
            r && (m.path = a._getPath[e.type](e), e._.dirty = 1), i.href && (l.href = i.href), i.title && (l.title = i.title), i.target && (l.target = i.target), i.cursor && (p.cursor = i.cursor), "blur" in i && e.blur(i.blur);
            if (i.path && e.type == "path" || r) l.path = x(~c(m.path).toLowerCase().indexOf("r") ? a._pathToAbsolute(m.path) : m.path), e.type == "image" && (e._.fillpos = [m.x, m.y], e._.fillsize = [m.width, m.height], z(e, 1, 1, 0, 0, 0));
            "transform" in i && e.transform(i.transform);
            if (s) {
                var B = +m.cx,
                    D = +m.cy,
                    E = +m.rx || +m.r || 0,
                    G = +m.ry || +m.r || 0;
                l.path = a.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", f((B - E) * u), f((D - G) * u), f((B + E) * u), f((D + G) * u), f(B * u))
            }
            if ("clip-rect" in i) {
                var H = c(i["clip-rect"]).split(k);
                if (H.length == 4) {
                    H[2] = +H[2] + +H[0], H[3] = +H[3] + +H[1];
                    var I = l.clipRect || a._g.doc.createElement("div"),
                        J = I.style;
                    J.clip = a.format("rect({1}px {2}px {3}px {0}px)", H), l.clipRect || (J.position = "absolute", J.top = 0, J.left = 0, J.width = e.paper.width + "px", J.height = e.paper.height + "px", l.parentNode.insertBefore(I, l), I.appendChild(l), l.clipRect = I)
                }
                i["clip-rect"] || l.clipRect && (l.clipRect.style.clip = "auto")
            }
            if (e.textpath) {
                var K = e.textpath.style;
                i.font && (K.font = i.font), i["font-family"] && (K.fontFamily = '"' + i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, o) + '"'), i["font-size"] && (K.fontSize = i["font-size"]), i["font-weight"] && (K.fontWeight = i["font-weight"]), i["font-style"] && (K.fontStyle = i["font-style"])
            }
            "arrow-start" in i && A(t, i["arrow-start"]), "arrow-end" in i && A(t, i["arrow-end"], 1);
            if (i.opacity != null || i["stroke-width"] != null || i.fill != null || i.src != null || i.stroke != null || i["stroke-width"] != null || i["stroke-opacity"] != null || i["fill-opacity"] != null || i["stroke-dasharray"] != null || i["stroke-miterlimit"] != null || i["stroke-linejoin"] != null || i["stroke-linecap"] != null) {
                var L = l.getElementsByTagName(j),
                    M = !1;
                L = L && L[0], !L && (M = L = F(j)), e.type == "image" && i.src && (L.src = i.src), i.fill && (L.on = !0);
                if (L.on == null || i.fill == "none" || i.fill === null) L.on = !1;
                if (L.on && i.fill) {
                    var N = c(i.fill).match(a._ISURL);
                    if (N) {
                        L.parentNode == l && l.removeChild(L), L.rotate = !0, L.src = N[1], L.type = "tile";
                        var O = e.getBBox(1);
                        L.position = O.x + n + O.y, e._.fillpos = [O.x, O.y], a._preload(N[1], function() {
                            e._.fillsize = [this.offsetWidth, this.offsetHeight]
                        })
                    } else L.color = a.getRGB(i.fill).hex, L.src = o, L.type = "solid", a.getRGB(i.fill).error && (t.type in {
                        circle: 1,
                        ellipse: 1
                    } || c(i.fill).charAt() != "r") && C(t, i.fill, L) && (m.fill = "none", m.gradient = i.fill, L.rotate = !1)
                }
                if ("fill-opacity" in i || "opacity" in i) {
                    var P = ((+m["fill-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+a.getRGB(i.fill).o + 1 || 2) - 1);
                    P = h(g(P, 0), 1), L.opacity = P, L.src && (L.color = "none")
                }
                l.appendChild(L);
                var Q = l.getElementsByTagName("stroke") && l.getElementsByTagName("stroke")[0],
                    T = !1;
                !Q && (T = Q = F("stroke"));
                if (i.stroke && i.stroke != "none" || i["stroke-width"] || i["stroke-opacity"] != null || i["stroke-dasharray"] || i["stroke-miterlimit"] || i["stroke-linejoin"] || i["stroke-linecap"]) Q.on = !0;
                (i.stroke == "none" || i.stroke === null || Q.on == null || i.stroke == 0 || i["stroke-width"] == 0) && (Q.on = !1);
                var U = a.getRGB(i.stroke);
                Q.on && i.stroke && (Q.color = U.hex), P = ((+m["stroke-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+U.o + 1 || 2) - 1);
                var V = (d(i["stroke-width"]) || 1) * .75;
                P = h(g(P, 0), 1), i["stroke-width"] == null && (V = m["stroke-width"]), i["stroke-width"] && (Q.weight = V), V && V < 1 && (P *= V) && (Q.weight = 1), Q.opacity = P, i["stroke-linejoin"] && (Q.joinstyle = i["stroke-linejoin"] || "miter"), Q.miterlimit = i["stroke-miterlimit"] || 8, i["stroke-linecap"] && (Q.endcap = i["stroke-linecap"] == "butt" ? "flat" : i["stroke-linecap"] == "square" ? "square" : "round");
                if (i["stroke-dasharray"]) {
                    var W = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    };
                    Q.dashstyle = W[b](i["stroke-dasharray"]) ? W[i["stroke-dasharray"]] : o
                }
                T && l.appendChild(Q)
            }
            if (t.type == "text") {
                t.paper.canvas.style.display = o;
                var X = t.paper.span,
                    Y = 100,
                    Z = m.font && m.font.match(/\d+(?:\.\d*)?(?=px)/);
                p = X.style, m.font && (p.font = m.font), m["font-family"] && (p.fontFamily = m["font-family"]), m["font-weight"] && (p.fontWeight = m["font-weight"]), m["font-style"] && (p.fontStyle = m["font-style"]), Z = d(m["font-size"] || Z && Z[0]) || 10, p.fontSize = Z * Y + "px", t.textpath.string && (X.innerHTML = c(t.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                var $ = X.getBoundingClientRect();
                t.W = m.w = ($.right - $.left) / Y, t.H = m.h = ($.bottom - $.top) / Y, t.X = m.x, t.Y = m.y + t.H / 2, ("x" in i || "y" in i) && (t.path.v = a.format("m{0},{1}l{2},{1}", f(m.x * u), f(m.y * u), f(m.x * u) + 1));
                var _ = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                for (var ba = 0, bb = _.length; ba < bb; ba++)
                    if (_[ba] in i) {
                        t._.dirty = 1;
                        break
                    }
                switch (m["text-anchor"]) {
                    case "start":
                        t.textpath.style["v-text-align"] = "left", t.bbx = t.W / 2;
                        break;
                    case "end":
                        t.textpath.style["v-text-align"] = "right", t.bbx = -t.W / 2;
                        break;
                    default:
                        t.textpath.style["v-text-align"] = "center", t.bbx = 0
                }
                t.textpath.style["v-text-kern"] = !0
            }
        },
        C = function(b, f, g) {
            b.attrs = b.attrs || {};
            var h = b.attrs,
                i = Math.pow,
                j, k, l = "linear",
                m = ".5 .5";
            b.attrs.gradient = f, f = c(f).replace(a._radial_gradient, function(a, b, c) {
                l = "radial", b && c && (b = d(b), c = d(c), i(b - .5, 2) + i(c - .5, 2) > .25 && (c = e.sqrt(.25 - i(b - .5, 2)) * ((c > .5) * 2 - 1) + .5), m = b + n + c);
                return o
            }), f = f.split(/\s*\-\s*/);
            if (l == "linear") {
                var p = f.shift();
                p = -d(p);
                if (isNaN(p)) return null
            }
            var q = a._parseDots(f);
            if (!q) return null;
            b = b.shape || b.node;
            if (q.length) {
                b.removeChild(g), g.on = !0, g.method = "none", g.color = q[0].color, g.color2 = q[q.length - 1].color;
                var r = [];
                for (var s = 0, t = q.length; s < t; s++) q[s].offset && r.push(q[s].offset + n + q[s].color);
                g.colors = r.length ? r.join() : "0% " + g.color, l == "radial" ? (g.type = "gradientTitle", g.focus = "100%", g.focussize = "0 0", g.focusposition = m, g.angle = 0) : (g.type = "gradient", g.angle = (270 - p) % 360), b.appendChild(g)
            }
            return 1
        },
        D = function(b, c) {
            this[0] = this.node = b, b.raphael = !0, this.id = a._oid++, b.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = c, this.matrix = a.matrix(), this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                dx: 0,
                dy: 0,
                deg: 0,
                dirty: 1,
                dirtyT: 1
            }, !c.bottom && (c.bottom = this), this.prev = c.top, c.top && (c.top.next = this), c.top = this, this.next = null
        },
        E = a.el;
    D.prototype = E, E.constructor = D, E.transform = function(b) {
        if (b == null) return this._.transform;
        var d = this.paper._viewBoxShift,
            e = d ? "s" + [d.scale, d.scale] + "-1-1t" + [d.dx, d.dy] : o,
            f;
        d && (f = b = c(b).replace(/\.{3}|\u2026/g, this._.transform || o)), a._extractTransform(this, e + b);
        var g = this.matrix.clone(),
            h = this.skew,
            i = this.node,
            j, k = ~c(this.attrs.fill).indexOf("-"),
            l = !c(this.attrs.fill).indexOf("url(");
        g.translate(-0.5, -0.5);
        if (l || k || this.type == "image") {
            h.matrix = "1 0 0 1", h.offset = "0 0", j = g.split();
            if (k && j.noRotation || !j.isSimple) {
                i.style.filter = g.toFilter();
                var m = this.getBBox(),
                    p = this.getBBox(1),
                    q = m.x - p.x,
                    r = m.y - p.y;
                i.coordorigin = q * -u + n + r * -u, z(this, 1, 1, q, r, 0)
            } else i.style.filter = o, z(this, j.scalex, j.scaley, j.dx, j.dy, j.rotate)
        } else i.style.filter = o, h.matrix = c(g), h.offset = g.offset();
        f && (this._.transform = f);
        return this
    }, E.rotate = function(a, b, e) {
        if (this.removed) return this;
        if (a != null) {
            a = c(a).split(k), a.length - 1 && (b = d(a[1]), e = d(a[2])), a = d(a[0]), e == null && (b = e);
            if (b == null || e == null) {
                var f = this.getBBox(1);
                b = f.x + f.width / 2, e = f.y + f.height / 2
            }
            this._.dirtyT = 1, this.transform(this._.transform.concat([
                ["r", a, b, e]
            ]));
            return this
        }
    }, E.translate = function(a, b) {
        if (this.removed) return this;
        a = c(a).split(k), a.length - 1 && (b = d(a[1])), a = d(a[0]) || 0, b = +b || 0, this._.bbox && (this._.bbox.x += a, this._.bbox.y += b), this.transform(this._.transform.concat([
            ["t", a, b]
        ]));
        return this
    }, E.scale = function(a, b, e, f) {
        if (this.removed) return this;
        a = c(a).split(k), a.length - 1 && (b = d(a[1]), e = d(a[2]), f = d(a[3]), isNaN(e) && (e = null), isNaN(f) && (f = null)), a = d(a[0]), b == null && (b = a), f == null && (e = f);
        if (e == null || f == null) var g = this.getBBox(1);
        e = e == null ? g.x + g.width / 2 : e, f = f == null ? g.y + g.height / 2 : f, this.transform(this._.transform.concat([
            ["s", a, b, e, f]
        ])), this._.dirtyT = 1;
        return this
    }, E.hide = function() {
        !this.removed && (this.node.style.display = "none");
        return this
    }, E.show = function() {
        !this.removed && (this.node.style.display = o);
        return this
    }, E._getBBox = function() {
        if (this.removed) return {};
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        }
    }, E.remove = function() {
        if (!this.removed) {
            this.paper.__set__ && this.paper.__set__.exclude(this), a.eve.unbind("*.*." + this.id), a._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var b in this) this[b] = typeof this[b] == "function" ? a._removedFactory(b) : null;
            this.removed = !0
        }
    }, E.attr = function(c, d) {
        if (this.removed) return this;
        if (c == null) {
            var e = {};
            for (var f in this.attrs) this.attrs[b](f) && (e[f] = this.attrs[f]);
            e.gradient && e.fill == "none" && (e.fill = e.gradient) && delete e.gradient, e.transform = this._.transform;
            return e
        }
        if (d == null && a.is(c, "string")) {
            if (c == j && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
            var g = c.split(k),
                h = {};
            for (var i = 0, m = g.length; i < m; i++) c = g[i], c in this.attrs ? h[c] = this.attrs[c] : a.is(this.paper.customAttributes[c], "function") ? h[c] = this.paper.customAttributes[c].def : h[c] = a._availableAttrs[c];
            return m - 1 ? h : h[g[0]]
        }
        if (this.attrs && d == null && a.is(c, "array")) {
            h = {};
            for (i = 0, m = c.length; i < m; i++) h[c[i]] = this.attr(c[i]);
            return h
        }
        var n;
        d != null && (n = {}, n[c] = d), d == null && a.is(c, "object") && (n = c);
        for (var o in n) l("attr." + o + "." + this.id, this, n[o]);
        if (n) {
            for (o in this.paper.customAttributes)
                if (this.paper.customAttributes[b](o) && n[b](o) && a.is(this.paper.customAttributes[o], "function")) {
                    var p = this.paper.customAttributes[o].apply(this, [].concat(n[o]));
                    this.attrs[o] = n[o];
                    for (var q in p) p[b](q) && (n[q] = p[q])
                }
            n.text && this.type == "text" && (this.textpath.string = n.text), B(this, n)
        }
        return this
    }, E.toFront = function() {
        !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && a._tofront(this, this.paper);
        return this
    }, E.toBack = function() {
        if (this.removed) return this;
        this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), a._toback(this, this.paper));
        return this
    }, E.insertAfter = function(b) {
        if (this.removed) return this;
        b.constructor == a.st.constructor && (b = b[b.length - 1]), b.node.nextSibling ? b.node.parentNode.insertBefore(this.node, b.node.nextSibling) : b.node.parentNode.appendChild(this.node), a._insertafter(this, b, this.paper);
        return this
    }, E.insertBefore = function(b) {
        if (this.removed) return this;
        b.constructor == a.st.constructor && (b = b[0]), b.node.parentNode.insertBefore(this.node, b.node), a._insertbefore(this, b, this.paper);
        return this
    }, E.blur = function(b) {
        var c = this.node.runtimeStyle,
            d = c.filter;
        d = d.replace(r, o), +b !== 0 ? (this.attrs.blur = b, c.filter = d + n + m + ".Blur(pixelradius=" + (+b || 1.5) + ")", c.margin = a.format("-{0}px 0 0 -{0}px", f(+b || 1.5))) : (c.filter = d, c.margin = 0, delete this.attrs.blur)
    }, a._engine.path = function(a, b) {
        var c = F("shape");
        c.style.cssText = t, c.coordsize = u + n + u, c.coordorigin = b.coordorigin;
        var d = new D(c, b),
            e = {
                fill: "none",
                stroke: "#000"
            };
        a && (e.path = a), d.type = "path", d.path = [], d.Path = o, B(d, e), b.canvas.appendChild(c);
        var f = F("skew");
        f.on = !0, c.appendChild(f), d.skew = f, d.transform(o);
        return d
    }, a._engine.rect = function(b, c, d, e, f, g) {
        var h = a._rectPath(c, d, e, f, g),
            i = b.path(h),
            j = i.attrs;
        i.X = j.x = c, i.Y = j.y = d, i.W = j.width = e, i.H = j.height = f, j.r = g, j.path = h, i.type = "rect";
        return i
    }, a._engine.ellipse = function(a, b, c, d, e) {
        var f = a.path(),
            g = f.attrs;
        f.X = b - d, f.Y = c - e, f.W = d * 2, f.H = e * 2, f.type = "ellipse", B(f, {
            cx: b,
            cy: c,
            rx: d,
            ry: e
        });
        return f
    }, a._engine.circle = function(a, b, c, d) {
        var e = a.path(),
            f = e.attrs;
        e.X = b - d, e.Y = c - d, e.W = e.H = d * 2, e.type = "circle", B(e, {
            cx: b,
            cy: c,
            r: d
        });
        return e
    }, a._engine.image = function(b, c, d, e, f, g) {
        var h = a._rectPath(d, e, f, g),
            i = b.path(h).attr({
                stroke: "none"
            }),
            k = i.attrs,
            l = i.node,
            m = l.getElementsByTagName(j)[0];
        k.src = c, i.X = k.x = d, i.Y = k.y = e, i.W = k.width = f, i.H = k.height = g, k.path = h, i.type = "image", m.parentNode == l && l.removeChild(m), m.rotate = !0, m.src = c, m.type = "tile", i._.fillpos = [d, e], i._.fillsize = [f, g], l.appendChild(m), z(i, 1, 1, 0, 0, 0);
        return i
    }, a._engine.text = function(b, d, e, g) {
        var h = F("shape"),
            i = F("path"),
            j = F("textpath");
        d = d || 0, e = e || 0, g = g || "", i.v = a.format("m{0},{1}l{2},{1}", f(d * u), f(e * u), f(d * u) + 1), i.textpathok = !0, j.string = c(g), j.on = !0, h.style.cssText = t, h.coordsize = u + n + u, h.coordorigin = "0 0";
        var k = new D(h, b),
            l = {
                fill: "#000",
                stroke: "none",
                font: a._availableAttrs.font,
                text: g
            };
        k.shape = h, k.path = i, k.textpath = j, k.type = "text", k.attrs.text = c(g), k.attrs.x = d, k.attrs.y = e, k.attrs.w = 1, k.attrs.h = 1, B(k, l), h.appendChild(j), h.appendChild(i), b.canvas.appendChild(h);
        var m = F("skew");
        m.on = !0, h.appendChild(m), k.skew = m, k.transform(o);
        return k
    }, a._engine.setSize = function(b, c) {
        var d = this.canvas.style;
        this.width = b, this.height = c, b == +b && (b += "px"), c == +c && (c += "px"), d.width = b, d.height = c, d.clip = "rect(0 " + b + " " + c + " 0)", this._viewBox && a._engine.setViewBox.apply(this, this._viewBox);
        return this
    }, a._engine.setViewBox = function(b, c, d, e, f) {
        a.eve("setViewBox", this, this._viewBox, [b, c, d, e, f]);
        var h = this.width,
            i = this.height,
            j = 1 / g(d / h, e / i),
            k, l;
        f && (k = i / e, l = h / d, d * k < h && (b -= (h - d * k) / 2 / k), e * l < i && (c -= (i - e * l) / 2 / l)), this._viewBox = [b, c, d, e, !!f], this._viewBoxShift = {
            dx: -b,
            dy: -c,
            scale: j
        }, this.forEach(function(a) {
            a.transform("...")
        });
        return this
    };
    var F;
    a._engine.initWin = function(a) {
        var b = a.document;
        b.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !b.namespaces.rvml && b.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), F = function(a) {
                return b.createElement("<rvml:" + a + ' class="rvml">')
            }
        } catch (c) {
            F = function(a) {
                return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }, a._engine.initWin(a._g.win), a._engine.create = function() {
        var b = a._getContainer.apply(0, arguments),
            c = b.container,
            d = b.height,
            e, f = b.width,
            g = b.x,
            h = b.y;
        if (!c) throw new Error("VML container not found.");
        var i = new a._Paper,
            j = i.canvas = a._g.doc.createElement("div"),
            k = j.style;
        g = g || 0, h = h || 0, f = f || 512, d = d || 342, i.width = f, i.height = d, f == +f && (f += "px"), d == +d && (d += "px"), i.coordsize = u * 1e3 + n + u * 1e3, i.coordorigin = "0 0", i.span = a._g.doc.createElement("span"), i.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", j.appendChild(i.span), k.cssText = a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, d), c == 1 ? (a._g.doc.body.appendChild(j), k.left = g + "px", k.top = h + "px", k.position = "absolute") : c.firstChild ? c.insertBefore(j, c.firstChild) : c.appendChild(j), i.renderfix = function() {};
        return i
    }, a.prototype.clear = function() {
        a.eve("clear", this), this.canvas.innerHTML = o, this.span = a._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
    }, a.prototype.remove = function() {
        a.eve("remove", this), this.canvas.parentNode.removeChild(this.canvas);
        for (var b in this) this[b] = typeof this[b] == "function" ? a._removedFactory(b) : null;
        return !0
    };
    var G = a.st;
    for (var H in E) E[b](H) && !G[b](H) && (G[H] = function(a) {
        return function() {
            var b = arguments;
            return this.forEach(function(c) {
                c[a].apply(c, b)
            })
        }
    }(H))
}(window.Raphael)


$(function() {
    var c = Raphael("map_container", 1000, 850);
    var o = {
        fill: "#2874AF",
        stroke: "#FFF",
        "stroke-width": 0
    };
    var m = {
        fill: "#000",
        "font-size": "12px",
        "font-family": "ËÎÌå",
        opacity: 1,
        cursor: "default"
    };
    var h = {
        fill: "#FFF",
        "font-size": "12px",
        "font-family": "ËÎÌå",
        opacity: 1,
        cursor: "default"
    };
    var f = ["#2A73AA", "#29AC80", "#51B133", "#FFD914", "#FF9116", "#FF5B26"];
    var a = [];
    var l, e, d, b, k, j, p;
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("M 89.918101,431.92822 88.5,431.03063 82.826725,431.01531 77.153451,431 74.076725,428.41111 71,425.82221 l 0,0.8114 c 0,0.44627 -0.7334,-0.23567 -1.629778,-1.51543 l -1.629779,-2.32684 -0.247795,-4.64567 C 67.356361,415.59055 67.121834,413.275 66.971476,413 c -0.150358,-0.275 -0.327187,-1.625 -0.392955,-3 l -0.119577,-2.5 0.916245,-0.64908 0.916246,-0.64907 -0.614333,-1.60093 L 67.06277,403 l -2.056349,0 -2.056349,0 -6.907975,-3.4788 -6.907975,-3.4788 -2.68575,-3.5212 -2.68575,-3.5212 -2.283486,0 -2.283486,0 -1.089568,-3.12554 -1.089569,-3.12554 0.611951,-3.82693 0.611951,-3.82693 -0.665053,-3.54504 -0.665054,-3.54504 -2.837984,-1.46758 -2.837984,-1.46758 -0.616228,-2.45525 -0.616228,-2.45525 -3.250942,-0.68753 C 22.99131,358.67667 17,355.2645 17,353.91844 L 17,353 l 3.75,-0.0137 c 2.0625,-0.008 4.725793,-0.2754 5.918428,-0.5953 l 2.168428,-0.58165 0.432377,-11.6547 C 29.507041,333.74462 29.996684,327.6 30.35733,326.5 l 0.655719,-2 -5.238314,-3.16113 -5.238314,-3.16114 -1.788877,0.95738 -1.788878,0.95738 -0.979333,-0.60526 L 15,318.88197 15,315.44098 15,312 l 1.113544,0 1.113544,0 -0.657512,-4.3846 -0.657512,-4.38461 1.615396,-1.61539 C 18.415929,300.72693 19.737569,300 20.46444,300 l 1.321582,0 0.606989,-1.58179 C 22.726855,297.54823 23,295.81797 23,294.5732 l 0,-2.26322 1.964959,-1.77827 1.964959,-1.77826 2.681637,0.51263 2.681637,0.51262 4.603404,-1.5488 c 2.531872,-0.85185 4.89258,-1.98792 5.246017,-2.52461 l 0.642612,-0.97581 2.86257,0.9979 2.862569,0.99789 2.416472,-0.89391 2.416472,-0.89391 0.813033,1.28128 c 0.447169,0.7047 0.819924,2.08289 0.828346,3.06265 L 55,291.06277 l 1.25,0.38367 c 0.6875,0.21102 3.429429,0.64404 6.093176,0.96226 l 4.843176,0.57858 6.156824,-5.85286 6.156824,-5.85285 3.5,1.46751 c 1.925,0.80714 6.164784,1.84553 9.421743,2.30754 l 5.921743,0.84003 4.755984,-3.78677 4.75598,-3.78678 8.82228,-2.2257 c 4.85225,-1.22414 10.62227,-2.73811 12.82227,-3.36438 2.2,-0.62627 5.1113,-1.1599 6.46957,-1.18585 l 2.46956,-0.0472 1.38742,-7.17299 1.38742,-7.173 2.89302,-1.19833 2.89301,-1.19832 0,-1.85963 0,-1.85963 2.36786,-0.59429 2.36787,-0.5943 0.54277,-5.25897 0.54277,-5.25898 -1.30145,-6.23657 -1.30145,-6.23657 1.24652,-4.72534 c 0.68559,-2.59893 1.74431,-5.65545 2.35271,-6.79226 l 1.10618,-2.06692 -3.46827,-1.86779 -3.46828,-1.8678 0.33562,-1.01915 0.33562,-1.01916 8.92077,-0.61753 c 4.90642,-0.33964 10.974,-0.95176 13.48351,-1.36026 l 4.56274,-0.74273 1.71031,2.61026 1.71031,2.61026 3.04268,0 3.04269,0 1.8999,1.01679 1.89989,1.0168 1.61281,-3.11884 1.61282,-3.11884 -2.15297,-2.29172 -2.15297,-2.29173 2.18309,-4.35623 c 1.2007,-2.39593 5.05923,-9.3415 8.57452,-15.4346 C 202.12386,175.32853 205,169.77473 205,169.07986 l 0,-1.2634 6.51823,3.58287 6.51822,3.58286 4.09579,0.65495 4.0958,0.65494 2.57922,2.21855 2.57922,2.21855 4.05676,-1.84263 4.05676,-1.84263 2.27475,-0.022 2.27475,-0.022 1.05053,-2.75 1.05053,-2.75 -0.45254,-5 -0.45254,-5 2.62726,-6.78641 2.62726,-6.7864 3.6505,0.60749 3.65049,0.60749 3.90245,-1.99087 3.90244,-1.99088 1.19706,-2.62726 C 267.46132,141.08816 268,139.03564 268,137.972 l 0,-1.9339 2.57374,-0.64596 2.57374,-0.64597 2.54117,1.15783 2.54117,1.15783 1.80093,-0.57159 1.80094,-0.57159 0.6304,1.02001 0.6304,1.02001 -1.11732,2.08772 -1.11731,2.08773 1.57107,2.39775 c 0.86409,1.31877 1.57664,3.2011 1.58345,4.18295 l 0.0124,1.78518 3.39744,2.20008 3.39744,2.20007 2.85039,5.29993 2.85039,5.29992 4.14954,0 4.14953,0 2.40471,2.25 2.4047,2.25 1.43555,0.0124 1.43555,0.0124 2.2314,3.44523 2.23141,3.44522 0.63884,4.2924 0.63884,4.29239 2.87976,5.42759 2.87975,5.42758 -0.0318,2.57242 -0.0318,2.57241 -1.39136,1.83605 -1.39136,1.83606 0.54599,3.36456 0.546,3.36456 -3.12283,4.24639 -3.12283,4.24639 0,4.18055 0,4.18055 1.25559,1.04205 c 0.69058,0.57313 2.60308,1.36122 4.25,1.75132 1.64693,0.39009 4.56941,1.55272 6.49441,2.58363 l 3.5,1.87436 13.24258,1.91311 13.24259,1.9131 5.25741,4.426 c 2.89158,2.4343 7.78217,6.26479 10.86797,8.51219 l 5.61055,4.08618 3.63945,0.68277 3.63945,0.68276 0,2.33902 0,2.33902 1.49739,0.83798 1.49738,0.83798 2.65679,8.96171 2.65678,8.96171 3.87738,5.25 3.87737,5.25 -0.95399,0 -0.954,0 -1.16871,3.54124 -1.16872,3.54124 0.51893,1.35231 0.51893,1.3523 -2.189,2.05646 -2.18899,2.05645 -4.48877,0.68652 c -2.46882,0.37759 -4.93877,1.0281 -5.48877,1.44559 -0.55,0.4175 -3.91098,1.97822 -7.46884,3.46828 l -6.46885,2.7092 -3.53115,3.35922 c -1.94214,1.84757 -6.11866,5.69069 -9.28116,8.54026 l -5.75,5.18104 0,1.23994 0,1.23993 -2.46482,1.61501 -2.46481,1.61501 -3.91019,0 -3.91018,0 -0.71223,3.25 c -0.39172,1.7875 -1.04274,7.62591 -1.44671,12.97426 l -0.73449,9.72425 -1.76356,1.94871 -1.76356,1.94872 -3.16473,-0.0651 -3.16472,-0.0651 -4.41486,1.69405 -4.41487,1.69404 -10.08513,0.61305 -10.08514,0.61306 -4.83114,2.97077 -4.83115,2.97077 0.56749,2.11429 c 0.31212,1.16287 0.57364,4.20738 0.58115,6.7656 l 0.0136,4.65129 6.97747,5.32124 6.97747,5.32123 -0.97747,0.97747 L 302,404.4 l 0,2.32144 0,2.32144 -2.75,1.17192 c -1.5125,0.64456 -3.5375,1.82965 -4.5,2.63355 l -1.75,1.46163 0,2.26322 c 0,1.24477 0.27314,2.97503 0.60699,3.84501 l 0.60699,1.58179 2.39301,0 2.39301,0 0,1 0,1 -1.96607,0 c -1.08134,0 -3.56291,0.76148 -5.5146,1.69217 l -3.54853,1.69218 -4.51215,-2.19218 L 278.9465,423 272.72325,422.97776 266.5,422.95553 264,421 c -1.375,-1.07554 -3.00582,-1.96553 -3.62405,-1.97776 -0.61822,-0.0122 -3.25007,-1.2105 -5.84854,-2.66281 l -4.72449,-2.64057 -6.7483,-0.48284 -6.7483,-0.48284 -2.48486,1.62815 -2.48487,1.62815 -6.41829,-0.16476 -6.4183,-0.16476 -2.5,0.77677 c -1.375,0.42723 -5.13011,2.3577 -8.34468,4.28994 l -5.84468,3.51317 -3.80051,-1.13866 -3.8005,-1.13866 -9.31949,2.49406 -9.3195,2.49406 -0.98532,-0.98532 L 173.6,425 l -3.11291,0 -3.11291,0 -2.79896,-2.92149 -2.79896,-2.92148 -4.82603,-1.57852 C 154.29592,416.71033 151.06126,416 149.7621,416 l -2.3621,0 -1.10794,-1.10794 -1.10793,-1.10793 -3.54982,1.17154 -3.54982,1.17155 -2.09189,3.38476 -2.0919,3.38476 -2.07386,0.65822 -2.07385,0.65821 -2.40621,-2.59499 -2.40622,-2.59499 -2.51685,-0.63169 -2.51685,-0.63169 -0.57522,0.57522 -0.57523,0.57523 -4.62821,-2.46405 c -2.54551,-1.35523 -5.36784,-2.99004 -6.27184,-3.63292 l -1.64363,-1.16888 -1.55875,1.55875 c -0.85731,0.85731 -1.35695,1.76054 -1.1103,2.00718 0.24664,0.24664 -0.67479,1.50366 -2.04762,2.79336 L 99,420.34863 l 0,1.32568 0,1.32569 -1.5,0 -1.5,0 0,3.38499 0,3.38499 -2.331899,1.52792 -2.331899,1.52792 -1.418101,-0.8976 z").attr(o);
    b = 220;
    k = 300;
    j = "\u65b0\u7586";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 313,637.34536 c -1.1,-0.29672 -2.38303,-0.90134 -2.85118,-1.3436 l -0.85117,-0.80411 -3.14223,0.90117 c -1.72822,0.49565 -4.04519,0.89767 -5.14882,0.89338 l -2.0066,-0.008 -1.21649,-2.62056 -1.21649,-2.62055 1.04349,-1.94979 1.0435,-1.94978 -0.51795,-1.34974 -0.51794,-1.34974 -2.7082,-0.32212 -2.7082,-0.32212 -0.99811,-1.59522 -0.99812,-1.59523 0.67184,-2.6768 0.67183,-2.67681 1.90968,1.02203 c 1.05032,0.56212 2.95176,1.00098 4.22542,0.97526 l 2.31574,-0.0468 -4.56457,-1.78619 c -2.51051,-0.98241 -5.89586,-2.77046 -7.523,-3.97346 l -2.95843,-2.18726 -5.40112,-0.63968 -5.40113,-0.63969 -3.57587,-3.13153 c -1.96674,-1.72234 -4.82892,-3.67281 -6.36042,-4.33438 l -2.78453,-1.20285 -6.21547,2.864 -6.21546,2.86401 -5.7933,5.86924 -5.7933,5.86925 -0.80811,-1.30755 -0.80811,-1.30754 1.52816,-4.24962 1.52815,-4.24962 -0.63392,-1.65199 -0.63393,-1.65199 -2.66887,-0.66985 -2.66887,-0.66984 -8.83396,1.98004 -8.83395,1.98004 -1.04411,-1.04411 -1.0441,-1.0441 -3.52686,0.23752 -3.52686,0.23752 -4.94132,-4.16658 -4.94131,-4.16658 -2.46918,1.61787 -2.46917,1.61786 -2.90166,-2.44158 -2.90165,-2.44158 -1.18964,1.18964 -1.18964,1.18964 -0.51906,-1.98276 -0.51906,-1.98275 -3.48289,-2.28194 -3.48288,-2.28194 -2.9653,-0.59306 -2.9653,-0.59284 -0.11515,-2.125 c -0.0633,-1.16875 -0.035,-2.9125 0.0628,-3.875 l 0.17802,-1.75 -3.23288,0 -3.23288,0 -5.86681,-3.75 -5.8668,-3.75 0.61972,-4.67045 0.61972,-4.67045 -2.26939,-1.21454 -2.26939,-1.21455 -2.11857,2.65695 -2.11857,2.65694 -2.08697,-2.27195 -2.08697,-2.27195 -0.7227,-3.41061 -0.72269,-3.4106 -7.65256,-7.5894 -7.65256,-7.58939 -5.23826,-3.5 -5.23826,-3.5 -0.59289,-2.21028 -0.59289,-2.21027 -5.15156,3.48923 -5.15156,3.48923 -1,-1.76152 c -0.55,-0.96884 -3.94597,-4.91937 -7.5466,-8.77896 -3.60058,-3.85958 -7.785981,-8.70493 -9.300841,-10.76743 l -2.754292,-3.75 -1.914312,0 -1.914313,0 -3.543708,-3.11142 -3.543708,-3.11141 L 67.88268,500.38858 67.283184,498 l -1.922977,0 -1.922977,0 -0.486448,-1.26766 -0.486449,-1.26767 0.926245,-6.48233 0.926245,-6.48234 -1.581735,-4.57714 -1.581734,-4.57713 0.641938,-1.67287 L 62.43723,470 l 2.012333,0 2.012333,0 0.655259,2.61076 0.65526,2.61076 5.09502,-0.67587 5.095019,-0.67588 0.75346,-1.18489 0.75346,-1.18488 0.01531,-6.6788 0.01531,-6.6788 -3.494521,-3.70527 -3.494522,-3.70527 0.638121,-6.86593 0.638121,-6.86593 2.239769,0 2.239769,0 0.523012,-2 0.523012,-2 4.546566,0 4.546567,0 2.668921,1.21604 2.668922,1.21604 2.373164,-2.96604 2.373165,-2.96604 0.005,-2.28139 0.005,-2.28138 1.5,-0.5756 1.5,-0.57561 0,-1.19684 0,-1.19685 3.33468,-3.23209 3.33467,-3.23209 4.41533,2.52388 4.41532,2.52388 3.34879,0.012 3.34879,0.012 2.67205,2.86044 2.67205,2.86044 2.99602,-0.43972 2.99601,-0.43972 2.267,-3.45834 2.267,-3.45835 2.71615,-1.03905 2.71614,-1.03905 1.73643,1.07667 c 0.95504,0.59218 2.75504,1.08346 4,1.09174 3.57683,0.0238 9.1551,2.28346 13.13976,5.32271 l 3.66371,2.79445 3.50433,0.56867 c 1.92739,0.31277 3.71575,0.91075 3.97415,1.32885 l 0.46981,0.76017 9.75591,-2.47781 9.7559,-2.47781 3.75505,1.12451 3.75506,1.12451 6.98873,-4.15193 6.98873,-4.15193 8.75621,-0.53092 8.75622,-0.53093 1.70629,-1.17234 1.70629,-1.17233 7.1288,0.76171 7.1288,0.76171 1.16491,0.94929 c 0.6407,0.52211 4.35125,2.58716 8.24567,4.58901 l 7.08075,3.63971 4.41925,-0.28718 L 277,424.5 l 0,1.28315 0,1.28315 -2.5,1.24638 -2.5,1.24639 0,1.47046 0,1.47047 2.31115,0.32756 2.31115,0.32757 0.47868,1.24741 0.47867,1.24742 -3.07399,7.67692 -3.07399,7.67693 0.96439,1.80198 0.96439,1.80197 -0.68023,1.09531 -0.68022,1.0953 -2.5,0.35081 -2.5,0.35082 0.3241,5.94296 0.32411,5.94297 1.43861,2.55703 c 0.79124,1.40637 1.85132,3.23204 2.35574,4.05704 1.18924,1.94506 7.68048,16.00427 8.38014,18.15034 l 0.53804,1.65034 4.31963,0.67896 c 2.3758,0.37342 6.79463,1.49848 9.81963,2.50014 3.025,1.00165 6.74885,2.10238 8.27521,2.44608 l 2.77521,0.6249 3.72479,3.26606 c 2.04864,1.79634 4.8786,3.76214 6.28882,4.36845 l 2.56403,1.10238 1.84711,-1.03369 1.84711,-1.0337 1.1991,1.63987 1.19911,1.63987 3.43975,0 3.43976,0 1.08301,1.08301 1.083,1.083 9.867,0.88132 c 5.42684,0.48473 10.87688,0.89737 12.11118,0.917 l 2.2442,0.0357 4.49173,4.42815 4.49174,4.42814 1.90918,0.60595 1.90917,0.60595 0.60436,3.22151 0.60436,3.22151 5.11492,2.34652 5.11492,2.34652 3.04933,-0.60987 3.04932,-0.60986 2.21886,1.45385 2.21886,1.45385 1.44408,-1.19611 c 1.98464,-1.64385 6.94842,-8.37902 9.68926,-13.14702 l 2.27115,-3.95092 -0.55981,-2.79908 L 404.55,515 l 1.725,0.0173 1.725,0.0173 2.25082,2.37452 2.25082,2.37452 2.74918,0.67593 c 1.51205,0.37176 3.76168,1.33082 4.99918,2.13126 l 2.25,1.45533 0,1.8545 0,1.8545 1.5,1.24489 1.5,1.24489 0,3.19756 0,3.19755 3.59799,4.20345 3.59799,4.20344 -0.5666,1.47656 -0.56661,1.47655 -1.53139,0 C 429.18912,548 428.5,548.21114 428.5,548.46921 c 0,0.42949 2.97808,6.76539 5.0016,10.64097 l 0.84071,1.61018 0.67238,15.21119 0.67237,15.21118 -1.50917,1.17864 -1.50917,1.17863 -0.3402,2 -0.3402,2 -2.24416,0.98713 -2.24416,0.98713 -0.1797,3.01287 c -0.0988,1.65708 -0.0874,4.41079 0.0254,6.11936 l 0.20508,3.1065 -1.46146,1.2129 -1.46146,1.2129 -1.95891,-1.04838 -1.95892,-1.04838 -1.16841,1.40785 -1.16841,1.40785 -3.4366,-2.02764 C 413.04647,611.71489 411.5,610.3969 411.5,609.90122 l 0,-0.90122 -2.32569,0 -2.32568,0 -2.37632,2.52947 -2.37632,2.52948 -1.54799,-0.53193 -1.548,-0.53193 1.82464,1.41728 1.82464,1.41727 -0.32464,2.73628 -0.32464,2.73629 -2.62027,1.94729 -2.62027,1.94729 -5.37973,-3.75755 c -2.95885,-2.06665 -5.52973,-4.13592 -5.71306,-4.59839 L 385.33333,616 l -1.85765,0 -1.85765,0 -0.64317,-1.04068 -0.64317,-1.04067 -1.81047,0.57462 -1.81048,0.57462 -1.5926,-1.59261 -1.5926,-1.5926 -5.64877,1.80866 -5.64876,1.80866 -0.45108,1.63699 -0.45109,1.63699 -6.35323,2.70016 -6.35323,2.70016 -3.91082,0.52455 -3.91081,0.52455 -4.39888,4.23427 c -2.41938,2.32884 -4.86571,5.04002 -5.43629,6.02484 l -1.03742,1.79058 -7.46258,0.30587 C 318.35816,637.7472 314.1,637.64206 313,637.34536 z").attr(o);
    b = 250;
    k = 520;
    j = "\u897f\u85cf";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 389.23333,535.14515 -2.73765,-1.65684 -1.86818,1.1667 -1.86818,1.1667 -5.14417,-2.54582 -5.14417,-2.54582 0,-2.39724 0,-2.39724 -4.51194,-2.72531 -4.51193,-2.72531 -0.55894,-1.76104 -0.55893,-1.76103 -2.89368,-1.49639 -2.89368,-1.49638 -10.78545,-0.61104 -10.78545,-0.61104 -2.21482,-1.38161 -2.21481,-1.38161 -2.67494,0 -2.67495,0 -1.25069,-1.71043 -1.2507,-1.71043 -2.35954,1.07503 -2.35955,1.07503 -2.35496,-0.8712 -2.35495,-0.8712 -2.74275,-2.93613 -2.74275,-2.93612 -2.9023,-0.64997 c -1.59626,-0.35748 -5.83684,-1.73326 -9.4235,-3.05727 l -6.52121,-2.40731 -3.12264,0 -3.12264,0 -4.21766,-8.75 c -2.31971,-4.8125 -4.61176,-9.425 -5.09343,-10.25 -0.48167,-0.825 -1.61874,-2.83552 -2.52681,-4.46781 l -1.65103,-2.96782 -0.32682,-4.66416 -0.32681,-4.66416 3.09663,-0.61932 3.09662,-0.61933 -0.52199,-3.89169 -0.52198,-3.8917 2.38586,-5.857 2.38586,-5.85701 0.005,-2.71806 0.005,-2.71807 -2.64665,-1.38672 -2.64666,-1.38672 2.64666,-0.66427 2.64665,-0.66426 0,-1.98095 0,-1.98095 1.25,0.0318 c 0.6875,0.0175 2.12351,0.69249 3.19113,1.5 l 1.94113,1.4682 3.05887,-0.004 3.05887,-0.004 5,-1.79342 5,-1.79341 0,-1.95255 0,-1.95262 -2.75,-0.31642 -2.75,-0.31642 0,-2.92571 0,-2.92571 3.75,-1.76177 3.75,-1.76177 0.34718,-2.45692 0.34717,-2.45691 1.61508,-1.18097 1.61508,-1.18098 -1.35625,-1.63417 c -0.74593,-0.89879 -4.21644,-3.73428 -7.71225,-6.30108 l -6.35601,-4.66691 0,-5.79458 0,-5.79459 3.98013,-2.51255 3.98013,-2.51254 4.57831,0 c 2.51808,0 7.81452,-0.47006 11.76988,-1.04457 l 7.19155,-1.04457 3.51835,-1.50285 3.51836,-1.50284 5.57672,2.46629 5.57672,2.46629 1.25197,3.02252 1.25197,3.02251 4.7954,-0.56794 4.7954,-0.56795 0.67494,2.12656 0.67494,2.12655 3.41229,0 3.41229,0 2.04065,4 c 1.12236,2.2 2.19508,4 2.38383,4 0.18876,0 2.67184,-0.44162 5.51797,-0.98138 l 5.17477,-0.98137 5.21172,1.98087 5.21171,1.98087 3.31574,5.1e-4 3.31574,5e-4 1.93844,1.03742 1.93843,1.03742 3.893,-1.04828 3.893,-1.04827 0.60283,-1.57093 c 0.33155,-0.86402 0.60282,-2.25216 0.60282,-3.08478 0,-0.83261 0.95259,-2.85162 2.11686,-4.48669 l 2.11686,-2.97285 -0.60407,-3.77764 -0.60407,-3.77764 0.57114,-0.57114 0.57114,-0.57115 5.51833,1.89859 5.51833,1.89858 3.09027,3.02132 3.09027,3.02131 2.60978,-2.50033 2.60978,-2.50032 1.17748,1.17748 1.17749,1.17749 2.30856,-1.23551 2.30857,-1.23551 2.65084,1.00785 2.65084,1.00784 1.09598,2.04787 1.09599,2.04787 1.27409,0 1.27409,0 4.74835,5.5 4.74836,5.5 1.39268,0 1.39268,0 0.93511,-1.67095 0.93511,-1.67095 3.24031,2.42095 c 1.78217,1.33152 5.46856,4.56852 8.19197,7.19332 l 4.95166,4.77237 4.77955,2.42198 4.77955,2.42198 2.14306,-1.50105 2.14306,-1.50106 0,1.40172 0,1.40171 2.08255,1.88469 2.08256,1.88468 1.41744,3.39243 c 0.7796,1.86584 1.41745,4.18237 1.41745,5.14786 l 0,1.75543 1.5,1.24489 1.5,1.24489 0,2.90894 0,2.90894 1.53726,0.5899 1.53725,0.5899 1.51064,3.61547 1.51065,3.61548 -0.67568,4.01324 -0.67568,4.01324 -1.62222,2.02884 -1.62222,2.02883 -1.75,-0.35216 -1.75,-0.35216 0,0.9273 c 0,0.51002 -1.12717,2.14354 -2.50482,3.63005 l -2.50483,2.70275 1.08453,2.02646 1.08453,2.02646 -1.6533,1.82688 -1.6533,1.82688 -2.42641,0.60898 -2.4264,0.60899 0,6.94577 0,6.94576 -1.76403,0.94408 -1.76403,0.94408 -2.98636,-1.25566 c -1.64249,-0.69062 -3.60378,-1.99963 -4.35841,-2.9089 l -1.37206,-1.65323 -2.26815,0 -2.26815,0 -0.47026,3.75 -0.47027,3.75 0.87174,1.11557 0.87173,1.11556 4.52945,0.62083 c 2.49119,0.34146 5.43284,1.10432 6.53699,1.69524 l 2.00755,1.0744 0.92738,2.4392 0.92738,2.4392 3.85577,0 3.85577,0 1.31109,2.4498 1.3111,2.4498 -1.26344,3.0502 c -1.29972,3.13781 -2.4387,3.80105 -3.52079,2.0502 l -0.61803,-1 -1.786,0 -1.78599,0 -1.85246,2.04694 -1.85245,2.04693 -1.33447,-2.54693 -1.33447,-2.54694 -1.88703,0 c -1.03786,0 -3.26407,0.7875 -4.94713,1.75 l -3.0601,1.75 -1.11726,2.68964 -1.11725,2.68965 0.53034,0.8581 0.53033,0.8581 -0.80189,1.29749 -0.80189,1.29748 -3.41249,0.0967 -3.4125,0.0967 -4.96963,-5.30037 c -2.7333,-2.9152 -5.29263,-6.15159 -5.68741,-7.19196 l -0.71777,-1.89153 -2.30972,0 -2.30972,0 -2.27433,1.593 -2.27433,1.59301 -5.19818,-2.50627 -5.19817,-2.50627 -9.2147,-0.0109 -9.21469,-0.0109 -3.28531,2.24822 -3.2853,2.24822 0.24323,3.09794 0.24323,3.09794 -2.92413,0.64225 -2.92413,0.64225 -1.11216,1.34007 -1.11216,1.34006 0.62409,2.48656 0.62408,2.48656 -1.08102,0.66811 c -0.59457,0.36753 -1.08103,1.31059 -1.08103,2.09574 l 0,1.42756 -4.25,5.95951 c -2.3375,3.27773 -4.475,5.94263 -4.75,5.922 -0.275,-0.0206 -1.73194,-0.78309 -3.23765,-1.69434 z").attr(o);
    b = 390;
    k = 450;
    j = "\u9752\u6d77";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 546.38388,517.63945 -4.6107,-1.13121 -1.6393,-1.37244 -1.63931,-1.37245 0,-2.25543 c 0,-1.24049 -0.68104,-3.88539 -1.51342,-5.87756 l -1.51342,-3.62212 -1.02176,0 c -0.56197,0 -2.18615,0.76293 -3.60928,1.6954 l -2.5875,1.6954 -3.89569,-4.4454 c -5.09035,-5.80865 -6.38852,-7.17633 -8.31952,-8.76496 l -1.60394,-1.31957 0.62484,-3.33065 0.62483,-3.33065 -3.06429,-0.67303 -3.06428,-0.67303 -2.77829,1.42139 c -1.52805,0.78177 -4.50106,2.25459 -6.60668,3.27294 l -3.82841,1.85155 0.43973,2.3003 0.43974,2.30031 -2.95495,0 -2.95495,0 -0.53348,-2.04005 -0.53349,-2.04005 -2.82323,-1.45995 -2.82324,-1.45995 -2.96787,0 c -1.63233,0 -3.67968,-0.27314 -4.54966,-0.60699 l -1.58179,-0.60699 0,-2.89301 0,-2.89301 0.95559,0 c 0.52558,0 2.61337,1.125 4.63955,2.5 l 3.68395,2.5 3.19994,0 3.19994,0 1.18236,-2.59499 1.18235,-2.59499 -0.63718,-4.80336 -0.63719,-4.80335 3.64992,-1.73201 3.64992,-1.732 1.00061,-1.86965 1.00061,-1.86965 -0.94119,-1.75862 -0.94118,-1.75862 2.34964,-2.73162 2.34964,-2.73162 1.30636,0.4918 1.30636,0.4918 1.96702,-3.25156 1.96701,-3.25156 0.76675,-4.5 0.76676,-4.5 -1.73377,-3.5 c -0.95357,-1.925 -2.29627,-3.85986 -2.98377,-4.29969 l -1.25,-0.79969 0,-2.32787 0,-2.32786 -1.5,-1.24489 -1.5,-1.24489 0,-1.75044 c 0,-0.96274 -0.93289,-3.85938 -2.07308,-6.43698 l -2.07309,-4.68655 -1.42691,-0.54756 -1.42692,-0.54756 0,-1.42439 0,-1.4244 -1.43926,-0.5523 -1.43926,-0.55229 -1.7737,0.99261 -1.7737,0.99261 -4.53704,-2.30711 -4.53704,-2.3071 -2.28875,-3.11374 -2.28874,-3.11374 -4.08737,-2.73809 c -2.24805,-1.50594 -5.38061,-3.567 -6.96125,-4.58013 l -2.87389,-1.84205 0,1.53303 c 0,0.84317 -0.4368,1.80299 -0.97066,2.13293 l -0.97065,0.5999 -7.4654,-7.39307 -7.4654,-7.39308 -3.17873,-1.31667 -3.17872,-1.31667 -1.75689,1.0972 -1.75689,1.09719 -1.11509,-1.11509 -1.11508,-1.11508 -2.3277,2.18675 c -2.97958,2.79918 -4.1089,2.75214 -6.48621,-0.27012 l -1.93258,-2.45688 -6.05393,-1.68314 -6.05392,-1.68314 -1.64846,0.63258 -1.64847,0.63257 0.66803,4.45472 0.66802,4.45472 -2.10563,2.9571 -2.10564,2.95709 0,2.35094 0,2.35094 -3.39063,1.06125 -3.39063,1.06125 -1.8005,-1.31656 -1.8005,-1.31656 -3.68314,0 -3.68315,0 -4.37572,-1.58201 -4.37573,-1.58202 -5.73813,0.56544 -5.73813,0.56544 -2.0322,-3.98342 -2.03219,-3.98343 -3.41229,0 -3.41229,0 -0.66049,-2.08103 -0.66049,-2.08103 -4.75534,0.65402 -4.75534,0.65403 -1.25488,-3.02954 -1.25487,-3.02954 -3.39668,-1.12101 -3.39668,-1.121 0,-0.95384 c 0,-0.52461 0.64021,-1.1995 1.42268,-1.49976 2.16896,-0.83231 2.70896,-2.99088 3.60021,-14.3913 0.45148,-5.775 1.11613,-11.25351 1.477,-12.17447 l 0.65612,-1.67447 3.36276,0.5457 3.36276,0.5457 2.54281,-2.87123 c 5.44521,-6.14851 11.44905,-12.07603 16.95828,-16.74269 l 5.751,-4.87146 5.18319,-1.96708 c 2.85075,-1.0819 5.65552,-2.3575 6.2328,-2.83468 0.57729,-0.47718 3.05229,-1.18289 5.5,-1.56823 l 4.45039,-0.70064 3.10917,-2.3545 3.10918,-2.3545 -0.47725,-2.49656 -0.47725,-2.49656 1.18658,-2.86465 1.18658,-2.86466 6.68149,1.68193 6.6815,1.68193 0.76688,5.94056 c 1.00224,7.76378 1.02058,9.07823 0.20243,14.50781 l -0.68822,4.56725 2.74152,5.43275 c 2.50764,4.96927 5.11231,8.55964 10.65178,14.68275 l 2.03553,2.25 1.89216,0 1.89216,0 3.87408,-3.5 3.87408,-3.5 9.43767,0 9.43767,0 1.56347,1.25 1.56347,1.25 0.58313,2.43773 0.58314,2.43774 -5.95548,5.6669 -5.95547,5.6669 0,1.0693 0,1.06931 3.09442,2.32606 c 1.70193,1.27933 4.43655,3.56356 6.07692,5.07606 l 2.98251,2.75 3.49046,0 3.49047,0 -0.65769,2.07217 -0.65768,2.07217 0.58181,2.31809 0.5818,2.31809 6.51901,2.60974 6.51901,2.60974 5.46924,0 5.46925,0 4.27023,-1.64384 4.27024,-1.64383 4.5,-4.28406 4.5,-4.28406 3.75778,-0.68486 3.75779,-0.68485 3.49221,2.66364 3.49222,2.66364 0,2.78245 c 0,1.53034 -0.3375,3.12002 -0.75,3.53261 l -0.75,0.75018 0,4.16649 0,4.16649 -3.16184,0.93199 -3.16184,0.93199 -0.62653,3.56801 c -0.34459,1.96241 -0.88044,5.24412 -1.19078,7.29269 l -0.56425,3.72468 2.85262,1.275 c 1.56894,0.70126 3.58389,2.15481 4.47767,3.23013 l 1.62506,1.95513 4.87494,0.168 4.87495,0.16801 0.98713,2.12718 c 0.54292,1.16996 1.3299,2.12719 1.74885,2.12719 0.41895,0 2.4921,1.6875 4.60699,3.75 l 3.84525,3.75 0.57115,4.32762 0.57114,4.32761 1.58474,1.75113 1.58475,1.75112 0,1.68483 c 0,0.92666 -0.54457,2.55682 -1.21016,3.6226 l -1.21015,1.93776 0.96205,2.73559 0.96206,2.73559 3.31624,0.85932 3.31624,0.85933 1.02969,2.95375 1.02968,2.95375 2.70218,0 2.70217,0 1.09378,1.09378 1.09378,1.09378 1.85622,-0.35346 1.85622,-0.35346 0.5,-3.98444 0.5,-3.98444 2.9118,-0.50588 2.9118,-0.50588 1.17833,-3.5 1.17833,-3.5 -0.42733,-1.63745 -0.42733,-1.63744 -3.83354,-1.72869 -3.83354,-1.72869 -0.64114,-2.55452 -0.64115,-2.55453 1.95512,-2.64443 1.95511,-2.64444 -0.89859,-1.6057 -0.8986,-1.6057 1.04253,-2.74204 1.04252,-2.74205 1.16284,1.16284 1.16284,1.16284 3.18337,0 3.18337,0 0.49197,1.88131 0.49197,1.8813 3.87466,1.22616 c 2.13106,0.67438 5.57031,2.36964 7.64277,3.76724 l 3.76812,2.5411 0.59166,-0.59166 0.59166,-0.59166 3.55931,1.90767 c 4.21615,2.25973 5.18529,3.58263 5.20583,7.1061 l 0.0153,2.62755 -1.5,1.24489 -1.5,1.24489 0,3.17755 0,3.17756 1.12678,1.12678 1.12679,1.12679 -0.64584,2.57321 -0.64583,2.57322 -4.23095,0.1508 c -2.32702,0.0829 -5.46845,0.0541 -6.98095,-0.064 l -2.75,-0.21477 0,3.5027 0,3.50269 -4.53929,0.68071 -4.53928,0.68071 -1.93827,-1.75411 -1.93828,-1.75412 -4.10503,0.5506 c -5.0409,0.67613 -5.26767,0.89364 -5.15256,4.94237 l 0.0925,3.25178 -1.56116,1.72506 -1.56115,1.72506 0.58989,1.53724 0.5899,1.53725 2.06277,0 2.06277,0 0.5384,1.40305 0.5384,1.40305 -1.92688,3.84695 -1.92687,3.84695 0.46649,3.75 0.4665,3.75 -1.8594,0.14806 c -1.02268,0.0814 -2.53441,0.20511 -3.35941,0.27484 -0.825,0.0697 -2.40111,0.44807 -3.50248,0.84076 l -2.00247,0.71399 -1.21947,1.95269 -1.21948,1.95269 1.87957,0.59655 1.87957,0.59655 0.63793,1.66244 0.63794,1.66243 -1.87052,2.50536 -1.87052,2.50535 -3.17503,0.82274 -3.17504,0.82273 0,2.43623 0,2.43622 -1.93426,1.03519 c -2.19765,1.17614 -1.98791,1.1847 -8.17643,-0.33361 z").attr(o);
    b = 390;
    k = 350;
    j = "\u7518\u8083";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    l = c.path("m 529.71021,410.3801 -1.25,-0.50439 0,-1.19743 0,-1.19742 -3.13363,-1.18282 -3.13364,-1.18281 0.75722,-4.28643 c 0.41646,-2.35753 0.73176,-5.04479 0.70065,-5.97169 l -0.0566,-1.68526 2.94129,-0.64602 2.94129,-0.64601 0.99567,-1.86043 0.99567,-1.86042 -0.0325,-3.30829 c -0.0179,-1.81957 0.21527,-5.1083 0.51812,-7.3083 l 0.55063,-4 -3.68312,-2.75 -3.68313,-2.75 -4.63076,0 -4.63076,0 -4.32797,4.40988 -4.32797,4.40988 -4.48964,1.71461 -4.48963,1.7146 -7.14061,-0.45894 -7.14058,-0.45894 -2.5,-1.32097 c -1.375,-0.72653 -3.175,-1.64313 -4,-2.03689 l -1.5,-0.71592 -0.1219,-3.37865 c -0.067,-1.85826 -0.17954,-3.94116 -0.25,-4.62866 l -0.1281,-1.25 -4.03138,0 -4.03139,0 -0.59195,-1.5426 -0.59195,-1.54259 -3.80882,-1.94312 c -2.09484,-1.06871 -4.08494,-2.3899 -4.42244,-2.93598 l -0.61362,-0.99286 2.28103,-3.08526 2.28103,-3.08526 3.26474,-2.01773 3.26475,-2.01772 0,-3.46389 0,-3.4639 -2.45454,-2.45454 -2.45455,-2.45455 -10.04257,0 -10.04258,0 -3.87408,3.5 -3.87408,3.5 -1.47226,0 -1.47227,0 -4.09518,-4.85664 -4.09518,-4.85664 -3.27859,-6.64865 -3.2786,-6.64865 1.35405,-3.24471 c 1.4194,-3.4013 1.43088,-3.71503 0.4785,-13.08477 l -0.59361,-5.84007 6.84777,0.69451 c 3.76627,0.38199 10.22277,1.33314 14.34777,2.11367 l 7.5,1.41915 8.55341,-1.18704 8.5534,-1.18704 13.30851,2.12629 13.3085,2.12629 3.13809,3.49938 3.13809,3.49938 15.47521,3.90337 15.47522,3.90338 2.99298,-0.85838 2.99299,-0.85838 2.0318,2.3695 c 1.11749,1.30323 2.8617,2.65212 3.87602,2.99755 l 1.84423,0.62805 9.65577,-5.86362 c 12.32365,-7.48371 18.76353,-10.71561 23.15578,-11.62088 1.925,-0.39675 4.4928,-1.34966 5.70622,-2.11758 l 2.20622,-1.3962 4.79378,0.12764 c 2.63658,0.0702 10.22105,-0.51932 16.85439,-1.31004 l 12.0606,-1.43768 7.47086,-3.84585 7.47086,-3.84584 5.46853,-7.44671 5.46854,-7.4467 3.5,-1.81542 3.5,-1.81541 3.42497,-3.56577 3.42498,-3.56576 -3.93379,-4.77186 c -2.16358,-2.62453 -4.48214,-5.48071 -5.15234,-6.34706 l -1.21856,-1.5752 2.84589,-7.4248 2.8459,-7.42481 4.23368,-0.31249 4.23368,-0.31249 1.74839,1.58227 1.7484,1.58227 8.20984,0.6331 8.20984,0.6331 5.04115,-4.90288 c 2.77264,-2.69658 6.091,-6.5348 7.37414,-8.52938 l 2.33299,-3.62649 6.81542,-0.70527 6.81542,-0.70526 4.75,-4.63065 4.75,-4.63065 0,-2.31971 c 0,-1.27584 0.61381,-3.78877 1.36403,-5.58428 l 1.36402,-3.26457 3.2127,-2.70331 3.2127,-2.70331 2.85589,0 2.85588,0 0.63478,-2 0.63478,-2 2.25082,0 2.25083,0 4.14861,-3.1885 4.14861,-3.18851 10.00553,-0.0615 10.00552,-0.0615 2.21495,-2.21507 2.21494,-2.21508 -2.39569,-5.1149 -2.39569,-5.1149 -4.29562,-2.5174 c -2.36259,-1.38457 -5.0984,-3.53797 -6.07959,-4.78534 l -1.78396,-2.26795 -2.46202,-0.73736 c -1.35411,-0.40554 -3.81202,-1.50578 -5.46202,-2.44498 l -3,-1.70763 -5.47652,1.06031 -5.47652,1.06031 -2.03941,3.65059 -2.0394,3.65059 -2.87029,-1.5039 -2.87029,-1.50389 -6.11378,1.19254 -6.11379,1.19255 -1.71275,1.53204 -1.71276,1.53204 -1.53152,-0.5877 -1.53152,-0.5877 -1.97179,-3.24234 -1.97178,-3.24234 1.70559,-1.88466 1.70559,-1.88466 1.3055,-5.65658 c 0.71803,-3.11112 1.32663,-6.55658 1.35245,-7.65658 0.0258,-1.1 1.43094,-6.6125 3.12247,-12.25 l 3.07553,-10.25 1.21037,0 c 0.6657,0 2.82587,0.675 4.80038,1.5 l 3.59,1.5 4.09734,0 4.09733,0 5.64187,-5.64186 5.64187,-5.64187 2.52628,-0.67563 2.52629,-0.67564 1.82617,-3.12682 1.82616,-3.12682 -1.58565,-2.42001 -1.58564,-2.42 2.62543,-9.385672 c 1.44399,-5.162121 3.47476,-12.339118 4.51283,-15.948881 l 1.88739,-6.563206 2.51329,-2.361108 2.51328,-2.361108 0,-4.778633 0,-4.778633 -1.22965,-2.797053 c -1.58975,-3.616186 -2.57497,-4.263151 -6.52035,-4.28174 l -3.25,-0.01531 0,-1.95031 0,-1.95031 1.39366,-0.79969 c 0.76651,-0.439829 2.67901,-2.985601 4.25,-5.657271 l 2.85634,-4.85758 4.32267,-1.454554 4.32267,-1.454554 1.3886,1.15244 c 0.76374,0.633841 1.66685,2.029095 2.00692,3.100564 l 0.61831,1.948126 -3.20823,4.999592 c -1.76453,2.749775 -3.03784,5.15205 -2.82958,5.338388 0.20825,0.186338 2.98419,1.560446 6.16875,3.053574 l 5.79011,2.714778 1.45989,-0.560211 1.45989,-0.560212 0,-2.031385 0,-2.031385 1.53138,0 1.53139,0 0.561,1.461933 0.56099,1.461933 1.66072,0.52709 1.66071,0.527091 1.24691,3.995227 c 0.68579,2.197376 1.2469,4.683626 1.2469,5.525001 0,0.841376 1.0125,3.080324 2.25,4.97544 l 2.25,3.445667 2,1.053326 c 1.1,0.57933 3.93329,1.231715 6.2962,1.449746 l 4.29619,0.39642 2.61674,-2.425111 2.61674,-2.425111 1.75291,0.556351 1.75291,0.556352 0.64317,-1.040678 0.64317,-1.040677 2.35863,0 2.35862,0 1.83236,-3.974202 1.83236,-3.974201 2.04705,-0.0258 2.04705,-0.0258 3.9059,4 3.9059,4 1.19006,0 1.19006,0 0.61023,1.590226 0.61023,1.590226 -1.73097,2.930296 -1.73097,2.930297 1.30243,2.085516 1.30242,2.085516 -2.07469,2.208413 -2.0747,2.208412 0,2.126532 0,2.126532 -1.11448,0.688789 -1.11449,0.688789 0.68524,6.056713 0.68524,6.056713 1.42924,2.76386 c 0.78609,1.52012 1.42925,3.69734 1.42925,4.83826 l 0,2.07442 -2.43109,0.92429 -2.43108,0.9243 -0.68694,4.58085 -0.68695,4.58086 0.44032,6.0873 0.44032,6.0873 -1.28623,-1.75901 c -0.70742,-0.96746 -1.4696,-2.25771 -1.69372,-2.86721 l -0.40749,-1.10819 -1.87857,1.10762 -1.87857,1.10762 -3.17807,5.39238 c -1.74795,2.96581 -3.82842,6.06738 -4.62329,6.89238 -0.79486,0.825 -1.76593,2.53891 -2.15794,3.80869 l -0.71273,2.30869 -4.41399,4.06867 -4.41398,4.06867 0,2.69833 0,2.69832 2.31445,2.17432 c 1.27295,1.19587 2.67604,2.17431 3.11799,2.17431 0.44194,0 2.3411,1.35 4.22034,3 l 3.41681,3 2.71521,0.0902 2.7152,0.0902 -3.25,0.9384 -3.25,0.9384 0,4.11117 0,4.11116 1.68694,1.23353 1.68694,1.23352 -2.29832,0.72946 -2.29832,0.72946 0.6232,3.89726 0.6232,3.89726 -0.76182,-0.0318 c -0.419,-0.0175 -1.61148,-0.67506 -2.64996,-1.46126 l -1.88814,-1.42945 -1.80117,0.96396 -1.80117,0.96396 -0.61971,-1.00271 -0.6197,-1.0027 -2.83158,0 -2.83158,0 -0.39584,3.39069 c -0.21772,1.86488 -0.22945,3.88988 -0.0261,4.5 l 0.36977,1.10931 1.94805,0 1.94805,0 0.561,1.46193 0.56099,1.46194 1.81527,0.57611 1.81524,0.57613 0.61649,1.60655 0.61649,1.60656 -1.63543,1.80712 -1.63542,1.80713 1.18609,4.94419 1.18609,4.94419 2.38656,2.24205 2.38656,2.24206 -0.92056,1.72007 -0.92055,1.72008 2.45311,1.11771 2.45311,1.11772 5.12229,-4.54931 5.12228,-4.54932 2.09706,3.32354 c 1.15339,1.82794 2.66351,4.22353 3.35582,5.32353 0.69232,1.1 1.91389,3.35 2.7146,5 l 1.45584,3 -0.92783,0.95 c -0.51031,0.5225 -0.92784,1.48041 -0.92784,2.12868 l 0,1.17868 3,1.24264 3,1.24264 0,1.94583 0,1.94583 -3.25,3.33437 c -1.7875,1.83391 -4.12045,4.28269 -5.18432,5.44174 l -1.93433,2.10736 -2.06567,-0.68205 c -1.13613,-0.37513 -2.96568,-0.71663 -4.06568,-0.75889 l -2,-0.0768 0.0794,2.25 0.0794,2.25 -2.70695,0 -2.70696,0 -1.15753,1.39474 -1.15753,1.39474 0.28508,1.35526 0.28509,1.35526 -2.89854,0.0395 -2.89854,0.0395 -3.20744,3.71046 -3.20743,3.71046 -1.45694,0 -1.45693,0 -2.49438,2.75 c -1.3719,1.5125 -3.57708,4.4007 -4.90039,6.41823 l -2.40602,3.66823 -2.2867,-3.36518 c -1.25768,-1.85079 -2.28669,-3.839 -2.28669,-4.41818 l 0,-1.05305 -2.01357,0 c -1.10746,0 -2.87092,-0.53543 -3.9188,-1.18984 l -1.90523,-1.18983 -1.5812,1.31228 -1.5812,1.31228 0,1.81854 0,1.81854 1,0.61803 1,0.61803 0,4.97617 0,4.97617 1.49461,2.28106 1.49461,2.28106 -1.24461,1.69909 -1.24461,1.6991 -6.63998,0.61899 -6.63997,0.61899 -0.72831,-2.38433 c -0.40056,-1.31138 -1.45382,-3.20941 -2.34058,-4.21783 l -1.61227,-1.8335 0.29522,-2.8145 0.29522,-2.8145 -2.08393,-1.45965 c -1.14617,-0.8028 -3.46767,-3.5487 -5.15891,-6.102 l -3.07496,-4.64235 -1.83434,0 -1.83433,0 -1.5,1.5 c -0.825,0.825 -2.02521,1.5 -2.66714,1.5 -0.64192,0 -2.47792,0.7743 -4.07999,1.72067 l -2.91286,1.72066 0.25856,5.02934 0.25857,5.02933 -3.63263,0 -3.63262,0 -1.94612,1.75 -1.94611,1.75 -2.88691,0 -2.88691,0 -4.70733,4.63654 -4.70733,4.63655 -1.57702,-0.60516 -1.57702,-0.60516 0,-3.59713 0,-3.59712 -1.03518,-1.93426 -1.03519,-1.93426 -2.86979,0 -2.8698,0 -2.59502,4.42807 -2.59502,4.42807 0,1.94949 0,1.94948 -1.38926,1.15298 -1.38926,1.15299 -0.45971,2.40481 -0.45971,2.40482 0.79177,1.28111 0.79177,1.2811 -1.02698,1.23743 -1.02697,1.23743 3.11702,3.87872 3.11703,3.87872 -0.64054,1.66923 -0.64054,1.66922 -4.56422,3.08035 -4.56422,3.08035 -2.37514,-1.08218 c -3.20868,-1.46198 -3.08745,-1.50094 -6.41571,2.06198 l -2.93709,3.14416 -2.21412,-0.9545 -2.21412,-0.95451 -1.61989,0.35861 -1.61989,0.35861 -1.58979,3.70173 c -0.87439,2.03595 -2.25998,5.38923 -3.07909,7.45173 l -1.48929,3.75 -3.07577,0 -3.07578,0 -0.91357,2.40286 c -0.50246,1.32157 -1.42126,2.71664 -2.04178,3.10014 l -1.12822,0.69728 -1.36354,-1.85014 -1.36355,-1.85014 -3.31992,3.09843 -3.31992,3.09843 -2.5505,-0.16611 c -1.40277,-0.0914 -3.09027,-0.49972 -3.75,-0.90745 l -1.1995,-0.74133 -1,0.61803 c -0.55,0.33992 -1,1.18804 -1,1.8847 l 0,1.26667 -2.6003,2.42432 -2.6003,2.42431 0.54521,4.68264 0.54521,4.68265 -2.94491,0.64681 -2.94491,0.64681 0,0.97918 c 0,1.03421 -5.65731,8.63531 -7.70465,10.35188 -0.66255,0.55552 -2.10906,3.14753 -3.21446,5.76003 l -2.00982,4.75 -2.48584,0 -2.48585,0 -0.90338,-1.61424 -0.90337,-1.61425 -5.19554,1.11425 c -2.85754,0.61283 -5.62338,1.11424 -6.14631,1.11424 l -0.95078,0 0,-1.81144 0,-1.81144 -2.03896,-2.18856 -2.03895,-2.18856 -1.71105,-0.11848 c -0.94107,-0.0652 -2.2524,-0.0503 -2.91406,0.0331 -0.66166,0.0833 -2.80295,-0.51696 -4.75841,-1.33401 l -3.55538,-1.48553 2.37919,-5.29751 c 1.30856,-2.91364 2.95874,-6.53319 3.66707,-8.04346 l 1.28788,-2.74594 -1.65867,-1.8328 -1.65866,-1.8328 0,-2.17126 0,-2.17126 -1.95295,0 c -2.82416,0 -6.87844,2.04008 -10.17604,5.1205 l -2.87101,2.68187 0,1.90766 0,1.90766 -1.4682,1.94113 -1.46819,1.94113 -0.0318,5.5962 -0.0318,5.59621 -4.25,4.05444 c -2.3375,2.22995 -5.43567,5.44916 -6.88483,7.1538 l -2.63483,3.09935 -3.55616,0 -3.55616,0 -0.61803,1 -0.61803,1 -3.19099,-0.079 c -1.75504,-0.0434 -3.75348,-0.30592 -4.44098,-0.58333 z").attr(o);
    b = 600;
    k = 330;
    j = "\u5185\u8499\u53e4";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 487.73849,661.05809 -2.25,-1.87703 0,-2.48271 0,-2.48272 -1.48314,-0.56914 -1.48314,-0.56913 0.59404,-1.54806 0.59405,-1.54806 -2.6109,-3.42307 -2.61091,-3.42308 0,-2.3924 0,-2.39241 -2.5,-2.34863 -2.5,-2.34863 0,-1.3228 0,-1.32281 -3.40636,-3.77043 -3.40635,-3.77043 -4.46077,-1.19307 -4.46077,-1.19308 -0.60788,-3.03937 -0.60787,-3.03938 0.62024,-3.10122 0.62025,-3.10122 -1.39525,-0.87595 -1.39524,-0.87595 -2,0.58951 c -1.1,0.32424 -3.125,1.55146 -4.5,2.72717 -1.375,1.17571 -3.47413,2.68001 -4.66472,3.34288 l -2.16472,1.20521 -1.23675,-1.49018 -1.23674,-1.49018 -0.82608,-9.71504 c -0.45434,-5.34326 -1.08856,-16.91503 -1.40938,-25.71503 l -0.58331,-16 -1.43915,-2.21482 c -0.79153,-1.21815 -1.43915,-2.85055 -1.43915,-3.62755 l 0,-1.41274 -1.5,-1.24489 c -2.03548,-1.68929 -1.88494,-2.74305 0.5,-3.5 l 2,-0.63478 0,-1.52364 0,-1.52365 -3.5,-4.08896 -3.5,-4.08897 0,-3.19755 0,-3.19756 -1.5,-1.24489 -1.5,-1.24489 0,-1.78866 0,-1.78866 -3.07673,-2.5889 -3.07672,-2.58889 -1.78842,0 -1.78841,0 -2.63422,-2.07207 -2.63421,-2.07208 1.55164,-1.55163 1.55164,-1.55164 -0.61857,-2.81633 -0.61857,-2.81633 3.24993,-1.68061 3.24992,-1.6806 8.80069,0.1604 8.80069,0.16039 4.91438,2.54967 4.91438,2.54967 2.55212,-1.67221 2.55212,-1.67222 1.36826,0.3328 1.36825,0.33279 5.49075,6.5 5.49075,6.5 4.84342,0.31105 4.84341,0.31105 0.83144,-1.31105 c 0.45729,-0.72108 0.83832,-2.57004 0.84675,-4.1088 l 0.0153,-2.79775 2.64602,-2.45225 2.64602,-2.45225 1.77058,0 1.77057,0 1.86754,2.56372 1.86754,2.56372 2.8349,-2.22993 2.83489,-2.22993 1.8674,1.16621 c 1.02707,0.64141 2.45027,1.16621 3.16266,1.16621 l 1.29525,0 1.37158,-4.64525 1.37158,-4.64525 -1.16052,-1.60475 c -0.63829,-0.88261 -1.69541,-2.6522 -2.34917,-3.93241 l -1.18864,-2.32766 0.95859,-1.51967 0.95859,-1.51968 3.98731,-1.50863 c 2.19302,-0.82974 5.11231,-1.57344 6.48731,-1.65266 l 2.5,-0.14404 0.5,4 0.5,4 2.25912,0.99106 2.25912,0.99105 0.57481,1.81107 c 0.57032,1.79693 6.22103,7.43461 9.06765,9.04674 l 1.48309,0.83993 1.93424,-1.75046 c 2.20387,-1.99448 2.09516,-2.05449 4.36715,2.41087 l 1.69953,3.34025 -0.49691,1.29493 -0.49691,1.29493 2.67455,2.44812 2.67456,2.44812 5.29589,1.15968 5.29589,1.15968 2.39452,-1.56895 2.39451,-1.56894 0.30959,-2.17404 0.3096,-2.17404 2.87083,-0.32808 c 1.57896,-0.18045 3.94146,-0.0594 5.25,0.26905 l 2.37917,0.59713 0,1.35851 c 0,0.74717 0.64822,1.89648 1.4405,2.55401 l 1.4405,1.19551 6.14027,-1.57307 c 3.37714,-0.86518 6.70669,-1.57306 7.39898,-1.57306 l 1.25872,0 1.13908,2.5 1.13907,2.5 2.96242,0 2.96243,0 0.61803,1 0.61803,1 1.62654,0 1.62653,0 2.33487,2.1935 2.33488,2.1935 3.30057,-1.1935 c 1.81532,-0.65642 4.47313,-1.1935 5.90625,-1.1935 l 2.60568,0 0.39695,1.75 0.39695,1.75 -1.56494,1.84539 -1.56493,1.84539 2.24131,1.8149 c 1.23272,0.9982 2.24131,2.3194 2.24131,2.936 l 0,1.12109 -1.50402,0.57715 -1.50403,0.57715 -4.02132,8.46417 -4.02133,8.46417 -2.72465,-0.17867 c -1.49856,-0.0983 -3.23707,-0.13098 -3.86336,-0.0727 l -1.13871,0.10597 -0.68826,3.75 -0.68826,3.75 -3.02727,4.75 -3.02728,4.75 -2.57293,0 -2.57293,0 -2.61824,-3.13624 -2.61825,-3.13623 -2.15704,1.34709 -2.15704,1.3471 -4.08946,-2.29841 -4.08946,-2.2984 -2.38223,1.5609 -2.38224,1.56091 -0.62877,1.98106 -0.62876,1.98105 1.53623,2.34459 1.53623,2.34459 -4.98331,3.72039 -4.98331,3.72038 0.0316,1.23061 c 0.0174,0.67684 1.07681,2.41697 2.35429,3.86698 l 2.32269,2.63636 2.07621,0.65897 2.07621,0.65896 0.64916,2.95559 0.64915,2.95559 3.90147,0.62387 3.90146,0.62387 0.89649,1.12521 c 0.49307,0.61887 1.2308,2.21303 1.63939,3.54258 l 0.7429,2.41738 -2.75537,-2.16738 c -3.48024,-2.73756 -3.64426,-2.72522 -7.38282,0.55531 l -3.10283,2.72269 0,2.67688 0,2.67689 5.09394,1.83176 5.09395,1.83175 1.47979,2.86161 c 0.81389,1.57388 1.33411,2.95134 1.15606,3.06101 -0.17806,0.10968 -2.34874,0.7055 -4.82374,1.32405 l -4.5,1.12464 -4.75,-0.54703 -4.75,-0.54703 0,-2.16995 0,-2.16995 -1.2,-1.2 c -0.66,-0.66 -1.95825,-1.2 -2.88499,-1.2 l -1.68499,0 -1.63806,2.5 -1.63807,2.5 -2.91793,0 -2.91793,0 -0.77217,-1.2494 -0.77217,-1.2494 0.28877,-2.75297 0.28877,-2.75297 -1.63884,-0.62888 -1.63885,-0.62888 0.31323,-3.61875 0.31323,-3.61875 -5.29079,-0.0116 -5.2908,-0.0116 -0.53389,2.12721 c -0.29364,1.16997 -0.38779,2.97517 -0.20921,4.01156 l 0.32469,1.88443 -2.70223,0.31181 -2.70223,0.31182 -0.71585,2.18818 c -0.39371,1.20351 -0.62919,3.60488 -0.5233,5.33639 l 0.19255,3.14821 -5.38767,4.85179 -5.38767,4.8518 -0.67479,5.27672 -0.67479,5.27672 1.53799,2.19579 1.53799,2.19578 0,3.06189 0,3.06188 -2.93888,1.73604 -2.93887,1.73604 -0.90642,-1.61968 -0.90642,-1.61968 -4.08686,2.08496 c -2.24777,1.14673 -4.36894,2.54139 -4.71372,3.09925 l -0.62686,1.01429 -2.69099,-0.0333 -2.69098,-0.0333 -2.25,-1.87702 z").attr(o);
    b = 510;
    k = 560;
    j = "\u56db\u5ddd";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 569.00645,456.03025 -0.65225,-1.05537 -2.34316,0 -2.34316,0 -1.04581,-3 -1.0458,-3 -1.94124,0 -1.94123,0 -2.23488,-1.80969 -2.23487,-1.80969 1.62409,-3.14065 c 2.00936,-3.88569 2.03113,-5.13271 0.12635,-7.23748 l -1.49775,-1.65498 -0.89062,-4.76727 -0.89062,-4.76727 -3.45253,-3.65648 c -1.8989,-2.01107 -4.44529,-4.77655 -5.65866,-6.14552 l -2.20612,-2.48903 3.25332,-0.84302 3.25331,-0.84302 7.2937,-7.58328 7.29371,-7.58329 0.0318,-5.58467 0.0318,-5.58466 1.46819,-1.94113 c 0.80751,-1.06762 1.4682,-2.67397 1.4682,-3.56966 l 0,-1.62854 2.32456,-1.93033 c 2.97345,-2.4692 6.36508,-4.43034 7.66187,-4.43034 l 1.01357,0 0,1.63976 0,1.63975 1.68966,1.23551 1.68966,1.23551 -3.18966,7.13354 c -1.75431,3.92344 -3.18966,7.77905 -3.18966,8.56803 l 0,1.43449 2.22251,1.55671 2.2225,1.5567 3.66671,0 3.66671,0 2.05061,1.75 2.05061,1.75 0.27422,2 0.27422,2 -1.71024,2.56866 -1.71024,2.56867 -0.13912,2.43133 c -0.0765,1.33724 0.22209,3.28965 0.66357,4.33869 l 0.80268,1.90735 -5.63743,-0.66256 -5.63742,-0.66257 -0.88333,3.25521 -0.88333,3.25522 0.83507,1.65004 0.83507,1.65004 -1.48168,0.56857 -1.48169,0.56858 0.0153,4.28138 0.0153,4.28139 0.73469,1 c 0.40407,0.55 2.42218,1.78022 4.48468,2.73382 l 3.75,1.73382 -0.0147,1.26618 c -0.008,0.6964 -0.57949,2.38235 -1.26974,3.74655 l -1.25501,2.48038 -2.48025,0.0196 -2.48025,0.0196 -0.5,3.99032 -0.5,3.99031 -1.65676,0.31506 -1.65677,0.31505 -0.65225,-1.05537 z").attr(o);
    b = 565;
    k = 410;
    j = "\u5b81\u590f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 627.78975,530.0303 -0.52301,-2 -2.65124,0 -2.65123,0 -3.67908,-2.5 -3.67908,-2.5 -2.23206,0 c -1.22763,0 -3.71731,0.53708 -5.53263,1.1935 l -3.30057,1.19351 -2.33488,-2.19351 -2.33487,-2.1935 -1.71694,0 -1.71693,0 -0.56858,-1.48169 -0.56857,-1.48168 -1.92071,1.02793 -1.9207,1.02793 -0.97934,-0.60526 -0.97933,-0.60526 0,-1.92193 0,-1.92194 -2.51941,-0.63233 -2.51941,-0.63233 -2.73059,1.07266 c -1.50183,0.58996 -4.3595,1.35503 -6.35038,1.70014 l -3.61979,0.62749 -0.64926,-2.58687 -0.64926,-2.58686 -2.63594,0 -2.63594,0 1.51396,-1.75 c 0.83268,-0.9625 1.7589,-2.75715 2.05826,-3.98811 l 0.5443,-2.23811 -1.93487,-2.4598 -1.93487,-2.45979 1.99109,-1.0656 c 1.0951,-0.58608 2.34682,-1.00623 2.7816,-0.93367 0.43478,0.0726 2.27882,0.0786 4.09786,0.0135 l 3.30736,-0.11842 -0.25449,-5.25 -0.2545,-5.25 1.69714,-3.20034 c 0.93343,-1.76019 1.69714,-3.6793 1.69714,-4.2647 l 0,-1.06436 -3.02674,-1.84066 -3.02673,-1.84067 1.58541,-1.31578 1.58541,-1.31577 -0.30867,-3.57886 L 576,464.5303 l 3.84809,-0.31621 3.8481,-0.31622 1.83943,1.66467 1.83944,1.66466 4.31247,-0.71458 c 2.37186,-0.39302 5.10569,-1.13121 6.07518,-1.64044 l 1.76272,-0.92585 -1.01272,-1.89228 C 597.95572,461.0133 597.5,459.85842 597.5,459.48763 l 0,-0.67415 2.43871,0.61208 2.43872,0.61208 0.68842,-1.11388 0.68841,-1.11388 3.31094,0.53729 3.31095,0.53729 0.91749,-1.17708 c 0.50462,-0.64739 1.17054,-2.20937 1.47981,-3.47106 l 0.56231,-2.29398 -1.41172,-2.70602 c -1.84166,-3.53014 -1.78767,-4.56696 0.33797,-6.49064 l 1.76201,-1.5946 -0.35396,-4.45046 -0.35396,-4.45047 -4.61096,-2.35993 c -2.53603,-1.29795 -5.03128,-2.22688 -5.545,-2.06427 l -0.93405,0.29565 -2.11304,-1.97436 -2.11305,-1.97437 -4.76147,-1.19289 -4.76147,-1.19288 -0.60863,-2.42497 -0.60862,-2.42497 0.58491,-0.58491 0.58491,-0.58492 -0.98778,-1.84568 -0.98777,-1.84568 1.41029,-3.3753 1.41029,-3.3753 3.23767,-0.64754 c 1.78072,-0.35614 4.30642,-0.64753 5.61267,-0.64753 l 2.375,0 0.0333,-1.25 0.0333,-1.25 1.87702,2.25 1.87703,2.25 2.39857,0 2.39858,0 1.56328,-1.25 1.56328,-1.25 0.99148,-3.00804 0.99149,-3.00805 4.88637,-6.72809 4.88636,-6.7281 2.20898,-0.61197 c 1.21494,-0.33659 2.72779,-1.2371 3.36188,-2.00113 l 1.15289,-1.38915 -0.76056,-1.76273 c -0.41831,-0.96951 -0.64813,-2.87688 -0.51071,-4.23861 l 0.24985,-2.47587 2.1875,-2.5997 2.1875,-2.5997 4.62005,0.19468 4.62005,0.19467 2.16594,-2.92959 2.16594,-2.92959 1.42535,1.18293 1.42534,1.18293 0,2.65505 0,2.65505 -1.36491,1.9725 -1.36491,1.97251 -0.6983,5.68002 -0.69831,5.68001 -1.50272,1.24715 c -1.91488,1.58921 -4.37085,6.31016 -4.37085,8.4018 l 0,1.6083 2.99438,3.72611 2.99439,3.72611 -1.13619,3.46525 c -0.62491,1.90589 -1.80507,5.12911 -2.62257,7.16272 l -1.48638,3.69747 0.56639,5.30253 c 0.31151,2.91639 0.99219,8.27244 1.51261,11.90232 l 0.94622,6.59979 1.11558,2.08447 c 0.61356,1.14646 1.11557,3.18991 1.11557,4.54101 l 0,2.45653 -1.97804,4.35921 -1.97804,4.3592 -0.022,4.72036 -0.022,4.72037 2.47619,5.41351 2.4762,5.41351 1.5238,0.58474 1.52381,0.58474 0.0317,2.78139 0.0317,2.78138 3.46825,3.45186 3.46825,3.45187 0,3.17569 0,3.17569 -1.33205,1.1055 -1.33204,1.1055 -1.91796,-1.40672 -1.91795,-1.40673 -1.72742,1.55822 -1.72741,1.55822 -6.0019,-1.1808 -6.0019,-1.18081 -2.08102,1.11373 -2.08101,1.11372 0.32054,1.68253 0.32055,1.68253 2.13785,0.30619 2.13784,0.3062 0.46866,1.79215 0.46866,1.79215 3.13328,0.62665 3.13328,0.62666 0,0.89167 0,0.89168 -4.89917,2.036 -4.89917,2.03601 -0.68921,3.13796 -0.68921,3.13796 1.58838,2.42418 1.58838,2.42417 0,1.91856 0,1.91855 -2.25,0.60297 c -1.2375,0.33164 -2.85463,0.60913 -3.59362,0.61664 l -1.34362,0.0136 -0.52301,-2 z").attr(o);
    b = 610;
    k = 490;
    j = "\u9655\u897f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 644.51385,463.21871 0,-5.76481 2,-3.73156 c 2.49029,-4.64634 2.49029,-6.00067 0,-13.23882 l -2,-5.8131 0,-4.78443 0,-4.78444 -0.90482,-0.5592 -0.90482,-0.55921 0.54258,-4.24981 c 0.29842,-2.3374 1.13076,-5.41694 1.84963,-6.84343 0.71888,-1.42649 1.59998,-4.80179 1.958,-7.50066 l 0.65094,-4.90703 -2.59576,-2.80087 -2.59575,-2.80086 0,-2.14376 0,-2.14376 2.33231,-2.55472 2.33231,-2.55472 1.16769,-4.11602 c 0.64223,-2.26381 1.16769,-5.02487 1.16769,-6.13569 0,-1.11082 0.67223,-3.30861 1.49384,-4.88398 0.82161,-1.57537 1.49661,-3.85445 1.5,-5.06462 l 0.006,-2.20031 1.32541,-0.79969 c 0.72898,-0.43983 1.61485,-1.58719 1.96862,-2.54969 l 0.6432,-1.75 2.3764,0 2.3764,0 1.5367,-1.75 c 0.84519,-0.9625 1.87268,-2.875 2.2833,-4.25 0.41063,-1.375 1.61704,-4.22483 2.68092,-6.33295 l 1.93433,-3.83295 1.18736,0.44572 c 0.65305,0.24515 2.19805,0.76223 3.43335,1.14907 l 2.24598,0.70334 2.88888,-3.16292 2.88888,-3.16292 2.08269,1.11463 2.0827,1.11462 5.02636,-2.76782 5.02636,-2.76782 0.57347,-1.75 c 0.31541,-0.9625 0.98457,-1.75 1.48703,-1.75 l 0.91356,0 0.63066,2.51277 0.63067,2.51277 1.4797,0.82809 1.4797,0.82808 -3.05806,1.26669 -3.05806,1.26669 -0.61587,1.94044 -0.61588,1.94045 1.20507,1.45201 1.20506,1.45201 2.12756,0.0258 2.12755,0.0258 1.77951,3.86358 1.7795,3.86357 -0.65134,4.07329 -0.65134,4.07328 -3.62817,1.16766 c -1.99549,0.64222 -4.22945,1.64632 -4.96436,2.23133 l -1.3362,1.06367 0.53878,2.69393 0.53879,2.69394 -1.95258,1.76706 -1.95259,1.76706 0,2.87343 0,2.87342 3.0441,3.22159 c 4.46915,4.72972 8.9559,10.82566 8.9559,12.16796 0,0.64426 -0.65478,2.04488 -1.45508,3.1125 l -1.45507,1.94113 -0.68162,5.81651 -0.68161,5.81651 -2.36331,1.5485 -2.36331,1.5485 0,1.30826 c 0,0.71955 1.14361,2.66737 2.54135,4.3285 l 2.54136,3.02023 -0.29136,8.25346 -0.29135,8.25346 -5.5,4.2883 -5.5,4.2883 -2.18871,-0.48893 -2.18872,-0.48894 -0.6203,1.00367 -0.6203,1.00367 -3.44099,0 -3.44098,0 -1.90128,1.90128 c -1.0457,1.0457 -2.76442,2.17523 -3.81938,2.51006 l -1.9181,0.60878 -2.21056,2.98994 -2.21055,2.98994 -1.92301,0 c -2.5459,0 -7.05932,2.07297 -9.25341,4.25 l -1.76371,1.75 -3.5,0 -3.5,0 0,-5.76481 z").attr(o);
    b = 675;
    k = 400;
    j = "\u5c71\u897f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 715.5,427.094 c -0.825,-0.46485 -3.75,-1.1518 -6.5,-1.52655 -2.75,-0.37475 -5.74724,-0.89829 -6.66054,-1.1634 l -1.66054,-0.48204 -1.58319,-2.41625 -1.58319,-2.41625 2.5502,-2.75171 2.55019,-2.7517 -0.55805,-2.22347 -0.55806,-2.22347 2.61024,-6.0187 2.61024,-6.0187 -3.85865,-5.95279 -3.85865,-5.9528 -2.25,-1.07664 -2.25,-1.07665 0,-3.47175 0,-3.47175 1.75,-0.97935 1.75,-0.97935 0,-3.21135 0,-3.21136 1.5,-0.69745 c 0.825,-0.3836 2.84869,-1.34917 4.49708,-2.1457 l 2.99709,-1.44824 0.86896,-4.75632 0.86895,-4.75633 -1.5128,-1.70697 C 706.38724,351.26813 705.54658,349.6 705.35115,348.5 l -0.35532,-2 -3.24791,-0.9568 -3.24792,-0.95679 0,-1.19443 0,-1.19443 3.63253,-2.14325 3.63254,-2.14324 -2.13254,-2.26998 c -1.17289,-1.24849 -2.13447,-2.69098 -2.13683,-3.20553 -0.002,-0.51455 -1.83721,-3.35321 -4.07742,-6.30813 l -4.07312,-5.37258 1.00009,-1.00009 1.00009,-1.00009 -1.08769,-2.38722 -1.08769,-2.38722 2.16502,-2.30456 2.16502,-2.30456 0,-2.14445 0,-2.14445 1.75,-3.55122 1.75,-3.55122 2.5,0.26012 2.5,0.26012 0.27421,3 c 0.15081,1.65 0.49688,4.0125 0.76905,5.25 l 0.49484,2.25 2.96339,0 2.96339,0 4.67508,-4.47952 4.67509,-4.47951 2.22904,0.55945 2.22905,0.55946 2.06351,-2.21492 2.06352,-2.21493 2.92668,0.58534 2.92668,0.58534 1.76065,-1.28742 1.76065,-1.28742 -0.48815,-2.91293 c -0.26848,-1.60212 -0.66782,-3.54654 -0.88741,-4.32094 L 739,286.684 l 3,-1.50353 c 1.65,-0.82694 3.675,-1.88371 4.5,-2.34837 0.825,-0.46465 2.13341,-1.14232 2.90758,-1.50592 l 1.40758,-0.6611 2.3071,2.91746 c 1.26891,1.6046 3.4986,4.38715 4.95487,6.18344 l 2.64777,3.26598 -0.52572,2.01037 -0.52572,2.01036 2.41327,2.86801 c 1.3273,1.57741 2.41327,3.34972 2.41327,3.93847 l 0,1.07046 2.15703,1.15441 2.15704,1.15441 5.52524,-0.64938 5.52525,-0.64939 -1.724,1.905 c -0.9482,1.04775 -1.63378,2.29882 -1.52352,2.78016 0.11026,0.48134 -0.15054,1.67942 -0.57956,2.6624 l -0.78004,1.78725 1.77627,1.96275 c 0.97694,1.07952 2.30117,1.96276 2.94272,1.96276 0.64154,0 2.86924,0.82825 4.95043,1.84056 l 3.78398,1.84055 2.89703,4.31358 2.89703,4.31357 -2.00245,1.40258 -2.00245,1.40257 0,1.3363 0,1.33631 -1.54207,0.59175 -1.54207,0.59175 -1.93597,4.26524 c -1.06478,2.34588 -1.94585,5.22959 -1.95793,6.40825 l -0.022,2.14301 -1.58179,0.60699 C 781.04823,351.72685 779.62116,352 778.74695,352 l -1.58947,0 -1.71115,1.54857 -1.71114,1.54856 -2.6176,-0.65697 -2.61759,-0.65698 0,-2.48521 0,-2.48521 -2,-0.52301 -2,-0.52301 0,-1.3288 0,-1.32881 -2.75,-1.34299 -2.75,-1.343 0.29052,-4.62064 0.29053,-4.62065 -3.49275,-1.15271 -3.49274,-1.15271 -0.67033,-2.11202 -0.67033,-2.11202 1.40895,-1.07619 1.40895,-1.0762 -0.34759,-1.68701 -0.3476,-1.687 -4.08416,0.49228 -4.08417,0.49229 -3.27811,-3.17727 -3.2781,-3.17727 -2.51593,2.51593 -2.51593,2.51593 -0.5606,-0.56061 -0.56061,-0.5606 0,2.66666 0,2.66667 -1.04364,0 c -0.57401,0 -2.25713,1.1252 -3.74027,2.50045 l -2.69662,2.50045 1.24026,1.98598 c 0.68215,1.09229 1.24027,2.41176 1.24027,2.93216 l 0,0.94618 -1.84824,0.58661 -1.84825,0.58661 -1.15175,2.52784 c -0.63347,1.3903 -1.15176,3.78691 -1.15176,5.32578 l 0,2.79796 2.0605,1.86473 2.06049,1.86472 7.18951,0.12616 7.1895,0.12616 1.78895,-1.8359 C 742.77288,348.82615 743.95313,348 744.41173,348 l 0.83381,0 0.51508,5.25 0.51508,5.25 -0.93318,1.76896 -0.93319,1.76897 1.69424,2.86811 1.69424,2.86812 5.10109,0.65043 c 2.80561,0.35774 6.0011,0.66367 7.1011,0.67985 l 2,0.0294 2.29939,3.5768 2.29939,3.5768 -2.54939,2.66099 c -1.40216,1.46354 -2.54939,3.14089 -2.54939,3.72744 l 0,1.06645 -4.88417,0.64791 -4.88417,0.6479 -2.36583,3.47409 -2.36583,3.47409 -1.72432,0.007 -1.72432,0.007 -1.48869,2.87882 -1.4887,2.87882 -1.39682,0.53601 -1.39683,0.53601 -1.15911,4.60327 -1.15912,4.60327 -3.48105,3.8531 -3.48104,3.85277 0,2.26077 0,2.26076 2.04746,3.31287 2.04747,3.31286 -3.42034,-0.55504 -3.42033,-0.55504 -0.71616,1.15877 -0.71615,1.15877 -1.34706,-1.11796 -1.34705,-1.11795 -1.99818,1.0694 c -2.34115,1.25294 -2.20549,1.24757 -4.12966,0.16339 z").attr(o);
    b = 720;
    k = 380;
    j = "\u6cb3\u5317";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 478.61022,771.64127 c -0.42492,-1.14332 -1.38353,-3.79019 -2.13026,-5.88193 l -1.35769,-3.80317 -2.52988,0.63102 c -1.39144,0.34707 -3.88162,1.6594 -5.53373,2.9163 l -3.00384,2.28528 -2.37506,-0.8786 -2.37507,-0.87859 -1.3711,1.1379 -1.37109,1.13791 -0.004,-0.87245 c -0.002,-0.47984 -1.0019,-2.44744 -2.22184,-4.37244 l -2.21806,-3.5 -0.0282,-2.42662 -0.0282,-2.42662 -5,-1.30409 c -2.75,-0.71725 -5.98594,-1.31277 -7.19098,-1.32338 l -2.19099,-0.0193 -0.63837,-1.03291 -0.63838,-1.03291 2.11138,-3.57852 2.11138,-3.57852 -0.58816,-1.85313 -0.58816,-1.85313 2.09974,-2.84004 2.09973,-2.84005 -0.65058,-1.69539 -0.65059,-1.6954 -4.23802,0 -4.23803,0 -1.54721,-1.75 -1.54722,-1.75 -0.69097,-5.17265 -0.69097,-5.17266 -1.32134,-1.80704 -1.32134,-1.80703 1.87587,-2.63442 1.87587,-2.63441 -5.22133,-0.6272 c -2.87173,-0.34496 -6.85373,-0.63112 -8.84889,-0.6359 l -3.62755,-0.009 -1.33135,1.60418 c -1.43762,1.73223 -5.90133,3.74136 -6.64966,2.99303 -0.25231,-0.25231 0.32239,-1.7811 1.27711,-3.39732 l 1.73586,-2.93857 -1.63843,-3.2843 -1.63842,-3.2843 0,-2.28965 0,-2.28966 1.84785,-1.30671 1.84785,-1.3067 0.70525,-3.7915 0.70525,-3.7915 3.47806,-1.65857 3.47807,-1.65858 0.57724,-2.29992 0.57725,-2.29993 1.42492,0 1.42493,0 3.56603,-3.56603 3.56603,-3.56603 -0.54581,-2.08719 -0.54582,-2.08719 1.48049,-2.86294 1.48048,-2.86294 0.14337,-13.61753 0.14337,-13.61754 -1.9274,-1.41419 -1.92741,-1.41419 -1.67551,0.43479 -1.67551,0.43478 -2.19031,-5.09151 -2.19031,-5.09151 0.97577,-1.54539 0.97577,-1.54539 2.89008,-0.0365 c 1.58955,-0.0201 3.38891,-0.34479 3.99859,-0.72159 l 1.1085,-0.68509 0.55529,-6.1238 0.55528,-6.12379 2.07408,-1.9323 2.07407,-1.93229 0.62051,-2.47232 c 0.34129,-1.35978 0.96042,-2.47233 1.37585,-2.47233 l 0.75533,0 0.49127,9.392 0.49126,9.392 2.25352,3.16478 2.25351,3.16477 1.72022,-1.55677 c 0.94612,-0.85623 2.1631,-1.55678 2.70439,-1.55678 0.54129,0 2.27755,-1.35 3.85835,-3 1.5808,-1.65 3.38999,-3 4.02042,-3 l 1.14625,0 0,6 c 0,3.3 0.23599,6.23599 0.52443,6.52443 0.28844,0.28844 2.94032,1.37522 5.89308,2.41507 l 5.36864,1.89063 2.26862,2.83494 2.26863,2.83493 0.005,1.57569 0.005,1.57568 2.5,2.34863 2.5,2.34863 0,2.85707 0,2.85707 1.40844,0.54047 1.40845,0.54047 1.17497,3.17815 c 0.64623,1.74797 1.53021,3.86791 1.9644,4.71096 0.43419,0.84306 1.1074,2.98056 1.49604,4.75 l 0.70661,3.21718 1.31356,0 1.31355,0 0.57561,1.5 0.5756,1.5 2.98125,0 2.98126,0 4.60902,-3.11059 4.60902,-3.11059 1.30076,1.77889 1.30076,1.77889 3.54113,-2.18854 3.54112,-2.18853 0.59923,-1.56155 c 0.32957,-0.85886 0.59922,-2.56374 0.59922,-3.78864 l 0,-2.22708 -1.4682,-1.94113 -1.46819,-1.94113 -0.0318,-2.625 c -0.0175,-1.44375 0.24945,-4.03125 0.5932,-5.75 l 0.62499,-3.125 1.24764,0 1.24764,0 4.2417,-4.6017 4.2417,-4.6017 -0.48054,-3.1483 c -0.2643,-1.73156 -0.27825,-3.7108 -0.031,-4.3983 l 0.44954,-1.25 1.66666,-0.0153 c 0.91667,-0.008 2.32303,-0.43048 3.12524,-0.93792 l 1.45857,-0.92261 -0.22417,-3.3286 -0.22417,-3.3286 3.82285,-0.10024 3.82285,-0.10024 -0.42827,2.91802 -0.42828,2.91803 1.76849,1.29314 1.76848,1.29315 -0.65885,2.62507 -0.65886,2.62508 2.52308,1.65318 2.52307,1.65318 3.23832,-0.64238 3.23832,-0.64238 1.69601,-2.23028 1.69601,-2.23029 1.21508,1.21109 1.21508,1.21109 0.31481,2.78891 0.31481,2.78891 -1.01477,3.13278 -1.01476,3.13277 -3.08613,0.61723 c -1.69739,0.33947 -4.40948,0.61722 -6.02689,0.61722 l -2.94074,0 -2.05093,-1.09762 -2.05092,-1.09762 -1.52046,1.52046 -1.52046,1.52046 -1.83503,-1.146 -1.83503,-1.14599 -3.52784,3.41932 -3.52785,3.41932 0,1.25415 0,1.25414 1.75,0.98741 1.75,0.98741 -1.08868,1.10096 -1.08869,1.10097 1.08869,3.50269 1.08868,3.5027 2.29029,0.57714 2.2903,0.57714 1.7097,-1.52734 1.70971,-1.52735 2.5,-0.34216 2.5,-0.34215 1.91621,2.37001 1.91621,2.37001 -1.16621,1.8674 c -0.64142,1.02707 -1.16621,2.79143 -1.16621,3.92081 l 0,2.05341 -2.04631,4.01109 -2.04631,4.0111 1.17739,3.25602 1.1774,3.25603 2.86891,1.64653 2.86892,1.64653 0,2.51572 0,2.51571 -2.10599,4.04043 -2.10599,4.04043 0.60749,2.42044 c 0.33412,1.33124 1.32949,3.14244 2.21194,4.02488 l 1.60444,1.60444 1.14406,-0.9373 1.14405,-0.9373 3.49542,0.18302 3.49541,0.18303 0.50459,2.80854 0.50458,2.80855 3.14319,1.31803 3.14318,1.31803 0.94398,-0.94398 0.94397,-0.94397 2.73224,1.03879 2.73224,1.0388 2.33383,-0.58576 2.33384,-0.58575 0.87513,1.56377 0.87513,1.56378 -0.3834,4.02034 -0.3834,4.02035 -2.85233,0 -2.85234,0 -2.71405,3.40142 -2.71406,3.40142 -1.72093,-1.07474 -1.72093,-1.07474 -5.10764,3.27756 -5.10765,3.27757 0,2.15364 0,2.15363 -4.70712,1.69267 -4.70712,1.69267 -1.31164,-1.08856 -1.31164,-1.08856 -1.95571,1.76989 c -1.07564,0.97344 -2.23682,2.65558 -2.58039,3.73808 l -0.62468,1.96819 -3.30855,-3.20678 -3.30856,-3.20678 -1.14918,2.14725 -1.14917,2.14725 -1.6954,-2.09373 -1.6954,-2.09373 -3.44389,3.55319 -3.44388,3.55319 -1.30384,0 -1.30383,0 0,-0.97968 0,-0.97967 -4.12042,-2.10208 -4.12041,-2.10208 -3.00728,3.64834 -3.00727,3.64834 -5.5429,-0.25676 -5.54289,-0.25676 -1.48404,3.13359 -1.48404,3.13358 2.15463,5.90926 2.15462,5.90926 -0.0153,3.89733 -0.0153,3.89733 -0.73469,1 -0.73468,1 -3.83986,0.0788 -3.83985,0.0788 -0.77257,-2.07877 z").attr(o);
    b = 490;
    k = 700;
    j = "\u4e91\u5357";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 625.48272,609.3125 -0.0173,-1.75 -2.37367,-2.25 -2.37367,-2.25 -1.60906,0 -1.60905,0 0,-1.95295 c 0,-1.07412 -0.54407,-3.14704 -1.20904,-4.60649 l -1.20903,-2.65354 -4.50306,0.50756 -4.50307,0.50756 -1.0379,-1.3876 -1.0379,-1.3876 -3.40253,-0.66897 -3.40252,-0.66898 0.56603,4.22008 0.56603,4.22008 -1.33536,0.51243 -1.33537,0.51243 -1.97127,-1.05499 -1.97126,-1.05499 -2.60688,2.05056 -2.60687,2.05057 0,1.80498 0,1.80497 -1.48343,1.23114 -1.48342,1.23113 -0.9124,-2.39979 c -0.50182,-1.31988 -1.70892,-3.05629 -2.68245,-3.85869 l -1.77005,-1.4589 0.62427,2.50831 0.62426,2.5083 -0.94308,1.4917 -0.94307,1.49169 -0.0471,-3 -0.0471,-3 -1.44022,-1.90287 -1.44022,-1.90287 -3.7162,-0.60405 -3.7162,-0.60405 -0.84037,-3.24308 -0.84036,-3.24308 -1.89883,0 -1.89883,0 -2.17002,-2.75 -2.17003,-2.75 4.59744,-4.05411 4.59745,-4.0541 0,-1.4959 c 0,-0.82274 -0.4947,-1.99059 -1.09934,-2.59523 l -1.09933,-1.09933 0.6374,-2.00829 0.6374,-2.00828 1.56278,-0.59969 1.56277,-0.59969 3.95008,2.22007 3.95009,2.22007 1.69907,-1.08282 1.69908,-1.08282 3.2848,2.87006 3.28479,2.87006 2.43366,0 2.43366,0 3.95753,-5.35711 3.95753,-5.35711 0.32401,-3.39289 0.32402,-3.39289 3,-0.004 c 1.65,-0.002 3.59516,-0.38635 4.32258,-0.85388 l 1.32259,-0.85005 3.34249,-7.33461 3.34249,-7.33461 2.08493,-1.30206 2.08492,-1.30208 0,-1.70275 0,-1.70275 -2.01581,-1.41193 -2.01581,-1.41193 1.31257,-2.52997 1.31257,-2.52998 1.89437,1.3852 1.89437,1.3852 2.30887,0 2.30887,0 0,1.41667 0,1.41666 1.25,0.43317 c 0.6875,0.23824 4.0625,0.21413 7.5,-0.0536 l 6.25,-0.48674 0,1.74255 0,1.74256 2.46635,2.93109 2.46635,2.93109 -0.41901,4.71327 c -0.23045,2.59229 -0.44031,5.07312 -0.46635,5.51295 l -0.0473,0.79969 -1.75,-0.99108 -1.75,-0.99107 -3.7221,3.61709 -3.72209,3.61708 -4.77791,0.74092 c -6.96946,1.08077 -12.13472,2.54396 -13.76921,3.90047 l -1.43462,1.19062 1.59948,2.44112 1.59948,2.44111 -0.57278,5.54971 -0.57278,5.54971 1.49087,-0.5721 1.49086,-0.5721 2.9454,2.17763 2.9454,2.17763 0,1.91194 0,1.91194 3.37401,3.37402 3.37402,3.37401 0.47124,5.68254 0.47124,5.68254 -1.4185,2.84345 -1.41849,2.84344 -2.42676,0 -2.42676,0 -0.0173,-1.75 z").attr(o);
    b = 595;
    k = 580;
    j = "\u91cd\u5e86";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 545.5,693.05181 c 0,-0.48713 0.67223,-2.17463 1.49384,-3.75 0.82161,-1.57537 1.49661,-3.79808 1.5,-4.93934 l 0.006,-2.07504 -1.75,-1.72093 c -0.9625,-0.9465 -2.59834,-2.30119 -3.63519,-3.0104 l -1.8852,-1.28948 0.0128,-2.91456 0.0128,-2.91456 1.714,-5 c 0.9427,-2.75 2.18949,-5.99506 2.77064,-7.21125 l 1.05664,-2.21126 -2.57521,-3.37627 -2.57521,-3.37627 -3.04087,0.4463 -3.04087,0.44631 -1.15461,1.39122 -1.15461,1.39122 -1.65832,0 -1.65831,0 -1.08268,-2.86833 -1.08267,-2.86834 0.87633,-1.56592 0.87634,-1.56593 -1.99406,-1.3967 -1.99406,-1.39669 3.01494,-2.8885 3.01494,-2.88849 2.06201,1.28774 2.06201,1.28775 1.88545,-1.7063 1.88546,-1.70631 1.26875,1.03017 1.26876,1.03018 4.22989,0.0449 4.22989,0.0449 0.57913,-0.93705 0.57912,-0.93704 1.94908,0 1.94908,0 1.56961,-3.92283 1.5696,-3.92283 1.43415,-0.55033 1.43415,-0.55034 2.48815,1.13368 2.48815,1.13368 2.54705,-1.16051 2.54706,-1.16052 2.89393,0 2.89393,0 0.67172,-1.08687 0.67172,-1.08686 -1.73992,-3.85845 -1.73992,-3.85845 -4.87278,-1.75223 -4.87279,-1.75223 0,-2.30245 0,-2.30246 1.45031,0 1.45031,0 0.94889,-1.69557 0.94889,-1.69558 3.64573,2.78074 3.64572,2.78073 1.39115,-1.15456 1.39116,-1.15455 2.08458,1.11564 2.08459,1.11564 0.99449,-0.61463 c 0.54697,-0.33804 1.68012,-2.25558 2.51812,-4.2612 0.838,-2.00561 2.04443,-3.96844 2.68097,-4.36184 l 1.15733,-0.71527 1.87094,1.0013 1.87094,1.00129 2.40676,-1.57697 2.40676,-1.57697 -0.63239,-3.16194 -0.63239,-3.16193 1.74036,0.66783 c 0.95719,0.36731 2.15355,0.66784 2.65857,0.66784 l 0.91821,0 0,1.5 0,1.5 1.94098,0 1.94099,0 0.56001,-0.90612 0.56001,-0.90612 2.24901,0.5684 c 2.72791,0.68945 3.71345,2.01327 3.73369,5.01528 l 0.0153,2.27144 2.5,1.13907 2.5,1.13908 0,2.3138 0,2.31381 2.95034,1.52568 2.95034,1.52568 2.30911,0 2.30912,0 1.27325,-2.0388 1.27325,-2.03881 0.9673,0.59782 0.96729,0.59782 0.006,4.69099 0.006,4.69098 1.52656,2.92737 1.52656,2.92737 -6.28272,5.73596 -6.28272,5.73595 1.69002,1.74098 1.69003,1.74099 2.38313,-1.56149 c 1.31073,-0.85882 3.25022,-1.70453 4.30998,-1.87935 l 1.92684,-0.31786 1.25,0.78405 1.25,0.78406 0,2.08074 0,2.08074 -1.75,1.29934 -1.75,1.29934 1.3321,2.1788 1.3321,2.17881 -1.0821,1.0821 -1.08178,1.0821 0,2.17755 0,2.17756 1.5,1.24489 1.5,1.24489 0,1.65505 c 0,0.91027 -0.70579,2.6627 -1.56842,3.89428 l -1.56842,2.23924 -0.94053,-0.58128 -0.94053,-0.58128 -2.07579,0.65884 -2.0758,0.65883 0.6038,2.40571 0.60379,2.40572 -2.51057,0 -2.51058,0 -1.18939,1.90451 -1.18939,1.90452 -2.16574,-1.41905 -2.16575,-1.41906 -2.59423,2.04063 -2.59423,2.04062 -0.59223,1.86594 -0.59223,1.86595 -2.18,0.57008 -2.18001,0.57009 -1.68891,-1.52845 -1.68892,-1.52845 -1.59336,0.31634 -1.59337,0.31633 -2.41598,-3 -2.41598,-3 -2.57143,2.40817 c -1.41428,1.32449 -2.83004,3.22298 -3.14612,4.21887 l -0.5747,1.81071 -3.41379,0.94259 c -1.87758,0.51843 -4.73367,1.88243 -6.34686,3.03113 -1.61319,1.14869 -3.62121,2.08853 -4.46228,2.08853 l -1.52921,0 -0.31642,2.74145 -0.31642,2.74145 -1.91597,0.36383 -1.91596,0.36384 -4.08404,-1.32227 C 565.83782,691.09855 563.55,689.97833 563,689.33641 l -1,-1.16713 -2.71358,-0.47026 -2.71358,-0.47025 -3.66211,3.35436 -3.66212,3.35437 -1.8743,0 -1.87431,0 0,-0.88569 z").attr(o);
    b = 590;
    k = 650;
    j = "\u8d35\u5dde";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 642.93657,761.69531 -0.58028,-1.5122 -2.86779,-1.18787 -2.86779,-1.18788 -1.11272,0.6877 -1.11273,0.68771 -1.16687,-3.09139 -1.16687,-3.09138 -1.78076,0 -1.78076,0 0,3 0,3 -1.5,0 -1.5,0 0,0.8865 0,0.8865 -3.25,0.47753 -3.25,0.47753 -2.17205,-0.98903 -2.17205,-0.98903 -2.89812,1.01029 -2.89812,1.01029 -3.27632,-1.37759 c -1.80197,-0.75767 -4.61743,-2.50605 -6.25656,-3.88529 L 596.34655,754 l -1.87796,0 -1.87796,0 -0.65868,-3.51104 c -0.36227,-1.93108 -1.05766,-3.75764 -1.54531,-4.05902 l -0.88664,-0.54797 0,-1.93251 0,-1.93251 2,-1.24902 2,-1.24902 0,-1.80773 0,-1.80773 -3.20679,-1.34835 -3.20679,-1.34836 -2.21575,0.84243 -2.21575,0.84243 -1.2368,-1.49026 -1.2368,-1.49026 -2.75964,0.60612 -2.75963,0.60612 -4.08103,-2.08199 c -2.24456,-1.14508 -4.08102,-2.43456 -4.08102,-2.86549 0,-0.43093 1.49209,-2.22969 3.31575,-3.99726 l 3.31575,-3.21375 0.60889,0.60889 0.60889,0.60889 1.97756,-0.62765 1.97755,-0.62765 0.43357,-4.71366 0.43356,-4.71365 -2.4579,-2.6822 -2.45789,-2.6822 -1.81615,1.13421 -1.81616,1.1342 -2.58191,-1.3818 -2.58192,-1.3818 -1.10247,1.10247 -1.10246,1.10246 -2.37733,-1.08319 -2.37733,-1.08318 0,-1.6845 0,-1.6845 -1.9755,-1.7878 -1.9755,-1.7878 -4.46713,0.50351 -4.46713,0.50351 -0.55737,-1.45248 C 544.75082,697.49004 544.5,696.46536 544.5,696.01183 l 0,-0.82459 1.99823,0.52255 1.99823,0.52255 2.75177,-1.78625 c 1.51347,-0.98244 3.34108,-2.61156 4.06134,-3.62027 l 1.30958,-1.83402 2.69042,0.65501 2.69043,0.655 0.79969,1.34909 0.79969,1.3491 2.20031,0.0147 c 1.21017,0.008 3.32531,0.61187 4.70031,1.3417 l 2.5,1.32695 2.75,-1.5573 2.75,-1.5573 0,-1.57311 0,-1.5731 5.2986,-3.21129 C 586.71283,684.44508 589.78751,683 590.63123,683 l 1.53404,0 3.3383,-4.15407 3.3383,-4.15406 0.78577,2.12415 0.78578,2.12414 2.79329,0.66423 c 1.53631,0.36533 3.55257,1.323 4.48059,2.12816 l 1.6873,1.46394 3.5627,-1.1758 3.5627,-1.17579 0,-1.42245 0,-1.42245 2.06948,-2.06948 2.06949,-2.06949 2.51728,1.64939 c 1.3845,0.90716 2.64228,1.50093 2.79506,1.31948 0.15278,-0.18144 0.78856,-1.31249 1.41285,-2.51344 l 1.13507,-2.18354 2.75039,-0.31646 L 634,671.5 l -0.25918,-2.36833 -0.25917,-2.36833 2.53198,0.48402 2.53198,0.48401 1.66246,-2.81432 1.66246,-2.81432 3.56474,0.19863 L 649,662.5 l 1.43918,-3.27027 1.43918,-3.27028 1.06082,0.3486 1.06082,0.34861 0.31955,2.17167 0.31955,2.17167 2.18045,-0.0463 2.18045,-0.0463 3,-3.89585 3,-3.89584 1.79799,0.52477 1.79799,0.52477 1.35635,-1.12568 1.35636,-1.12568 2.68712,0.67442 2.68712,0.67443 -0.49855,2.60799 -0.49855,2.60799 0.92234,1.72341 0.92234,1.7234 1.60014,-0.61403 1.60015,-0.61403 -0.52246,1.90127 c -0.28735,1.0457 -0.80723,3.17616 -1.1553,4.73436 -0.34807,1.55819 -1.73989,4.58675 -3.09295,6.73012 l -2.46009,3.89705 0,1.96085 0,1.96086 1.07403,0.66378 1.07403,0.66379 2.24042,-2.10477 C 679.12071,679.94715 680.63483,679 681.25318,679 l 1.12427,0 0.67666,4.5123 c 0.37217,2.48176 1.02375,4.7268 1.44797,4.98899 l 0.77131,0.47669 1.23575,-1.48899 1.23575,-1.48899 2.71927,0 2.71926,0 1.23529,4.12301 1.23528,4.123 -1.077,1.07699 -1.07699,1.077 0,3.29153 0,3.29152 -2.0701,1.25848 -2.0701,1.25847 -2.53622,5.32124 -2.53623,5.32124 0.66254,5.30272 0.66253,5.30273 -4.27939,3.663 -4.27939,3.663 -2.27682,0.57144 -2.27682,0.57145 -0.11069,1.64159 c -0.0609,0.90287 -0.0314,2.63357 0.0656,3.846 l 0.17628,2.20441 -3.31559,0.8532 -3.31559,0.8532 -0.30896,3.13343 -0.30896,3.13343 -3.18409,0.30896 -3.18408,0.30896 -1.25011,2.62188 c -0.68757,1.44203 -1.94727,3.20046 -2.79934,3.90762 l -1.54922,1.28574 -1.15762,-1.15762 C 651.62093,757.52093 650.74,757 650.3,757 l -0.8,0 0,2.5 0,2.5 -1.41821,0 c -0.78002,0 -2.12623,0.27169 -2.99157,0.60375 l -1.57336,0.60376 -0.58029,-1.5122 z").attr(o);
    b = 630;
    k = 710;
    j = "\u5e7f\u897f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 684.5318,683.5125 -0.0318,-4.05 -1.2,-1.2 c -1.66302,-1.66302 -3.81181,-1.49929 -5.97126,0.45499 l -1.82874,1.65499 0,-1.07395 c 0,-1.52298 3.35025,-7.22212 4.25,-7.22971 l 0.75,-0.006 0,-3.01357 0,-3.01357 1.15782,-1.85396 1.15782,-1.85397 -0.62643,-1.63246 -0.62644,-1.63247 -2.14079,0 -2.14079,0 0.40436,-3.46361 0.40435,-3.46362 -2.90973,-1.20525 -2.90973,-1.20525 -1.8973,1.18488 -1.89731,1.18489 -2.30807,-0.57929 -2.30807,-0.57929 -2.81584,4.06327 -2.81585,4.06327 -1.29445,0 -1.29445,0 -0.31955,-2.25 -0.31955,-2.25 -1.96165,0 -1.96166,0 -1.53834,3 c -0.84609,1.65 -1.59775,3.1344 -1.67035,3.29867 -0.0726,0.16427 -1.23002,0.0231 -2.57205,-0.31375 l -2.44005,-0.61241 -1.57225,-2.68626 -1.57225,-2.68625 0.20771,-4.67271 0.20771,-4.67271 1.32554,-1.59718 1.32555,-1.59719 -0.95047,-3.2301 -0.95047,-3.23011 -4.27303,0.19772 -4.27303,0.19772 -1.43962,1.19478 -1.43962,1.19478 -0.65293,-0.65293 -0.65294,-0.65293 2.86419,-2.98957 c 1.57531,-1.64426 3.35499,-2.98957 3.95486,-2.98957 1.25911,0 3.8793,-2.8485 4.78054,-5.19708 l 0.61724,-1.60852 -1.39951,-1.8472 -1.39951,-1.8472 -0.0318,-4.63569 -0.0318,-4.6357 -1.49384,-2.8643 -1.49384,-2.86431 -0.006,-8.09636 -0.006,-8.09636 1.58359,-3.1744 1.5836,-3.17439 3.64854,-2.47924 3.64854,-2.47925 1.76786,0 1.76787,0 0,1 0,1 2.95295,0 2.95294,0 2.54706,-1.16052 2.54705,-1.16051 0,-2.2325 0,-2.23249 -1.75,-0.67931 -1.75,-0.6793 2.5,-1.39225 2.5,-1.39225 2.78212,-0.0354 2.78212,-0.0354 3.59,1.5 3.59001,1.5 3.70185,0 3.70186,0 4.89547,3.48055 4.89547,3.48055 0.98055,-0.98055 c 0.5393,-0.5393 1.64262,-0.98055 2.45181,-0.98055 0.80919,0 2.18169,-0.63956 3.05,-1.42125 0.86831,-0.78168 2.23272,-1.56918 3.03203,-1.75 l 1.4533,-0.32875 0.14439,1.5 c 0.0794,0.825 0.21293,2.0625 0.29671,2.75 l 0.15231,1.25 2.3711,0 2.3711,0 2.3789,-3.48434 c 1.30839,-1.91639 2.93454,-3.69963 3.61365,-3.96276 l 1.23474,-0.47842 1.03946,1.94224 1.03945,1.94224 -0.63452,2.52815 -0.63453,2.52814 1.61254,3.39818 1.61254,3.39817 1.95504,-0.51125 1.95505,-0.51126 2.51114,2.85546 2.51114,2.85545 0.0316,2.55 0.0316,2.55 1.18483,1.18483 1.18483,1.18483 -2.22821,4.46155 -2.2282,4.46155 -1.95663,0.62101 -1.95662,0.621 0,1.8736 0,1.8736 -1,0.61803 -1,0.61803 0,2.87589 c 0,1.58173 0.45035,4.06039 1.00078,5.50812 l 1.00077,2.63224 1.99923,-0.63453 1.99922,-0.63453 0,0.86739 c 0,0.47707 -0.53404,1.40143 -1.18676,2.05415 l -1.18675,1.18675 2.12044,2.26325 2.12044,2.26324 -1.00263,1.78439 -1.00262,1.7844 3.10446,2.89999 3.10446,2.9 -0.66327,2.64266 -0.66326,2.64265 1.31577,2.45854 1.31576,2.45853 -1.19497,3.30465 -1.19498,3.30465 0.59316,2.96578 0.59316,2.96579 -1.57243,1.305 -1.57243,1.305 -3.26378,-0.50675 c -1.79507,-0.27871 -4.22534,-0.81783 -5.40059,-1.19805 l -2.13681,-0.6913 -3.36319,3.02017 -3.36318,3.02017 1.25,1.26687 1.25,1.26686 0,2.3 0,2.3 -1.34501,0 -1.34502,0 -1.80997,-2 -1.80998,-2 -4.82596,0 -4.82596,0 -0.61319,2.44316 -0.6132,2.44317 0.68024,1.10064 0.68023,1.10064 -1.20853,1.45619 -1.20854,1.4562 -4.01731,0 -4.01731,0 -1.32844,1.75 -1.32844,1.75 -0.0318,-4.05 z").attr(o);
    b = 680;
    k = 620;
    j = "\u6e56\u5357";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 628.55031,587.56947 c -1.14486,-1.85242 -2.08156,-4.10242 -2.08156,-5 l 0,-1.63197 -0.95953,0 c -0.52774,0 -2.10274,-1.2329 -3.5,-2.73978 l -2.54047,-2.73978 0,-4.13778 0,-4.13777 -1.52183,-1.26301 -1.52183,-1.263 1.94058,-1.35923 1.94058,-1.35924 1.4801,0.56797 1.4801,0.56797 0.66017,-1.06818 0.66016,-1.06817 4.19099,-0.004 4.19098,-0.004 3.18618,-1.94275 3.18618,-1.94275 1.10581,-2.06623 1.1058,-2.06622 2.04366,1.09373 2.04366,1.09374 0.59549,-0.59549 c 0.32752,-0.32752 0.90354,-2.95148 1.28004,-5.83102 l 0.68455,-5.23561 -0.91271,-2.43879 -0.91271,-2.43879 -1.95298,-1.36791 -1.95297,-1.36792 0,-2.44329 0,-2.4433 -3.07946,0 -3.07945,0 0.62391,-2.84066 0.62392,-2.84066 -1.54446,-1.28178 -1.54446,-1.28179 0,-1.79577 c 0,-0.98767 0.27314,-2.50757 0.60699,-3.37755 l 0.60699,-1.58179 1.40658,0 c 0.77362,0 2.18797,-0.41715 3.14301,-0.927 0.95504,-0.50985 2.52393,-1.17073 3.48643,-1.46862 l 1.75,-0.54161 0,-1.87087 0,-1.87087 -2.54705,-1.16052 c -1.40088,-0.63828 -3.20088,-1.16051 -4,-1.16051 l -1.45295,0 0,-2 0,-2 -2,0 -2,0 0,-1 0,-1 2.63398,0 c 1.44869,0 4.37945,0.52296 6.51281,1.16212 l 3.87883,1.16213 2.4531,-1.31286 2.4531,-1.31286 1.55285,1.28875 1.55284,1.28874 2.00327,-1.81292 2.00326,-1.81293 4.97882,5.58612 4.97882,5.58611 4.24916,1.98943 c 2.33704,1.09419 5.82416,2.48094 7.74916,3.08168 l 3.5,1.09225 5.04993,-0.35581 5.04994,-0.3558 3.69941,-1.33773 3.69941,-1.33772 1.20066,1.20065 1.20065,1.20065 1.97126,0 1.97126,0 1.69544,-1.53435 1.69544,-1.53435 0.68497,4.28356 0.68497,4.28356 2.59429,2.70786 2.59429,2.70786 1.93218,-1.03407 1.93218,-1.03408 1.67186,0.73473 c 0.91952,0.40409 2.23436,0.64402 2.92186,0.53316 l 1.25,-0.20155 0,1.38332 0,1.38332 2.54705,1.16051 2.54706,1.16052 2.90325,0 2.90326,0 1.01928,-1.75 1.01928,-1.75 0.0304,1.07237 0.0304,1.07237 4.02878,2.63771 4.02878,2.63772 3.48226,0.65328 3.48227,0.65328 0.60058,0.97176 0.60058,0.97176 -1.78832,3.32072 -1.78833,3.32073 1.6767,2.55897 c 0.92218,1.40743 1.6767,3.0248 1.6767,3.59415 0,0.56935 0.87078,1.90596 1.93507,2.97025 l 1.93506,1.93506 1.02745,3.72109 1.02744,3.72109 -0.50905,0.82365 -0.50904,0.82365 -5.86644,-0.61317 -5.86644,-0.61316 -0.33702,2.38336 -0.33701,2.38336 -2.75,0.31642 -2.75,0.31642 0,1.02329 c 0,2.32276 -8.9189,7.78582 -12.87212,7.88451 l -1.62788,0.0406 -3.46223,2.95936 c -4.08717,3.49354 -5.13233,3.63885 -6.81324,0.94728 l -1.25657,-2.01209 0.62634,-2.49554 0.62634,-2.49554 -1.66105,-3.50041 -1.66105,-3.50041 -1.90862,1.02147 c -1.04974,0.5618 -3.10533,2.59042 -4.56796,4.50803 l -2.65934,3.48657 -1.38131,0 c -1.638,0 -1.70929,-0.51865 -0.40599,-2.95388 l 0.97532,-1.8224 -2.27221,-0.43436 -2.27221,-0.43436 -4.95311,2.68347 -4.95311,2.68348 -4.5,-3.08385 -4.5,-3.08385 -5,-0.70249 c -2.75,-0.38637 -7.17551,-1.27058 -9.83446,-1.96493 l -4.83445,-1.26244 -1.90198,1.18781 c -1.04608,0.65329 -2.80808,1.1878 -3.91554,1.1878 l -2.01357,0 0,1.89301 0,1.89301 1.5,0.57561 1.5,0.5756 0,1.4244 0,1.42439 -1.58179,0.60699 c -2.48973,0.9554 -5.27174,0.71527 -7.44954,-0.64301 l -2.00419,-1.25 -4.73224,2.62411 -4.73224,2.62411 -2.5,5.10514 c -1.375,2.80782 -2.8008,5.11447 -3.16844,5.12589 -0.36764,0.0114 -1.60514,-1.49487 -2.75,-3.34728 z").attr(o);
    b = 690;
    k = 540;
    j = "\u6e56\u5317";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 742.53125,528.60699 0,-1.39301 -1.72362,-0.66142 -1.72362,-0.66141 -1.13662,1.55442 -1.13663,1.55443 -2.38975,-0.0153 c -2.92583,-0.0187 -4.3242,-0.91288 -5.22113,-3.33844 l -0.68549,-1.85376 -1.5311,0.58754 -1.53111,0.58754 -1.87926,-1.17362 -1.87927,-1.17362 -1.38498,1.14944 -1.38499,1.14943 -2.69622,-2.50007 -2.69621,-2.50008 0,-3.90051 0,-3.90052 -1.09507,-0.67679 -1.09507,-0.67678 -2.70545,2.00023 -2.70546,2.00023 -2.83073,-1.48317 -2.83074,-1.48317 -2.60035,1.1848 -2.60036,1.1848 -5.41628,0.41174 -5.41629,0.41174 -4.1021,-1.16441 c -2.25615,-0.64042 -4.5296,-1.53855 -5.0521,-1.99583 -0.5225,-0.45728 -1.55,-0.83142 -2.28333,-0.83142 l -1.33334,0 -3.69094,-3.69094 c -2.03002,-2.03002 -4.71502,-5.20001 -5.96667,-7.04441 l -2.27572,-3.35347 0,-2.03729 0,-2.0373 -3.3849,-4.16829 -3.38489,-4.1683 -0.67621,-3.16646 -0.67621,-3.16646 -1.1889,-0.47203 c -0.65389,-0.25962 -2.00183,-1.87222 -2.99543,-3.58354 L 645.41818,471 l 2.86225,0 2.86226,0 3.42979,-2.53042 3.42979,-2.53042 3.71478,-1.11297 3.71478,-1.11298 2.7368,-2.8566 2.7368,-2.85661 1.77773,0 1.77772,0 1.07037,-2 1.07037,-2 3.4058,0 3.4058,0 0.66811,-1.08103 0.66811,-1.08102 2.1409,0.51989 2.14091,0.5199 6,-4.22183 6,-4.22182 0.89467,-8.96704 c 0.49208,-4.93188 1.05234,-9.15231 1.24504,-9.37875 0.32495,-0.38185 3.94431,0.5312 12.20964,3.08011 l 3.34935,1.03289 1.05384,-1.05384 1.05385,-1.05385 1.92999,1.0329 1.92999,1.0329 1.7722,-1.60382 1.77219,-1.60381 1.60153,0.61456 1.60153,0.61457 -0.55765,2.78826 -0.55766,2.78827 0.98321,0.60765 0.9832,0.60766 2.6702,-2.10038 c 4.32182,-3.39954 3.76026,-1.76848 -1.59611,4.63601 -2.75609,3.29539 -6.11358,7.69586 -7.46107,9.77882 l -2.44999,3.7872 0.59504,0.9628 c 0.32727,0.52954 1.28798,0.9628 2.1349,0.9628 0.84692,0 3.10773,0.74401 5.02404,1.65335 l 3.48418,1.65336 0.90194,2.37227 0.90193,2.37227 1.58223,0.60716 1.58223,0.60715 1.13278,-1.13278 1.13278,-1.13278 3.36456,0 3.36456,0 2.52433,3 2.52434,3 1.9111,0 1.91111,0 0,1.94098 0,1.94099 1.082,0.66871 1.08199,0.66871 -2.76908,2.8903 c -1.523,1.58967 -3.16395,2.89031 -3.64656,2.89031 -0.48261,0 -2.01342,-1.35 -3.4018,-3 l -2.52434,-3 -2.28866,0 -2.28866,0 -1.15214,1.38824 -1.15213,1.38823 0.64224,4.01635 0.64224,4.01634 -2.11255,1.13061 -2.11255,1.1306 0,3.9058 0,3.9058 -1.25,0.80901 c -0.6875,0.44496 -2.15,0.80902 -3.25,0.80902 l -2,0 -0.32097,2.26081 -0.32096,2.2608 3.01553,0.60311 3.01554,0.60311 0.30543,2.53522 0.30543,2.53523 1.5,0.77871 c 0.825,0.42829 2.175,1.03331 3,1.34449 0.825,0.31119 2.26116,1.11224 3.19146,1.78012 l 1.69147,1.21432 1.87283,-1.69489 1.87284,-1.69489 1.23093,4.80285 1.23094,4.80286 -1.02048,2.68407 -1.02049,2.68408 -1.46805,0 -1.46804,0 -1.55671,2.22251 -1.5567,2.2225 0,2.2775 0,2.27749 -1,0 -1,0 0,-1.39301 z").attr(o);
    b = 700;
    k = 480;
    j = "\u6cb3\u5357";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 737.49428,457.53589 -0.97603,-2.56714 -1.4023,0 -1.40231,0 -1.24489,-1.5 -1.24489,-1.5 -2.21089,0 c -1.21599,0 -2.46291,-0.25203 -2.77095,-0.56006 l -0.56006,-0.56006 1.46937,-2.94542 1.46937,-2.94541 1.92402,-1.02971 1.92403,-1.02971 0,-1.24612 0,-1.24612 6,-5.93739 6,-5.93739 0,-1.28131 0,-1.2813 -1.10497,0 c -0.60774,0 -3.1053,1.35 -5.55014,3 -2.44483,1.65 -4.6193,3 -4.83215,3 -0.21285,0 -0.13769,-1.53633 0.16703,-3.41406 l 0.55402,-3.41407 -1.61689,-2.30844 -1.6169,-2.30844 0,-2.32525 0,-2.32524 2.35657,-2.20225 c 2.63079,-2.45851 5.03076,-6.81697 6.0149,-10.92339 l 0.65214,-2.72113 1.9882,-1.06405 1.98819,-1.06405 0,-1.96481 0,-1.96482 1.75,0.007 1.75,0.006 3.21651,-3.70681 3.21651,-3.70681 4.74113,-0.54969 4.74114,-0.54969 0.54235,-2 c 0.2983,-1.1 1.40603,-2.98466 2.46163,-4.18814 l 1.91928,-2.18814 1.97982,1.38672 1.97982,1.38672 2.87638,-1.48744 2.87639,-1.48743 2.19703,1.53885 c 1.20836,0.84637 2.92715,1.53886 3.81953,1.53886 l 1.6225,0 1.54722,1.75 1.54722,1.75 0.67744,5.07431 0.67745,5.0743 3.25132,1.1757 3.25133,1.17569 3.52401,0 3.52401,0 1.65499,-1.82874 1.65499,-1.82874 0,-2.14821 0,-2.1482 2.5,-1.63807 2.5,-1.63806 0,-1.7961 0,-1.79609 3.07672,-2.5889 3.07673,-2.58889 1.53712,0 c 0.84542,0 3.17339,0.84081 5.17327,1.86847 1.99989,1.02766 4.89844,2.46696 6.44123,3.19845 l 2.80507,1.32998 3.19493,-1.33691 3.19493,-1.33692 5.75,-0.31071 5.75,-0.31072 0,5.39016 0,5.39017 -1.0438,0.6451 -1.04381,0.64511 -1.25823,-1.04424 -1.25823,-1.04424 -2.44797,0.59093 -2.44796,0.59092 -1.5,1.74215 c -0.825,0.95819 -4.96155,4.27197 -9.19234,7.36395 l -7.69234,5.62179 -0.30766,4.25328 -0.30766,4.25328 -4,0.0933 c -2.2,0.0513 -4.40724,0.16384 -4.90499,0.25 l -0.90499,0.15666 1.68022,1.85662 1.68022,1.85661 -1.46095,1.21249 -1.46095,1.21248 -0.63378,2.88557 -0.63378,2.88557 -1.73361,0.55023 -1.73362,0.55023 -2.19688,4.52185 c -1.20829,2.48702 -2.19689,5.13473 -2.19689,5.88381 l 0,1.36196 -3.48785,0.65432 -3.48784,0.65433 -1.01216,1.89122 c -0.55668,1.04018 -1.01215,2.83046 -1.01215,3.97841 l 0,2.08718 -2.45088,1.1167 -2.45089,1.11669 -0.62857,2.86187 -0.62857,2.86186 -1.42055,0 -1.42054,0 0,-1.39301 0,-1.39301 -1.58179,-0.60699 c -0.86998,-0.33385 -2.56327,-0.60699 -3.76287,-0.60699 l -2.18108,0 -0.98713,2.25 -0.98713,2.25 -4.19975,0.0618 -4.19975,0.0618 -2.80025,-3.75 -2.80025,-3.75001 -1.90322,-0.50822 -1.90322,-0.50824 -2.84678,1.47213 -2.84678,1.47213 0,2.90693 0,2.90693 -1.75,0.48007 c -0.9625,0.26404 -3.55,0.76836 -5.75,1.12071 -2.2,0.35235 -4.78715,0.87186 -5.74922,1.15446 l -1.74923,0.51382 -0.97602,-2.56714 z").attr(o);
    b = 775;
    k = 420;
    j = "\u5c71\u4e1c";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 775.5,565.6111 c 0,-0.83837 0.45,-1.80243 1,-2.14235 l 1,-0.61803 0,-1.86956 0,-1.86955 -1.57143,-1.57143 c -2.17575,-2.17575 -2.63517,-2.04401 -6.7256,1.92857 -1.98211,1.925 -4.02606,3.5 -4.54211,3.5 l -0.93828,0 -0.63757,-3.39855 -0.63757,-3.39856 -1.97372,-2.50917 C 759.38817,552.28242 758.5,550.5847 758.5,549.88976 c 0,-0.69494 -0.77594,-2.12093 -1.72431,-3.16887 l -1.72431,-1.90534 1.72431,-3.00444 c 0.94837,-1.65244 1.72431,-3.56693 1.72431,-4.25442 l 0,-1.24998 -2.26489,-1.21213 c -1.24569,-0.66668 -3.5204,-1.34599 -5.0549,-1.5096 l -2.79001,-0.29746 -1.42208,-1.42208 -1.42208,-1.42208 0.7701,-2.98731 0.77011,-2.9873 3.10188,-1.5 3.10188,-1.5 0.53622,-3.94671 0.53623,-3.94671 -1.4475,-3.46435 -1.4475,-3.46435 0.5871,-1.84977 0.58709,-1.84977 -2.57082,1.17134 c -1.41396,0.64424 -2.57083,1.54912 -2.57083,2.01083 l 0,0.83949 -1.37756,0 -1.37755,0 -1.24489,-1.5 -1.24489,-1.5 -1.87755,0 -1.87756,0 0,-2.3 0,-2.3 -1.2,-1.2 -1.2,-1.2 -1.8,0 -1.8,0 0,-1.10699 0,-1.10699 1.52268,0.58431 1.52268,0.58431 2.07519,-2.07519 2.07519,-2.07519 -0.48782,-2.55187 -0.48782,-2.55187 2.46156,-2.2813 2.46157,-2.2813 -0.68516,-4.56896 -0.68516,-4.56896 2.42549,0 2.42548,0 2.218,3 2.218,3 1.38421,0 1.38421,0 3.59799,-3.49413 3.59799,-3.49412 -0.93914,-1.75588 c -0.51653,-0.96573 -1.17741,-2.52915 -1.46863,-3.47427 l -0.52949,-1.7184 -3.42143,-1.42957 c -1.88179,-0.78626 -3.71397,-1.9029 -4.07152,-2.48142 l -0.65009,-1.05186 2.01782,-1.07991 2.01782,-1.0799 2.26019,1.41076 c 1.2431,0.77592 3.49769,1.69787 5.01019,2.04878 l 2.75,0.63802 0,1.35851 c 0,0.74717 0.68691,1.92858 1.52645,2.62535 l 1.52646,1.26684 5.72354,1.13486 5.72355,1.13486 1,2.28032 1,2.28033 3.39253,-0.63164 3.39254,-0.63164 -0.73091,3.82206 c -0.402,2.10213 -0.80364,4.72205 -0.89254,5.82205 l -0.16162,2 2.31924,0.32862 2.31924,0.32863 1.89522,4.42137 1.89523,4.42138 2.60127,0 c 1.43071,0 3.4717,-0.46583 4.53554,-1.03518 l 1.93426,-1.03519 0,-1.4058 c 0,-0.77319 0.4407,-1.67816 0.97933,-2.01106 l 0.97934,-0.60526 1.95294,1.04518 1.95294,1.04519 0.66706,2.10172 0.66706,2.10173 -1.05695,1.05695 -1.05696,1.05696 -1.44673,-1.20068 -1.44672,-1.20068 -2.60511,0.65384 c -1.4328,0.35961 -2.84455,1.04128 -3.13721,1.51481 l -0.53211,0.86098 1.64514,2.51079 1.64513,2.5108 -2.60357,3.09418 c -1.43197,1.70179 -2.60358,3.6562 -2.60358,4.34313 l 0,1.24896 2.25,2.03187 c 1.2375,1.11752 3.7125,2.65581 5.5,3.41842 l 3.25,1.38656 0,1.55589 c 0,0.85574 -0.45169,2.00758 -1.00375,2.55964 l -1.00374,1.00374 1.25374,1.70266 1.25375,1.70265 3.5,-1.03073 3.5,-1.03074 3.75,0.61223 3.75,0.61224 0,3.77724 0,3.77724 -2,2.54259 c -1.1,1.39842 -2,3.03411 -2,3.63486 l 0,1.09227 1.08333,0 1.08334,0 -0.41283,1.25 -0.41282,1.25 -3.42051,0.5 -3.42051,0.5 0,5 c 0,2.75 -0.225,5.225 -0.5,5.5 -0.275,0.275 -1.25435,2.13325 -2.17634,4.12945 l -1.67633,3.62946 -2.96118,2.10854 -2.96118,2.10855 -1.2666,-1.52616 -1.2666,-1.52616 -4.33621,0.65025 -4.3362,0.65025 -3.54448,-3.11209 -3.54447,-3.11209 -1.71629,0 -1.71628,0 -2.00995,4.17034 -2.00996,4.17035 -1.23896,0.41299 -1.23897,0.41299 0,-1.52432 z").attr(o);
    b = 780;
    k = 520;
    j = "\u5b89\u5fbd";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 841.5,526.90604 0,-0.99994 -3.4492,0.23229 -3.44919,0.23229 -1.88282,-1.70393 -1.88282,-1.70392 -4.91798,0.0209 c -2.7049,0.0115 -6.49299,-0.0508 -8.41799,-0.13835 -1.925,-0.0876 -4.50489,0.17986 -5.7331,0.5943 l -2.23309,0.75351 0.23309,-3.73499 0.2331,-3.73498 -5,-2.72383 -5,-2.72383 -0.31148,-1.59191 -0.31149,-1.59191 1.88788,-1.88788 c 1.03833,-1.03833 2.15705,-2.58934 2.48604,-3.44668 l 0.59817,-1.55881 -1.48658,-2.12238 -1.48658,-2.12239 1.69449,-0.65024 1.69448,-0.65023 1.85397,1.15782 c 2.67729,1.672 3.42282,1.45906 4.69915,-1.34218 l 1.13907,-2.5 -1.10828,-2.43241 -1.10828,-2.43241 -3.00437,-1.24445 -3.00437,-1.24446 -1.36591,1.868 c -0.75125,1.02739 -1.36591,2.40452 -1.36591,3.06028 l 0,1.1923 -2.47486,0.47309 -2.47486,0.4731 -1.39083,-1.60652 c -0.76496,-0.88359 -1.67701,-2.81282 -2.02679,-4.28718 l -0.63596,-2.68067 -2.24835,-0.31982 -2.24835,-0.31982 0.2916,-1.99951 c 0.16038,-1.09974 0.56209,-3.96242 0.89268,-6.36152 l 0.60107,-4.36201 -3.94457,0.66644 -3.94456,0.66642 -1.29894,-2.42707 -1.29893,-2.42708 -5.14917,-0.60579 L 769,466.01187 766.5,462.9813 c -1.375,-1.66682 -2.83441,-3.02652 -3.24314,-3.02156 -0.40873,0.005 -2.54623,-0.77215 -4.75,-1.72689 l -4.00686,-1.7359 0,-1.2641 c 0,-1.66584 3.64036,-5.2641 5.32569,-5.2641 l 1.32568,0 2.04935,2.25 c 1.12715,1.2375 2.54105,3.20576 3.14202,4.37391 l 1.09266,2.1239 4.6278,-0.1248 4.6278,-0.12479 2.22268,-2.7875 2.22267,-2.7875 1.75843,0.67478 1.75843,0.67477 0.94066,2.47412 0.94066,2.47413 2.23273,-1.47511 2.23274,-1.47511 0.32661,-2.18928 0.32661,-2.18928 2.29855,-0.8739 2.29855,-0.87391 0.66787,-3.56006 0.66788,-3.56006 1.89122,-1.01216 c 2.25169,-1.20506 3.06476,-1.27845 2.90429,-0.26215 -0.0651,0.4125 -0.0651,1.7625 0,3 l 0.11842,2.25 1.77749,0 1.7775,0 2.4725,1.74907 c 1.35988,0.96199 5.36713,2.65832 8.90499,3.76963 l 6.43249,2.02056 5.56751,9.5287 c 3.06214,5.24079 6.80502,11.29891 8.31752,13.4625 l 2.75,3.93381 0,3.21676 0,3.21677 5.62996,1.77469 5.62997,1.77469 0.90184,2.58702 0.90184,2.58702 3.44049,1.2441 3.44048,1.2441 3.00758,3.64871 3.00758,3.64872 -1.04452,0.64554 -1.04451,0.64555 -2.68536,-0.48316 c -1.47694,-0.26575 -3.20021,-0.88834 -3.82947,-1.38355 l -1.14413,-0.90038 -5.35587,-0.59938 -5.35588,-0.59937 -1.5,-1.28814 c -0.825,-0.70848 -2.67417,-1.58109 -4.10927,-1.93914 l -2.60927,-0.65099 -2.89073,2.48801 -2.89073,2.48802 0.65707,0.6588 0.65707,0.65881 2.84293,-1.39715 2.84293,-1.39715 1.75,0.39674 1.75,0.39674 0,1.29887 0,1.29886 4.20039,0.67167 c 2.31021,0.36942 4.73623,1.11639 5.39116,1.65993 l 1.19078,0.98826 -1.69256,4.45886 c -1.82693,4.81287 -6.81408,12.09723 -8.83977,12.9116 l -1.25,0.50253 0,-0.99994 z").attr(o);
    b = 820;
    k = 480;
    j = "\u6c5f\u82cf";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 839.57815,603.12665 -3.04067,-3.62665 -2.78437,3.25901 -2.78436,3.25902 -2.5744,-0.009 -2.5744,-0.009 -2.52759,-5.75 c -1.39017,-3.1625 -3.03455,-6.9875 -3.65416,-8.5 l -1.12657,-2.75 -2.4829,0 -2.48289,0 -1.0442,-3.87785 -1.0442,-3.87785 -4.49434,-4.14275 c -5.00745,-4.6157 -5.17828,-5.12811 -2.87934,-8.63673 L 805.69877,566 l 1.13499,-3e-5 1.13499,-3e-5 2.75,-3.44654 c 1.5125,-1.8956 2.75,-4.05559 2.75,-4.79997 0,-0.74439 0.4986,-1.85203 1.10801,-2.46144 l 1.10801,-1.10801 -0.36522,-4.59199 -0.36521,-4.59199 2.56607,0 2.56608,0 1.94113,-1.4391 1.94113,-1.43909 -1.28684,-2.10634 -1.28685,-2.10633 2.03685,-2.58943 2.03684,-2.58943 0,-3.79181 0,-3.79182 1.75,-0.3697 1.75,-0.36969 2.5513,1.83752 2.55129,1.83752 5.19041,0.43633 5.19041,0.43632 1.62331,-2.47747 1.6233,-2.47748 1.38499,0 1.38499,0 0,1.5 0,1.5 1.87756,0 1.87755,0 1.07161,1.2912 1.0716,1.29121 -1.98584,1.24018 -1.98584,1.24017 -0.93857,2.46862 -0.93857,2.46862 -2.37553,0 c -1.30654,0 -3.79267,0.49402 -5.52475,1.09783 l -3.14922,1.09782 0,0.92693 0,0.92692 2.66112,1.01176 c 1.46362,0.55647 4.17495,1.06867 6.02517,1.13822 l 3.36405,0.12647 2.77955,-2.66297 2.77955,-2.66298 1.94528,0.0406 1.94528,0.0406 3.32621,2.84581 3.32621,2.84581 1.89067,-0.49442 1.89067,-0.49442 0.60051,-1.89203 0.6005,-1.89203 1.85083,0 c 1.01795,0 2.56263,0.27314 3.43261,0.60699 l 1.58179,0.60699 0,1.32562 0,1.32562 -1.92221,0.61009 -1.92222,0.61009 -3.79447,4.20002 -3.79446,4.20002 1.84685,0.35567 1.84686,0.35568 0.72869,-1.17906 0.7287,-1.17905 0.64476,3.22382 0.64476,3.22382 -0.99495,1.19885 -0.99496,1.19885 0.58313,0.58312 0.58312,0.58313 -1.29874,3.82486 c -0.71431,2.10368 -1.89992,4.55663 -2.63469,5.451 l -1.33595,1.62614 1.72913,3.62602 1.72913,3.62603 -2.14442,1.99784 c -2.56539,2.39002 -3.22806,2.49222 -3.22806,0.49784 0,-1.68305 -0.18315,-1.75069 -2.41821,-0.89301 l -1.58179,0.60699 0,1.45493 c 0,0.80022 -1.18735,3.96478 -2.63854,7.03236 l -2.63855,5.57743 -0.49409,4.38361 -0.4941,4.38361 -0.78344,0.48419 -0.78345,0.4842 -2.36932,-0.90082 -2.36932,-0.90081 -3.63956,1.77031 -3.63956,1.77031 -3.04067,-3.62665 z").attr(o);
    b = 840;
    k = 570;
    j = "\u6d59\u6c5f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 742.59402,682.66631 -1.12055,-1.35018 1.67755,-3.39982 c 0.92265,-1.86991 2.4968,-3.98785 3.4981,-4.70653 l 1.82055,-1.30671 0,-1.86151 c 0,-1.02383 -0.27315,-2.57331 -0.60699,-3.44329 l -0.60699,-1.58179 -2.07201,0 c -1.13961,0 -3.57089,0.542 -5.40285,1.20445 l -3.33084,1.20444 -1.58265,-1.58264 -1.58264,-1.58265 0.0121,-3.8718 c 0.0192,-6.14311 0.34116,-7.75972 1.90364,-9.55879 l 1.46514,-1.68698 -0.68212,-1.10369 -0.68212,-1.1037 -1.83505,0.58243 -1.83506,0.58242 1.12227,-3.65668 1.12227,-3.65669 -1.95306,-1.35095 c -1.07417,-0.74303 -2.50308,-1.8224 -3.17534,-2.39861 l -1.22229,-1.04765 0.56851,-2.84254 0.56851,-2.84255 -1.63935,-0.62907 -1.63934,-0.62908 1.11252,-2.07876 1.11252,-2.07875 -1.2028,-1.44929 -1.20279,-1.44927 -1.6166,0.2632 -1.6166,0.2632 -0.3268,-2.85749 -0.32679,-2.8575 1.2765,-3.1425 1.27649,-3.14251 1.86342,-1.35091 c 1.02488,-0.74301 2.28394,-2.31801 2.79791,-3.5 0.51397,-1.182 1.49479,-2.93503 2.17959,-3.89563 l 1.24509,-1.74655 -1.2427,-1.98989 c -0.68349,-1.09443 -1.24271,-2.79153 -1.24271,-3.77132 l 0,-1.78143 -2.64373,-3.89059 -2.64372,-3.8906 3.38722,-2.76451 3.38722,-2.76451 4.17349,-0.62585 4.17348,-0.62586 1.60607,-2.45117 1.60608,-2.45118 1.47694,0 1.47695,0 0,-1.54384 0,-1.54383 1.74093,0.29383 1.74094,0.29384 1.00906,-2.34203 1.00907,-2.34203 4.41126,0.48737 4.41126,0.48737 4.58874,-1.92695 4.58874,-1.92696 2.22053,-2.69785 2.22054,-2.69785 1.20234,1.20234 1.20234,1.20234 -1.20379,2.64203 -1.20379,2.64204 0.5983,1.88509 0.5983,1.88509 1.39215,0 1.39214,0 2.54047,-2.73978 2.54047,-2.73978 0,-1.76022 0,-1.76022 0.92327,0 c 0.50781,0 2.31626,1.17212 4.0188,2.60471 l 3.09552,2.6047 5.7312,0.14659 5.73121,0.14659 -0.10014,1.49871 c -0.0551,0.82428 -0.42682,2.52355 -0.8261,3.77614 l -0.72596,2.27745 4.97225,4.72255 4.97225,4.72256 0.63793,2.80988 0.63793,2.80987 -0.65357,3.48383 -0.65357,3.48383 -4.787,2.42575 -4.78699,2.42576 -0.38893,1.16678 -0.38893,1.16678 -2.03463,-1.27065 -2.03464,-1.27065 -2.44137,1.59965 -2.44137,1.59965 -1.32123,4.47471 -1.32122,4.47471 0.65922,3.0014 0.65922,3.0014 -1.06552,1.99092 -1.06551,1.99093 -2.25106,0.68601 c -1.23808,0.3773 -3.03856,1.37752 -4.00106,2.22271 l -1.75,1.5367 0,2.91076 0,2.91075 1.0797,2.01745 1.07971,2.01744 -1.69823,1.87652 -1.69822,1.87652 0.61836,2.46376 0.61836,2.46375 -2.44314,2.90351 -2.44314,2.90351 -1.24818,6.92303 -1.24819,6.92303 -1.04473,0.70501 -1.04474,0.70501 1.11444,2.95248 1.11444,2.95249 -1.47584,1.47584 -1.47584,1.47584 1.1328,2.11667 1.13281,2.11666 -1.13089,0 c -0.622,0 -2.38172,-0.73888 -3.9105,-1.64195 l -2.7796,-1.64195 -9.65639,4.14195 c -5.31102,2.27807 -9.81203,4.14195 -10.00225,4.14195 -0.19022,0 -0.8501,-0.60758 -1.46639,-1.35017 z").attr(o);
    b = 760;
    k = 600;
    j = "\u6c5f\u897f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 801.91724,695.29273 c -1.65781,-1.09682 -4.38953,-6.83906 -4.38953,-9.22707 l 0,-2.0917 -3.25,-4.44683 -3.25,-4.44682 -2.01026,0.21349 -2.01025,0.21349 -2.46225,-1.72462 -2.46225,-1.72463 -2.0275,-0.0136 c -1.11512,-0.008 -3.02509,-0.2811 -4.24437,-0.60798 l -2.21688,-0.59431 -0.63246,-1.99269 -0.63245,-1.9927 1.09933,-1.09933 1.09934,-1.09934 0.0151,-3.55 0.015,-3.55 1.24971,-3.5862 c 0.68735,-1.97241 2.03057,-4.36705 2.98495,-5.32143 1.83775,-1.83775 2.07244,-2.69235 1.7638,-6.42289 l -0.1928,-2.33052 1.66182,-1.83629 1.66182,-1.8363 -1.07971,-2.01744 -1.0797,-2.01745 0,-2.94442 0,-2.94442 3.03389,-1.25668 3.0339,-1.25668 1.93407,-2.45878 1.93407,-2.45877 -0.59896,-4.36992 -0.59897,-4.36992 1.65776,-3.49347 c 0.91177,-1.9214 2.13863,-3.79065 2.72635,-4.15389 l 1.0686,-0.66043 2.49366,1.33457 2.49367,1.33457 0.96718,-1.72825 0.96718,-1.72826 4.9438,-2.50521 4.9438,-2.50521 0,-2.48316 0,-2.48315 3,0 3,0 0,2.8 0,2.8 1.22961,1.22961 c 0.67628,0.67628 1.96925,3.12878 2.87326,5.45 l 1.64366,4.22039 3.38862,0.29617 3.38861,0.29617 2.13609,-1.99007 c 1.17484,-1.09453 2.38088,-2.57781 2.68007,-3.29617 l 0.544,-1.3061 1.17088,1.86284 c 0.64398,1.02456 1.99256,2.68452 2.99685,3.68881 l 1.82598,1.82598 4.08645,-1.97436 4.08646,-1.97437 1.72473,1.00514 1.72473,1.00514 -1.30902,0.0304 -1.30901,0.0304 0.56617,0.91608 0.56617,0.91609 -1.02702,2.70126 -1.02702,2.70126 -3.10269,2.89835 -3.10269,2.89835 -1.59119,-0.2657 -1.5912,-0.26569 -0.39159,1.91624 -0.39159,1.91624 2.27532,1.71628 2.27532,1.71628 -1.26467,3.0532 -1.26468,3.0532 0.95962,4.49936 0.95962,4.49935 -1.0378,1.0378 -1.0378,1.0378 1.15144,2.52712 1.15143,2.52713 -1.27856,0 c -0.70321,0 -1.84885,-0.5625 -2.54588,-1.25 l -1.26732,-1.25 -1.43268,1.94113 c -1.6771,2.27229 -1.83955,4.18938 -0.42888,5.06122 l 1.0038,0.62038 -3.03472,2.55354 -3.03471,2.55355 0.60174,1.89592 0.60174,1.89593 -3.10009,0.62002 -3.1001,0.62002 1.46403,2.23439 1.46402,2.23439 -1.13475,1.13475 -1.13476,1.13476 -2.05,0.0182 -2.05,0.0182 -4.1229,2.79538 -4.1229,2.79538 1.33845,1.83043 1.33844,1.83044 -2.03364,2.85599 -2.03364,2.85598 -1.4319,0 -1.43191,0 0,1.96861 0,1.96862 -1.5,-0.5756 -1.5,-0.57561 0,1.59556 0,1.59556 -1.72224,2.01143 c -1.82197,2.1279 -3.07328,2.44689 -4.88823,1.24612 z").attr(o);
    b = 810;
    k = 640;
    j = "\u798f\u5efa";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 662.17753,787.44642 -0.59777,-0.59776 0.50342,-1.31189 0.50342,-1.3119 -2.07232,-0.65773 -2.07232,-0.65773 0,-2.96399 0,-2.964 -1.58509,-0.60826 -1.5851,-0.60825 0.66906,-3.61036 0.66906,-3.61036 1.91603,-3.11803 c 1.05382,-1.71492 1.91604,-3.40242 1.91604,-3.75 l 0,-0.63197 -2.5,0 -2.5,0 0,-1 c 0,-0.55 0.43844,-1 0.97432,-1 l 0.97432,0 1.55136,-3 1.55136,-3 2.39253,0 c 1.3159,0 3.0961,-0.26998 3.95601,-0.59996 l 1.56347,-0.59996 -1.02793,-1.92071 -1.02793,-1.9207 0.60526,-0.97934 0.60526,-0.97933 1.786,0 1.78599,0 1.70356,-1.88241 1.70355,-1.8824 -0.6532,-2.60256 -0.6532,-2.60257 2.85463,-1.07312 2.85464,-1.07312 4.29092,-4.19028 4.29093,-4.19028 -0.61848,-5.00163 -0.61847,-5.00163 1.12049,-2.5 c 1.78414,-3.98072 3.3666,-6.37038 5.84976,-8.83367 l 2.31514,-2.29662 -0.6096,-2.77552 -0.60961,-2.77551 1.58892,-1.31868 1.58892,-1.31868 -0.64981,-3.09066 c -0.3574,-1.69986 -1.05241,-3.51816 -1.54446,-4.04066 -0.49206,-0.5225 -0.89465,-1.31 -0.89465,-1.75 l 0,-0.8 1.44098,0 1.44099,0 0.74912,-1.2121 0.74912,-1.2121 -0.21271,-3.15838 -0.21271,-3.15838 3.10144,-0.62029 3.10143,-0.62028 3.29027,2.50961 3.29027,2.50961 1.52716,-0.58603 1.52717,-0.58602 0.44684,-2.33749 0.44684,-2.33748 -0.99128,-1.77132 -0.99128,-1.77132 2.82786,-2.25486 2.82787,-2.25486 2.04282,1.43085 2.04281,1.43084 3.05499,0 3.05499,0 2.12103,-1.48563 2.12103,-1.48563 0.57009,1.48563 0.57009,1.48563 1.90926,0 c 1.05009,0 3.49458,-0.66239 5.4322,-1.47198 l 3.52293,-1.47197 1.18528,1.42817 1.18528,1.42817 -0.77488,1.29381 c -0.42619,0.71159 -1.58993,1.88182 -2.58609,2.6005 l -1.81121,1.30671 0,1.30844 c 0,0.71964 -0.90549,2.45957 -2.01219,3.86652 l -2.01219,2.55808 2.77943,1.97913 2.77944,1.97913 8.48275,-3.48535 c 4.66552,-1.91694 9.41013,-3.70919 10.54358,-3.98277 l 2.06082,-0.49742 1.31162,1.58042 1.31163,1.58041 2.5084,0 2.50839,0 -0.56065,-3.45489 -0.56065,-3.45489 1.67981,-0.4109 c 0.9239,-0.22599 3.1488,-0.31864 4.94423,-0.20588 l 3.26442,0.20502 2.33012,2.18904 2.33013,2.18904 1.6362,-0.62787 1.63621,-0.62787 2.76925,3.29034 2.76925,3.29035 1.04748,4.12047 c 0.57611,2.26625 1.93163,5.44292 3.01226,7.05925 l 1.96479,2.93879 -0.0153,1.9529 -0.0153,1.9529 -4.26258,1.0471 -4.26257,1.0471 1.76557,1.16791 1.76558,1.16791 -2.25,1.63879 -2.25,1.6388 -0.005,1.69329 -0.005,1.6933 -6.97583,3.29546 -6.97582,3.29547 -1.88773,-1.01028 -1.88772,-1.01028 -0.63149,0.63148 c -0.34717,0.34732 -0.63134,1.68148 -0.63134,2.96482 l 0,2.33333 -0.89301,0 c -0.49116,0 -1.15203,-0.675 -1.46862,-1.5 l -0.5756,-1.5 -2.34429,0 -2.3443,0 -2.87418,3 c -3.403,3.55196 -4.08794,3.68373 -4.80931,0.92518 l -0.54258,-2.07481 -2.07405,1.11 -2.07406,1.11 0,1.35541 0,1.35541 -3.25,0.58022 c -1.7875,0.31912 -4.88203,0.86111 -6.87674,1.20442 l -3.62675,0.6242 -1.38543,-1.84501 c -0.76199,-1.01476 -2.43628,-2.4387 -3.72064,-3.16431 l -2.3352,-1.31929 -0.5466,0.5466 -0.54659,0.5466 1.48145,6.06412 1.48146,6.06411 -0.92461,0.57144 -0.92462,0.57144 -1.11286,-1.11286 c -0.61208,-0.61208 -1.41047,-1.11287 -1.7742,-1.11287 l -0.66133,0 0.44174,2.31082 0.44175,2.31082 -1.51068,1.25374 -1.51067,1.25375 -1.11992,-2.09257 -1.11991,-2.09258 -0.94982,0.58703 -0.94983,0.58702 0,3.44099 0,3.44098 -1.53518,0 c -0.84435,0 -2.62232,0.71232 -3.95104,1.58293 l -2.41585,1.58293 -2.04897,-0.65032 -2.04896,-0.65032 0,1.06739 0,1.06739 -2.87788,0 -2.87787,0 -3.37213,1.42778 -3.37212,1.42777 -1.25847,2.07223 -1.25848,2.07222 -2.43251,0 -2.43251,0 -0.61803,1 -0.61803,1 -2.25316,0 -2.25315,0 -3.94996,1.90841 c -2.17247,1.04963 -4.80174,2.84963 -5.84281,4 -1.04108,1.15037 -2.31615,2.09159 -2.83351,2.09159 -0.51735,0 -2.24761,0.93064 -3.84501,2.06809 l -2.90437,2.0681 0,1.44169 0,1.44169 2,1.71246 c 1.1,0.94185 2,2.14594 2,2.67576 0,0.52982 0.97401,2.0001 2.16447,3.26728 l 2.16447,2.30397 -1.81946,2.01048 -1.81946,2.01048 -3.17834,0 c -1.74809,0 -3.44734,-0.26899 -3.77611,-0.59777 z").attr(o);
    b = 720;
    k = 700;
    j = "\u5e7f\u4e1c";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 880.62126,721.30902 -0.004,-1.80902 -1.98156,-3.25 -1.98156,-3.25 -2.06245,0 -2.06245,0 -2.35384,-2.53984 -2.35384,-2.53983 -0.6649,-2.64917 c -0.36569,-1.45704 -1.53498,-3.87108 -2.59841,-5.36454 l -1.93351,-2.71536 0.0326,-4.84563 0.0326,-4.84563 2.02518,-5.5 c 1.11385,-3.025 2.859,-7.975 3.87811,-11 1.01911,-3.025 2.56531,-6.85 3.43601,-8.5 0.8707,-1.65 1.58586,-3.70906 1.58925,-4.57569 l 0.006,-1.57568 2.25,-2.05938 c 1.2375,-1.13266 3.23954,-2.35914 4.44897,-2.72551 l 2.19897,-0.66612 -0.51714,-1.34766 -0.51715,-1.34766 1.11198,-0.68724 1.11198,-0.68724 1.2062,0.9482 c 0.6634,0.52151 2.44369,1.24383 3.95619,1.60514 l 2.75,0.65694 -0.0153,1.23095 c -0.008,0.67702 -0.42557,1.87934 -0.92698,2.67182 l -0.91167,1.44086 1.49575,2.89247 1.49576,2.89247 -1.06878,3.06589 -1.06877,3.06589 -0.008,6.10077 c -0.005,3.35543 -0.45972,10.15078 -1.01156,15.10078 l -1.00336,9 -3.11996,6.21435 -3.11996,6.21436 0.13505,5.97444 0.13505,5.97445 -1.00353,0.62022 -1.00353,0.62021 -0.004,-1.80901 z").attr(o);
    b = 890;
    k = 700;
    j = "\u53f0\u6e7e";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 654.96346,835.90795 -0.56001,-0.90612 -3.81387,0 -3.81386,0 -4.51309,-1.99635 -4.51308,-1.99635 -0.69729,-3.25365 c -0.38352,-1.78951 -0.92326,-5.81049 -1.19943,-8.93552 l -0.50212,-5.68188 4.23542,-3.06812 c 2.32949,-1.68747 4.82708,-3.06813 5.5502,-3.06813 l 1.31478,0 1.07037,-2 1.07037,-2 -1.53519,0 -1.53518,0 0,-0.93261 0,-0.93261 1.89644,-0.60191 c 1.04304,-0.33105 2.28054,-0.53309 2.75,-0.44897 0.46946,0.0841 1.41606,0.0996 2.10356,0.0345 l 1.25,-0.11842 0,-1.61354 0,-1.61355 4.27186,0.64061 4.27186,0.6406 1.97814,-1.49526 1.97814,-1.49525 2.73927,-0.0318 2.73928,-0.0318 4.8146,-1.8294 4.8146,-1.82941 1.19224,5.01908 1.19225,5.01909 -1.87915,2.06032 c -1.03353,1.13318 -2.69159,3.63532 -3.68458,5.56032 l -1.80544,3.5 -1.10829,6 -1.10829,6 -2.13032,0.30999 -2.13031,0.31 -2.62382,3.44 -2.62382,3.44001 -2.44911,0 -2.44911,0 0,1.88337 0,1.88337 -1.999,0.52275 -1.99901,0.52275 -0.56001,-0.90612 z").attr(o);
    b = 690;
    k = 820;
    j = "\u6d77\u5357";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 739.70709,734.60312 0,-2.35479 1.2,-1.2 1.2,-1.2 3.86336,0 3.86336,0 -0.31336,3.25 -0.31336,3.25 -4.75,0.30479 -4.75,0.30479 0,-2.35479 z").attr(o);
    b = 760;
    k = 740;
    j = "\u9999\u6e2f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 856.9375,526.9375 -0.61803,-1 -1.70044,0 -1.70044,0 -1.32265,-2.1179 -1.32264,-2.1179 1.0821,-1.0821 c 0.59515,-0.59515 1.0821,-1.87093 1.0821,-2.83505 0,-0.96412 0.50661,-2.86484 1.12581,-4.22382 l 1.12581,-2.47088 3.62419,1.63431 c 1.9933,0.89887 4.41169,2.28434 5.37419,3.07881 l 1.75,1.44451 0,2.24142 0,2.24142 -3.5348,3.10359 c -3.9324,3.4527 -4.09011,3.51951 -4.9652,2.10359 z").attr(o);
    b = 880;
    k = 520;
    j = "\u4e0a\u6d77";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 726.23854,349.25647 c -0.6938,-0.23693 -1.71663,-1.28128 -2.27296,-2.32079 l -1.0115,-1.89001 1.47193,-3.52283 1.47194,-3.52284 1.01584,0 1.01584,0 1.12783,-2.10736 1.12782,-2.10736 -1.09264,-1.09264 C 728.49169,332.09169 728,331.06203 728,330.4045 l 0,-1.19549 3.97243,-1.96541 3.97244,-1.9654 -0.55346,-0.55345 -0.55345,-0.55346 1.23072,-2.33564 c 0.6769,-1.28461 1.72312,-2.65504 2.32493,-3.04541 l 1.09421,-0.70976 3.13688,3.04039 3.13689,3.04039 3.64096,-0.57865 3.64095,-0.57864 -1.63676,2.49802 -1.63676,2.49801 1.64474,2.51019 1.64474,2.51019 -1.02973,1.92407 -1.02973,1.92407 0,4.06574 0,4.06574 -1.94098,0 -1.94099,0 -0.61803,1 -0.61803,1 -1.86956,0 -1.86955,0 -1.32143,1.25 -1.32143,1.25 -6,0.0936 c -3.3,0.0515 -6.56766,-0.10023 -7.26146,-0.33715 z").attr(o);
    b = 740;
    k = 315;
    j = "\u5317\u4eac";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 755.9375,367 c -1.1,-0.47269 -3.1824,-0.89106 -4.62756,-0.92972 L 748.68239,366 l -1.24414,-1.4991 -1.24414,-1.49909 1.21255,-2.92735 1.21255,-2.92735 -0.86922,-1.55321 -0.86922,-1.55321 0.38272,-4.0132 0.38272,-4.01321 2.39564,0.60127 2.39565,0.60127 0,-5.02662 c 0,-2.76465 0.27314,-5.73843 0.60699,-6.60841 L 753.65148,334 l 1.97246,0 1.97247,0 -0.6527,2.97172 -0.6527,2.97171 1.78885,3.02829 1.78885,3.02828 1.24921,0 1.24921,0 1.07037,2 1.07037,2 1.46481,0 1.46482,0 0,1.46552 0,1.46552 -3,3.06896 -3,3.06896 0,3.85853 0,3.85853 -1.58179,0.60699 c -0.86998,0.33384 -1.65748,0.57536 -1.75,0.5367 -0.0925,-0.0387 -1.06821,-0.45702 -2.16821,-0.92971 z").attr(o);
    b = 765;
    k = 350;
    j = "\u5929\u6d25";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 821.5625,353.07143 c 0,-1.02303 2.12342,-3.32987 4.87781,-5.29915 l 1.7795,-1.27228 1.17135,-3.39922 c 0.64423,-1.86958 1.17134,-3.76795 1.17134,-4.21862 l 0,-0.81939 -1.56746,0.60149 -1.56746,0.60149 -2.29835,-1.23004 -2.29835,-1.23004 1.16868,-3.95809 1.16869,-3.95809 2.51682,-2.19474 2.51682,-2.19475 2.28479,-5.77141 2.28479,-5.77141 -4.35449,-3.98589 -4.35448,-3.98589 -2.5,0.44577 c -5.62672,1.0033 -10.723,2.2796 -11.82706,2.96195 l -1.17294,0.72491 0,1.44965 0,1.44964 -3,4.14138 -3,4.14138 -0.0213,2.09996 -0.0213,2.09996 -3.97428,2.81172 -3.97428,2.81171 -1.00437,-0.62073 c -0.55241,-0.3414 -1.00437,-1.04418 -1.00437,-1.56172 0,-0.51754 -0.9,-1.84098 -2,-2.94098 l -2,-2 0,-1.5 0,-1.5 -2.42857,0 -2.42857,0 -1.40919,-1.40919 -1.40919,-1.40919 -2.41224,-0.34081 -2.41224,-0.34081 0.31517,-2.92429 0.31517,-2.92429 2.43483,-4.36119 c 2.65665,-4.75852 2.92838,-6.41461 1.48551,-9.0538 -0.52213,-0.95504 -1.41649,-4.64457 -1.98747,-8.19896 l -1.03814,-6.46254 0.86957,-0.86956 0.86956,-0.86957 2.32218,1.3321 c 2.87381,1.64854 5.489,4.48194 7.45967,8.0821 l 1.50531,2.75 0.97432,0 0.97432,0 0.0541,-1.25 c 0.0298,-0.6875 1.72039,-3.70906 3.75697,-6.71457 l 3.70287,-5.46457 3.00869,-0.86288 3.00869,-0.86288 2.27852,-3.47592 2.27852,-3.47591 2.00381,0.63598 2.00381,0.63599 1.45202,-1.20507 1.45201,-1.20506 0,-1.87755 0,-1.87756 1.25,-0.14157 c 0.6875,-0.0779 2.375,-0.19036 3.75,-0.25 l 2.5,-0.10843 -0.0794,-2.25 -0.0794,-2.25 1.0794,0.0153 c 0.59367,0.008 1.71375,0.41688 2.48906,0.90769 l 1.40965,0.89237 3.34035,-1.5929 3.34034,-1.5929 0,-1.28145 0,-1.28145 3.5,-3.5 3.5,-3.5 0,-3.14033 0,-3.14032 1.75,0.73559 c 0.9625,0.40457 2.73557,0.95003 3.94016,1.21212 l 2.19016,0.47655 1.4566,1.64486 c 0.80113,0.90467 1.61556,2.50757 1.80984,3.56199 l 0.35324,1.91714 1.22009,0.40623 1.22008,0.40622 1.86684,-3.06977 1.86684,-3.06977 0.66307,0.66308 c 0.3647,0.36469 0.66523,1.37557 0.66786,2.24641 l 0.005,1.58333 3.24523,3.64852 c 1.78487,2.00668 4.67409,5.30206 6.42049,7.32305 l 3.17528,3.67455 -0.52323,3.22427 -0.52323,3.22426 5.34796,5.78482 5.34795,5.78482 0.10295,4.99663 0.10296,4.99664 -2.97159,2.17122 c -1.63437,1.19417 -5.3932,5.25473 -8.35296,9.02346 l -5.38136,6.85223 0,1.89777 0,1.89776 -2,2 -2,2 -2.34272,0 -2.34271,0 -4.40729,2.48327 c -2.424,1.3658 -5.30728,2.89304 -6.40728,3.39387 -1.1,0.50083 -4.7,3.64349 -8,6.9837 -20.99446,21.25027 -21.5,21.70198 -21.5,19.21059 z").attr(o);
    b = 850;
    k = 280;
    j = "\u8fbd\u5b81";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("m 888.5,287.60317 0,-4.33433 -5.07471,-4.80474 -5.07471,-4.80473 0.66855,-4.86094 0.66855,-4.86093 -1.55074,0 -1.55074,0 -5.43401,-6.75 -5.43402,-6.75 -0.35908,-1.91713 -0.35909,-1.91714 -1.24889,-0.41583 -1.2489,-0.41583 -1.7511,3.07664 c -0.96311,1.69216 -2.08861,3.07949 -2.50111,3.08297 l -0.75,0.006 -0.0318,-1.75 c -0.0175,-0.9625 -0.57999,-2.44374 -1.25,-3.29165 L 855,245.35419 l -4.78279,-1.80357 -4.78279,-1.80358 -1.34046,1.11248 -1.34046,1.11249 -1.61964,-0.62151 -1.61963,-0.62152 0.58367,-2.32551 0.58366,-2.32552 -3.18077,-5.82022 c -1.74943,-3.20113 -3.81528,-6.53066 -4.59079,-7.39897 -0.7755,-0.86831 -1.41,-2.10581 -1.41,-2.75 l 0,-1.17126 -0.96662,0 c -0.53164,0 -3.27843,2.05321 -6.10397,4.56269 l -5.13735,4.5627 -0.64603,-0.64603 c -0.35532,-0.35531 -0.70228,-1.05853 -0.77103,-1.56269 -0.0688,-0.50417 -0.18125,-1.34914 -0.25,-1.87772 -0.0688,-0.52857 -1.06303,-1.83495 -2.20952,-2.90306 l -2.08452,-1.94203 -0.95628,-4.25612 -0.95629,-4.25613 1.0408,-1.0408 1.04081,-1.04081 0,-2.44898 0,-2.44898 -3.45043,-3.35102 -3.45044,-3.35102 -1.61695,0 -1.61696,0 0.69162,-2.25 c 0.96823,-3.14988 1.01775,-3.16885 4.50345,-1.72503 l 3.12443,1.29418 0.71661,-1.1595 0.71661,-1.1595 1.94103,1.46812 c 1.06757,0.80747 2.50353,1.48243 3.19103,1.49993 l 1.25,0.0318 0,-3.94848 0,-3.94848 2.30607,-2.48829 2.30607,-2.48829 4.69738,-1.18281 4.69738,-1.18282 1.48554,1.23289 1.48554,1.23289 -0.52986,0.85733 -0.52985,0.85732 1.50495,2.91026 c 1.71542,3.31726 6.57989,7.6973 9.62035,8.66231 l 2.05436,0.65203 2.20103,-1.42412 2.20104,-1.42412 3.66178,0.4403 3.66177,0.44029 1.12341,-2.0991 1.12341,-2.09911 1.46481,0 1.46482,0 0,1.93261 0,1.93261 1.75,0.49273 c 0.9625,0.27101 3.12733,0.76838 4.81073,1.10528 l 3.06073,0.61254 1.87854,-2.07577 1.87854,-2.07577 3.06073,0.64918 3.06073,0.64918 1.73383,1.52905 1.73382,1.52906 -0.54047,2.1534 -0.54047,2.1534 1.97346,1.78596 1.97346,1.78595 2.16883,-1.16073 2.16883,-1.16072 0.5019,0.5019 c 0.27605,0.27604 1.25,1.96801 2.16435,3.75993 l 1.66246,3.25804 2.78603,2.04324 2.78604,2.04324 1.71396,-1.09887 1.71397,-1.09887 -0.1208,-2.37328 c -0.0664,-1.30531 -0.46019,-3.83579 -0.875,-5.62329 l -0.7542,-3.25 1.58982,0 1.58981,0 1.03519,1.93426 c 0.56935,1.06384 1.03518,2.80315 1.03518,3.86514 l 0,1.93088 2.07258,2.63486 2.07258,2.63486 1.67742,0.0385 1.67742,0.0385 2.05757,3.21148 2.05756,3.21148 2.42118,-0.27874 c 3.06571,-0.35294 4.19987,-1.49224 4.34703,-4.36672 L 931,214.51326 l 3,-1.53788 c 2.98089,-1.52809 4.14386,-2.62273 4.82112,-4.53788 l 0.35364,-1 1.705,1.40762 1.705,1.40762 1.15762,-1.15762 c 1.68386,-1.68386 2.30267,-1.45155 3.57567,1.34238 l 1.13907,2.5 1.79893,0 1.79894,0 2.28047,1.59731 2.28048,1.59731 2.9741,-1.23191 c 1.63575,-0.67755 3.14548,-1.05884 3.35495,-0.84731 0.20947,0.21153 -0.14246,2.91181 -0.78207,6.00063 L 961,225.66956 l -3.25,2.72286 -3.25,2.72287 0,1.4111 0,1.41111 -0.88499,0 c -0.48674,0 -1.62212,-1.125 -2.52305,-2.5 l -1.63807,-2.5 -2.97694,0 -2.97695,0 0,6.875 0,6.875 -2.8795,0.5759 -2.8795,0.5759 -0.66252,3.53157 -0.66253,3.53158 -4.20798,2.41948 c -2.31438,1.33072 -5.62471,2.71431 -7.35628,3.07465 l -3.1483,0.65516 -0.52255,1.99823 -0.52255,1.99822 2.94262,3.35146 2.94262,3.35146 -1.44669,1.44669 -1.44669,1.44669 -5.73438,0.67396 -5.73439,0.67397 -3.59077,-2.37626 -3.59076,-2.37625 -3.23682,2.09879 -3.23682,2.0988 -0.0131,3.81727 -0.0131,3.81727 -3.75,6.41358 -3.75,6.41357 -1.25,0.0191 -1.25,0.0192 0,-4.33433 z").attr(o);
    b = 890;
    k = 230;
    j = "\u5409\u6797";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    p = f[Math.round(Math.random() * 9321321) % f.length];
    o.fill = p;
    l = c.path("M 923.13662,217.74712 C 922.11175,216.23621 919.8766,214.1 918.16961,213 l -3.10363,-2 -1.35744,-4.80781 -1.35744,-4.8078 -3.17555,0.3078 L 906,202 l 0.1208,2.5 c 0.0664,1.375 0.46019,3.9625 0.875,5.75 l 0.7542,3.25 -1.43791,0 -1.43791,0 -2.68709,-2.80472 -2.68709,-2.80472 0,-1.6601 0,-1.66009 -1.97697,-1.05804 -1.97697,-1.05804 -2.05354,1.27285 -2.05355,1.27286 -0.95898,-1.5 -0.95898,-1.5 0.47822,-1.3024 0.47821,-1.30239 -1.45396,-2.21903 -1.45396,-2.21902 -4.69731,-1.38695 -4.69731,-1.38695 -1.74774,2.15837 -1.74775,2.15837 -2.15544,0 c -1.1855,0 -3.02587,-0.46583 -4.08971,-1.03518 l -1.93426,-1.03519 0,-1.4058 c 0,-0.77319 -0.49278,-1.71035 -1.09507,-2.08258 l -1.09507,-0.67679 -2.98417,2.20629 -2.98417,2.20629 -2.46033,-0.6175 -2.46034,-0.61751 -2.18293,1.52899 c -1.20061,0.84094 -2.87031,1.52683 -3.71043,1.5242 l -1.52749,-0.005 -3.68061,-3.38067 -3.68061,-3.38067 -1.10523,-4.10449 -1.10522,-4.10449 -2.37102,-0.59509 -2.37103,-0.59509 -1.84314,0.98188 c -1.01373,0.54003 -3.61594,1.14079 -5.78269,1.33503 l -3.93955,0.35315 -0.0144,-3 -0.0144,-3 2.45396,-0.34582 c 1.34968,-0.1902 3.01646,-0.8078 3.70396,-1.37244 l 1.25,-1.02641 0,-2.37755 0,-2.37756 -0.94098,0 c -0.51754,0 -1.2191,0.45 -1.55902,1 l -0.61803,1 -2.34932,0 -2.34931,0 -5.59167,-4.55494 -5.59167,-4.55494 0,-2.37811 0,-2.37811 4.5,-3.68741 4.5,-3.68741 0,-1.7571 0,-1.75709 1.46717,-1.21765 c 0.80695,-0.6697 3.07897,-4.0998 5.04895,-7.62244 l 3.58176,-6.4048 0.88367,0 c 0.48602,0 1.15049,0.84065 1.47659,1.86812 0.32611,1.02746 1.44068,2.63532 2.47682,3.57302 l 1.88391,1.70491 0.59957,-1.88907 0.59956,-1.88907 -0.98703,-5.20463 -0.98704,-5.20463 0.62501,-4.55995 0.62501,-4.55996 2.29923,-0.87417 2.29923,-0.87416 0.64545,-3.44051 0.64544,-3.44051 -1.55587,-2.37456 -1.55586,-2.37455 -0.65768,-5.595789 -0.65767,-5.595791 1.12189,-0.693367 1.12189,-0.693367 0,-2.218477 0,-2.218477 1.59976,-2.283976 1.59976,-2.283976 -0.63045,-3.360549 -0.63044,-3.36055 1.03069,-0.636997 1.03068,-0.636998 0,-2.965734 0,-2.965734 -2.31188,-0.878974 -2.31187,-0.878974 -3.21687,-3.66381 -3.21687,-3.663811 -3.28034,-0.532325 -3.28034,-0.532326 -1.61047,4.099861 -1.61047,4.099861 -2.02143,0 -2.02143,0 -0.6476,1.04785 -0.64761,1.04785 -1.66141,-0.204159 c -0.91378,-0.112288 -2.89891,0.305042 -4.41141,0.927399 l -2.75,1.131558 0,0.871905 0,0.871904 -4.65986,-0.157347 -4.65986,-0.157347 -2.84014,-3.402032 -2.84014,-3.402033 0,-2.728757 0,-2.728757 -1,-0.618034 -1,-0.618034 0,-2.965734 0,-2.965734 -2.2911,-0.871073 c -1.2601,-0.479091 -2.8902,-1.592953 -3.62244,-2.475249 L 783.25511,45.5 l -1.65832,0 -1.65831,0 -1.1981,3.17412 -1.1981,3.17412 -1.77114,-1.509425 c -0.97413,-0.830184 -3.24621,-2.09334 -5.04908,-2.807012 l -3.27793,-1.297587 1.72253,-2.617108 c 0.9474,-1.439409 2.36374,-3.896336 3.14744,-5.459837 l 1.4249,-2.842729 -2.1195,-2.866778 C 770.45378,30.871035 769.5,29.346909 769.5,29.060816 c 0,-1.083296 7.71095,-4.359114 12.79997,-5.437769 2.91499,-0.617853 6.63872,-1.815664 8.27498,-2.661803 l 2.975,-1.538435 9.33434,2.890252 9.33434,2.890251 2.62364,-1.374659 2.62363,-1.374659 6.26705,3.147923 c 3.44688,1.731357 6.42631,3.569475 6.62095,4.084706 0.19465,0.515231 2.74733,3.38828 5.67263,6.384553 l 5.31872,5.447768 0.70332,3.240528 0.70332,3.240528 4.87405,6.141793 4.87406,6.141792 0,1.9 0,1.899999 4.52547,4.441417 4.52548,4.441417 0.60814,3.803117 0.60814,3.803117 1.7851,0.955357 1.78511,0.955357 0.68469,3.258317 0.68469,3.258317 3.09276,3.25 3.09275,3.25 3.05384,-0.0037 3.05383,-0.0037 3.28132,-2.000609 3.28131,-2.000609 3.92545,2.002611 3.92544,2.00261 2.43287,-1.108491 2.43287,-1.10849 6.99806,4.157468 6.99805,4.15747 2.5688,-0.64473 2.56879,-0.64472 0.67234,2.84748 0.67233,2.84749 2.60535,2.79913 2.60534,2.79913 -0.28748,2.74066 -0.28747,2.74065 4.11424,3.3063 4.11424,3.3063 2.68908,-1.01174 c 1.47899,-0.55645 4.26407,-1.28234 6.18907,-1.61309 1.925,-0.33075 5.76145,-1.53463 8.52545,-2.6753 l 5.02545,-2.07393 1.87425,-4.53151 1.87425,-4.53151 4.33702,-1.91846 4.33701,-1.91847 0.9963,-1.8616 c 0.54796,-1.02388 2.79719,-3.28793 4.99828,-5.031228 l 4.00199,-3.169633 2.015,0.639536 2.015,0.639536 0,3.038257 0,3.038252 2.49984,2.9709 2.49984,2.97089 -0.64078,2.67346 -0.64079,2.67347 -1.92763,1.85284 -1.92764,1.85285 0.57263,6.14716 c 0.81928,8.79501 0.83318,21.02956 0.0331,29.14715 l -0.68992,7 -1.49441,1.69485 -1.49442,1.69485 0.3623,4.55538 0.36231,4.55538 -3.27794,0.61495 -3.27794,0.61494 -6.46795,-0.41184 -6.46795,-0.41185 -2.14673,5.17936 -2.14673,5.17937 -2.85867,1.3673 -2.85868,1.36731 4.92903,8.61399 4.92902,8.61398 0.68237,6.03139 0.68238,6.03139 -1.91979,0.60931 -1.91979,0.60932 -4.19754,-2.02803 c -2.30865,-1.11541 -4.21185,-2.35503 -4.22934,-2.75469 -0.0175,-0.39966 -0.68534,-1.59038 -1.4841,-2.64604 l -1.45229,-1.91938 -1.91663,1.73452 -1.91663,1.73453 -0.65829,-1.06515 C 940.6782,206.97931 939.71902,206.5 938.90876,206.5 l -1.47321,0 -0.74633,2.01753 -0.74634,2.01754 -3.47144,1.73246 L 929,214 l 0,2 c 0,2.50134 -1.24897,4.50089 -2.80902,4.49712 l -1.19098,-0.003 -1.86338,-2.74713 z").attr(o);
    b = 890;
    k = 140;
    j = "\u9ed1\u9f99\u6c5f";
    d = c.text(b + 1, k + 1, j).attr(h);
    e = c.text(b, k, j).attr(m);
    a.push({
        path: l,
        label: e,
        shadow: d,
        left: b,
        top: k,
        text: j,
        color: p
    });
    var n = null;
    var g = null;
    for (var q = 0; q < a.length; q++) {
        var s = ((function(i) {
            return function() {
                if (n != null) {
                    n.path.attr({
                        "fill-opacity": 1
                    })
                }
                i.path.attr({
                    "fill-opacity": 0.5
                });
                n = i;
                if (g != null) {
                    clearTimeout(g)
                }
                g = setTimeout((function(u) {
                    return function() {
                        var C = u.left * r;
                        var B = u.top * r;
                        var z, E, A = 150,
                            D = 40;
                        E = B - 100;
                        if (C < $("#map_container").width() / 2) {
                            z = C + 50
                        } else {
                            z = C - 50 - A
                        }
                        var v = {
                            fill: "#4F9BD5",
                            "fill-opacity": 0.3,
                            stroke: "#999",
                            "stroke-width": 1,
                            "stroke-opacity": 0.3
                        };
                        if (self.triangle1) {
                            self.triangle1.remove()
                        }
                        if (self.triangle2) {
                            self.triangle2.remove()
                        }
                        if (self.triangle3) {
                            self.triangle3.remove()
                        }
                        self.triangle1 = c.path("M " + (z + A).toString(10) + "," + E.toString(10) + " L " + (z + A).toString(10) + "," + (E + D).toString(10) + " L " + C.toString(10) + "," + B.toString() + "Z").attr(v);
                        self.triangle2 = c.path("M " + z.toString(10) + "," + (E + D).toString(10) + " L " + (z + A).toString(10) + "," + (E + D).toString(10) + " L " + C.toString(10) + "," + B.toString() + "Z").attr(v);
                        self.triangle3 = c.path("M " + z.toString(10) + "," + E.toString(10) + " L " + z.toString(10) + "," + (E + D).toString(10) + " L " + C.toString(10) + "," + B.toString() + "Z").attr(v);
                        if (self.label != null) {
                            self.label.remove()
                        }
                        self.label = c.text((z + 25), (E + 10), u.text + ":").attr({
                            font: "14px Arial",
                            fill: "#000",
                            "text-align": "center"
                        });
                        if (self.tip == null) {
                            self.tip = c.rect(z, E, A, D).attr({
                                fill: "90-#FFFFFF:5-#EBEBEB:95",
                                stroke: "#CCC",
                                "stroke-width": 5,
                                "stroke-opacity": 0.5
                            })
                        } else {
                            self.tip.stop();
                            self.tip.animate({
                                x: z,
                                y: E
                            }, 0, null)
                        }
                        self.tip.toFront();
                        self.label.toFront();
                        c.safari()
                    }
                })(i), 0)
            }
        })(a[q]));
        a[q].label.mouseover(s);
        a[q].path.mouseover(s)
    }
    var r = 1;
    var t = function() {
        var v = $("#map_container").width() / 1000;
        if (v < 1) {
            for (var u = 0; u < a.length; u++) {
                a[u].path.transform("");
                a[u].path.scale(v, v, 0, 0);
                a[u].path.toBack();
                if (a[u].shadow != null) {
                    a[u].shadow.transform("");
                    a[u].shadow.translate(a[u].left * (v - 1), a[u].top * (v - 1))
                }
                if (a[u].label != null) {
                    a[u].label.transform("");
                    a[u].label.translate(a[u].left * (v - 1), a[u].top * (v - 1))
                }
            }
            r = v
        }
    };
    t();
    $(window).resize(t)
});