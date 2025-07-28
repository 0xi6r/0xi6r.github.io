// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Define the expected environment variables
interface SupabaseConfig {
  url: string
  anonKey: string
}

// Function to get and validate environment variables
const getSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error(
      'REACT_APP_SUPABASE_URL is not defined. Please add it to your .env file.'
    )
  }

  if (!anonKey) {
    throw new Error(
      'REACT_APP_SUPABASE_ANON_KEY is not defined. Please add it to your .env file.'
    )
  }

  return { url, anonKey }
}

// Create and export the Supabase client
const config = getSupabaseConfig()
export const supabase: SupabaseClient = createClient(config.url, config.anonKey)

// Export config for debugging purposes (optional)
export const supabaseConfig = config
