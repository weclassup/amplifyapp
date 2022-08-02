import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  BirthdayField,
  Button,
  classMoment,
  Dropdown,
  FileUploader,
  Flexbox,
  Fonts,
  formatChecker,
  FormErrorMessage,
  FormLabel,
  FullScreenModalContainer,
  momentHelper,
  PersonalPhotoField,
  S3File,
  TextField,
  useTeacherAuth,
  validator,
} from "@methodstudio/class-component-module";
import PictureSample from "@methodstudio/class-component-module/lib/esm/components/AuthorizeUI/Page/Teacher/Register/PictureSample";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import { TeacherUpdateActiveProfileReq } from "@api/teacher.api";
import { genderOptions } from "@static/static.options";

interface ProfileFormValues
  extends Omit<
    TeacherUpdateActiveProfileReq,
    "profilePictureId" | "birthday" | "selfIntroduction"
  > {
  profilePicture: File | S3File;
  birthYear: string;
  birthMonth: string;
  birthDate: string;
}
const ProfileSettingForm: React.FC<{ openForm: boolean; close: () => void }> =
  ({ openForm, close }) => {
    const [showPictureSample, setShowPictureSample] = useState<boolean>(false);

    const { userProfile, getUserProfile } = useTeacherAuth.useContainer();

    const {
      reset,
      control,
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<ProfileFormValues>({ mode: "all" });

    const watchBirthYear = watch("birthYear");
    const watchBirthMonth = watch("birthMonth");

    useEffect(() => {
      if (formatChecker.isNotSet(userProfile?.activeProfile) || !openForm)
        return;
      const { activeProfile } = userProfile!;

      const birthdayMoment = classMoment(activeProfile?.birthday);

      reset({
        profilePicture: activeProfile?.profilePicture,
        surName: activeProfile?.surName,
        givenName: activeProfile?.givenName,
        nickName: activeProfile?.nickName,
        gender: activeProfile?.gender,
        birthYear: String(birthdayMoment.year()),
        birthMonth: String(birthdayMoment.month() + 1),
        birthDate: String(birthdayMoment.date()),
      });
    }, [userProfile, openForm]);

    const submitHandler: SubmitHandler<ProfileFormValues> = async ({
      surName,
      givenName,
      nickName,
      gender,
      profilePicture,
      birthYear,
      birthMonth,
      birthDate,
    }) => {
      let profilePictureId = await new FileUploader("teacher")
        .getResult(profilePicture)
        .then((res) => res?.id);
      if (formatChecker.isNotSet(profilePictureId)) {
        profilePictureId = userProfile?.activeProfile?.profilePicture?.id;
      }

      const birthdayMoment = classMoment().set({
        year: Number(birthYear),
        month: Number(birthMonth) - 1,
        date: Number(birthDate),
      });
      const birthday = momentHelper.getUTCFormat(
        momentHelper.getCleanMoment(birthdayMoment)
      );

      await TeacherApi.updateActiveProfile({
        profilePictureId,
        surName,
        givenName,
        nickName,
        gender,
        birthday,
        selfIntroduction: userProfile?.activeProfile?.selfIntroduction || "",
      });
      await getUserProfile();
      close();
    };

    return (
      <React.Fragment>
        <PictureSample
          show={showPictureSample}
          onClose={() => setShowPictureSample(false)}
        />
        <FullScreenModalContainer
          open={openForm}
          closeHandler={close}
          heading={"編輯基本資訊"}
          headerClassName={classNames("md:items-end")}
          tailingHeading={
            <Fonts
              fontSize={"secondaryBody"}
              className={classNames("ml-auto", "text-red", "hidden md:block")}
            >
              *為必填欄位
            </Fonts>
          }
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
              <Fonts
                fontSize={"secondaryBody"}
                className={classNames(
                  "md:hidden",
                  "mb-4",
                  "text-right text-red"
                )}
              >
                *為必填欄位
              </Fonts>
              <div className={classNames("mb-8 md:mb-10")}>
                <FormLabel>個人照片</FormLabel>
                <Controller
                  control={control}
                  name="profilePicture"
                  render={({ field: { ref, ...field } }) => (
                    <PersonalPhotoField
                      buttonType="primary"
                      customRef={ref}
                      {...field}
                    />
                  )}
                />
                <Fonts
                  fontSize="secondaryBody"
                  className={classNames("text-grey2", "mt-4")}
                >
                  大頭貼是學生對你的第一印象，如能上傳正面清晰照，有助得到更多學生信任唷！
                  <button
                    onClick={() => setShowPictureSample(true)}
                    type="button"
                    className={classNames("text-primary")}
                  >
                    查看照片範例
                  </button>
                </Fonts>
              </div>
              <Flexbox
                className={classNames("mb-4 lg:mb-6", "gap-x-4")}
                align={"start"}
              >
                <div>
                  <FormLabel required>姓氏</FormLabel>
                  <TextField
                    error={formatChecker.isSet(errors["surName"])}
                    placeholder="姓氏"
                    register={register("surName", {
                      required: validator.required,
                    })}
                  />
                  <FormErrorMessage errors={errors} name="surName" />
                </div>
                <div>
                  <FormLabel required>名字</FormLabel>
                  <TextField
                    error={formatChecker.isSet(errors["givenName"])}
                    placeholder="名字"
                    register={register("givenName", {
                      required: validator.required,
                    })}
                  />
                  <FormErrorMessage errors={errors} name={"givenName"} />
                </div>
              </Flexbox>
              <div className={classNames("mb-4 lg:mb-6")}>
                <FormLabel required>暱稱</FormLabel>
                <TextField
                  error={formatChecker.isSet(errors["nickName"])}
                  placeholder="暱稱"
                  register={register("nickName", {
                    required: validator.required,
                  })}
                />
                <FormErrorMessage errors={errors} name={"nickName"} />
              </div>
              <div className={classNames("mb-4 lg:mb-6")}>
                <FormLabel required>性別</FormLabel>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { ref, ...field } }) => (
                    <Dropdown options={genderOptions} {...field} />
                  )}
                />
                <FormErrorMessage errors={errors} name="gender" />
              </div>
              <div className={classNames("mb-4", "lg:mb-6")}>
                <FormLabel required>生日</FormLabel>
                <BirthdayField
                  birthYearRegister={register("birthYear", {
                    required: validator.required,
                    validate: validator.birthYearValidate,
                  })}
                  birthMonthRegister={register("birthMonth", {
                    required: validator.required,
                    validate: validator.birthMonthValidate,
                  })}
                  birthDateRegister={register("birthDate", {
                    required: validator.required,
                    validate: validator.birthDateValidate(
                      watchBirthYear,
                      watchBirthMonth
                    ),
                  })}
                />
                {errors["birthYear"] ? (
                  <FormErrorMessage errors={errors} name="birthYear" />
                ) : errors["birthMonth"] ? (
                  <FormErrorMessage errors={errors} name="birthMonth" />
                ) : errors["birthDate"] ? (
                  <FormErrorMessage errors={errors} name="birthDate" />
                ) : null}
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

export default ProfileSettingForm;
