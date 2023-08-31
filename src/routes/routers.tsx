// import Home from "@/pages/home/Home.tsx";
import Counter from "@/pages/counter";
import Home from "@/pages/home";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routers: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
];

export const routes = createBrowserRouter(routers);
