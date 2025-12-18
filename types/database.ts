// Database types for Simulation Center Planning App

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
      // Projects - main project entity
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          phase: 'planning' | 'design' | 'construction' | 'commissioning' | 'operational'
          status: 'active' | 'on_hold' | 'completed' | 'cancelled'
          start_date: string | null
          target_completion: string | null
          total_budget: number | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          phase?: 'planning' | 'design' | 'construction' | 'commissioning' | 'operational'
          status?: 'active' | 'on_hold' | 'completed' | 'cancelled'
          start_date?: string | null
          target_completion?: string | null
          total_budget?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          phase?: 'planning' | 'design' | 'construction' | 'commissioning' | 'operational'
          status?: 'active' | 'on_hold' | 'completed' | 'cancelled'
          start_date?: string | null
          target_completion?: string | null
          total_budget?: number | null
          updated_at?: string
          created_by?: string | null
        }
      }

      // Budget Items - CSI division breakdown
      budget_items: {
        Row: {
          id: string
          project_id: string
          csi_division: string
          division_name: string
          description: string | null
          estimated_amount: number
          actual_amount: number | null
          variance: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          csi_division: string
          division_name: string
          description?: string | null
          estimated_amount: number
          actual_amount?: number | null
          variance?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          csi_division?: string
          division_name?: string
          description?: string | null
          estimated_amount?: number
          actual_amount?: number | null
          variance?: number | null
          notes?: string | null
          updated_at?: string
        }
      }

      // Equipment - simulators, AV systems, etc.
      equipment: {
        Row: {
          id: string
          project_id: string
          category: 'simulator' | 'av_system' | 'task_trainer' | 'furniture' | 'medical_equipment' | 'it_infrastructure'
          name: string
          vendor_id: string | null
          model: string | null
          tier: 'budget' | 'mid_range' | 'premium'
          unit_price: number
          quantity: number
          total_price: number
          warranty_years: number | null
          annual_maintenance_cost: number | null
          lifecycle_years: number | null
          specifications: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          category: 'simulator' | 'av_system' | 'task_trainer' | 'furniture' | 'medical_equipment' | 'it_infrastructure'
          name: string
          vendor_id?: string | null
          model?: string | null
          tier?: 'budget' | 'mid_range' | 'premium'
          unit_price: number
          quantity?: number
          total_price?: number
          warranty_years?: number | null
          annual_maintenance_cost?: number | null
          lifecycle_years?: number | null
          specifications?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          category?: 'simulator' | 'av_system' | 'task_trainer' | 'furniture' | 'medical_equipment' | 'it_infrastructure'
          name?: string
          vendor_id?: string | null
          model?: string | null
          tier?: 'budget' | 'mid_range' | 'premium'
          unit_price?: number
          quantity?: number
          total_price?: number
          warranty_years?: number | null
          annual_maintenance_cost?: number | null
          lifecycle_years?: number | null
          specifications?: Json | null
          updated_at?: string
        }
      }

      // Vendors
      vendors: {
        Row: {
          id: string
          name: string
          category: string
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          website: string | null
          address: string | null
          status: 'active' | 'inactive' | 'preferred' | 'blacklisted'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          address?: string | null
          status?: 'active' | 'inactive' | 'preferred' | 'blacklisted'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          address?: string | null
          status?: 'active' | 'inactive' | 'preferred' | 'blacklisted'
          notes?: string | null
          updated_at?: string
        }
      }

      // Contractor Bids
      bids: {
        Row: {
          id: string
          project_id: string
          vendor_id: string
          bid_number: string | null
          description: string
          amount: number
          submitted_date: string
          expiration_date: string | null
          status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'expired'
          file_path: string | null
          file_name: string | null
          evaluation_score: number | null
          evaluation_notes: string | null
          evaluated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          vendor_id: string
          bid_number?: string | null
          description: string
          amount: number
          submitted_date?: string
          expiration_date?: string | null
          status?: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'expired'
          file_path?: string | null
          file_name?: string | null
          evaluation_score?: number | null
          evaluation_notes?: string | null
          evaluated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          vendor_id?: string
          bid_number?: string | null
          description?: string
          amount?: number
          submitted_date?: string
          expiration_date?: string | null
          status?: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'expired'
          file_path?: string | null
          file_name?: string | null
          evaluation_score?: number | null
          evaluation_notes?: string | null
          evaluated_by?: string | null
          updated_at?: string
        }
      }

      // Project Milestones (for Gantt chart)
      milestones: {
        Row: {
          id: string
          project_id: string
          name: string
          description: string | null
          phase: string
          start_date: string
          end_date: string
          status: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'blocked'
          progress_percent: number
          dependencies: string[] | null
          assigned_to: string | null
          is_critical_path: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          description?: string | null
          phase: string
          start_date: string
          end_date: string
          status?: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'blocked'
          progress_percent?: number
          dependencies?: string[] | null
          assigned_to?: string | null
          is_critical_path?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          description?: string | null
          phase?: string
          start_date?: string
          end_date?: string
          status?: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'blocked'
          progress_percent?: number
          dependencies?: string[] | null
          assigned_to?: string | null
          is_critical_path?: boolean
          updated_at?: string
        }
      }

      // Risk Register
      risks: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string
          category: 'regulatory' | 'technical' | 'financial' | 'operational' | 'schedule' | 'safety'
          probability: 'low' | 'medium' | 'high'
          impact: 'low' | 'medium' | 'high'
          risk_score: number
          mitigation_strategy: string | null
          mitigation_cost: number | null
          owner: string | null
          status: 'identified' | 'mitigating' | 'mitigated' | 'occurred' | 'closed'
          affected_milestones: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description: string
          category: 'regulatory' | 'technical' | 'financial' | 'operational' | 'schedule' | 'safety'
          probability: 'low' | 'medium' | 'high'
          impact: 'low' | 'medium' | 'high'
          risk_score?: number
          mitigation_strategy?: string | null
          mitigation_cost?: number | null
          owner?: string | null
          status?: 'identified' | 'mitigating' | 'mitigated' | 'occurred' | 'closed'
          affected_milestones?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string
          category?: 'regulatory' | 'technical' | 'financial' | 'operational' | 'schedule' | 'safety'
          probability?: 'low' | 'medium' | 'high'
          impact?: 'low' | 'medium' | 'high'
          risk_score?: number
          mitigation_strategy?: string | null
          mitigation_cost?: number | null
          owner?: string | null
          status?: 'identified' | 'mitigating' | 'mitigated' | 'occurred' | 'closed'
          affected_milestones?: string[] | null
          updated_at?: string
        }
      }

      // Staff Positions
      staff_positions: {
        Row: {
          id: string
          project_id: string
          role: string
          role_type: 'incremental' | 'reallocated'
          fte: number
          base_salary: number
          benefits_rate: number
          loaded_cost: number
          start_date: string | null
          responsibilities: string | null
          qualifications: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          role: string
          role_type?: 'incremental' | 'reallocated'
          fte: number
          base_salary: number
          benefits_rate?: number
          loaded_cost?: number
          start_date?: string | null
          responsibilities?: string | null
          qualifications?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          role?: string
          role_type?: 'incremental' | 'reallocated'
          fte?: number
          base_salary?: number
          benefits_rate?: number
          loaded_cost?: number
          start_date?: string | null
          responsibilities?: string | null
          qualifications?: string | null
          updated_at?: string
        }
      }

      // Benchmarks - peer hospital comparisons
      benchmarks: {
        Row: {
          id: string
          center_name: string
          hospital_system: string | null
          location: string | null
          size_sqft: number | null
          annual_volume: number | null
          staff_count: number | null
          annual_budget: number | null
          founding_year: number | null
          maturity_level: 'startup' | 'scaling' | 'mature'
          accreditations: string[] | null
          equipment_vendors: string[] | null
          av_system: string | null
          key_metrics: Json | null
          lessons_learned: string | null
          source_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          center_name: string
          hospital_system?: string | null
          location?: string | null
          size_sqft?: number | null
          annual_volume?: number | null
          staff_count?: number | null
          annual_budget?: number | null
          founding_year?: number | null
          maturity_level?: 'startup' | 'scaling' | 'mature'
          accreditations?: string[] | null
          equipment_vendors?: string[] | null
          av_system?: string | null
          key_metrics?: Json | null
          lessons_learned?: string | null
          source_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          center_name?: string
          hospital_system?: string | null
          location?: string | null
          size_sqft?: number | null
          annual_volume?: number | null
          staff_count?: number | null
          annual_budget?: number | null
          founding_year?: number | null
          maturity_level?: 'startup' | 'scaling' | 'mature'
          accreditations?: string[] | null
          equipment_vendors?: string[] | null
          av_system?: string | null
          key_metrics?: Json | null
          lessons_learned?: string | null
          source_url?: string | null
          updated_at?: string
        }
      }

      // Budget Scenarios - saved simulator configurations
      scenarios: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          params: Json
          results_snapshot: Json | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          params: Json
          results_snapshot?: Json | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          params?: Json
          results_snapshot?: Json | null
          is_default?: boolean
          updated_at?: string
        }
      }

      // Audit Logs
      audit_logs: {
        Row: {
          id: string
          user_id: string
          user_email: string | null
          action: 'create' | 'read' | 'update' | 'delete' | 'export' | 'upload'
          resource_type: string
          resource_id: string | null
          details: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          user_email?: string | null
          action: 'create' | 'read' | 'update' | 'delete' | 'export' | 'upload'
          resource_type: string
          resource_id?: string | null
          details?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          user_email?: string | null
          action?: 'create' | 'read' | 'update' | 'delete' | 'export' | 'upload'
          resource_type?: string
          resource_id?: string | null
          details?: Json | null
          ip_address?: string | null
        }
      }
    }
  }
}

// Helper types for easier usage
export type Project = Database['public']['Tables']['projects']['Row']
export type BudgetItem = Database['public']['Tables']['budget_items']['Row']
export type Equipment = Database['public']['Tables']['equipment']['Row']
export type Vendor = Database['public']['Tables']['vendors']['Row']
export type Bid = Database['public']['Tables']['bids']['Row']
export type Milestone = Database['public']['Tables']['milestones']['Row']
export type Risk = Database['public']['Tables']['risks']['Row']
export type StaffPosition = Database['public']['Tables']['staff_positions']['Row']
export type Benchmark = Database['public']['Tables']['benchmarks']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']
export type Scenario = Database['public']['Tables']['scenarios']['Row']
export type ScenarioInsert = Database['public']['Tables']['scenarios']['Insert']
export type ScenarioUpdate = Database['public']['Tables']['scenarios']['Update']
