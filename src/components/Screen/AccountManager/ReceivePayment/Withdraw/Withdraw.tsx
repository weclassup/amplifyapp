import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, SubmitHandler, useForm, Validate } from "react-hook-form";
import { useAsync } from "react-use";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCheck, faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  axiosHelper,
  Button,
  Checkbox,
  ConditionalFragment,
  Dropdown,
  DropdownOption,
  FileUploader,
  Flexbox,
  Fonts,
  formatChecker,
  FormErrorMessage,
  FormLabel,
  FullScreenModalContainer,
  momentHelper,
  SecondaryTabContainer,
  TabItem,
  TextField,
  useAsyncPrompt,
  useOnEndReach,
  validator,
} from "@methodstudio/class-component-module";
import classNames from "classnames";

import { PublicApi, TeacherApi } from "@/api";

import {
  PageDtoTeacherQuestionDto,
  TeacherCreateWithdrawReq,
  TeacherQuestionDto,
  TeacherSearchQuestionReq,
  TeacherWithdrawDto,
} from "@api/teacher.api";
import CreateAccountForm from "@Feature/CreateAccountForm";
import { WithdrawAccountFormValues } from "@Feature/CreateAccountForm/CreateAccountForm";
import useInfiniteScrollPagination from "@hooks/useInfiniteScrollPagination";
import { WithdrawStatusEnum } from "@static/static.options";

const useWallet = () => {
  const [refetchCount, setRefetchCount] = useState<number>(0);

  const { value: wallet } = useAsync(
    axiosHelper.getDataFromAxiosRespond(TeacherApi.getWallet),
    [refetchCount]
  );

  const { value: configOptions } = useAsync(
    axiosHelper.getDataFromAxiosRespond(() =>
      PublicApi.searchConfigs({
        ids: [
          "TEACHER_GOLD_EXCHANGE_RATE_GOLD",
          "TEACHER_GOLD_EXCHANGE_RATE_NT",
          "TEACHER_GOLD_WITHDRAW_MIN",
        ],
      })
    ),
    []
  );

  const refetch = useCallback(() => setRefetchCount((prev) => prev + 1), []);

  const configs = useMemo<
    Record<
      | "TEACHER_GOLD_EXCHANGE_RATE_GOLD"
      | "TEACHER_GOLD_EXCHANGE_RATE_NT"
      | "TEACHER_GOLD_WITHDRAW_MIN",
      number
    >
  >(() => {
    if (formatChecker.isNotSet(configOptions))
      return {
        TEACHER_GOLD_EXCHANGE_RATE_NT: 1,
        TEACHER_GOLD_EXCHANGE_RATE_GOLD: 1,
        TEACHER_GOLD_WITHDRAW_MIN: 1000,
      };
    return configOptions.reduce((prev, current) => {
      return { ...prev, [current.id]: Number(current.configValue) };
    }, {}) as Record<
      | "TEACHER_GOLD_EXCHANGE_RATE_GOLD"
      | "TEACHER_GOLD_EXCHANGE_RATE_NT"
      | "TEACHER_GOLD_WITHDRAW_MIN",
      number
    >;
  }, [configOptions]);

  return { configs, wallet, refetch };
};

const Withdraw = () => {
  return (
    <div className={classNames("py-4")}>
      <Wallet />
      <Histories />
    </div>
  );
};

export default Withdraw;

