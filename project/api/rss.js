import RSS from 'rss';

export default async function handler(req, res) {
  const feed = new RSS({
    title: 'Your Blog',
    feed_url: 'https://yourdomain.com/api/rss',
    site_url: 'https://yourdomain.com',
  });

  // Fetch and add posts (similar logic as above)

  res.setHeader('Content-Type', 'application/rss+xml');
  res.status(200).send(feed.xml());
}
