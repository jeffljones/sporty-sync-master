import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// These environment variables are set in the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if the environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(
  supabaseUrl as string,
  supabaseAnonKey as string
) 