const Wallet = () => {
  const [startApply, setStartApply] = useState<boolean>(false);

  const { configs, wallet, refetch } = useWallet();

  return (
    <React.Fragment>
      <ApplyWithdraw
        isOpen={startApply}
        onClose={() => setStartApply(false)}
        refetch={refetch}
      />
      <div className={classNames("mb-8", "bg-white")}>
        <div
          className={classNames(
            "md:flex md:items-center",
            "py-5 px-6",
            "border-b border-solid border-grey4"
          )}
        >
          <div
            className={classNames("md:flex md:items-center", "mb-5 md:mb-0")}
          >
            <Flexbox
              align={"center"}
              className={classNames("mb-1 md:mb-0", "text-2xl text-primary")}
            >
              <Flexbox
                as={"span"}
                align={"center"}
                justify={"center"}
                className={classNames("mr-4", "w-6 h-6")}
              >
                <FontAwesomeIcon icon={faCoins} />
              </Flexbox>
              {wallet?.currentGold}
            </Flexbox>
            <Fonts className={classNames("ml-10 md:ml-2", "text-grey2")}>
              = NT$
              {configs.TEACHER_GOLD_EXCHANGE_RATE_NT *
                (wallet?.currentGold || 0)}
            </Fonts>
          </div>
          <Button
            buttonStyle={"primary"}
            className={classNames("mx-auto md:mr-0", "h-9 w-[5.5rem]")}
            defaultSize={false}
            onClick={() => setStartApply(true)}
          >
            申請提領
          </Button>
        </div>
        <div className={classNames("py-3 px-6")}>
          <Fonts className={classNames("mb-2", "text-grey2")}>
            •{configs.TEACHER_GOLD_EXCHANGE_RATE_GOLD} 金幣 = NT$
            {configs.TEACHER_GOLD_EXCHANGE_RATE_NT}。
          </Fonts>
          <Fonts className={classNames("mb-2", "text-grey2")}>
            •超過
            {configs.TEACHER_GOLD_WITHDRAW_MIN.toLocaleString()}
            金幣可以申請提領。
          </Fonts>
          <Fonts className={classNames("text-grey2")}>
            •款項將於 5 天內匯出。
          </Fonts>
        </div>
      </div>
    </React.Fragment>
  );
};

enum HowToWithdraw {
  USUAL = "常用帳戶",
  CREATE = "新增帳戶",
}

type KeyOfHowToApply = keyof typeof HowToWithdraw;

