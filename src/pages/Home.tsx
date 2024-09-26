import { useAuth } from "@/contexts";
import { ROUTES } from "@/types/enums";
import { Navigate, Outlet } from "react-router-dom";

export function Home() {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated", { isAuthenticated });

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />;
}
