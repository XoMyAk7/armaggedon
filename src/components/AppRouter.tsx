import { FC } from "react";
import Earth from "./Earth/Earth";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { routes } from "../routes";

const AppRouter: FC = () => {
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
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
