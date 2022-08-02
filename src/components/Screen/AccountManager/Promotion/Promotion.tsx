import React, { useCallback } from "react";
import { useAsync } from "react-use";

import {
  axiosHelper,
  Button,
  Fonts,
  FormLabel,
  Image,
  RouteWithSubRoutesRenderProps,
  ScreenContainer,
  useTeacherAuth,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { PublicApi } from "@/api";

import PromotionIcon from "@assets/images/icons/class_invitation_teacher_img.svg";

const Promotion: React.FC<RouteWithSubRoutesRenderProps> = ({ title }) => {
  const { userProfile } = useTeacherAuth.useContainer();

  const { value: rewardAmount } = useAsync(
    axiosHelper.getDataFromAxiosRespond(
      async () => PublicApi.searchConfigs({ ids: ["TEACHER_PROMOTE_REWARD"] }),
      (data) => data[0]?.configValue
    ),
    []
  );

  const content = `Hi！我是 ${userProfile?.activeProfile?.nickName}，這是我的CLASS專屬邀請碼「${userProfile?.promoteCode}」，於註冊會員頁面填寫此邀請碼可以獲得 ${rewardAmount} 金幣！`;

  const onCopyClick = useCallback(async () => {
    const input = document.createElement("input");
    document.body.append(input);
    input.value = content;
    input.select();
    input.setSelectionRange(0, 999999);
    document.execCommand("copy");
    document.body.removeChild(input);
  }, [content]);

  return (
    <ScreenContainer
      heading={title}
      contentClassName={classNames("md:px-10")}
      className={"pb-6"}
    >
      <div
        className={classNames(
          "px-6 py-8 md:py-10",
          "bg-white",
          "md:rounded-xl"
        )}
      >
        <Fonts className={classNames("mb-5 md:mb-6", "text-center")}>
          分享你的專屬邀請碼給好友！
          <br />
          當好友使用你的邀請碼註冊 CLASS 會員成功，您與好友皆可獲得{" "}
          {rewardAmount} 金幣！
        </Fonts>
        <Image
          src={PromotionIcon}
          className={classNames("mb-5 md:mb-6", "w-[11.25rem]", "mx-auto")}
        />
        <div className={classNames("mb-5 md:mb-6 md:mx-auto", "md:w-[25rem]")}>
          <FormLabel>專屬邀請碼</FormLabel>
          <Fonts
            fontSize={"title"}
            className={classNames(
              "text-primary text-center leading-[2.875rem]",
              "border border-solid border-grey4 rounded-sm"
            )}
          >
            {userProfile?.promoteCode}
          </Fonts>
        </div>
        <div
          className={classNames(
            "mb-5 md:mb-6 md:mx-auto",
            "md:w-[25rem]",
            "px-4 py-3",
            "border border-solid border-grey4 rounded-sm"
          )}
        >
          <Fonts className={classNames("text-grey2")}>{content}</Fonts>
        </div>
        <Button
          className={classNames("mb-5 md:mb-6 md:mx-auto", "md:w-[25rem]")}
          type={"button"}
          buttonStyle={"primary"}
          fill
          onClick={onCopyClick}
        >
          複製邀請文字
        </Button>
      </div>
    </ScreenContainer>
  );
};

export default Promotion;
