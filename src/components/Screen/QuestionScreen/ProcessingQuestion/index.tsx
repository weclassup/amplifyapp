import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  RouteWithSubRoutes,
  RouteWithSubRoutesRenderProps,
} from "@methodstudio/class-component-module";

const ProcessingQuestion: React.FC<RouteWithSubRoutesRenderProps> = ({
  routes,
}) => {
  return (
    <Switch>
      {routes?.map((route) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
      <Route>
        <Redirect to={routes?.[0].to!} />
      </Route>
    </Switch>
  );
};

export default ProcessingQuestion;
