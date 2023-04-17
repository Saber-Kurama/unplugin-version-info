import { Options } from "../types";
import { getPkg } from "./pkg";
import { getRepoInfoFn } from "./repo";
import { getCodingInfo } from "./codingnet";

const getDateStr = () => {
  const date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  const date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  const year = date_ob.getFullYear();

  // current hours
  const hours = ("0" + date_ob.getHours()).slice(-2);

  // current minutes
  const minutes = ("0" + date_ob.getMinutes()).slice(-2);

  // current seconds
  let seconds = ("0" + date_ob.getSeconds()).slice(-2);
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export const getConsoleLogString = (options: Options) => {
  const pkg: any = getPkg();
  let repoInfo: {
    branch: string;
    abbreviatedSha: string;
    commitMessage: string;
  } = {
    branch: "",
    abbreviatedSha: "",
    commitMessage: "",
  };
  if (options.isCoding) {
    repoInfo = getRepoInfoFn();
  } else {
    repoInfo = getRepoInfoFn();
  }
  const colorStr = "#e0005a";
  return (
    "<script>" +
    `console.group('%c${
      pkg.name || "数势"
    }项目信息', 'background-color: ${colorStr}; color: #ffffff ; font-weight: bold ; padding: 4px ;');` +
    "console.groupEnd();" +
    `console.log('%c构建时间: ${getDateStr()},版本: ${
      pkg.version || ""
    }', 'color:  ${colorStr}');` +
    `console.log('%c构建分支: ${
      repoInfo.branch || ""
    }', 'color:  ${colorStr}');` +
    `console.log('%c构建abbreviatedSha: ${
      repoInfo.abbreviatedSha || ""
    }', 'color:  ${colorStr}');` +
    `console.log('%c提交message: ${
      repoInfo.commitMessage || ""
    }', 'color:  ${colorStr}');` +
    "</script>"
    // `\n`
  );
  // 多行字符串 会报错
  // return `
  // <script>console.log('name111')</script>
  // `;
};
