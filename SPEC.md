# SPEC.md — learn-claude-code 架構細節標定（正本）
# 版本：1.1（2026-07-12）｜1.0 規劃凍結產出；1.1 四項使用者裁決回填（帳號、授權、範本專案、排程），無待填變數
# 原則：本檔與 CLAUDE.md/PLAN.md 衝突時，先停下討論，不自行擇一

## 0. 待填變數
-（無）GitHub 帳號名已由使用者提供：`pbualvin-hue`（2026-07-12）

## 1. 命名與位址
- Repo：`learn-claude-code`（public，使用者 2026-07-12 裁決）
- 網址：`https://pbualvin-hue.github.io/learn-claude-code/`（project site，不買自訂網域——$0 原則）
- astro.config.mjs：`site: 'https://pbualvin-hue.github.io'`、`base: '/learn-claude-code'`
- ⚠ 已知坑（2026-07-12 查證）：base 子路徑部署下，markdown 內部連結不會自動加前綴，hero.actions 在 index.mdx 會忽略 base——內部連結一律用 Starlight sidebar autogenerate 與相對路徑；Phase 0 部署驗證必含「子路徑下 CSS 載入＋抽 5 條內部連結全通」

## 2. 技術棧與版本策略
- Node.js：開工日最新 LTS（版本號開工時記入本節附註，不憑記憶）
  - 附註（2026-07-12 開工日記錄）：本機 Node v24.18.0／npm 11.16.0；scaffold 實際版本 astro ^7.0.2、@astrojs/starlight ^0.41.3，已由 package-lock.json 鎖定
- 套件管理：npm；scaffold：`npm create astro@latest -- --template starlight`
- Astro／Starlight／Pagefind：開工日 stable，package-lock.json 鎖定；升級策略「build 壞了才升」（DECISIONS R2）
- 部署：GitHub Actions 用 Astro 官方 GitHub Pages workflow（withastro/action）

## 3. 目錄結構（定稿）
同 PLAN.md，另補：`public/downloads/practice-folder.zip`（範本專案練習資料夾，自產檔案）

## 4. Frontmatter schema（content collection 以 zod 強制，缺欄位＝build fail）
| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| title / description | string | ✔ | Starlight 內建 |
| base_version | string | ✔ | 內容依據的 Claude Code 版本 |
| sources | url[] ≥1 | ✔ | 官方文件連結（原創教學的依據） |
| audience | beginner／dev／both | ✔ | 雙讀者分流 |
| last_reviewed | date | ✔ | 最後人工複核日 |
- 決定論優先：正確性欄位用 schema 強制，不靠審核時記得檢查

## 5. 頁面模板
- 參考頁：入門段（白話＋比喻）→ 進階段 → **限制與注意（必有）** → 下一步（必有）
- 課程頁：目標 → 跟著做（可複製操作＋預期結果＋做壞了摺疊區）→「該進你的 CLAUDE.md 嗎？」→ 下一步

## 6. 側欄資訊架構與參考頁定稿（14 頁）
側欄順序：開始使用 → 第一個專案（軌道）→ 安心使用 → 功能參考 → 比較與情境 → 版本更新 → 詞彙表／速查
參考頁清單：什麼是 Claude Code／安裝與啟動／對話與基本操作／slash commands 總覽／內建工具／CLAUDE.md 與記憶／settings 與權限模式／hooks／MCP 連接器／subagents／skills／背景任務與排程／.claude 目錄結構／FAQ

## 7. 更新管線契約（/update-content skill）
- 狀態檔：`src/data/content-state.json` → `{ "last_covered_version": "x.y.z", "last_run": "<ISO>" }`
- 輸入：抓 raw CHANGELOG.md，取 (last_covered, latest] 區間條目
- 輸出：`updates/` 一篇（多版可合併，檔名含版本區間）＋受影響參考頁清單與建議修改＋更新狀態檔＋branch `content/update-<版本>` 開 draft PR
- PR body 固定檢查清單：隨機抽 3 條對照官方文件｜觸及 hooks/skills/agents/settings/權限 → 決策頁複審｜資安頁必抽｜footer 版本確認
- 排程：每週日 21:00（Asia/Taipei，使用者 2026-07-12 選定）；解析失敗 → PR 附 changelog 原文人工判讀
- footer 版本號讀取來源＝狀態檔（單一事實來源）

## 8. 範本專案（定稿：雙範本並行，使用者 2026-07-12 裁決）
- 軌道入口讓讀者二選一：
  - A「整理雜亂的練習資料夾」：網站提供自產 practice-folder.zip，全程在練習資料夾內操作，不碰真實檔案（做壞可重來＝信任教育的實物教材）
  - B「文件批次摘要」：教學預設用自產範例文件包（隨站提供，無隱私與版權變數）；讀者若改用自己的文件，軌道強制先經過 trust/「什麼不該給 AI」一課才繼續
- 知情成本：雙範本使 Phase 2 內容工作量約 +60%，使用者已接受（翻案紀錄見 DECISIONS）

## 9. 圖規格
- 圖的原始碼（.mmd／.svg）進 repo 版控；頁面嵌 build 產出的 SVG；不做 client-side JS 渲染（效能與複雜度）
- Phase 1 先手寫 SVG；Mermaid build 整合僅在圖量變大後評估

## 10. 量測與停損判定（隱患修復：閘門原本沒有數據來源）
- 不裝任何分析追蹤器（隱私優先、$0、親友受眾追蹤無意義）
- 停損數據改為人工檢查點：上線後第 4 週排程提醒觸發自評——直接詢問親友使用情況＋自己查閱頻率＋GitHub issue/star 輔助
- PLAN.md 停損閘門的「使用人數」依此判定，不假設有自動數據

## 11. 授權與免責（隱患修復：公開站缺這兩件會出事）
- 全站 footer 固定聲明：「本站為非官方教學網站，與 Anthropic 無隸屬關係；Claude 為 Anthropic 之商標」
- 授權（使用者 2026-07-12 裁決）：保留所有權利——footer 標「© 2026 本站作者，保留所有權利」；不採 CC 授權，他人不得轉載或改作（親友瀏覽公開網址不受影響）
