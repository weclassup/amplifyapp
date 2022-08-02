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

export interface CommitFileUploadReq {
  relateType?: "STUDENT" | "ADM_SUMMARY_REPORT";

  /** @format int32 */
  relateTypeId?: number;
}

export interface TeacherCommitFileUploadInSignUpReq {
  emailValidationCode: string;
  emailValidationToken: string;
  phoneValidationCode: string;
  phoneValidationToken: string;
  commitFileUploadReq: CommitFileUploadReq;
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

export interface CommitResetPwdReq {
  token: string;
  pwd: string;
}

export interface VerifyTokenReq {
  code: string;
  validationToken: string;
}

export interface TeacherSignupPhoneVerificationReq {
  phone: string;
  emailValidationToken: string;
  emailValidationCode: string;
}

export interface TeacherSignupPhoneVerificationDto {
  phoneValidationToken: string;
}

export interface SearchOptionsReq {
  optionKey:
    | "SUBJECT"
    | "SUBJECT_CATEGORY"
    | "LEARN_PHASE"
    | "LEARN_PHASE_GRADE"
    | "DEGREE"
    | "SCHOOL"
    | "SCHOOL_DEPARTMENT"
    | "CITY";
  parentIds: number[];
  keyword?: string;
}

export interface OptionDto {
  /** @format int32 */
  id: number;
  name: string;
}

export interface SearchOptionsWithChildrenReq {
  optionKey:
    | "SUBJECT"
    | "SUBJECT_CATEGORY"
    | "LEARN_PHASE"
    | "LEARN_PHASE_GRADE"
    | "DEGREE"
    | "SCHOOL"
    | "SCHOOL_DEPARTMENT"
    | "CITY";
  childOptionKey:
    | "SUBJECT"
    | "SUBJECT_CATEGORY"
    | "LEARN_PHASE"
    | "LEARN_PHASE_GRADE"
    | "DEGREE"
    | "SCHOOL"
    | "SCHOOL_DEPARTMENT"
    | "CITY";
}

export interface OptionWithChildrenDto {
  /** @format int32 */
  id: number;
  name: string;
  children: OptionDto[];
}

export interface TeacherSignupEmailVerificationReq {
  email: string;
}

export interface TeacherSignupEmailVerificationDto {
  validationToken: string;
}

export interface StudentSignupEmailVerificationReq {
  email: string;
}

export interface StudentSignupEmailVerificationDto {
  validationToken: string;
}

export interface SearchSysConfigReq {
  ids: (
    | "TEACHER_ANSWER_EXPIRATION"
    | "MATCH_EXPIRATION"
    | "SPECIFY_TEACHER_EXPIRATION_OPTION_1"
    | "SPECIFY_TEACHER_EXPIRATION_OPTION_2"
    | "STUDENT_COMPLETE_QUESTION_EXPIRATION"
    | "TEACHER_QUIZ_LINK"
    | "TEACHER_GOLD_EXCHANGE_RATE_GOLD"
    | "TEACHER_GOLD_EXCHANGE_RATE_NT"
    | "TEACHER_GOLD_WITHDRAW_MIN"
    | "TEACHER_PROMOTE_REWARD"
    | "STUDENT_PROMOTE_REWARD"
  )[];
}

export interface SysConfigDto {
  id:
    | "TEACHER_ANSWER_EXPIRATION"
    | "MATCH_EXPIRATION"
    | "SPECIFY_TEACHER_EXPIRATION_OPTION_1"
    | "SPECIFY_TEACHER_EXPIRATION_OPTION_2"
    | "STUDENT_COMPLETE_QUESTION_EXPIRATION"
    | "TEACHER_QUIZ_LINK"
    | "TEACHER_GOLD_EXCHANGE_RATE_GOLD"
    | "TEACHER_GOLD_EXCHANGE_RATE_NT"
    | "TEACHER_GOLD_WITHDRAW_MIN"
    | "TEACHER_PROMOTE_REWARD"
    | "STUDENT_PROMOTE_REWARD";
  configValue: string;
  configValueType: "MINUTE" | "HOUR" | "LINK" | "NUMBER";
}

export interface TeacherCompleteSignUpReq {
  emailValidationCode: string;
  emailValidationToken: string;
  phoneValidationCode: string;
  phoneValidationToken: string;

