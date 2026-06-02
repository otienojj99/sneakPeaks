import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth.types";
import authService from "../api/services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   const savedUser = localStorage.getItem("user");

  //   if (savedToken && savedUser) {
  //     setToken(savedToken);
  //     setUser(JSON.parse(savedUser));
  //   }
  //   setIsLoading(false);
  // }, []);
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));

        // Optionally verify token is still valid
        try {
          const response = await authService.getMe();
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch {
          // Token expired or invalid
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // ---------- LOGIN ----------

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    const { token: newToken, user: newUser } = response.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // ---------- REGISTER ----------

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    const response = await authService.register({
      name,
      email,
      password,
      password_confirmation,
    });
    const { token: newToken, user: newUser } = response.data;

    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // ---------- LOGOUT ----------
  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Even if API fails, clear local state
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  // ---------- UPDATE USER ----------
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
