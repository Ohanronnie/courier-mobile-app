import { createContext, use, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStorage.getItemAsync("JwtToken");
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => use(AuthContext);
