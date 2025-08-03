import type { ColorLike } from "@ui-types";
import { formatHex8, rgb, type Color } from "culori";

export const alpha = (base: Color | ColorLike | string, value: number) => {
    const parsedColor = rgb(base);
    if (!parsedColor) return base;

    return formatHex8({ ...parsedColor, alpha: value });
};
