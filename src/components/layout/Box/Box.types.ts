import type { HTMLProps } from "react";

export interface BoxProps extends HTMLProps<HTMLDivElement> {
    display?: "block" | "inline-block";
    position?: "absolute" | "relative" | "fixed" | "sticky" | "static";
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    width?: string | number;
    height?: string | number;

    p?: string | number;
    m?: string | number;

    pt?: string | number;
    pr?: string | number;
    pb?: string | number;
    pl?: string | number;
    px?: string | number;
    py?: string | number;

    mt?: string | number;
    mr?: string | number;
    mb?: string | number;
    ml?: string | number;
    mx?: string | number;
    my?: string | number;
}
