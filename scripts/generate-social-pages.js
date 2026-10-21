import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '../blogs');
const outputDir = path.join(__dirname, '../public/articles');
const publicDir = path.join(__dirname, '../public');

const SITE_URL = 'https://0xi6r.github.io';
const SITE_NAME = '0xi6r';
const DEFAULT_IMAGE = `${SITE_URL}/0xi6r.png`;

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { metadata: {}, body: content };

  const metadata = {};
  match[1].split('\n').forEach(line => {
    const [key, ...parts] = line.split(':');
    if (key && parts.length) {
      metadata[key.trim()] = parts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  return { metadata, body: match[2] };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toAbsoluteUrl(value) {
  if (!value) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;

  const localPath = value.replace(/^\/+/, '');
  return fs.existsSync(path.join(publicDir, localPath))
    ? `${SITE_URL}/${localPath}`
    : DEFAULT_IMAGE;
}

const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));

files.forEach(filename => {
  const content = fs.readFileSync(path.join(blogsDir, filename), 'utf-8');
  const { metadata, body } = parseFrontmatter(content);
  const id = filename.replace('.md', '');
  const title = metadata.title || id.replace(/-/g, ' ');
  const description = metadata.excerpt || `${body.substring(0, 300)}...`;
  const category = metadata.category || 'General';
  const image = toAbsoluteUrl(metadata.image);
  const articleUrl = `${SITE_URL}/articles/${encodeURIComponent(id)}/`;
  const readerUrl = `${SITE_URL}/#/blog?post=${encodeURIComponent(id)}`;
  const outputPath = path.join(outputDir, id, 'index.html');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | ${SITE_NAME}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${articleUrl}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${articleUrl}">
    <meta property="og:image" content="${image}">
    <meta property="article:published_time" content="${escapeHtml(metadata.date || '')}">
    <meta property="article:section" content="${escapeHtml(category)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${image}">
    <script>window.location.replace(${JSON.stringify(readerUrl)});</script>
  </head>
  <body>
    <p>Opening <a href="${readerUrl}">${escapeHtml(title)}</a>...</p>
  </body>
</html>
`);
});

console.log(`✅ Social share pages generated: ${files.length} articles`);
