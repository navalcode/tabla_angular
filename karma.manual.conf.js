// Manual browser capture uses the same Angular/Jasmine suite as the default runner.
module.exports = function (config) {
  require("./karma.conf")(config);
  const port = Number(process.env.TABLE_TEST_PORT || 9876);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("Invalid TABLE_TEST_PORT");
  config.set({
    hostname: "127.0.0.1",
    listenAddress: "127.0.0.1",
    port,
    browsers: [],
    singleRun: true,
    autoWatch: false,
    colors: false,
    reporters: ["progress"],
    client: {
      jasmine: { random: false },
      captureConsole: false,
      clearContext: false
    }
  });
};
