import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useAsync } from "react-use";
import "swiper/swiper.min.css";

import { faCheck, faTimes } from "@fortawesome/pro-light-svg-icons";
import { faChevronDown, faComment } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Button,
  classMoment,
  ContentPreviewSection,
  FileUploader,
  Flexbox,
  Fonts,
  formatChecker,
  FullScreenModalContainer,
  IsOkModal,
  LinkButton,
  MatchTypeLabel,
  momentHelper,
  QuestionStatusLabel,
  SubjectLabel,
  uListEventEmitter,
  useAsyncPrompt,
  useGetQuestionExpiration,
  useIsOk,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { PublicApi, TeacherApi } from "@/api";

import { TeacherQuestionDetailDto } from "@api/teacher.api";
import { ChatWithStudentRoute } from "@configs/route.configs";
import AnswerField, { AnswerFormValues } from "@Feature/AnswerField";
import SubmitSuccess from "@images/icons/cls-question-success-img.svg";
import { matchTypeEnum, systemConfigEnum } from "@static/static.options";

interface Props {
  open: boolean;
  closeHandler: () => void;
  questionId: number;
}

const QuestionContent: React.FC<Props> = ({
  open,
  closeHandler,
  questionId,
}) => {
  const [content, setContent] = useState<TeacherQuestionDetailDto | null>(null);
  const { value: teacherAnswerExpiration } = useAsync(async () => {
    return open
      ? await PublicApi.searchConfigs({
          ids: ["TEACHER_ANSWER_EXPIRATION"],
        }).then((res) => res.data?.[0])
      : undefined;
  }, [open]);
  const { isOk, resultHandler } = useIsOk();

  useEffect(() => {
    if (open) return;
    uListEventEmitter.emit();
  }, [open]);

  const {
    showAsyncPrompt: showApplyAnswerPrompt,
    prompt: applyAnswerPrompt,
    handleConfirm: confirmApplyAnswerHandler,
    handleClose: cancelApplyAnswerHandler,
  } = useAsyncPrompt<boolean>();

  const {
    showAsyncPrompt: showAnswerPrompt,
    prompt: answerPrompt,
    handleConfirm: confirmAnswerHandler,
    handleClose: cancelAnswerHandler,
  } = useAsyncPrompt<boolean>();

  useEffect(() => {
    if (!open) return;
    TeacherApi.getQuestionDetail(questionId)
      .then((res) => setContent(res.data))
      .catch((e) => {
        closeHandler();
        throw e;
      });
  }, [open]);

  const expireAt = useGetQuestionExpiration(content!);

  const acceptHandler = useCallback(async () => {
    const check = await applyAnswerPrompt();
    if (check) {
      const { data } = await TeacherApi.applyQuestion(questionId);
      setContent(data);
    }
  }, []);

  const submitAnswerHandler = useCallback<SubmitHandler<AnswerFormValues>>(
    async (formValues) => {
      const check = await answerPrompt();
      if (check) {
        const uploader = new FileUploader("teacher");
        const teacherAnswerAttachmentFileIds = await uploader
          .getResult(formValues.teacherAnswerAttachmentFiles)
          .then((res) => res.filter(formatChecker.isSet).map(({ id }) => id));
        const { data } = await TeacherApi.answerQuestion(questionId, {
          teacherAnswerContent: formValues.teacherAnswerContent,
          teacherAnswerAttachmentFileIds,
        });
        await resultHandler(true);
        setContent(data);
      }
    },
    []
  );

  if (formatChecker.isNotSet(content)) return null;

  return (
    <React.Fragment>
      <img
        src={SubmitSuccess}
        alt={"preserve"}
        className={classNames("hidden")}
      />
      <IsOkModal
        isOk={isOk}
        success={{ image: SubmitSuccess, text: "答案已送出" }}
      />
      <Alert
        alert={showApplyAnswerPrompt}
        confirmHandler={() => confirmApplyAnswerHandler(true)}
        cancelHandler={() => cancelApplyAnswerHandler(false)}
        title={"確定回答問題？"}
        content={`確定回答後將開始計時，請於 ${
          teacherAnswerExpiration?.configValue
        } ${
          teacherAnswerExpiration &&
          systemConfigEnum[teacherAnswerExpiration.configValueType]
        }內上傳答案，逾期將自動取消提問，並降低老師評價。`}
      />
      <Alert
        alert={showAnswerPrompt}
        confirmHandler={() => confirmAnswerHandler(true)}
        cancelHandler={() => cancelAnswerHandler(false)}
        title={"確定送出答案？"}
        content={`請檢查答案，送出題目後即不可編輯或取消。`}
      />
      <FullScreenModalContainer
        open={open}
        closeHandler={closeHandler}
        heading={"問題內容"}
        headerClassName={classNames("md:hidden")}
        containerClassName={classNames(
          "relative",
          "h-stretch",
          "md:flex",
          "md:w-full",
          "md:max-h-full",
          "md:h-auto",
          "lg:w-[50.9375rem]"
        )}
      >
        <div
          className={classNames(
            "flex-1",
            "overflow-scroll",
            "md:flex",
            "md:flex-col"
          )}
        >
          <div
            className={classNames(
              "mb-3",
              "md:px-10",
              "md:py-6",
              "md:border-b",
              "md:border-solid",
              "md:border-grey4",
              "md:mb-0",
              "lg:flex",
              "lg:items-center"
            )}
          >
            <div className={classNames("md:flex", "md:items-center")}>
              <Flexbox
                as={"ul"}
                className={classNames("ml-6", "mt-3", "mb-2", "md:m-0")}
              >
                <QuestionStatusLabel status={content.status} />
                <MatchTypeLabel type={content.teacherMatchType} />
                <SubjectLabel>
                  {`${content.subjectCategory?.name}${content.subject?.name}`}
                </SubjectLabel>
              </Flexbox>
              <p
                className={classNames(
                  "text-[0.75rem]",
                  "text-grey2",
                  "ml-6",
                  "md:ml-2"
                )}
              >
                {expireAt}
              </p>
            </div>
            <Fonts
              condition={content.status === "ANSWERING"}
              disableDefaultSize
              className={classNames(
                "hidden",
                "lg:block",
                "ml-auto",
                "text-[#00B25D]",
                "font-medium",
                "text-sm"
              )}
            >
              請至下方答案區進行回答
              <FontAwesomeIcon
                icon={faChevronDown}
                className={classNames("ml-1")}
              />
            </Fonts>
            <MatchingFunctionalSection
              teacherMatchType={content.teacherMatchType}
              status={content.status}
              id={content.id}
              closeHandler={closeHandler}
              acceptHandler={acceptHandler}
              position={"header"}
            />
            <AnsweredFunctionalSection
              status={content.status}
              id={content.id}
              position={"header"}
              hasChatMessage={content.hasChatMessage}
            />
          </div>
          <ContentPreviewSection
            containerClassName={classNames(
              "md:px-10",
              "md:py-6",
              "md:flex-1",
              "lg:px-[5.75rem]"
            )}
            content={content.content}
            files={content.attachmentFiles}
            section={"question"}
          />
          <AnswerField
            status={content.status}
            submitHandler={submitAnswerHandler}
          />
          <AnsweredSection
            status={content.status}
            teacherAnswerAttachmentFiles={content.teacherAnswerAttachmentFiles}
            teacherAnswerContent={content.teacherAnswerContent}
          />
          <MatchSection
            id={content.id}
            teacherMatchType={content.teacherMatchType}
            issueAt={content.issueAt}
            studentCompleteAt={content.studentCompleteAt}
            status={content.status}
          />
        </div>
        <MatchingFunctionalSection
          teacherMatchType={content.teacherMatchType}
          status={content.status}
          id={content.id}
          closeHandler={closeHandler}
          acceptHandler={acceptHandler}
          position={"footer"}
        />
        <AnsweredFunctionalSection
          status={content.status}
          id={content.id}
          position={"footer"}
          hasChatMessage={content.hasChatMessage}
        />
      </FullScreenModalContainer>
    </React.Fragment>
  );
};

