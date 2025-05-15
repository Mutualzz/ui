import { type Size } from "../../../types";

const minSize = 10,
    maxSize = 28;

export const baseSizeMap: Record<Size, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};

export const resolveRadioStyles = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = baseSizeMap[size as Size];

    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;

    return {
        padding: base * 0.2,
        lineHeight: 0,
        fontSize: base * 0.8,
    };
};

export {
    resolveIconScaling,
    variantColors,
} from "../Checkbox/Checkbox.helpers";
