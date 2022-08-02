import React, { useCallback, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { matchRoutes } from "react-router-config";
import { useAsyncFn } from "react-use";

import { faCheck, faFileAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Breadcrumbs,
  Button,
  ChattingRoom,
  errorMessage,
  FileUploader,
  Flexbox,
  Fonts,
  formatChecker,
  ScreenContainer,
  useAsyncPrompt,
  useChattingMessage,
  useGetQuestionExpiration,
  useOnEndReach,
  UserProfilePicture,
  useWebSocket,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import {
  QuestionChatMessageDto,
  TeacherQuestionDetailDto,
} from "@api/teacher.api";
import { routes } from "@configs/route.configs";
import QuestionContent from "@Screen/QuestionScreen/Feature/QuestionContent";

const ChatWithStudentScreen: React.FC<
  RouteComponentProps<{ questionId: string }>
> = ({
  location,
  match: {
    params: { questionId },
  },
}) => {
  const matchedRoutes = matchRoutes(routes, location.pathname);
  const id = useRef<number>(Number(questionId));
  const chattingRef = useRef<HTMLUListElement | null>(null);
  const { prompt, showAsyncPrompt, handleConfirm } = useAsyncPrompt();
  const [{ value: detail }, reloadDetail] = useAsyncFn(
    async () =>
      await TeacherApi.getQuestionDetail(id.current).then((res) => res.data),
    []
  );

  useEffect(() => {
    reloadDetail();
  }, []);

  const { newMessages, oldMessages, getNewMessages, turnPageHandler } =
    useChattingMessage<QuestionChatMessageDto>(
      id.current,
      TeacherApi.searchQuestionChatMessages
    );

  useOnEndReach({
    el: chattingRef.current,
    opposite: true,
    onEndReached: turnPageHandler,
    eventThrottle: 1500,
  });

  useWebSocket(TeacherApi.getWebSocketUrlForTeacher, {
    onmessage: function (this, event) {
      const data = JSON.parse(event.data) as {
        action: "QUESTION_CHAT_NEW_MESSAGE";
        data: { questionId: number };
      };
      if (data.action === "QUESTION_CHAT_NEW_MESSAGE") {
        getNewMessages();
      }
    },
  });

  const fileChangeHandler = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(async (e) => {
    try {
      const file = e.target.files?.item(0);

      if (formatChecker.isNotSet(file)) return;

      if (file.size > 50 /*MB*/ * 1024 /*KB*/ * 1024 /*Byte*/) {
        alert("上傳檔案大小上限為50MB");
        // } else if (file.type === "video/quicktime") {
        //   alert(`檔案格式(${file.type})不支援。`);
      } else {
        const fileId = await new FileUploader("teacher")
          .getResult(file)
          .then((res) => res?.id);
        await TeacherApi.createQuestionChatMessage(id.current, {
          fileIds: fileId ? [fileId] : [],
          content: "",
        });
      }
    } catch (e) {
      const errorName = errorMessage.getErrorNameFromResponse(e);
      if (errorName === "QUESTION_COMPLETED_CANNOT_CHAT") {
        await prompt();
        await reloadDetail();
      }
    } finally {
      e.target.value = "";
      e.target.files = null;
    }
  }, []);

  const sendContentHandler = useCallback(async (content: string) => {
    try {
      await TeacherApi.createQuestionChatMessage(id.current, {
        content,
        fileIds: [],
      });
    } catch (e) {
      const errorName = errorMessage.getErrorNameFromResponse(e);
      if (errorName === "QUESTION_COMPLETED_CANNOT_CHAT") {
        await prompt();
        await reloadDetail();
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Alert
        alert={showAsyncPrompt}
        renderTitle={AlertTitle}
        content={"你可以在回答紀錄中重新查看"}
        confirmHandler={() => handleConfirm(true)}
      />
      <ScreenContainer
        contentClassName={classNames("flex", "flex-col", "h-full")}
        className={classNames("h-[calc(100vh-57px)]", "overflow-hidden")}
      >
        <Breadcrumbs matchedRoutes={matchedRoutes} />
        <div
          className={classNames(
            "flex-1",
            "overflow-hidden",
            "md:p-10",
            "md:pt-0"
          )}
        >
          <Flexbox
            direction={"col"}
            className={classNames(
              "w-full",
              "h-full",
              "md:rounded-xl",
              "md:overflow-hidden"
            )}
          >
            <StudentInfoSection detail={detail} />
            <div
              className={classNames("flex-1", "overflow-hidden", "relative")}
            >
              <ChattingRoom
                status={detail?.status || "COMPLETE"}
                questionId={id.current}
                newMessages={newMessages}
                oldMessages={oldMessages}
                sendContentHandler={sendContentHandler}
                fileChangeHandler={fileChangeHandler}
                getPreferenceUsingGet={TeacherApi.getTeacherPreference}
                updatePreferenceUsingPut={TeacherApi.updateTeacherPreference}
                sender={"TEACHER"}
                chattingRef={chattingRef}
                renderWaring={() => (
                  <p className={classNames("text-grey1", "text-center")}>
                    提醒老師權益，避免回答太多不相關問題
                  </p>
                )}
              />
            </div>
          </Flexbox>
        </div>
      </ScreenContainer>
    </React.Fragment>
  );
};

export default ChatWithStudentScreen;

const AlertTitle = () => {
  return (
    <Fonts
      as={"h1"}
      fontSize={"primaryHeading"}
      className={classNames("mb-3", "lg:mb-4")}
    >
      已完成問題
      <span className={classNames("text-green", "ml-1")}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
    </Fonts>
  );
};

const StudentInfoSection: React.FC<{ detail?: TeacherQuestionDetailDto }> = ({
  detail,
}) => {
  const [openQuestionContent, setOpenQuestionContent] =
    useState<boolean>(false);
  const expireAt = useGetQuestionExpiration(detail);

  if (formatChecker.isNotSet(detail)) return null;

  return (
    <React.Fragment>
      <QuestionContent
        open={openQuestionContent}
        closeHandler={() => setOpenQuestionContent(false)}
        questionId={detail.id}
      />
      <Flexbox
        align={"center"}
        className={classNames(
          "px-6",
          "py-[0.875rem]",
          "bg-white",
          "border-b",
          "border-solid",
          "border-grey4"
        )}
      >
        <UserProfilePicture
          className={classNames("mr-2", "w-10", "h-10")}
          defaultSize={false}
          url={detail?.student?.profilePicture?.url}
        />
        <div className={classNames("flex-1")}>
          <Flexbox align={"center"} className={classNames("mb-1", "w-full")}>
            <Fonts fontSize={"primaryButton"} className={classNames("mr-2")}>
              {detail?.student?.nickName}
            </Fonts>
            <button
              type={"button"}
              className={classNames(
                "text-base",
                "ml-auto",
                "text-primary",
                "lg:hidden"
              )}
              onClick={() => setOpenQuestionContent(true)}
            >
              <FontAwesomeIcon icon={faFileAlt} />
            </button>
          </Flexbox>
          <p className={classNames("text-grey2", "text-[0.75rem]")}>
            {expireAt}
          </p>
        </div>
        <Button
          buttonStyle={"secondary"}
          buttonFonts={"secondary"}
          defaultSize={false}
          className={classNames("mx-4", "py-2", "px-3", "hidden", "lg:flex")}
          onClick={() => setOpenQuestionContent(true)}
        >
          <FontAwesomeIcon icon={faFileAlt} className={classNames("mr-2")} />
          <Fonts fontSize={"primaryButton"}>查看答案</Fonts>
        </Button>
      </Flexbox>
    </React.Fragment>
  );
};
