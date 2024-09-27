import { IAuthContext, AuthContext } from "@/contexts";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { ADMIN_ROUTES, COOKIE_KEY, ROUTES } from "@/types/enums";
import { getCookie, setCookie } from "@/utils/cookie";
import { useNavigate } from "@tanstack/react-router";
import { useState, useMemo, FC, PropsWithChildren, useEffect } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  const username =
    getCookie(isAdmin ? COOKIE_KEY.ADMIN_USERNAME : COOKIE_KEY.USERNAME) || "";

  const [isAuthenticated, setIsAuthenticated] = useState(!!username);

  const contextValue = useMemo<IAuthContext>(
    () => ({
      username,
      isAuthenticated,
      isAdmin,
      signIn: (email: string) => {
        setCookie(
          isAdmin ? COOKIE_KEY.ADMIN_USERNAME : COOKIE_KEY.USERNAME,
          email
        );
        setIsAuthenticated(true);
      },
      signOut: () => setIsAuthenticated(false),
    }),
    [isAdmin, isAuthenticated, username]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: isAdmin ? ADMIN_ROUTES.HOME : ROUTES.HOME });
    }
  }, [isAdmin, isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
