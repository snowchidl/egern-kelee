// 拼多多去广告 — 由可莉 Loon 插件（2026-11-10 快照）声明式规则转换生成的 JS
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
  { re: /^https:\/\/api\.pinduoduo\.com\/api\/alexa\/homepage\/hub\?/i, run: function (o) {
    delPath(o, "result.dy_module.irregular_banner_dy");
    delPath(o, "result.icon_set");
    delPath(o, "result.search_bar_hot_query");
    delPath(o, "result.dy_module.irregular_banner_dy");
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/api\/alexa\/homepage\/hub\?/i, run: function (o) {
    (function (o) {
      var keep = ["index.html", "chat_list.html", "personal.html"];
      var r = o && o.result;
      if (r && Array.isArray(r.bottom_tabs)) r.bottom_tabs = r.bottom_tabs.filter(function (t) { return t && keep.indexOf(t.link) >= 0; });
      if (r && Array.isArray(r.buffer_bottom_tabs)) r.buffer_bottom_tabs = r.buffer_bottom_tabs.filter(function (t) { return t && keep.indexOf(t.link) >= 0; });
      if (r && Array.isArray(r.all_top_opts)) r.all_top_opts.forEach(function (t) { if (t && typeof t === "object") { delete t.selected_image; delete t.image; delete t.height; delete t.width; } });
    })(o);
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/search\?/i, run: function (o) {
    delPath(o, "expansion");
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\?/i, run: function (o) {
    delPath(o, "monthly_card_entrance");
    delPath(o, "personal_center_style_v2_vo");
    delPath(o, "icon_set.icons");
    delPath(o, "icon_set.top_personal_icons");
    delPath(o, "personal_banner");
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render\?/i, run: function (o) {
    delPath(o, "bottom_section_list");
    delPath(o, "ui.bottom_section");
    delPath(o, "ui.live_section.float_info");
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/order_detail_group\?/i, run: function (o) {
    delPath(o, "data.goods_list");
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/order\//i, run: function (o) {
    delPath(o, "marketing_banner_vo");
    delPath(o, "shipping.banner_above_recommend");
  } },
  { re: /^https:\/\/api\.pinduoduo\.com\/api\/aristotle\/order_list_v4\?/i, run: function (o) {
    (function (o) {
      if (o && Array.isArray(o.orders)) o.orders.forEach(function (ord) {
        if (ord && Array.isArray(ord.order_buttons)) ord.order_buttons.forEach(function (b) { if (b && typeof b === "object") delete b.order_growth_tip; });
      });
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
