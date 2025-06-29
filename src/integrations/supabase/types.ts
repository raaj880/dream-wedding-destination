export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          id: string
          last_message_at: string | null
          matched_at: string
          status: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          id?: string
          last_message_at?: string | null
          matched_at?: string
          status?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          id?: string
          last_message_at?: string | null
          matched_at?: string
          status?: string
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          edited_at: string | null
          id: string
          match_id: string
          message_type: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          edited_at?: string | null
          id?: string
          match_id: string
          message_type?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          edited_at?: string | null
          id?: string
          match_id?: string
          message_type?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string
          age: number | null
          bio: string | null
          community: string | null
          created_at: string | null
          date_of_birth: string | null
          dosha: string | null
          education: string | null
          full_name: string | null
          gender: string | null
          gothra: string | null
          height: string | null
          hide_from_search: boolean
          id: string
          is_online: boolean | null
          is_verified: boolean | null
          jathakam_url: string | null
          languages: string[] | null
          last_seen: string | null
          location: string | null
          marry_timeframe: string | null
          nakshatra: string | null
          notification_settings: Json
          partner_age_range_max: number | null
          partner_age_range_min: number | null
          partner_location: string | null
          photos: string[] | null
          place_of_birth: string | null
          profession: string | null
          profile_visibility: string
          rashi: string | null
          religion: string | null
          show_online_status: boolean
          time_of_birth: string | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          account_status?: string
          age?: number | null
          bio?: string | null
          community?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          dosha?: string | null
          education?: string | null
          full_name?: string | null
          gender?: string | null
          gothra?: string | null
          height?: string | null
          hide_from_search?: boolean
          id: string
          is_online?: boolean | null
          is_verified?: boolean | null
          jathakam_url?: string | null
          languages?: string[] | null
          last_seen?: string | null
          location?: string | null
          marry_timeframe?: string | null
          nakshatra?: string | null
          notification_settings?: Json
          partner_age_range_max?: number | null
          partner_age_range_min?: number | null
          partner_location?: string | null
          photos?: string[] | null
          place_of_birth?: string | null
          profession?: string | null
          profile_visibility?: string
          rashi?: string | null
          religion?: string | null
          show_online_status?: boolean
          time_of_birth?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          account_status?: string
          age?: number | null
          bio?: string | null
          community?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          dosha?: string | null
          education?: string | null
          full_name?: string | null
          gender?: string | null
          gothra?: string | null
          height?: string | null
          hide_from_search?: boolean
          id?: string
          is_online?: boolean | null
          is_verified?: boolean | null
          jathakam_url?: string | null
          languages?: string[] | null
          last_seen?: string | null
          location?: string | null
          marry_timeframe?: string | null
          nakshatra?: string | null
          notification_settings?: Json
          partner_age_range_max?: number | null
          partner_age_range_min?: number | null
          partner_location?: string | null
          photos?: string[] | null
          place_of_birth?: string | null
          profession?: string | null
          profile_visibility?: string
          rashi?: string | null
          religion?: string | null
          show_online_status?: boolean
          time_of_birth?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: Database["public"]["Enums"]["interaction_enum"]
          target_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: Database["public"]["Enums"]["interaction_enum"]
          target_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: Database["public"]["Enums"]["interaction_enum"]
          target_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          last_activity: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          last_activity?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          last_activity?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          created_at: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_verification_request: {
        Args: { request_id: string }
        Returns: undefined
      }
      check_mutual_match: {
        Args: { user1_uuid: string; user2_uuid: string }
        Returns: boolean
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_match_id: {
        Args: { user1_uuid: string; user2_uuid: string }
        Returns: string
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      log_audit_event: {
        Args: {
          p_action: string
          p_table_name: string
          p_record_id?: string
          p_old_data?: Json
          p_new_data?: Json
        }
        Returns: undefined
      }
      mark_messages_as_read: {
        Args: { p_match_id: string; p_message_ids: string[] }
        Returns: undefined
      }
      reject_verification_request: {
        Args: { request_id: string }
        Returns: undefined
      }
    }
    Enums: {
      interaction_enum: "like" | "pass" | "superlike" | "block" | "view"
      notification_type: "new_match" | "new_message" | "profile_view"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      interaction_enum: ["like", "pass", "superlike", "block", "view"],
      notification_type: ["new_match", "new_message", "profile_view"],
    },
  },
} as const
