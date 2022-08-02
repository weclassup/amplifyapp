import React, { useState } from "react";

import { faComment } from "@fortawesome/pro-light-svg-icons";
import { faFileAlt, faStar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  classMoment,
  Div,
  FileListForCard,
  Flexbox,
  Fonts,
  formatChecker,
  LinkButton,
  MatchTypeLabel,
  QuestionStatusLabel,
  SubjectLabel,
  useGetQuestionExpiration,
  UserProfilePicture,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherQuestionDto } from "@api/teacher.api";
import {
  ChatWithStudentRecordRoute,
  ChatWithStudentRoute,
} from "@configs/route.configs";
import CommentRecordModal from "@Screen/QuestionScreen/Feature/CommentRecordModal";
import QuestionContent from "@Screen/QuestionScreen/Feature/QuestionContent";

const QuestionCard: React.FC<TeacherQuestionDto> = ({
  status,
  teacherMatchType,
  subjectCategory,
  subject,
  specifyTeacherExpireAt,
  matchExpireAt,
  teacherAnswerExpireAt,
  studentCompleteExpireAt,
  attachmentFiles,
  content,
  id,
  student,
  hasChatMessage,
  teacherId,
  reviewId,
  lastChatMessage,
}) => {
  const [openContent, setOpenContent] = useState<boolean>(false);

  const expireAt = useGetQuestionExpiration({
    status,
    matchExpireAt,
    teacherAnswerExpireAt,
    specifyTeacherExpireAt,
    studentCompleteExpireAt,
    teacherId,
    teacherMatchType,
  });

  return (
    <React.Fragment>
      <QuestionContent
        questionId={id}
        open={openContent}
        closeHandler={() => setOpenContent(false)}
      />
      <li
        className={classNames(
          "py-4",
          "px-6",
          "bg-white",
          "mb-4",
          "md:rounded-xl",
          "md:pointer-events-none"
        )}
        onClick={() => setOpenContent(true)}
      >
        <Flexbox as={"ul"} className={classNames("mb-2")}>
          <QuestionStatusLabel status={status} />
          <MatchTypeLabel type={teacherMatchType} />
          <SubjectLabel>
            {subjectCategory?.name}
            {subject?.name}
          </SubjectLabel>
        </Flexbox>
        <Div condition={formatChecker.isSet(expireAt)}>
          <p className={classNames("text-[0.75rem]", "text-grey2", "mb-3")}>
            {expireAt}
          </p>
        </Div>
        <Flexbox>
          <FileListForCard
            files={attachmentFiles}
            hasContent={formatChecker.isNotEmptyString(content)}
          />
          <Fonts
            fontSize={"secondaryBody"}
            className={classNames(
              "flex-1",
              "line-clamp-5",
              "break-all",
              "md:line-clamp-2",
              "md:mr-6"
            )}
          >
            {content}
          </Fonts>
          <Button
            buttonFonts={"secondary"}
            buttonStyle={"secondary"}
            defaultSize={false}
            type={"button"}
            onClick={() => setOpenContent(true)}
            className={classNames(
              "hidden",
              "md:block",
              "py-2",
              "px-3",
              "md:pointer-events-auto",
              "text-grey2"
            )}
          >
            <FontAwesomeIcon icon={faFileAlt} className={classNames("mr-2")} />
            查看問題
          </Button>
        </Flexbox>
        <AnsweredFunctionalSection
          status={status}
          id={id}
          hasChatMessage={hasChatMessage}
          student={student}
          lastChatMessage={lastChatMessage}
        />
        <CompleteFunctionalSection
          subject={subject}
          subjectCategory={subjectCategory}
          status={status}
          id={id}
          reviewId={reviewId}
          hasChatMessage={hasChatMessage}
        />
      </li>
    </React.Fragment>
  );
};

export default QuestionCard;

const AnsweredFunctionalSection: React.FC<
  Pick<
    TeacherQuestionDto,
    "status" | "id" | "student" | "hasChatMessage" | "lastChatMessage"
  >
