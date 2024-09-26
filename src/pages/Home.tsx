import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts";
import { ROUTES } from "@/types/enums";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: ROUTES.LINK_LIST });
    } else {
      navigate({ to: ROUTES.SIGN_IN });
    }
  }, [isAuthenticated, navigate]);

  return <Navigation />;
}
