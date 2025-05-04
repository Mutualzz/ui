import { ColorLike } from "../../../types";
import { BoxProps } from "../../layout/Box/Box.types";
import { StackProps } from "../../layout/Stack/Stack.types";

export type PaperElevation = number;

export type PaperVariant =
    | "elevation"
    | "outlined"
    | "plain"
    | "soft"
    | "solid";

export type PaperColor =
    | "primary"
    | "neutral"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | ColorLike;

export interface PaperProps extends Omit<StackProps, "display"> {
    display?: BoxProps["display"] | StackProps["display"];

    color?: PaperColor;
    variant?: PaperVariant;

    elevation?: PaperElevation;
}
