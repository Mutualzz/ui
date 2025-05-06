import { oklch, rgb, Rgb } from "culori";

export const adjustLightness = (color: Rgb, amount: number): Rgb => {
    const oklchColor = oklch(color);
    if (!oklchColor) return color;

    const newLightness = Math.min(Math.max(oklchColor.l + amount, 0), 1);
    const adjusted = { ...oklchColor, l: newLightness };

    return rgb(adjusted);
};
