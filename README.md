# egern-kelee

可莉（Kelee）Loon 插件全量转换为 Surge / Egern 格式的模块仓库。

源：CodeApe-Xiaoyin/loon-plugins 的 `kelee-snapshot-2026-11-10` 分支（可莉插件 2026-11-10 快照），共 276 个插件。

## 目录

- `modules/`：276 个 `.sgmodule`，文件名与原插件同名（如 `JD_remove_ads.sgmodule`），可直接在 Egern 里以远程模块方式添加。
- `js/`：151 个配套 JS。模块里的脚本条目以 `argument=<序号>` 指向本目录同名 JS 里的对应处理项；纯规则/远程脚本的模块不需要本地 JS。

## 转换方式

- `[Rule]`、`reject / reject-dict / reject-img` 类声明式规则：直译为 `[Rule]` / `[URL Rewrite]`。
- `response.json.delete / replace`：逐条翻成 JS。
- `response.json.jq`（231 条）与 `jq_file`：用自研 jq→JS 编译器翻译，全部表达式通过与官方 jq 1.7 的差分测试（合成数据多组夹具逐一对比输出）；编译器覆盖不了的 12 条表达式与 5 个 jq 文件（高德、Bilibili、什么值得买）为手工翻译，同样通过了与官方 jq 的对照。
- 原插件自带的远程 JS 脚本：保留原地址直引。
- `response.body.mock`（文本/JSON）：转成 JS 直接返回 mock 体；`mock_file` 已抓取内容内联。
- `redirect` / `url.replace`：转 `[URL Rewrite]`；`request.header.replace`、`response.header.add`、`body.replace`：转成 JS 处理项。
- 带 `[Argument]` 的插件：按参数默认值处理（重定向目标里的 `${参数}` 已替换为默认值；远程脚本按其内置默认参数运行）。由参数控制且默认关闭的脚本条目已按原插件默认状态跳过。

## 已知未转换的部分

- 工具类插件的 cron / generic 条目（WPS 签到、Sub-Store 同步、节点检测、FollowRSS 签到、Auto_Join_TF、WARP 查询等）：`.sgmodule` 无法表达定时与面板脚本，这类条目已跳过——它们本来也不是去广告模块。
- Bilibili 的 3 条二进制（base64/protobuf）mock：JS 文本体无法表达，已跳过；同插件其余条目正常。
- SeasunJX3 的 `[General]` real-ip 一行：无对应表达，已跳过。
- 个别插件的 jq 在原版里就是空操作，已按空操作处理。

## 关于首批 10 个（旧文件）

`modules/` 里无 `_remove_ads` 后缀的短名文件（如 `JD.sgmodule`、`js/JD.js`）是首批试转的 10 个，已被全量版（`JD_remove_ads.sgmodule` 等）取代，留着不影响使用，引用时请用全量版文件名。

## 注意

- 快照为静态转换，不会随原插件更新。
- 原插件 JS 按 Loon API 编写，与 Surge/Egern 高度兼容，但个别脚本可能静默失效。
- 拼多多模块含一条 `PROTOCOL,QUIC` 规则，若 Egern 报错，删该行即可。
