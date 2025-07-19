import { pathsToModuleNameMapper } from 'ts-jest'

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // ✅ Adjust based on your tsconfig paths
    },
}