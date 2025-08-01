import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Variant } from "@ui-types";
import { lighten, resolveColor } from "@utils";
import { formatHex8, parse } from "culori";

export const resolvePasswordIconStyles = (
    theme: Theme,
    color: Color | ColorLike,
): Record<Variant, string> => {
    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    return {
        outlined: formatHex8(parsedColor),
        solid: formatHex8(lighten(parsedColor, 1)),
        plain: formatHex8(parsedColor),
        soft: formatHex8(lighten(parsedColor, 0.25)),
    };
};
