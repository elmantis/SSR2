// jest.config.js (for server-side tests)
module.exports = {
  testEnvironment: "node",
  moduleNameMapper: {
    "firebase-admin": "<rootDir>/__mocks__/firebase-admin.js",
  },
  testMatch: ["<rootDir>/server/**/*.test.ts"], // Only test files in server directory
};
