import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, user_agent, source } = req.body;

  if (!email || !/^.+@.+\..+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        {
          email: email.toLowerCase().trim(),
          source: source || 'footer_signup',
          user_agent: user_agent || null,
        },
      ]);
    if (error) {
      if (error.code === '23505' || error.message.includes('duplicate key value')) {
        return res.status(400).json({ error: 'This email is already subscribed.' });
      }
      return res.status(500).json({ error: 'Failed to subscribe.' });
    }

    // Send welcome email
    await resend.emails.send({
      from: '0xi6r@tutamail.com', // must be verified with Resend
      to: email,
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
    return res.status(500).json({ error: 'Server error.' });
  }
}
