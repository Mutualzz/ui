import type { ColorLike } from "@ui-types";
import { rgb } from "culori";

const toLuminance = (channel: number) =>
    channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);

export const getLuminance = (color: ColorLike): number => {
    const rgbColor = rgb(color);
    if (!rgbColor) return 0;
    const r = toLuminance(rgbColor.r);
    const g = toLuminance(rgbColor.g);
    const b = toLuminance(rgbColor.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
