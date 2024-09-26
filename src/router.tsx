import { Home, LinkList, SignIn } from "@/pages";
import { ROUTES } from "@/types/enums";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Home />,
});

// authenticated
const linksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.LINK_LIST,
  component: () => <LinkList />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

// unauthenticated
const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.SIGN_IN,
  component: () => <SignIn />,
});

const authenticatedRoutes = [linksRoute, aboutRoute];
const unauthenticatedRoutes = [signInRoute];

const routeTree = rootRoute.addChildren([
  ...authenticatedRoutes,
  ...unauthenticatedRoutes,
]);

export const router = createRouter({ routeTree });
