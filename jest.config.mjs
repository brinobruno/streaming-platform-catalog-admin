/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));

const config = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
  rootDir: '.',
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {
      useESM: true
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/src/shared/infra/testing/except-helpers.ts'],
};

export default config;
