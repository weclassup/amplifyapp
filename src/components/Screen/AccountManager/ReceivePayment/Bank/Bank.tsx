import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useAsyncFn } from "react-use";

import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  axiosHelper,
  Button,
  ConditionalFragment,
  FileUploader,
  Flexbox,
  Fonts,
  formatChecker,
  FullScreenModalContainer,
  useAsyncPrompt,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { TeacherApi } from "@/api";

import { TeacherWithdrawAccountDto } from "@api/teacher.api";
import CreateAccountForm from "@Feature/CreateAccountForm";
import { WithdrawAccountFormValues } from "@Feature/CreateAccountForm/CreateAccountForm";

const Bank = () => {
  const [startCreateWithdrawAccount, setStartCreateWithdrawAccount] =
    useState<boolean>(false);

  const [{ value }, refetch] = useAsyncFn(
    axiosHelper.getDataFromAxiosRespond(
      TeacherApi.getWithdrawAccounts,
      (data) =>
        data.sort((a, b) =>
          a.defaultForWithdraw === b.defaultForWithdraw
            ? 0
            : a.defaultForWithdraw
            ? -1
            : 1
        )
    ),
    []
  );
  const { showAsyncPrompt, prompt, handleConfirm, handleClose } =
    useAsyncPrompt<true, false>();

  useEffect(() => {
    refetch();
  }, []);

  const onDeleteClick = useCallback(async (id: number) => {
    const confirmDelete = await prompt();
    if (!confirmDelete) return;
    await TeacherApi.deleteWithdrawAccount(id);
    await refetch();
  }, []);

  const onSetDefaultClick = useCallback(async (id: number) => {
    await TeacherApi.setWithdrawAccountToDefault(id);
    await refetch();
  }, []);

  return (
    <React.Fragment>
      <CreateWithdrawAccountModal
        isOpen={startCreateWithdrawAccount}
        onClose={() => setStartCreateWithdrawAccount(false)}
        refetch={refetch}
      />
      <Alert
        alert={showAsyncPrompt}
        title={"確定刪除帳戶？"}
        content={"刪除帳戶後即無法復原。"}
        confirmHandler={() => handleConfirm(true)}
        cancelHandler={() => handleClose(false)}
      />
      <div className={classNames("py-4")}>
        <Flexbox
          direction={"col"}
          className={classNames("bg-white md:rounded-xl")}
        >
          <Flexbox
            condition={
              formatChecker.isNotSet(value) || formatChecker.isEmptyArray(value)
            }
            className={classNames("py-[1.875rem]")}
            align={"center"}
            justify={"center"}
          >
            <Fonts className={classNames("text-center")}>
              還沒有新增任何銀行帳戶哦！
            </Fonts>
          </Flexbox>
          <ConditionalFragment condition={formatChecker.isNotEmptyArray(value)}>
            <ul className={classNames("divide-y divide-grey4")}>
              {value?.map((account) => (
                <WithdrawAccountCard
                  key={account.id}
                  {...account}
                  onDeleteClick={onDeleteClick}
                  onSetDefaultClick={onSetDefaultClick}
                />
              ))}
            </ul>
          </ConditionalFragment>
          <Flexbox
            align={"center"}
            justify={"center"}
            className={classNames(
              "md:order-first",
              "px-5 py-6 md:px-6",
              "border-t md:border-t-0 md:border-b border-solid border-grey4"
            )}
          >
            <Fonts
              fontSize={"title"}
              className={classNames("hidden md:block", "mr-auto")}
            >
              銀行帳戶列表
            </Fonts>
            <Button
              type={"button"}
              buttonStyle={"primary"}
              fill={false}
              className={classNames("h-9 w-full md:w-[9rem]")}
              defaultSize={false}
              onClick={() => setStartCreateWithdrawAccount(true)}
            >
              <FontAwesomeIcon icon={faPlus} className={classNames("mr-2")} />
              新增銀行帳戶
            </Button>
          </Flexbox>
        </Flexbox>
      </div>
    </React.Fragment>
  );
};

export default Bank;

const CreateWithdrawAccountModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<Array<TeacherWithdrawAccountDto>>;
}> = ({ onClose, isOpen, refetch }) => {
  const onSubmit = useCallback<SubmitHandler<WithdrawAccountFormValues>>(
    async ({
      bankAccountPicture,
      bankAccount,
      bankAccountName,
      bankName,
      bankBranchName,
    }) => {
      const bankAccountPictureId = await new FileUploader("teacher")
        .getResult(bankAccountPicture)
        .then((res) => res?.id);
      if (!bankAccountPictureId) return;
      await TeacherApi.createWithdrawAccount({
        bankAccount,
        bankAccountName,
        bankAccountPictureId,
        bankBranchName,
        bankName,
      });
      await refetch();
      onClose();
    },
    []
  );

  return (
    <FullScreenModalContainer
      open={isOpen}
      closeHandler={onClose}
      heading={"新增銀行帳戶"}
    >
      <CreateAccountForm
        onSubmit={onSubmit}
        buttonText={"新增"}
        className={classNames("px-6 pt-4 pb-10", "overflow-scroll")}
      />
    </FullScreenModalContainer>
  );
};

interface WithdrawAccountCardProps extends TeacherWithdrawAccountDto {
  onDeleteClick: (id: number) => void;
  onSetDefaultClick: (id: number) => void;
}

const WithdrawAccountCard: React.FC<WithdrawAccountCardProps> = ({
  bankAccount,
  bankName,
  defaultForWithdraw,
  onDeleteClick,
  onSetDefaultClick,
  id,
}) => {
  return (
    <li className={classNames("md:flex", "py-3 px-6 md:py-[1.125rem]")}>
      <Flexbox
        align={"center"}
        className={classNames("mb-1 md:mb-0 md:mr-auto md:flex-1")}
      >
        <Fonts
          as={"span"}
          fontSize={"secondaryBody"}
          className={classNames(
            "px-2 py-1 mr-2 md:mr-4",
            "text-grey2",
            "border border-solid border-grey2 rounded-xs"
          )}
          condition={defaultForWithdraw}
        >
          預設
        </Fonts>
        <Fonts className={classNames("md:hidden", "mr-auto")}>
          *{bankAccount.slice(bankAccount.length - 5)}
        </Fonts>
        <Fonts className={classNames("hidden md:block", "mr-auto")}>
          {bankName || "None"}
        </Fonts>
        <Fonts
          as={"button"}
          type={"button"}
          fontSize={"primaryButton"}
          className={classNames("text-red")}
          onClick={() => onDeleteClick(id)}
        >
          刪除
        </Fonts>
      </Flexbox>
      <Flexbox align={"center"} className={classNames()}>
        <Fonts className={classNames("md:hidden", "mr-auto")}>
          {bankName || "None"}
        </Fonts>
        <Fonts
          as={"button"}
          type={"button"}
          fontSize={"primaryButton"}
          className={classNames("md:ml-6", "text-grey2")}
          condition={!defaultForWithdraw}
          onClick={() => onSetDefaultClick(id)}
        >
          設為預設
        </Fonts>
      </Flexbox>
    </li>
  );
};
