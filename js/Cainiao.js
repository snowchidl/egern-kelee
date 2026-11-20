// 菜鸟去广告 — 由可莉 Loon 插件（2026-11-10 快照）声明式规则转换生成的 JS
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
  { re: /^https:\/\/(cn-acs\.m|e2e-mtop)\.cainiao\.com\/gw\/mtop\.cainiao\.app\.e2e\.engine\.page\.fetch/i, run: function (o) {
    delPath(o, "data.data.data.mainSearch.bizData.searchContents");
    delPath(o, "data.data.data.operationList");
  } },
  { re: /^https:\/\/e2e-mtop\.cainiao\.com\/gw\/mtop\.cainiao\.app\.e2e\.engine\.page\.fetch\.cn/i, run: function (o) {
    delPath(o, "data.data.banner");
    delPath(o, "data.data.activity");
    delPath(o, "data.data.vip");
  } },
  { re: /^https:\/\/longquan-mtop\.cainiao\.com\/gw\/mtop\.com\.cainiao\.longquan\.place\.getpageresourcecontent\.cn/i, run: function (o) {
    (function (o) {
      var m = o && o.data && o.data.result && o.data.result.placeContentMap && o.data.result.placeContentMap["780001"];
      if (m && typeof m === "object") delete m.contentList;
    })(o);
  } },
  { re: /^https:\/\/netflow-mtop\.cainiao\.com\/gw\/mtop\.cainiao\.guoguo\.nbnetflow\.ads/i, run: function (o) {
    (function (o) {
      if (!o || typeof o !== "object") return;
      var r = o.data && o.data.result;
      var ok = Array.isArray(r) && r[0] && r[0].materialId === "39017";
      if (!ok) o.data = {};
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