> = ({ status, id, student, hasChatMessage, lastChatMessage }) => {
  if (status !== "ANSWERED") return null;

  return (
    <Flexbox
      align={"center"}
      className={classNames(
        "border-t",
        "border-solid",
        "border-grey4",
        "-mx-6",
        "px-6",
        "pt-[10px]",
        "mt-4"
      )}
    >
      <UserProfilePicture
        className={classNames("mr-2", "w-10", "h-10")}
        defaultSize={false}
        url={student?.profilePicture?.url}
        iconClassName={classNames("text-3xl")}
      />
      <div className={classNames("mr-auto")}>
        <Fonts fontSize={"primaryButton"} className={classNames()}>
          {student?.nickName}
        </Fonts>
        <Fonts
          condition={formatChecker.isSet(lastChatMessage)}
          fontSize={"tiny"}
          className={classNames("text-grey2")}
        >
          {lastChatMessage?.issuer === "TEACHER" ? "老師" : "學生"}：
          {formatChecker.isNotEmptyString(lastChatMessage?.content) &&
            lastChatMessage?.content}
          {formatChecker.isNotEmptyArray(lastChatMessage?.files) && "傳送檔案"}
          <span className={classNames("ml-4")}>
            -{classMoment(lastChatMessage?.createdAt).format("hh:mm")}
          </span>
        </Fonts>
      </div>
      <LinkButton
        buttonStyle={"secondary"}
        buttonFonts={"secondary"}
        condition={hasChatMessage}
        to={ChatWithStudentRoute.getLinks({ questionId: id })}
        className={classNames(
          "px-3",
          "py-2",
          "text-grey2",
          "md:pointer-events-auto"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon icon={faComment} className={classNames("mr-1")} />
        進入對話
      </LinkButton>
    </Flexbox>
  );
};

const CompleteFunctionalSection: React.FC<
  Pick<
    TeacherQuestionDto,
    | "status"
    | "id"
    | "subjectCategory"
    | "subject"
    | "reviewId"
    | "hasChatMessage"
  >
> = ({ status, id, subject, subjectCategory, reviewId, hasChatMessage }) => {
  if (status !== "COMPLETE") return null;

  return (
    <React.Fragment>
      <Flexbox
        align={"end"}
        className={classNames(
          "border-t",
          "border-solid",
          "border-grey4",
          "-mx-6",
          "px-6",
          "pt-3",
          "mt-4"
        )}
      >
        <CommentButton
          id={id}
          reviewId={reviewId}
          subjectCategory={subjectCategory}
          subject={subject}
        />
        <LinkButton
          to={ChatWithStudentRecordRoute.getLinks({ questionId: id })}
          condition={hasChatMessage}
          buttonFonts={"secondary"}
          buttonStyle={"secondary"}
          defaultSize={false}
          className={classNames(
            "py-2",
            "px-3",
            "ml-4",
            "md:pointer-events-auto"
          )}
        >
          <FontAwesomeIcon icon={faComment} className={classNames("mr-1")} />
          查看對話
        </LinkButton>
      </Flexbox>
    </React.Fragment>
  );
};

const CommentButton: React.FC<
  Pick<TeacherQuestionDto, "id" | "subject" | "subjectCategory" | "reviewId">
> = ({ id, subjectCategory, subject, reviewId }) => {
  const [openCommentRecord, setOpenCommentRecord] = useState<boolean>(false);
  const isReviewed = formatChecker.isSet(reviewId);

  const clickHandler: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setOpenCommentRecord(true);
  };

  return (
    <React.Fragment>
      <CommentRecordModal
        subject={subject}
        subjectCategory={subjectCategory}
        questionId={id}
        open={openCommentRecord}
        closeHandler={() => setOpenCommentRecord(false)}
      />
      <Button
        onClick={clickHandler}
        buttonFonts={"secondary"}
        buttonStyle={isReviewed ? "secondary" : "primary"}
        fill={!isReviewed}
        defaultSize={false}
        disabled={!isReviewed}
        className={classNames(
          "py-2",
          "px-3",
          "ml-auto",
          "md:pointer-events-auto"
        )}
      >
        <FontAwesomeIcon icon={faStar} className={classNames("mr-1")} />
        {isReviewed ? "查看" : "尚未"}評價
      </Button>
    </React.Fragment>
  );
};
