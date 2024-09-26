import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

export function Router() {
  return <RouterProvider router={router} />;
}
