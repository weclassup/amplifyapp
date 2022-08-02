import React, { useCallback, useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

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
  useCounter,
  useTeacherAuth,
  validator,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import SubmitSuccess from "@images/icons/cls-question-success-img.svg";

interface UpdateEmailFormValues {
  email: string;
  pwd: string;
  code: string;
  validationToken: string;
}

type UpdateEmailFormPage = "authentic" | "email" | "confirm" | "success";
const UPDATE_EMAIL_FORM_TITLE: Record<UpdateEmailFormPage, string> = {
  authentic: "驗證身份",
  email: "變更電子郵件",
  confirm: "變更電子郵件",
  success: "",
};
const UpdateEmailWizardForm: React.FC<{ open: boolean; close: () => void }> = ({
  open,
  close,
}) => {
  const [page, setPage] = useState<UpdateEmailFormPage>("success");

  const method = useForm<UpdateEmailFormValues>({ mode: "all" });

  useEffect(() => {
    if (!open) {
      setPage("authentic");
      method.reset();
    }
  }, [open]);

  if (page === "success") return <Success close={close} />;

  return (
    <FormProvider {...method}>
      <FullScreenModalContainer
        open={open}
        closeHandler={close}
        heading={UPDATE_EMAIL_FORM_TITLE[page]}
      >
        <EmailWizardForm page={page} goToPage={(page) => setPage(page)} />
      </FullScreenModalContainer>
    </FormProvider>
  );
};

export default UpdateEmailWizardForm;

const EmailWizardForm: React.FC<{
  page: UpdateEmailFormPage;
  goToPage: (page: UpdateEmailFormPage) => void;
}> = ({ page, goToPage }) => {
  switch (page) {
    case "authentic":
      return <AuthenticateForm goToPage={goToPage} />;
    case "email":
      return <NewEmailForm goToPage={goToPage} />;
    case "confirm":
      return <ConfirmEmailForm goToPage={goToPage} />;
    default:
      return null;
  }
};

const AuthenticateForm: React.FC<{
  goToPage: (page: UpdateEmailFormPage) => void;
}> = ({ goToPage }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useFormContext<UpdateEmailFormValues>();

  const submitHandler = useCallback<SubmitHandler<UpdateEmailFormValues>>(
    async ({ pwd }) => {
      try {
        await TeacherApi.checkPwd({ pwd });
        goToPage("email");
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

  return (
    <React.Fragment>
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
            className={classNames("mb-8 md:mb-10", "text-grey2")}
          >
            若要繼續進行操作，請先輸入目前密碼驗證身份
          </Fonts>
          <div className={classNames("mb-2 md:mb-4")}>
            <FormLabel>目前密碼</FormLabel>
            <TextField
              type={"password"}
              autoComplete={"new-password"}
              error={formatChecker.isSet(errors["pwd"])}
              placeholder="目前密碼"
              register={register("pwd", {
                required: validator.required,
                validate: validator.passwordValidate,
              })}
            />
            <FormErrorMessage errors={errors} name={"pwd"} />
          </div>
        </div>
        <div
          className={classNames("pt-4 px-6 pb-10 md:px-20 md:pb-12 md:pt-6")}
        >
          <Button type={"submit"} buttonStyle={"primary"} fill>
            繼續
          </Button>
        </div>
      </Flexbox>
    </React.Fragment>
  );
};

const NewEmailForm: React.FC<{
  goToPage: (page: UpdateEmailFormPage) => void;
}> = ({ goToPage }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    setValue,
  } = useFormContext<UpdateEmailFormValues>();

  const submitHandler = useCallback<SubmitHandler<UpdateEmailFormValues>>(
    async ({ email }) => {
      try {
        const {
          data: { validationToken },
        } = await TeacherApi.newEmailVerify({ email });
        setValue("validationToken", validationToken);
        goToPage("confirm");
      } catch (e: any) {
        const message = errorMessage.getErrorMessageFromResponse(e);
        if (message) {
          setError("email", { message });
        } else {
          setError("email", {
            message: "電子郵件帳號無法新增，請通知管理人員。",
          });
        }
      }
    },
    []
  );

  return (
    <React.Fragment>
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
            className={classNames("mb-8 md:mb-10", "text-grey2")}
          >
            請輸入新的電子郵件，我們會寄出驗證信
          </Fonts>
          <div className={classNames("mb-2 md:mb-4")}>
            <FormLabel>新電子郵件帳號</FormLabel>
            <TextField
              error={formatChecker.isSet(errors["email"])}
              placeholder="新電子郵件帳號"
              register={register("email", {
                required: validator.required,
                validate: validator.emailValidate,
              })}
            />
            <FormErrorMessage errors={errors} name={"email"} />
          </div>
        </div>
        <div
          className={classNames("pt-4 px-6 pb-10 md:px-20 md:pb-12 md:pt-6")}
        >
          <Button type={"submit"} buttonStyle={"primary"} fill>
            寄出驗證信
          </Button>
        </div>
      </Flexbox>
    </React.Fragment>
  );
};

const ConfirmEmailForm: React.FC<{
  goToPage: (page: UpdateEmailFormPage) => void;
}> = ({ goToPage }) => {
  const { manualUpdateProfile } = useTeacherAuth.useContainer();
  const { counter, restart } = useCounter(30);
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setValue,
    setError,
    watch,
  } = useFormContext<UpdateEmailFormValues>();

  const submitHandler = useCallback<SubmitHandler<UpdateEmailFormValues>>(
    async ({ code, validationToken }) => {
      try {
        const { data } = await TeacherApi.commitTeacherEmailUpdate({
          code,
          validationToken,
        });
        manualUpdateProfile(data);
        goToPage("success");
      } catch (e: any) {
        const message = errorMessage.getErrorMessageFromResponse(e);
        if (message) {
          setError("code", { message });
        } else {
          setError("code", {
            message: "驗證碼出現錯誤，請通知管理人員。",
          });
        }
      }
    },
    []
  );

  const resendHandler = useCallback(async () => {
    const email = getValues("email");
    const {
      data: { validationToken },
    } = await TeacherApi.newEmailVerify({ email });
    setValue("validationToken", validationToken);
    restart();
  }, []);

  return (
    <React.Fragment>
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
            className={classNames("mb-8 md:mb-10", "text-grey2")}
          >
            驗證信已寄送至新信箱{" "}
            <span className={classNames("text-primary")}>{watch("email")}</span>{" "}
            請前往信箱查看並填入 6 位數驗證碼
            若未收到，請重新發送並留意垃圾信件匣
          </Fonts>
          <div className={classNames("mb-2 md:mb-4")}>
            <FormLabel
              className={classNames("flex justify-between items-center")}
            >
              6 位數驗證碼
              <button
                type={"button"}
                disabled={counter !== 0}
                onClick={resendHandler}
                className={classNames("text-primary", "disabled:text-grey2")}
              >
                {counter === 0 ? (
                  "重新發送"
                ) : (
                  <>
                    <span className={classNames("text-primary")}>
                      {counter}
                    </span>
                    {` 秒後重新發送`}
                  </>
                )}
              </button>
            </FormLabel>
            <TextField
              error={formatChecker.isSet(errors["code"])}
              placeholder=" 6 位數驗證碼"
              register={register("code", {
                required: validator.required,
                validate: validator.codeValidate,
              })}
            />
            <FormErrorMessage errors={errors} name={"code"} />
          </div>
        </div>
        <div
          className={classNames("pt-4 px-6 pb-10 md:px-20 md:pb-12 md:pt-6")}
        >
          <Button type={"submit"} buttonStyle={"primary"} fill>
            確定變更
          </Button>
        </div>
      </Flexbox>
    </React.Fragment>
  );
};

const Success: React.FC<{ close: () => void }> = ({ close }) => {
  useEffect(() => {
    const id = setTimeout(close, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <React.Fragment>
      <img
        src={SubmitSuccess}
        alt={"preserve"}
        className={classNames("hidden")}
      />
      <IsOkModal
        isOk={true}
        success={{ image: SubmitSuccess, text: "變更成功" }}
      />
    </React.Fragment>
  );
};
