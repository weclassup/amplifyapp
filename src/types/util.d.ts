export {};

declare global {
  type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
    ...args: any
  ) => Promise<infer R>
    ? R
    : any;
  // type DeepPartial<T extends Record<string, any>> = {
  //   [P in keyof T]?: DeepPartial<T[P]>;
  // };
  // type PickPartialOrRequired<O, P extends keyof O, R extends keyof O> = Partial<
  //   {
  //     [PK in P]-?: O[PK] | undefined | null;
  //   }
  // > &
  //   {
  //     [RK in R]: NonNullable<O[RK]>;
  //   };
  //
  // type ExtractItemFromPageItemArray<P extends PageDto<any>> =
  //   P["items"][number];
  // type PickPartialOrRequired<O, P extends keyof O, R extends keyof O> = {
  //   [PK in P]-?: O[PK] | undefined | null;
  // } &
  //   {
  //     [RK in R]: NonNullable<O[RK]>;
  //   };
}
