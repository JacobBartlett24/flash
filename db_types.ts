export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Flash: {
        Row: {
          color_style: string | null
          created_at: string | null
          description: string | null
          id: number
          img_filepath: string | null
          img_url: string | null
          name: string | null
          price: number | null
          quantity: number | null
          tags: Json | null
        }
        Insert: {
          color_style?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          img_filepath?: string | null
          img_url?: string | null
          name?: string | null
          price?: number | null
          quantity?: number | null
          tags?: Json | null
        }
        Update: {
          color_style?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          img_filepath?: string | null
          img_url?: string | null
          name?: string | null
          price?: number | null
          quantity?: number | null
          tags?: Json | null
        }
      }
      Tags: {
        Row: {
          color: string | null
          created_at: string | null
          tag_id: number
          tag_name: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          tag_id?: number
          tag_name?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          tag_id?: number
          tag_name?: string | null
        }
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          test: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          test?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          test?: string | null
          user_id?: string
        }
      }
      UserFlash: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          img_url: string | null
          price: number | null
          quantity: number | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          img_url?: string | null
          price?: number | null
          quantity?: number | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          img_url?: string | null
          price?: number | null
          quantity?: number | null
          title?: string | null
          user_id?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
