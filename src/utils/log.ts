import { getPkg } from "./pkg";
import { getRepoInfoFn } from "./repo";

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
  const hours = date_ob.getHours();

  // current minutes
  const minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();
  return `${year}-${month}-${date} ${hours}:${minutes}: ${seconds}`;
};

export const getConsoleLogString = () => {
  const pkg: any = getPkg();
  const repoInfo = getRepoInfoFn();
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
