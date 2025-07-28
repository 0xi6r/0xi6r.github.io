// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "data"
const supabaseAnonKey = "data"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
