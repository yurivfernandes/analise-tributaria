const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    register: `${API_BASE_URL}/users/register/`,
    login: `${API_BASE_URL}/users/login/`,
    logout: `${API_BASE_URL}/users/logout/`,
    socialLogin: (provider: string) => `${API_BASE_URL}/social/${provider}/login/`,
};
