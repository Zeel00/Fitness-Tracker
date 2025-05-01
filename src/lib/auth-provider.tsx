import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
  age?: number;
  bodyType?: string;
  goals?: string[];
  currentWeight?: number;
  targetWeight?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender?: string;
  age?: number;
  bodyType?: string;
  goals?: string[];
  currentWeight?: number;
  targetWeight?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configure axios defaults
  axios.defaults.baseURL = API_URL;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const handleError = (error: any) => {
    const message = error.response?.data?.message || error.response?.data?.error || 'An error occurred';
    setError(message);
    throw new Error(message);
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post('/auth/register', data);
      const { user, token } = response.data;

      setUser(user);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}