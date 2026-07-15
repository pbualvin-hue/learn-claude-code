---
name: update-content
description: 讀取 Claude Code 官方 changelog 自上次基準版以來的增量，產出 updates/ 草稿頁與受影響頁面清單，開 draft PR 供人工審核後發布。排程與手動觸發共用同一流程（Non-Negotiable #9）；changelog 觸及 hooks／skills／agents／settings／權限時，草稿必附決策比較頁複審結果。
---

# /update-content — 版本更新草稿管線

本 skill 是更新管線的核心（SPEC #7 契約）。排程只是觸發器之一；手動觸發走完全相同流程。
鐵律：**產出一律進 draft PR，絕不直接改 main、絕不自行 merge**（Non-Negotiable #3：自動草稿必經人工審核）。

## 流程

### 1. 讀狀態
讀 `src/data/content-state.json` 取 `last_covered_version`。

### 2. 抓增量
```
curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
```
changelog 由新到舊排列。取 `(last_covered_version, 最新版]` 區間的所有版本條目。
- **無新版本**：回報「本次無新版本，內容基準 vX.Y.Z 仍為最新」後結束。不改任何檔案、不開 PR、不更新狀態檔。
- **解析失敗**（格式看不懂、抓不到）：照常開 draft PR，但草稿頁內放 changelog 原文區段＋「⚠ 解析失敗，需人工判讀」標記，不要硬猜。

### 3. 開分支
```
git switch -C content/update-<最新版號>
```
（用 `switch -C`：分支已存在時直接重置重用，避免上次中斷的殘留分支擋路。版號中的 `.` 改為 `-`。）

### 4. 產草稿頁 `src/content/docs/updates/v<起>-to-v<迄>.mdx`
檔名版號以 `-` 代 `.`（例：`v2-1-208-to-v2-1-210.mdx`）；單一版本則 `v<版號>.mdx`。
frontmatter 五欄必填（缺＝build fail）：`title`（例：「v2.1.208 → v2.1.210 更新解讀」）、`description`、`base_version`（迄版）、`sources`（至少含 changelog URL；提到的功能附官方文件頁）、`audience: both`、`last_reviewed`（今天）。

內容結構：
1. **入門段**：這批更新對一般使用者有沒有感？一段白話總結（沒有就誠實說「多為內部修正，日常使用無感」）。
2. **逐版解讀**：每版分「日常使用有感」與「細節修正（可略過）」兩層；原創解讀，不整段翻譯 changelog（Non-Negotiable #1）。官方文件查不到、僅靠 changelog 一句話推測的行為，標「⚠ 未驗證」。
3. **受影響的本站頁面**：對照 14 個 reference 頁＋compare＋trust＋cheatsheet，列「頁面｜受影響條目｜建議修改」清單。只列有實據的，不硬湊。
4. 「先備知識」與「下一步」導引（無死路原則）。

### 4b. 掛側欄
`astro.config.mjs`「版本更新」節：在「這區在做什麼」項目**之後**插入新頁（最新在上、由新到舊），label 用「v<起> → v<迄>」。側欄是顯式清單（不用 autogenerate），新頁不掛側欄＝讀者看不到。

### 5. 強制複審觸發判定
增量條目觸及 **hooks／skills／agents（subagents）／settings／權限** 任一者：
- draft PR body 必含「**決策比較頁複審結果**」節：逐條說明 `compare/index` 的比較表與決策卡是否仍正確、哪裡需要改（融會貫通層最易過時，這是強制盯防）。
- 受影響清單必含 `reference/settings-permissions`／`reference/hooks`／`reference/skills`／`reference/subagents` 中被觸及者。

### 6. 更新狀態檔
`src/data/content-state.json`：`last_covered_version` ← 迄版；`last_run` ← 現在（ISO 8601 含時區）。footer 讀此檔，merge 後版本號自動跳新。

### 7. 驗證（必過才開 PR）
```
npm run build
node scripts/check-links.mjs
```
另掃新增檔案：不得含 `<!--`（MDX 註解一律 `{/* */}`）、不得含 `</content>` 殘留、不得混入簡體字。
**掃描一律用內建 Grep 工具（read-only，免核准），絕對不要用 Bash 跑 `grep`／`sed`／`awk`**——這些指令不在允許清單，無人值守時會卡權限提示直接吊死（2026-07-15 實測踩過：run 在此步驟停擺）。

### 8. 開 draft PR
```
git add <本次檔案> && git commit（英文 message，不加 Co-Authored-By）
git push -u origin content/update-<最新版號>
gh pr create --draft --title "content: update draft v<起> -> v<迄>" --body <固定檢查清單>
```
PR body 固定檢查清單（SPEC #7）：
```
## 審核檢查清單
- [ ] 隨機抽 3 條功能描述，對照官方文件無誤（黃金抽查）
- [ ] （若觸發）決策比較頁複審結果已確認，見下節
- [ ] 資安相關頁面若被觸及：全數人工複核（必抽，不進隨機池）
- [ ] merge 後確認 footer 內容基準版本跳新

## 本次增量
<版本區間與條目數>

## 受影響頁面與建議修改
<清單>

## 決策比較頁複審結果（觸發時必填）
<結果或「本次未觸發」>
```

## 限制與紀律
- Context 控制：只讀 changelog 增量與受影響頁面，不要整站重讀（額度失控向量，PLAN 成本表）。
- 內容規範沿站規：繁體中文、指令與功能名保留英文、兩層深度寫法（入門段先行）。內部連結一律相對路徑，注意深度：`updates/index` 深度 1（`../reference/<slug>/`），**版本頁深度 2**（`../../reference/<slug>/`、`../../compare/`）。
- 排程 session 注意：通知不可靠，結果以 draft PR 是否存在為準；工具權限依 `.claude/settings.json` 允許清單——**只用清單內的指令形態**（`cd "<repo路徑>" && <允許的指令>` 的複合式可用；檔案讀取與文字搜尋一律用內建 Read／Grep 工具，不經 Bash）。遇到清單外指令不要繞路改用其他指令硬跑，直接在回報中記錄缺哪條規則。
