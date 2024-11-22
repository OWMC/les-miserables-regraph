/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jest-environment-jsdom',
    verbose: true,
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|png)$': '<rootDir>/src/mocks/fileMock.js',
    },
};
  
module.exports = config;
