import React, { useState } from "react";
import { DeepPartial } from "react-hook-form";

import {
  Flexbox,
  Fonts,
  formatChecker,
  ScreenContainer,
  UList,
  usePaginationFn,
} from "@methodstudio/class-component-module";
import classNames from "classnames";
import merge from "lodash.merge";

import { TeacherApi } from "@/api";

import QuestionCard from "@Screen/QuestionScreen/Feature/QuestionCard";

const NewQuestionScreen = () => {
  const [hasSpecify, setHasSpecify] = useState<boolean>(true);
  const {
    data: { value, loading },
    callback,
  } = usePaginationFn(
    async (options: DeepPartial<SearchTeacherQuestionOption> = {}) => {
      const { data: specifyToMe } = await TeacherApi.getQuestionsSpecifyToMe();

      if (formatChecker.isNotEmptyArray(specifyToMe)) {
        setHasSpecify(true);
        return {
          atPage: 1,
          items: specifyToMe,
          totalCount: specifyToMe.length,
          totalPages: 1,
        };
      } else {
        setHasSpecify(false);
        const { data: matching } = await TeacherApi.searchQuestions(
          merge<
            {},
            SearchTeacherQuestionOption,
            DeepPartial<SearchTeacherQuestionOption>
          >(
            {},
            {
              paging: { page: 1, pageSize: 10 },
              category: "ANSWERABLE",
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
        return matching;
      }
    },
    []
  );

  return (
    <ScreenContainer heading={"新問題"}>
      <div className={classNames("md:px-10")}>
        <UList
          data={value}
          renderItem={QuestionCard}
          renderEmpty={EmptyPlaceholder}
          keyExtractor={(item) => `${item.id}`}
          loading={loading}
          onEndReached={callback}
        />
        <Flexbox
          condition={hasSpecify}
          align={"center"}
          justify={"center"}
          className={classNames("px-6", "mt-5", "lg:px-0")}
        >
          <span
            className={classNames(
              "h-px",
              "flex-1",
              "bg-primary",
              "hidden",
              "lg:block"
            )}
          />
          <Fonts
            className={classNames("text-primary", "text-center", "lg:mx-6")}
          >
            請優先處理指定回答題目，方能回答新問題。
          </Fonts>
          <span
            className={classNames(
              "h-px",
              "flex-1",
              "bg-primary",
              "hidden",
              "lg:block"
            )}
          />
        </Flexbox>
      </div>
    </ScreenContainer>
  );
};

export default NewQuestionScreen;

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
        目前沒有新的問題哦！
      </p>
    </Flexbox>
  );
};
