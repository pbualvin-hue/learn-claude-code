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

現在執行 Phase 2（Phase 0、Phase 1 已完成）。

Phase 1 完成判定見 PLAN.md「Phase 1 完成判定」節；執行發現見 DECISIONS.md「2026-07-13 Phase 1 執行發現」。
重點交接（Phase 2 動工前先知道）：
1. 站已上線：https://pbualvin-hue.github.io/learn-claude-code/ ——目前只有「功能參考」14 頁與簡版首頁；側欄只掛功能參考節（astro.config.mjs），Phase 2 要把 SPEC #6 其餘節（開始使用／第一個專案／安心使用／比較與情境／詞彙表速查）逐步掛上。
2. frontmatter schema 已鎖死（src/content.config.ts）：每頁必帶 base_version／sources≥1／audience／last_reviewed，缺欄位 build fail——Phase 2 新頁一律照填。課程頁模板見 SPEC #5（目標→跟著做→「該進你的 CLAUDE.md 嗎？」→下一步）。
3. 官方文件網域已遷 code.claude.com（sources 仍寫 docs.claude.com 會自動轉址，見 DECISIONS）；引用官方頁前照樣 WebFetch 驗證。
4. 內部連結一律相對路徑（../slug/）；Starlight 會自動補 base，手寫 base 前綴只用在 index.mdx 的 hero.actions（已知坑）。
5. 內容草稿仍走「委派 agent 產出、主對話審核」；trust/ 與資安相關頁列入審核必抽（不進隨機池，CLAUDE.md 五）。心智模型圖用 Mermaid/SVG 文字源碼（SPEC #9，Phase 1 先手寫 SVG）。
6. Phase 2 完成標準含真人親友驗收（PLAN Phase 2）——這步需要使用者安排，開工時先確認節奏，不阻塞可先做的內容。
git push 沿全域規則需向使用者確認（可開工時徵求本 Phase 一次性授權）。Phase 2 範圍大，動工前先提檔案級 todo 清單讓使用者確認。
