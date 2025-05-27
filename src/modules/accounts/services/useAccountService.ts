import { supabase } from '@/shared/services/supabaseClient'
import type { Account } from '../models/Account'
import type { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

export function useAccountService() {
  async function getAccount(userId: string): Promise<PostgrestSingleResponse<Account>> {
    return await supabase
      .from('account')
      .select(
        '*, health(id, height, weight, target_weight, target_training, measure_weight), training_objectives(training_per_week)'
      )
      .eq('user_id', userId)
      .single()
  }

  async function getAccounts() {
    return await supabase.from('account').select()
  }

  async function postAccount(
    account: Partial<Omit<Account, 'password'>>
  ): Promise<PostgrestResponse<Account>> {
    const newAccount = {
      firstname: account.firstname,
      lastname: account.lastname,
      birthday: account.birthday,
      email: account.email,
      gender: account.gender
    }
    return await supabase.from('account').insert(newAccount).select()
  }

  return {
    getAccount,
    getAccounts,
    postAccount
  }
}
