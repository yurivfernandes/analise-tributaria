import { supabase } from './supabase';

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  company: string;
  phone: string;
};

export async function signUp({ email, password, name, company, phone }: SignUpData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  });

  if (authError) throw authError;

  // Create profile after successful signup
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user?.id,
        company_name: company,
        phone
      }
    ]);

  if (profileError) throw profileError;

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
