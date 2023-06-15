import { Options } from '../types';
import { getPkg } from './pkg';
import { getRepoInfoFn } from './repo';
import { getCodingInfo } from './codingnet';

const getDateStr = () => {
  const date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  const date = ('0' + date_ob.getDate()).slice(-2);

  // current month
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  const year = date_ob.getFullYear();

  // current hours
  const hours = ('0' + date_ob.getHours()).slice(-2);

  // current minutes
  const minutes = ('0' + date_ob.getMinutes()).slice(-2);

  // current seconds
  let seconds = ('0' + date_ob.getSeconds()).slice(-2);
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export const getConsoleLogString = (options: Options) => {
  const pkg: any = getPkg();
  let repoInfo: {
    branch: string;
    abbreviatedSha: string;
    commitMessage: string;
  } = getCodingInfo();
  if (!repoInfo.branch || repoInfo.branch === '$GIT_BRANCH') {
    repoInfo = getRepoInfoFn();
  }
  // todo: 内置判断 是否是 isCoding 而非参数 .merge
  const colorStr = '#e0005a';
  return (
    // "<script>" +
    // `console.group('%c${
    //   pkg.name || "数势"
    // }项目信息', 'background-color: ${colorStr}; color: #ffffff ; font-weight: bold ; padding: 4px ;');` +
    // `console.log('%c构建时间: ${getDateStr()}', 'color:  ${colorStr}');` +
    // `console.log('%c构建版本: ${pkg.version || ""}', 'color:  ${colorStr}');` +
    // `console.log('%c构建分支: ${
    //   repoInfo.branch || ""
    // }', 'color:  ${colorStr}');` +
    // `console.log('%c构建abbreviatedSha: ${
    //   repoInfo.abbreviatedSha || ""
    // }', 'color:  ${colorStr}');` +
    // `console.log("%c提交message: ${
    //   repoInfo.commitMessage.trim().replace(/\r/gi, '').replace(/\n/gi, '') ||
    //   ''
    // }", 'color:  ${colorStr}');` +
    // "console.groupEnd();" +
    // `console.log(${JSON.stringify(gitInfo)});` +
    // "</script>"
    // `\n`
    `<script>
       console.group('%c${
         pkg.name || '数势'
       }项目信息', 'background-color: ${colorStr}; color: #ffffff ; font-weight: bold ; padding: 4px ;');
       console.log('%c构建时间: ${getDateStr()}', 'color:  ${colorStr}');
       console.log('%c构建版本: ${pkg.version || ''}', 'color:  ${colorStr}');
       console.log('%c构建分支: ${repoInfo.branch || ''}', 'color:  ${colorStr}');
       console.log('%c构建abbreviatedSha: ${repoInfo.abbreviatedSha || ''}', 'color:  ${colorStr}');
       console.log("%c提交message: ${
         repoInfo?.commitMessage?.trim?.().replace(/\r/gi, '').replace(/\n/gi, '') || ''
       }", 'color:  ${colorStr}');
       console.groupEnd();
    </script>`
  );
  // 多行字符串 会报错
  // return `
  // <script>console.log('name111')</script>
  // `;
};

// 测试

// console.log(getConsoleLogString({ isCoding: true }));
