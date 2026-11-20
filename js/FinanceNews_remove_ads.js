// 华尔街见闻去广告 — 由可莉 Loon 插件（2026-11-10 快照）转换生成
// jq 部分由编译器逐条翻译并通过与官方 jq 的对照测试；少数复杂表达式为手工翻译。


var EMPTY = { __jq_empty: true };
function _isObj(v) { return v !== null && typeof v === "object"; }
function _truthy(v) { return v !== false && v !== null && v !== undefined && v !== EMPTY; }
function _canon(v) { if (Array.isArray(v)) return v.map(_canon); if (_isObj(v)) { var o = {}; Object.keys(v).sort().forEach(function (k) { o[k] = _canon(v[k]); }); return o; } return v; }
function _eq(a, b) { if (a === b) return true; if (!_isObj(a) || !_isObj(b)) return false; return JSON.stringify(_canon(a)) === JSON.stringify(_canon(b)); }
function _cmp(op, a, b) { if (op === "<") return a < b; if (op === ">") return a > b; if (op === "<=") return a <= b; if (op === ">=") return a >= b; return false; }
function _type(v) { if (v === null) return "null"; if (Array.isArray(v)) return "array"; return typeof v; }
function _len(v) { if (v === null) return 0; if (typeof v === "string" || Array.isArray(v)) return v.length; if (_isObj(v)) return Object.keys(v).length; if (typeof v === "number") return Math.abs(v); throw new Error("length"); }
function _get(v, segs) { var cur = v; for (var i = 0; i < segs.length; i++) { if (cur === null || cur === undefined) return null; if (typeof cur !== "object") return EMPTY; if (Array.isArray(cur) && typeof segs[i] === "string") return EMPTY; cur = cur[segs[i]]; if (cur === undefined) return null; } return cur === undefined ? null : cur; }
function _has(v, k) { if (Array.isArray(v) && typeof k === "number") return k >= 0 && k < v.length; if (_isObj(v)) return Object.prototype.hasOwnProperty.call(v, k); return false; }
function _contains(a, b) { if (typeof a === "string" && typeof b === "string") return a.indexOf(b) >= 0; if (Array.isArray(a) && Array.isArray(b)) return b.every(function (x) { return a.some(function (y) { return _contains(y, x); }); }); if (_isObj(a) && _isObj(b) && !Array.isArray(a) && !Array.isArray(b)) return Object.keys(b).every(function (k) { return (k in a) && _contains(a[k], b[k]); }); return _eq(a, b); }
function _index(a, b) { if (typeof a === "string" && typeof b === "string") { var i = a.indexOf(b); return i < 0 ? null : i; } if (Array.isArray(a)) { if (Array.isArray(b)) { if (b.length === 0) return 0; for (var i = 0; i + b.length <= a.length; i++) { var ok = true; for (var j = 0; j < b.length; j++) if (!_eq(a[i + j], b[j])) { ok = false; break; } if (ok) return i; } return null; } for (var i = 0; i < a.length; i++) if (_eq(a[i], b)) return i; return null; } return null; }
function _binop(op, a, b) { if (op === "+") { if (a === null) return b; if (b === null) return a; if (_isObj(a) && _isObj(b) && !Array.isArray(a) && !Array.isArray(b)) { var o = {}; Object.keys(a).forEach(function (k) { o[k] = a[k]; }); Object.keys(b).forEach(function (k) { o[k] = b[k]; }); return o; } if (Array.isArray(a) && Array.isArray(b)) return a.concat(b); return a + b; } if (op === "-") { if (Array.isArray(a) && Array.isArray(b)) return a.filter(function (x) { return !b.some(function (y) { return _eq(x, y); }); }); return a - b; } if (op === "*") return a * b; if (op === "/") return a / b; if (op === "%") return a % b; return null; }
function _map(v, f) { if (Array.isArray(v)) { var out = []; for (var i = 0; i < v.length; i++) { var r = f(v[i]); if (r !== EMPTY) out.push(r); } return out; } if (_isObj(v)) { var out2 = []; var ks = Object.keys(v); for (var i = 0; i < ks.length; i++) { var r = f(v[ks[i]]); if (r !== EMPTY) out2.push(r); } return out2; } throw new Error("map on non-iterable"); }
function _mapValues(v, f) { if (Array.isArray(v)) return _map(v, f); if (_isObj(v)) { var o = {}; Object.keys(v).forEach(function (k) { var r = f(v[k]); if (r !== EMPTY) o[k] = r; }); return o; } throw new Error("map_values on non-iterable"); }
function _walk(v, f) { if (Array.isArray(v)) { var out = []; for (var i = 0; i < v.length; i++) { var r = _walk(v[i], f); if (r !== EMPTY) out.push(r); } return f(out); } if (_isObj(v)) { Object.keys(v).forEach(function (k) { var r = _walk(v[k], f); if (r === EMPTY) delete v[k]; else v[k] = r; }); return f(v); } return f(v); }
function _toEntries(v) { if (!_isObj(v) || Array.isArray(v)) throw new Error("to_entries"); return Object.keys(v).map(function (k) { return { key: k, value: v[k] }; }); }
function _fromEntries(v) { if (!Array.isArray(v)) throw new Error("from_entries"); var o = {}; v.forEach(function (e) { if (Array.isArray(e)) o[e[0]] = e[1]; else if (_isObj(e)) o[e.key !== undefined ? e.key : e.Key] = e.value !== undefined ? e.value : e.Value; }); return o; }
function _withEntries(v, f) { var es = _toEntries(v); var out = []; for (var i = 0; i < es.length; i++) { var r = f(es[i]); if (r !== EMPTY) out.push(r); } return _fromEntries(out); }
function _sortBy(v, f) { if (!Array.isArray(v)) throw new Error("sort_by"); return v.map(function (x, i) { return [f(x), i, x]; }).sort(function (a, b) { var x = a[0], y = b[0]; if (_eq(x, y)) return a[1] - b[1]; return x < y ? -1 : 1; }).map(function (t) { return t[2]; }); }
function _anyAll(v, f, isAny) { if (!Array.isArray(v)) throw new Error("any/all"); for (var i = 0; i < v.length; i++) { var r = f ? f(v[i]) : v[i]; if (_truthy(r)) { if (isAny) return true; } else if (!isAny) return false; } return !isAny; }
function _genVals(v, segs) { var out = []; (function rec(cur, i) { if (i === segs.length) { out.push(cur === undefined ? null : cur); return; } if (cur === null || typeof cur !== "object") return; var s = segs[i]; if (s.iter) { if (Array.isArray(cur)) { for (var j = 0; j < cur.length; j++) rec(cur[j], i + 1); } else { Object.keys(cur).forEach(function (k) { rec(cur[k], i + 1); }); } } else if (s.k !== undefined) rec(cur[s.k], i + 1); else if (s.slice) { if (Array.isArray(cur) || typeof cur === "string") { var a = s.slice[0] === null ? 0 : s.slice[0]; var b = s.slice[1] === null ? cur.length : s.slice[1]; rec(cur.slice(a, b), i + 1); } } })(v, 0); return out; }
function _segsNorm(segs) { return segs.map(function (s) { if (s[0] === "k") return { k: s[1] }; if (s[0] === "slice") return { slice: [s[1], s[2]] }; if (s[0] === "sel") return { sel: s[1] }; return { iter: true }; }); }
function _jqCmp(a, b) { function rank(x) { if (x === null) return 0; if (x === false) return 1; if (x === true) return 2; if (typeof x === "number") return 3; if (typeof x === "string") return 4; if (Array.isArray(x)) return 5; return 6; } var ra = rank(a), rb = rank(b); if (ra !== rb) return ra - rb; if (typeof a === "number") return a - b; if (typeof a === "string") return a < b ? -1 : (a > b ? 1 : 0); return 0; }
function _sort(v) { if (!Array.isArray(v)) throw new Error("sort"); return v.slice().sort(_jqCmp); }
function _getSegs(v, segsRaw) { var segs = _segsNorm(segsRaw); var cur = v; for (var i = 0; i < segs.length; i++) { if (cur === null || cur === undefined) return null; var s = segs[i]; if (s.slice) { if (Array.isArray(cur) || typeof cur === "string") { var a = s.slice[0] === null ? 0 : s.slice[0]; var b = s.slice[1] === null ? cur.length : s.slice[1]; cur = cur.slice(a, b); } else return null; } else if (s.k !== undefined) { if (typeof cur !== "object") return null; cur = cur[s.k]; if (cur === undefined) return null; } else return null; } return cur === undefined ? null : cur; }
function _delPath(root, segs, cond) { (function rec(cur, i) { if (cur === null || typeof cur !== "object") return; var s = segs[i], last = i === segs.length - 1; if (s.iter) { if (Array.isArray(cur)) { if (last) { if (cond) { for (var j = cur.length - 1; j >= 0; j--) if (_truthy(cond(cur[j]))) cur.splice(j, 1); } else cur.length = 0; } else { for (var j = 0; j < cur.length; j++) rec(cur[j], i + 1); } } else { var ks = Object.keys(cur); if (last) { ks.forEach(function (k) { if (!cond || _truthy(cond(cur[k]))) delete cur[k]; }); } else ks.forEach(function (k) { rec(cur[k], i + 1); }); } return; } if (s.sel) { if (_truthy(s.sel(cur))) rec(cur, i + 1); return; } if (last) { var val = cur[s.k] === undefined ? null : cur[s.k]; if (!cond || _truthy(cond(val))) { if (Array.isArray(cur) && typeof s.k === "number") cur.splice(s.k, 1); else delete cur[s.k]; } } else rec(cur[s.k], i + 1); })(root, 0); }
var SKIP = { __skip: true };
function _updPath(root, segs, f) { (function rec(cur, i) { if (i === segs.length) return f(cur); var s = segs[i]; if (s.sel) { return _truthy(s.sel(cur)) ? rec(cur, i + 1) : cur; } if (s.iter) { if (Array.isArray(cur)) { if (i === segs.length - 1) { var out = []; for (var j = 0; j < cur.length; j++) { var r = f(cur[j]); if (r !== EMPTY) out.push(r); } return out; } for (var j = 0; j < cur.length; j++) { var nv = rec(cur[j], i + 1); if (nv !== SKIP) cur[j] = nv; } return cur; } if (_isObj(cur)) { var ks = Object.keys(cur); if (i === segs.length - 1) { ks.forEach(function (k) { var r = f(cur[k]); if (r === EMPTY) delete cur[k]; else cur[k] = r; }); return cur; } ks.forEach(function (k) { var nv = rec(cur[k], i + 1); if (nv !== SKIP) cur[k] = nv; }); return cur; } return SKIP; } if (s.k !== undefined) { if (cur === null || cur === undefined) cur = {}; if (typeof cur !== "object") return SKIP; var old = cur[s.k] === undefined ? null : cur[s.k]; var nv2 = rec(old, i + 1); if (nv2 === SKIP) return cur; if (nv2 === EMPTY) { if (Array.isArray(cur) && typeof s.k === "number") cur.splice(s.k, 1); else delete cur[s.k]; } else cur[s.k] = nv2; return cur; } if (s.slice) { return cur; } return cur; })(root, 0); }
function _setPath(root, segs, val) { _updPath(root, segs, function () { return val; }); }

