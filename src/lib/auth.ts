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
