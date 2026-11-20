// 快手去广告 — 由可莉 Loon 插件（2026-11-10 快照）声明式规则转换生成的 JS
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
  { re: /^https:\/\/(apissl|az\d-api(-js|-idc)?)\.(gifshow|ksapisrv)\.com\/rest\/system\/startup\?/i, run: function (o) {
    delPath(o, "reskinConfig");
    delPath(o, "sidebarExSquareStyle.moreList");
    delPath(o, "sidebarExSquareStyle.topList");
  } },
  { re: /^https:\/\/(apissl|az\d-api(-js|-idc)?)\.(gifshow|ksapisrv)\.com\/rest\/system\/startup\?/i, run: function (o) {
    (function (o) {
      var keep = ["设置", "历史记录", "草稿箱", "我的钱包", "小程序", "未成年人模式", "官方客服", "内容偏好", "离线模式", "稍后再看", "举报中心", "挂件"];
      var s = o && o.sidebarExSquareStyle;
      if (s && Array.isArray(s.commonlyUsedList)) s.commonlyUsedList = s.commonlyUsedList.filter(function (x) { return x && keep.indexOf(x.title) >= 0; });
    })(o);
  } },
  { re: /^https:\/\/(apissl|az\d-live|az\d-api(-js|-idc)?)\.(gifshow|ksapisrv)\.com\/rest\/n\/live\/feed\/square\/refresh\?/i, run: function (o) {
    delPath(o, "data.banners");
  } },
  { re: /^https:\/\/(apissl|az\d-api(-js|-idc)?)\.(gifshow|ksapisrv)\.com\/rest\/n\/feed\/(selection|selectionFast)\?/i, run: function (o) {
    (function (o) {
      if (o && Array.isArray(o.feeds)) o.feeds = o.feeds.filter(function (f) { return !(f && f.ad); });
    })(o);
  } },
  { re: /^https:\/\/(apissl|az\d-api(-js|-idc)?)\.(gifshow|ksapisrv)\.com\/rest\/n\/user\/profile\/v2\?/i, run: function (o) {
    delPath(o, "postRecommends");
  } },
  { re: /^https:\/\/(apissl|az\d-api(-js|-idc)?)\.(gifshow|ksapisrv)\.com\/rest\/im\/wd\/top\/navigation\/getRecommendedSession\?/i, run: function (o) {
    delPath(o, "data.operationRecommendationList");
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
