import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
	testEnvironment: 'jest-environment-jsdom',
	verbose: true,
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	moduleNameMapper: {
		//'\\.(css|scss|svg|png)$': '<rootDir>/src/__mocks__/style-mocks.ts',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	resetMocks: false,
};
export default config;
