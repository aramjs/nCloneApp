import { createContext, useContext } from "react";

export type IAuthContext = {
  username: string;
  isAdmin: boolean;
  isAuthenticated: boolean;
  signIn(email: string): void;
  signOut: VoidFunction;
};

export const AuthContext = createContext<IAuthContext>({
  username: "",
  isAdmin: false,
  isAuthenticated: false,
  signIn: () => null,
  signOut: () => null,
});

export const useAuth = () => useContext(AuthContext);
