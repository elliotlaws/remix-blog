// try to keep this dep-free so we don't have to install deps
const fs = require("fs");
const fsp = require("fs/promises");
const { promisify } = require("util");
const exists = promisify(fs.exists);
const path = require("path");

const { getChangedFiles, fetchJson } = require("./get-changed-files");

// const [currentCommitSha] = process.argv.slice(2);

async function go() {
  // const buildInfo = await fetchJson(
  //   "https://elliotlaws.com/api/get-content-sha"
  // );

  const buildInfo = {
    commit: { sha: "44b05693a6bf2525beea9bd088d0ef0ff21373d5" },
  };

  const currentCommitSha = "898d9cbe6bc93c0cbdb11b9006403e15a5f3679b";
  const compareCommitSha = buildInfo.commit.sha;

  let changedFiles = [];

  if (compareCommitSha) {
    changedFiles =
      (await getChangedFiles(currentCommitSha, compareCommitSha)) ?? [];

    console.error("Determining whether the changed files are content", {
      currentCommitSha,
      compareCommitSha,
      changedFiles,
    });
  } else {
    // get initial content list
    // const filelist = [];
    // function walk(dir) {
    //   const files = fs.readdirSync(dir);
    //   files.forEach((file) => {
    //     const filePath = path.join(dir, file);
    //     if (fs.statSync(filePath).isDirectory()) {
    //       walk(filePath);
    //     } else {
    //       filelist.push(filePath);
    //     }
    //   });
    // }
    // walk("./content");
    // changedFiles = filelist.map((filename) => ({
    //   changeType: "added",
    //   filename,
    // }));
  }

  // get list of files that are content
  const contentFiles = changedFiles
    .filter(({ filename }) => filename.startsWith("content"))
    .map(({ filename }) => {
      // const parts = filename.split("/");

      // if (!filename.endsWith(".mdx") || filename.endsWith("/index.mdx")) {
      //   const newParts = parts.slice(0, parts.length - 1).join("/");
      //   console.log("newParts", newParts);
      //   return newParts;
      // }
      // filename.replace(/^content\//, "");
      // const newFilename = filename.replace(/^content\//, "");

      console.log("fileName", filename);
      // console.log("new fileName", newFilename);

      return filename;
    });

  console.log(Array.from(new Set(contentFiles)).filter(Boolean).join(" "));
}

go().catch((e) => {
  console.error(e);
  console.log("");
});
