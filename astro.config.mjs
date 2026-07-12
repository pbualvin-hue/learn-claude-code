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
			sidebar: [
				{
					label: 'Guides',
					items: [{ label: 'Example Guide', slug: 'guides/example' }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'Phase 0 測試',
					items: [{ autogenerate: { directory: 'phase0-test' } }],
				},
			],
		}),
	],
});
