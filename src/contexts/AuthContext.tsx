import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { saveUser, loadUser, removeUser } from '../utils/storage';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Check if user is already logged in on mount
  useEffect(() => {
    const user = loadUser();
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
      });
    }
  }, []);

  // Login function (mock auth)
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would make an API call here
    // This is a mock implementation for demo purposes
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login if email contains '@' and password is at least 6 chars
      if (email.includes('@') && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          username: email.split('@')[0],
          email,
        };
        
        saveUser(user);
        setAuthState({
          user,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    removeUser();
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  // Register function (mock)
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // In a real app, you would make an API call here
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username && email.includes('@') && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email,
        };
        
        saveUser(user);
        setAuthState({
          user,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
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