// the `entry.server.tsx` file requires app/refresh.ignored.js
// so if we change our content then update app/refresh.ignored.js we'll
// get an auto-refresh even though content isn't directly required in our app.
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const exec = require("util").promisify(require("child_process").exec);

const refreshFilePath = "./app/.refresh.ignore";
let refreshTimeout = undefined;

chokidar.watch(path.join("./content")).on("change", async (updatedFile) => {
  console.log("changed", updatedFile);
  const command = `node scripts/mdx/compile-mdx.mjs --json --file ${updatedFile}`;
  const lastModified = Math.floor(fs.statSync(updatedFile).mtimeMs);

  // reset existing timer so we don't build multiple times
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = undefined;
  }

  await exec(command).catch((e) => {
    console.error(e);
  });

  refreshTimeout = setTimeout(() => {
    // update refresh file to trigger rebuild/refresh
    fs.writeFileSync(refreshFilePath, String(lastModified), "utf8");
    refreshTimeout = undefined;
  }, 500);
});
