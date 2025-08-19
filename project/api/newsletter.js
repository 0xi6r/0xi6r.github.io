// /api/newsletter.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // for inserts, use the SERVICE_ROLE key (keep this safe)
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, user_agent, source } = req.body;

  if (!email || !/^.+@.+\..+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    // Insert the email to your Supabase table
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
      if (error.code === '23505') {
        // Duplicate
        return res.status(400).json({ error: 'This email is already subscribed.' });
      }
      return res.status(500).json({ error: 'Failed to subscribe.' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
}
