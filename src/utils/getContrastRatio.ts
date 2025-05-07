import type { Rgb } from "culori";
import { getLuminance } from "./getLuminance";

export const getContrastRatio = (color1: Rgb, color2: Rgb): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const [lighter, darker] = lum1 > lum2 ? [lum1, lum2] : [lum2, lum1];
    return (lighter + 0.05) / (darker + 0.05);
};
