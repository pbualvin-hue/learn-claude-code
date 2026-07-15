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
3. ✓ Starlight hello-world 建置部署鏈全通（2026-07-13：本機 build／Actions／Pages／子路徑 CSS／5 條內部連結皆過；hero.actions 忽略 base 的已知坑實證 404 並修復——CI 需 pin Node 24）
4. ✓ Pagefind 實測（2026-07-13）：英文指令名 hooks/mcp//config 全命中排第一；中文詞「權限／排程／記憶」與長句精準比對均命中——補償力道可放輕，情境索引頁照計畫保留
5. ▲ 排程 agent 端到端：觸發準時＋session 啟動＋工具執行已證實；無人值守全程產出 draft PR 未一次成功（三道啟動閘門與解法見 DECISIONS 2026-07-13），末段驗證併入 Phase 3 部署重測——依本項原定位不擋 Phase 1-2

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

### Phase 1 執行清單（2026-07-13 使用者確認，開新 session 執行）
A. 骨架與機制：
1. src/content.config.ts——zod 強制 frontmatter（base_version／sources≥1／audience／last_reviewed，缺＝build fail，SPEC #4）
2. src/data/content-state.json——狀態檔初始化（SPEC #7）
3. src/components/Footer.astro——footer 覆寫：基準版本＋更新日＋免責聲明＋© 保留所有權利（SPEC #11）
4. astro.config.mjs——側欄改 SPEC #6 資訊架構（Phase 1 只掛功能參考節）＋掛 footer
5. src/content/docs/index.mdx——首頁 Phase 1 簡版（雙入口分流完整版屬 Phase 2）
6. 刪除 phase0-test/ 三頁＋guides/example.md＋reference/example.md（使用者已核准刪除 2026-07-13，新 session 不需再問）
B. 參考頁 14 頁（SPEC #6 清單；每頁：入門段→進階段→限制與注意→下一步；草稿委派 agent 產出、主對話審核；base_version 取草稿日 changelog 最新版）
C. 驗收：PLAN Phase 1 完成標準逐項附證據＋merge 前黃金抽查
注意：Phase 0 的 push 一次性授權已結束，Phase 1 的 git push 需重新向使用者確認（或於開工時徵求本 Phase 授權）。

### Phase 1 完成判定（2026-07-13 執行）— ✓ 通過（本地驗收全過，live URL 待 Actions 部署後補證）
- A 骨架 6 項全數落地：content.config.ts（zod 強制 base_version/sources≥1/audience/last_reviewed，含首頁；缺欄位 build fail）、content-state.json（2.1.207）、Footer.astro（版本＋更新日＋免責＋© 保留所有權利，讀狀態檔）、astro.config.mjs（側欄 SPEC #6 只掛功能參考節＋掛 footer）、index.mdx（Phase 1 簡版首頁）、刪 phase0-test/×3＋guides/example.md＋reference/example.md。
- B 參考頁 14 頁：5 個 docs-writer agent 平行產出、主對話審核；base_version=2.1.207（草稿日 changelog 最新版，實測取得）。全 14 頁四節齊全（入門→進階→限制與注意→下一步）、5 個自訂 frontmatter 欄位齊全、內部連結全為相對路徑（0 手寫 base 前綴）、23 條 sources URL 全數 curl 200。誠實教學落地：claude-directory ×2、faq ×1、mcp ×1 標 ⚠ 未驗證（皆為官方未載明之細節，非捏造遮掩）。
- C 驗收證據：`npm run build` 成功（16 頁，Pagefind 索引 16 檔）；footer HTML 實測顯示「內容基準版本 v2.1.207｜最後更新 2026-07-13」＋免責＋© 保留所有權利；Pagefind API 實查 hooks→hooks、mcp→mcp、權限→settings-permissions、排程→background-tasks-scheduling 皆命中第一；手機 375px 側欄收合為選單鈕、搜尋 overlay 可用；黃金抽查 3 條（安全權重）對照官方文件全數相符——hooks 事件名＋allowManagedHooksOnly、permissions 比對順序 deny>ask>allow＋workspace trust＋curl 萬用字元脆弱性、/loop 7 天過期＋session-scoped＋jitter＋cron 子集＋Routines research preview＋1 小時最小間隔。
- 修正紀錄：草稿 agent 將 2 處「下一步」誤連 `../settings/`（實際 slug 為 `settings-permissions`），主對話審核時修正。
- 待補：PLAN 完成標準「公開網址可開」需 push→GitHub Actions 部署後於 live URL 補證（Phase 0 已證部署鏈全通，低風險）。

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

