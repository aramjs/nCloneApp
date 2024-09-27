import { createContext, useContext } from "react";

export type IAuthContext = {
  isAdmin: boolean;
  isAuthenticated: boolean;
  signIn(email: string): void;
  signOut: VoidFunction;
};

export const AuthContext = createContext<IAuthContext>({
  isAdmin: false,
  isAuthenticated: false,
  signIn: () => null,
  signOut: () => null,
});

export const useAuth = () => useContext(AuthContext);
