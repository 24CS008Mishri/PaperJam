const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
const TOKEN_KEY = 'paper-jam.admin.access-token';

export interface AdminProfile {
  email: string;
  role: string;
  is_active: boolean;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  admin: AdminProfile;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export async function loginAdmin(email: string, password: string, remember: boolean): Promise<AdminProfile> {
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error((await response.text()) || 'Invalid email or password.');
  const result = await response.json() as LoginResponse;
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, result.access_token);
  return result.admin;
}

export async function logoutAdmin(): Promise<void> {
  const token = getAccessToken();
  try {
    if (token) await fetch(`${API_BASE_URL}/api/auth/admin/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export async function getCurrentAdmin(): Promise<AdminProfile> {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated.');
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error('Session expired.');
  return response.json() as Promise<AdminProfile>;
}
