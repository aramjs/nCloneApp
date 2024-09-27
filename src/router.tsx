import { AddLink, Home, Main } from "@/pages";
import { ADMIN_ROUTES, ROUTES } from "@/types/enums";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { NotFound } from "./components";

const rootRoute = createRootRoute({
  component: () => (
    <Main>
      <Outlet />
    </Main>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.HOME,
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ADD_LINK,
  component: AddLink,
});

const adminHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ADMIN_ROUTES.HOME,
  component: Home,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const adminNotFoundRoute = createRoute({
  getParentRoute: () => adminHomeRoute,
  path: "*",
  component: NotFound,
});

adminHomeRoute.addChildren([adminNotFoundRoute]);

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  adminHomeRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
