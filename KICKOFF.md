# KICKOFF.md — 貼給 Claude Code 的第一則訊息

（在 learn-claude-code/ 目錄開新 session，貼上以下內容）

---

請先依序讀：CLAUDE.md → PLAN.md → SPEC.md → DECISIONS.md。
Non-Negotiables 優先於你的預設判斷；要改任何一條先提出討論，不要默默偏離。
實作細節以 SPEC.md 為準；SPEC 沒寫到的先回文件討論再動工——能問使用者的就用選項式問題直接問。

## 現況（2026-07-17 收尾）
- **Phase 0–3 與 Phase 2.5 全部完成**，站上線 38 頁：https://pbualvin-hue.github.io/learn-claude-code/
- 學習路徑主線 6 站（①啟動 ②怎麼說話 ③第一個專案[A軌7站/B軌8站] ④安心使用 ⑤CLAUDE.md ⑥帶自己的專案上路），每頁有 PathStep 標記；首頁／側欄／頁尾導引同一條動線。
- 更新管線運轉中：`/update-content` skill（PR-first 設計）＋週日 21:04 排程；首次真實循環已全程走通（PR #1 merged，footer 基準 v2.1.210）。
- 5 個高頻參考頁（settings-permissions/hooks/skills/subagents/mcp）已有「實戰進階」節。

## 懸置中的驗收（不需動工，到時查核）
1. **無人值守終驗收**：每週日 21:04 排程 run。查核方式（通知不可靠，主動查）：任務 lastRunAt（scheduled-tasks 工具）→ 若空＝沒觸發（App 當時沒開，下次啟動補跑）；有跑 → `gh pr list` 看 content/update-* draft PR 或 runner transcript（~/.claude/projects/<專案>/ 最新 .jsonl）看回報。七道靜默失敗閘門清單見 DECISIONS 2026-07-13 與 07-15/16 節＋專案記憶。
2. **真人親友驗收**（PLAN Phase 2 完成標準，使用者安排）：照入門篇實走 30 分鐘不求助＋寫出 3 條自己的規則＋走完一條軌道。
3. **停損閘門第 4 週檢查點**：已排 2026-08-10 20:00 一次性提醒任務（stop-loss-week4-checkpoint），會自動產出檢查報告供使用者裁決。

## 下次開發主題（使用者 2026-07-17 裁決順序）
按優先序：
1. 其餘 **9 個參考頁**的「實戰進階」第二批（what-is/install/conversation-basics/slash-commands/built-in-tools/claude-md-memory/background-tasks-scheduling/claude-directory/faq）——建議先等真人驗收回饋再定調深淺。
2. getting-started **真實終端機截圖**替換手繪示意圖（需使用者提供截圖，標注擷取版本）。
3. sources 網域標準化評估（docs.claude.com → code.claude.com，目前轉址正常、低優先）。
4. 詳盡版 MentalModel 全景圖元件掛載（放進某課「想看完整全貌」摺疊區，選配）。
另：親友驗收若有回饋，回修優先於上述所有項目（驗收發現的問題最值錢）。

## 工作規則（沿用）
- 內容草稿委派 agent 產出、主對話審核；資安相關頁必抽全讀；brief 附「查不到寧可不寫」條款（agent 曾兩度用官方文件糾正 brief 的過時假設，這是機制不是意外）。
- 批次收尾固定關卡：`npm run build`＋`node scripts/check-links.mjs`（零白名單）＋掃 `<!--`／`</content>`／簡繁。
- 內容頁 frontmatter 五欄必填（zod 強制）；查不到官方依據標「⚠ 未驗證」；黃金抽查用「兩邊都能 Ctrl+F 到的英文術語錨點」。
- 內部連結相對路徑（注意 index 頁與非 index 頁深度差一層）；astro.config.mjs 側欄「版本更新」節有 `// UPDATES-INSERT-POINT` 錨點。
- 排程 runner 與主對話共用工作目錄：排程時段主對話保持乾淨樹。
- repo public；git push 需向使用者確認（可開工時徵求該輪一次性授權）。
