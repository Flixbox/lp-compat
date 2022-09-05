var exec = require("child_process").exec;
function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout, error, stderr);
  });
}

execute("git diff HEAD~ -- ./static/apps.json", (stdout, error, stderr) => {
  console.log(error);
  console.log(stdout);
  console.log(stderr);
});
