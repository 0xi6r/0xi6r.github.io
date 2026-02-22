// /api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Get IP address (handles both direct and proxied requests)
    const ip = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.socket.remoteAddress || 
               'Unknown';
    
    // Get user agent
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    // Get referrer
    const referrer = req.headers['referer'] || req.headers['referrer'] || 'Direct';
    
    // Get accept language
    const language = req.headers['accept-language'] || 'Unknown';

    // Get current timestamp in multiple formats
    const timestamp = new Date().toISOString();
    const localTime = new Date().toLocaleString();

    // Escape any special characters for Markdown
    const escapeMarkdown = (text) => {
      if (!text) return 'Unknown';
      return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
    };

    const telegramMessage = `
📬 *New Contact Form Submission*

👤 *Name:* ${escapeMarkdown(name)}
📧 *Email:* ${escapeMarkdown(email)}
📝 *Subject:* ${escapeMarkdown(subject || 'No subject')}
💬 *Message:*
${escapeMarkdown(message)}

---

📋 *Additional Information:*
🌐 *IP Address:* ${escapeMarkdown(ip)}
💻 *User Agent:* ${escapeMarkdown(userAgent)}
🔗 *Referrer:* ${escapeMarkdown(referrer)}
🌍 *Language:* ${escapeMarkdown(language)}
🕐 *Time (UTC):* ${timestamp}
🕐 *Local Time:* ${localTime}
    `;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      throw new Error(telegramData.description);
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('Contact API Error:', e);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
