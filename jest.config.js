module.exports = {
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json"
      }
    },
    name: "test",
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    moduleDirectories: ["./node_modules", "src"],
  };