  /** @pattern ^(?=.*?[a-zA-Z])(?=.*?[0-9])[0-9a-zA-Z#?!@$%^&*-.]{8,20}$ */
  pwd: string;
  signupSource?: "CLASS" | "EBOOK";

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

  /** 推薦碼 */
  promoteCode?: string;
}

export interface CompleteSignUpResult {
  token: string;
}

export interface IssueFileUploadReq {
  name: string;
  contentType: string;

  /** @format int64 */
  size?: number;
  contentDisposition?: string;
}

export interface TeacherIssueFileUploadInSignUpReq {
  emailValidationCode: string;
  emailValidationToken: string;
  phoneValidationCode: string;
  phoneValidationToken: string;
  issueFileUploadReq: IssueFileUploadReq;
}

export interface IssueFileUploadResult {
  /** @format int32 */
  id: number;
  uploadUrl: string;
}

export interface TeacherSignInReq {
  email: string;
  pwd: string;
}

export interface SignInResult {
  token: string;
}

export interface ForgetPwdReq {
  email: string;
  ebook?: boolean;
}

export interface StudentCompleteSignUpReq {
  phone?: string;

  /** 姓氏 */
  surName: string;

  /** 名字 */
  givenName: string;

  /** 暱稱 */
  nickName: string;

  /** 性別 */
  gender: "MALE" | "FEMALE" | "OTHER";

  /**
   * 生日
   * @format date-time
   */
  birthday: string;

  /** 家長代表 */
  parentName: string;

  /**
   * 學習階段
   * @format int32
   */
  learnPhaseId?: number;

  /**
   * 年級
   * @format int32
   */
  learnPhaseGradeId?: number;

  /**
   * 學校縣市
   * @format int32
   */
  schoolCityId?: number;

  /**
   * 就讀學校
   * @format int32
   */
  schoolId?: number;

  /** 學校(自行輸入) */
  customSchoolName?: string;
  signupSource?: "CLASS" | "EBOOK";

  /** 密碼 */
  pwd: string;

  /** 發送Email驗證時拿到的Token */
  validationToken: string;

  /** 驗證碼 */
  validationCode: string;

