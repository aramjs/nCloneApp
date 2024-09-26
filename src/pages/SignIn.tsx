import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts";

export function SignIn() {
  const { signIn } = useAuth();

  return <Button onClick={signIn}>SignIn</Button>;
}
