import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./types/enums";
import { Home, SignIn } from "./pages";

const Loader = () => <div>Loading...</div>;

export function Router() {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />,
      children: [
        {
          path: ROUTES.LINK_LIST,
          element: <div>{ROUTES.LINK_LIST}</div>,
          loader: Loader,
        },
      ],
    },
    {
      path: ROUTES.SIGN_IN,
      element: <SignIn />,
    },
  ]);

  return <RouterProvider router={router} />;
}
