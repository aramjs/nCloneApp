import { ADMIN_ROUTES } from "@/types/enums";
import { useLocation } from "@tanstack/react-router";

export function useIsAdmin() {
  const location = useLocation();

  return location.pathname.includes(ADMIN_ROUTES.HOME);
}
