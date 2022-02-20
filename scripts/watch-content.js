// the `entry.server.tsx` file requires app/refresh.ignored.js
// so if we change our content then update app/refresh.ignored.js we'll
// get an auto-refresh even though content isn't directly required in our app.
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

chokidar
  .watch(path.join(__dirname, "../content"))
  .on("change", async (updatedFile) => {
    console.log("changed", updatedFile);
  });
