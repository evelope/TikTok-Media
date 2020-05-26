! function(e) {
    var t = {};

    function s(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, s), o.l = !0, o.exports
    }
    s.m = e, s.c = t, s.d = function(e, t, n) {
        s.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, s.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, s.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return s.d(t, "a", t), t
    }, s.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, s.p = "", s(s.s = 37)
}([function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(e, t, s) {
    (function(n) {
        var o;
        ! function(r) {
            "use strict";
            void 0 === (o = function(e) {
                var t, o = "undefined" != typeof setTimeout && setTimeout,
                    r = function(e, t) {
                        return setTimeout(e, t)
                    },
                    a = function(e) {
                        return clearTimeout(e)
                    },
                    i = function(e) {
                        return o(e, 0)
                    };
                if (void 0 !== n && "[object process]" === Object.prototype.toString.call(n)) i = function(e) {
                    return n.nextTick(e)
                };
                else if (t = "undefined" != typeof MutationObserver && MutationObserver || "undefined" != typeof WebKitMutationObserver && WebKitMutationObserver) i = function(e) {
                    var t, s = document.createTextNode("");
                    new e(function() {
                        var e = t;
                        t = void 0, e()
                    }).observe(s, {
                        characterData: !0
                    });
                    var n = 0;
                    return function(e) {
                        t = e, s.data = n ^= 1
                    }
                }(t);
                else if (!o) {
                    var u = s(30);
                    r = function(e, t) {
                        return u.setTimer(t, e)
                    }, a = u.cancelTimer, i = u.runOnLoop || u.runOnContext
                }
                return {
                    setTimer: r,
                    clearTimer: a,
                    asap: i
                }
            }.call(t, s, t, e)) || (e.exports = o)
        }(s(0))
    }).call(this, s(11))
}, function(e, t, s) {
    "use strict";
    t.__esModule = !0;
    var n = function() {
            function e(e, t) {
                for (var s = 0; s < t.length; s++) {
                    var n = t[s];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, s, n) {
                return s && e(t.prototype, s), n && e(t, n), t
            }
        }(),
        o = a(s(4)),
        r = a(s(5));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var i = "function" == typeof importScripts,
        u = !i && !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest),
        c = null;

    function l() {}
    var p = function() {
        function e(t, s, n) {
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), "string" != typeof t || "string" != typeof s) throw new Error("Both name and url are required for constructing a resource.");
            n = n || {}, this._flags = 0, this._setFlag(e.STATUS_FLAGS.DATA_URL, 0 === s.indexOf("data:")), this.name = t, this.url = s, this.extension = this._getExtension(), this.data = null, this.crossOrigin = !0 === n.crossOrigin ? "anonymous" : n.crossOrigin, this.loadType = n.loadType || this._determineLoadType(), this.xhrType = n.xhrType, this.metadata = n.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = e.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = l, this._onLoadBinding = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this), this.onStart = new r.default, this.onProgress = new r.default, this.onComplete = new r.default, this.onAfterMiddleware = new r.default
        }
        return e.setExtensionLoadType = function(t, s) {
            d(e._loadTypeMap, t, s)
        }, e.setExtensionXhrType = function(t, s) {
            d(e._xhrTypeMap, t, s)
        }, e.prototype.complete = function() {
            if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.isComplete) throw new Error("Complete called again for an already completed resource.");
            this._setFlag(e.STATUS_FLAGS.COMPLETE, !0), this._setFlag(e.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this)
        }, e.prototype.abort = function(t) {
            if (!this.error) {
                if (this.error = new Error(t), this.xhr) this.xhr.abort();
                else if (this.xdr) this.xdr.abort();
                else if (this.data)
                    if (this.data.src) this.data.src = e.EMPTY_GIF;
                    else
                        for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
                this.complete()
            }
        }, e.prototype.load = function(t) {
            var s = this;
            if (!this.isLoading)
                if (this.isComplete) t && setTimeout(function() {
                    return t(s)
                }, 1);
                else switch (t && this.onComplete.once(t), this._setFlag(e.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                    case e.LOAD_TYPE.IMAGE:
                        this.type = e.TYPE.IMAGE, this._loadElement("image");
                        break;
                    case e.LOAD_TYPE.AUDIO:
                        this.type = e.TYPE.AUDIO, this._loadSourceElement("audio");
                        break;
                    case e.LOAD_TYPE.VIDEO:
                        this.type = e.TYPE.VIDEO, this._loadSourceElement("video");
                        break;
                    case e.LOAD_TYPE.XHR:
                    default:
                        u && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                }
        }, e.prototype._hasFlag = function(e) {
            return !!(this._flags & e)
        }, e.prototype._setFlag = function(e, t) {
            this._flags = t ? this._flags | e : this._flags & ~e
        }, e.prototype._loadElement = function(e) {
            this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === e && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(e), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1)
        }, e.prototype._loadSourceElement = function(e) {
            if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === e && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(e), null !== this.data) {
                if (!this.metadata.skipSource)
                    if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                    else if (Array.isArray(this.url))
                    for (var t = this.metadata.mimeType, s = 0; s < this.url.length; ++s) this.data.appendChild(this._createSource(e, this.url[s], Array.isArray(t) ? t[s] : t));
                else {
                    var n = this.metadata.mimeType;
                    this.data.appendChild(this._createSource(e, this.url, Array.isArray(n) ? n[0] : n))
                }
                this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load()
            } else this.abort("Unsupported element: " + e)
        }, e.prototype._loadXhr = function() {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var t = this.xhr = new XMLHttpRequest;
            t.open("GET", this.url, !0), this.xhrType === e.XHR_RESPONSE_TYPE.JSON || this.xhrType === e.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = e.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType, t.addEventListener("error", this._boundXhrOnError, !1), t.addEventListener("abort", this._boundXhrOnAbort, !1), t.addEventListener("progress", this._boundOnProgress, !1), t.addEventListener("load", this._boundXhrOnLoad, !1), t.send()
        }, e.prototype._loadXdr = function() {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var e = this.xhr = new XDomainRequest;
            e.timeout = 5e3, e.onerror = this._boundXhrOnError, e.ontimeout = this._boundXdrOnTimeout, e.onprogress = this._boundOnProgress, e.onload = this._boundXhrOnLoad, e.open("GET", this.url, !0), setTimeout(function() {
                return e.send()
            }, 1)
        }, e.prototype._createSource = function(e, t, s) {
            s || (s = e + "/" + this._getExtension(t));
            var n = document.createElement("source");
            return n.src = t, n.type = s, n
        }, e.prototype._onError = function(e) {
            this.abort("Failed to load element using: " + e.target.nodeName)
        }, e.prototype._onProgress = function(e) {
            e && e.lengthComputable && this.onProgress.dispatch(this, e.loaded / e.total)
        }, e.prototype._xhrOnError = function() {
            var e = this.xhr;
            this.abort(h(e) + " Request failed. Status: " + e.status + ', text: "' + e.statusText + '"')
        }, e.prototype._xhrOnAbort = function() {
            this.abort(h(this.xhr) + " Request was aborted by the user.")
        }, e.prototype._xdrOnTimeout = function() {
            this.abort(h(this.xhr) + " Request timed out.")
        }, e.prototype._xhrOnLoad = function() {
            var t = this.xhr,
                s = "",
                n = void 0 === t.status ? 200 : t.status;
            if ("" !== t.responseType && "text" !== t.responseType && void 0 !== t.responseType || (s = t.responseText), 0 === n && (s.length > 0 || t.responseType === e.XHR_RESPONSE_TYPE.BUFFER) ? n = 200 : 1223 === n && (n = 204), 2 == (n / 100 | 0)) {
                if (this.xhrType === e.XHR_RESPONSE_TYPE.TEXT) this.data = s, this.type = e.TYPE.TEXT;
                else if (this.xhrType === e.XHR_RESPONSE_TYPE.JSON) try {
                    this.data = JSON.parse(s), this.type = e.TYPE.JSON
                } catch (e) {
                    return void this.abort("Error trying to parse loaded json: " + e)
                } else if (this.xhrType === e.XHR_RESPONSE_TYPE.DOCUMENT) try {
                    if (window.DOMParser) {
                        var o = new DOMParser;
                        this.data = o.parseFromString(s, "text/xml")
                    } else {
                        var r = document.createElement("div");
                        r.innerHTML = s, this.data = r
                    }
                    this.type = e.TYPE.XML
                } catch (e) {
                    return void this.abort("Error trying to parse loaded xml: " + e)
                } else this.data = t.response || s;
                this.complete()
            } else this.abort("[" + t.status + "] " + t.statusText + ": " + t.responseURL)
        }, e.prototype._determineCrossOrigin = function(e, t) {
            if (0 === e.indexOf("data:")) return "";
            t = t || location, c || i || (c = document.createElement("a")), i || (c.href = e);
            var s = !(e = (0, o.default)(i ? e : c.href, {
                    strictMode: !0
                })).port && "" === t.port || e.port === t.port,
                n = e.protocol ? e.protocol + ":" : "";
            return e.host === t.hostname && s && n === t.protocol ? "" : "anonymous"
        }, e.prototype._determineXhrType = function() {
            return e._xhrTypeMap[this.extension] || e.XHR_RESPONSE_TYPE.TEXT
        }, e.prototype._determineLoadType = function() {
            return e._loadTypeMap[this.extension] || e.LOAD_TYPE.XHR
        }, e.prototype._getExtension = function() {
            var e = this.url,
                t = "";
            if (this.isDataUrl) {
                var s = e.indexOf("/");
                t = e.substring(s + 1, e.indexOf(";", s))
            } else {
                var n = e.indexOf("?"),
                    o = e.indexOf("#"),
                    r = Math.min(n > -1 ? n : e.length, o > -1 ? o : e.length);
                t = (e = e.substring(0, r)).substring(e.lastIndexOf(".") + 1)
            }
            return t.toLowerCase()
        }, e.prototype._getMimeFromXhrType = function(t) {
            switch (t) {
                case e.XHR_RESPONSE_TYPE.BUFFER:
                    return "application/octet-binary";
                case e.XHR_RESPONSE_TYPE.BLOB:
                    return "application/blob";
                case e.XHR_RESPONSE_TYPE.DOCUMENT:
                    return "application/xml";
                case e.XHR_RESPONSE_TYPE.JSON:
                    return "application/json";
                case e.XHR_RESPONSE_TYPE.DEFAULT:
                case e.XHR_RESPONSE_TYPE.TEXT:
                default:
                    return "text/plain"
            }
        }, n(e, [{
            key: "isDataUrl",
            get: function() {
                return this._hasFlag(e.STATUS_FLAGS.DATA_URL)
            }
        }, {
            key: "isComplete",
            get: function() {
                return this._hasFlag(e.STATUS_FLAGS.COMPLETE)
            }
        }, {
            key: "isLoading",
            get: function() {
                return this._hasFlag(e.STATUS_FLAGS.LOADING)
            }
        }]), e
    }();

    function d(e, t, s) {
        t && 0 === t.indexOf(".") && (t = t.substring(1)), t && (e[t] = s)
    }

    function h(e) {
        return e.toString().replace("object ", "")
    }
    t.default = p, p.STATUS_FLAGS = {
        NONE: 0,
        DATA_URL: 1,
        COMPLETE: 2,
        LOADING: 4
    }, p.TYPE = {
        UNKNOWN: 0,
        JSON: 1,
        XML: 2,
        IMAGE: 3,
        AUDIO: 4,
        VIDEO: 5,
        TEXT: 6
    }, p.LOAD_TYPE = {
        XHR: 1,
        IMAGE: 2,
        AUDIO: 3,
        VIDEO: 4
    }, p.XHR_RESPONSE_TYPE = {
        DEFAULT: "text",
        BUFFER: "arraybuffer",
        BLOB: "blob",
        DOCUMENT: "document",
        JSON: "json",
        TEXT: "text"
    }, p._loadTypeMap = {
        gif: p.LOAD_TYPE.IMAGE,
        png: p.LOAD_TYPE.IMAGE,
        bmp: p.LOAD_TYPE.IMAGE,
        jpg: p.LOAD_TYPE.IMAGE,
        jpeg: p.LOAD_TYPE.IMAGE,
        tif: p.LOAD_TYPE.IMAGE,
        tiff: p.LOAD_TYPE.IMAGE,
        webp: p.LOAD_TYPE.IMAGE,
        tga: p.LOAD_TYPE.IMAGE,
        svg: p.LOAD_TYPE.IMAGE,
        "svg+xml": p.LOAD_TYPE.IMAGE,
        mp3: p.LOAD_TYPE.AUDIO,
        ogg: p.LOAD_TYPE.AUDIO,
        wav: p.LOAD_TYPE.AUDIO,
        mp4: p.LOAD_TYPE.VIDEO,
        webm: p.LOAD_TYPE.VIDEO
    }, p._xhrTypeMap = {
        xhtml: p.XHR_RESPONSE_TYPE.DOCUMENT,
        html: p.XHR_RESPONSE_TYPE.DOCUMENT,
        htm: p.XHR_RESPONSE_TYPE.DOCUMENT,
        xml: p.XHR_RESPONSE_TYPE.DOCUMENT,
        tmx: p.XHR_RESPONSE_TYPE.DOCUMENT,
        svg: p.XHR_RESPONSE_TYPE.DOCUMENT,
        tsx: p.XHR_RESPONSE_TYPE.DOCUMENT,
        gif: p.XHR_RESPONSE_TYPE.BLOB,
        png: p.XHR_RESPONSE_TYPE.BLOB,
        bmp: p.XHR_RESPONSE_TYPE.BLOB,
        jpg: p.XHR_RESPONSE_TYPE.BLOB,
        jpeg: p.XHR_RESPONSE_TYPE.BLOB,
        tif: p.XHR_RESPONSE_TYPE.BLOB,
        tiff: p.XHR_RESPONSE_TYPE.BLOB,
        webp: p.XHR_RESPONSE_TYPE.BLOB,
        tga: p.XHR_RESPONSE_TYPE.BLOB,
        json: p.XHR_RESPONSE_TYPE.JSON,
        text: p.XHR_RESPONSE_TYPE.TEXT,
        txt: p.XHR_RESPONSE_TYPE.TEXT,
        ttf: p.XHR_RESPONSE_TYPE.BUFFER,
        otf: p.XHR_RESPONSE_TYPE.BUFFER
    }, p.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
}, function(e, t, s) {
    "use strict";

    function n() {}

    function o(e) {
        return function() {
            if (null === e) throw new Error("Callback was already called.");
            var t = e;
            e = null, t.apply(this, arguments)
        }
    }
    t.__esModule = !0, t.eachSeries = function(e, t, s, n) {
        var o = 0,
            r = e.length;
        ! function a(i) {
            i || o === r ? s && s(i) : n ? setTimeout(function() {
                t(e[o++], a)
            }, 1) : t(e[o++], a)
        }()
    }, t.queue = function(e, t) {
        if (null == t) t = 1;
        else if (0 === t) throw new Error("Concurrency must not be zero");
        var s = 0,
            r = {
                _tasks: [],
                concurrency: t,
                saturated: n,
                unsaturated: n,
                buffer: t / 4,
                empty: n,
                drain: n,
                error: n,
                started: !1,
                paused: !1,
                push: function(e, t) {
                    a(e, !1, t)
                },
                kill: function() {
                    s = 0, r.drain = n, r.started = !1, r._tasks = []
                },
                unshift: function(e, t) {
                    a(e, !0, t)
                },
                process: function() {
                    for (; !r.paused && s < r.concurrency && r._tasks.length;) {
                        var t = r._tasks.shift();
                        0 === r._tasks.length && r.empty(), (s += 1) === r.concurrency && r.saturated(), e(t.data, o(i(t)))
                    }
                },
                length: function() {
                    return r._tasks.length
                },
                running: function() {
                    return s
                },
                idle: function() {
                    return r._tasks.length + s === 0
                },
                pause: function() {
                    !0 !== r.paused && (r.paused = !0)
                },
                resume: function() {
                    if (!1 !== r.paused) {
                        r.paused = !1;
                        for (var e = 1; e <= r.concurrency; e++) r.process()
                    }
                }
            };

        function a(e, t, s) {
            if (null != s && "function" != typeof s) throw new Error("task callback must be a function");
            if (r.started = !0, null == e && r.idle()) setTimeout(function() {
                return r.drain()
            }, 1);
            else {
                var o = {
                    data: e,
                    callback: "function" == typeof s ? s : n
                };
                t ? r._tasks.unshift(o) : r._tasks.push(o), setTimeout(function() {
                    return r.process()
                }, 1)
            }
        }

        function i(e) {
            return function() {
                s -= 1, e.callback.apply(e, arguments), null != arguments[0] && r.error(arguments[0], e.data), s <= r.concurrency - r.buffer && r.unsaturated(), r.idle() && r.drain(), r.process()
            }
        }
        return r
    }
}, function(e, t, s) {
    "use strict";
    e.exports = function(e, t) {
        t = t || {};
        for (var s = {
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            }, n = s.parser[t.strictMode ? "strict" : "loose"].exec(e), o = {}, r = 14; r--;) o[s.key[r]] = n[r] || "";
        return o[s.q.name] = {}, o[s.key[12]].replace(s.q.parser, function(e, t, n) {
            t && (o[s.q.name][t] = n)
        }), o
    }
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function() {
        function e(e, t) {
            for (var s = 0; s < t.length; s++) {
                var n = t[s];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, s, n) {
            return s && e(t.prototype, s), n && e(t, n), t
        }
    }();

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var r = function() {
        function e(t, s, n) {
            void 0 === s && (s = !1), o(this, e), this._fn = t, this._once = s, this._thisArg = n, this._next = this._prev = this._owner = null
        }
        return n(e, [{
            key: "detach",
            value: function() {
                return null !== this._owner && (this._owner.detach(this), !0)
            }
        }]), e
    }();

    function a(e, t) {
        return e._head ? (e._tail._next = t, t._prev = e._tail, e._tail = t) : (e._head = t, e._tail = t), t._owner = e, t
    }
    var i = function() {
        function e() {
            o(this, e), this._head = this._tail = void 0
        }
        return n(e, [{
            key: "handlers",
            value: function() {
                var e = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
                    t = this._head;
                if (e) return !!t;
                for (var s = []; t;) s.push(t), t = t._next;
                return s
            }
        }, {
            key: "has",
            value: function(e) {
                if (!(e instanceof r)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                return e._owner === this
            }
        }, {
            key: "dispatch",
            value: function() {
                var e = this._head;
                if (!e) return !1;
                for (; e;) e._once && this.detach(e), e._fn.apply(e._thisArg, arguments), e = e._next;
                return !0
            }
        }, {
            key: "add",
            value: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                if ("function" != typeof e) throw new Error("MiniSignal#add(): First arg must be a Function.");
                return a(this, new r(e, !1, t))
            }
        }, {
            key: "once",
            value: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                if ("function" != typeof e) throw new Error("MiniSignal#once(): First arg must be a Function.");
                return a(this, new r(e, !0, t))
            }
        }, {
            key: "detach",
            value: function(e) {
                if (!(e instanceof r)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                return e._owner !== this ? this : (e._prev && (e._prev._next = e._next), e._next && (e._next._prev = e._prev), e === this._head ? (this._head = e._next, null === e._next && (this._tail = null)) : e === this._tail && (this._tail = e._prev, this._tail._next = null), e._owner = null, this)
            }
        }, {
            key: "detachAll",
            value: function() {
                var e = this._head;
                if (!e) return this;
                for (this._head = this._tail = null; e;) e._owner = null, e = e._next;
                return this
            }
        }]), e
    }();
    i.MiniSignalBinding = r, t.default = i, e.exports = t.default
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = void 0;
    var n = "function" == typeof importScripts;
    t.default = n, e.exports = t.default
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getLogger = function(e, t) {
        for (var s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], n = 0, c = r.length; n < c; n++) {
            var l = r[n];
            if (l.key === e && l.color === t) return l.log
        }
        return function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Global",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u,
                s = {
                    enabled: !(arguments.length > 2 && void 0 !== arguments[2] && !arguments[2]),
                    key: e,
                    color: t,
                    log: function() {
                        var s = [];
                        o.default ? (s.push("%cWorker%c %c".concat(e)), s.push(i, " ")) : s.push("%c".concat(e)), s.push(a(t)), s.push.apply(s, arguments)
                    }
                };
            return r.push(s), s.log
        }(e, t, s)
    }, t.ERROR = t.WARN = t.INFO = t.LOG = void 0;
    var n, o = (n = s(6)) && n.__esModule ? n : {
            default: n
        },
        r = [],
        a = function(e) {
            return "background: ".concat(e, "; color: #FFFFFF; padding: 3px 5px; font-weight: bold;")
        },
        i = "background: #cc00c5; color: #FFFFFF; padding: 3px 5px; font-weight: bold;",
        u = "#000000";
    t.LOG = u, t.INFO = "#007bff", t.WARN = "#ffc107", t.ERROR = "#dc3545"
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return e.tryCatchResolve = t, e;

            function e(e, s) {
                return arguments.length < 2 && (s = t),
                    function(t, o, r) {
                        var a = e._defer(),
                            i = r.length;
                        return n({
                            f: t,
                            thisArg: o,
                            args: r,
                            params: new Array(i),
                            i: i - 1,
                            call: s
                        }, a._handler), a
                    };

                function n(t, n) {
                    if (t.i < 0) return s(t.f, t.thisArg, t.params, n);
                    e._handler(t.args[t.i]).fold(o, t, void 0, n)
                }

                function o(e, t, s) {
                    e.params[e.i] = t, e.i -= 1, n(e, s)
                }
            }

            function t(e, t, s, n) {
                try {
                    n.resolve(e.apply(t, s))
                } catch (e) {
                    n.reject(e)
                }
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return {
                pending: function() {
                    return {
                        state: "pending"
                    }
                },
                fulfilled: t,
                rejected: e,
                inspect: function(s) {
                    var n = s.state();
                    return 0 === n ? {
                        state: "pending"
                    } : n > 0 ? t(s.value) : e(s.value)
                }
            };

            function e(e) {
                return {
                    state: "rejected",
                    reason: e
                }
            }

            function t(e) {
                return {
                    state: "fulfilled",
                    value: e
                }
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            function e(t) {
                Error.call(this), this.message = t, this.name = e.name, "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, e)
            }
            return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t) {
    var s, n, o = e.exports = {};

    function r() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function i(e) {
        if (s === setTimeout) return setTimeout(e, 0);
        if ((s === r || !s) && setTimeout) return s = setTimeout, setTimeout(e, 0);
        try {
            return s(e, 0)
        } catch (t) {
            try {
                return s.call(null, e, 0)
            } catch (t) {
                return s.call(this, e, 0)
            }
        }
    }! function() {
        try {
            s = "function" == typeof setTimeout ? setTimeout : r
        } catch (e) {
            s = r
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            n = a
        }
    }();
    var u, c = [],
        l = !1,
        p = -1;

    function d() {
        l && u && (l = !1, u.length ? c = u.concat(c) : p = -1, c.length && h())
    }

    function h() {
        if (!l) {
            var e = i(d);
            l = !0;
            for (var t = c.length; t;) {
                for (u = c, c = []; ++p < t;) u && u[p].run();
                p = -1, t = c.length
            }
            u = null, l = !1,
                function(e) {
                    if (n === clearTimeout) return clearTimeout(e);
                    if ((n === a || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                    try {
                        n(e)
                    } catch (t) {
                        try {
                            return n.call(null, e)
                        } catch (t) {
                            return n.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function f(e, t) {
        this.fun = e, this.array = t
    }

    function v() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var s = 1; s < arguments.length; s++) t[s - 1] = arguments[s];
        c.push(new f(e, t)), 1 !== c.length || l || i(h)
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = v, o.addListener = v, o.once = v, o.off = v, o.removeListener = v, o.removeAllListeners = v, o.emit = v, o.prependListener = v, o.prependOnceListener = v, o.listeners = function(e) {
        return []
    }, o.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = void 0;
    var n, o, r, a, i = (n = s(6)) && n.__esModule ? n : {
        default: n
    };

    function u(e, t) {
        for (var s = 0; s < t.length; s++) {
            var n = t[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    a = i.default ? self.URL || self.webkitURL || self.mozURL || self.msURL : window.URL || window.webkitURL || window.mozURL || window.msURL;
    var c = (r = o = function() {
        function e(t, s) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this._config = t, this._pack = s
        }
        var t, s;
        return t = e, (s = [{
            key: "getType",
            value: function(e) {
                return this._findFile(e).type || "text/plain"
            }
        }, {
            key: "get",
            value: function(t) {
                var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                switch (s || (s = this._detectFormat(t)), s) {
                    case e.RAW_FORMAT:
                        return this.getData(t);
                    case e.STRING_FORMAT:
                        return this.getAsString(t);
                    case e.BYTES_FORMAT:
                        return this.getAsBytes(t);
                    case e.URI_FORMAT:
                        return this.getAsURI(t)
                }
            }
        }, {
            key: "getData",
            value: function(e) {
                var t = this._findFile(e);
                return this._slice(t.begin, t.end)
            }
        }, {
            key: "getAsString",
            value: function(e) {
                if (null === this._pack) return "";
                var t = this.getData(e);
                if ("string" == typeof t || t instanceof String) return t;
                t = new Uint8Array(t);
                for (var s = "", n = 0, o = Math.ceil(t.byteLength / 65535), r = 0; r < o; r++) s += String.fromCharCode.apply(null, new Uint8Array(t.buffer.slice(n, n + 65535))), n += 65535;
                return decodeURIComponent(escape(s))
            }
        }, {
            key: "getAsBytes",
            value: function(e) {
                var t = this.getData(e);
                if ("string" == typeof t || t instanceof String) {
                    if ("function" != typeof Uint8Array) throw new Error("TypedArray are not supported");
                    return new Uint8Array(t.split("").map(function(e) {
                        return e.charCodeAt(0)
                    }))
                }
                return t
            }
        }, {
            key: "getAsURI",
            value: function(e) {
                var t = this.getData(e),
                    s = this.getType(e);
                return (i.default ? self.Blob : Detect.supports.blob) ? a.createObjectURL(new Blob([t], {
                    type: s
                })) : "data:" + s + ";base64," + btoa(t)
            }
        }, {
            key: "_findFile",
            value: function(e) {
                for (var t = this._config.length; t-- > 0;)
                    if (this._config[t][0] === e) {
                        var s = this._config[t];
                        return {
                            name: s[0],
                            begin: s[1],
                            end: s[2],
                            type: s[3]
                        }
                    }
            }
        }, {
            key: "_slice",
            value: function(e, t) {
                return null === this._pack ? "function" == typeof Uint8Array ? new Uint8Array([]) : "" : "function" == typeof this._pack.substr ? this._pack.substr(e, t - e) : this._pack.slice(e, t)
            }
        }, {
            key: "_detectFormat",
            value: function(t) {
                switch (t.split(".").pop()) {
                    case "glb":
                    case "drc":
                    case "bin":
                    case "dds":
                        return e.RAW_FORMAT;
                    case "png":
                    case "jpg":
                        return e.URI_FORMAT;
                    case "json":
                        return e.STRING_FORMAT;
                    default:
                        return e.URI_FORMAT
                }
            }
        }]) && u(t.prototype, s), e
    }(), o.RAW_FORMAT = "raw", o.STRING_FORMAT = "string", o.BYTES_FORMAT = "bytes", o.URI_FORMAT = "uri", r);
    t.default = c, e.exports = t.default
}, function(e, t) {
    e.exports = {
        "./assets/audios/fx/chest.mp3": "./assets/audios/fx/chest.mp3?v=1.1.1",
        "./assets/audios/fx/door.mp3": "./assets/audios/fx/door.mp3?v=1.1.1",
        "./assets/audios/fx/error.mp3": "./assets/audios/fx/error.mp3?v=1.1.1",
        "./assets/audios/fx/explosion.mp3": "./assets/audios/fx/explosion.mp3?v=1.1.1",
        "./assets/audios/fx/fall-stone-0.mp3": "./assets/audios/fx/fall-stone-0.mp3?v=1.1.1",
        "./assets/audios/fx/fall-stone-1.mp3": "./assets/audios/fx/fall-stone-1.mp3?v=1.1.1",
        "./assets/audios/fx/fall-stone-2.mp3": "./assets/audios/fx/fall-stone-2.mp3?v=1.1.1",
        "./assets/audios/fx/fall-stone-3.mp3": "./assets/audios/fx/fall-stone-3.mp3?v=1.1.1",
        "./assets/audios/fx/falling-stone.mp3": "./assets/audios/fx/falling-stone.mp3?v=1.1.1",
        "./assets/audios/fx/fire.mp3": "./assets/audios/fx/fire.mp3?v=1.1.1",
        "./assets/audios/fx/fragment.mp3": "./assets/audios/fx/fragment.mp3?v=1.1.1",
        "./assets/audios/fx/laser-hit.mp3": "./assets/audios/fx/laser-hit.mp3?v=1.1.1",
        "./assets/audios/fx/laser-loop.mp3": "./assets/audios/fx/laser-loop.mp3?v=1.1.1",
        "./assets/audios/fx/magic-shot.mp3": "./assets/audios/fx/magic-shot.mp3?v=1.1.1",
        "./assets/audios/fx/rock-construct.mp3": "./assets/audios/fx/rock-construct.mp3?v=1.1.1",
        "./assets/audios/fx/thunder.mp3": "./assets/audios/fx/thunder.mp3?v=1.1.1",
        "./assets/audios/fx/validate-click.mp3": "./assets/audios/fx/validate-click.mp3?v=1.1.1",
        "./assets/audios/fx/walking.mp3": "./assets/audios/fx/walking.mp3?v=1.1.1",
        "./assets/audios/fx/woosh-2.mp3": "./assets/audios/fx/woosh-2.mp3?v=1.1.1",
        "./assets/audios/fx/woosh-3.mp3": "./assets/audios/fx/woosh-3.mp3?v=1.1.1",
        "./assets/audios/fx/woosh.mp3": "./assets/audios/fx/woosh.mp3?v=1.1.1",
        "./assets/audios/themes/credits-theme.mp3": "./assets/audios/themes/credits-theme.mp3?v=1.1.1",
        "./assets/audios/themes/home-theme.mp3": "./assets/audios/themes/home-theme.mp3?v=1.1.1",
        "./assets/audios/themes/level-1-theme.mp3": "./assets/audios/themes/level-1-theme.mp3?v=1.1.1",
        "./assets/audios/themes/level-2-theme.mp3": "./assets/audios/themes/level-2-theme.mp3?v=1.1.1",
        "./assets/audios/themes/level-3-theme.mp3": "./assets/audios/themes/level-3-theme.mp3?v=1.1.1",
        "./assets/audios/themes/tutorial-theme.mp3": "./assets/audios/themes/tutorial-theme.mp3?v=1.1.1",
        "./assets/audios/ui/active-selection.mp3": "./assets/audios/ui/active-selection.mp3?v=1.1.1",
        "./assets/audios/ui/helper.mp3": "./assets/audios/ui/helper.mp3?v=1.1.1",
        "./assets/audios/ui/interface-soft-stone.mp3": "./assets/audios/ui/interface-soft-stone.mp3?v=1.1.1",
        "./assets/audios/voices/god/avoid-lightning.mp3": "./assets/audios/voices/god/avoid-lightning.mp3?v=1.1.1",
        "./assets/audios/voices/god/having-fun-rocks.mp3": "./assets/audios/voices/god/having-fun-rocks.mp3?v=1.1.1",
        "./assets/audios/voices/god/hope-youre-glad.mp3": "./assets/audios/voices/god/hope-youre-glad.mp3?v=1.1.1",
        "./assets/audios/voices/god/hurry-up-song.mp3": "./assets/audios/voices/god/hurry-up-song.mp3?v=1.1.1",
        "./assets/audios/voices/god/hurry-up.mp3": "./assets/audios/voices/god/hurry-up.mp3?v=1.1.1",
        "./assets/audios/voices/god/intro.mp3": "./assets/audios/voices/god/intro.mp3?v=1.1.1",
        "./assets/audios/voices/god/laugh.mp3": "./assets/audios/voices/god/laugh.mp3?v=1.1.1",
        "./assets/audios/voices/god/loser.mp3": "./assets/audios/voices/god/loser.mp3?v=1.1.1",
        "./assets/audios/voices/god/power-1.mp3": "./assets/audios/voices/god/power-1.mp3?v=1.1.1",
        "./assets/audios/voices/god/power-2.mp3": "./assets/audios/voices/god/power-2.mp3?v=1.1.1",
        "./assets/audios/voices/god/river.mp3": "./assets/audios/voices/god/river.mp3?v=1.1.1",
        "./assets/audios/voices/god/rock-heavy.mp3": "./assets/audios/voices/god/rock-heavy.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/electrocution.mp3": "./assets/audios/voices/heraclos/electrocution.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/grr.mp3": "./assets/audios/voices/heraclos/grr.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/happened-to-me.mp3": "./assets/audios/voices/heraclos/happened-to-me.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/hmm.mp3": "./assets/audios/voices/heraclos/hmm.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/hus-0.mp3": "./assets/audios/voices/heraclos/hus-0.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/hus-1.mp3": "./assets/audios/voices/heraclos/hus-1.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/i-hate-this-guy.mp3": "./assets/audios/voices/heraclos/i-hate-this-guy.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/jump-0.mp3": "./assets/audios/voices/heraclos/jump-0.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/jump-1.mp3": "./assets/audios/voices/heraclos/jump-1.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/jump-2.mp3": "./assets/audios/voices/heraclos/jump-2.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/just-want-to-go-home.mp3": "./assets/audios/voices/heraclos/just-want-to-go-home.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/scream.mp3": "./assets/audios/voices/heraclos/scream.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/sigh-2.mp3": "./assets/audios/voices/heraclos/sigh-2.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/sigh.mp3": "./assets/audios/voices/heraclos/sigh.mp3?v=1.1.1",
        "./assets/audios/voices/heraclos/want-beer.mp3": "./assets/audios/voices/heraclos/want-beer.mp3?v=1.1.1",
        "./assets/favicons/android-icon-144x144.png": "./assets/favicons/android-icon-144x144.png?v=1.1.1",
        "./assets/favicons/android-icon-192x192.png": "./assets/favicons/android-icon-192x192.png?v=1.1.1",
        "./assets/favicons/android-icon-36x36.png": "./assets/favicons/android-icon-36x36.png?v=1.1.1",
        "./assets/favicons/android-icon-48x48.png": "./assets/favicons/android-icon-48x48.png?v=1.1.1",
        "./assets/favicons/android-icon-72x72.png": "./assets/favicons/android-icon-72x72.png?v=1.1.1",
        "./assets/favicons/android-icon-96x96.png": "./assets/favicons/android-icon-96x96.png?v=1.1.1",
        "./assets/favicons/apple-icon-114x114.png": "./assets/favicons/apple-icon-114x114.png?v=1.1.1",
        "./assets/favicons/apple-icon-120x120.png": "./assets/favicons/apple-icon-120x120.png?v=1.1.1",
        "./assets/favicons/apple-icon-144x144.png": "./assets/favicons/apple-icon-144x144.png?v=1.1.1",
        "./assets/favicons/apple-icon-152x152.png": "./assets/favicons/apple-icon-152x152.png?v=1.1.1",
        "./assets/favicons/apple-icon-180x180.png": "./assets/favicons/apple-icon-180x180.png?v=1.1.1",
        "./assets/favicons/apple-icon-57x57.png": "./assets/favicons/apple-icon-57x57.png?v=1.1.1",
        "./assets/favicons/apple-icon-60x60.png": "./assets/favicons/apple-icon-60x60.png?v=1.1.1",
        "./assets/favicons/apple-icon-72x72.png": "./assets/favicons/apple-icon-72x72.png?v=1.1.1",
        "./assets/favicons/apple-icon-76x76.png": "./assets/favicons/apple-icon-76x76.png?v=1.1.1",
        "./assets/favicons/apple-icon-precomposed.png": "./assets/favicons/apple-icon-precomposed.png?v=1.1.1",
        "./assets/favicons/apple-icon.png": "./assets/favicons/apple-icon.png?v=1.1.1",
        "./assets/favicons/browserconfig.xml": "./assets/favicons/browserconfig.xml?v=1.1.1",
        "./assets/favicons/favicon-16x16.png": "./assets/favicons/favicon-16x16.png?v=1.1.1",
        "./assets/favicons/favicon-32x32.png": "./assets/favicons/favicon-32x32.png?v=1.1.1",
        "./assets/favicons/favicon-96x96.png": "./assets/favicons/favicon-96x96.png?v=1.1.1",
        "./assets/favicons/favicon.ico": "./assets/favicons/favicon.ico?v=1.1.1",
        "./assets/favicons/manifest.json": "./assets/favicons/manifest.json?v=1.1.1",
        "./assets/favicons/ms-icon-144x144.png": "./assets/favicons/ms-icon-144x144.png?v=1.1.1",
        "./assets/favicons/ms-icon-150x150.png": "./assets/favicons/ms-icon-150x150.png?v=1.1.1",
        "./assets/favicons/ms-icon-310x310.png": "./assets/favicons/ms-icon-310x310.png?v=1.1.1",
        "./assets/favicons/ms-icon-70x70.png": "./assets/favicons/ms-icon-70x70.png?v=1.1.1",
        "./assets/fonts/dino.woff": "./assets/fonts/dino.woff?v=1.1.1",
        "./assets/fonts/dino.woff2": "./assets/fonts/dino.woff2?v=1.1.1",
        "./assets/images/fallback/bg.png": "./assets/images/fallback/bg.png?v=1.1.1",
        "./assets/images/fallback/fallback_cover.jpg": "./assets/images/fallback/fallback_cover.jpg?v=1.1.1",
        "./assets/images/joystick.png": "./assets/images/joystick.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_0.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_0.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_1.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_1.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_2.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_2.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_3.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_3.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_4.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_4.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_5.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_5.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_6.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_6.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_7.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_7.png?v=1.1.1",
        "/TikTok-Media/heraclosgame/assets/images/loader/amphora_8.png": "/TikTok-Media/heraclosgame/assets/images/loader/amphora_8.png?v=1.1.1",
        "./assets/images/pause/bottom-deco.png": "./assets/images/pause/bottom-deco.png?v=1.1.1",
        "./assets/images/pause/gamepad-layout.png": "./assets/images/pause/gamepad-layout.png?v=1.1.1",
        "./assets/images/pause/keyboard-layout.png": "./assets/images/pause/keyboard-layout.png?v=1.1.1",
        "./assets/images/pause/left-deco.png": "./assets/images/pause/left-deco.png?v=1.1.1",
        "./assets/images/pause/pause-bg.png": "./assets/images/pause/pause-bg.png?v=1.1.1",
        "./assets/images/pause/pause-crystal.png": "./assets/images/pause/pause-crystal.png?v=1.1.1",
        "./assets/images/pause/right-deco.png": "./assets/images/pause/right-deco.png?v=1.1.1",
        "./assets/images/pause/top-deco.png": "./assets/images/pause/top-deco.png?v=1.1.1",
        "./assets/images/pointer.png": "./assets/images/pointer.png?v=1.1.1",
        "./assets/images/share/facebook.png": "./assets/images/share/facebook.png?v=1.1.1",
        "./assets/images/share/twitter.png": "./assets/images/share/twitter.png?v=1.1.1",
        "./assets/misc/draco/draco_decoder.js": "./assets/misc/draco/draco_decoder.js?v=1.1.1",
        "./assets/misc/draco/draco_decoder.wasm": "./assets/misc/draco/draco_decoder.wasm?v=1.1.1",
        "./assets/misc/draco/draco_wasm_wrapper.js": "./assets/misc/draco/draco_wasm_wrapper.js?v=1.1.1",
        "./assets/packs/common-textures-high-dxt.json": "./assets/packs/common-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/common-textures-high-dxt.pack": "./assets/packs/common-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/common-textures-high-uncompressed.json": "./assets/packs/common-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/common-textures-high-uncompressed.pack": "./assets/packs/common-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/common-textures-low-dxt.json": "./assets/packs/common-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/common-textures-low-dxt.pack": "./assets/packs/common-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/common-textures-low-uncompressed.json": "./assets/packs/common-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/common-textures-low-uncompressed.pack": "./assets/packs/common-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/common-textures-medium-dxt.json": "./assets/packs/common-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/common-textures-medium-dxt.pack": "./assets/packs/common-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/common-textures-medium-uncompressed.json": "./assets/packs/common-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/common-textures-medium-uncompressed.pack": "./assets/packs/common-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/common.json": "./assets/packs/common.json?v=1.1.1",
        "./assets/packs/common.pack": "./assets/packs/common.pack?v=1.1.1",
        "./assets/packs/home-textures-high-dxt.json": "./assets/packs/home-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/home-textures-high-dxt.pack": "./assets/packs/home-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/home-textures-high-uncompressed.json": "./assets/packs/home-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/home-textures-high-uncompressed.pack": "./assets/packs/home-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/home-textures-low-dxt.json": "./assets/packs/home-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/home-textures-low-dxt.pack": "./assets/packs/home-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/home-textures-low-uncompressed.json": "./assets/packs/home-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/home-textures-low-uncompressed.pack": "./assets/packs/home-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/home-textures-medium-dxt.json": "./assets/packs/home-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/home-textures-medium-dxt.pack": "./assets/packs/home-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/home-textures-medium-uncompressed.json": "./assets/packs/home-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/home-textures-medium-uncompressed.pack": "./assets/packs/home-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/home.json": "./assets/packs/home.json?v=1.1.1",
        "./assets/packs/home.pack": "./assets/packs/home.pack?v=1.1.1",
        "./assets/packs/level-1-textures-high-dxt.json": "./assets/packs/level-1-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/level-1-textures-high-dxt.pack": "./assets/packs/level-1-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/level-1-textures-high-uncompressed.json": "./assets/packs/level-1-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/level-1-textures-high-uncompressed.pack": "./assets/packs/level-1-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-1-textures-low-dxt.json": "./assets/packs/level-1-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/level-1-textures-low-dxt.pack": "./assets/packs/level-1-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/level-1-textures-low-uncompressed.json": "./assets/packs/level-1-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/level-1-textures-low-uncompressed.pack": "./assets/packs/level-1-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-1-textures-medium-dxt.json": "./assets/packs/level-1-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/level-1-textures-medium-dxt.pack": "./assets/packs/level-1-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/level-1-textures-medium-uncompressed.json": "./assets/packs/level-1-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/level-1-textures-medium-uncompressed.pack": "./assets/packs/level-1-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-1.json": "./assets/packs/level-1.json?v=1.1.1",
        "./assets/packs/level-1.pack": "./assets/packs/level-1.pack?v=1.1.1",
        "./assets/packs/level-2-textures-high-dxt.json": "./assets/packs/level-2-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/level-2-textures-high-dxt.pack": "./assets/packs/level-2-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/level-2-textures-high-uncompressed.json": "./assets/packs/level-2-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/level-2-textures-high-uncompressed.pack": "./assets/packs/level-2-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-2-textures-low-dxt.json": "./assets/packs/level-2-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/level-2-textures-low-dxt.pack": "./assets/packs/level-2-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/level-2-textures-low-uncompressed.json": "./assets/packs/level-2-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/level-2-textures-low-uncompressed.pack": "./assets/packs/level-2-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-2-textures-medium-dxt.json": "./assets/packs/level-2-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/level-2-textures-medium-dxt.pack": "./assets/packs/level-2-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/level-2-textures-medium-uncompressed.json": "./assets/packs/level-2-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/level-2-textures-medium-uncompressed.pack": "./assets/packs/level-2-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-2.json": "./assets/packs/level-2.json?v=1.1.1",
        "./assets/packs/level-2.pack": "./assets/packs/level-2.pack?v=1.1.1",
        "./assets/packs/level-3-textures-high-dxt.json": "./assets/packs/level-3-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/level-3-textures-high-dxt.pack": "./assets/packs/level-3-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/level-3-textures-high-uncompressed.json": "./assets/packs/level-3-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/level-3-textures-high-uncompressed.pack": "./assets/packs/level-3-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-3-textures-low-dxt.json": "./assets/packs/level-3-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/level-3-textures-low-dxt.pack": "./assets/packs/level-3-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/level-3-textures-low-uncompressed.json": "./assets/packs/level-3-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/level-3-textures-low-uncompressed.pack": "./assets/packs/level-3-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-3-textures-medium-dxt.json": "./assets/packs/level-3-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/level-3-textures-medium-dxt.pack": "./assets/packs/level-3-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/level-3-textures-medium-uncompressed.json": "./assets/packs/level-3-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/level-3-textures-medium-uncompressed.pack": "./assets/packs/level-3-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-3.json": "./assets/packs/level-3.json?v=1.1.1",
        "./assets/packs/level-3.pack": "./assets/packs/level-3.pack?v=1.1.1",
        "./assets/packs/level-textures-high-dxt.json": "./assets/packs/level-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/level-textures-high-dxt.pack": "./assets/packs/level-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/level-textures-high-uncompressed.json": "./assets/packs/level-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/level-textures-high-uncompressed.pack": "./assets/packs/level-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-textures-low-dxt.json": "./assets/packs/level-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/level-textures-low-dxt.pack": "./assets/packs/level-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/level-textures-low-uncompressed.json": "./assets/packs/level-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/level-textures-low-uncompressed.pack": "./assets/packs/level-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/level-textures-medium-dxt.json": "./assets/packs/level-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/level-textures-medium-dxt.pack": "./assets/packs/level-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/level-textures-medium-uncompressed.json": "./assets/packs/level-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/level-textures-medium-uncompressed.pack": "./assets/packs/level-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/level.json": "./assets/packs/level.json?v=1.1.1",
        "./assets/packs/level.pack": "./assets/packs/level.pack?v=1.1.1",
        "./assets/packs/tutorial-textures-high-dxt.json": "./assets/packs/tutorial-textures-high-dxt.json?v=1.1.1",
        "./assets/packs/tutorial-textures-high-dxt.pack": "./assets/packs/tutorial-textures-high-dxt.pack?v=1.1.1",
        "./assets/packs/tutorial-textures-high-uncompressed.json": "./assets/packs/tutorial-textures-high-uncompressed.json?v=1.1.1",
        "./assets/packs/tutorial-textures-high-uncompressed.pack": "./assets/packs/tutorial-textures-high-uncompressed.pack?v=1.1.1",
        "./assets/packs/tutorial-textures-low-dxt.json": "./assets/packs/tutorial-textures-low-dxt.json?v=1.1.1",
        "./assets/packs/tutorial-textures-low-dxt.pack": "./assets/packs/tutorial-textures-low-dxt.pack?v=1.1.1",
        "./assets/packs/tutorial-textures-low-uncompressed.json": "./assets/packs/tutorial-textures-low-uncompressed.json?v=1.1.1",
        "./assets/packs/tutorial-textures-low-uncompressed.pack": "./assets/packs/tutorial-textures-low-uncompressed.pack?v=1.1.1",
        "./assets/packs/tutorial-textures-medium-dxt.json": "./assets/packs/tutorial-textures-medium-dxt.json?v=1.1.1",
        "./assets/packs/tutorial-textures-medium-dxt.pack": "./assets/packs/tutorial-textures-medium-dxt.pack?v=1.1.1",
        "./assets/packs/tutorial-textures-medium-uncompressed.json": "./assets/packs/tutorial-textures-medium-uncompressed.json?v=1.1.1",
        "./assets/packs/tutorial-textures-medium-uncompressed.pack": "./assets/packs/tutorial-textures-medium-uncompressed.pack?v=1.1.1",
        "./assets/packs/tutorial.json": "./assets/packs/tutorial.json?v=1.1.1",
        "./assets/packs/tutorial.pack": "./assets/packs/tutorial.pack?v=1.1.1",
        "./assets/videos/credits.mp4": "./assets/videos/credits.mp4?v=1.1.1",
        "./assets/videos/credits.webm": "./assets/videos/credits.webm?v=1.1.1",
        "./assets/videos/end.mp4": "./assets/videos/end.mp4?v=1.1.1",
        "./assets/videos/end.webm": "./assets/videos/end.webm?v=1.1.1",
        "./assets/videos/home.mp4": "./assets/videos/home.mp4?v=1.1.1",
        "./assets/videos/home.webm": "./assets/videos/home.webm?v=1.1.1",
        "./assets/videos/intro.mp4": "./assets/videos/intro.mp4?v=1.1.1",
        "./assets/videos/intro.webm": "./assets/videos/intro.webm?v=1.1.1",
        "/styles/index.styl": "/main.css?v=1.1.1",
        "/scripts/index.js": "/main.js?v=1.1.1",
        "/scripts/vendor/index.js": "/vendor.js?v=1.1.1",
        "/views/layouts/index.html.ejs": "/index.html",
        "/views/layouts/404.html.ejs": "/404.html"
    }
}, function(e, t, s) {
    "use strict";
    t.__esModule = !0, t.encodeBinary = function(e) {
        for (var t = "", s = 0; s < e.length;) {
            for (var o = [0, 0, 0], r = [0, 0, 0, 0], a = 0; a < o.length; ++a) s < e.length ? o[a] = 255 & e.charCodeAt(s++) : o[a] = 0;
            switch (r[0] = o[0] >> 2, r[1] = (3 & o[0]) << 4 | o[1] >> 4, r[2] = (15 & o[1]) << 2 | o[2] >> 6, r[3] = 63 & o[2], s - (e.length - 1)) {
                case 2:
                    r[3] = 64, r[2] = 64;
                    break;
                case 1:
                    r[3] = 64
            }
            for (var i = 0; i < r.length; ++i) t += n.charAt(r[i])
        }
        return t
    };
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
}, function(e, t, s) {
    "use strict";
    t.__esModule = !0;
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = function() {
            function e(e, t) {
                for (var s = 0; s < t.length; s++) {
                    var n = t[s];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, s, n) {
                return s && e(t.prototype, s), n && e(t, n), t
            }
        }(),
        r = c(s(5)),
        a = c(s(4)),
        i = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            return t.default = e, t
        }(s(3)),
        u = c(s(2));

    function c(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var l = /(#[\w-]+)?$/,
        p = function() {
            function e() {
                var t = this,
                    s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.baseUrl = s, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(e, s) {
                    return t._loadResource(e, s)
                }, this._queue = i.queue(this._boundLoadResource, n), this._queue.pause(), this.resources = {}, this.onProgress = new r.default, this.onError = new r.default, this.onLoad = new r.default, this.onStart = new r.default, this.onComplete = new r.default
            }
            return e.prototype.add = function(e, t, s, o) {
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; ++r) this.add(e[r]);
                    return this
                }
                if ("object" === (void 0 === e ? "undefined" : n(e)) && (o = t || e.callback || e.onComplete, s = e, t = e.url, e = e.name || e.key || e.url), "string" != typeof t && (o = s, s = t, t = e), "string" != typeof t) throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof s && (o = s, s = null), this.loading && (!s || !s.parentResource)) throw new Error("Cannot add resources while the loader is running.");
                if (this.resources[e]) throw new Error('Resource named "' + e + '" already exists.');
                if (t = this._prepareUrl(t), this.resources[e] = new u.default(e, t, s), "function" == typeof o && this.resources[e].onAfterMiddleware.once(o), this.loading) {
                    for (var a = s.parentResource, i = [], c = 0; c < a.children.length; ++c) a.children[c].isComplete || i.push(a.children[c]);
                    var l = a.progressChunk * (i.length + 1) / (i.length + 2);
                    a.children.push(this.resources[e]), a.progressChunk = l;
                    for (var p = 0; p < i.length; ++p) i[p].progressChunk = l;
                    this.resources[e].progressChunk = l
                }
                return this._queue.push(this.resources[e]), this
            }, e.prototype.pre = function(e) {
                return this._beforeMiddleware.push(e), this
            }, e.prototype.use = function(e) {
                return this._afterMiddleware.push(e), this
            }, e.prototype.reset = function() {
                for (var e in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources) {
                    var t = this.resources[e];
                    t._onLoadBinding && t._onLoadBinding.detach(), t.isLoading && t.abort()
                }
                return this.resources = {}, this
            }, e.prototype.load = function(e) {
                if ("function" == typeof e && this.onComplete.once(e), this.loading) return this;
                if (this._queue.idle()) this._onStart(), this._onComplete();
                else {
                    for (var t = 100 / this._queue._tasks.length, s = 0; s < this._queue._tasks.length; ++s) this._queue._tasks[s].data.progressChunk = t;
                    this._onStart(), this._queue.resume()
                }
                return this
            }, e.prototype._prepareUrl = function(e) {
                var t = (0, a.default)(e, {
                        strictMode: !0
                    }),
                    s = void 0;
                if (s = t.protocol || !t.path || 0 === e.indexOf("//") ? e : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== e.charAt(0) ? this.baseUrl + "/" + e : this.baseUrl + e, this.defaultQueryString) {
                    var n = l.exec(s)[0]; - 1 !== (s = s.substr(0, s.length - n.length)).indexOf("?") ? s += "&" + this.defaultQueryString : s += "?" + this.defaultQueryString, s += n
                }
                return s
            }, e.prototype._loadResource = function(e, t) {
                var s = this;
                e._dequeue = t, i.eachSeries(this._beforeMiddleware, function(t, n) {
                    t.call(s, e, function() {
                        n(e.isComplete ? {} : null)
                    })
                }, function() {
                    e.isComplete ? s._onLoad(e) : (e._onLoadBinding = e.onComplete.once(s._onLoad, s), e.load())
                }, !0)
            }, e.prototype._onStart = function() {
                this.progress = 0, this.loading = !0, this.onStart.dispatch(this)
            }, e.prototype._onComplete = function() {
                this.progress = 100, this.loading = !1, this.onComplete.dispatch(this, this.resources)
            }, e.prototype._onLoad = function(e) {
                var t = this;
                e._onLoadBinding = null, this._resourcesParsing.push(e), e._dequeue(), i.eachSeries(this._afterMiddleware, function(s, n) {
                    s.call(t, e, n)
                }, function() {
                    e.onAfterMiddleware.dispatch(e), t.progress = Math.min(100, t.progress + e.progressChunk), t.onProgress.dispatch(t, e), e.error ? t.onError.dispatch(e.error, t, e) : t.onLoad.dispatch(t, e), t._resourcesParsing.splice(t._resourcesParsing.indexOf(e), 1), t._queue.idle() && 0 === t._resourcesParsing.length && t._onComplete()
                }, !0)
            }, o(e, [{
                key: "concurrency",
                get: function() {
                    return this._queue.concurrency
                },
                set: function(e) {
                    this._queue.concurrency = e
                }
            }]), e
        }();
    t.default = p
}, function(e, t, s) {
    "use strict";
    var n = s(15).default,
        o = s(2).default,
        r = s(3),
        a = s(14);
    n.Resource = o, n.async = r, n.base64 = a, e.exports = n, e.exports.default = n
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = void 0;
    var n, o = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var s in e)
                    if (Object.prototype.hasOwnProperty.call(e, s)) {
                        var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, s) : {};
                        n.get || n.set ? Object.defineProperty(t, s, n) : t[s] = e[s]
                    }
            return t.default = e, t
        }(s(16)),
        r = (n = s(13)) && n.__esModule ? n : {
            default: n
        },
        a = s(7);

    function i(e) {
        return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function u(e, t) {
        for (var s = 0; s < t.length; s++) {
            var n = t[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var c = (0, a.getLogger)("PackLoader", a.ERROR),
        l = function(e) {
            function t(e) {
                var s;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (s = function(e, t) {
                    if (t && ("object" === i(t) || "function" == typeof t)) return t;
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)))._packName = e, s._addMiddlewares(), s._addPack(e), s
            }
            var s, n;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, o.default), s = t, (n = [{
                key: "load",
                value: function(e) {
                    var s = this;
                    (function e(t, s, n) {
                        null === t && (t = Function.prototype);
                        var o = Object.getOwnPropertyDescriptor(t, s);
                        if (void 0 === o) {
                            var r = Object.getPrototypeOf(t);
                            return null === r ? void 0 : e(r, s, n)
                        }
                        if ("value" in o) return o.value;
                        var a = o.get;
                        return void 0 !== a ? a.call(n) : void 0
                    })(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "load", this).call(this, function(t, n) {
                        if (!s._checkForErrors(n)) {
                            var o = s._packName,
                                r = s.get("".concat(o, "-config")) || [],
                                a = s.get("".concat(o, "-pack"));
                            e(o, r, a)
                        }
                    })
                }
            }, {
                key: "get",
                value: function(e) {
                    return this.resources && this.resources[e] ? this.resources[e].data : null
                }
            }, {
                key: "abort",
                value: function() {
                    for (var e in this.resources) {
                        var t = this.resources[e];
                        t.isComplete || t.abort()
                    }
                }
            }, {
                key: "_addPack",
                value: function(e) {
                    var t = [{
                        name: "".concat(e, "-config"),
                        url: "./assets/packs/".concat(e, ".json")
                    }, {
                        name: "".concat(e, "-pack"),
                        url: "./assets/packs/".concat(e, ".pack")
                    }];
                    this._addManifest(t)
                }
            }, {
                key: "_addManifest",
                value: function(e) {
                    for (var t in e) {
                        var s = e[t];
                        this.add(s.name, s.url, s.options || null)
                    }
                }
            }, {
                key: "_addMiddlewares",
                value: function() {
                    this.pre(this._extensionMiddleware), this.pre(this._cachebreakMiddleware)
                }
            }, {
                key: "_checkForErrors",
                value: function(e) {
                    for (var t in e) {
                        var s = e[t];
                        if (s.error) return c("Resource '".concat(t, "' error :"), s.error), !0
                    }
                    return !1
                }
            }, {
                key: "_extensionMiddleware",
                value: function(e, t) {
                    "pack" === e.extension && (e.xhrType = o.Resource.XHR_RESPONSE_TYPE.BUFFER), t()
                }
            }, {
                key: "_cachebreakMiddleware",
                value: function(e, t) {
                    var s = r.default[e.url];
                    s ? e.url = s : c("Resource '".concat(e.name, "' does not exist :"), e.url), t()
                }
            }]) && u(s.prototype, n), t
        }();
    t.default = l, e.exports = t.default
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            function e(e) {
                this._async = e, this._running = !1, this._queue = this, this._queueLen = 0, this._afterQueue = {}, this._afterQueueLen = 0;
                var t = this;
                this.drain = function() {
                    t._drain()
                }
            }
            return e.prototype.enqueue = function(e) {
                this._queue[this._queueLen++] = e, this.run()
            }, e.prototype.afterQueue = function(e) {
                this._afterQueue[this._afterQueueLen++] = e, this.run()
            }, e.prototype.run = function() {
                this._running || (this._running = !0, this._async(this.drain))
            }, e.prototype._drain = function() {
                for (var e = 0; e < this._queueLen; ++e) this._queue[e].run(), this._queue[e] = void 0;
                for (this._queueLen = 0, this._running = !1, e = 0; e < this._afterQueueLen; ++e) this._afterQueue[e].run(), this._afterQueue[e] = void 0;
                this._afterQueueLen = 0
            }, e
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    (function(n) {
        var o;
        ! function(r) {
            "use strict";
            void 0 === (o = function() {
                return function(e) {
                    var t = e.scheduler,
                        s = function() {
                            return void 0 !== n && null !== n && "function" == typeof n.emit ? function(e, t) {
                                return "unhandledRejection" === e ? n.emit(e, t.value, t) : n.emit(e, t)
                            } : "undefined" != typeof self && function() {
                                if ("function" == typeof CustomEvent) try {
                                    return new CustomEvent("unhandledRejection") instanceof CustomEvent
                                } catch (e) {}
                                return !1
                            }() ? (e = self, t = CustomEvent, function(s, n) {
                                var o = new t(s, {
                                    detail: {
                                        reason: n.value,
                                        key: n
                                    },
                                    bubbles: !1,
                                    cancelable: !0
                                });
                                return !e.dispatchEvent(o)
                            }) : "undefined" != typeof self && function() {
                                if ("undefined" != typeof document && "function" == typeof document.createEvent) try {
                                    return document.createEvent("CustomEvent").initCustomEvent("eventType", !1, !0, {}), !0
                                } catch (e) {}
                                return !1
                            }() ? function(e, t) {
                                return function(s, n) {
                                    var o = t.createEvent("CustomEvent");
                                    return o.initCustomEvent(s, !1, !0, {
                                        reason: n.value,
                                        key: n
                                    }), !e.dispatchEvent(o)
                                }
                            }(self, document) : X;
                            var e, t
                        }(),
                        o = Object.create || function(e) {
                            function t() {}
                            return t.prototype = e, new t
                        };

                    function r(e, t) {
                        this._handler = e === v ? t : function(e) {
                            var t = new _;
                            try {
                                e(function(e) {
                                    t.resolve(e)
                                }, s, function(e) {
                                    t.notify(e)
                                })
                            } catch (e) {
                                s(e)
                            }
                            return t;

                            function s(e) {
                                t.reject(e)
                            }
                        }(e)
                    }

                    function a(e) {
                        return S(e) ? e : new r(v, new x(h(e)))
                    }

                    function i(e) {
                        return new r(v, new x(new w(e)))
                    }

                    function u() {
                        return j
                    }

                    function c(e, t, s) {
                        for (var n, o = "function" == typeof t ? function(n, o, r) {
                                r.resolved || l(s, p, n, e(t, o, n), r)
                            } : p, a = new _, i = s.length >>> 0, u = new Array(i), c = 0; c < s.length && !a.resolved; ++c) void 0 !== (n = s[c]) || c in s ? l(s, o, c, n, a) : --i;
                        return 0 === i && a.become(new k(u)), new r(v, a);

                        function p(e, t, s) {
                            u[e] = t, 0 == --i && s.become(new k(u))
                        }
                    }

                    function l(e, t, s, n, o) {
                        if (L(n)) {
                            var r = function(e) {
                                    return S(e) ? e._handler.join() : f(e)
                                }(n),
                                a = r.state();
                            0 === a ? r.fold(t, s, void 0, o) : a > 0 ? t(s, r.value, o) : (o.become(r), p(e, s + 1, r))
                        } else t(s, n, o)
                    }

                    function p(e, t, s) {
                        for (var n = t; n < e.length; ++n) d(h(e[n]), s)
                    }

                    function d(e, t) {
                        if (e !== t) {
                            var s = e.state();
                            0 === s ? e.visit(e, void 0, e._unreport) : s < 0 && e._unreport()
                        }
                    }

                    function h(e) {
                        return S(e) ? e._handler.join() : L(e) ? f(e) : new k(e)
                    }

                    function f(e) {
                        try {
                            var t = e.then;
                            return "function" == typeof t ? new y(t, e) : new k(e)
                        } catch (e) {
                            return new w(e)
                        }
                    }

                    function v() {}

                    function m() {}
                    r.resolve = a, r.reject = i, r.never = u, r._defer = function() {
                        return new r(v, new _)
                    }, r._handler = h, r.prototype.then = function(e, t, s) {
                        var n = this._handler,
                            o = n.join().state();
                        if ("function" != typeof e && o > 0 || "function" != typeof t && o < 0) return new this.constructor(v, n);
                        var r = this._beget(),
                            a = r._handler;
                        return n.chain(a, n.receiver, e, t, s), r
                    }, r.prototype.catch = function(e) {
                        return this.then(void 0, e)
                    }, r.prototype._beget = function() {
                        return e = this._handler, new(0, this.constructor)(v, new _(e.receiver, e.join().context));
                        var e
                    }, r.all = function(e) {
                        return c(U, null, e)
                    }, r.race = function(e) {
                        return "object" != typeof e || null === e ? i(new TypeError("non-iterable passed to race()")) : 0 === e.length ? u() : 1 === e.length ? a(e[0]) : function(e) {
                            var t, s, n, o = new _;
                            for (t = 0; t < e.length; ++t)
                                if (void 0 !== (s = e[t]) || t in e) {
                                    if (0 !== (n = h(s)).state()) {
                                        o.become(n), p(e, t + 1, n);
                                        break
                                    }
                                    n.visit(o, o.resolve, o.reject)
                                }
                            return new r(v, o)
                        }(e)
                    }, r._traverse = function(e, t) {
                        return c(N, e, t)
                    }, r._visitRemaining = p, v.prototype.when = v.prototype.become = v.prototype.notify = v.prototype.fail = v.prototype._unreport = v.prototype._report = X, v.prototype._state = 0, v.prototype.state = function() {
                        return this._state
                    }, v.prototype.join = function() {
                        for (var e = this; void 0 !== e.handler;) e = e.handler;
                        return e
                    }, v.prototype.chain = function(e, t, s, n, o) {
                        this.when({
                            resolver: e,
                            receiver: t,
                            fulfilled: s,
                            rejected: n,
                            progress: o
                        })
                    }, v.prototype.visit = function(e, t, s, n) {
                        this.chain(g, e, t, s, n)
                    }, v.prototype.fold = function(e, t, s, n) {
                        this.when(new A(e, t, s, n))
                    }, F(v, m), m.prototype.become = function(e) {
                        e.fail()
                    };
                    var g = new m;

                    function _(e, t) {
                        r.createContext(this, t), this.consumers = void 0, this.receiver = e, this.handler = void 0, this.resolved = !1
                    }

                    function x(e) {
                        this.handler = e
                    }

                    function y(e, s) {
                        _.call(this), t.enqueue(new R(e, s, this))
                    }

                    function k(e) {
                        r.createContext(this), this.value = e
                    }
                    F(v, _), _.prototype._state = 0, _.prototype.resolve = function(e) {
                        this.become(h(e))
                    }, _.prototype.reject = function(e) {
                        this.resolved || this.become(new w(e))
                    }, _.prototype.join = function() {
                        if (!this.resolved) return this;
                        for (var e = this; void 0 !== e.handler;)
                            if ((e = e.handler) === this) return this.handler = new w(new TypeError("Promise cycle"));
                        return e
                    }, _.prototype.run = function() {
                        var e = this.consumers,
                            t = this.handler;
                        this.handler = this.handler.join(), this.consumers = void 0;
                        for (var s = 0; s < e.length; ++s) t.when(e[s])
                    }, _.prototype.become = function(e) {
                        this.resolved || (this.resolved = !0, this.handler = e, void 0 !== this.consumers && t.enqueue(this), void 0 !== this.context && e._report(this.context))
                    }, _.prototype.when = function(e) {
                        this.resolved ? t.enqueue(new T(e, this.handler)) : void 0 === this.consumers ? this.consumers = [e] : this.consumers.push(e)
                    }, _.prototype.notify = function(e) {
                        this.resolved || t.enqueue(new P(e, this))
                    }, _.prototype.fail = function(e) {
                        var t = void 0 === e ? this.context : e;
                        this.resolved && this.handler.join().fail(t)
                    }, _.prototype._report = function(e) {
                        this.resolved && this.handler.join()._report(e)
                    }, _.prototype._unreport = function() {
                        this.resolved && this.handler.join()._unreport()
                    }, F(v, x), x.prototype.when = function(e) {
                        t.enqueue(new T(e, this))
                    }, x.prototype._report = function(e) {
                        this.join()._report(e)
                    }, x.prototype._unreport = function() {
                        this.join()._unreport()
                    }, F(_, y), F(v, k), k.prototype._state = 1, k.prototype.fold = function(e, t, s, n) {
                        ! function(e, t, s, n, o) {
                            if ("function" != typeof e) return o.become(s);
                            r.enterContext(s),
                                function(e, t, s, n, o) {
                                    try {
                                        e.call(n, t, s, o)
                                    } catch (e) {
                                        o.become(new w(e))
                                    }
                                }(e, t, s.value, n, o), r.exitContext()
                        }(e, t, this, s, n)
                    }, k.prototype.when = function(e) {
                        M(e.fulfilled, this, e.receiver, e.resolver)
                    };
                    var b = 0;

                    function w(e) {
                        r.createContext(this), this.id = ++b, this.value = e, this.handled = !1, this.reported = !1, this._report()
                    }

                    function E(e, t) {
                        this.rejection = e, this.context = t
                    }

                    function O(e) {
                        this.rejection = e
                    }
                    F(v, w), w.prototype._state = -1, w.prototype.fold = function(e, t, s, n) {
                        n.become(this)
                    }, w.prototype.when = function(e) {
                        "function" == typeof e.rejected && this._unreport(), M(e.rejected, this, e.receiver, e.resolver)
                    }, w.prototype._report = function(e) {
                        t.afterQueue(new E(this, e))
                    }, w.prototype._unreport = function() {
                        this.handled || (this.handled = !0, t.afterQueue(new O(this)))
                    }, w.prototype.fail = function(e) {
                        this.reported = !0, s("unhandledRejection", this), r.onFatalRejection(this, void 0 === e ? this.context : e)
                    }, E.prototype.run = function() {
                        this.rejection.handled || this.rejection.reported || (this.rejection.reported = !0, s("unhandledRejection", this.rejection) || r.onPotentiallyUnhandledRejection(this.rejection, this.context))
                    }, O.prototype.run = function() {
                        this.rejection.reported && (s("rejectionHandled", this.rejection) || r.onPotentiallyUnhandledRejectionHandled(this.rejection))
                    }, r.createContext = r.enterContext = r.exitContext = r.onPotentiallyUnhandledRejection = r.onPotentiallyUnhandledRejectionHandled = r.onFatalRejection = X;
                    var j = new r(v, new v);

                    function T(e, t) {
                        this.continuation = e, this.handler = t
                    }

                    function P(e, t) {
                        this.handler = t, this.value = e
                    }

                    function R(e, t, s) {
                        this._then = e, this.thenable = t, this.resolver = s
                    }

                    function A(e, t, s, n) {
                        this.f = e, this.z = t, this.c = s, this.to = n, this.resolver = g, this.receiver = this
                    }

                    function S(e) {
                        return e instanceof r
                    }

                    function L(e) {
                        return ("object" == typeof e || "function" == typeof e) && null !== e
                    }

                    function M(e, t, s, n) {
                        if ("function" != typeof e) return n.become(t);
                        r.enterContext(t),
                            function(e, t, s, n) {
                                try {
                                    n.become(h(e.call(s, t)))
                                } catch (e) {
                                    n.become(new w(e))
                                }
                            }(e, t.value, s, n), r.exitContext()
                    }

                    function C(e, t, s, n, o) {
                        if ("function" != typeof e) return o.notify(t);
                        r.enterContext(s),
                            function(e, t, s, n) {
                                try {
                                    n.notify(e.call(s, t))
                                } catch (e) {
                                    n.notify(e)
                                }
                            }(e, t, n, o), r.exitContext()
                    }

                    function N(e, t, s) {
                        try {
                            return e(t, s)
                        } catch (e) {
                            return i(e)
                        }
                    }

                    function F(e, t) {
                        t.prototype = o(e.prototype), t.prototype.constructor = t
                    }

                    function U(e, t) {
                        return t
                    }

                    function X() {}
                    return T.prototype.run = function() {
                        this.handler.join().when(this.continuation)
                    }, P.prototype.run = function() {
                        var e = this.handler.consumers;
                        if (void 0 !== e)
                            for (var t, s = 0; s < e.length; ++s) C((t = e[s]).progress, this.value, this.handler, t.receiver, t.resolver)
                    }, R.prototype.run = function() {
                        var e = this.resolver;
                        ! function(e, t, s, n, o) {
                            try {
                                e.call(t, s, n, o)
                            } catch (e) {
                                n(e)
                            }
                        }(this._then, this.thenable, function(t) {
                            e.resolve(t)
                        }, function(t) {
                            e.reject(t)
                        }, function(t) {
                            e.notify(t)
                        })
                    }, A.prototype.fulfilled = function(e) {
                        this.f.call(this.c, this.z, e, this.to)
                    }, A.prototype.rejected = function(e) {
                        this.to.reject(e)
                    }, A.prototype.progress = function(e) {
                        this.to.notify(e)
                    }, r
                }
            }.call(t, s, t, e)) || (e.exports = o)
        }(s(0))
    }).call(this, s(11))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function(e) {
            return s(19)({
                scheduler: new(s(18))(s(1).asap)
            })
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return {
                formatError: function(t) {
                    var s = "object" == typeof t && null !== t && (t.stack || t.message) ? t.stack || t.message : e(t);
                    return t instanceof Error ? s : s + " (WARNING: non-Error used)"
                },
                formatObject: e,
                tryStringify: t
            };

            function e(e) {
                var s = String(e);
                return "[object Object]" === s && "undefined" != typeof JSON && (s = t(e, s)), s
            }

            function t(e, t) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return t
                }
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function(e) {
            var t = s(1).setTimer,
                n = s(21);
            return function(e) {
                var s, a = r,
                    i = r;
                "undefined" != typeof console && (s = console, a = void 0 !== s.error ? function(e) {
                    s.error(e)
                } : function(e) {
                    s.log(e)
                }, i = void 0 !== s.info ? function(e) {
                    s.info(e)
                } : function(e) {
                    s.log(e)
                }), e.onPotentiallyUnhandledRejection = function(e) {
                    h(p, e)
                }, e.onPotentiallyUnhandledRejectionHandled = function(e) {
                    h(d, e)
                }, e.onFatalRejection = function(e) {
                    h(o, e.value)
                };
                var u = [],
                    c = [],
                    l = null;

                function p(e) {
                    e.handled || (c.push(e), a("Potentially unhandled rejection [" + e.id + "] " + n.formatError(e.value)))
                }

                function d(e) {
                    var t = c.indexOf(e);
                    t >= 0 && (c.splice(t, 1), i("Handled previous rejection [" + e.id + "] " + n.formatObject(e.value)))
                }

                function h(e, s) {
                    u.push(e, s), null === l && (l = t(f, 0))
                }

                function f() {
                    for (l = null; u.length > 0;) u.shift()(u.shift())
                }
                return e
            };

            function o(e) {
                throw e
            }

            function r() {}
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return function(e) {
                return e.prototype.with = e.prototype.withThis = function(e) {
                    var t = this._beget(),
                        s = t._handler;
                    return s.receiver = e, this._handler.chain(s, e), t
                }, e
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return function(e) {
                return e.prototype.progress = function(e) {
                    return this.then(void 0, void 0, e)
                }, e
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return function(e) {
                var t = e.resolve;
                return e.iterate = function(e, t, n, o) {
                    return s(function(t) {
                        return [t, e(t)]
                    }, t, n, o)
                }, e.unfold = s, e;

                function s(e, n, o, r) {
                    return t(r).then(function(s) {
                        return t(n(s)).then(function(n) {
                            return n ? s : t(e(s)).spread(a)
                        })
                    });

                    function a(r, a) {
                        return t(o(r)).then(function() {
                            return s(e, n, o, a)
                        })
                    }
                }
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function(e) {
            var t = s(9).inspect;
            return function(e) {
                return e.prototype.inspect = function() {
                    return t(e._handler(this))
                }, e
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return function(e) {
                return e.prototype.fold = function(t, s) {
                    var n = this._beget();
                    return this._handler.fold(function(s, n, o) {
                        e._handler(s).fold(function(e, s, n) {
                            n.resolve(t.call(this, s, e))
                        }, n, this, o)
                    }, s, n._handler.receiver, n._handler), n
                }, e
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function() {
            return function(s) {
                var n = s.resolve,
                    o = s.reject,
                    r = s.prototype.catch;

                function a(e, t, s, o) {
                    var r, a = e.call(t);
                    return "object" != typeof(r = a) && "function" != typeof r || null === r ? s(o) : function(e, t, s) {
                        return n(a).then(function() {
                            return t(s)
                        })
                    }(0, s, o)
                }
                return s.prototype.done = function(e, t) {
                    this._handler.visit(this._handler.receiver, e, t)
                }, s.prototype.catch = s.prototype.otherwise = function(t) {
                    return arguments.length < 2 ? r.call(this, t) : "function" != typeof t ? this.ensure(e) : r.call(this, (s = arguments[1], n = t, function(e) {
                        return function(e, t) {
                            return t === Error || null != t && t.prototype instanceof Error ? e instanceof t : t(e)
                        }(e, n) ? s.call(this, e) : o(e)
                    }));
                    var s, n
                }, s.prototype.finally = s.prototype.ensure = function(e) {
                    return "function" != typeof e ? this : this.then(function(s) {
                        return a(e, this, t, s)
                    }, function(t) {
                        return a(e, this, o, t)
                    })
                }, s.prototype.else = s.prototype.orElse = function(e) {
                    return this.then(void 0, function() {
                        return e
                    })
                }, s.prototype.yield = function(e) {
                    return this.then(function() {
                        return e
                    })
                }, s.prototype.tap = function(e) {
                    return this.then(e).yield(this)
                }, s
            };

            function e() {
                throw new TypeError("catch predicate must be a function")
            }

            function t(e) {
                return e
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function(e) {
            var t = s(9),
                n = s(8);
            return function(e) {
                var s = n(e),
                    o = e.resolve,
                    r = e.all,
                    a = Array.prototype.reduce,
                    i = Array.prototype.reduceRight,
                    u = Array.prototype.slice;
                return e.any = function(t) {
                    for (var s, n, o = e._defer(), r = o._handler, a = t.length >>> 0, i = a, u = [], c = 0; c < a; ++c)
                        if (void 0 !== (n = t[c]) || c in t) {
                            if ((s = e._handler(n)).state() > 0) {
                                r.become(s), e._visitRemaining(t, c, s);
                                break
                            }
                            s.visit(r, l, p)
                        } else --i;
                    return 0 === i && r.reject(new RangeError("any(): array must not be empty")), o;

                    function l(e) {
                        u = null, this.resolve(e)
                    }

                    function p(e) {
                        this.resolved || (u.push(e), 0 == --i && this.reject(u))
                    }
                }, e.some = function(t, s) {
                    var n, o, r, a = e._defer(),
                        i = a._handler,
                        u = [],
                        c = [],
                        l = t.length >>> 0,
                        p = 0;
                    for (r = 0; r < l; ++r)(void 0 !== (o = t[r]) || r in t) && ++p;
                    for (s = Math.max(s, 0), n = p - s + 1, s > (p = Math.min(s, p)) ? i.reject(new RangeError("some(): array must contain at least " + s + " item(s), but had " + p)) : 0 === p && i.resolve(u), r = 0; r < l; ++r)(void 0 !== (o = t[r]) || r in t) && e._handler(o).visit(i, d, h, i.notify);
                    return a;

                    function d(e) {
                        this.resolved || (u.push(e), 0 == --p && (c = null, this.resolve(u)))
                    }

                    function h(e) {
                        this.resolved || (c.push(e), 0 == --n && (u = null, this.reject(c)))
                    }
                }, e.settle = function(e) {
                    return r(e.map(c))
                }, e.map = function(t, s) {
                    return e._traverse(s, t)
                }, e.filter = function(t, s) {
                    var n = u.call(t);
                    return e._traverse(s, n).then(function(t) {
                        return function(t, s) {
                            for (var n = s.length, o = new Array(n), r = 0, a = 0; r < n; ++r) s[r] && (o[a++] = e._handler(t[r]).value);
                            return o.length = a, o
                        }(n, t)
                    })
                }, e.reduce = function(e, t) {
                    return arguments.length > 2 ? a.call(e, l(t), arguments[2]) : a.call(e, l(t))
                }, e.reduceRight = function(e, t) {
                    return arguments.length > 2 ? i.call(e, l(t), arguments[2]) : i.call(e, l(t))
                }, e.prototype.spread = function(e) {
                    return this.then(r).then(function(t) {
                        return e.apply(this, t)
                    })
                }, e;

                function c(s) {
                    var n;
                    return s instanceof e && (n = s._handler.join()), n && 0 === n.state() || !n ? o(s).then(t.fulfilled, t.rejected) : (n._unreport(), t.inspect(n))
                }

                function l(e) {
                    return function(t, n, o) {
                        return s(e, void 0, [t, n, o])
                    }
                }
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t) {}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function(e) {
            var t = s(1),
                n = s(10);

            function o(e, s, n, o) {
                return t.setTimer(function() {
                    e(n, o, s)
                }, s)
            }
            return function(e) {
                function s(e, t, s) {
                    o(r, e, t, s)
                }

                function r(e, t) {
                    t.resolve(e)
                }

                function a(e, t, s) {
                    var o = void 0 === e ? new n("timed out after " + s + "ms") : e;
                    t.reject(o)
                }
                return e.prototype.delay = function(e) {
                    var t = this._beget();
                    return this._handler.fold(s, e, void 0, t._handler), t
                }, e.prototype.timeout = function(e, s) {
                    var n = this._beget(),
                        r = n._handler,
                        i = o(a, e, s, n._handler);
                    return this._handler.visit(r, function(e) {
                        t.clearTimer(i), this.resolve(e)
                    }, function(e) {
                        t.clearTimer(i), this.reject(e)
                    }, r.notify), n
                }, e
            }
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    var n;
    ! function(o) {
        "use strict";
        void 0 === (n = function(e) {
            var t = s(31),
                n = s(29),
                o = s(28),
                r = s(27),
                a = s(26),
                i = s(25),
                u = s(24),
                c = s(23),
                l = s(22),
                p = s(10),
                d = [n, o, r, i, u, a, c, t, l].reduce(function(e, t) {
                    return t(e)
                }, s(20)),
                h = s(8)(d);

            function f(e, t, s, n) {
                var o = d.resolve(e);
                return arguments.length < 2 ? o : o.then(t, s, n)
            }

            function v(e) {
                return function() {
                    for (var t = 0, s = arguments.length, n = new Array(s); t < s; ++t) n[t] = arguments[t];
                    return h(e, this, n)
                }
            }

            function m(e) {
                for (var t = 0, s = arguments.length - 1, n = new Array(s); t < s; ++t) n[t] = arguments[t + 1];
                return h(e, this, n)
            }
            return f.promise = function(e) {
                return new d(e)
            }, f.resolve = d.resolve, f.reject = d.reject, f.lift = v, f.try = m, f.attempt = m, f.iterate = d.iterate, f.unfold = d.unfold, f.join = function() {
                return d.all(arguments)
            }, f.all = function(e) {
                return f(e, d.all)
            }, f.settle = function(e) {
                return f(e, d.settle)
            }, f.any = v(d.any), f.some = v(d.some), f.race = v(d.race), f.map = function(e, t) {
                return f(e, function(e) {
                    return d.map(e, t)
                })
            }, f.filter = function(e, t) {
                return f(e, function(e) {
                    return d.filter(e, t)
                })
            }, f.reduce = v(d.reduce), f.reduceRight = v(d.reduceRight), f.isPromiseLike = function(e) {
                return e && "function" == typeof e.then
            }, f.Promise = d, f.defer = function() {
                return new function() {
                    var e = d._defer();

                    function t(t) {
                        e._handler.resolve(t)
                    }

                    function s(t) {
                        e._handler.reject(t)
                    }

                    function n(t) {
                        e._handler.notify(t)
                    }
                    this.promise = e, this.resolve = t, this.reject = s, this.notify = n, this.resolver = {
                        resolve: t,
                        reject: s,
                        notify: n
                    }
                }
            }, f.TimeoutError = p, f
        }.call(t, s, t, e)) || (e.exports = n)
    }(s(0))
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function() {
        for (var e = arguments.length, t = Array(e), s = 0; s < e; s++) t[s] = arguments[s];
        if ("function" == typeof t[0]) throw new SyntaxError("@mixin decorator '" + t[0].name + "' requires at least one mixin");
        return function(e) {
            for (var s = e.prototype, n = {}, o = 0, r = t.length; o < r; o++) {
                var a = t[o];
                for (var i in a) {
                    var u = a[i];
                    "function" == typeof u ? (n[i] = n[i] || [], n[i].push(u)) : s[i] = u
                }
            }
            var c = function(e) {
                var t = n[e],
                    o = s[e];
                s[e] = function() {
                    for (var e = void 0, s = arguments.length, n = Array(s), r = 0; r < s; r++) n[r] = arguments[r];
                    for (var a = 0, i = t.length; a < i; a++) {
                        e = t[a].apply(this, n)
                    }
                    return "function" == typeof o && (e = o.apply(this, n)), e
                }
            };
            for (var l in n) c(l)
        }
    }, e.exports = t.default
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e, t, s) {
        if (void 0 === s || "function" != typeof s.value) throw new SyntaxError("@bind decorator can only be applied to a method");
        var n = s.value;
        return {
            configurable: s.configurable,
            enumerable: s.enumerable,
            get: function() {
                if (this === e) return n;
                var s = n.bind(this);
                return Object.defineProperty(this, t, {
                    configurable: !0,
                    writable: !0,
                    enumerable: !1,
                    value: s
                }), s
            }
        }
    }, e.exports = t.default
}, function(e, t, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = r(s(34)),
        o = r(s(33));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.default = {
        bind: n.default,
        mixin: o.default
    }, e.exports = t.default
}, function(e, t, s) {
    "use strict";
    (function(n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = void 0;
        var o, r = s(32),
            a = s(7);

        function i(e, t) {
            for (var s = 0; s < t.length; s++) {
                var n = t[s];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var u, c, l, p, d, h, f = (0, a.getLogger)("EventWorker", a.INFO, !1),
            v = (u = (o = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._ctx = t, this._binded = !1, this._listeners = []
                }
                var t, s;
                return t = e, (s = [{
                    key: "add",
                    value: function(e, t) {
                        this._binded || this._bind(), this._listeners.push({
                            eventName: e,
                            cb: t
                        }), f("'".concat(e, "' added"))
                    }
                }, {
                    key: "addOnce",
                    value: function(e) {
                        var t = (0, r.defer)();
                        return this._binded || this._bind(), this._listeners.push({
                            eventName: e,
                            cb: t.resolve
                        }), f("'".concat(e, "' added once")), t.promise
                    }
                }, {
                    key: "remove",
                    value: function(e) {
                        var t = this._getListener(e),
                            s = this._listeners.indexOf(t);
                        s > -1 && this._listeners.splice(s, 1), f("'".concat(e, "' removed"))
                    }
                }, {
                    key: "dispatch",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        this._ctx.postMessage({
                            eventName: e,
                            payload: t
                        }), f("'".concat(e, "' dispatched with payload :"), t)
                    }
                }, {
                    key: "_bind",
                    value: function() {
                        this._binded = !0, this._ctx.addEventListener("message", this._onWorkerMessage)
                    }
                }, {
                    key: "_getListener",
                    value: function(e) {
                        for (var t = 0, s = this._listeners.length; t < s; t++) {
                            var n = this._listeners[t];
                            if (n.eventName === e) return n
                        }
                        return null
                    }
                }, {
                    key: "_onWorkerMessage",
                    value: function(e) {
                        for (var t = e.data, s = t.eventName, n = t.payload || null, o = 0, r = this._listeners.length; o < r; o++) {
                            var a = this._listeners[o];
                            a.eventName === s && a.cb(n)
                        }
                    }
                }]) && i(t.prototype, s), e
            }()).prototype, c = "_onWorkerMessage", l = [n], p = Object.getOwnPropertyDescriptor(o.prototype, "_onWorkerMessage"), d = o.prototype, h = {}, Object.keys(p).forEach(function(e) {
                h[e] = p[e]
            }), h.enumerable = !!h.enumerable, h.configurable = !!h.configurable, ("value" in h || h.initializer) && (h.writable = !0), h = l.slice().reverse().reduce(function(e, t) {
                return t(u, c, e) || e
            }, h), d && void 0 !== h.initializer && (h.value = h.initializer ? h.initializer.call(d) : void 0, h.initializer = void 0), void 0 === h.initializer && (Object.defineProperty(u, c, h), h = null), o);
        t.default = v, e.exports = t.default
    }).call(this, s(35).bind)
}, function(e, t, s) {
    "use strict";
    var n = a(s(36)),
        o = a(s(17)),
        r = a(s(12));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var i = new n.default(self),
        u = {},
        c = function(e, t, s) {
            for (var n = [], o = new r.default(t, s), a = 0, u = t.length; a < u; a++) {
                var c = t[a][0],
                    l = o.get(c),
                    p = "".concat(e, ".").concat(c.replace(/\.[^/.]+$/, "").replace(/\//g, ".")),
                    d = o.getType(c),
                    h = c.substr(c.lastIndexOf(".") + 1);
                n.push({
                    id: p,
                    path: c,
                    type: d,
                    extension: h,
                    data: l
                })
            }
            i.dispatch("loaded:".concat(e), n)
        };
    i.add("load", function(e) {
        var t = new o.default(e);
        t.load(c), t.onProgress.add(function(t) {
            var s = t.progress;
            return i.dispatch("progress:".concat(e), s)
        }), u[e] = t
    }), i.add("abort", function(e) {
        var t = u[e];
        t && t.loading && t.abort()
    })
}]);