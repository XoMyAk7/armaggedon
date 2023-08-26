import Asteroid from "./Pages/Asteroid";
import Home from "./Pages/Home";

type RouteType = {
  path: string;
  element: React.ReactNode;
};

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Asteroid />,
  },
];
