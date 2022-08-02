import React from "react";
import { useAsync } from "react-use";

import {
  Fonts,
  formatChecker,
  FullScreenModalContainer,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import { OptionDto } from "@api/teacher.api";
import CommentCard from "@Screen/QuestionScreen/Feature/CommentCard";

interface Props {
  subject?: OptionDto;
  subjectCategory?: OptionDto;
  open: boolean;
  closeHandler: () => void;
  questionId: number;
}

const CommentRecordModal: React.FC<Props> = ({
  open,
  closeHandler,
  questionId,
  subject,
  subjectCategory,
}) => {
  const { value } = useAsync(
    async () =>
      open
        ? await TeacherApi.getQuestionReview(questionId).then((res) => res.data)
        : null,
    [open]
  );

  if (formatChecker.isNotSet(value)) return null;

  return (
    <FullScreenModalContainer
      open={open}
      closeHandler={closeHandler}
      heading={"學生評價"}
      headerClassName={classNames("lg:hidden")}
    >
      <div className={classNames("p-6", "lg:px-20", "lg:py-12")}>
        <Fonts
          fontSize={"title"}
          className={classNames("hidden", "lg:block", "lg:mb-6")}
        >
          學生評價
        </Fonts>
        <CommentCard
          subject={subject}
          subjectCategory={subjectCategory}
          {...value}
        />
      </div>
    </FullScreenModalContainer>
  );
};

export default CommentRecordModal;
