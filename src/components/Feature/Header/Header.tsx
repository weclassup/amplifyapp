import React, { useCallback, useEffect, useState } from "react";

import { faSignOutAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Fonts,
  HambButton,
  Header as HeaderContainer,
  HeaderNavigationList,
  HeaderUserInformation,
  NotificationBell,
  useTeacherAuth,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import { routes } from "@configs/route.configs";

import DrawerNavigation from "../DrawerNavigation";

const Header = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  useEffect(() => {
    if (openNav) {
      setOpenNotification(false);
    }
  }, [openNav]);
  useEffect(() => {
    if (openNotification) {
      setOpenNav(false);
    }
  }, [openNotification]);

  const triggerNavigationList = useCallback(() => {
    setOpenNav((prev) => !prev);
  }, []);

  const triggerNotificationList = useCallback(() => {
    setOpenNotification((prev) => !prev);
  }, []);

  return (
    <React.Fragment>
      <HeaderContainer disableZIndex className={classNames("z-[2]")}>
        <HeaderNavigationList routes={routes} />
        <NotificationBell
          triggerNotificationList={triggerNotificationList}
          isOpen={openNotification}
          api={{
            getInfo: TeacherApi.teacherGetNotificationInfo,
            updateRead: TeacherApi.teacherUpdateNotificationRead,
            getWebSocket: TeacherApi.getWebSocketUrlForTeacher,
            searchNotification: TeacherApi.teacherSearchNotifications,
          }}
          className={classNames("ml-auto")}
        />
        <UserInformation />
        <HambButton
          className={classNames("ml-2", "lg:hidden")}
          open={openNav}
          onClick={triggerNavigationList}
        />
      </HeaderContainer>
      <DrawerNavigation open={openNav} closeHandler={() => setOpenNav(false)} />
    </React.Fragment>
  );
};

export default Header;

const UserInformation = () => {
  const { userProfile, signOutHandler } = useTeacherAuth.useContainer();

  return (
    <HeaderUserInformation
      profilePicture={userProfile?.activeProfile?.profilePicture}
      className={classNames("ml-8")}
    >
      <div
        className={classNames(
          "p-6",
          "pb-4",
          "border-b",
          "border-solid",
          "border-grey4",
          "pb-2"
        )}
      >
        <p
          className={classNames(
            "text-lg",
            "font-medium",
            "mb-1",
            "leading-[26px]"
          )}
        >
          {userProfile?.activeProfile?.nickName}
        </p>
        <Fonts
          fontSize="primaryBody"
          className={classNames(
            "text-lg",
            "text-grey2",
            "font-medium",
            "leading-[23px]"
          )}
        >
          {userProfile?.email}
        </Fonts>
      </div>
      <Fonts
        as="button"
        type="button"
        onClick={signOutHandler}
        fontSize="primaryButton"
        className={classNames(
          "text-grey2",
          "leading-[4rem]",
          "px-6",
          "w-full",
          "text-left"
        )}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className={classNames("mr-2")} />
        登出
      </Fonts>
    </HeaderUserInformation>
  );
};
