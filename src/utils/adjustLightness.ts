import type { ColorLike } from "@ui-types";
import { formatHex8, oklch } from "culori";

export const adjustLightness = (color: ColorLike, amount: number): string => {
    const oklchColor = oklch(color);
    if (!oklchColor) return color;

    const newLightness = Math.min(Math.max(oklchColor.l + amount, 0), 1);
    const adjusted = { ...oklchColor, l: newLightness };

    return formatHex8(adjusted);
};
