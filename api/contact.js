// /api/contact.js

// Configuration
const REQUIRED_FIELDS = ['name', 'email', 'message'];
const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

// Helper: Extract client info from request
const extractClientInfo = (req) => ({
  ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || 'Unknown',
  userAgent: req.headers['user-agent'] || 'Unknown',
  referrer: req.headers['referer'] || req.headers['referrer'] || 'Direct',
  language: req.headers['accept-language'] || 'Unknown',
});

// Helper: Escape Markdown special characters
const escapeMarkdown = (text) => 
  text ? text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1') : 'Unknown';

// Helper: Validate request
const validateRequest = (req) => {
  if (req.method !== 'POST') {
    return { valid: false, status: 405, error: 'Method Not Allowed' };
  }

  const missing = REQUIRED_FIELDS.filter(field => !req.body[field]);
  if (missing.length > 0) {
    return { valid: false, status: 400, error: `Missing required fields: ${missing.join(', ')}` };
  }

  return { valid: true };
};

// Helper: Build Telegram message
const buildMessage = (formData, clientInfo) => {
  const { name, email, subject, message } = formData;
  const { ip, userAgent, referrer, language } = clientInfo;
  const timestamp = new Date().toISOString();
  const localTime = new Date().toLocaleString();

  return `
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
`.trim();
};

// Helper: Send Telegram notification
const sendTelegramMessage = async (message) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  
  const response = await fetch(
    `${TELEGRAM_API_BASE}${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    }
  );

  const data = await response.json();
  if (!data.ok) throw new Error(data.description);
  
  return data;
};

// Main handler
export default async function handler(req, res) {
  // Validation
  const validation = validateRequest(req);
  if (!validation.valid) {
    return res.status(validation.status).json({ error: validation.error });
  }

  try {
    const clientInfo = extractClientInfo(req);
    const message = buildMessage(req.body, clientInfo);
    await sendTelegramMessage(message);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
