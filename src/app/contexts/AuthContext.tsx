"use client";

import {
  ApiError,
  RegisterRequest,
  User,
  authApi
} from "@/lib/api";
import { ROUTES } from "@/lib/routes";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  validateToken: () => Promise<boolean>;
  loginRedirectPath: string;
  dashboardRedirectPath: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateToken = useCallback(async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("auth_token");
    if (!storedToken) {
      return false;
    }

    try {
      const userData = await authApi.validateToken(storedToken);
      // Update user data if it's different from stored data
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      // Check for stored token and validate it
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");

      if (storedToken && storedUser) {
        // Set the user data immediately from localStorage to prevent redirect
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);

        // Then validate the token with the server in the background
        const isValid = await validateToken();
        if (!isValid) {
          // Only clear if token is actually invalid
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [validateToken]);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authApi.login({ username, password });

      setToken(data.access_token);
      setUser(data.user);
      setIsAuthenticated(true);

      // Store in localStorage
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));

      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Login failed");
      }
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.register(userData);

      // Auto-login after successful registration
      return await login(userData.username, userData.password);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Registration failed");
      }
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated,
        error,
        validateToken,
        loginRedirectPath: ROUTES.LOGIN,
        dashboardRedirectPath: ROUTES.DASHBOARD,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
