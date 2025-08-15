import type { Theme } from "@emotion/react";
import { type Size, type SizeValue } from "@ui-types";
import { resolveSize } from "@utils/resolveSize";

export const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 16,
    lg: 20,
};

export const resolveRadioSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        fontSize: resolvedSize,
    };
};

export {
    resolveIconScaling,
    resolveCheckboxStyles as resolveRadioStyles,
} from "../Checkbox/Checkbox.helpers";
