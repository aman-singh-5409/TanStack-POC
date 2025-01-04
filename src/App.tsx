import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import AppWrapper from "./context/QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <AppWrapper>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </AppWrapper>
  );
};

export default App;
