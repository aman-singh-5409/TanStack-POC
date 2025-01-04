import { ReactNode } from "react";
import MainLayout from "./pages/layout/MainLayout";
import Query from "./pages/Query";
import DependentQuery from "./pages/DependentQuery";
import { getRandomColor } from "./utils/colors";
import Queries from "./pages/Queries";
import InfiniteQueries from "./pages/InfiniteQueries";
import PaginatedQueries from "./pages/PaginatedQueries";
import Mutations from "./pages/Mutations";
import Prefetching from "./pages/Prefetching";

interface IRoutes {
  path: string;
  element: ReactNode;
  children?: IRoutes[];
}

export const sidebarTabs = [
  {
    path: "query",
    name: "Query",
    color: getRandomColor(9),
    element: <Query />,
  },
  {
    path: "dependentQuery",
    name: "Dependent Query",
    color: getRandomColor(9),
    element: <DependentQuery />,
  },
  {
    path: "queries",
    name: "Queries",
    color: getRandomColor(9),
    element: <Queries />,
  },
  {
    path: "infiniteQueries",
    name: "Infinite Queries",
    color: getRandomColor(9),
    element: <InfiniteQueries />,
  },
  {
    path: "paginatedQueries",
    name: "Paginated Queries",
    color: getRandomColor(9),
    element: <PaginatedQueries />,
  },
  {
    path: "mutations",
    name: "Mutations",
    color: getRandomColor(9),
    element: <Mutations />,
  },
  {
    path: "prefetching",
    name: "Cache & Prefetching",
    color: getRandomColor(9),
    element: <Prefetching />,
  },
];

export const routes: IRoutes[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: sidebarTabs.map((tab) => ({
      path: tab.path,
      element: tab.element,
    })),
  },
];
