const API_URL = 'http://localhost:8000/api';

interface UserData {
  email: string;
  name: string;
  password: string;
  phone_number?: string;
  postal_code?: string;
  is_staff?: boolean;
}

// Exportando os métodos individualmente também para compatibilidade
export const signIn = async (email: string, password: string) => {
  return auth.login(email, password);
};

export const auth = {
  async getCsrfToken() {
    const response = await fetch(`${API_URL}/users/csrf/`, {
      credentials: 'include'
    });
    const data = await response.json();
    return data.csrfToken;
  },

  async login(email: string, password: string) {
    try {
      const csrfToken = await this.getCsrfToken();
      const response = await fetch(`${API_URL}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha no login');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw new Error(error.message || 'Erro ao conectar com o servidor');
    }
  },

  async register(userData: UserData) {
    try {
      const csrfToken = await this.getCsrfToken();
      const response = await fetch(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha no registro');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Erro no registro:', error);
      throw new Error(error.message || 'Erro ao conectar com o servidor');
    }
  },

  async logout() {
    try {
      const csrfToken = await this.getCsrfToken();
      const response = await fetch(`${API_URL}/users/logout/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer logout');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Erro ao fazer logout');
    }
  }
};
