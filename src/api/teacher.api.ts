/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TeacherSaveWithdrawAccountReq {
  /** 銀行名稱 */
  bankName: string;

  /** 分行名稱 */
  bankBranchName: string;

  /** 銀行帳號 */
  bankAccount: string;

  /** 戶名 */
  bankAccountName: string;

  /**
   * 存摺封面
   * @format int32
   */
  bankAccountPictureId: number;
}

export interface FileDto {
  /** @format int32 */
  id: number;
  name: string;
  contentType: string;

  /** @format int64 */
  size?: number;
  url?: string;
}

export interface TeacherWithdrawAccountDto {
  /** @format int32 */
  id: number;

  /** 銀行名稱 */
  bankName: string;

  /** 分行名稱 */
  bankBranchName: string;
  defaultForWithdraw: boolean;

  /** 銀行帳號 */
  bankAccount: string;

  /** 戶名 */
  bankAccountName: string;

  /**
   * 存摺封面
   * @format int32
   */
  bankAccountPictureId: number;
  bankAccountPicture?: FileDto;
}

export interface OptionDto {
  /** @format int32 */
  id: number;
  name: string;
}

export interface QuestionChatMessageDto {
  /** @format int32 */
  id: number;

  /** @format date-time */
  createdAt: string;
  issuer: "STUDENT" | "TEACHER";

  /** @format int32 */
  issuerId: number;
  content: string;
  fileIds: number[];
  files: FileDto[];
}

export interface StudentSimpleWithProfilePictureDto {
  /** 姓氏 */
  surName: string;

  /** 名字 */
  givenName: string;

  /** 暱稱 */
  nickName: string;
  profilePicture?: FileDto;
}

export interface TeacherQuestionDetailDto {
  /** @format int32 */
  id: number;

  /** 問題編號 */
  uid: string;

  /** 文字內容 */
  content: string;

  /** 附件檔案編號 */
  attachmentFileIds: number[];

  /** 老師回答內容 */
  teacherAnswerContent?: string;

  /** 老師回答附件檔案編號 */
  teacherAnswerAttachmentFileIds: number[];

  /**
   * 科目分類編號
   * @format int32
   */
  subjectCategoryId: number;

  /**
   * 科目
   * @format int32
   */
  subjectId: number;

  /** 老師配對方式 */
  teacherMatchType: "MATCH" | "SPECIFY";

  /**
   * 指定老師編號
   * @format int32
   */
  teacherId?: number;

  /** 問題狀態 */
  status: "DRAFT" | "MATCHING" | "ANSWERING" | "ANSWERED" | "COMPLETE";

  /**
   * 發問時間
   * @format date-time
   */
  issueAt?: string;

  /**
   * 即時配對到期時間
   * @format date-time
   */
  matchExpireAt?: string;

  /**
   * 老師接受問題的時間
   * @format date-time
   */
  teacherApplyAt?: string;

  /**
   * 老師回答問題的時間
   * @format date-time
   */
  teacherAnswerAt?: string;

  /**
   * 指定老師到期時間
   * @format date-time
   */
  specifyTeacherExpireAt?: string;

  /**
   * 老師送出答案到期時間
   * @format date-time
   */
  teacherAnswerExpireAt?: string;

  /**
   * 學生完成題目到期時間
   * @format date-time
   */
  studentCompleteExpireAt?: string;

  /** @format date-time */
  studentCompleteAt?: string;

  /** @format int32 */
  reviewId?: number;

  /** @format int32 */
  lastChatMessageId?: number;

  /**
   * 老師完成問題可得金幣
   * @format int32
   */
  teacherWillRewardGold?: number;

  /** 老師是否已得到金幣 */
  teacherDidRewardGold?: boolean;
  hasChatMessage: boolean;
  lastChatMessage?: QuestionChatMessageDto;
  teacher?: TeacherSimpleWithProfilePictureDto;
  student?: StudentSimpleWithProfilePictureDto;
  attachmentFiles: FileDto[];
  subject?: OptionDto;
  subjectCategory?: OptionDto;
  teacherAnswerAttachmentFiles: FileDto[];
}

