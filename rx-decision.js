(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)
                    return a(o, !0);
                if (i)
                    return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND",
                f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
        s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var isValidString = function isValidString(param) {
            return typeof param === "string" && param.length > 0
        };
        var startsWith = function startsWith(string, start) {
            return string[0] === start
        };
        var isSelector = function isSelector(param) {
            return isValidString(param) && (startsWith(param, ".") || startsWith(param, "#"))
        };
        var node = function node(h) {
            return function(tagName) {
                return function(first) {
                    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        rest[_key - 1] = arguments[_key]
                    }
                    if (isSelector(first)) {
                        return h.apply(undefined, [tagName + first].concat(rest))
                    } else {
                        return h.apply(undefined, [tagName, first].concat(rest))
                    }
                }
            }
        };
        var TAG_NAMES = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "dd", "del", "dfn", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "nav", "noscript", "object", "ol", "optgroup", "option", "p", "param", "pre", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title", "tr", "u", "ul", "video", "progress"];
        exports["default"] = function(h) {
            var createTag = node(h);
            var exported = {
                TAG_NAMES: TAG_NAMES,
                isSelector: isSelector,
                createTag: createTag
            };
            TAG_NAMES.forEach(function(n) {
                exported[n] = createTag(n)
            });
            return exported
        }
        ;
        module.exports = exports["default"]
    }
    , {}],
    2: [function(require, module, exports) {
        var VNode = require("./vnode");
        var is = require("./is");
        function addNS(data, children) {
            data.ns = "http://www.w3.org/2000/svg";
            if (children !== undefined) {
                for (var i = 0; i < children.length; ++i) {
                    addNS(children[i].data, children[i].children)
                }
            }
        }
        module.exports = function h(sel, b, c) {
            var data = {}, children, text, i;
            if (arguments.length === 3) {
                data = b;
                if (is.array(c)) {
                    children = c
                } else if (is.primitive(c)) {
                    text = c
                }
            } else if (arguments.length === 2) {
                if (is.array(b)) {
                    children = b
                } else if (is.primitive(b)) {
                    text = b
                } else {
                    data = b
                }
            }
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    if (is.primitive(children[i]))
                        children[i] = VNode(undefined, undefined, undefined, children[i])
                }
            }
            if (sel[0] === "s" && sel[1] === "v" && sel[2] === "g") {
                addNS(data, children)
            }
            return VNode(sel, data, children, text, undefined)
        }
    }
    , {
        "./is": 4,
        "./vnode": 10
    }],
    3: [function(require, module, exports) {
        function createElement(tagName) {
            return document.createElement(tagName)
        }
        function createElementNS(namespaceURI, qualifiedName) {
            return document.createElementNS(namespaceURI, qualifiedName)
        }
        function createTextNode(text) {
            return document.createTextNode(text)
        }
        function insertBefore(parentNode, newNode, referenceNode) {
            parentNode.insertBefore(newNode, referenceNode)
        }
        function removeChild(node, child) {
            node.removeChild(child)
        }
        function appendChild(node, child) {
            node.appendChild(child)
        }
        function parentNode(node) {
            return node.parentElement
        }
        function nextSibling(node) {
            return node.nextSibling
        }
        function tagName(node) {
            return node.tagName
        }
        function setTextContent(node, text) {
            node.textContent = text
        }
        module.exports = {
            createElement: createElement,
            createElementNS: createElementNS,
            createTextNode: createTextNode,
            appendChild: appendChild,
            removeChild: removeChild,
            insertBefore: insertBefore,
            parentNode: parentNode,
            nextSibling: nextSibling,
            tagName: tagName,
            setTextContent: setTextContent
        }
    }
    , {}],
    4: [function(require, module, exports) {
        module.exports = {
            array: Array.isArray,
            primitive: function(s) {
                return typeof s === "string" || typeof s === "number"
            }
        }
    }
    , {}],
    5: [function(require, module, exports) {
        var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];
        var booleanAttrsDict = {};
        for (var i = 0, len = booleanAttrs.length; i < len; i++) {
            booleanAttrsDict[booleanAttrs[i]] = true
        }
        function updateAttrs(oldVnode, vnode) {
            var key, cur, old, elm = vnode.elm, oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
            for (key in attrs) {
                cur = attrs[key];
                old = oldAttrs[key];
                if (old !== cur) {
                    if (!cur && booleanAttrsDict[key])
                        elm.removeAttribute(key);
                    else
                        elm.setAttribute(key, cur)
                }
            }
            for (key in oldAttrs) {
                if (!(key in attrs)) {
                    elm.removeAttribute(key)
                }
            }
        }
        module.exports = {
            create: updateAttrs,
            update: updateAttrs
        }
    }
    , {}],
    6: [function(require, module, exports) {
        function updateClass(oldVnode, vnode) {
            var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class || {}, klass = vnode.data.class || {};
            for (name in oldClass) {
                if (!klass[name]) {
                    elm.classList.remove(name)
                }
            }
            for (name in klass) {
                cur = klass[name];
                if (cur !== oldClass[name]) {
                    elm.classList[cur ? "add" : "remove"](name)
                }
            }
        }
        module.exports = {
            create: updateClass,
            update: updateClass
        }
    }
    , {}],
    7: [function(require, module, exports) {
        function updateProps(oldVnode, vnode) {
            var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
            for (key in oldProps) {
                if (!props[key]) {
                    delete elm[key]
                }
            }
            for (key in props) {
                cur = props[key];
                old = oldProps[key];
                if (old !== cur && (key !== "value" || elm[key] !== cur)) {
                    elm[key] = cur
                }
            }
        }
        module.exports = {
            create: updateProps,
            update: updateProps
        }
    }
    , {}],
    8: [function(require, module, exports) {
        var raf = typeof window !== "undefined" && window.requestAnimationFrame || setTimeout;
        var nextFrame = function(fn) {
            raf(function() {
                raf(fn)
            })
        };
        function setNextFrame(obj, prop, val) {
            nextFrame(function() {
                obj[prop] = val
            })
        }
        function updateStyle(oldVnode, vnode) {
            var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style || {}, style = vnode.data.style || {}, oldHasDel = "delayed"in oldStyle;
            for (name in oldStyle) {
                if (!style[name]) {
                    elm.style[name] = ""
                }
            }
            for (name in style) {
                cur = style[name];
                if (name === "delayed") {
                    for (name in style.delayed) {
                        cur = style.delayed[name];
                        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
                            setNextFrame(elm.style, name, cur)
                        }
                    }
                } else if (name !== "remove" && cur !== oldStyle[name]) {
                    elm.style[name] = cur
                }
            }
        }
        function applyDestroyStyle(vnode) {
            var style, name, elm = vnode.elm, s = vnode.data.style;
            if (!s || !(style = s.destroy))
                return;
            for (name in style) {
                elm.style[name] = style[name]
            }
        }
        function applyRemoveStyle(vnode, rm) {
            var s = vnode.data.style;
            if (!s || !s.remove) {
                rm();
                return
            }
            var name, elm = vnode.elm, idx, i = 0, maxDur = 0, compStyle, style = s.remove, amount = 0, applied = [];
            for (name in style) {
                applied.push(name);
                elm.style[name] = style[name]
            }
            compStyle = getComputedStyle(elm);
            var props = compStyle["transition-property"].split(", ");
            for (; i < props.length; ++i) {
                if (applied.indexOf(props[i]) !== -1)
                    amount++
            }
            elm.addEventListener("transitionend", function(ev) {
                if (ev.target === elm)
                    --amount;
                if (amount === 0)
                    rm()
            })
        }
        module.exports = {
            create: updateStyle,
            update: updateStyle,
            destroy: applyDestroyStyle,
            remove: applyRemoveStyle
        }
    }
    , {}],
    9: [function(require, module, exports) {
        "use strict";
        var VNode = require("./vnode");
        var is = require("./is");
        var domApi = require("./htmldomapi.js");
        function isUndef(s) {
            return s === undefined
        }
        function isDef(s) {
            return s !== undefined
        }
        var emptyNode = VNode("", {}, [], undefined, undefined);
        function sameVnode(vnode1, vnode2) {
            return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
        }
        function createKeyToOldIdx(children, beginIdx, endIdx) {
            var i, map = {}, key;
            for (i = beginIdx; i <= endIdx; ++i) {
                key = children[i].key;
                if (isDef(key))
                    map[key] = i
            }
            return map
        }
        var hooks = ["create", "update", "remove", "destroy", "pre", "post"];
        function init(modules, api) {
            var i, j, cbs = {};
            if (isUndef(api))
                api = domApi;
            for (i = 0; i < hooks.length; ++i) {
                cbs[hooks[i]] = [];
                for (j = 0; j < modules.length; ++j) {
                    if (modules[j][hooks[i]] !== undefined)
                        cbs[hooks[i]].push(modules[j][hooks[i]])
                }
            }
            function emptyNodeAt(elm) {
                return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm)
            }
            function createRmCb(childElm, listeners) {
                return function() {
                    if (--listeners === 0) {
                        var parent = api.parentNode(childElm);
                        api.removeChild(parent, childElm)
                    }
                }
            }
            function createElm(vnode, insertedVnodeQueue) {
                var i, thunk, data = vnode.data;
                if (isDef(data)) {
                    if (isDef(i = data.hook) && isDef(i = i.init))
                        i(vnode);
                    if (isDef(i = data.vnode)) {
                        thunk = vnode;
                        vnode = i
                    }
                }
                var elm, children = vnode.children, sel = vnode.sel;
                if (isDef(sel)) {
                    var hashIdx = sel.indexOf("#");
                    var dotIdx = sel.indexOf(".", hashIdx);
                    var hash = hashIdx > 0 ? hashIdx : sel.length;
                    var dot = dotIdx > 0 ? dotIdx : sel.length;
                    var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
                    elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
                    if (hash < dot)
                        elm.id = sel.slice(hash + 1, dot);
                    if (dotIdx > 0)
                        elm.className = sel.slice(dot + 1).replace(/\./g, " ");
                    if (is.array(children)) {
                        for (i = 0; i < children.length; ++i) {
                            api.appendChild(elm, createElm(children[i], insertedVnodeQueue))
                        }
                    } else if (is.primitive(vnode.text)) {
                        api.appendChild(elm, api.createTextNode(vnode.text))
                    }
                    for (i = 0; i < cbs.create.length; ++i)
                        cbs.create[i](emptyNode, vnode);
                    i = vnode.data.hook;
                    if (isDef(i)) {
                        if (i.create)
                            i.create(emptyNode, vnode);
                        if (i.insert)
                            insertedVnodeQueue.push(vnode)
                    }
                } else {
                    elm = vnode.elm = api.createTextNode(vnode.text)
                }
                if (isDef(thunk))
                    thunk.elm = vnode.elm;
                return vnode.elm
            }
            function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
                for (; startIdx <= endIdx; ++startIdx) {
                    api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before)
                }
            }
            function invokeDestroyHook(vnode) {
                var i, j, data = vnode.data;
                if (isDef(data)) {
                    if (isDef(i = data.hook) && isDef(i = i.destroy))
                        i(vnode);
                    for (i = 0; i < cbs.destroy.length; ++i)
                        cbs.destroy[i](vnode);
                    if (isDef(i = vnode.children)) {
                        for (j = 0; j < vnode.children.length; ++j) {
                            invokeDestroyHook(vnode.children[j])
                        }
                    }
                    if (isDef(i = data.vnode))
                        invokeDestroyHook(i)
                }
            }
            function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
                for (; startIdx <= endIdx; ++startIdx) {
                    var i, listeners, rm, ch = vnodes[startIdx];
                    if (isDef(ch)) {
                        if (isDef(ch.sel)) {
                            invokeDestroyHook(ch);
                            listeners = cbs.remove.length + 1;
                            rm = createRmCb(ch.elm, listeners);
                            for (i = 0; i < cbs.remove.length; ++i)
                                cbs.remove[i](ch, rm);
                            if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
                                i(ch, rm)
                            } else {
                                rm()
                            }
                        } else {
                            api.removeChild(parentElm, ch.elm)
                        }
                    }
                }
            }
            function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
                var oldStartIdx = 0
                  , newStartIdx = 0;
                var oldEndIdx = oldCh.length - 1;
                var oldStartVnode = oldCh[0];
                var oldEndVnode = oldCh[oldEndIdx];
                var newEndIdx = newCh.length - 1;
                var newStartVnode = newCh[0];
                var newEndVnode = newCh[newEndIdx];
                var oldKeyToIdx, idxInOld, elmToMove, before;
                while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                    if (isUndef(oldStartVnode)) {
                        oldStartVnode = oldCh[++oldStartIdx]
                    } else if (isUndef(oldEndVnode)) {
                        oldEndVnode = oldCh[--oldEndIdx]
                    } else if (sameVnode(oldStartVnode, newStartVnode)) {
                        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                        oldStartVnode = oldCh[++oldStartIdx];
                        newStartVnode = newCh[++newStartIdx]
                    } else if (sameVnode(oldEndVnode, newEndVnode)) {
                        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                        oldEndVnode = oldCh[--oldEndIdx];
                        newEndVnode = newCh[--newEndIdx]
                    } else if (sameVnode(oldStartVnode, newEndVnode)) {
                        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                        oldStartVnode = oldCh[++oldStartIdx];
                        newEndVnode = newCh[--newEndIdx]
                    } else if (sameVnode(oldEndVnode, newStartVnode)) {
                        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                        oldEndVnode = oldCh[--oldEndIdx];
                        newStartVnode = newCh[++newStartIdx]
                    } else {
                        if (isUndef(oldKeyToIdx))
                            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                        idxInOld = oldKeyToIdx[newStartVnode.key];
                        if (isUndef(idxInOld)) {
                            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                            newStartVnode = newCh[++newStartIdx]
                        } else {
                            elmToMove = oldCh[idxInOld];
                            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                            oldCh[idxInOld] = undefined;
                            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                            newStartVnode = newCh[++newStartIdx]
                        }
                    }
                }
                if (oldStartIdx > oldEndIdx) {
                    before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
                    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
                } else if (newStartIdx > newEndIdx) {
                    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
                }
            }
            function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
                var i, hook;
                if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
                    i(oldVnode, vnode)
                }
                if (isDef(i = oldVnode.data) && isDef(i = i.vnode))
                    oldVnode = i;
                if (isDef(i = vnode.data) && isDef(i = i.vnode)) {
                    patchVnode(oldVnode, i, insertedVnodeQueue);
                    vnode.elm = i.elm;
                    return
                }
                var elm = vnode.elm = oldVnode.elm
                  , oldCh = oldVnode.children
                  , ch = vnode.children;
                if (oldVnode === vnode)
                    return;
                if (!sameVnode(oldVnode, vnode)) {
                    var parentElm = api.parentNode(oldVnode.elm);
                    elm = createElm(vnode, insertedVnodeQueue);
                    api.insertBefore(parentElm, elm, oldVnode.elm);
                    removeVnodes(parentElm, [oldVnode], 0, 0);
                    return
                }
                if (isDef(vnode.data)) {
                    for (i = 0; i < cbs.update.length; ++i)
                        cbs.update[i](oldVnode, vnode);
                    i = vnode.data.hook;
                    if (isDef(i) && isDef(i = i.update))
                        i(oldVnode, vnode)
                }
                if (isUndef(vnode.text)) {
                    if (isDef(oldCh) && isDef(ch)) {
                        if (oldCh !== ch)
                            updateChildren(elm, oldCh, ch, insertedVnodeQueue)
                    } else if (isDef(ch)) {
                        if (isDef(oldVnode.text))
                            api.setTextContent(elm, "");
                        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
                    } else if (isDef(oldCh)) {
                        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
                    } else if (isDef(oldVnode.text)) {
                        api.setTextContent(elm, "")
                    }
                } else if (oldVnode.text !== vnode.text) {
                    api.setTextContent(elm, vnode.text)
                }
                if (isDef(hook) && isDef(i = hook.postpatch)) {
                    i(oldVnode, vnode)
                }
            }
            return function(oldVnode, vnode) {
                var i, elm, parent;
                var insertedVnodeQueue = [];
                for (i = 0; i < cbs.pre.length; ++i)
                    cbs.pre[i]();
                if (isUndef(oldVnode.sel)) {
                    oldVnode = emptyNodeAt(oldVnode)
                }
                if (sameVnode(oldVnode, vnode)) {
                    patchVnode(oldVnode, vnode, insertedVnodeQueue)
                } else {
                    elm = oldVnode.elm;
                    parent = api.parentNode(elm);
                    createElm(vnode, insertedVnodeQueue);
                    if (parent !== null) {
                        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                        removeVnodes(parent, [oldVnode], 0, 0)
                    }
                }
                for (i = 0; i < insertedVnodeQueue.length; ++i) {
                    insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i])
                }
                for (i = 0; i < cbs.post.length; ++i)
                    cbs.post[i]();
                return vnode
            }
        }
        module.exports = {
            init: init
        }
    }
    , {
        "./htmldomapi.js": 3,
        "./is": 4,
        "./vnode": 10
    }],
    10: [function(require, module, exports) {
        module.exports = function(sel, data, children, text, elm) {
            var key = data === undefined ? undefined : data.key;
            return {
                sel: sel,
                data: data,
                children: children,
                text: text,
                elm: elm,
                key: key
            }
        }
    }
    , {}],
    11: [function(require, module, exports) {
        "use strict";
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i)
                            break
                    }
                } catch (err) {
                    _d = true;
                    _e = err
                } finally {
                    try {
                        if (!_n && _i["return"])
                            _i["return"]()
                    } finally {
                        if (_d)
                            throw _e
                    }
                }
                return _arr
            }
            return function(arr, i) {
                if (Array.isArray(arr)) {
                    return arr
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i)
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }
        }();
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key]
                    }
                }
            }
            return target
        }
        ;
        var snabbdom = require("snabbdom");
        var classModule = require("snabbdom/modules/class");
        var propsModule = require("snabbdom/modules/props");
        var styleModule = require("snabbdom/modules/style");
        var attrsModule = require("snabbdom/modules/attributes");
        var h = require("snabbdom/h");
        var _require = require("hyperscript-helpers")(h)
          , div = _require.div
          , h4 = _require.h4
          , p = _require.p
          , li = _require.li
          , ul = _require.ul
          , a = _require.a
          , span = _require.span;
        var tree = require("./tree.json");
        var patch = snabbdom.init([classModule, propsModule, styleModule, attrsModule]);
        function intent(containerElem) {
            var click$ = Rx.Observable.fromEvent(containerElem, "click");
            var chooseOption$ = click$.filter(function(ev) {
                return ev.target.className === "option"
            }).map(function(ev) {
                return {
                    type: "CHOOSE_OPTION",
                    payload: parseInt(ev.target.dataset.index)
                }
            });
            var undo$ = click$.filter(function(ev) {
                return ev.target.className === "undo"
            }).map(function() {
                return {
                    type: "UNDO"
                }
            });
            var reset$ = click$.filter(function(ev) {
                return ev.target.className === "reset"
            }).map(function() {
                return {
                    type: "RESET"
                }
            });
            return Rx.Observable.merge(chooseOption$, undo$, reset$)
        }
        function model(action$) {
            var initialState = {
                tree: tree,
                current: []
            };
            var selectReducer$ = action$.filter(function(action) {
                return action.type === "CHOOSE_OPTION"
            }).map(function(action) {
                return function(state) {
                    return _extends({}, state, {
                        current: state.current.concat(action.payload)
                    })
                }
            });
            var undoReducer$ = action$.filter(function(action) {
                return action.type === "UNDO"
            }).map(function() {
                return function(state) {
                    var newCurrent = state.current.slice();
                    newCurrent.pop();
                    return _extends({}, state, {
                        current: newCurrent
                    })
                }
            });
            var resetReducer$ = action$.filter(function(action) {
                return action.type === "RESET"
            }).map(function() {
                return function(state) {
                    return initialState
                }
            });
            return Rx.Observable.merge(selectReducer$, undoReducer$, resetReducer$).scan(function(state, reducer) {
                return reducer(state)
            }, initialState).startWith(initialState)
        }
        function viewModel(state$) {
            return state$.map(function(state) {
                var previous = [];
                var currentTree = state.tree;
                for (var i = 0; i < state.current.length; i++) {
                    previous.push(currentTree.children[state.current[i]].label);
                    currentTree = currentTree.children[state.current[i]]
                }
                previous = previous.join(" ");
                return {
                    previous: previous,
                    options: currentTree.children
                }
            })
        }
        function renderCurrentSentence(state) {
            var WELCOME_SENTENCE = "Do you need to find an operator for your problem? " + "Start by choosing an option from the list below:";
            return p(".current-sentence", [!state.previous ? WELCOME_SENTENCE : null, state.previous ? '"' + state.previous + (state.options.length === 1 ? "." : "...") + '"' : null, state.previous ? span(".undo", "↩ Undo") : null, state.previous ? span(".reset", "Or reset") : null].filter(function(x) {
                return x !== null
            }))
        }
        function renderOption(option, index) {
            var endString = option.children.length > 1 ? "..." : ".";
            return li(".option", {
                attrs: {
                    "data-index": index
                }
            }, "" + option.label + endString)
        }
        var OBSERVABLE_PATH = "./class/es6/Observable.js~Observable.html";
        function renderStaticDecision(option) {
            var label = option.label.replace("Observable.", "");
            return h4(".decision", ["» You want the static operator ", a({
                attrs: {
                    href: OBSERVABLE_PATH + "#static-method-" + label
                }
            }, label), "."])
        }
        function renderInstanceDecision(option) {
            return h4(".decision", ["» You want the instance operator ", a({
                attrs: {
                    href: OBSERVABLE_PATH + "#instance-method-" + option.label
                }
            }, option.label), "."])
        }
        function renderItem(option, index) {
            if (option.children) {
                return renderOption(option, index)
            } else if (option.label.match(/^Observable\./)) {
                return renderStaticDecision(option)
            } else {
                return renderInstanceDecision(option)
            }
        }
        function view(state$) {
            return state$.map(function(state) {
                return div([renderCurrentSentence(state), ul(state.options.map(renderItem))])
            })
        }
        function main(containerElem) {
            var action$ = intent(containerElem);
            var state$ = model(action$);
            var displayState$ = viewModel(state$);
            var vdom$ = view(displayState$);
            return {
                DOM: vdom$
            }
        }
        window.addEventListener("load", function() {
            var container = document.querySelector(".decision-tree-widget");
            var vdom$ = main(container).DOM;
            vdom$.startWith(container).pairwise().subscribe(function(_ref) {
                var _ref2 = _slicedToArray(_ref, 2)
                  , a = _ref2[0]
                  , b = _ref2[1];
                patch(a, b)
            })
        })
    }
    , {
        "./tree.json": 12,
        "hyperscript-helpers": 1,
        snabbdom: 9,
        "snabbdom/h": 2,
        "snabbdom/modules/attributes": 5,
        "snabbdom/modules/class": 6,
        "snabbdom/modules/props": 7,
        "snabbdom/modules/style": 8
    }],
    12: [function(require, module, exports) {
        module.exports = {
            children: [{
                label: "我有一个 Observable, 我想",
                children: [{
                    label: "我想修改每个值",
                    children: [{
                        label: "改成一个常量",
                        children: [{
                            label: "mapTo"
                        }]
                    }, {
                        label: "根据某种公式算出结果",
                        children: [{
                            label: "map"
                        }]
                    }]
                }, {
                    label: "我想拿到每个值的某一个属性",
                    children: [{
                        label: "pluck"
                    }]
                }, {
                    label: "我想在有值产生时做一些事，而不影响数据流",
                    children: [{
                        label: "do"
                    }]
                }, {
                    label: "我想筛选值",
                    children: [{
                        label: "根据自定义规则",
                        children: [{
                            label: "filter"
                        }]
                    }, {
                        label: "只要前几个值里的",
                        children: [{
                            label: "第一个",
                            children: [{
                                label: "first"
                            }]
                        }, {
                            label: "前几个",
                            children: [{
                                label: "take"
                            }]
                        }, {
                            label: "根据自定义规则",
                            children: [{
                                label: "takeWhile"
                            }]
                        }]
                    }, {
                        label: "只要第 n 个值",
                        children: [{
                            label: "elementAt"
                        }]
                    }, {
                        label: "只要倒数几个值里的",
                        children: [{
                            label: "最后一个",
                            children: [{
                                label: "last"
                            }]
                        }, {
                            label: "倒数几个",
                            children: [{
                                label: "takeLast"
                            }]
                        }]
                    }, {
                        label: "直到其他 Observable 产生了值，或者完成了",
                        children: [{
                            label: "takeUntil"
                        }]
                    }]
                }, {
                    label: "我想忽略值",
                    children: [{
                        label: "全部忽略",
                        children: [{
                            label: "ignoreElements"
                        }]
                    }, {
                        label: "忽略前几个",
                        children: [{
                            label: "忽略前 n 个",
                            children: [{
                                label: "skip"
                            }]
                        }, {
                            label: "根据自定义规则",
                            children: [{
                                label: "skipWhile"
                            }]
                        }]
                    }, {
                        label: "直到另一个 Observable 产生了值",
                        children: [{
                            label: "skipUntil"
                        }]
                    }, {
                        label: "忽略之前已经出现过的值",
                        children: [{
                            label: "根据相等",
                            children: [{
                                label: "只有前一个值相等才忽略",
                                children: [{
                                    label: "distinctUntilChanged"
                                }]
                            }, {
                                label: "只要和之前产生过的任何一个值相等就忽略",
                                children: [{
                                    label: "distinct"
                                }]
                            }]
                        }, {
                            label: "根据属性",
                            children: [{
                                label: "只有前一个值的属性相等才忽略",
                                children: [{
                                    label: "distinctUntilKeyChanged"
                                }]
                            }]
                        }]
                    }, {
                        label: "忽略产生太频繁的值",
                        children: [{
                            label: "只需要在一段时间内产生的第一个值",
                            children: [{
                                label: "根据另一个 Observable 来决定一段时间",
                                children: [{
                                    label: "throttle"
                                }]
                            }, {
                                label: "固定一段时间",
                                children: [{
                                    label: "throttleTime"
                                }]
                            }]
                        }, {
                            label: "只需要在一段时间内产生的最后一个值",
                            children: [{
                                label: "根据另一个 Observable 来决定一段时间",
                                children: [{
                                    label: "audit"
                                }]
                            }, {
                                label: "固定一段时间",
                                children: [{
                                    label: "auditTime"
                                }]
                            }]
                        }, {
                            label: "只要一堆连续事件停止以后的最后一个值（debounce）",
                            children: [{
                                label: ' debounce 时间由另一个 Observable 决定',
                                children: [{
                                    label: "debounce"
                                }]
                            }, {
                                label: " debounce 时间固定",
                                children: [{
                                    label: "debounceTime"
                                }]
                            }]
                        }]
                    }]
                }, {
                    label: "我想根据所有产生的值来计算",
                    children: [{
                        label: "只输出最后的计算结果",
                        children: [{
                            label: "reduce"
                        }]
                    }, {
                        label: "每当一个值产生时就输出一次结果",
                        children: [{
                            label: "scan"
                        }]
                    }, {
                        label: "每当一个值产生时，就把值包装成一个 Observable 再输出",
                        children: [{
                            label: "mergeScan"
                        }]
                    }]
                }, {
                    label: "我想添加一些元信息",
                    children: [{
                        label: "比如 (next, error, or complete)",
                        children: [{
                            label: "materialize"
                        }]
                    }, {
                        label: "距离上次产生值的间隔时间",
                        children: [{
                            label: "timeInterval"
                        }]
                    }]
                }, {
                    label: "我想在一段时间后",
                    children: [{
                        label: "抛出一个错误",
                        children: [{
                            label: "timeout"
                        }]
                    }, {
                        label: "切换到另一个 Observable",
                        children: [{
                            label: "timeoutWith"
                        }]
                    }]
                }, {
                    label: "我想确保每个值是唯一的",
                    children: [{
                        label: "single"
                    }]
                }, {
                    label: "我想知道总共产生了多少个值",
                    children: [{
                        label: "count"
                    }]
                }, {
                    label: "我想在数据流最前面添加一个值",
                    children: [{
                        label: "startWith"
                    }]
                }, {
                    label: "我想延时一段时间",
                    children: [{
                        label: "一段固定的时间",
                        children: [{
                            label: "delay"
                        }]
                    }, {
                        label: "根据其他 Observable 决定",
                        children: [{
                            label: "delayWhen"
                        }]
                    }]
                }, {
                    label: "我想组合产生的值",
                    children: [{
                        label: "当 Observable 完成时",
                        children: [{
                            label: "把所有的值变成数组",
                            children: [{
                                label: "toArray"
                            }]
                        }, {
                            label: "转换成 Promise",
                            children: [{
                                label: "toPromise"
                            }]
                        }]
                    }, {
                        label: "把连续的两个值组合成数组",
                        children: [{
                            label: "pairwise"
                        }]
                    }, {
                        label: "根据一个规则，把值分成两个数据流，两个Observable",
                        children: [{
                            label: "partition"
                        }]
                    }, {
                        label: "根据某个特定数量组合",
                        children: [{
                            label: "成为一个数组",
                            children: [{
                                label: "bufferCount"
                            }]
                        }, {
                            label: "成为一个新的 Observable",
                            children: [{
                                label: "windowCount"
                            }]
                        }]
                    }, {
                        label: "根据时间组合",
                        children: [{
                            label: "把一定时间内产生的值组成一个数组",
                            children: [{
                                label: "bufferTime"
                            }]
                        }, {
                            label: "把一定时间内产生的值组成一组，然后产生一个 Observable",
                            children: [{ 
                                label: "windowTime"
                            }]
                        }]
                    }, {
                        label: "until another Observable emits",
                        children: [{
                            label: "and emit the group as an array",
                            children: [{
                                label: "buffer"
                            }]
                        }, {
                            label: "and emit the group as a nested Observable",
                            children: [{
                                label: "window"
                            }]
                        }]
                    }, {
                        label: "based on the emissions of an Observable created on-demand",
                        children: [{
                            label: "and emit the group as an array",
                            children: [{
                                label: "bufferWhen"
                            }]
                        }, {
                            label: "and emit the group as a nested Observable",
                            children: [{
                                label: "windowWhen"
                            }]
                        }]
                    }, {
                        label: "based on another Observable for opening a group, and an Observable for closing a group",
                        children: [{
                            label: "and emit the group as an array",
                            children: [{
                                label: "bufferToggle"
                            }]
                        }, {
                            label: "and emit the group as a nested Observable",
                            children: [{
                                label: "windowToggle"
                            }]
                        }]
                    }, {
                        label: "based on a key calculated from the emitted values",
                        children: [{
                            label: "groupBy"
                        }]
                    }]
                }, {
                    label: "I want to start a new Observable for each value",
                    children: [{
                        label: "and emit the values from all nested Observables in parallel",
                        children: [{
                            label: "where the nested Observable is the same for every value",
                            children: [{
                                label: "mergeMapTo"
                            }]
                        }, {
                            label: "where the nested Observable is calculated for each value",
                            children: [{
                                label: "mergeMap"
                            }]
                        }]
                    }, {
                        label: "and emit the values from each nested Observable in order",
                        children: [{
                            label: "where the nested Observable is the same for every value",
                            children: [{
                                label: "concatMapTo"
                            }]
                        }, {
                            label: "where the nested Observable is calculated for each value",
                            children: [{
                                label: "concatMap"
                            }]
                        }]
                    }, {
                        label: "and cancel the previous nested Observable when a new value arrives",
                        children: [{
                            label: "where the nested Observable is the same for every value",
                            children: [{
                                label: "switchMapTo"
                            }]
                        }, {
                            label: "where the nested Observable is calculated for each value",
                            children: [{
                                label: "switchMap"
                            }]
                        }]
                    }, {
                        label: "and ignore incoming values while the current nested Observable has not yet completed",
                        children: [{
                            label: "exhaustMap"
                        }]
                    }, {
                        label: "and recursively start a new Observable for each new value",
                        children: [{
                            label: "expand"
                        }]
                    }]
                }, {
                    label: "I want to perform custom operations without breaking the chained calls API",
                    children: [{
                        label: "let"
                    }]
                }, {
                    label: "I want to share a subscription between multiple subscribers",
                    children: [{
                        label: "using a conventional Subject",
                        children: [{
                            label: "and start it as soon as the first subscriber arrives",
                            children: [{
                                label: "share"
                            }]
                        }, {
                            label: "and start it manually or imperatively",
                            children: [{
                                label: "publish"
                            }]
                        }]
                    }, {
                        label: "using a BehaviorSubject",
                        children: [{
                            label: "publishBehavior"
                        }]
                    }, {
                        label: "using a ReplaySubject",
                        children: [{
                            label: "publishReplay"
                        }]
                    }, {
                        label: "using an AsyncSubject",
                        children: [{
                            label: "publishLast"
                        }]
                    }, {
                        label: "using a specific subject implementation",
                        children: [{
                            label: "multicast"
                        }]
                    }, {
                        label: "and make it behave like a cache",
                        children: [{
                            label: "cache"
                        }]
                    }]
                }, {
                    label: "when an error occurs",
                    children: [{
                        label: "I want to start a new Observable",
                        children: [{
                            label: "catch"
                        }]
                    }, {
                        label: "I want to re-subscribe",
                        children: [{
                            label: "immediately",
                            children: [{
                                label: "retry"
                            }]
                        }, {
                            label: "when another Observable emits",
                            children: [{
                                label: "retryWhen"
                            }]
                        }]
                    }]
                }, {
                    label: "when it completes",
                    children: [{
                        label: "I want to re-subscribe",
                        children: [{
                            label: "immediately",
                            children: [{
                                label: "repeat"
                            }]
                        }, {
                            label: "when another Observable emits",
                            children: [{
                                label: "repeatWhen"
                            }]
                        }]
                    }, {
                        label: "I want to start a new Observable",
                        children: [{
                            label: "concat"
                        }]
                    }]
                }, {
                    label: "when it completes, errors or unsubscribes, I want to execute a function",
                    children: [{
                        label: "finally"
                    }]
                }, {
                    label: "I want to change the scheduler",
                    children: [{
                        label: "that routes calls to subscribe",
                        children: [{
                            label: "subscribeOn"
                        }]
                    }, {
                        label: "that routes values to observers",
                        children: [{
                            label: "observeOn"
                        }]
                    }]
                }, {
                    label: "I want to combine this Observable with others, and",
                    children: [{
                        label: "I want to receive values only from the Observable that emits a value first",
                        children: [{
                            label: "race"
                        }]
                    }, {
                        label: "I want to output the values from either of them",
                        children: [{
                            label: "Observable.merge"
                        }]
                    }, {
                        label: "I want to output a value computed from values of the source Observables",
                        children: [{
                            label: "using the latest value of each source whenever any source emits",
                            children: [{
                                label: "combineLatest"
                            }]
                        }, {
                            label: "using the latest value of each source only when the primary Observable emits",
                            children: [{
                                label: "withLatestFrom"
                            }]
                        }, {
                            label: "using each source value only once",
                            children: [{
                                label: "zip"
                            }]
                        }]
                    }]
                }]
            }, {
                label: "我有好几个 Observable，想合并成一个",
                children: [{
                    label: "我想接收第一个产生值的 Observable 的值",
                    children: [{
                        label: "Observable.race"
                    }]
                }, {
                    label: "我想在所有 Observable 完成时收到通知",
                    children: [{
                        label: "Observable.forkJoin"
                    }]
                }, {
                    label: "我想接受来自任意一个 Observable 的值",
                    children: [{
                        label: "Observable.merge"
                    }]
                }, {
                    label: "我想计算两个 Observable 的值，然后产生结果",
                    children: [{
                        label: "使用每个 Observable 最近产生的值",
                        children: [{
                            label: "Observable.combineLatest"
                        }]
                    }, {
                        label: "每个 Observable 产生的每个值只会算一次",
                        children: [{
                            label: "Observable.zip"
                        }]
                    }]
                }, {
                    label: "我想按顺序拼接它们",
                    children: [{
                        label: "Observable.concat"
                    }]
                }]
            }, {
                label: "我还没有 Observable",
                children: [{
                    label: "我要创建一个新的 Observable",
                    children: [{
                        label: "根据自定义规则",
                        children: [{
                            label: "Observable.create"
                        }]
                    }, {
                        label: "for 循环",
                        children: [{
                            label: "Observable.generate"
                        }]
                    }, {
                        label: "抛出一个错误",
                        children: [{
                            label: "Observable.throw"
                        }]
                    }, {
                        label: "不产生任何值，但是会完成",
                        children: [{
                            label: "Observable.empty"
                        }]
                    }, {
                        label: "什么都不产生",
                        children: [{
                            label: "Observable.never"
                        }]
                    }, {
                        label: "根据事件",
                        children: [{
                            label: "DOM 或者 Node.js 或者类似的事件",
                            children: [{
                                label: "Observable.fromEvent"
                            }]
                        }, {
                            label: "使用 API 来添加或移除事件处理函数",
                            children: [{
                                label: "Observable.fromEventPattern"
                            }]
                        }]
                    }, {
                        label: "ES6 Promise",
                        children: [{
                            label: "Observable.fromPromise"
                        }]
                    }, {
                        label: "Promise 、事件 、数组",
                        children: [{
                            label: "Observable.from"
                        }]
                    }, {
                        label: "数组",
                        children: [{
                            label: "over the values in an array",
                            children: [{
                                label: "Observable.fromArray"
                            }]
                        }, {
                            label: "数值范围",
                            children: [{
                                label: "Observable.range"
                            }]
                        }, {
                            label: "值",
                            children: [{
                                label: "Observable.of"
                            }]
                        }]
                    }, {
                        label: "定时重复",
                        children: [{
                            label: "定时重复",
                            children: [{
                                label: "Observable.interval"
                            }]
                        }, {
                            label: "倒计时",
                            children: [{
                                label: "Observable.timer"
                            }]
                        }]
                    }, {
                        label: "当被 subscribe 时才会创建",
                        children: [{
                            label: "Observable.defer"
                        }]
                    }]
                }, {
                    label: "我要把回调转成 Observable",
                    children: [{
                        label: "传统的 API",
                        children: [{
                            label: "Observable.bindCallback"
                        }]
                    }, {
                        label: "Node.js 风格的回调 API",
                        children: [{
                            label: "Observable.bindNodeCallback"
                        }]
                    }]
                }]
            }]
        }
    }
    , {}]
}, {}, [11]);
