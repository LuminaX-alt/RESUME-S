import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Simplified server client that falls back to regular client
export const createServerClient = () => {
  return supabase
}
