export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          player_id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          skill_level: 'beginner' | 'intermediate' | 'advanced' | 'pro' | null
          gender: 'male' | 'female' | 'non_binary' | 'unspecified' | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          player_id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'pro' | null
          gender?: 'male' | 'female' | 'non_binary' | 'unspecified' | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          player_id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'pro' | null
          gender?: 'male' | 'female' | 'non_binary' | 'unspecified' | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      competitions: {
        Row: {
          competition_id: string
          name: string
          format: 'SINGLE_ELIM' | 'DOUBLE_ELIM' | 'POOL_PLAY' | 'ROTATING_PAIRS'
          start_date: string
          location: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          competition_id?: string
          name: string
          format: 'SINGLE_ELIM' | 'DOUBLE_ELIM' | 'POOL_PLAY' | 'ROTATING_PAIRS'
          start_date: string
          location?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          competition_id?: string
          name?: string
          format?: 'SINGLE_ELIM' | 'DOUBLE_ELIM' | 'POOL_PLAY' | 'ROTATING_PAIRS'
          start_date?: string
          location?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      teams: {
        Row: {
          team_id: string
          competition_id: string
          team_name: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          team_id?: string
          competition_id: string
          team_name: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          team_id?: string
          competition_id?: string
          team_name?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      team_members: {
        Row: {
          team_id: string
          player_id: string
          role: string
          joined_at: string | null
        }
        Insert: {
          team_id: string
          player_id: string
          role?: string
          joined_at?: string | null
        }
        Update: {
          team_id?: string
          player_id?: string
          role?: string
          joined_at?: string | null
        }
      }
      matches: {
        Row: {
          match_id: string
          competition_id: string
          team_home_id: string | null
          team_away_id: string | null
          home_score: number | null
          away_score: number | null
          status: string
          target_points: number | null
          must_win_by_two: boolean | null
          max_cap: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          match_id?: string
          competition_id: string
          team_home_id?: string | null
          team_away_id?: string | null
          home_score?: number | null
          away_score?: number | null
          status?: string
          target_points?: number | null
          must_win_by_two?: boolean | null
          max_cap?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          match_id?: string
          competition_id?: string
          team_home_id?: string | null
          team_away_id?: string | null
          home_score?: number | null
          away_score?: number | null
          status?: string
          target_points?: number | null
          must_win_by_two?: boolean | null
          max_cap?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      skill_level_enum: 'beginner' | 'intermediate' | 'advanced' | 'pro'
      competition_format_enum: 'SINGLE_ELIM' | 'DOUBLE_ELIM' | 'POOL_PLAY' | 'ROTATING_PAIRS'
      gender_enum: 'male' | 'female' | 'non_binary' | 'unspecified'
    }
  }
} 