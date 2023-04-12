import fs from "node:fs";

let pkg: any;

export const getPkg = async () => {
  if (pkg) {
    return pkg;
  }
  //
  const pkgStr = fs.readFileSync(process.cwd() + "/package.json", "utf-8");
  try {
    pkg = JSON.parse(pkgStr);
  } catch (error) {
    pkg = {};
  }
  return pkg;
};
