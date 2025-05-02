import type { PaperElevation } from "@root/components/surfaces/Paper/Paper.types";
import type { ColorLike } from "@root/types";
import { formatHex8, oklch, parse } from "culori";

export const dynamicElevation = (
    color: ColorLike,
    elevation: PaperElevation,
) => {
    const parsedColor = parse(color);
    if (!parsedColor) return color;

    const oklchColor = oklch(parsedColor);

    const increment = 0.02;

    const newLightness = Math.min(oklchColor.l + elevation * increment, 1);

    const adjustedColor = { ...oklchColor, l: newLightness };

    return formatHex8(adjustedColor);
};
