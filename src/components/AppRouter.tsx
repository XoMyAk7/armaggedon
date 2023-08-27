import { FC } from "react";
import Earth from "./Earth/Earth";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { routes, routesMobileSend } from "../routes";
import { useSize } from "../hooks/useSize";

const AppRouter: FC = () => {
  const { isDesktop } = useSize();
  const Layout = () => (
    <>
      <Earth />
      <Outlet />
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />} errorElement={<h1>Ошибка!</h1>}>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {isDesktop
            ? ""
            : routesMobileSend.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