export interface TeacherSimpleWithProfilePictureDto {
  /** @format int32 */
  teacherId: number;

  /** 暱稱 */
  nickName: string;

  /** 姓氏 */
  surName: string;

  /** 名字 */
  givenName: string;
  profilePicture?: FileDto;
}

export interface TeacherAnswerQuestionReq {
  /** 老師回答內容 */
  teacherAnswerContent?: string;

  /** 老師回答附件檔案編號 */
  teacherAnswerAttachmentFileIds: number[];
}

export interface NotificationInfoDto {
  /** @format int32 */
  unReadCount: number;

  /** @format date-time */
  readAt?: string;
}

export interface ChangePwdReq {
  pwd: string;
}

export interface SaveUserPreferenceReq {
  content?: string;
}

export interface UserPreferenceDto {
  category: string;
  content?: string;
}

export interface CommitPhoneUpdateReq {
  validationToken: string;
  code: string;
}

export interface OptionWithParentDto {
  /** @format int32 */
  id: number;
  name: string;
  parent?: OptionDto;
}

export interface TeacherActiveProfileDto {
  phone: string;

  /** 名字 */
  givenName: string;

  /** 姓氏 */
  surName: string;

  /** 暱稱 */
  nickName: string;
  gender: "MALE" | "FEMALE" | "OTHER";

  /**
   * 生日
   * @format date-time
   */
  birthday: string;

  /**
   * 學位
   * @format int32
   */
  degreeId?: number;

  /**
   * 學校
   * @format int32
   */
  degreeSchoolId?: number;

  /**
   * 學校城市
   * @format int32
   */
  degreeSchoolCityId?: number;

  /**
   * 系所
   * @format int32
   */
  degreeSchoolDepartmentId?: number;

  /** 學校(自行輸入) */
  customSchoolName?: string;

  /** 系所(自行輸入) */
  customSchoolDepartmentName?: string;

  /** 自我介紹 */
  selfIntroduction: string;

  /**
   * 身份驗證檔案編號
   * @format int32
   */
  mainVerificationImageId?: number;

  /**
   * 學位證書檔案編號
   * @format int32
   */
  degreeImageId?: number;

  /**
   * 學生證/在學成績單檔案編號
   * @format int32
   */
  studentCardOrTranscriptImageId?: number;

  /**
   * 個人照片
   * @format int32
   */
  profilePictureId?: number;

  /**
   * 教師證檔案編號
   * @format int32
   */
  teacherLicenseImageId?: number;

  /** 服務機構或任教學校 */
  currentJobLocation?: string;

  /** 擅長科目 */
  specializeSubjectIds: number[];

  /** 其他證明文件檔案編號 */
  otherProveFileIds: number[];
  profilePicture?: FileDto;
  mainVerificationImage?: FileDto;
  degreeImage?: FileDto;
  teacherLicenseImage?: FileDto;
  studentCardOrTranscriptImage?: FileDto;
  otherProveFiles: FileDto[];
  degree?: OptionDto;
  degreeSchool?: OptionDto;
  degreeSchoolCity?: OptionDto;
  degreeSchoolDepartment?: OptionDto;
  subjects: OptionWithParentDto[];
}

export interface TeacherPendingProfileDto {
  /** 名字 */
  givenName: string;

  /** 姓氏 */
  surName: string;

  /** 暱稱 */
  nickName: string;
  gender: "MALE" | "FEMALE" | "OTHER";

  /**
   * 生日
   * @format date-time
   */
  birthday: string;

  /**
   * 學位
   * @format int32
   */
  degreeId?: number;

  /**
   * 學校
   * @format int32
   */
  degreeSchoolId?: number;

  /**
   * 學校城市
   * @format int32
   */
  degreeSchoolCityId?: number;

  /**
   * 系所
   * @format int32
   */
  degreeSchoolDepartmentId?: number;

  /** 學校(自行輸入) */
  customSchoolName?: string;

  /** 系所(自行輸入) */
  customSchoolDepartmentName?: string;

