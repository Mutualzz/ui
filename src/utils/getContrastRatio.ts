import type { ColorLike } from "@ui-types";
import { getLuminance } from "./getLuminance";

export const getContrastRatio = (
    color1: ColorLike,
    color2: ColorLike,
): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const [lighter, darker] = lum1 > lum2 ? [lum1, lum2] : [lum2, lum1];
    return (lighter + 0.05) / (darker + 0.05);
};
