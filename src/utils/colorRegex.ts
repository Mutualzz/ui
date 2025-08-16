import { parse } from "culori";

/**
 * Checks if the input is a valid hex color.
 */
export const isValidHex = (value: string): boolean =>
    /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.trim());

/**
 * Checks if the input is a valid RGB color.
 * RGB format: rgb(r, g, b)
 * where r, g, b are integers between 0 and 255.
 */
export const isValidRgb = (value: string): boolean =>
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(value.trim());

/**
 * Checks if the input is a valid RGBA color.
 * RGBA format: rgba(r, g, b, a)
 * where r, g, b are integers between 0 and 255,
 * and a is a number between 0 and 1 (inclusive).
 */
export const isValidRgba = (value: string): boolean =>
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
        value.trim(),
    );

/**
 * Checks if the input is a valid HSL color.
 * HSL format: hsl(h, s%, l%)
 * where h is an integer between 0 and 360,
 * s and l are percentages between 0% and 100%.
 */
const isValidHsl = (value: string): boolean =>
    /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(value.trim());

/**
 * Checks if the input is a valid HSLA color.
 * HSLA format: hsla(h, s%, l%, a)
 * where h is an integer between 0 and 360,
 * s and l are percentages between 0% and 100%,
 * and a is a number between 0 and 1 (inclusive).
 */
export const isValidHsla = (value: string): boolean =>
    /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
        value.trim(),
    );

export const isValidLinearGradient = (value: string): boolean =>
    /^linear-gradient\((.+)\)$/i.test(value.trim());

/**
 * Checks if the input is a valid radial-gradient string.
 */
export const isValidRadialGradient = (value: string): boolean =>
    /^radial-gradient\((.+)\)$/i.test(value.trim());

/**
 * Checks if the input is a valid conic-gradient string.
 */
export const isValidConicGradient = (value: string): boolean =>
    /^conic-gradient\((.+)\)$/i.test(value.trim());

export const isValidGradient = (value: string): boolean =>
    isValidLinearGradient(value) ||
    isValidRadialGradient(value) ||
    isValidConicGradient(value);

/**
 * Checks if the input is a valid color input.
 * It checks for valid hex, rgb, rgba, hsl, and hsla formats.
 * Returns true if the input is valid, false otherwise.
 */
export const isValidColorInput = (value: string): boolean => {
    // First check the existing regex patterns for performance
    const trimmed = value.trim();

    if (isValidGradient(trimmed)) return true;

    const isValidFormat =
        isValidHex(trimmed) ||
        isValidRgb(trimmed) ||
        isValidRgba(trimmed) ||
        isValidHsl(trimmed) ||
        isValidHsla(trimmed);

    if (isValidFormat) return true;

    // If regex patterns don't match, use culori to check for named colors
    // and other valid CSS color formats
    const parsed = parse(trimmed);
    return parsed !== undefined;
};
