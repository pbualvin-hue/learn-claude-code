# Claude Code 學習手冊

用繁體中文，把 [Claude Code](https://claude.com/claude-code) 的官方功能講清楚——原創教學、每頁附官方出處、**缺陷優先講**。給進階使用者，也給完全沒寫過程式的親友。

🌐 **線上瀏覽**：<https://pbualvin-hue.github.io/learn-claude-code/>

> ⚠️ 本站為**非官方**教學網站，與 Anthropic 無隸屬關係；Claude 為 Anthropic 之商標。
> 內容以每頁標示的 `base_version` 為準，可能與最新版本有落差。

## 這是什麼

- **學習路徑**：從安裝到做出第一個小專案，非工程師視角，遇到問題才學功能（做中學）。
- **安心使用**：資料會去哪、什麼不該給 AI、權限是你的保險、怎麼驗證 AI、git 當後悔藥。
- **功能參考**：字典式一功能一頁（CLAUDE.md 與記憶、hooks、MCP、skills、subagents…）。
- 每頁都標注內容依據的 Claude Code 版本與官方文件連結，可追溯。

## 技術棧

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)（靜態站，內建搜尋、深／淺色、側欄）
- GitHub Actions 建置 → GitHub Pages 部署（public repo，$0）
- 內容全為 Markdown／MDX，與框架解耦（框架可換、內容可攜）

## 本機開發

所有指令在專案根目錄的終端機執行：

| 指令 | 作用 |
| :--- | :--- |
| `npm install` | 安裝依賴 |
| `npm run dev` | 本機開發伺服器 `localhost:4321` |
| `npm run build` | 建置到 `./dist/` |
| `npm run preview` | 預覽建置結果 |
| `node scripts/check-links.mjs` | 內部連結稽核（`build` 後執行）|

## 授權

© 2026 本站作者，保留所有權利（All rights reserved）。
歡迎瀏覽學習；未經同意請勿轉載或改作。
