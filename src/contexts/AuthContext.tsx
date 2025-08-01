import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import axios from 'axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): any => {
    const response = axios.post('http://localhost:8000/api/login', { email, password });
    response.then(res => {
      if (res.status === 200) {
        setUser(res.data.user);
        return true;
      }
      return false;
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};