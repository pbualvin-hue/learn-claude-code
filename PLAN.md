# PLAN.md — learn-claude-code 實作計畫
# 版本：1.2（2026-07-11）｜月費估算：$0（見成本表，關鍵單價已當日查證）
# 1.1 變更：納入學習功能（決策比較頁、心智模型圖、跟著做、疑難排解、glossary、cheatsheet、練習 repo、quiz）與 UX 規則，Phase 不增、停損閘門不動
# 1.2 變更：新增「打造你自己的 CLAUDE.md」課程（Phase 2）與互動式產生器（Phase 4）——個人化起步是融會貫通的橋，見 DECISIONS 第 7 輪
# 1.3 變更：課程主軸改為專案驅動（範本專案軌道）＋「安心使用」信任教育＋「怎麼跟 Claude 說話」＋誠實教學原則，見 DECISIONS 第 8 輪
# 1.4 變更（2026-07-12 凍結版）：細節標定移交 SPEC.md v1.0；Phase 0 加 base path 驗證；停損閘門判定方式明確化，見 DECISIONS 第 9 輪
# 1.5 變更（2026-07-12）：四項使用者裁決回填（帳號／授權／雙範本專案／排程週日21:00），Phase 2 工作量 +60% 知情接受，見 DECISIONS 第 10 輪
# 1.6 變更（2026-07-13）：納入 Anthropic Academy（方案 A：導覽頁＋課綱涵蓋度檢查＋sources），使用者裁決，見 DECISIONS 第 11 輪

## Phase 0 — 開工前置驗證（任一不過，先解決再開工）
# top 風險假設的 30 分鐘級實測；✓ = 規劃期已驗證
1. ✓ changelog 可程式化取得：raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md（2026-07-11 實測成功）
2. ✓ 排程機制存在且可操作（2026-07-11 已確認 scheduled-tasks 工具可用）
3. ☐ Starlight hello-world 在本機（Windows/npm）build 成功 → push → GitHub Actions → Pages 公開網址可開（驗證最脆弱的整合鏈：建置＋部署）；並驗證子路徑部署：CSS 正常載入＋抽 5 條內部連結全通（base path 已知坑，見 SPEC #1）
4. ☐ Pagefind 搜尋實測：英文指令名 3 組（如 hooks、mcp、/config）＋中文詞 3 組，記錄命中品質，決定情境索引頁的補償力道
5. ☐ 排程 agent 端到端小實驗：建一個測試排程任務，能讀 changelog 並產出一個檔案／draft PR（Phase 3 的可行性前哨，失敗不擋 Phase 1-2，但要提前知道）

## 目錄結構
```
learn-claude-code/
├── CLAUDE.md / PLAN.md / KICKOFF.md / DECISIONS.md
├── astro.config.mjs, package.json
├── src/content/docs/
│   ├── learn/        # 學習路徑（專案驅動：範本專案軌道，功能 just-in-time 登場；每課含「跟著做」）
│   ├── trust/        # 安心使用（資料去哪、什麼不該給 AI、權限當保險、AI 會錯怎麼驗證、git 當後悔藥）
│   ├── reference/    # 功能參考（字典式，一功能一頁）
│   ├── compare/      # 決策比較頁（規則 vs hooks vs skills vs agents vs settings）
│   ├── updates/      # 版本更新解讀（一版一頁）
│   ├── scenarios/    # 情境索引（「我想要⋯」→ 用什麼）
│   ├── troubleshooting/  # 疑難排解（症狀式人話標題）
│   └── glossary.mdx  # 詞彙表（非工程師向）
├── .github/workflows/deploy.yml
└── .claude/skills/update-content/   # 更新管線 skill（排程與手動共用）
```

## Phase 1 — 功能參考站上線（垂直切片：當天起親友就能用）
實作項：
- Starlight 骨架（繁中介面、深淺色、側欄）
- 核心參考頁 12–15 頁：什麼是 Claude Code、安裝、對話基礎、slash commands 總覽、內建工具（Read/Edit/Bash…）、CLAUDE.md 與記憶、settings 與權限、hooks、MCP、subagents、skills、常見問題
- 每頁含 frontmatter base_version / sources、入門段＋進階段
- 搜尋（Pagefind）＋部署上線（Actions → Pages）
完成標準（可驗證）：
- 公開網址可開；手機可讀
- 搜「hooks」「mcp」各能找到正確頁面
- 抽 3 頁對照官方文件無錯誤描述；每頁都有 base_version 與官方連結
- footer 顯示內容基準版本與更新日期

