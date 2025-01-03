export type SignUpData = {
  email: string;
  password: string;
  name: string;
  company: string;
  phone: string;
};

export async function signUp({ email, password, name, company, phone }: SignUpData) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      company_name: company,
      phone
    })
  });

  if (!response.ok) {
    throw new Error('Falha no cadastro');
  }

  return await response.json();
}

export async function signIn(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    throw new Error('Falha no login');
  }

  return await response.json();
}

export async function signOut() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer logout');
  }
}

interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  isAdmin: boolean;
}

export const auth = {
  signUp,
  signIn,
  signOut,

  async register(userData: UserData) {
    // Implementar lógica de registro
    if (userData.isAdmin) {
      // Criar usuário admin com permissões especiais
      console.log('Criando usuário admin');
    }
    // Resto da implementação
  },

  async loginWithSocial(provider: 'google' | 'github') {
    // Implementar lógica de login social
    console.log(`Login com ${provider}`);
  }
};
