import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts";
import { ROUTES } from "@/types/enums";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const { signIn } = useAuth();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // in case we try to open this route when the user is already authenticated
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  return <Button onClick={signIn}>SignIn</Button>;
}
