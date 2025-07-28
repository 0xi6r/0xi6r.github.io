// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tobeupdatedsoon.supabase.co"
const supabaseAnonKey = "siteisstillbeingbuildt.eyJpc3M siteisstillunderdevelopment.underconstruction"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
