// /api/newsletter.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, user_agent, source } = req.body;

  if (!email || !/^.+@.+\..+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Escape special characters for Markdown
    const escapeMarkdown = (text) => {
      if (!text) return 'Unknown';
      return text
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/~/g, '\\~')
        .replace(/`/g, '\\`')
        .replace(/>/g, '\\>')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!');
    };

    // Format the message for Telegram without Markdown (option 1)
    const telegramMessage = `
📬 NEW NEWSLETTER SUBSCRIPTION

Email: ${cleanEmail}
Source: ${source || 'footer_signup'}
User Agent: ${user_agent || 'Unknown'}
Time: ${new Date().toLocaleString()}
    `;

    // Send to Telegram without parse_mode (plain text)
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          // Remove parse_mode to send as plain text
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      console.error('Telegram error:', telegramData);
      throw new Error(telegramData.description || 'Failed to send Telegram message');
    }

    // Send welcome email via Resend
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
