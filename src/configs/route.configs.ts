import { RouteGenerator, Routes } from "@methodstudio/class-component-module";

import AccountManager from "@Screen/AccountManager";
import Profile from "@Screen/AccountManager/Profile";
import Promotion from "@Screen/AccountManager/Promotion";
import ReceivePayment from "@Screen/AccountManager/ReceivePayment";
import QuestionScreen from "@Screen/QuestionScreen";
import AnsweredRecord from "@Screen/QuestionScreen/AnsweredRecord";
import AnsweredRecordScreen from "@Screen/QuestionScreen/AnsweredRecord/AnsweredRecordScreen";
import ChatWithStudentRecordScreen from "@Screen/QuestionScreen/AnsweredRecord/ChatWithStudentRecordScreen";
import NewQuestionScreen from "@Screen/QuestionScreen/NewQuestionScreen";
import ProcessingQuestion from "@Screen/QuestionScreen/ProcessingQuestion";
import ChatWithStudentScreen from "@Screen/QuestionScreen/ProcessingQuestion/ChatWithStudentScreen";
import ProcessingQuestionScreen from "@Screen/QuestionScreen/ProcessingQuestion/ProccessingQuestionScreen";

export const QuestionRoute = new RouteGenerator<never>("/question");
export const NewQuestionRoute = new RouteGenerator<never>("/question/new");
export const ProcessingQuestionRoute = new RouteGenerator<never>(
  "/question/processing"
);
export const ChatWithStudentRoute = new RouteGenerator<{ questionId: number }>(
  "/question/processing/chat/:questionId"
);
export const AnsweredQuestionRoute = new RouteGenerator<never>(
  "/question/answered"
);
export const ChatWithStudentRecordRoute = new RouteGenerator<{
  questionId: number;
}>("/question/answered/chat/:questionId");

export const AccountManagerRoute = new RouteGenerator<never>("/account");
export const ProfileRoute = new RouteGenerator<never>("/account/profile");
export const ReceivePaymentRoute = new RouteGenerator<never>(
  "/account/receive_payment"
);
export const PromotionRoute = new RouteGenerator<never>("/account/promotion");

export const routes: Routes = [
  {
    path: QuestionRoute.getRoute(),
    to: QuestionRoute.getLinks(),
    title: "問題首頁",
    render: QuestionScreen,
    routes: [
      {
        path: NewQuestionRoute.getRoute(),
        to: NewQuestionRoute.getLinks(),
        title: "新問題",
        render: NewQuestionScreen,
      },
      {
        path: ProcessingQuestionRoute.getRoute(),
        to: ProcessingQuestionRoute.getLinks(),
        title: "用心解答中",
        render: ProcessingQuestion,
        routes: [
          {
            path: ProcessingQuestionRoute.getRoute(),
            to: ProcessingQuestionRoute.getLinks(),
            title: "用心解答中",
            render: ProcessingQuestionScreen,
            exact: true,
          },
          {
            path: ChatWithStudentRoute.getRoute(),
            title: "學生對話",
            render: ChatWithStudentScreen,
          },
        ],
      },
      {
        path: AnsweredQuestionRoute.getRoute(),
        to: AnsweredQuestionRoute.getLinks(),
        title: "回答紀錄",
        render: AnsweredRecord,
        routes: [
          {
            path: AnsweredQuestionRoute.getRoute(),
            to: AnsweredQuestionRoute.getLinks(),
            title: "回答紀錄",
            render: AnsweredRecordScreen,
            exact: true,
          },
          {
            path: ChatWithStudentRecordRoute.getRoute(),
            title: "學生對話",
            render: ChatWithStudentRecordScreen,
          },
        ],
      },
    ],
  },
  {
    path: AccountManagerRoute.getRoute(),
    to: AccountManagerRoute.getLinks(),
    title: "帳戶管理",
    render: AccountManager,
    routes: [
      {
        path: ProfileRoute.getRoute(),
        to: ProfileRoute.getLinks(),
        title: "個人檔案",
        render: Profile,
      },
      {
        path: ReceivePaymentRoute.getRoute(),
        to: ReceivePaymentRoute.getLinks(),
        title: "收款設定",
        render: ReceivePayment,
      },
      {
        path: PromotionRoute.getRoute(),
        to: PromotionRoute.getLinks(),
        title: "推薦好友",
        render: Promotion,
      },
    ],
  },
];
