import { supabase } from "@/shared/services/supabaseClient";

export function useUserService() {
    async function getUsers() {
        return await supabase.from('account').select();
    }

    return {
        getUsers
    }
}