import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  errorMessage,
  Flexbox,
  Fonts,
  formatChecker,
  FormErrorMessage,
  FormLabel,
  FullScreenModalContainer,
  IsOkModal,
  TextField,
  useIsOk,
  useTeacherAuth,
  validator,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import SubmitSuccess from "@images/icons/cls-question-success-img.svg";

interface UpdatePasswordFormValues {
  confirmPwd: string;
  pwd: string;
}

const UpdatePasswordWizardForm: React.FC<{ open: boolean; close: () => void }> =
  ({ open, close }) => {
    const { signOutHandler } = useTeacherAuth.useContainer();
    const { isOk, resultHandler } = useIsOk();
    const {
      handleSubmit,
      formState: { errors },
      register,
      setError,
      watch,
    } = useForm<UpdatePasswordFormValues>({
      mode: "all",
      shouldUnregister: true,
    });

    const submitHandler = useCallback<SubmitHandler<UpdatePasswordFormValues>>(
      async ({ pwd }) => {
        try {
          await TeacherApi.changePwd({ pwd });
          await resultHandler(true);
          close();
          signOutHandler();
        } catch (e: any) {
          const message = errorMessage.getErrorMessageFromResponse(e);
          if (message) {
            setError("pwd", { message });
          } else {
            setError("pwd", { message: "密碼無法驗證，請通知管理人員。" });
          }
        }
      },
      []
    );

    if (isOk)
      return (
        <React.Fragment>
          <IsOkModal
            isOk={isOk}
            success={{ image: SubmitSuccess, text: "變更成功" }}
          />
        </React.Fragment>
      );

    return (
      <FullScreenModalContainer
        open={open}
        closeHandler={close}
        heading={"變更密碼"}
      >
        <Flexbox
          as={"form"}
          onSubmit={handleSubmit(submitHandler)}
          direction={"col"}
          className={classNames("flex-1", "overflow-hidden")}
        >
          <div
            className={classNames(
              "pt-4 px-6 md:px-20",
              "flex-1",
              "overflow-scroll"
            )}
          >
            <Fonts
              fontSize={"secondaryBody"}
              className={classNames("mb-8 md:mb-10", "text-grey2")}
            >
              密碼應包含英文與數字，介於 8 ~ 20 位數
            </Fonts>
            <div className={classNames("mb-6 md:mb-8")}>
              <FormLabel>新密碼</FormLabel>
              <TextField
                type={"password"}
                autoComplete={"new-password"}
                error={formatChecker.isSet(errors["pwd"])}
                placeholder="新密碼"
                register={register("pwd", {
                  required: validator.required,
                  validate: validator.passwordValidate,
                })}
              />
              <FormErrorMessage errors={errors} name={"pwd"} />
            </div>
            <div className={classNames("mb-6 md:mb-8")}>
              <FormLabel>確認新密碼</FormLabel>
              <TextField
                type={"password"}
                autoComplete={"new-password"}
                error={formatChecker.isSet(errors["confirmPwd"])}
                placeholder="確認新密碼"
                register={register("confirmPwd", {
                  required: validator.required,
                  validate: (value) =>
                    value === watch("pwd") ? undefined : "與密碼不一致",
                })}
              />
              <FormErrorMessage errors={errors} name={"confirmPwd"} />
            </div>
          </div>
          <div
            className={classNames("pt-4 px-6 pb-10 md:px-20 md:pb-12 md:pt-6")}
          >
            <Button type={"submit"} buttonStyle={"primary"} fill>
              變更密碼
            </Button>
          </div>
        </Flexbox>
      </FullScreenModalContainer>
    );
  };

export default UpdatePasswordWizardForm;
