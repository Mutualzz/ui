import { Color, ColorLike, Variant } from "../../../types";
import { BoxProps } from "../../layout/Box/Box.types";
import { StackProps } from "../../layout/Stack/Stack.types";

export type PaperElevation = number;

export type PaperVariant = Variant | "elevation";

export interface PaperProps extends Omit<StackProps, "display"> {
    display?: BoxProps["display"] | StackProps["display"];

    color?: Color | ColorLike;
    variant?: PaperVariant;

    elevation?: PaperElevation;
}
