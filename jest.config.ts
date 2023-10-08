import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.test.ts'],
  verbose: true,
  testEnvironment: 'node'
};

export default config;