module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],
    moduleNameMapper: {
        "^@test-utils$": "<rootDir>/src/setupTests.tsx",
        "^@styled$": "<rootDir>/src/utils/styled",
        "^@ui-types$": "<rootDir>/src/types/index.d.ts",
        "^@utils$": "<rootDir>/src/utils/index",
    },
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: {
                    jsx: "react-jsx",
                    jsxImportSource: "@emotion/react",
                    verbatimModuleSyntax: false, // Disable for tests
                },
            },
        ],
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
};