export default QuestionContent;

const AnsweredSection: React.FC<
  Pick<
    TeacherQuestionDetailDto,
    "status" | "teacherAnswerAttachmentFiles" | "teacherAnswerContent"
  >
> = ({ status, teacherAnswerContent, teacherAnswerAttachmentFiles }) => {
  if (status !== "ANSWERED" && status !== "COMPLETE") return null;

  return (
    <ContentPreviewSection
      containerClassName={classNames(
        "bg-bg-blue",
        "md:px-10",
        "md:py-6",
        "md:flex-1",
        "lg:px-[5.75rem]"
      )}
      content={teacherAnswerContent}
      files={teacherAnswerAttachmentFiles}
      section={"answer"}
    />
  );
};

const MatchSection: React.FC<
  Pick<
    TeacherQuestionDetailDto,
    "id" | "teacherMatchType" | "issueAt" | "studentCompleteAt" | "status"
  >
> = ({ id, teacherMatchType, issueAt, studentCompleteAt, status }) => {
  const questionTimeLine = () => {
    const issueAtMoment = classMoment(issueAt);
    const issueAtFormat = momentHelper.getNormalFormat(issueAtMoment);

    return <React.Fragment>{issueAtFormat}</React.Fragment>;
  };

  return (
    <React.Fragment>
      <div
        className={classNames(
          "px-6",
          "py-5",
          "border-t",
          "border-solid",
          "border-grey4",
          "md:px-10",
          "md:py-6"
        )}
      >
        <Flexbox align={"start"} className={classNames("mb-2")}>
          <Fonts
            fontSize={"secondaryBody"}
            className={classNames("text-grey2", "mr-4", "flex-shrink-0")}
          >
            發問時間
          </Fonts>
          <p className={classNames("text-grey1", "text-sm")}>
            {questionTimeLine()}
          </p>
        </Flexbox>
        <Flexbox
          condition={status === "COMPLETE"}
          align={"start"}
          className={classNames("mb-2")}
        >
          <Fonts
            fontSize={"secondaryBody"}
            className={classNames("text-grey2", "mr-4", "flex-shrink-0")}
          >
            完成時間
          </Fonts>
          <p className={classNames("text-grey1", "text-sm")}>
            {momentHelper.getNormalFormat(classMoment(studentCompleteAt))}
          </p>
        </Flexbox>
        <Flexbox align={"start"}>
          <Fonts
            fontSize={"secondaryBody"}
            className={classNames("text-grey2", "mr-4", "flex-shrink-0")}
          >
            配對方式
          </Fonts>
          <p className={classNames("text-grey1", "text-sm", "flex")}>
            <Flexbox as={"span"}>{matchTypeEnum[teacherMatchType]}</Flexbox>
          </p>
        </Flexbox>
      </div>
    </React.Fragment>
  );
};