const ApplyWithdraw: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}> = ({ isOpen, onClose, refetch }) => {
  const [howToApply, setHowToApply] = useState<KeyOfHowToApply>("USUAL");

  useEffect(() => {
    if (!isOpen) {
      setHowToApply("USUAL");
    }
  }, [isOpen]);

  const { value: withdrawAccounts } = useAsync(
    async () =>
      isOpen
        ? await TeacherApi.getWithdrawAccounts().then((res) => res.data)
        : [],
    [isOpen]
  );

  const {
    showAsyncPrompt: showConfirmApplyPrompt,
    prompt: promptToConfirmApply,
    handleConfirm: handleConfirmApply,
    handleClose: handleCloseApply,
  } = useAsyncPrompt<true, false>();
  const {
    showAsyncPrompt: showApplySuccess,
    prompt: promptApplySuccess,
    handleConfirm: handleConfirmApplySuccess,
  } = useAsyncPrompt<true, false>();

  const { configs, wallet } = useWallet();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<TeacherCreateWithdrawReq>({
    mode: "all",
    shouldUnregister: true,
    defaultValues: {
      goldConsumed: 0,
    },
  });

  const watchGoldConsumed = watch("goldConsumed");

  const withdrawAccountsOptions = useMemo(() => {
    if (formatChecker.isNotSet(withdrawAccounts)) return [];

    return withdrawAccounts.map<DropdownOption>(
      ({ bankAccount, bankName, id, defaultForWithdraw }) => {
        const label = `${bankName} (*${bankAccount.slice(
          bankAccount.length - 5
        )})`;

        const renderer = () => (
          <React.Fragment>
            <Fonts
              condition={defaultForWithdraw}
              as={"span"}
              fontSize={"secondaryButton"}
              className={classNames(
                "mr-2 my-[-2px] py-1 px-2",
                "border border-solid border-grey4 rounded-sm"
              )}
            >
              預設
            </Fonts>
            {label}
          </React.Fragment>
        );

        return {
          key: id,
          label,
          optionItemRender: renderer,
          displayItemRender: renderer,
        };
      }
    );
  }, [withdrawAccounts]);

  const defaultWithdrawAccountId = useMemo(
    () => withdrawAccounts?.find((item) => item.defaultForWithdraw)?.id,
    [withdrawAccounts]
  );

  const onSubmit = useCallback<SubmitHandler<TeacherCreateWithdrawReq>>(
    async ({ withdrawAccountId, goldConsumed }) => {
      const confirm = await promptToConfirmApply();

      if (!confirm) return;

      await TeacherApi.createWithdraw({ withdrawAccountId, goldConsumed });
      await promptApplySuccess();
      onClose();
      refetch();
    },
    []
  );

  const onCreateNewOneSubmit = useCallback<
    SubmitHandler<WithdrawAccountFormValues>
  >(
    async ({
      bankAccountPicture,
      bankAccount,
      bankAccountName,
      bankName,
      bankBranchName,
    }) => {
      const confirm = await promptToConfirmApply();

      if (!confirm) return;

      const bankAccountPictureId = await new FileUploader("teacher")
        .getResult(bankAccountPicture)
        .then((res) => res?.id);
      if (!bankAccountPictureId) return;

      const {
        data: { id },
      } = await TeacherApi.createWithdrawAccount({
        bankAccount,
        bankAccountName,
        bankAccountPictureId,
        bankBranchName,
        bankName,
      });

      await TeacherApi.createWithdraw({
        withdrawAccountId: id,
        goldConsumed: watchGoldConsumed,
      });
      await promptApplySuccess();
      onClose();
      refetch();
    },
    [watchGoldConsumed]
  );

  const amountValidator = useCallback<Validate<number | undefined>>(
    (value) => {
      if (formatChecker.isNotSet(value)) return undefined;

      if ((wallet?.currentGold || 0) < value) return "可提領數量不足。";

      const minimum = Number(configs.TEACHER_GOLD_WITHDRAW_MIN);

      return minimum > value
        ? `最低提領金幣數量為 ${minimum.toLocaleString()}。`
        : undefined;
    },
    [configs, wallet]
  );

  return (
    <React.Fragment>
      <Alert
        alert={showConfirmApplyPrompt}
        title={"確定申請？"}
        content={`確定要申請提領 ${watchGoldConsumed.toLocaleString()} 金幣 = NT$${(
          configs.TEACHER_GOLD_EXCHANGE_RATE_NT * watchGoldConsumed
        ).toLocaleString()}？`}
        confirmHandler={() => handleConfirmApply(true)}
        cancelHandler={() => handleCloseApply(false)}
      />
      <Alert
        alert={showApplySuccess}
        renderTitle={() => (
          <Fonts fontSize={"secondaryHeading"} className={classNames("mb-3")}>
            收到申請
            <FontAwesomeIcon
              icon={faCheck}
              className={classNames("ml-2", "text-green")}
            />
          </Fonts>
        )}
        content={"我們已經收到你的提領申請，將在 5 天內匯出款項。"}
        confirmHandler={() => handleConfirmApplySuccess(true)}
      />
      <FullScreenModalContainer
        open={isOpen}
        closeHandler={onClose}
        heading={"申請提領"}
      >
        <div
          className={classNames(
            "md:px-20 md:py-10",
            "divide-y divide-grey4",
            "overflow-scroll"
          )}
        >
          <div
            className={classNames(
              "md:flex md:items-center",
              "py-3 px-6 md:px-0 md:py-5"
            )}
          >
            <Fonts
              fontSize={"secondaryBody"}
              className={classNames("mb-1 md:mb-0", "text-grey2")}
            >
              可提領數量
            </Fonts>
            <Fonts
              fontSize={"primaryButton"}
              className={classNames("md:ml-auto", "text-primary")}
            >
              <FontAwesomeIcon
                icon={faCoins}
                className={classNames("mr-2", "text-base")}
              />
              {wallet?.currentGold.toLocaleString()}
            </Fonts>
          </div>
          <div className={classNames("py-5 px-6 md:px-0 md:py-6")}>
            <FormLabel>提領數量</FormLabel>
            <TextField
              inputMode={"numeric"}
              type={"number"}
              register={register("goldConsumed", {
                required: validator.required,
                validate: amountValidator,
              })}
            />
            <FormErrorMessage errors={errors} name={"goldConsumed"} />
          </div>
          <div
            className={classNames(
              "md:flex md:items-center",
              "py-3 px-6 md:px-0 md:py-5"
            )}
          >
            <Fonts
              fontSize={"secondaryBody"}
              className={classNames("mb-1 md:mb-0 md:mr-auto", "text-grey2")}
            >
              提領金額
            </Fonts>
            <Fonts>
              {watchGoldConsumed.toLocaleString()} 金幣 = NT$
              {(
                configs.TEACHER_GOLD_EXCHANGE_RATE_NT * watchGoldConsumed
              ).toLocaleString()}
            </Fonts>
          </div>
          <div
            className={classNames("pt-3 pb-10 px-6 md:px-0 md:pt-5 md:pb-0")}
          >
            <div
              className={classNames(
                "md:flex md:justify-between md:items-center",
                "md:mb-6"
              )}
            >
              <Fonts
                fontSize={"secondaryBody"}
                className={classNames("mb-4 md:mb-0", "text-grey2")}
              >
                收款帳戶
              </Fonts>
              <Flexbox align={"center"} className={classNames("mb-5 md:mb-0")}>
                {Object.keys(HowToWithdraw).map((how) => (
                  <Checkbox
                    className={classNames("mr-6 last:mr-0")}
                    key={how}
                    name={how}
                    label={HowToWithdraw[how as KeyOfHowToApply]}
                    onChange={() => setHowToApply(how as KeyOfHowToApply)}
                    checked={how === howToApply}
                  />
                ))}
              </Flexbox>
            </div>
            <ConditionalFragment condition={howToApply === "USUAL"}>
              <Controller
                control={control}
                name={"withdrawAccountId"}
                rules={{ required: validator.required }}
                render={({ field: { ref: _, ...field } }) => (
                  // eslint-disable-next-line react/jsx-no-undef
                  <Dropdown
                    {...field}
                    options={withdrawAccountsOptions}
                    defaultValue={defaultWithdrawAccountId}
                  />
                )}
              />
              <Button
                buttonStyle={"primary"}
                fill
                type={"button"}
                onClick={handleSubmit(onSubmit)}
                className={classNames("mt-8 md:mt-10")}
                disabled={!isValid}
              >
                送出申請
              </Button>
            </ConditionalFragment>
            <ConditionalFragment condition={howToApply === "CREATE"}>
              <CreateAccountForm
                onSubmit={onCreateNewOneSubmit}
                buttonText={"送出申請"}
              />
            </ConditionalFragment>
          </div>
        </div>
      </FullScreenModalContainer>
    </React.Fragment>
  );
};

