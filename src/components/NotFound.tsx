import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ADMIN_ROUTES, ROUTES } from "@/types/enums";
import { useAuth } from "@/contexts";

export function NotFound() {
  const { isAdmin } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px] text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl">🕵️‍♀️</div>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" asChild>
            <Link to={isAdmin ? ADMIN_ROUTES.HOME : ROUTES.HOME}>
              Go Back Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
