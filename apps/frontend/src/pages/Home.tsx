import { useAuth } from "@/contexts";
import { LinkList, LinkTable, Login } from "@/components";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Outlet, useLocation } from "@tanstack/react-router";
import { ADMIN_ROUTES } from "@/types/enums";

export function Home() {
  const location = useLocation();
  const { signIn, isAuthenticated } = useAuth();
  const isAdmin = useIsAdmin();

  if (!isAuthenticated) return <Login onSubmit={signIn} />;

  if (isAdmin) {
    const isRoot = location.pathname === ADMIN_ROUTES.HOME;
    return isRoot ? <LinkTable /> : <Outlet />;
  }

  return <LinkList />;
}
