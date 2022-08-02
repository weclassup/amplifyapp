import { teacherClassAPI } from "@methodstudio/class-component-module";

import { Api as PublicAPIInstance } from "@api/public.api";
import { Api as TeacherAPIInstance } from "@api/teacher.api";

const Teacher = new TeacherAPIInstance();
const Public = new PublicAPIInstance();
Teacher.instance = teacherClassAPI;
Public.instance = teacherClassAPI;

export const TeacherApi = Teacher.api;
export const PublicApi = Public.api;
