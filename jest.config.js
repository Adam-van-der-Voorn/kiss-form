/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: 'src',
    setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
    }
};