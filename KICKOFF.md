# KICKOFF.md — 貼給 Claude Code 的第一則訊息

（在 learn-claude-code/ 目錄開新 session，貼上以下內容）

---

請先依序讀：CLAUDE.md → PLAN.md → SPEC.md → DECISIONS.md。
Non-Negotiables 優先於你的預設判斷；要改任何一條先提出討論，不要默默偏離。
實作細節一律以 SPEC.md 為準（規劃已凍結、無待填變數）；SPEC 沒寫到的情況＝計畫外情況，先回文件討論再動工，不要自訂預設方案——能問使用者的就用選項式問題直接問。

執行順序（硬規則）：
1. Phase 0 逐項執行並回報（通過／失敗＋證據：指令輸出、網址、截圖）。任一項失敗，先解決或回文件討論，不進 Phase 1。
2. Phase 0 全過後，提出 Phase 1 的檔案級 todo 清單讓我確認，確認後才動工。
3. Phase 1 完成後逐項對照 PLAN.md 完成標準驗收（附證據），通過才算完成——Phase 之間是硬閘門，不跨 Phase 順便做。

工作規則：
- 內容草稿屬長內容處理：委派 agent 產出，不在主對話直接跑（全域十二區）。
- 內容頁一律附 frontmatter base_version 與 sources；查不到官方依據的描述標「⚠ 未驗證」。
- 計畫外情況（工具行為不如預期、發現新風險）：先回 PLAN.md／DECISIONS.md 迭代文件，再改程式。
- 每個 Phase 開新 session，交接只靠這四份文件，不依賴對話記憶。
- repo 為 public（CLAUDE.md #8）；git push 前仍需向我確認（全域六）。

現在執行 Phase 3（Phase 0、1、2 已完成）。

Phase 2 完成判定見 PLAN.md「Phase 2 完成判定」節；執行發現見 DECISIONS.md「2026-07-13／07-14」各節。
重點交接（Phase 3 動工前先知道）：
1. 站已上線且內容完整：https://pbualvin-hue.github.io/learn-claude-code/ ——首頁（雙入口＋簡圖＋4 風格切換器）＋開始使用／第一個專案／安心使用（trust）／功能參考（14）／比較與情境（compare・scenarios・troubleshooting）／詞彙表，共 33 頁、連結零死鏈。**Phase 2 唯一未結項＝真人親友驗收（PLAN Phase 2 完成標準，需使用者安排）**。
2. Phase 3 範圍＝updates/ 區＋`/update-content` skill（讀 changelog 自 `content-state.json` 的 last_covered_version 增量→產 updates 草稿＋受影響 reference 頁清單→開 draft PR）＋週日 21:00 排程＋單頁 cheatsheet。契約見 SPEC #7；changelog 涉及 hooks/skills/agents/settings/權限 時，草稿**必含決策比較頁（compare）複審結果**（融會貫通層最易過時）。
3. **無人值守排程的三道啟動閘門（DECISIONS 2026-07-13，Phase 3 部署必踩）**：① 工具權限——排程任務建立後先「Run now」預核准（git/gh/curl），或用 .claude/settings.json 允許清單（已備）；② 資料夾信任旗標——~/.claude.json 的 hasTrustDialogAccepted 可能被 App 回寫還原，排程靜默跳過時第一個查這裡；③ 允許規則前綴比對對旗標敏感（curl -s/-sL 變體已補）。notifyOnCompletion 通知不可靠，排程結果要主動查。Phase 3 完成標準追加：部署後實測一次無人值守 run 全通。
4. **內容時效訊號（Phase 3 複審時處理）**：官方 permission-modes 頁已多出 `auto`（分類器）、`dontAsk`（CI）等新模式，本站 reference/settings-permissions（base 2.1.207）只列四種——複審 settings/決策頁時評估補上。官方文件網域已遷 code.claude.com（sources 仍寫 docs.claude.com 自動轉址）；changelog 仍在 raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md（未遷）。
5. **既有機制沿用**：frontmatter schema 鎖死（src/content.config.ts，缺欄位 build fail）；內容草稿走「委派 agent 產出、主對話審核」，資安頁必抽（CLAUDE.md 五）；批次產文後一律跑 `node scripts/check-links.mjs`（集中連結稽核，已抓過多次 agent 自算深度錯誤）＋掃 `<!--`／`</content>`／簡繁；內部連結相對路徑（depth 對應 `../` 層數），手寫 base 前綴只用在 index.mdx hero.actions。
6. **維護負擔提醒**：4 風格皮膚（skins.css）＋風格切換器是超出原 SPEC 的使用者主導功能，每皮膚 ×深/淺色×手機需維持可讀；站越大越要顧。停損閘門觸發時列可砍範圍。
git push 沿全域規則需向使用者確認（可開工時徵求本 Phase 一次性授權）。Phase 3 動工前先提檔案級 todo 清單讓使用者確認。