## Phase 2 — 學習路徑＋融會貫通層＋情境索引
實作項：
- 首頁雙入口分流：「新手→學習路徑」「查閱→搜尋＋情境索引」
- 全局心智模型圖：一張「一次對話裡 context／工具／權限／記憶／agent 怎麼互動」的全景圖（Mermaid/SVG 文字源碼），放課程開頭與首頁
- 「入門篇」課程：從安裝到第一次成功對話，非工程師視角，含截圖（標注版本）；每課附「跟著做」任務（可複製操作＋預期結果＋做壞了摺疊區）
- 「第一個專案」引導軌道（課程主軸，做中學）：雙範本並行、讀者自選（SPEC #8，使用者裁決）——A 整理練習資料夾／B 文件批次摘要（預設自產範例文件包，自備文件前強制過 trust/ 課）；功能在專案遇到問題時才登場（just-in-time）：卡權限→學 settings、想固定偏好→學 CLAUDE.md、重複流程→認識 skill、要接外部資料→安全使用現成 MCP 連接器；每站沉澱一條自己的規則；軌道終點附「下一步地圖」（從範本走向自己的專案）
- 「安心使用」章節（trust/）：資料會去哪裡、什麼東西不該給 AI（個資／密碼／機密）、權限系統是你的保險、AI 會犯錯——怎麼驗證產出、git 當後悔藥（做壞了可以回去）；用真實錯誤案例教，不粉飾
- 「怎麼跟 Claude 說話」課：描述需求（說目標不說步驟）、給足脈絡、大任務拆小、不滿意怎麼糾正、怎麼驗收結果——可遷移的互動方法
- 「打造你自己的 CLAUDE.md」課（軌道站點之一）：三行起步＋規則成長心法（規則對應真實踩過的問題、同一問題出現兩次才升格、定期修剪）；雙讀者版本；課末任務＝寫出自己的前三條規則。每課「跟著做」結尾統一加一問：「這個功能有沒有該進你 CLAUDE.md 的東西？」
- 誠實教學落地：每個功能頁補「限制與注意」節（依 CLAUDE.md #10）
- compare/ 決策比較頁組：「同一需求的 N 種解法」（規則 vs hooks vs skills vs agents vs settings），比較表＋選擇流程圖
- troubleshooting/ 首批 10 條（自己踩過的坑優先；症狀式標題）
- glossary 詞彙表；全站每頁補「先備知識」與「下一步」導引
- 「官方免費課程與證照」導覽頁（Anthropic Academy）：原創介紹＋外連，含課程與本站學習路徑的對應表；誠實標注全英文門檻與 Claude Code 101 需付費方案（NN #10）；不翻譯不改作課程內容（授權查證 2026-07-13：Skilljar 課程無明文授權＝保留所有權利）；官方課綱同時作為本站學習路徑的一次性涵蓋度檢查清單，Academy 課程頁可列入內容頁 sources
- scenarios/ 情境索引首批 10 個情境（例：想自動化重複流程→hooks；想接外部服務→MCP）
完成標準（可驗證）：
- 定量驗收：找一位非工程師親友照「入門篇」實走，30 分鐘內完成第一次對話、不需口頭求助（失敗處全部記錄回修）
- 個人化驗收：同一位親友走完「打造你自己的 CLAUDE.md」課後，寫出至少 3 條自己的偏好規則且實際生效（Claude 回應可觀察到差異）
- 軌道驗收：親友照引導軌道完成範本專案，且能自答「卡住時第一步做什麼」「哪些東西不該貼給 AI」（信任教育生效的證據）
- 誠實教學抽查：隨機抽 5 個功能頁皆有「限制與注意」節；資安相關頁全數人工複核（必抽，不進隨機池）
- 決策頁驗收：拿 3 個真實需求循選擇流程圖走，都落在正確功能
- 無死路抽查：隨機抽 5 頁，皆有先備知識與下一步連結；搜尋無結果頁導向情境索引
- 心智模型圖在深色／淺色／手機三種情境皆可讀
- 每個情境條目點進去能落在正確參考頁