### Phase 2 完成判定（2026-07-14 執行）— ✓ 內容完成並上線（真人親友驗收待使用者安排）
- 站上線 33 頁（含 404），連結稽核零死鏈（`scripts/check-links.mjs`，無白名單全通）。實作項全數落地：
  - 首頁雙入口分流＋「一句話怎麼運作」簡圖（可點 🔒 權限/🛟 git）＋新手三步 LinkCard（原密集全景圖因對新手資訊爆炸而下架，改簡圖；詳盡 MentalModel 保留為元件）。
  - 開始使用：getting-started（含手繪終端機示意圖）／how-to-talk-to-claude／your-own-claude-md（三行起步＋雙讀者）／anthropic-academy（原創導覽＋涵蓋度對應表，5 課驗證免費、其餘標未驗證）。
  - 第一個專案軌道：index＋track-a（整理資料夾）＋track-b（文件摘要，硬閘門先過 trust）＋next-step-map；practice-folder.zip／sample-docs.zip 自產素材。
  - 安心使用 trust 5 頁（資安必抽全複核：訓練預設值經使用者裁決收斂為不斷言、導自查）。
  - 比較與情境：compare 決策比較頁／scenarios 情境 10／troubleshooting 症狀 10；glossary 詞彙 19。
  - reference 14 頁補齊「先備知識」。
- 完成標準自驗（真人驗收除外）：無死路＝31 內容頁全數同具先備知識＋下一步；誠實教學＝14/14 功能頁有「限制與注意」、trust 全複核；決策頁走查 3 需求皆落正確功能；心智模型/風格深淺色手機三情境已驗；情境/連結點進落正確頁（連結稽核背書）。
- 可讀性迭代（使用者回饋）：字型堆疊補中文黑體（修「字大仍難讀」根因）、放大字級、口語化語氣、Steps/CardGrid/emoji 視覺。
- 超出原 SPEC 的使用者主導新增：**風格切換器**（乾淨/潑墨/手繪/塗鴉，data-skin＋localStorage per 裝置，覆寫 ThemeSelect）、首頁改版、正式 README。維護成本攤牌與落實見 DECISIONS 2026-07-14；SPEC/PLAN 正式收錄見下「Phase 2 追加（回填）」。
- 待辦（不擋 Phase 2 內容驗收）：真人親友照入門篇實走＋寫出 3 條規則＋走完範本專案（PLAN 完成標準，使用者安排）；詳盡 MentalModel 全景圖可於日後放進某課「想看完整全貌」處（選配）。

### Phase 2 追加（回填，2026-07-14）— 風格切換器
- 使用者要求「做個選風格按鈕讓使用者自選」。收「乾淨（預設）＋潑墨＋手繪＋塗鴉」四種皮膚，`data-skin` 屬性驅動（`src/styles/skins.css`），選擇存 localStorage（per 裝置，對齊「不做帳號系統」），覆寫 Starlight `ThemeSelect` 加「🎨 風格」選單、`head` inline script 防閃爍。內文所有皮膚下維持乾淨大字高對比，花俏字型有黑體 fallback。
- 維護成本知情接受：每皮膚 ×深/淺色×手機需維持可讀，屬個人化/delight（性質近 Phase 4，使用者要求提前）。停損閘門若觸發（親友使用不足），此功能列可砍範圍。

### Phase 2 追加（2026-07-15）— 學習路徑順序修復（使用者通讀回饋，DECISIONS 第 12 輪）
- 主線收斂為 5 站且首頁／側欄同一條路：① 第一次啟動 → ② 怎麼跟 Claude 說話 → ③ 第一個專案 → ④ 安心使用（定位＝進真實檔案前必讀，B 軌道硬閘門自然吻合）→ ⑤ 打造你自己的 CLAUDE.md（自「開始使用」移到軌道之後，對齊 just-in-time 原則）；Anthropic Academy 移出主線改「更進一步」選讀。
- 新增 `src/components/PathStep.astro`：主線 12 頁頂部「🚏 學習路徑 X/5」標記（BASE_URL 組連結，避開 base 坑）；側欄節與項目加 ①–⑤ 編號。
- 驗證：build 33 頁、check-links 零死鏈、深淺色對比與手機 375px 無溢出（截圖工具逾時沿用 read_page＋JS 驗證慣例）。
- Phase 2.5（裁決待排程，於 Phase 3 之後）：陪跑章＋加深現有軌道＋加深功能參考頁進階段——彌合「知道功能了但不知道要做什麼」斷層；不含開發者軌道提前。

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
