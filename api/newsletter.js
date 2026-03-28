// /api/newsletter.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  // ---- CORS FIX ----
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // -------------------

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source } = req.body;

  if (!email || !/^.+@.+\..+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const ip =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.socket.remoteAddress ||
      'Unknown';

    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referrer =
      req.headers['referer'] || req.headers['referrer'] || 'Direct';
    const language = req.headers['accept-language'] || 'Unknown';

    const timestamp = new Date().toISOString();
    const localTime = new Date().toLocaleString();

    const cleanText = (text) => {
      if (!text) return 'Unknown';
      return text.replace(/\n/g, ' ').trim();
    };

    const telegramMessage = `
📬 NEWSLETTER SUBSCRIPTION

📧 Email: ${cleanEmail}
📱 Source: ${source || 'footer_signup'}

📋 ADDITIONAL INFO:
🌐 IP: ${ip}
💻 User Agent: ${cleanText(userAgent)}
🔗 Referrer: ${referrer}
🌍 Language: ${language}
🕐 Time (UTC): ${timestamp}
🕐 Local: ${localTime}
`;

    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
        }),
      }
    );

    await resend.emails.send({
      from: '0xi6r@tutamail.com',
      to: cleanEmail,
      subject: 'Welcome to Security Insights Newsletter!',
      html: `
        <h2>Welcome to Security Insights!</h2>
        <p>Hi there,</p>
        <p>Thanks for subscribing. You'll receive regular updates and practical security insights.<br>No spam—unsubscribe anytime.</p>
        <p>Stay secure,<br/>Isaac (0xi6r)</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter API Error:', err);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
