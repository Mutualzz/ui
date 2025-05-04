import { HTMLAttributes } from "react";
import { ColorLike } from "../../../types";

export type TypographyLevel =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "title-lg"
    | "title-md"
    | "title-sm"
    | "body-lg"
    | "body-md"
    | "body-sm";

export type TypographyColor =
    | "primary"
    | "neutral"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | ColorLike;

export type TypographyVariant = "plain" | "outlined" | "soft" | "solid";

export interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
    level?: TypographyLevel;
    color?: TypographyColor;
    variant?: TypographyVariant;
}
