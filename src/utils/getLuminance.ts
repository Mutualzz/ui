import type { ColorLike } from "@ui-types";
import { rgb } from "culori";
import { isValidGradient } from "./colorRegex";

const toLuminance = (channel: number) =>
    channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);

export const getColorStops = (gradient: string): string[] => {
    // Naive split by comma, may not handle complex stops
    const match = gradient.match(/^(\w+-gradient)\((.+)\)$/i);
    if (!match) return [];
    const [, , content] = match;
    return content.split(",").map((stop) => stop.trim());
};

export const getLuminance = (color: ColorLike): number | null => {
    const str = String(color).trim();

    if (isValidGradient(str)) {
        const stops = getColorStops(str);

        const luminances = stops
            .map((stop) => {
                const colorMatch = stop.match(
                    /(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|\w+)/,
                );
                if (!colorMatch) return null;
                const rgbColor = rgb(colorMatch[0]);
                if (!rgbColor) return null;
                const r = toLuminance(rgbColor.r);
                const g = toLuminance(rgbColor.g);
                const b = toLuminance(rgbColor.b);
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            })
            .filter((lum): lum is number => lum !== null);

        // Return average luminance of stops, or 0 if none found
        if (luminances.length === 0) return 0;
        return luminances.reduce((a, b) => a + b, 0) / luminances.length;
    }

    const rgbColor = rgb(color);
    if (!rgbColor) return null;
    const r = toLuminance(rgbColor.r);
    const g = toLuminance(rgbColor.g);
    const b = toLuminance(rgbColor.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
