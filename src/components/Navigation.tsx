import { ROUTES } from "@/types/enums";
import { Link, Outlet } from "@tanstack/react-router";

export function Navigation() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to={ROUTES.LINK_LIST} className="[&.active]:font-bold">
          LINKS
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          ABOUT
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
