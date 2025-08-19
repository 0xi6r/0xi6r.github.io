// /api/contact.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use your service key here (do NOT expose on frontend)
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        { name, email, subject, message }
      ]);

    if (error) {
      return res.status(500).json({ error: 'Failed to store message.' });
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Server error.' });
  }
}
