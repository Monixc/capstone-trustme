export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      acquired_character: {
        Row: {
          acquired_at: string | null;
          character_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          acquired_at?: string | null;
          character_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          acquired_at?: string | null;
          character_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "acquired_character_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      checklist: {
        Row: {
          color: string;
          created_at: string | null;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          color: string;
          created_at?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          color?: string;
          created_at?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "checklist_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      checklist_items: {
        Row: {
          checklist_id: string;
          content: string;
          created_at: string | null;
          id: string;
          is_completed: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          checklist_id: string;
          content: string;
          created_at?: string | null;
          id?: string;
          is_completed?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          checklist_id?: string;
          content?: string;
          created_at?: string | null;
          id?: string;
          is_completed?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey";
            columns: ["checklist_id"];
            isOneToOne: false;
            referencedRelation: "checklist";
            referencedColumns: ["id"];
          }
        ];
      };
      diary: {
        Row: {
          analysis: string | null;
          content: string;
          created_at: string | null;
          emotion: string | null;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          analysis?: string | null;
          content: string;
          created_at?: string | null;
          emotion?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          analysis?: string | null;
          content?: string;
          created_at?: string | null;
          emotion?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "diary_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      gallery: {
        Row: {
          description: string | null;
          id: string;
          image_url: string;
          metadata_date: string | null;
          upload_date: string | null;
          user_id: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          image_url: string;
          metadata_date?: string | null;
          upload_date?: string | null;
          user_id: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          image_url?: string;
          metadata_date?: string | null;
          upload_date?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gallery_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      levels: {
        Row: {
          exp_required: number;
          level: number;
          reward: string | null;
        };
        Insert: {
          exp_required: number;
          level: number;
          reward?: string | null;
        };
        Update: {
          exp_required?: number;
          level?: number;
          reward?: string | null;
        };
        Relationships: [];
      };
      quests: {
        Row: {
          created_at: string | null;
          description: string | null;
          exp_reward: number;
          id: string;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          exp_reward: number;
          id?: string;
          title: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          exp_reward?: number;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
      user_level_history: {
        Row: {
          exp_at_levelup: number;
          id: string;
          level_from: number;
          level_to: number;
          levelup_at: string | null;
          reward_given: string | null;
          user_id: string;
        };
        Insert: {
          exp_at_levelup: number;
          id?: string;
          level_from: number;
          level_to: number;
          levelup_at?: string | null;
          reward_given?: string | null;
          user_id: string;
        };
        Update: {
          exp_at_levelup?: number;
          id?: string;
          level_from?: number;
          level_to?: number;
          levelup_at?: string | null;
          reward_given?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_level_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_quests: {
        Row: {
          completed_at: string | null;
          exp_gained: number | null;
          id: string;
          is_completed: boolean | null;
          quest_id: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          exp_gained?: number | null;
          id?: string;
          is_completed?: boolean | null;
          quest_id: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          exp_gained?: number | null;
          id?: string;
          is_completed?: boolean | null;
          quest_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_quests_quest_id_fkey";
            columns: ["quest_id"];
            isOneToOne: false;
            referencedRelation: "quests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_quests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          background_image: string | null;
          birth_date: string | null;
          character_image: string | null;
          created_at: string | null;
          current_exp: number | null;
          current_level: number | null;
          email: string;
          id: string;
          name: string;
          nickname: string | null;
          phone_number: string | null;
          updated_at: string | null;
        };
        Insert: {
          background_image?: string | null;
          birth_date?: string | null;
          character_image?: string | null;
          created_at?: string | null;
          current_exp?: number | null;
          current_level?: number | null;
          email: string;
          id?: string;
          name: string;
          nickname?: string | null;
          phone_number?: string | null;
          updated_at?: string | null;
        };
        Update: {
          background_image?: string | null;
          birth_date?: string | null;
          character_image?: string | null;
          created_at?: string | null;
          current_exp?: number | null;
          current_level?: number | null;
          email?: string;
          id?: string;
          name?: string;
          nickname?: string | null;
          phone_number?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
