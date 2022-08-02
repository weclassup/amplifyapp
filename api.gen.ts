//@ts-ignore
const { generateApi } = require("swagger-typescript-api");
const path = require("path");

generateApi({
  name: "teacher.api.ts",
  output: path.resolve(__dirname, "./src/api/"),
  url: "https://sit-api.weclass.com.tw/v3/api-docs/%E8%80%81%E5%B8%AB",
  httpClientType: "axios",
  hooks: {
    onFormatRouteName: function (_: any, templateRouteName: string) {
      return templateRouteName.replace(/[\d]$/, "");
    },
  },
});

generateApi({
  name: "public.api.ts",
  output: path.resolve(__dirname, "./src/api/"),
  url: "https://sit-api.weclass.com.tw/v3/api-docs/Public",
  httpClientType: "axios",
  hooks: {
    onFormatRouteName: function (_: any, templateRouteName: string) {
      return templateRouteName.replace(/[\d]$/, "");
    },
  },
});
