module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  verbose: true,
  globalTeardown: "./test-teardown-globals.js",
  reporters: ["default", "jest-junit"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
