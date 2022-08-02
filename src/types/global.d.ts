import { TeacherQuestionDto, TeacherSearchQuestionReq } from "@api/teacher.api";

export {};

declare global {
  interface SearchOptions<K extends Record<string, any> = {}> {
    paging: {
      page: number;
      pageSize: number;
    };
    sorting?: {
      sort: "ASC" | "DESC";
      sortFields: DeepKeyof<K>[];
    };
    sorts?: {
      field?: DeepKeyof<K>;
      sort?: "ASC" | "DESC";
    }[];
  }

  // interface PageDto<Item extends Record<string, any>> {
  //   atPage: number;
  //   items: Item[];
  //   totalCount: number;
  //   totalPages: number;
  // }

  interface SearchTeacherQuestionOption
    extends Pick<TeacherSearchQuestionReq, "category">,
      SearchOptions<TeacherQuestionDto> {}
}
