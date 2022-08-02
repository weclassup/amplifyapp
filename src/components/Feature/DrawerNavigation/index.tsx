import React from "react";

import {
  DrawerNavigationContainer,
  DrawerNavigationList,
  useTeacherAuth,
} from "@methodstudio/class-component-module";

import { routes } from "@configs/route.configs";

interface Props {
  open: boolean;
  closeHandler: () => void;
}

const DrawerNavigation: React.FC<Props> = ({ open, closeHandler }) => {
  const { userProfile, signOutHandler } = useTeacherAuth.useContainer();

  return (
    <DrawerNavigationContainer
      email={userProfile?.email}
      open={open}
      closeHandler={closeHandler}
      signOutHandler={signOutHandler}
      profilePicture={userProfile?.activeProfile?.profilePicture}
      nickName={userProfile?.activeProfile?.nickName}
    >
      <DrawerNavigationList routes={routes} closeHandler={closeHandler} />
    </DrawerNavigationContainer>
  );
};

export default DrawerNavigation;