  /** 自我介紹 */
  selfIntroduction: string;

  /**
   * 身份驗證檔案編號
   * @format int32
   */
  mainVerificationImageId?: number;

  /**
   * 學位證書檔案編號
   * @format int32
   */
  degreeImageId?: number;

  /**
   * 學生證/在學成績單檔案編號
   * @format int32
   */
  studentCardOrTranscriptImageId?: number;

  /**
   * 個人照片
   * @format int32
   */
  profilePictureId?: number;

  /**
   * 教師證檔案編號
   * @format int32
   */
  teacherLicenseImageId?: number;

  /** 服務機構或任教學校 */
  currentJobLocation?: string;

  /**
   * 送出審核時間
   * @format date-time
   */
  applyAt?: string;

  /**
   * 未通過時間
   * @format date-time
   */
  rejectedAt?: string;
  phone: string;

  /** 擅長科目 */
  specializeSubjectIds: number[];

  /** 其他證明文件檔案編號 */
  otherProveFileIds: number[];
  profilePicture?: FileDto;
  mainVerificationImage?: FileDto;
  degreeImage?: FileDto;
  teacherLicenseImage?: FileDto;
  studentCardOrTranscriptImage?: FileDto;
  otherProveFiles: FileDto[];
  degree?: OptionDto;
  degreeSchool?: OptionDto;
  degreeSchoolCity?: OptionDto;
  degreeSchoolDepartment?: OptionDto;
  subjects: OptionWithParentDto[];
}

export interface TeacherProfileDto {
  email: string;
  profileStatus: "PROCESSING" | "VERIFIED" | "REJECTED" | "BLOCKED";
  activeProfile?: TeacherActiveProfileDto;
  pendingProfile?: TeacherPendingProfileDto;
  signupSource?: "CLASS" | "EBOOK";

  /** 推薦碼 */
  promoteCode: string;
}

export interface TeacherUpdatePendingProfileReq {
  /** 名字 */
  givenName: string;

  /** 姓氏 */
  surName: string;

  /** 暱稱 */
  nickName: string;
  gender: "MALE" | "FEMALE" | "OTHER";

  /**
   * 生日
   * @format date-time
   */
  birthday: string;

  /**
   * 學位
   * @format int32
   */
  degreeId?: number;

  /**
   * 學校
   * @format int32
   */
  degreeSchoolId?: number;

  /**
   * 學校城市
   * @format int32
   */
  degreeSchoolCityId?: number;

  /**
   * 系所
   * @format int32
   */
  degreeSchoolDepartmentId?: number;

  /** 學校(自行輸入) */
  customSchoolName?: string;

  /** 系所(自行輸入) */
  customSchoolDepartmentName?: string;

  /** 自我介紹 */
  selfIntroduction: string;

  /**
   * 身份驗證檔案編號
   * @format int32
   */
  mainVerificationImageId?: number;

  /**
   * 學位證書檔案編號
   * @format int32
   */
  degreeImageId?: number;

  /**
   * 學生證/在學成績單檔案編號
   * @format int32
   */
  studentCardOrTranscriptImageId?: number;

  /**
   * 個人照片
   * @format int32
   */
  profilePictureId?: number;

  /**
   * 教師證檔案編號
   * @format int32
   */
  teacherLicenseImageId?: number;

  /** 服務機構或任教學校 */
  currentJobLocation?: string;

  /** 擅長科目 */
  specializeSubjectIds: number[];

  /** 其他證明文件檔案編號 */
  otherProveFileIds: number[];
}

export interface CommitEmailUpdateReq {
  validationToken: string;
  code: string;
}

export interface TeacherUpdateActiveProfileReq {
  /**
   * 個人照片
   * @format int32
   */
  profilePictureId?: number;

  /** 名字 */
  givenName: string;

  /** 姓氏 */
  surName: string;

  /** 暱稱 */
  nickName: string;
  gender: "MALE" | "FEMALE" | "OTHER";

  /**
   * 生日
   * @format date-time
   */
  birthday: string;

  /** 自我介紹 */
  selfIntroduction: string;
}

