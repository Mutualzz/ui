import { BoxProps } from "@root/components/layout/Box/Box.types";
import { StackProps } from "@root/components/layout/Stack/Stack.types";

export type PaperElevation = number;

export interface PaperProps extends Omit<StackProps, "display"> {
    display: BoxProps["display"] | StackProps["display"];

    elevation?: PaperElevation;
}
