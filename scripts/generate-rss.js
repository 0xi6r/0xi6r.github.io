import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '../blogs');
const outputPath = path.join(__dirname, '../public/rss.xml');

const SITE_URL = 'https://0xi6r.github.io';
const SITE_TITLE = 'Isaac, Infosec Research';
const SITE_DESCRIPTION = 'Security research, malware analysis, and red team content';

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

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

const items = files.map(filename => {
  const content = fs.readFileSync(path.join(blogsDir, filename), 'utf-8');
  const { metadata, body } = parseFrontmatter(content);
  const id = filename.replace('.md', '');
  
  return {
    title: metadata.title || id.replace(/-/g, ' '),
    date: metadata.date || new Date().toISOString().split('T')[0],
    description: metadata.excerpt || body.substring(0, 300) + '...',
    category: metadata.category || 'General',
    link: `${SITE_URL}/#/blog?post=${id}`,
    id
  };
});

items.sort((a, b) => new Date(b.date) - new Date(a.date));

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`).join('')}
  </channel>
</rss>`;

fs.writeFileSync(outputPath, rss);
console.log(`✅ RSS feed generated: ${outputPath}`);
console.log(`   ${items.length} posts included`);
