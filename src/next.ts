// lib/next-build-info-plugin.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

import type { Compiler } from 'webpack';
import { getConsoleLogAndConsole } from './utils/log';

interface BuildInfoOptions {
  outputPath: string;
  enableLog: boolean;
}

class NextBuildInfoPlugin {
  options: BuildInfoOptions;

  constructor(options: Partial<BuildInfoOptions> = {}) {
    this.options = {
      outputPath: options?.outputPath || "build-info.json", // 默认输出文件路径
      enableLog: options?.enableLog ?? true, // 是否在控制台打印
    };
  }

  apply(compiler: Compiler) {
    // 只在生产环境中运行
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    // npm_lifecycle_event
    const npm_lifecycle_event = process.env.npm_lifecycle_event || "build:未知";
    //
    const mode = npm_lifecycle_event.split(":")?.[1] || "未知"; 
    const { buildInfo , consoleStr} = getConsoleLogAndConsole(mode);
    // 在编译完成后执行
    compiler.hooks.done.tap("NextBuildInfoPlugin", () => {
      try {

        const nodeVersion = process.version;

       

        // 将构建信息写入文件
        const outputPath = path.resolve(compiler.options.output.path, this.options.outputPath);
        // 如果不存在则创建
        if (!fs.existsSync(path.dirname(outputPath))) {
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }
        fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2));

        // 在控制台打印构建信息
        if (this.options.enableLog) {
          console.log("Build Information:");
          console.log("------------------");
          console.log("Version:", buildInfo.version);
          console.log("Build Time:", buildInfo.buildTime);
          console.log("Commit Hash:", buildInfo.abbreviatedSha);
          console.log("Branch Name:", buildInfo.branchName);
          console.log("Commit Message:", buildInfo.commitMessage);
          console.log("Node Version:", nodeVersion);
          console.log("------------------");
        }
      } catch (error) {
        console.error("Error generating build info:", error);
      }
    });

    

    // 动态注入构建信息到客户端代码中
    const buildInfoCode = `
      if (typeof window !== 'undefined') {
        ${consoleStr}
      }
    `;

    // 使用 Webpack 插件将构建信息注入到客户端代码中
    // todo: 优化 知道添加到那个文件中
    new webpack.NormalModuleReplacementPlugin(/virtual-build-info/, (resource: any) => {
      resource.request = path.resolve(__dirname, "virtual-build-info.js");
      resource.resource = path.resolve(__dirname, "virtual-build-info.js");
      fs.writeFileSync(resource.resource, buildInfoCode);
    }).apply(compiler);
  }
}

export default NextBuildInfoPlugin;
