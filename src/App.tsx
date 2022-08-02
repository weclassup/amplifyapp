import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import {
  AuthorizeUI,
  Loader,
  RouteWithSubRoutes,
} from "@methodstudio/class-component-module";

import { routes } from "@configs/route.configs";

import Header from "./components/Feature/Header";

const App = () => {
  return (
    <AuthorizeUI type={"teacher"}>
      <Loader />
      <BrowserRouter>
        <Header />
        <Switch>
          {routes.map((route) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
          <Route>
            <Redirect to={routes[0].to!} />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthorizeUI>
  );
};

export default App;
