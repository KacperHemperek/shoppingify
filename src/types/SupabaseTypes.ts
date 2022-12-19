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
      category: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
        }
      }
      item: {
        Row: {
          id: number
          created_at: string | null
          name: string
          img: string | null
          note: string | null
          category_id: number | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name: string
          img?: string | null
          note?: string | null
          category_id?: number | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string
          img?: string | null
          note?: string | null
          category_id?: number | null
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
  }
}
