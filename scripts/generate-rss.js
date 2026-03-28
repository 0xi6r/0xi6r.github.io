import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (match) {
    const frontmatter = match[1];
    const body = match[2];
    const metadata = {};

    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      }
    });

    return { metadata, body };
  }

  return { metadata: {}, body: content };
}

async function generateRSS() {
  // Initialize feed
  const feed = new RSS({
    title: 'Your Blog Name',
    description: 'Security research, malware analysis, and offensive security insights',
    feed_url: 'https://yourdomain.com/rss.xml',
    site_url: 'https://yourdomain.com',
    image_url: 'https://yourdomain.com/logo.png', // Optional
    managingEditor: 'your@email.com (Your Name)',
    webMaster: 'your@email.com (Your Name)',
    copyright: `${new Date().getFullYear()} Your Name`,
    language: 'en',
    categories: ['Security', 'Cybersecurity', 'Research'],
    pubDate: new Date(),
    ttl: 60
  });

  // Read all markdown files
  const blogsDir = path.join(__dirname, '../src/blogs');
  const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));

  const posts = [];

  for (const file of files) {
    const filePath = path.join(blogsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { metadata, body } = parseFrontmatter(content);

    const filename = file.replace('.md', '');

    posts.push({
      id: filename,
      title: metadata.title || filename.replace(/-/g, ' '),
      date: metadata.date || new Date().toISOString().split('T')[0],
      excerpt: metadata.excerpt || body.substring(0, 200) + '...',
      content: body,
      category: metadata.category || 'General'
    });
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Add posts to feed
  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://yourdomain.com/blog?post=${post.id}`,
      guid: post.id,
      categories: [post.category],
      date: new Date(post.date),
      // Optional: Include full content
      // custom_elements: [
      //   {'content:encoded': post.content}
      // ]
    });
  });

  // Generate XML
  const xml = feed.xml({ indent: true });

  // Write to public directory
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), xml);
  console.log('✅ RSS feed generated successfully at public/rss.xml');
}

generateRSS().catch(console.error);
