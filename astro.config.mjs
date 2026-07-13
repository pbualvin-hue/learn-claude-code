// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://pbualvin-hue.github.io',
	base: '/learn-claude-code',
	integrations: [
		starlight({
			title: 'Claude Code 學習手冊',
			// 可讀性優先：放大字級/行距，對中老年、非工程師受眾友善（見 src/styles/custom.css）
			customCss: ['./src/styles/custom.css'],
			defaultLocale: 'root',
			locales: {
				root: { label: '繁體中文', lang: 'zh-TW' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/pbualvin-hue/learn-claude-code' },
			],
			// Footer 覆寫：版本基準＋免責＋授權（SPEC #7 / #11）
			components: {
				Footer: './src/components/Footer.astro',
			},
			// SPEC #6 資訊架構。Phase 1 只掛「功能參考」節（其餘節於 Phase 2/3 上線）。
			// 順序顯式列出，對齊 SPEC #6 參考頁清單（不用 autogenerate，避免字母序打亂閱讀動線）。
			sidebar: [
				{
					label: '開始使用',
					items: [
						{ label: '第一次啟動 Claude Code', slug: 'learn/getting-started' },
						{ label: '怎麼跟 Claude 說話', slug: 'learn/how-to-talk-to-claude' },
						{ label: '打造你自己的 CLAUDE.md', slug: 'learn/your-own-claude-md' },
						{ label: '官方免費課程（Anthropic Academy）', slug: 'learn/anthropic-academy' },
					],
				},
				{
					label: '第一個專案',
					items: [
						{ label: '軌道總覽：邊做邊學', slug: 'learn/first-project' },
						{ label: 'A：整理練習資料夾', slug: 'learn/first-project/track-a-organize-folder' },
						{ label: 'B：文件批次摘要', slug: 'learn/first-project/track-b-batch-summary' },
						{ label: '下一步地圖', slug: 'learn/first-project/next-step-map' },
					],
				},
				{
					label: '安心使用',
					items: [
						{ label: '你的資料會去哪裡', slug: 'trust/where-does-data-go' },
						{ label: '什麼不該給 AI', slug: 'trust/what-not-to-share' },
						{ label: '權限是你的保險', slug: 'trust/permissions-as-insurance' },
						{ label: 'AI 會犯錯——怎麼驗證', slug: 'trust/verify-ai-output' },
						{ label: 'git 是你的後悔藥', slug: 'trust/git-as-undo' },
					],
				},
				{
					label: '功能參考',
					items: [
						{ label: '什麼是 Claude Code', slug: 'reference/what-is-claude-code' },
						{ label: '安裝與啟動', slug: 'reference/install' },
						{ label: '對話與基本操作', slug: 'reference/conversation-basics' },
						{ label: 'slash commands 總覽', slug: 'reference/slash-commands' },
						{ label: '內建工具', slug: 'reference/built-in-tools' },
						{ label: 'CLAUDE.md 與記憶', slug: 'reference/claude-md-memory' },
						{ label: 'settings 與權限模式', slug: 'reference/settings-permissions' },
						{ label: 'hooks', slug: 'reference/hooks' },
						{ label: 'MCP 連接器', slug: 'reference/mcp' },
						{ label: 'subagents', slug: 'reference/subagents' },
						{ label: 'skills', slug: 'reference/skills' },
						{ label: '背景任務與排程', slug: 'reference/background-tasks-scheduling' },
						{ label: '.claude 目錄結構', slug: 'reference/claude-directory' },
						{ label: '常見問題 FAQ', slug: 'reference/faq' },
					],
				},
			],
		}),
	],
});
