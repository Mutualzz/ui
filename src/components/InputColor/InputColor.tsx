import { Button } from "@components/Button/Button";
import { InputBase } from "@components/InputBase/InputBase";
import { InputDecoratorWrapper } from "@components/InputDecoratorWrapper/InputDecoratorWrapper";
import { InputRoot } from "@components/InputRoot/InputRoot";
import { Popover } from "@components/Popover/Popover";
import { useColorInput } from "@hooks/useColorInput";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useTheme } from "@hooks/useTheme";
import styled from "@styled";
import type { ColorLike } from "@ui-types";
import {
    hexToHsva,
    type ColorResult,
    type HsvaColor,
} from "@uiw/color-convert";
import Colorful from "@uiw/react-color-colorful";
import { randomColor } from "@utils/randomColor";
import { useRef, useState, type ChangeEvent, type RefObject } from "react";
import { resolveColorPickerButtonStyles } from "./InputColor.helpers";
import type { InputColorProps } from "./InputColor.types";

const ColorPickerButton = styled(Button)(
    ({ theme, color = "neutral", variant = "solid" }) => ({
        ...resolveColorPickerButtonStyles(theme, color)[variant],
    }),
);

const InputColor = ({
    variant = "outlined",
    size = "md",
    startDecorator,
    endDecorator,
    fullWidth = false,
    disabled = false,
    showColorPicker = true,
    showAlpha = false,
    value: colorProp,
    onChange,
    onAlphaChange,
    defaultValue,
    ...props
}: InputColorProps) => {
    const { theme } = useTheme();

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [alpha, setAlpha] = useState(100);

    const isControlled = colorProp !== undefined;

    const [internalValue, setInternalValue] = useState<ColorLike>(
        defaultValue ?? randomColor("hex", alpha),
    );

    const currentValue = isControlled ? colorProp : internalValue;
    const [pickerColor, setPickerColor] = useState<HsvaColor>(() => {
        try {
            return hexToHsva(currentValue);
        } catch {
            // If the color is invalid, fallback to a random color
            return hexToHsva(randomColor("hex", alpha));
        }
    });

    const popoverRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(popoverRef as RefObject<HTMLDivElement>, () => {
        setIsPickerOpen(false);
    });

    const {
        inputValue,
        color: validatedColor,
        isInvalid,
        handleChange,
        validate,
        setColorDirectly,
    } = useColorInput(currentValue, alpha, "hex");

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value as ColorLike;

        if (typeof newValue !== "string") return;

        handleChange(newValue);

        try {
            setPickerColor(hexToHsva(newValue));
        } catch {
            // Ignore invalid color input
        }
        if (!isControlled) setInternalValue(newValue);

        onChange?.(newValue);
    };

    const togglePicker = () => {
        setIsPickerOpen((prev) => !prev);
    };

    const handleNewColor = (newColor: ColorResult) => {
        const newAlpha = Math.round(newColor.rgba.a * 100);
        setAlpha(newAlpha);

        const colorValue = newAlpha < 100 ? newColor.hexa : newColor.hex;

        setColorDirectly(colorValue as ColorLike);
        setPickerColor(newColor.hsva);

        if (!isControlled) setInternalValue(colorValue as ColorLike);

        onChange?.(colorValue as ColorLike);
        onAlphaChange?.(newAlpha);
    };

    return (
        <>
            <InputRoot
                color={validatedColor}
                textColor={isInvalid ? theme.colors.danger : validatedColor}
                variant={variant}
                size={size}
                fullWidth={fullWidth}
                error={isInvalid}
                disabled={disabled}
            >
                {startDecorator && (
                    <InputDecoratorWrapper>
                        {startDecorator}
                    </InputDecoratorWrapper>
                )}

                <InputBase
                    {...props}
                    type="text"
                    value={inputValue}
                    onChange={handleOnChange}
                    onBlur={validate}
                />

                <InputDecoratorWrapper>
                    {endDecorator ??
                        (showColorPicker && !isInvalid && (
                            <Popover
                                content={
                                    <Colorful
                                        ref={popoverRef}
                                        disableAlpha={!showAlpha}
                                        color={pickerColor}
                                        onChange={handleNewColor}
                                    />
                                }
                                isOpen={isPickerOpen}
                                color={validatedColor}
                                size={size}
                                variant={variant}
                            >
                                <ColorPickerButton
                                    size={size}
                                    color={validatedColor}
                                    variant={variant}
                                    onClick={togglePicker}
                                />
                            </Popover>
                        ))}
                </InputDecoratorWrapper>
            </InputRoot>
        </>
    );
};

export { InputColor };
