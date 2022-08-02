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
  phone: string;
  code: string;
  validationToken: string;
}

type UpdateEmailFormPage = "issue" | "confirm" | "success";
const UPDATE_EMAIL_FORM_TITLE: Record<UpdateEmailFormPage, string> = {
  issue: "變更手機號碼",
  confirm: "驗證手機",
  success: "",
};
const UpdatePhoneWizardForm: React.FC<{ open: boolean; close: () => void }> = ({
  open,
  close,
}) => {
  const [page, setPage] = useState<UpdateEmailFormPage>("success");

  const method = useForm<UpdateEmailFormValues>({ mode: "all" });

  useEffect(() => {
    if (!open) {
      setPage("issue");
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

export default UpdatePhoneWizardForm;

const EmailWizardForm: React.FC<{
  page: UpdateEmailFormPage;
  goToPage: (page: UpdateEmailFormPage) => void;
}> = ({ page, goToPage }) => {
  switch (page) {
    case "issue":
      return <IssueForm goToPage={goToPage} />;
    case "confirm":
      return <ConfirmForm goToPage={goToPage} />;
    default:
      return null;
  }
};

const IssueForm: React.FC<{
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
    async ({ phone }) => {
      try {
        const {
          data: { validationToken },
        } = await TeacherApi.newPhoneVerify({ phone });
        setValue("validationToken", validationToken);
        goToPage("confirm");
      } catch (e: any) {
        const message = errorMessage.getErrorMessageFromResponse(e);
        if (message) {
          setError("phone", { message });
        } else {
          setError("phone", { message: "手機號碼無法驗證，請通知管理人員。" });
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
            請輸入新的手機號碼，我們會寄出驗證簡訊
          </Fonts>
          <div className={classNames("mb-2 md:mb-4")}>
            <FormLabel>新手機號碼</FormLabel>
            <TextField
              error={formatChecker.isSet(errors["phone"])}
              placeholder="新手機號碼"
              register={register("phone", {
                required: validator.required,
                validate: validator.phoneValidate,
              })}
            />
            <FormErrorMessage errors={errors} name={"phone"} />
          </div>
        </div>
        <div
          className={classNames("pt-4 px-6 pb-10 md:px-20 md:pb-12 md:pt-6")}
        >
          <Button type={"submit"} buttonStyle={"primary"} fill>
            寄出驗證簡訊
          </Button>
        </div>
      </Flexbox>
    </React.Fragment>
  );
};

const ConfirmForm: React.FC<{
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
        const { data } = await TeacherApi.commitTeacherPhoneUpdate({
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
    const phone = getValues("phone");
    const {
      data: { validationToken },
    } = await TeacherApi.newPhoneVerify({ phone });
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
            驗證簡訊已寄送至 0912345678
            <span className={classNames("text-primary")}>{watch("phone")}</span>
            <br />
            請查看手機簡訊並填入 6 位數驗證碼
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
            送出
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