var OPS = [
  {"kind": "json", "phase": "response", "fn": function(v){ _updPath(v, [{"k": "data"}, {"k": "items"}], function(v){ var vs = _genVals(v, [{"iter": true}]); var out = []; for (var i = 0; i < vs.length; i++) { var r = (function(v){ return _truthy((function(v){ var a = (function(v){ var a = (function(v){ return _get(v, ["key"]); })(v); if (a === EMPTY) return EMPTY; var b = (function(v){ return "news"; })(v); if (b === EMPTY) return EMPTY; return _eq(a, b); })(v); if (a === EMPTY) return EMPTY; if (_truthy(a)) return true; var b = (function(v){ var a = (function(v){ return _get(v, ["key"]); })(v); if (a === EMPTY) return EMPTY; var b = (function(v){ return "live"; })(v); if (b === EMPTY) return EMPTY; return _eq(a, b); })(v); if (b === EMPTY) return EMPTY; return _truthy(b); })(v)) ? v : EMPTY; })(vs[i]); if (r !== EMPTY) out.push(r); } return out; }); return v; } },
  {"kind": "json", "phase": "response", "fn": function(o){ _delPath(o, [{"k": "data"}, {"k": "recommend_vip_img_uri"}], null); return o; } },
  {"kind": "json", "phase": "response", "fn": function(o){ _delPath(o, [{"k": "data"}, {"k": "vip_article"}], null); return o; } },
];

