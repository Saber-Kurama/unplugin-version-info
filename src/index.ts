import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { getConsoleLogString } from "./utils/log";

let isWebpack = false;
let isBuild = false;

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-version-info",
  transformInclude(id) {
    return id.endsWith(options?.filename || "index.html");
  },
  transform(code) {
    if (isWebpack && !isBuild) {
      return code;
    }
    return code.replace("</head>", `${getConsoleLogString()}</head>`);
  },
  vite: {
    apply(_, { command }) {
      if (command === "serve") return false;
      if (command === "build") return true;
      return false;
    },
  },
  webpack(compiler) {
    isWebpack = true;
    isBuild = process.argv.includes("build");
  },
}));
