import { afterEach } from "@jest/globals";
import "@testing-library/jest-dom";
import { cleanup, render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

afterEach(() => {
    cleanup();
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
