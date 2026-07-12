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

現在從 Phase 0 第 3 項開始（1、2 已於規劃期驗證）。
