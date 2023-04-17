// @ts-ignore
import { execa, execaSync } from "execa";
// import { Worker } from "worker_threads";

export const getBrach = async () => {
  const { stdout } = await execa("echo", ["$GIT_BRANCH"]);
  return stdout;
};

export const getBrachSync = () => {
  const { stdout } = execaSync("echo", ["$GIT_BRANCH"]);
  return stdout;
};

export const getAbbreviatedShaSync = () => {
  const { stdout } = execaSync("echo", ["$GIT_COMMIT_SHORT"]);
  return stdout;
};

export const getGitMessageSync = () => {
  const { stdout } = execaSync("git", ["log", "-1", "--pretty=%s"]);
  return stdout;
};

export const getCodingInfo = () => {
  return {
    branch: getBrachSync(),
    abbreviatedSha: getAbbreviatedShaSync(),
    commitMessage: getGitMessageSync(),
  };
};

console.log(getGitMessageSync());
