import React, { useContext, useEffect, useState } from "react";
import { getUserLogged } from "@/utils/api";
import { useRouter } from "next/router";
import { authPath, publicPath } from "@/utils/utils";

interface Props {
  children: React.ReactNode;
}

export interface AuthState {
  error?: boolean;
  data?: any;
}

interface AuthContextType {
  auth: AuthState | null;
  loading: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>;
}

const AuthContext = React.createContext<AuthContextType>({
  auth: null,
  loading: false,
  setAuth: () => {},
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchAuth() {
      try {
        if (!auth) {
          setLoading(true);
          const response = await getUserLogged();
          setAuth({ error: response.error, data: response.data });

          if (response.error) {
            router.push(publicPath.login);
          } else {
            router.push(authPath.index);
          }
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        setAuth(null);
        router.push(publicPath.login);
      }
    }

    fetchAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, loading, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return React.useContext(AuthContext);
}