export interface CommitFileUploadReq {
  relateType?: "STUDENT" | "ADM_SUMMARY_REPORT";

  /** @format int32 */
  relateTypeId?: number;
}

export interface TeacherCreateWithdrawReq {
  /**
   * 兌換的金幣數量
   * @format int32
   */
  goldConsumed: number;

  /**
   * 使用提領帳號
   * @format int32
   */
  withdrawAccountId: number;
}

export interface TeacherWithdrawDto {
  /** @format int32 */
  id: number;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt?: string;

  /**
   * 兌換的金幣數量
   * @format int32
   */
  goldConsumed: number;

  /**
   * 兌換成台幣金額
   * @format int32
   */
  withdrawNt: number;
  status: "PROCESSING" | "PAYED" | "CANCELED";

  /** @format int32 */
  teacherId: number;

  /** 銀行名稱 */
  bankName: string;

  /** 分行名稱 */
  bankBranchName: string;

  /** 銀行帳號 */
  bankAccount: string;

  /** 戶名 */
  bankAccountName: string;

  /**
   * 存摺封面
   * @format int32
   */
  bankAccountPictureId: number;
}

export interface CreateQuestionChatMessageReq {
  content: string;
  fileIds: number[];
}

/**
 * 分頁
 */
export interface PagingRequest {
  /**
   * 頁次（從1開始）
   * @format int32
   */
  page: number;

  /**
   * 每頁數量
   * @format int32
   */
  pageSize: number;
}

export interface SearchQuestionChatMessageReq {
  /** @format int32 */
  idGreaterThan?: number;

  /** @format int32 */
  idLessThan?: number;

  /** 分頁 */
  paging: PagingRequest;

  /** 排序 */
  sorting?: SortingRequest;

  /** 排序(new) */
  sorts?: SortField[];
}

/**
 * 排序(new)
 */
export interface SortField {
  /** 排序方式 */
  sort?: "ASC" | "DESC";

  /** 排序欄位 */
  field?: string;
}

/**
 * 排序
 */
export interface SortingRequest {
  /** 排序方式 */
  sort: "ASC" | "DESC";

  /** 排序欄位 */
  sortFields: string[];
}

export interface PageDtoQuestionChatMessageDto {
  /** @format int32 */
  atPage: number;

  /** @format int32 */
  totalPages: number;
  items: QuestionChatMessageDto[];

  /** @format int64 */
  totalCount: number;
}

export interface TeacherSearchQuestionReq {
  category: "ANSWERABLE" | "ANSWERING" | "COMPLETE";

  /** 分頁 */
  paging: PagingRequest;

  /** 排序 */
  sorting?: SortingRequest;

  /** 排序(new) */
  sorts?: SortField[];
}

export interface PageDtoTeacherQuestionDto {
  /** @format int32 */
  atPage: number;

  /** @format int32 */
  totalPages: number;
  items: TeacherQuestionDto[];

  /** @format int64 */
  totalCount: number;
}

export interface TeacherQuestionDto {
  /** @format int32 */
  id: number;

  /** 問題編號 */
  uid: string;

  /** 文字內容 */
  content: string;

  /** 附件檔案編號 */
  attachmentFileIds: number[];

  /** 老師回答內容 */
  teacherAnswerContent?: string;

  /** 老師回答附件檔案編號 */
  teacherAnswerAttachmentFileIds: number[];

  /**
   * 科目分類編號
   * @format int32
   */
  subjectCategoryId: number;

  /**
   * 科目
   * @format int32
   */
  subjectId: number;

  /** 老師配對方式 */
  teacherMatchType: "MATCH" | "SPECIFY";

  /**
   * 指定老師編號
   * @format int32
   */
  teacherId?: number;

  /** 問題狀態 */
  status: "DRAFT" | "MATCHING" | "ANSWERING" | "ANSWERED" | "COMPLETE";

  /**
   * 發問時間
   * @format date-time
   */
  issueAt?: string;

  /**
   * 即時配對到期時間
   * @format date-time
   */
  matchExpireAt?: string;