var __idx = parseInt(typeof $argument !== "undefined" ? $argument : "0", 10);
if (isNaN(__idx)) __idx = 0;
var __op = OPS[__idx];
function __finish() { $done({}); }
if (!__op) { __finish(); }
else if (__op.kind === "mock") {
  var __m = { status: __op.status, body: __op.body };
  if (__op.ct) __m.headers = { "Content-Type": __op.ct };
  $done(__m);
} else if (__op.kind === "body-replace") {
  var __b = __op.phase === "request" ? ($request.body || "") : ($response.body || "");
  try { $done({ body: __b.replace(new RegExp(__op.re, __op.flags), __op.repl) }); } catch (e) { __finish(); }
} else if (__op.kind === "header-set") {
  var __h = {};
  var __src = $response.headers || {};
  Object.keys(__src).forEach(function (k) { if (k.toLowerCase() !== __op.hname.toLowerCase()) __h[k] = __src[k]; });
  __h[__op.hname] = __op.hval;
  $done({ headers: __h });
} else if (__op.kind === "header-replace") {
  var __h2 = {};
  var __src2 = $request.headers || {};
  var __done2 = false;
  Object.keys(__src2).forEach(function (k) {
    __h2[k] = __src2[k];
    if (k.toLowerCase() === __op.hname.toLowerCase()) {
      try { __h2[k] = String(__src2[k]).replace(new RegExp(__op.re, __op.flags), __op.repl); __done2 = true; } catch (e) {}
    }
  });
  $done(__done2 ? { headers: __h2 } : {});
} else {
  var __body = __op.phase === "request" ? $request.body : $response.body;
  if (!__body) { __finish(); }
  else {
    try {
      var __obj = JSON.parse(__body);
      var __r = __op.fn(__obj);
      if (__r === EMPTY || __r === null || __r === undefined) { __finish(); }
      else { $done({ body: JSON.stringify(__r) }); }
    } catch (e) { __finish(); }
  }
}