const WithdrawRecord = () => {
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<TeacherWithdrawDto | null>(null);
  const { value: histories } = useAsync(
    axiosHelper.getDataFromAxiosRespond(TeacherApi.getWithdrawList),
    []
  );

  return (
    <React.Fragment>
      <WithdrawRecordDetail
        detail={currentSelectedItem}
        onClose={() => setCurrentSelectedItem(null)}
      />
      <div className={classNames("py-5")}>
        <ConditionalFragment condition={formatChecker.isEmptyArray(histories)}>
          <div
            className={classNames(
              "flex items-center justify-center",
              "py-3 px-6 md:py-[0.875rem]",
              "h-[5.5rem] md:h-auto",
              "bg-white"
            )}
          >
            <Fonts className={classNames("text-center")}>無資料</Fonts>
          </div>
        </ConditionalFragment>
        <ConditionalFragment
          condition={formatChecker.isNotEmptyArray(histories)}
        >
          <ul
            className={classNames(
              "bg-white",
              "divide-y divide-grey4 md:rounded-xl"
            )}
          >
            <li className={classNames("hidden md:flex", "py-3.5 px-6")}>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-1", "text-grey2")}
              >
                申請日期
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames(
                  "hidden lg:block",
                  "flex-1",
                  "text-grey2"
                )}
              >
                匯款日期
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-1", "text-grey2")}
              >
                申請狀態
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames(
                  "hidden lg:block",
                  "flex-[2]",
                  "text-grey2"
                )}
              >
                收款帳戶
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-[2]", "text-grey2")}
              >
                提領金幣
              </Fonts>
              <span className={classNames("md:w-3 lg:hidden")} />
            </li>
            {histories?.map((history) => {
              const {
                id,
                status,
                goldConsumed,
                withdrawNt,
                bankAccount,
                bankName,
                createdAt,
                updatedAt,
              } = history;
              return (
                <Flexbox
                  as={"li"}
                  key={id}
                  align={"stretch"}
                  className={classNames(
                    "cursor-pointer lg:cursor-none",
                    "lg:pointer-events-none",
                    "py-3 px-6"
                  )}
                  onClick={() => setCurrentSelectedItem(history)}
                >
                  <div
                    className={classNames("md:flex md:items-center", "flex-1")}
                  >
                    <Fonts
                      fontSize={"secondaryButton"}
                      className={classNames(
                        "md:order-3 md:flex-1",
                        "mb-1 md:mb-0",
                        {
                          "text-primary": status === "PROCESSING",
                          "text-grey2": status !== "PROCESSING",
                          "md:text-grey1": status !== "PROCESSING",
                        },
                        "md:text-base md:font-normal"
                      )}
                    >
                      {WithdrawStatusEnum[status]}
                    </Fonts>
                    <Fonts
                      fontSize={"secondaryBody"}
                      className={classNames(
                        "md:order-5 md:flex-[2]",
                        "mb-1 md:mb-0",
                        "md:text-base md:font-normal"
                      )}
                    >
                      {goldConsumed.toLocaleString()} 金幣 = NT$
                      {withdrawNt.toLocaleString()}
                    </Fonts>
                    <Fonts
                      fontSize={"tiny"}
                      className={classNames(
                        "md:order-1 md:flex-1",
                        "text-grey2 md:text-grey1 md:text-base md:font-normal"
                      )}
                    >
                      {momentHelper.getNormalFormat(createdAt)}
                    </Fonts>
                    <Fonts
                      className={classNames(
                        "hidden lg:block",
                        "md:order-2 md:flex-1",
                        "md:text-base md:font-normal"
                      )}
                    >
                      {updatedAt
                        ? momentHelper.getNormalFormat(updatedAt)
                        : "－"}
                    </Fonts>
                    <Fonts
                      className={classNames(
                        "hidden lg:block",
                        "md:order-4 md:flex-[2]",
                        "md:text-base md:font-normal"
                      )}
                    >
                      {bankName} (*{bankAccount.slice(bankAccount.length - 5)})
                    </Fonts>
                  </div>
                  <Flexbox
                    as={"span"}
                    align={"center"}
                    justify={"center"}
                    className={classNames("lg:hidden", "md:w-3")}
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={classNames("text-grey2")}
                    />
                  </Flexbox>
                </Flexbox>
              );
            })}
          </ul>
        </ConditionalFragment>
      </div>
    </React.Fragment>
  );
};