  /**
   * 老師接受問題的時間
   * @format date-time
   */
  teacherApplyAt?: string;

  /**
   * 老師回答問題的時間
   * @format date-time
   */
  teacherAnswerAt?: string;

  /**
   * 指定老師到期時間
   * @format date-time
   */
  specifyTeacherExpireAt?: string;

  /**
   * 老師送出答案到期時間
   * @format date-time
   */
  teacherAnswerExpireAt?: string;

  /**
   * 學生完成題目到期時間
   * @format date-time
   */
  studentCompleteExpireAt?: string;

  /** @format date-time */
  studentCompleteAt?: string;

  /** @format int32 */
  reviewId?: number;

  /** @format int32 */
  lastChatMessageId?: number;

  /**
   * 老師完成問題可得金幣
   * @format int32
   */
  teacherWillRewardGold?: number;

  /** 老師是否已得到金幣 */
  teacherDidRewardGold?: boolean;
  hasChatMessage: boolean;
  lastChatMessage?: QuestionChatMessageDto;
  student?: StudentSimpleWithProfilePictureDto;
  attachmentFiles: FileDto[];
  subject?: OptionDto;
  subjectCategory?: OptionDto;
}

export interface PagingAndSortingRequest {
  /** 分頁 */
  paging: PagingRequest;

  /** 排序 */
  sorting?: SortingRequest;

  /** 排序(new) */
  sorts?: SortField[];
}

export interface NotificationMessageDto {
  /** @format int32 */
  id: number;

  /** @format date-time */
  createdAt: string;

  /** 訊息內容 */
  content: string;

  /** 關聯物件 */
  ref?: "QUESTION";

  /**
   * 關聯物件
   * @format int32
   */
  refId?: number;
}

export interface PageDtoNotificationMessageDto {
  /** @format int32 */
  atPage: number;

  /** @format int32 */
  totalPages: number;
  items: NotificationMessageDto[];

  /** @format int64 */
  totalCount: number;
}

export interface CheckPwdReq {
  pwd: string;
}

export interface IssuePhoneVerificationReq {
  phone: string;
}

export interface PhoneVerificationDto {
  validationToken: string;
}

export interface IssueEmailVerificationReq {
  email: string;
}

export interface EmailVerificationDto {
  validationToken: string;
}

export interface IssueFileUploadReq {
  name: string;
  contentType: string;

  /** @format int64 */
  size?: number;
  contentDisposition?: string;
}

export interface IssueFileUploadResult {
  /** @format int32 */
  id: number;
  uploadUrl: string;
}

export interface QuestionReviewForTeacherDto {
  /** @format date-time */
  createdAt: string;

  /** @format double */
  score: number;
  comment: string;
  tags: string[];
  student?: StudentSimpleWithProfilePictureDto;
}

export interface TeacherQuestionSummaryDto {
  /** @format int32 */
  answering: number;
}

export interface WebSocketUrlDto {
  wsUr: string;
}

export interface UserWalletDto {
  /**
   * 現有金幣
   * @format int32
   */
  currentGold: number;

  /**
   * 圈存中金幣
   * @format int32
   */
  reservedGold: number;
}

export interface UserWalletHistoryDto {
  /** @format date-time */
  updatedAt?: string;

  /** 異動事項 */
  updateReason: string;

  /**
   * 異動金額
   * @format int32
   */
  diff?: number;

  /** 異動關聯類型 */
  ref?: "GOLD_REDEEM" | "QUESTION" | "TEACHER_WITHDRAW" | "STUDENT_PROMOTE" | "TEACHER_PROMOTE";

  /**
   * 異動關聯編號
   * @format int32
   */
  refId?: number;
}

export interface EbookUrl {
  url: string;
}

