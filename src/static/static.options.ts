import { DropdownOption } from "@methodstudio/class-component-module";

import { OptionDto, SysConfigDto } from "@api/public.api";
import { TeacherQuestionDto, TeacherWithdrawDto } from "@api/teacher.api";

interface StaticOptionItem<K extends string> {
  key: K;
  label: string;
  active?: boolean;
}

export const systemConfigEnum: Partial<
  Record<SysConfigDto["configValueType"], string>
> = {
  MINUTE: "分鐘",
  HOUR: "小時",
};

export const questionStatueEnum: Record<TeacherQuestionDto["status"], string> =
  {
    DRAFT: "草稿",
    MATCHING: "等待配對",
    ANSWERING: "等待回答",
    ANSWERED: "已回答",
    COMPLETE: "已完成",
  };

export const matchTypeEnum: Record<
  TeacherQuestionDto["teacherMatchType"],
  string
> = {
  MATCH: "即時安排在線老師",
  SPECIFY: "指定老師",
};

export const getDropdownOptionsFromServerOptions = (
  serverOptions: OptionDto[]
): DropdownOption[] =>
  serverOptions.map(({ id, name }) => ({
    key: id,
    label: name,
  }));

export const genderOptions: StaticOptionItem<Gender>[] = [
  { key: "MALE", label: "男" },
  { key: "FEMALE", label: "女" },
];

export const GenderEnum: Record<Gender, string> = {
  MALE: "男",
  FEMALE: "女",
  OTHER: "其他",
};

export const WithdrawStatusEnum: Record<TeacherWithdrawDto["status"], string> =
  {
    PROCESSING: "申請中",
    CANCELED: "退回",
    PAYED: "已完成",
  };