  /** 推薦碼 */
  promoteCode?: string;
}

export interface StudentSignInReq {
  email: string;
  pwd: string;
}

export interface AdmIssueAuthReq {
  email: string;
}

export interface AdmIssueAuthRes {
  validationToken: string;
}

export interface QuestionNotificationMessage {
  /** @format int32 */
  questionId: number;
}

export interface QuestionChatNewMessage {
  /** @format int32 */
  questionId: number;
}

export interface CheckPromoteCodeReq {
  promoteCode: string;
}

export interface CheckPromoteCodeRes {
  valid: boolean;
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://sit-api.weclass.com.tw" });
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
 * @title Project Class API - Public
 * @version 1.0
 * @baseUrl http://sit-api.weclass.com.tw
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags TeacherAuthApi
     * @name CommitUploadInSignUp
     * @summary commitUploadInSignUp 完成上傳照片(註冊流程)
     * @request PUT:/api/p/auth/teacher/signUp/file/{fileId}
     */
    commitUploadInSignUp: (fileId: number, data: TeacherCommitFileUploadInSignUpReq, params: RequestParams = {}) =>
      this.request<FileDto, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/teacher/signUp/file/${fileId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherAuthApi
     * @name CommitPwdReset
     * @summary commitPwdReset 重設密碼
     * @request PUT:/api/p/auth/teacher/commitPwdReset
     */
    commitPwdReset: (data: CommitResetPwdReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/teacher/commitPwdReset`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags StudentAuthApi
     * @name CommitPwdReset2
     * @summary commitPwdReset 重設密碼
     * @request PUT:/api/p/auth/student/commitPwdReset
     * @originalName commitPwdReset
     * @duplicate
     */
    commitPwdReset2: (data: CommitResetPwdReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/student/commitPwdReset`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PhoneValidationApi
     * @name VerifyCode
     * @summary verifyCode 驗證簡訊驗證碼
     * @request POST:/api/p/phoneValidation/verify
     */
    verifyCode: (data: VerifyTokenReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/p/phoneValidation/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PhoneValidationApi
     * @name IssueTeacherSignup
     * @summary issueTeacherSignup 發送簡訊驗證碼（老師）
     * @request POST:/api/p/phoneValidation/teacher
     */
    issueTeacherSignup: (data: TeacherSignupPhoneVerificationReq, params: RequestParams = {}) =>
      this.request<TeacherSignupPhoneVerificationDto, { code: string; name: string; messages: string[] }>({
        path: `/api/p/phoneValidation/teacher`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SystemOptionApi
     * @name SearchOptions
     * @summary searchOptions 查詢下拉選單
     * @request POST:/api/p/options/search
     */
    searchOptions: (data: SearchOptionsReq, params: RequestParams = {}) =>
      this.request<OptionDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/p/options/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SystemOptionApi
     * @name SearchOptionsWithChildren
     * @summary searchOptionsWithChildren 查詢下拉選單(包含Children)
     * @request POST:/api/p/options/search/withChildren
     */
    searchOptionsWithChildren: (data: SearchOptionsWithChildrenReq, params: RequestParams = {}) =>
      this.request<OptionWithChildrenDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/p/options/search/withChildren`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailValidationApi
     * @name VerifyCode2
     * @summary verifyCode 驗證Email驗證碼
     * @request POST:/api/p/emailValidation/verify
     * @originalName verifyCode
     * @duplicate
     */
    verifyCode2: (data: VerifyTokenReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/p/emailValidation/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailValidationApi
     * @name IssueTeacherSignup2
     * @summary issueTeacherSignup 發送Email驗證碼（老師）
     * @request POST:/api/p/emailValidation/teacher
     * @originalName issueTeacherSignup
     * @duplicate
     */
    issueTeacherSignup2: (data: TeacherSignupEmailVerificationReq, params: RequestParams = {}) =>
      this.request<TeacherSignupEmailVerificationDto, { code: string; name: string; messages: string[] }>({
        path: `/api/p/emailValidation/teacher`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailValidationApi
     * @name IssueStudentSignup
     * @summary issueStudentSignup 發送Email驗證碼（學生）
     * @request POST:/api/p/emailValidation/student
     */
    issueStudentSignup: (data: StudentSignupEmailVerificationReq, params: RequestParams = {}) =>
      this.request<StudentSignupEmailVerificationDto, { code: string; name: string; messages: string[] }>({
        path: `/api/p/emailValidation/student`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SystemConfigApi
     * @name SearchConfigs
     * @summary searchConfigs 查詢系統設定
     * @request POST:/api/p/configs/search
     */
    searchConfigs: (data: SearchSysConfigReq, params: RequestParams = {}) =>
      this.request<SysConfigDto[], { code: string; name: string; messages: string[] }>({
        path: `/api/p/configs/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherAuthApi
     * @name SignUp
     * @summary signUp 完成註冊
     * @request POST:/api/p/auth/teacher/signUp
     */
    signUp: (data: TeacherCompleteSignUpReq, params: RequestParams = {}) =>
      this.request<CompleteSignUpResult, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/teacher/signUp`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherAuthApi
     * @name IssueUploadInSignUp
     * @summary issueUploadInSignUp 請求上傳照片(註冊流程)
     * @request POST:/api/p/auth/teacher/signUp/file
     */
    issueUploadInSignUp: (data: TeacherIssueFileUploadInSignUpReq, params: RequestParams = {}) =>
      this.request<IssueFileUploadResult, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/teacher/signUp/file`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherAuthApi
     * @name SignIn
     * @summary signIn 登入
     * @request POST:/api/p/auth/teacher/signIn
     */
    signIn: (data: TeacherSignInReq, params: RequestParams = {}) =>
      this.request<SignInResult, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/teacher/signIn`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TeacherAuthApi
     * @name ForgetPwd
     * @summary forgetPwd 忘記密碼
     * @request POST:/api/p/auth/teacher/forgetPwd
     */
    forgetPwd: (data: ForgetPwdReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/teacher/forgetPwd`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags StudentAuthApi
     * @name SignUp2
     * @summary signUp 完成註冊
     * @request POST:/api/p/auth/student/signUp
     * @originalName signUp
     * @duplicate
     */
    signUp2: (data: StudentCompleteSignUpReq, params: RequestParams = {}) =>
      this.request<CompleteSignUpResult, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/student/signUp`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StudentAuthApi
     * @name SignIn2
     * @summary signIn 登入
     * @request POST:/api/p/auth/student/signIn
     * @originalName signIn
     * @duplicate
     */
    signIn2: (data: StudentSignInReq, params: RequestParams = {}) =>
      this.request<SignInResult, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/student/signIn`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StudentAuthApi
     * @name ForgetPwd2
     * @summary forgetPwd 忘記密碼
     * @request POST:/api/p/auth/student/forgetPwd
     * @originalName forgetPwd
     * @duplicate
     */
    forgetPwd2: (data: ForgetPwdReq, params: RequestParams = {}) =>
      this.request<void, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/student/forgetPwd`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AdmAuthApi
     * @name ValidateAuth
     * @summary validateAuth 管理後台驗證碼登入
     * @request POST:/api/p/auth/adm/validate
     */
    validateAuth: (data: VerifyTokenReq, params: RequestParams = {}) =>
      this.request<SignInResult, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/adm/validate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AdmAuthApi
     * @name IssueAuth
     * @summary issueAuth 發送Email驗證碼(管理後台)
     * @request POST:/api/p/auth/adm/issue
     */
    issueAuth: (data: AdmIssueAuthReq, params: RequestParams = {}) =>
      this.request<AdmIssueAuthRes, { code: string; name: string; messages: string[] }>({
        path: `/api/p/auth/adm/issue`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WsEventDemoApi
     * @name DemoQuestionNotificationMessage
     * @summary demoQuestionNotificationMessage (DEMO) WS Event action = QUESTION_NOTIFICATION
     * @request GET:/api/p/wsEvent/QUESTION_NOTIFICATION
     */
    demoQuestionNotificationMessage: (params: RequestParams = {}) =>
      this.request<QuestionNotificationMessage, { code: string; name: string; messages: string[] }>({
        path: `/api/p/wsEvent/QUESTION_NOTIFICATION`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WsEventDemoApi
     * @name DemoQuestionChatNewMessage
     * @summary demoQuestionChatNewMessage (DEMO) WS Event action = QUESTION_CHAT_NEW_MESSAGE
     * @request GET:/api/p/wsEvent/QUESTION_CHAT_NEW_MESSAGE
     */
    demoQuestionChatNewMessage: (params: RequestParams = {}) =>
      this.request<QuestionChatNewMessage, { code: string; name: string; messages: string[] }>({
        path: `/api/p/wsEvent/QUESTION_CHAT_NEW_MESSAGE`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PubPromoteCodeApi
     * @name Check
     * @summary check 檢查推薦碼是否有效
     * @request GET:/api/p/promoteCode/check
     */
    check: (query: { req: CheckPromoteCodeReq }, params: RequestParams = {}) =>
      this.request<CheckPromoteCodeRes, { code: string; name: string; messages: string[] }>({
        path: `/api/p/promoteCode/check`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
