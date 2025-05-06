import { Rgb } from "culori";

const toLuminance = (channel: number) =>
    channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);

export const getLuminance = (color: Rgb): number => {
    const r = toLuminance(color.r);
    const g = toLuminance(color.g);
    const b = toLuminance(color.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
