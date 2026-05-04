/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.js'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
