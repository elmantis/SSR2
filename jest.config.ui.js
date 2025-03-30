// jest.config.react.js (for client-side tests)
module.exports = {
  testEnvironment: "jsdom", // Use jsdom for React components
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], //  Set up @testing-library/jest-dom
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js", //mock css imports
  },
  testMatch: ["<rootDir>/src/**/*.test.js"], // Only test files in src directory
};