export interface ApiErrorResponse {
  code: string;
  name: string;
  messages: string[];
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "https://sit-api.weclass.com.tw" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Project Class API - 老師
 * @version 1.0
 * @baseUrl https://sit-api.weclass.com.tw
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name GetWithdrawAccount
     * @summary getWithdrawAccount 取得提領帳號
     * @request GET:/api/t/withdraw/accounts/{accountId}
     * @secure
     */
    getWithdrawAccount: (accountId: number, params: RequestParams = {}) =>
      this.request<TeacherWithdrawAccountDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw/accounts/${accountId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name UpdateWithdrawAccount
     * @summary updateWithdrawAccount 更新提領帳號
     * @request PUT:/api/t/withdraw/accounts/{accountId}
     * @secure
     */
    updateWithdrawAccount: (accountId: number, data: TeacherSaveWithdrawAccountReq, params: RequestParams = {}) =>
      this.request<TeacherWithdrawAccountDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw/accounts/${accountId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name DeleteWithdrawAccount
     * @summary deleteWithdrawAccount 刪除提領帳號
     * @request DELETE:/api/t/withdraw/accounts/{accountId}
     * @secure
     */
    deleteWithdrawAccount: (accountId: number, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw/accounts/${accountId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name SetWithdrawAccountToDefault
     * @summary setWithdrawAccountToDefault 設定提領帳號為預設
     * @request PUT:/api/t/withdraw/accounts/{accountId}/default
     * @secure
     */
    setWithdrawAccountToDefault: (accountId: number, params: RequestParams = {}) =>
      this.request<TeacherWithdrawAccountDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw/accounts/${accountId}/default`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name RejectSpecifyQuestion
     * @summary rejectSpecifyQuestion 婉拒回答指定問題
     * @request PUT:/api/t/questions/{questionId}/rejectSpecify
     * @secure
     */
    rejectSpecifyQuestion: (questionId: number, params: RequestParams = {}) =>
      this.request<TeacherQuestionDetailDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}/rejectSpecify`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name ApplyQuestion
     * @summary applyQuestion 接受問題
     * @request PUT:/api/t/questions/{questionId}/apply
     * @secure
     */
    applyQuestion: (questionId: number, params: RequestParams = {}) =>
      this.request<TeacherQuestionDetailDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}/apply`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name AnswerQuestion
     * @summary answerQuestion 回答問題
     * @request PUT:/api/t/questions/{questionId}/answer
     * @secure
     */
    answerQuestion: (questionId: number, data: TeacherAnswerQuestionReq, params: RequestParams = {}) =>
      this.request<TeacherQuestionDetailDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}/answer`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationApi
     * @name TeacherUpdateNotificationRead
     * @summary teacherUpdateNotificationRead 更新通知已讀(老師)
     * @request PUT:/api/t/notifications/read
     * @secure
     */
    teacherUpdateNotificationRead: (params: RequestParams = {}) =>
      this.request<NotificationInfoDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/notifications/read`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name ChangePwd
     * @summary changePwd 更新密碼
     * @request PUT:/api/t/me/pwd
     * @secure
     */
    changePwd: (data: ChangePwdReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/pwd`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TearcherPreferenceApi
     * @name GetTeacherPreference
     * @summary getTeacherPreference 取得個人設定(老師)
     * @request GET:/api/t/me/preference/{category}
     * @secure
     */
    getTeacherPreference: (category: string, params: RequestParams = {}) =>
      this.request<UserPreferenceDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/preference/${category}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TearcherPreferenceApi
     * @name UpdateTeacherPreference
     * @summary updateTeacherPreference 更新個人設定(老師)
     * @request PUT:/api/t/me/preference/{category}
     * @secure
     */
    updateTeacherPreference: (category: string, data: SaveUserPreferenceReq, params: RequestParams = {}) =>
      this.request<UserPreferenceDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/preference/${category}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name CommitTeacherPhoneUpdate
     * @summary commitTeacherPhoneUpdate 更改電話
     * @request PUT:/api/t/me/phone
     * @secure
     */
    commitTeacherPhoneUpdate: (data: CommitPhoneUpdateReq, params: RequestParams = {}) =>
      this.request<TeacherProfileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/phone`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name UpdatePendingProfile
     * @summary updatePendingProfile 更新個人資訊(pending)
     * @request PUT:/api/t/me/pendingProfile
     * @secure
     */
    updatePendingProfile: (data: TeacherUpdatePendingProfileReq, params: RequestParams = {}) =>
      this.request<TeacherProfileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/pendingProfile`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name CommitTeacherEmailUpdate
     * @summary commitTeacherEmailUpdate 更改Email
     * @request PUT:/api/t/me/email
     * @secure
     */
    commitTeacherEmailUpdate: (data: CommitEmailUpdateReq, params: RequestParams = {}) =>
      this.request<TeacherProfileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/email`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name CommitProfile
     * @summary commitProfile 送出個人資料審核
     * @request PUT:/api/t/me/commitProfile
     * @secure
     */
    commitProfile: (params: RequestParams = {}) =>
      this.request<TeacherProfileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/commitProfile`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name UpdateActiveProfile
     * @summary updateActiveProfile 更新個人資訊(active)
     * @request PUT:/api/t/me/activeProfile
     * @secure
     */
    updateActiveProfile: (data: TeacherUpdateActiveProfileReq, params: RequestParams = {}) =>
      this.request<TeacherProfileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/activeProfile`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherFileApi
     * @name CommitUpload
     * @summary commitUpload 完成上傳照片
     * @request PUT:/api/t/file/{fileId}
     * @secure
     */
    commitUpload: (fileId: number, data: CommitFileUploadReq, params: RequestParams = {}) =>
      this.request<FileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/file/${fileId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name GetWithdrawList
     * @summary getWithdrawList 取得提領紀錄
     * @request GET:/api/t/withdraw
     * @secure
     */
    getWithdrawList: (params: RequestParams = {}) =>
      this.request<TeacherWithdrawDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name CreateWithdraw
     * @summary createWithdraw 新增提領
     * @request POST:/api/t/withdraw
     * @secure
     */
    createWithdraw: (data: TeacherCreateWithdrawReq, params: RequestParams = {}) =>
      this.request<TeacherWithdrawDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name GetWithdrawAccounts
     * @summary getWithdrawAccounts 取得提領帳號設定清單
     * @request GET:/api/t/withdraw/accounts
     * @secure
     */
    getWithdrawAccounts: (params: RequestParams = {}) =>
      this.request<TeacherWithdrawAccountDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw/accounts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherWithdrawApi
     * @name CreateWithdrawAccount
     * @summary createWithdrawAccount 新增提領帳號
     * @request POST:/api/t/withdraw/accounts
     * @secure
     */
    createWithdrawAccount: (data: TeacherSaveWithdrawAccountReq, params: RequestParams = {}) =>
      this.request<TeacherWithdrawAccountDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/withdraw/accounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name CreateQuestionChatMessage
     * @summary createQuestionChatMessage 送出問題對話訊息
     * @request POST:/api/t/questions/{questionId}/chat
     * @secure
     */
    createQuestionChatMessage: (questionId: number, data: CreateQuestionChatMessageReq, params: RequestParams = {}) =>
      this.request<QuestionChatMessageDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}/chat`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name SearchQuestionChatMessages
     * @summary searchQuestionChatMessages 查詢問題對話訊息
     * @request POST:/api/t/questions/{questionId}/chat/search
     * @secure
     */
    searchQuestionChatMessages: (questionId: number, data: SearchQuestionChatMessageReq, params: RequestParams = {}) =>
      this.request<PageDtoQuestionChatMessageDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}/chat/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name SearchQuestions
     * @summary searchQuestions 查詢問題
     * @request POST:/api/t/questions/search
     * @secure
     */
    searchQuestions: (data: TeacherSearchQuestionReq, params: RequestParams = {}) =>
      this.request<PageDtoTeacherQuestionDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationApi
     * @name TeacherSearchNotifications
     * @summary teacherSearchNotifications 查詢通知訊息(老師)
     * @request POST:/api/t/notifications/search
     * @secure
     */
    teacherSearchNotifications: (data: PagingAndSortingRequest, params: RequestParams = {}) =>
      this.request<PageDtoNotificationMessageDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/notifications/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationApi
     * @name TeacherGetNotificationInfo
     * @summary teacherGetNotificationInfo 查詢通知狀態(老師)
     * @request POST:/api/t/notifications/info
     * @secure
     */
    teacherGetNotificationInfo: (params: RequestParams = {}) =>
      this.request<NotificationInfoDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/notifications/info`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name CheckPwd
     * @summary checkPwd 檢查密碼
     * @request POST:/api/t/me/pwd/check
     * @secure
     */
    checkPwd: (data: CheckPwdReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/pwd/check`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name NewPhoneVerify
     * @summary newPhoneVerify 寄送電話驗證碼
     * @request POST:/api/t/me/phone/newVerify
     * @secure
     */
    newPhoneVerify: (data: IssuePhoneVerificationReq, params: RequestParams = {}) =>
      this.request<PhoneVerificationDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/phone/newVerify`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name NewEmailVerify
     * @summary newEmailVerify 寄送Email驗證碼
     * @request POST:/api/t/me/email/newVerify
     * @secure
     */
    newEmailVerify: (data: IssueEmailVerificationReq, params: RequestParams = {}) =>
      this.request<EmailVerificationDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/email/newVerify`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherFileApi
     * @name IssueUpload
     * @summary issueUpload 請求上傳照片
     * @request POST:/api/t/file
     * @secure
     */
    issueUpload: (data: IssueFileUploadReq, params: RequestParams = {}) =>
      this.request<IssueFileUploadResult, { code: string; name: string; messages: string[] }>({
        path: `/api/t/file`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name GetQuestionDetail
     * @summary getQuestionDetail 取得問題內容
     * @request GET:/api/t/questions/{questionId}
     * @secure
     */
    getQuestionDetail: (questionId: number, params: RequestParams = {}) =>
      this.request<TeacherQuestionDetailDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name GetQuestionReview
     * @summary getQuestionReview 取得問題評價
     * @request GET:/api/t/questions/{questionId}/review
     * @secure
     */
    getQuestionReview: (questionId: number, params: RequestParams = {}) =>
      this.request<QuestionReviewForTeacherDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/${questionId}/review`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name GetQuestionSummary
     * @summary getQuestionSummary 取得問題統計
     * @request GET:/api/t/questions/summary
     * @secure
     */
    getQuestionSummary: (params: RequestParams = {}) =>
      this.request<TeacherQuestionSummaryDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/summary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherQuestionApi
     * @name GetQuestionsSpecifyToMe
     * @summary getQuestionsSpecifyToMe 取得指定老師回答的問題
     * @request GET:/api/t/questions/specifyToMe
     * @secure
     */
    getQuestionsSpecifyToMe: (params: RequestParams = {}) =>
      this.request<TeacherQuestionDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/t/questions/specifyToMe`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name Me
     * @summary me 取得個人資訊
     * @request GET:/api/t/me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.request<TeacherProfileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WebSocketApi
     * @name GetWebSocketUrlForTeacher
     * @summary getWebSocketUrlForTeacher 取得WebSocket連線URL
     * @request GET:/api/t/me/webSocket
     * @secure
     */
    getWebSocketUrlForTeacher: (params: RequestParams = {}) =>
      this.request<WebSocketUrlDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/webSocket`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name GetWallet
     * @summary getWallet 取得錢包資訊
     * @request GET:/api/t/me/wallet
     * @secure
     */
    getWallet: (params: RequestParams = {}) =>
      this.request<UserWalletDto, { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/wallet`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherProfileApi
     * @name GetWalletHistory
     * @summary getWalletHistory 取得錢包歷史資訊
     * @request GET:/api/t/me/wallet/history
     * @secure
     */
    getWalletHistory: (params: RequestParams = {}) =>
      this.request<UserWalletHistoryDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/t/me/wallet/history`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherEbookApi
     * @name GetEbookUrl
     * @summary getEbookUrl 取得Ebook網址
     * @request GET:/api/t/ebook/url
     * @secure
     */
    getEbookUrl: (params: RequestParams = {}) =>
      this.request<EbookUrl, { code: string; name: string; messages: string[] }>({
        path: `/api/t/ebook/url`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
