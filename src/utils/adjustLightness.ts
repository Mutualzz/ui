import type { ColorLike } from "@ui-types";
import { formatHex8, oklch } from "culori";
import { isValidGradient } from "./colorRegex";

// TODO: you left off here,
// First implement so useColorInput accepts gradients and then
// somehow implement gradients so
// users can customize their themes with gradients
// Use that React component for gradient react-best-gradient-picker
// And then figure out a way how to apply it, start with buttons first
// because they are simpler than inputs
export const adjustLightness = (color: ColorLike, amount: number): string => {
    const str = String(color).trim();

    if (isValidGradient(str)) {
        const match = str.match(/^(\w+-gradient)\((.+)\)$/i);
        if (!match) return color;
        const [, type, content] = match;
        const stops = content.split(",").map((stop) => stop.trim());

        const stopsAdjusted = stops.map((stop) => {
            const colorMatch = stop.match(
                /(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|\w+)/,
            );
            if (!colorMatch) return stop;
            const colorPart = colorMatch[0];
            const oklchColor = oklch(colorPart);
            if (!oklchColor) return stop;
            const newLightness = Math.min(
                Math.max(oklchColor.l + amount, 0),
                1,
            );
            const adjusted = { ...oklchColor, l: newLightness };
            const colorWithLightness = formatHex8(adjusted);
            return stop.replace(colorPart, colorWithLightness);
        });

        return `${type}(${stopsAdjusted.join(", ")})`;
    }

    const oklchColor = oklch(color);
    if (!oklchColor) return color;

    const newLightness = Math.min(Math.max(oklchColor.l + amount, 0), 1);
    const adjusted = { ...oklchColor, l: newLightness };

    return formatHex8(adjusted);
};
