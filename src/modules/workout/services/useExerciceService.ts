import { supabase } from '@/shared/services/supabaseClient'
import type { PostgrestResponse } from '@supabase/supabase-js'
import type { Exercice } from '../models/Exercice'

export function useExerciceService() {
  async function getExercices(): Promise<PostgrestResponse<Exercice>> {
    return await supabase.from('plannings_exercice').select('*')
  }
  return {
    getExercices
  }
}
