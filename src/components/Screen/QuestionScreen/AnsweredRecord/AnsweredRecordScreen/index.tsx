import React from "react";
import { DeepPartial } from "react-hook-form";

import {
  Flexbox,
  RouteWithSubRoutesRenderProps,
  ScreenContainer,
  UList,
  usePaginationFn,
} from "@methodstudio/class-component-module";
import classNames from "classnames";
import { merge } from "lodash";

import { TeacherApi } from "@/api";

import QuestionCard from "@Screen/QuestionScreen/Feature/QuestionCard";

const AnsweredRecordPage: React.FC<RouteWithSubRoutesRenderProps> = ({
  title,
}) => {
  const {
    data: { value, loading },
    callback,
  } = usePaginationFn(
    async (options: DeepPartial<SearchTeacherQuestionOption> = {}) => {
      const { data } = await TeacherApi.searchQuestions(
        merge<
          {},
          SearchTeacherQuestionOption,
          DeepPartial<SearchTeacherQuestionOption>
        >(
          {},
          {
            category: "COMPLETE",
            paging: { page: 1, pageSize: 10 },
            sorting: {
              sort: "DESC",
              sortFields: [
                "matchExpireAt",
                "specifyTeacherExpireAt",
                "teacherAnswerExpireAt",
                "studentCompleteExpireAt",
              ],
            },
            sorts: [],
          },
          options
        )
      );
      return data;
    },
    []
  );

  return (
    <ScreenContainer heading={title}>
      <div className={classNames("md:px-10")}>
        <UList
          data={value}
          renderItem={QuestionCard}
          renderEmpty={EmptyPlaceholder}
          keyExtractor={(item) => `${item.id}`}
          loading={loading}
          onEndReached={callback}
        />
      </div>
    </ScreenContainer>
  );
};

export default AnsweredRecordPage;

const EmptyPlaceholder: React.FC = () => {
  return (
    <Flexbox
      direction={"col"}
      align={"center"}
      justify={"center"}
      className={classNames(
        "bg-white",
        "py-16",
        "md:rounded-xl",
        "lg:py-[1.875rem]"
      )}
    >
      <p className={classNames("text-grey1", "text-base")}>
        目前沒有解答中的問題哦！
      </p>
    </Flexbox>
  );
};
