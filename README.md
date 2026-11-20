# egern-kelee

可莉（Kelee）Loon 插件 **2026-11-10 快照**的 Egern / Surge 转换版模块。

源插件来自 [CodeApe-Xiaoyin/loon-plugins](https://github.com/CodeApe-Xiaoyin/loon-plugins) 的 `kelee-snapshot-2026-11-10` 分支（上游 kelee.one，作者 RuCu6 / 可莉等，版权归原作者所有）。Loon 3.5 的声明式语法（`response.json.delete / replace / jq / jq_file`、`reject_dict`）在 Surge / Egern 中没有对应物，本仓库把它们逐条翻译成了等价的 JS 脚本与 URL Rewrite 规则：

- `reject_dict(200)` → `[URL Rewrite] reject-dict`
- 菜鸟的 `reject(404)` → `[URL Rewrite] reject`
- `response.json.*` 声明式改写 → `js/` 目录下逐插件生成的 JS（按 URL 分发，jq 表达式已手工翻译为等价 JS）
- 原插件 `[Script]` 引用的 JS 仍指向快照仓库原地址，未改动
- `[Rule]`、`[MITM]` 基本原样保留

## 模块清单（modules/）

| 模块 | 说明 |
|---|---|
| 12306.sgmodule | 12306 去广告 |
| Taobao.sgmodule | 淘宝去广告 |
| JD.sgmodule | 京东去广告 |
| PinDuoDuo.sgmodule | 拼多多去广告 |
| BaiduNetDisk.sgmodule | 百度网盘去广告 |
| Cainiao.sgmodule | 菜鸟去广告 |
| Weibo.sgmodule | 微博（正版）去广告 |
| Reddit.sgmodule | Reddit 去广告 + NSFW 提示处理 |
| KuaiShou.sgmodule | 快手去广告 |
| QuarkBrowser.sgmodule | 夸克浏览器去广告 |

导入方式：Egern 里添加模块，填入对应 `.sgmodule` 的 raw 链接即可；也可以把本仓库的模块地址批量加进配置文件 `modules:` 列表。

## 已知差异与风险

1. 拼多多模块含一条 `AND, ((DOMAIN, api.pinduoduo.com), (PROTOCOL, QUIC)), REJECT` 规则（禁 QUIC 保证 MITM 生效）。若 Egern 版本不支持 PROTOCOL/QUIC 规则导致模块报错，删掉这一行即可，其余功能不受影响。
2. 原插件 JS（快照仓库托管）按 Loon 脚本 API 编写，与 Surge/Egern 的脚本 API 高度兼容，但个别脚本若用到 Loon 独有接口可能静默失效；声明式规则转换出的 JS 已通过本地模拟测试（20 项断言全过）。
3. 本仓库是 2026-11-10 快照的静态转换，不会自动跟随上游更新。
