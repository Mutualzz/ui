module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],
    moduleNameMapper: {
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@utils$": "<rootDir>/src/utils/index",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@styled$": "<rootDir>/src/utils/styled",
        "^@ui-types$": "<rootDir>/src/types/index.d.ts",
        "^@ui-types/(.*)$": "<rootDir>/src/types/$1",
        "^@test-utils$": "<rootDir>/src/setupTests.tsx",
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
