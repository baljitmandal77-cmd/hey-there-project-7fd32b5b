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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string
          date: string
          id: string
          marked_by: string | null
          status: string
          student_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          marked_by?: string | null
          status?: string
          student_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          marked_by?: string | null
          status?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          ip_address: string | null
          module: string
          user_id: string | null
          user_name: string | null
          user_role: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          ip_address?: string | null
          module: string
          user_id?: string | null
          user_name?: string | null
          user_role?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          ip_address?: string | null
          module?: string
          user_id?: string | null
          user_name?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          is_read: boolean
          replied: boolean
          sender_email: string | null
          sender_name: string
          sender_phone: string | null
          subject: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_read?: boolean
          replied?: boolean
          sender_email?: string | null
          sender_name: string
          sender_phone?: string | null
          subject: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_read?: boolean
          replied?: boolean
          sender_email?: string | null
          sender_name?: string
          sender_phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      fee_records: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          fee_type: string
          id: string
          paid_date: string | null
          receipt_no: string | null
          status: string
          student_id: string | null
          student_name: string | null
          term: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          fee_type?: string
          id?: string
          paid_date?: string | null
          receipt_no?: string | null
          status?: string
          student_id?: string | null
          student_name?: string | null
          term?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          fee_type?: string
          id?: string
          paid_date?: string | null
          receipt_no?: string | null
          status?: string
          student_id?: string | null
          student_name?: string | null
          term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      homework: {
        Row: {
          assigned_by: string | null
          assigned_by_name: string | null
          class: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          subject: string
          title: string
        }
        Insert: {
          assigned_by?: string | null
          assigned_by_name?: string | null
          class: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          subject: string
          title: string
        }
        Update: {
          assigned_by?: string | null
          assigned_by_name?: string | null
          class?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          subject?: string
          title?: string
        }
        Relationships: []
      }
      notices: {
        Row: {
          content: string
          created_at: string
          id: string
          is_public: boolean
          pinned: boolean
          posted_by: string | null
          posted_by_name: string | null
          title: string
          type: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_public?: boolean
          pinned?: boolean
          posted_by?: string | null
          posted_by_name?: string | null
          title: string
          type?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean
          pinned?: boolean
          posted_by?: string | null
          posted_by_name?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active: boolean
          address: string | null
          bio: string | null
          created_at: string
          dob: string | null
          email: string | null
          full_name: string
          gender: string | null
          id: string
          phone: string | null
          photo_url: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          username: string
        }
        Insert: {
          active?: boolean
          address?: string | null
          bio?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          full_name: string
          gender?: string | null
          id: string
          phone?: string | null
          photo_url?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          username: string
        }
        Update: {
          active?: boolean
          address?: string | null
          bio?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          phone?: string | null
          photo_url?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          created_at: string
          exam_type: string
          grade: string | null
          id: string
          marks: number
          student_id: string | null
          subject: string
          term: string | null
          total_marks: number
        }
        Insert: {
          created_at?: string
          exam_type: string
          grade?: string | null
          id?: string
          marks: number
          student_id?: string | null
          subject: string
          term?: string | null
          total_marks?: number
        }
        Update: {
          created_at?: string
          exam_type?: string
          grade?: string | null
          id?: string
          marks?: number
          student_id?: string | null
          subject?: string
          term?: string | null
          total_marks?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      site_content: {
        Row: {
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          admission_date: string | null
          class: string
          created_at: string
          id: string
          parent_phone: string | null
          roll_number: number
          student_code: string
          user_id: string | null
        }
        Insert: {
          admission_date?: string | null
          class: string
          created_at?: string
          id?: string
          parent_phone?: string | null
          roll_number: number
          student_code: string
          user_id?: string | null
        }
        Update: {
          admission_date?: string | null
          class?: string
          created_at?: string
          id?: string
          parent_phone?: string | null
          roll_number?: number
          student_code?: string
          user_id?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          classes: string | null
          created_at: string
          experience: string | null
          id: string
          join_date: string | null
          qualifications: string | null
          status: string
          subject: string
          teacher_code: string
          user_id: string | null
        }
        Insert: {
          classes?: string | null
          created_at?: string
          experience?: string | null
          id?: string
          join_date?: string | null
          qualifications?: string | null
          status?: string
          subject: string
          teacher_code: string
          user_id?: string | null
        }
        Update: {
          classes?: string | null
          created_at?: string
          experience?: string | null
          id?: string
          join_date?: string | null
          qualifications?: string | null
          status?: string
          subject?: string
          teacher_code?: string
          user_id?: string | null
        }
        Relationships: []
      }
      timetable: {
        Row: {
          class: string
          created_at: string
          day: string
          end_time: string | null
          id: string
          period: number
          start_time: string | null
          subject: string
          teacher_name: string | null
        }
        Insert: {
          class: string
          created_at?: string
          day: string
          end_time?: string | null
          id?: string
          period: number
          start_time?: string | null
          subject: string
          teacher_name?: string | null
        }
        Update: {
          class?: string
          created_at?: string
          day?: string
          end_time?: string | null
          id?: string
          period?: number
          start_time?: string | null
          subject?: string
          teacher_name?: string | null
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string
          granted: boolean
          granted_by: string | null
          id: string
          permission: string
          user_id: string
        }
        Insert: {
          created_at?: string
          granted?: boolean
          granted_by?: string | null
          id?: string
          permission: string
          user_id: string
        }
        Update: {
          created_at?: string
          granted?: boolean
          granted_by?: string | null
          id?: string
          permission?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_dev: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "student" | "teacher" | "admin" | "accountant" | "dev"
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
    Enums: {
      app_role: ["student", "teacher", "admin", "accountant", "dev"],
    },
  },
} as const