const WithdrawRecordDetail: React.FC<{
  detail: TeacherWithdrawDto | null;
  onClose: () => void;
}> = ({ detail, onClose }) => {
  return (
    <FullScreenModalContainer
      open={formatChecker.isSet(detail)}
      closeHandler={onClose}
      heading={"提領紀錄"}
      headerClassName={classNames("md:hidden")}
    >
      <Flexbox
        align={"center"}
        justify={"center"}
        className={classNames(
          "hidden md:flex",
          "py-6",
          "border-b border-solid border-grey4"
        )}
      >
        <Fonts fontSize={"title"}>解題明細</Fonts>
      </Flexbox>
      <div className={classNames("md:px-6")}>
        <DetailItemSection title={"申請日期"}>
          <Fonts condition={formatChecker.isNotEmptyString(detail?.createdAt)}>
            {momentHelper.getNormalFormat(detail?.createdAt || "")}
          </Fonts>
          <Fonts
            condition={
              formatChecker.isEmptyString(detail?.createdAt) ||
              formatChecker.isNotSet(detail?.createdAt)
            }
          >
            －
          </Fonts>
        </DetailItemSection>
        <DetailItemSection title={"匯款日期"}>
          <Fonts condition={formatChecker.isNotEmptyString(detail?.updatedAt)}>
            {momentHelper.getNormalFormat(detail?.updatedAt || "")}
          </Fonts>
          <Fonts
            condition={
              formatChecker.isEmptyString(detail?.updatedAt) ||
              formatChecker.isNotSet(detail?.updatedAt)
            }
          >
            －
          </Fonts>
        </DetailItemSection>
        <DetailItemSection title={"申請狀態"}>
          <Fonts
            className={classNames({
              "text-primary": detail?.status === "PROCESSING",
              "text-grey2": detail?.status !== "PROCESSING",
            })}
          >
            {detail?.status && WithdrawStatusEnum[detail.status]}
          </Fonts>
        </DetailItemSection>
        <DetailItemSection title={"收款帳戶"}>
          <Fonts>
            {detail?.bankName} (*
            {detail?.bankAccount.slice(detail.bankAccount.length - 5)})
          </Fonts>
        </DetailItemSection>
        <DetailItemSection title={"申請狀態"}>
          <Fonts>
            {detail?.goldConsumed.toLocaleString()} 金幣 = NT$
            {detail?.withdrawNt.toLocaleString()}
          </Fonts>
        </DetailItemSection>
      </div>
    </FullScreenModalContainer>
  );
};

