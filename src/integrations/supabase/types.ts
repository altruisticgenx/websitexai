export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string
          id: string
          published: boolean | null
          published_at: string | null
          reading_time_minutes: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt: string
          id?: string
          published?: boolean | null
          published_at?: string | null
          reading_time_minutes?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean | null
          published_at?: string | null
          reading_time_minutes?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          email_sent: boolean | null
          email_sent_at: string | null
          id: string
          message: string
          name: string
          project_type: string
        }
        Insert: {
          created_at?: string
          email: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          message: string
          name: string
          project_type: string
        }
        Update: {
          created_at?: string
          email?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          message?: string
          name?: string
          project_type?: string
        }
        Relationships: []
      }
      email_rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          ip_address: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: string
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      faq_conversations: {
        Row: {
          created_at: string
          id: string
          messages: Json
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          active: boolean | null
          answer: string
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          question: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          question: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      pilot_quiz_submissions: {
        Row: {
          answers: Json
          created_at: string
          email: string
          email_sent: boolean | null
          email_sent_at: string | null
          id: string
          recommendations: Json
        }
        Insert: {
          answers: Json
          created_at?: string
          email: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          recommendations: Json
        }
        Update: {
          answers?: Json
          created_at?: string
          email?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          recommendations?: Json
        }
        Relationships: []
      }
      projects: {
        Row: {
          challenge: string | null
          completed_at: string | null
          context_note: string | null
          created_at: string
          demo_url: string | null
          description: string | null
          display_order: number | null
          duration: string | null
          featured: boolean | null
          github_url: string | null
          hypothesis: string | null
          id: string
          image_url: string | null
          outcomes: string[] | null
          phases: Json | null
          sector: string
          slug: string
          solution: string | null
          status: string | null
          summary: string
          tag: string | null
          tagline: string | null
          technologies: string[] | null
          timeline: string | null
          title: string
          updated_at: string
          week_number: number | null
        }
        Insert: {
          challenge?: string | null
          completed_at?: string | null
          context_note?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          featured?: boolean | null
          github_url?: string | null
          hypothesis?: string | null
          id?: string
          image_url?: string | null
          outcomes?: string[] | null
          phases?: Json | null
          sector: string
          slug: string
          solution?: string | null
          status?: string | null
          summary: string
          tag?: string | null
          tagline?: string | null
          technologies?: string[] | null
          timeline?: string | null
          title: string
          updated_at?: string
          week_number?: number | null
        }
        Update: {
          challenge?: string | null
          completed_at?: string | null
          context_note?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string | null
          display_order?: number | null
          duration?: string | null
          featured?: boolean | null
          github_url?: string | null
          hypothesis?: string | null
          id?: string
          image_url?: string | null
          outcomes?: string[] | null
          phases?: Json | null
          sector?: string
          slug?: string
          solution?: string | null
          status?: string | null
          summary?: string
          tag?: string | null
          tagline?: string | null
          technologies?: string[] | null
          timeline?: string | null
          title?: string
          updated_at?: string
          week_number?: number | null
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean | null
          base_price: number | null
          created_at: string
          display_order: number | null
          features: string[] | null
          full_description: string | null
          icon_name: string | null
          id: string
          pricing_type: string | null
          short_description: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          base_price?: number | null
          created_at?: string
          display_order?: number | null
          features?: string[] | null
          full_description?: string | null
          icon_name?: string | null
          id?: string
          pricing_type?: string | null
          short_description: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          base_price?: number | null
          created_at?: string
          display_order?: number | null
          features?: string[] | null
          full_description?: string | null
          icon_name?: string | null
          id?: string
          pricing_type?: string | null
          short_description?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_avatar_url: string | null
          client_company: string | null
          client_name: string
          client_role: string | null
          created_at: string
          display_order: number | null
          featured: boolean | null
          id: string
          project_id: string | null
          rating: number | null
          testimonial: string
        }
        Insert: {
          client_avatar_url?: string | null
          client_company?: string | null
          client_name: string
          client_role?: string | null
          created_at?: string
          display_order?: number | null
          featured?: boolean | null
          id?: string
          project_id?: string | null
          rating?: number | null
          testimonial: string
        }
        Update: {
          client_avatar_url?: string | null
          client_company?: string | null
          client_name?: string
          client_role?: string | null
          created_at?: string
          display_order?: number | null
          featured?: boolean | null
          id?: string
          project_id?: string | null
          rating?: number | null
          testimonial?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
