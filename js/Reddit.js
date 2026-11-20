// Reddit去广告 — 由可莉 Loon 插件（2026-11-10 快照）声明式规则转换生成的 JS
// 原 jq/json.delete/json.replace 语义已逐条翻译；与原插件保持一致。

function delPath(o, path) {
  var parts = path.split(".");
  var cur = o;
  for (var i = 0; i < parts.length - 1; i++) {
    if (cur == null || typeof cur !== "object") return;
    cur = cur[parts[i]];
  }
  if (cur == null || typeof cur !== "object") return;
  var last = parts[parts.length - 1];
  if (Array.isArray(cur) && /^\d+$/.test(last)) cur.splice(Number(last), 1);
  else delete cur[last];
}
function setPath(o, path, val) {
  var parts = path.split(".");
  var cur = o;
  for (var i = 0; i < parts.length - 1; i++) {
    if (cur == null || typeof cur !== "object") return;
    cur = cur[parts[i]];
  }
  if (cur == null || typeof cur !== "object") return;
  cur[parts[parts.length - 1]] = val;
}

var OPS = [
  { re: /^https?:\/\/gql(-fed)?\.reddit\.com/i, run: function (o) {
    (function (o) {
      var REMOVE = {};
      function walk(v) {
        if (Array.isArray(v)) {
          var out = [];
          for (var i = 0; i < v.length; i++) { var r = walk(v[i]); if (r !== REMOVE) out.push(r); }
          return out;
        }
        if (v && typeof v === "object") {
          Object.keys(v).forEach(function (k) { var r = walk(v[k]); if (r === REMOVE) delete v[k]; else v[k] = r; });
          if (v.isNsfw === true) v.isNsfw = false;
          if (v.isNsfwMediaBlocked === true) v.isNsfwMediaBlocked = false;
          if (v.isNsfwContentShown === false) v.isNsfwContentShown = true;
          if (Array.isArray(v.commentsPageAds)) v.commentsPageAds = [];
          var node = v.node;
          if (node && typeof node === "object") {
            if (Array.isArray(node.cells) && node.cells.some(function (c) { return c && (c.__typename === "AdMetadataCell" || c.isAdPost === true); })) return REMOVE;
            if (node.adPayload && typeof node.adPayload === "object") return REMOVE;
          }
          if (v.__typename === "AdPost") return REMOVE;
          return v;
        }
        return v;
      }
      var res = walk(o);
      if (res !== REMOVE && res && typeof res === "object" && res !== o) {
        if (Array.isArray(o) && Array.isArray(res)) {
          o.length = 0;
          for (var i = 0; i < res.length; i++) o.push(res[i]);
        } else if (!Array.isArray(o) && !Array.isArray(res)) {
          Object.keys(o).forEach(function (k) { delete o[k]; });
          Object.keys(res).forEach(function (k) { o[k] = res[k]; });
        }
      }
    })(o);
  } },
];

var body = $response.body;
if (body) {
  try {
    var obj = JSON.parse(body);
    var url = $request.url;
    for (var i = 0; i < OPS.length; i++) {
      if (OPS[i].re.test(url)) { try { OPS[i].run(obj); } catch (e) {} }
    }
    $done({ body: JSON.stringify(obj) });
  } catch (e) { $done({}); }
} else { $done({}); }