const AnsweredDetail = () => {
  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<TeacherQuestionDto | null>(null);

  const listRef = useRef<HTMLUListElement>(null);

  const { items: histories, turnPage } = useInfiniteScrollPagination<
    TeacherSearchQuestionReq,
    PageDtoTeacherQuestionDto
  >({
    api: TeacherApi.searchQuestions,
    parameters: { category: "COMPLETE" },
  });

  useOnEndReach({
    el: listRef.current,
    onEndReached: turnPage,
    eventThrottle: 1500,
  });

  return (
    <React.Fragment>
      <AnsweredRecordDetail
        detail={currentSelectedItem}
        onClose={() => setCurrentSelectedItem(null)}
      />
      <div className={classNames("py-5")}>
        <ConditionalFragment condition={formatChecker.isEmptyArray(histories)}>
          <div
            className={classNames(
              "flex items-center justify-center",
              "py-3 px-6 md:py-[0.875rem]",
              "h-[5.5rem] md:h-auto",
              "bg-white"
            )}
          >
            <Fonts className={classNames("text-center")}>無資料</Fonts>
          </div>
        </ConditionalFragment>
        <ConditionalFragment
          condition={formatChecker.isNotEmptyArray(histories)}
        >
          <ul
            ref={listRef}
            className={classNames(
              "bg-white",
              "divide-y divide-grey4 rounded-xl"
            )}
          >
            <li className={classNames("hidden md:flex", "py-3.5 px-6")}>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-1", "text-grey2")}
              >
                完成日期
              </Fonts>
              {/*<Fonts*/}
              {/*  fontSize={"secondaryButton"}*/}
              {/*  className={classNames("flex-1", "text-grey2")}*/}
              {/*>*/}
              {/*  問題編號*/}
              {/*</Fonts>*/}
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames(
                  "hidden lg:block",
                  "flex-[0.75]",
                  "text-grey2"
                )}
              >
                問題類別
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames(
                  "hidden lg:block",
                  "flex-[2]",
                  "text-grey2"
                )}
              >
                科目
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-1", "text-grey2")}
              >
                金幣收入
              </Fonts>
              <span className={classNames("w-9 lg:hidden")} />
            </li>
            {histories?.map((history) => {
              const {
                id,
                teacherDidRewardGold,
                studentCompleteAt,
                subjectCategory,
                subject,
              } = history;

              return (
                <Flexbox
                  as={"li"}
                  key={id}
                  align={"stretch"}
                  className={classNames(
                    "cursor-pointer lg:cursor-none",
                    "lg:pointer-events-none",
                    "py-3 px-6 md:py-3.5"
                  )}
                  onClick={() => setCurrentSelectedItem(history)}
                >
                  <div
                    className={classNames("md:flex md:items-center", "flex-1")}
                  >
                    <Fonts
                      fontSize={"secondaryButton"}
                      className={classNames(
                        "md:order-5 md:flex-1",
                        "mb-1 md:mb-0",
                        "md:text-base md:font-normal text-primary"
                      )}
                    >
                      ＋{teacherDidRewardGold || 0}
                    </Fonts>
                    {/*<Fonts*/}
                    {/*  fontSize={"secondaryBody"}*/}
                    {/*  className={classNames(*/}
                    {/*    "md:flex-1 md:order-2",*/}
                    {/*    "mb-1 md:mb-0",*/}
                    {/*    "md:text-base md:font-normal"*/}
                    {/*  )}*/}
                    {/*>*/}
                    {/*  <span className={classNames("md:hidden")}>*/}
                    {/*    問題編號：*/}
                    {/*  </span>*/}
                    {/*  {id}*/}
                    {/*</Fonts>*/}
                    <Fonts
                      fontSize={"tiny"}
                      className={classNames(
                        "md:order-1 md:flex-1",
                        "md:text-base text-grey2 md:text-grey1"
                      )}
                    >
                      {studentCompleteAt
                        ? momentHelper.getNormalFormat(studentCompleteAt)
                        : "Null"}
                    </Fonts>
                    <Fonts
                      className={classNames(
                        "hidden lg:block",
                        "md:order-3 md:flex-[0.75]"
                      )}
                    >
                      {subjectCategory?.name}
                    </Fonts>
                    <Fonts
                      className={classNames(
                        "hidden lg:block",
                        "md:order-4 md:flex-[2]"
                      )}
                    >
                      {subject?.name}
                    </Fonts>
                  </div>
                  <Flexbox
                    as={"span"}
                    align={"center"}
                    justify={"center"}
                    className={classNames("lg:hidden", "md:w-9")}
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={classNames("text-grey2")}
                    />
                  </Flexbox>
                </Flexbox>
              );
            })}
          </ul>
        </ConditionalFragment>
      </div>
    </React.Fragment>
  );
};

