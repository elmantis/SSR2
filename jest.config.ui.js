// jest.config.react.js (for client-side tests)
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testMatch: ["<rootDir>/src/**/*.test.tsx"],
};
