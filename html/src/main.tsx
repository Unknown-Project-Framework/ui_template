import ReactDOM from "react-dom/client";
import "./index.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import mantineTheme from "./_components/mantineTheme";

import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import App from "./App";
import Characters from "./Characters";
import CreateCharacter from "./_components/CreateCharacter";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <App />,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Characters />,
});

const createRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: () => <CreateCharacter />,
});

const routeTree = rootRoute.addChildren([indexRoute, homeRoute, createRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <MantineProvider defaultColorScheme="dark" theme={mantineTheme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
