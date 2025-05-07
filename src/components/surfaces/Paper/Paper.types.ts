import { type Color, type ColorLike, type Variant } from "../../../types";
import { type BoxProps } from "../../layout/Box/Box.types";
import { type StackProps } from "../../layout/Stack/Stack.types";

export type PaperVariant = Variant | "elevation";

export interface PaperProps extends Omit<StackProps, "display"> {
    display?: BoxProps["display"] | StackProps["display"];

    color?: Color | ColorLike;
    variant?: PaperVariant;

    elevation?: number;
}
