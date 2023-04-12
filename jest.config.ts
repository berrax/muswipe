import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
	testEnvironment: '@happy-dom/jest-environment',
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				diagnostics: false,
			},
		],
	},
	moduleNameMapper: {
		//'\\.(css|scss|svg|png)$': '<rootDir>/src/__mocks__/style-mocks.ts',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	//resetMocks: false,
};
export default config;
