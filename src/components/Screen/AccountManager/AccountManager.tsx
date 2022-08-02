import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  Flexbox,
  InScreenNavigationSidebar,
  RouteWithSubRoutes,
  RouteWithSubRoutesRenderProps,
} from "@methodstudio/class-component-module";

const AccountManager: React.FC<RouteWithSubRoutesRenderProps> = ({
  routes,
}) => {
  return (
    <Flexbox>
      <InScreenNavigationSidebar title="帳戶管理" routes={routes} />
      <Switch>
        {routes?.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
        <Route>
          <Redirect to={routes?.[0].to!} />
        </Route>
      </Switch>
    </Flexbox>
  );
};

export default AccountManager;
