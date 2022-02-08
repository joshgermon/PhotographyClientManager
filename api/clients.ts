import { supabase } from "../utils/supabaseClient";

export const getClients = async () => {
    const { data: clients, error } = await supabase.from('client').select('*');
    return clients;
}

export const getClientSessions = async (id) => {
    const { data: sessions, error } = await supabase.from('session').select('*').eq('client', id) 
    console.log(sessions)
    return sessions;
 } 