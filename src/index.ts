import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { getConsoleLogString } from "./utils/log";

let isWebpack = false;
let isBuild = false;
let buildMode = "未知";

export default createUnplugin<Options | undefined>(
  (options = { isCoding: true }) => ({
    name: "unplugin-version-info",
    transformInclude(id) {
      if (isWebpack) {
        return false;
      }
      // todo: 如何解决包含其他目录的 index.html 但是不是项目中的入口
      // 1. 默认就这几个文件[]
      return id.endsWith(options?.filename || "index.html");
    },
    transform(code) {
      // todo 如何 让代码不走 html-loader
      if (isWebpack && !isBuild) {
        return code;
      }
      return code.replace("</head>", `${getConsoleLogString(options, buildMode)}</head>`);
    },
    vite: {
      apply(_, config) {
        buildMode = config.mode;
        if (config.command === "serve") return false;
        if (config.command === "build") return true;
        return false;
      },
    },
    webpack(compiler) {
      isWebpack = true;
      isBuild = process.argv.includes("build");
      // @ts-expect-error VUE_CLI_SERVICE vue-cli 
      if (process?.VUE_CLI_SERVICE?.mode) {
        // @ts-expect-error VUE_CLI_SERVICE vue-cli 
        buildMode = process.VUE_CLI_SERVICE.mode;
      } else { 
        // todo: 从process.argv中获取 mode

      }
      // todo: 还没有配置
      const HtmlWebpackPlugin: any = compiler.options.plugins
        .map(({ constructor }) => constructor)
        .find(
          (constructor) =>
            constructor && constructor.name === "HtmlWebpackPlugin"
        );
      compiler.hooks.compilation.tap(
        "unplugin-version-info",
        (compilation, compilationParams) => {
          HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
            "unplugin-version-info",
            (data: any, cb: any) => {
              if (isBuild) {
                data.html = data.html.replace(
                  "</head>",
                  `\n${getConsoleLogString(options, buildMode)}\n</head>`
                );
                cb(null, data);
              } else {
                cb(null, data);
              }
            }
          );
        }
      );
    },
  })
);
