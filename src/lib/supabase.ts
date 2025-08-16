import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kktnwrptrtldvkvxlshd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdG53cnB0cnRsZHZrdnhsc2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTY5ODEsImV4cCI6MjA3MDQ5Mjk4MX0.fw7jrOldHU5QxnbFApeDvKU1Xcs2gI70SS3ZQ69az5Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Employee = {
  id: string
  name: string
  phone: string
  daily_wage: number
  hire_date: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Attendance = {
  id: string
  employee_id: string
  date: string
  status: 'present' | 'absent' | 'late'
  time_in?: string
  time_out?: string
  notes?: string
  created_at: string
}

export type Expense = {
  id: string
  description: string
  amount: number
  date: string
  category: string
  created_at: string
}

export type Customer = {
  id: string
  name: string
  phone?: string
  email?: string
  created_at: string
}

export type Debt = {
  id: string
  customer_id: string
  amount: number
  description: string
  date: string
  status: 'pending' | 'paid' | 'partial'
  paid_amount: number
  created_at: string
}

export type EmployeeWithdrawal = {
  id: string
  employee_id: string
  amount: number
  date: string
  description?: string
  created_at: string
}