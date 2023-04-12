import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { getConsoleLogString } from "./utils/log";

let isWebpack = false;
let isBuild = false;

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-version-info",
  transformInclude(id) {
    if (isWebpack) {
      return false;
    }
    return id.endsWith(options?.filename || "index.html");
  },
  transform(code) {
    // todo 如何 让代码不走 html-loader
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
    const HtmlWebpackPlugin: any = compiler.options.plugins
      .map(({ constructor }) => constructor)
      .find(
        (constructor) => constructor && constructor.name === "HtmlWebpackPlugin"
      );
    compiler.hooks.compilation.tap(
      "unplugin-version-info",
      (compilation, compilationParams) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          "unplugin-version-info",
          (data: any, cb: any) => {
            data.html = data.html.replace(
              "</head>",
              `\n${getConsoleLogString()}\n</head>`
            );
            cb(null, data);
          }
        );
      }
    );
  },
}));
