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
