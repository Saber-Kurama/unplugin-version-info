import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { getConsoleLogString } from "./utils/log";

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-version-info",
  transformInclude(id) {
    return id.endsWith(options?.filename || "index.html");
  },
  transform(code) {
    console.log("this", this);
    return code.replace("</head>", `${getConsoleLogString()}</head>`);
  },
}));
