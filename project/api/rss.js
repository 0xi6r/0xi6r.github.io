import RSS from 'rss';

export default async function handler(req, res) {
  const feed = new RSS({
    title: 'Your Blog',
    feed_url: 'https://0x-i6r.vercel.app/api/rss',
    site_url: 'https://0x-i6r.vercel.app',
  });

  // Fetch and add posts (similar logic as above)

  res.setHeader('Content-Type', 'application/rss+xml');
  res.status(200).send(feed.xml());
}
