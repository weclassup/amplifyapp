import React from "react";

import {
  RouteWithSubRoutesRenderProps,
  ScreenContainer,
  TabContainer,
  TabItem,
} from "@methodstudio/class-component-module";

import Bank from "@Screen/AccountManager/ReceivePayment/Bank";
import Withdraw from "@Screen/AccountManager/ReceivePayment/Withdraw";

const TAB_ITEMS: Array<TabItem> = [
  {
    pageKey: "withdraw",
    label: "申請提領",
    render: Withdraw,
  },
  {
    pageKey: "bank",
    label: "銀行帳戶",
    render: Bank,
  },
];

const ReceivePayment: React.FC<RouteWithSubRoutesRenderProps> = ({ title }) => {
  return (
    <ScreenContainer heading={title}>
      <TabContainer items={TAB_ITEMS} />
    </ScreenContainer>
  );
};

export default ReceivePayment;
