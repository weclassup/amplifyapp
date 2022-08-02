import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  Flexbox,
  Fonts,
  formatChecker,
  FullScreenModalContainer,
  TextareaField,
  useTeacherAuth,
} from "@methodstudio/class-component-module";
import IntroductionSample from "@methodstudio/class-component-module/lib/cjs/components/AuthorizeUI/Page/Teacher/Register/IntroductionSample";
import classNames from "classnames";

import { TeacherApi } from "@/api";

const SelfIntroductionForm: React.FC<{ openForm: boolean; close: () => void }> =
  ({ openForm, close }) => {
    const [showSample, setShowSample] = useState<boolean>(false);

    const { userProfile, getUserProfile } = useTeacherAuth.useContainer();
    const { register, handleSubmit, watch, reset } =
      useForm<{ selfIntroduction: string }>();

    useEffect(() => {
      if (!openForm || formatChecker.isNotSet(userProfile?.activeProfile))
        return;
      reset({ selfIntroduction: userProfile?.activeProfile?.selfIntroduction });
    }, [openForm, userProfile]);

    const submitHandler: SubmitHandler<{ selfIntroduction: string }> = async ({
      selfIntroduction,
    }) => {
      if (formatChecker.isNotSet(userProfile?.activeProfile)) return;
      const { profilePicture, surName, givenName, nickName, gender, birthday } =
        userProfile!.activeProfile;
      await TeacherApi.updateActiveProfile({
        profilePictureId: profilePicture?.id,
        surName,
        givenName,
        nickName,
        gender,
        birthday,
        selfIntroduction,
      });
      await getUserProfile();
      close();
    };

    return (
      <React.Fragment>
        <IntroductionSample
          show={showSample}
          onClose={() => setShowSample(false)}
        />
        <FullScreenModalContainer
          open={openForm}
          closeHandler={close}
          heading={"編輯自我介紹"}
          headerClassName={classNames("md:items-end")}
        >
          <Flexbox
            as={"form"}
            onSubmit={handleSubmit(submitHandler)}
            direction={"col"}
            className={classNames("flex-1", "overflow-hidden")}
          >
            <div
              className={classNames(
                "pt-4 px-6 md:px-20 md:pt-10",
                "flex-1",
                "overflow-scroll"
              )}
            >
              <div className={classNames("mb-8 md:mb-10")}>
                <Fonts
                  fontSize="secondaryBody"
                  className={classNames("text-grey2", "mb-2")}
                >
                  請介紹自己的學歷與擅長科目，讓學生可以更快速了解你
                </Fonts>
                <TextareaField register={register("selfIntroduction")} />
                <Flexbox justify="between" className={classNames("mt-2")}>
                  <Fonts
                    className={classNames("text-grey2")}
                    fontSize="secondaryBody"
                  >
                    {watch("selfIntroduction")?.length || 0}/500
                  </Fonts>
                  <Fonts
                    as="button"
                    fontSize="secondaryBody"
                    type="button"
                    className={classNames("text-primary")}
                    onClick={() => setShowSample(true)}
                  >
                    查看介紹範例
                  </Fonts>
                </Flexbox>
              </div>
            </div>
            <div
              className={classNames(
                "pt-4 px-6 pb-10 md:px-20 md:pb-12 md:pt-6"
              )}
            >
              <Button type={"submit"} buttonStyle={"primary"} fill>
                儲存
              </Button>
            </div>
          </Flexbox>
        </FullScreenModalContainer>
      </React.Fragment>
    );
  };

export default SelfIntroductionForm;
