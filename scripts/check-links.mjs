// 集中式內部連結稽核（DECISIONS 2026-07-13：批次產文後連結一律集中稽核一次）。
// 掃 dist/ 每個 HTML 的內部 <a href>，把它相對於該頁 URL 解析後，
// 驗證目標在 dist/ 真的存在。抓「多一層 ../」「slug 打錯」「下載檔不存在」這類死連結。
//
// 用法：node scripts/check-links.mjs
// 退出碼：有死連結時為 1（可接排程/CI）；--allow-missing <slug,slug> 可白名單尚未產出的頁面。
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BASE = '/learn-claude-code';

// 白名單：尚未產出、預期之後批次補上的頁面前綴（相對 BASE）。
const allowArg = process.argv.indexOf('--allow-missing');
const ALLOW = allowArg > -1 ? (process.argv[allowArg + 1] || '').split(',').filter(Boolean) : [];

if (!existsSync(DIST)) {
  console.error('dist/ 不存在，請先 npm run build');
  process.exit(2);
}

/** 遞迴列出所有檔案（絕對路徑）。 */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

/** dist 絕對路徑 → 站台 URL pathname（含 BASE）。 */
function distToUrl(absPath) {
  const rel = relative(DIST, absPath).split('\\').join('/');
  return `${BASE}/${rel}`;
}

// 建立「存在的 URL」集合：每個檔案對應的可請求 pathname。
const existing = new Set();
for (const f of allFiles) {
  const url = distToUrl(f);
  existing.add(url);
  if (url.endsWith('/index.html')) existing.add(url.slice(0, -'index.html'.length)); // 目錄式 URL（結尾 /）
}

const hrefRe = /href="([^"]+)"/g;
const problems = [];

for (const file of htmlFiles) {
  const pageUrl = `http://site${distToUrl(file).replace(/index\.html$/, '')}`; // 該頁的目錄式 URL
  const html = readFileSync(file, 'utf8');
  let m;
  const seen = new Set();
  while ((m = hrefRe.exec(html))) {
    const raw = m[1];
    if (seen.has(raw)) continue;
    seen.add(raw);
    // 只查內部連結：跳過外部、錨點、mailto、tel 等。
    if (/^(https?:|mailto:|tel:|#|data:)/.test(raw)) continue;
    let resolved;
    try {
      resolved = new URL(raw, pageUrl).pathname;
    } catch {
      problems.push({ file, raw, reason: '無法解析' });
      continue;
    }
    if (!resolved.startsWith(BASE)) {
      problems.push({ file, raw, reason: `解析後跳出 base（${resolved}）` });
      continue;
    }
    if (ALLOW.some((a) => resolved.startsWith(`${BASE}/${a}`))) continue; // 白名單
    // 命中規則：目錄式 URL（結尾 /）→ 對應 index.html；否則直接檔案。
    const candidates = [resolved];
    if (resolved.endsWith('/')) candidates.push(`${resolved}index.html`);
    const ok = candidates.some((c) => existing.has(c) || existsSync(join(DIST, c.slice(BASE.length + 1))));
    if (!ok) problems.push({ file: distToUrl(file), raw, reason: `目標不存在（→ ${resolved}）` });
  }
}

if (problems.length === 0) {
  console.log(`✓ 連結稽核通過：${htmlFiles.length} 個頁面，無死連結。`);
  process.exit(0);
}
console.log(`✗ 發現 ${problems.length} 個死連結：\n`);
for (const p of problems) console.log(`  [${p.reason}]\n    在：${p.file}\n    連結：${p.raw}\n`);
process.exit(1);