const FunctionalSectionWrapper: React.FC<{
  position: "header" | "footer";
  condition: boolean;
}> = ({ position, children, condition }) => {
  if (position === "footer") {
    return (
      <Flexbox
        condition={condition}
        className={classNames(
          "py-4",
          "px-6",
          "border-t",
          "border-solid",
          "border-grey4",
          "md:hidden"
        )}
      >
        {children}
      </Flexbox>
    );
  } else {
    return (
      <Flexbox
        condition={condition}
        className={classNames(
          "hidden",
          "md:mt-2",
          "md:-mb-2",
          "md:flex",
          "lg:m-0",
          "lg:ml-auto"
        )}
      >
        {children}
      </Flexbox>
    );
  }
};

interface MatchingFunctionalSectionProps
  extends Pick<TeacherQuestionDetailDto, "teacherMatchType" | "status"> {
  id: number;
  closeHandler: () => void;
  acceptHandler: () => void;
  position: "header" | "footer";
}

const MatchingFunctionalSection: React.FC<MatchingFunctionalSectionProps> = ({
  teacherMatchType,
  id,
  closeHandler,
  status,
  acceptHandler,
  position,
}) => {
  const rejectHandler = async () => {
    await TeacherApi.rejectSpecifyQuestion(id);
    closeHandler();
  };

  return (
    <FunctionalSectionWrapper
      position={position}
      condition={status === "MATCHING"}
    >
      <Button
        condition={teacherMatchType === "SPECIFY"}
        buttonFonts={"secondary"}
        buttonStyle={"red"}
        fill
        defaultSize={false}
        className={classNames("py-2", "px-3", "ml-auto")}
        onClick={rejectHandler}
      >
        <FontAwesomeIcon icon={faTimes} className={classNames("mr-1")} />
        婉拒
      </Button>
      <Button
        buttonFonts={"secondary"}
        buttonStyle={"primary"}
        fill
        defaultSize={false}
        className={classNames("py-2", "px-3", "ml-4")}
        onClick={acceptHandler}
      >
        <FontAwesomeIcon icon={faCheck} className={classNames("mr-1")} />
        我要回答
      </Button>
    </FunctionalSectionWrapper>
  );
};

interface AnsweredFunctionalSectionProps
  extends Pick<TeacherQuestionDetailDto, "status" | "hasChatMessage"> {
  id: number;
  position: "header" | "footer";
}

const AnsweredFunctionalSection: React.FC<AnsweredFunctionalSectionProps> = ({
  id,
  status,
  hasChatMessage,
  position,
}) => {
  return (
    <FunctionalSectionWrapper
      position={position}
      condition={status === "ANSWERED" && hasChatMessage}
    >
      <LinkButton
        to={ChatWithStudentRoute.getLinks({ questionId: id })}
        condition={hasChatMessage}
        buttonFonts={"secondary"}
        buttonStyle={"secondary"}
        fill
        defaultSize={false}
        className={classNames("py-2", "px-3", "ml-auto")}
      >
        <FontAwesomeIcon icon={faComment} className={classNames("mr-1")} />
        進入對話
      </LinkButton>
    </FunctionalSectionWrapper>
  );
};
