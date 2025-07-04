import { formatHex, formatHex8, parse } from "culori";
import { useState } from "react";
import type { ColorLike } from "../types";
import { alpha as alphaUtil, randomHexColor } from "../utils";

/**
 * Validates HEX, RGB, RGBA, HSL, HSLA formats.
 */
const isValidHex = (value: string): boolean =>
    /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.trim());

const isValidRgb = (value: string): boolean =>
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(value.trim());

const isValidRgba = (value: string): boolean =>
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
        value.trim(),
    );

const isValidHsl = (value: string): boolean =>
    /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(value.trim());

const isValidHsla = (value: string): boolean =>
    /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
        value.trim(),
    );

const isValidColorInput = (value: string): boolean =>
    isValidHex(value) ||
    isValidRgb(value) ||
    isValidRgba(value) ||
    isValidHsl(value) ||
    isValidHsla(value);

export const useColorInput = <T = ColorLike>(
    alpha = 100,
    initialColor: ColorLike = randomHexColor(),
) => {
    const [inputValue, setInputValue] = useState<string>(initialColor);
    const [color, setColor] = useState<string>(initialColor);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const handleChange = (input: string) => {
        setInputValue(input);
    };

    const validate = () => {
        const trimmed = inputValue.trim();

        if (isValidColorInput(trimmed)) {
            const parsed = parse(trimmed);

            if (parsed) {
                setColor(
                    alpha === 100
                        ? formatHex(parsed)
                        : alphaUtil(parsed, alpha),
                );
                setIsInvalid(false);

                return;
            }
        }

        setIsInvalid(true);
    };

    const setColorDirectly = (color: string) => {
        setInputValue(color);
        const parsed = parse(color);
        if (parsed) {
            setColor(alpha === 100 ? formatHex(parsed) : formatHex8(parsed));
            setIsInvalid(false);
        } else {
            setIsInvalid(true);
        }
    };

    return {
        inputValue: inputValue as T,
        color: color as T,
        isInvalid,
        handleChange,
        validate,
        setColorDirectly,
    };
};
