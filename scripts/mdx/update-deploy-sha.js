import fetch from "node-fetch";

const commit = process.env.COMMIT_SHA;

async function getCommit() {
  if (!commit) return { sha: "" };
  try {
    const res = await fetch(
      `https://api.github.com/repos/elliotlaws/remix-blog/commits/${commit}`
    );
    const data = await res.json();
    return {
      isDeployCommit: commit === "HEAD" ? "Unknown" : true,
      sha: data.sha,
      author: data.commit.author.name,
      date: data.commit.author.date,
      message: data.commit.message,
      link: data.html_url,
    };
  } catch (error) {
    return `Unable to get git commit info: ${error.message}`;
  }
}

async function go() {
  const buildInfo = {
    buildTime: Date.now(),
    commit: await getCommit(),
  };

  const response = await fetch(`${process.env.API_URL}/api/update-deploy-sha`, {
    method: "post",
    body: JSON.stringify(buildInfo),
    headers: {
      authorization: `Bearer ${process.env.POST_API_KEY}`,
    },
  });
  if (!response.ok) {
    console.log({ status: response.status, statusText: response.statusText });
    process.exit(1);
  }
  console.log("deploy sha updated", buildInfo);
  process.exit(0);
}
go();

/*
eslint
  consistent-return: "off",
*/
