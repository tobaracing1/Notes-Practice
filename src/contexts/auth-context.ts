import React from "react";

interface AuthState {
  error?: boolean;
  data?: any;
}
interface AuthContextType {
  auth: AuthState | null;
  loading: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>;
}

const AuthContext = React.createContext<AuthContextType >(null);

export default AuthContext;
