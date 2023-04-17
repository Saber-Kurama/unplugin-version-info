// @ts-ignore
// todo: 目前是5版本
// todo: 为啥会是字符串而不是变量？换成原生就是好的
// import { commandSync } from "execa";
import childProcess from "node:child_process";

// import { Worker } from "worker_threads";

// export const getBrach = async () => {
//   const { stdout } = await execa("echo", ["$GIT_BRANCH"]);
//   return stdout;
// };
// export const getBrachSync = () => {
//   const { stdout } = execaSync("echo", ["$GIT_BRANCH"]);
//   return stdout;
// };

export const getBrachSync = () => {
  let result = "";
  try {
    result = childProcess
      .execSync("echo $GIT_BRANCH", {
        encoding: "utf-8",
      })
      .replace(/\s/, "");
  } catch (error) {
    result = "error";
  }
  return result;
};

export const getAbbreviatedShaSync = () => {
  // const { stdout } = commandSync("echo $GIT_COMMIT_SHORT");
  // return stdout;
  let result = "";
  try {
    result = childProcess
      .execSync("echo $GIT_COMMIT_SHORT", {
        encoding: "utf-8",
      })
      .replace(/\s/, "");
  } catch (error) {
    result = "error";
  }
  return result;
};

export const getGitMessageSync = () => {
  let result = "";
  try {
    result = childProcess
      .execSync("git log -1 --pretty=%s", {
        encoding: "utf-8",
      })
      .replace(/\s/, "");
  } catch (error) {
    result = "error";
  }
  return result;
  // const { stdout } = commandSync("git log -1 --pretty=%s");
  // return stdout;
};

export const getCodingInfo = () => {
  return {
    branch: getBrachSync(),
    abbreviatedSha: getAbbreviatedShaSync(),
    commitMessage: getGitMessageSync(),
  };
};

console.log(getCodingInfo());
