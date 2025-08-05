import type { Theme } from "@emotion/react";
import { type Size, type SizeValue } from "@ui-types";
import { resolveSize } from "@utils/resolveSize";

export const baseSizeMap: Record<Size, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};

export const resolveRadioSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        padding: resolvedSize * 0.2,
        lineHeight: 0,
        fontSize: resolvedSize * 0.8,
    };
};

export {
    resolveIconScaling,
    resolveCheckboxStyles as resolveRadioStyles,
} from "../Checkbox/Checkbox.helpers";
