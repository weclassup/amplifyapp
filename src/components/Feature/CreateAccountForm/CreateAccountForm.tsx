import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  DocumentField,
  Fonts,
  FormErrorMessage,
  FormLabel,
  TextField,
  validator,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { FileDto, TeacherSaveWithdrawAccountReq } from "@api/teacher.api";

export interface WithdrawAccountFormValues
  extends Omit<TeacherSaveWithdrawAccountReq, "bankAccountPictureId"> {
  bankAccountPicture: File | FileDto;
}

interface CreateAccountFormProps {
  onSubmit: SubmitHandler<WithdrawAccountFormValues>;
  buttonText: string;
  className?: string;
  notAllowSubmit?: boolean;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  buttonText,
  onSubmit,
  className,
  notAllowSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WithdrawAccountFormValues>({
    mode: "all",
    shouldUnregister: true,
  });

  return (
    <form className={classNames(className)} onSubmit={handleSubmit(onSubmit)}>
      <Fonts
        fontSize={"secondaryBody"}
        className={classNames("mb-6 md:mb-10", "text-grey2")}
      >
        此為線上解題報酬帳戶，請您確實填寫，保障您的權益。感謝您加入克雷斯的教學行列，讓我們變得更好。
      </Fonts>
      <div className={classNames("mb-4 md:mb-6")}>
        <FormLabel>銀行名稱</FormLabel>
        <TextField
          register={register("bankName", { required: validator.required })}
        />
        <FormErrorMessage errors={errors} name={"bankName"} />
      </div>
      <div className={classNames("mb-4 md:mb-6")}>
        <FormLabel>分行名稱</FormLabel>
        <TextField
          register={register("bankBranchName", {
            required: validator.required,
          })}
        />
        <FormErrorMessage errors={errors} name={"bankBranchName"} />
      </div>
      <div className={classNames("mb-4 md:mb-6")}>
        <FormLabel>銀行帳號</FormLabel>
        <TextField
          register={register("bankAccount", { required: validator.required })}
        />
        <FormErrorMessage errors={errors} name={"bankAccount"} />
      </div>
      <div className={classNames("mb-4 md:mb-6")}>
        <FormLabel>帳戶持有人姓名</FormLabel>
        <TextField
          register={register("bankAccountName", {
            required: validator.required,
          })}
        />
        <FormErrorMessage errors={errors} name={"bankAccountName"} />
      </div>
      <div className={classNames("mb-8 md:mb-10")}>
        <FormLabel>存摺封面</FormLabel>
        <Controller
          control={control}
          name={"bankAccountPicture"}
          rules={{ required: validator.required }}
          render={({ field: { ref, ...field } }) => (
            <DocumentField customRef={ref} {...field} />
          )}
        />
        <FormErrorMessage errors={errors} name={"bankAccountPicture"} />
      </div>
      <Button
        buttonStyle={"primary"}
        type={"submit"}
        disabled={!isValid || notAllowSubmit}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default CreateAccountForm;
