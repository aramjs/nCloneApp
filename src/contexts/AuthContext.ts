import { createContext, useContext } from "react";

export type IAuthContext = {
  isAuthenticated: boolean;
  signIn: VoidFunction;
  signOut: VoidFunction;
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  signIn: () => null,
  signOut: () => null,
});

export const useAuth = () => useContext(AuthContext);
