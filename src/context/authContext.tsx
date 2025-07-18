// contexts/AuthContext.tsx
import 
// React,
 { createContext, useContext, useEffect, useState }
  from "react";
import authService from "../services/authService";
import { useSessions } from "../hooks/useSessions";
interface AuthContextType {
  accessToken: string | null;
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children}:any) => {
  const service = authService();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [loading] = useState(false);
  const {create} = useSessions()

  // Load token + user from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      service.getCurrentUser()
        .then(setUser)
        .catch(() => logout()); // token invalid or expired
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response:any = await service.login(email, password);
    const token = response.data.access_token;
    token ?? localStorage.setItem("access_token", token);
    setAccessToken(token);
    create.mutate();

    console.log(`token: ${accessToken}`)

    const user:any = await service.getCurrentUser();
    setUser(user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: !!accessToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
