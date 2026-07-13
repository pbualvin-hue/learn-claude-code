import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// SPEC #4：正確性欄位用 zod 強制，缺欄位＝build fail（決定論優先，不靠審核時記得檢查）。
// 每頁（含首頁）皆須帶 base_version 與 sources，對應 CLAUDE.md #4 可追溯性機制。
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// 本頁內容依據的 Claude Code 版本（取草稿日 changelog 最新版）
				base_version: z.string(),
				// 官方文件連結，原創教學的依據；至少一條，且須為合法 URL
				sources: z.array(z.string().url()).min(1),
				// 雙讀者分流：beginner（非工程師）／dev（開發者）／both
				audience: z.enum(['beginner', 'dev', 'both']),
				// 最後人工複核日
				last_reviewed: z.coerce.date(),
			}),
		}),
	}),
};