## Phase 3 — 版本追蹤＋自動草稿管線
實作項：
- updates/ 區與版面（一版一頁：變更解讀＋受影響的參考頁清單）
- /update-content skill：讀 changelog 自上次基準版以來的條目 → 產出 updates 草稿＋列出需改動的 reference 頁 → 開 draft PR；changelog 涉及 hooks／skills／agents／settings／權限時，草稿必含決策比較頁複審結果（融會貫通層最易過時，強制盯防）
- 週排程任務觸發該 skill；排程訊息附審核提醒
- 單頁 cheatsheet 指令速查表（含列印用 CSS）——學完課程後的日常伴侶
完成標準（可驗證）：
- 一次真實新版 release 走完全流程：偵測 → 草稿 PR → 你審核（目標 ≤10 分鐘）→ merge → 網站自動更新且 footer 版本號跳新
- 排程失敗時 footer 日期停滯可肉眼發現（不靜默）

## Phase 4（選配）— 開發者軌道＋整合練習
- 「第二條專案軌道」（開發者向）：從專案需求出發自建 skills／tools／MCP／外掛的教學（通用規範設計、個人習慣沉澱、自訂 agents/skills/rules；全部過去識別化檢查清單）
- 練習專案 repo：刻意設計的小 repo（含小 bug、缺文件、缺測試），課程引導學習者 clone 後用 Claude Code 實戰（修 bug→寫測試→開 PR）；練習步驟寫成目標導向而非逐鍵操作（降低過時率），repo 亦標 base_version
- 互動式 CLAUDE.md 產生器：純前端問答表單（雙讀者問題組）→ 即時組出可複製的起步版 CLAUDE.md；不傳送、不儲存任何輸入（隱私），輸出上限刻意壓在 10 條內（防大而全反模式）
- 章節自測 quiz（純前端、即時對答案）＋課程進度勾選（localStorage，UI 明示僅存本裝置）
- 進入條件：Phase 1–3 穩定運行、停損閘門未觸發，且至少一位親友走完入門篇（沒人上課就不用蓋考場）

## 停損閘門
# 判定方式（SPEC #10）：不裝追蹤器；上線後第 4 週排程提醒觸發人工檢查點——直接詢問親友＋自己查閱頻率自評＋GitHub issue/star 輔助
- Phase 1 上線 4 週後：若親友實際使用 <2 人且自己每週查閱 <1 次 → 停止 Phase 3 管線建設，降級為「想到才手動更新」，Phase 4 取消。
- Phase 3 上線後：草稿連續 3 次需大改才能發布 → 管線降級為「排程只提醒新版本，內容互動式更新」。
- 任一免費層被收回且無零成本替代 → 停留當前 Phase，重新評估而非自動掏錢。

## 成本表（單價查證日期：2026-07-11）
| 扣款來源 | 用量假設 | 單價 | 月費估算 |
|---|---|---|---|
| GitHub Pages | <1GB 站台、<<100GB/月流量 | $0（public repo；軟上限 100GB/月、站台 1GB；非合約保證） | $0 |
| GitHub Actions | 每週 1–3 次 build | $0（public repo 免費；非合約保證） | $0 |
| 排程草稿 agent | 週 1 次，讀 changelog 寫草稿 | 計入現有 Claude 訂閱額度（非合約保證） | $0 增支 |
失控向量：排程頻率調高會吃訂閱額度 → 鎖定週 1；草稿任務 context 膨脹 → skill 內限定只讀 changelog 增量與受影響頁面。
扣款方式：無綁卡需求。預算警告位置：不適用（全 $0，超額表現為「額度用完」而非扣款）。

## 規模擴大路線圖
- 內容量增長（>60 頁）→ 重整側欄資訊架構、加 tags
- 讀者增長 → 靜態站天然承受，無動作；若有共編需求（他人投稿）再評估 PR 流程開放
- 明確不做：多語言、留言系統、會員系統、自架後端

## 風險與備援（附切換成本）
| 風險 | 備援 | 切換成本 |
|---|---|---|
| 排程 agent 功能變動/額度縮減 | /update-content 手動觸發照常可用（Non-Negotiable #9） | 低（本來就是同一 skill） |
| Starlight 停止維護 | 內容全為 MD/MDX，遷移任一靜態框架 | 中（重建版面，內容不動） |
| GitHub Pages 免費層變動 | Cloudflare Pages / Netlify 免費層 | 低（靜態站搬家） |
| changelog 格式改變 | skill 解析失敗即在 PR 草稿中標示原文，人工判讀 | 低（審核本來就在流程裡） |

## 對抗迭代駁回紀錄
見 DECISIONS.md（防重提：全文翻譯、全自動發布、Docusaurus、自架後端、即時跟版皆已駁回）。