const AnsweredRecordDetail: React.FC<{
  detail: TeacherQuestionDto | null;
  onClose: () => void;
}> = ({ detail, onClose }) => {
  return (
    <FullScreenModalContainer
      open={formatChecker.isSet(detail)}
      closeHandler={onClose}
      heading={"解題明細"}
      headerClassName={classNames("md:hidden")}
    >
      <Flexbox
        align={"center"}
        justify={"center"}
        className={classNames(
          "hidden md:flex",
          "py-6",
          "border-b border-solid border-grey4"
        )}
      >
        <Fonts fontSize={"title"}>解題明細</Fonts>
      </Flexbox>
      <div className={classNames("md:px-6")}>
        <DetailItemSection title={"完成日期"}>
          <Fonts
            condition={formatChecker.isNotEmptyString(
              detail?.studentCompleteAt
            )}
          >
            {momentHelper.getNormalFormat(detail?.studentCompleteAt || "")}
          </Fonts>
          <Fonts
            condition={
              formatChecker.isEmptyString(detail?.studentCompleteAt) ||
              formatChecker.isNotSet(detail?.studentCompleteAt)
            }
          >
            －
          </Fonts>
        </DetailItemSection>
        {/*<DetailItemSection title={"問題編號"}>*/}
        {/*  <Fonts>{detail?.id}</Fonts>*/}
        {/*</DetailItemSection>*/}
        <DetailItemSection title={"問題類別"}>
          <Fonts>{detail?.subjectCategory?.name}</Fonts>
        </DetailItemSection>
        <DetailItemSection title={"科目"}>
          <Fonts>{detail?.subject?.name}</Fonts>
        </DetailItemSection>
        <DetailItemSection title={"申請狀態"}>
          <Fonts className={classNames("text-primary")}>
            ＋{detail?.teacherDidRewardGold || 0}
          </Fonts>
        </DetailItemSection>
      </div>
    </FullScreenModalContainer>
  );
};

