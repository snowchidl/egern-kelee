// 京东去广告 — 由可莉 Loon 插件（2026-11-10 快照）声明式规则转换生成的 JS
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
  { re: /^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=basicConfig/i, run: function (o) {
    setPath(o, "data.JDMessage.socketmonitor.isSocketEstablishedAhead", 0);
    setPath(o, "data.JDMessage.socketmonitor.isSocketReport", 0);
    setPath(o, "data.JDHttpToolKit.httpdns.httpdns", 0);
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
