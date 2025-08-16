import type { ColorLike } from "@ui-types";
import { formatHex8, rgb } from "culori";
import { isValidGradient } from "./colorRegex";

export const alpha = (base: ColorLike | string, value: number) => {
    const str = String(base).trim();

    if (isValidGradient(str)) {
        const match = str.match(/^(\w+-gradient)\((.+)\)$/i);
        if (!match) return base;

        const [, type, content] = match;

        const stops = content.split(",").map((stop) => stop.trim());

        const stopsWithAlpha = stops.map((stop) => {
            // Extract color part (naive: first word)
            const colorMatch = stop.match(
                /(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|\w+)/,
            );
            if (!colorMatch) return stop;

            const colorPart = colorMatch[0];
            const parsedColor = rgb(colorPart);
            if (!parsedColor) return stop;

            // Replace color with alpha-applied color
            const colorWithAlpha = formatHex8({ ...parsedColor, alpha: value });
            return stop.replace(colorPart, colorWithAlpha);
        });

        return `${type}(${stopsWithAlpha.join(", ")})`;
    }

    const parsedColor = rgb(base);
    if (!parsedColor) return base;

    return formatHex8({ ...parsedColor, alpha: value });
};
