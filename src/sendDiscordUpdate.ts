const git = require("simple-git");

git(__dirname).raw(
  ["diff", "HEAD~", "--", ".//static//apps.json"],
  (err, result) => {
    console.log(result);
  }
);
