import type { StackProps } from "@root/layout/Stack/Stack.types";

export type PaperElevation = 0 | 1 | 2 | 3 | 4;

export interface PaperProps extends StackProps {
    elevation?: PaperElevation;
}