const DetailItemSection: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <div
      className={classNames(
        "md:flex md:items-center",
        "px-6 py-3 md:px-8 md:py-5",
        "border-b border-solid border-grey4"
      )}
    >
      <Fonts
        fontSize={"secondaryBody"}
        className={classNames("mb-1 md:mb-0", "md:w-[10rem]", "text-grey2")}
      >
        {title}
      </Fonts>
      {children}
    </div>
  );
};

const WalletHistory = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const { value: histories } = useAsync(
    axiosHelper.getDataFromAxiosRespond(TeacherApi.getWalletHistory),
    []
  );

  return (
    <React.Fragment>
      <div className={classNames("py-5")}>
        <ConditionalFragment condition={formatChecker.isEmptyArray(histories)}>
          <div
            className={classNames(
              "flex items-center justify-center",
              "py-3 px-6 md:py-[0.875rem]",
              "h-[5.5rem] md:h-auto",
              "bg-white"
            )}
          >
            <Fonts className={classNames("text-center")}>無資料</Fonts>
          </div>
        </ConditionalFragment>
        <ConditionalFragment
          condition={formatChecker.isNotEmptyArray(histories)}
        >
          <ul
            ref={listRef}
            className={classNames(
              "bg-white",
              "divide-y divide-grey4 rounded-xl"
            )}
          >
            <li className={classNames("hidden md:flex", "py-3.5 px-6")}>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-1", "text-grey2")}
              >
                日期
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-[2]", "text-grey2")}
              >
                操作
              </Fonts>
              <Fonts
                fontSize={"secondaryButton"}
                className={classNames("flex-1", "text-grey2")}
              >
                金幣收入
              </Fonts>
              <span className={classNames("w-9 lg:hidden")} />
            </li>
            {histories?.map((history, index) => {
              const { refId: id, updatedAt, updateReason, diff = 0 } = history;

              let income = diff < 0 ? `${diff}` : `＋${diff}`;

              return (
                <Flexbox
                  as={"li"}
                  key={`${id}_${index}`}
                  align={"stretch"}
                  className={classNames(
                    "cursor-pointer lg:cursor-none",
                    "lg:pointer-events-none",
                    "py-3 px-6 md:py-3.5"
                  )}
                >
                  <div
                    className={classNames("md:flex md:items-center", "flex-1")}
                  >
                    <Fonts
                      fontSize={"secondaryButton"}
                      className={classNames(
                        "md:order-3 md:flex-1",
                        "mb-1 md:mb-0",
                        "md:text-base md:font-normal text-primary"
                      )}
                    >
                      {income}
                    </Fonts>
                    <Fonts
                      className={classNames(
                        "mb-1 md:mb-0",
                        "md:order-2 md:flex-[2]"
                      )}
                    >
                      {updateReason}
                    </Fonts>
                    <Fonts
                      fontSize={"tiny"}
                      className={classNames(
                        "md:order-1 md:flex-1",
                        "md:text-base text-grey2 md:text-grey1"
                      )}
                    >
                      {updatedAt
                        ? momentHelper.getNormalFormat(updatedAt)
                        : "Null"}
                    </Fonts>
                  </div>
                </Flexbox>
              );
            })}
          </ul>
        </ConditionalFragment>
      </div>
    </React.Fragment>
  );
};

const HISTORY_TAB_ITEM: Array<TabItem> = [
  {
    pageKey: "withdraw_record",
    label: "提領紀錄",
    render: WithdrawRecord,
  },
  {
    pageKey: "answer_detail",
    label: "解題明細",
    render: AnsweredDetail,
  },
  {
    pageKey: "wallet_history",
    label: "獲得紀錄",
    render: WalletHistory,
  },
];

const Histories = () => {
  return <SecondaryTabContainer items={HISTORY_TAB_ITEM} />;
};
