import type { Color, ColorLike } from "../types";

export const isThemeColor = (color: Color | ColorLike): color is Color => {
    return (
        typeof color === "string" &&
        ["primary", "neutral", "success", "danger", "warning", "info"].includes(
            color,
        )
    );
};
