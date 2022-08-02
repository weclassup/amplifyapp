import React from "react";

import {
  classMoment,
  Flexbox,
  Image,
  Label,
  SubjectLabel,
  UserProfilePicture,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { OptionDto, QuestionReviewForTeacherDto } from "@api/teacher.api";
import Badge from "@images/icons/cls-badge-color-img.svg";

interface Props extends Omit<QuestionReviewForTeacherDto, "id"> {
  subject?: OptionDto;
  subjectCategory?: OptionDto;
}
const CommentCard: React.FC<Props> = ({
  createdAt,
  score,
  student,
  comment,
  subject,
  subjectCategory,
  tags,
}) => {
  return (
    <div
      className={classNames(
        "border",
        "border-solid",
        "border-grey4",
        "rounded-sm",
        "p-3"
      )}
    >
      <Flexbox align={"center"} className={classNames("mb-3")}>
        <ul className={classNames("mr-2")}>
          <SubjectLabel>
            {subjectCategory?.name}
            {subject?.name}
          </SubjectLabel>
        </ul>
        <p className={classNames("text-grey2", "text-[0.75rem]", "mr-auto")}>
          {classMoment(createdAt).format("YYYY/MM/DD")}
        </p>
        <Image src={Badge} className={classNames("w-5", "h-5", "mr-1")} />
        <span className={classNames("text-red", "text-sm")}>{score}</span>
      </Flexbox>
      <Flexbox align={"start"}>
        <UserProfilePicture
          url={student?.profilePicture?.url}
          defaultSize={false}
          className={classNames("w-10", "h-10", "mr-4")}
        />
        <div>
          <p className={classNames("text-[0.75rem]", "font-medium")}>
            {student?.nickName}
          </p>
          <p className={classNames("text-[0.75rem]")}>{comment}</p>
          <ul className={classNames("mt-2")}>
            {tags.map((tag) => (
              <Label
                key={tag}
                className={classNames(
                  "text-grey2",
                  "border",
                  "border-solid",
                  "border-grey2",
                  "mr-2",
                  "rounded-sm"
                )}
              >
                {tag}
              </Label>
            ))}
          </ul>
        </div>
      </Flexbox>
    </div>
  );
};

export default CommentCard;
