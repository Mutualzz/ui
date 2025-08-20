import { Button } from "@components/Button/Button";
import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import { IconButton } from "@components/IconButton/IconButton";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import { Popover } from "@components/Popover/Popover";
import { useColorInput } from "@hooks/useColorInput";
import { useTheme } from "@hooks/useTheme";
import styled from "@styled";
import type { ColorLike, Responsive, Size, SizeValue } from "@ui-types";
import {
    hexToHsva,
    type ColorResult,
    type HsvaColor,
} from "@uiw/color-convert";
import Colorful from "@uiw/react-color-colorful";
import { resolveSize } from "@utils";
import { randomColor } from "@utils/randomColor";
import { resolveResponsiveMerge } from "@utils/responsive";
import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
} from "react";
import {
    resolveColorPickerButtonSize,
    resolveColorPickerButtonStyles,
} from "./InputColor.helpers";
import type { InputColorProps } from "./InputColor.types";

const baseIconSize = {
    sm: 8,
    md: 12,
    lg: 16,
};

interface RandomIconProps {
    color: ColorLike;
    size: Responsive<Size | SizeValue | number>;
}

const RandomIcon = ({ color, size }: RandomIconProps) => {
    const { theme } = useTheme();

    const { size: resolvedSize } = resolveResponsiveMerge(
        theme,
        { size },
        ({ size: s }) => ({
            size: resolveSize(theme, s, baseIconSize),
        }),
    );

    return (
        <svg
            fill={color}
            height={resolvedSize}
            width={resolvedSize}
            viewBox={`0 0 512 512`}
            style={{ display: "block" }}
        >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
                <path d="M341.3,28.3v85.3H128c-70.7,0-128,57.3-128,128c0,21.5,5.8,41.4,15.2,59.2L68,263.2c-2.4-6.8-4-13.9-4-21.5 c0-35.4,28.7-64,64-64h213.3V263L512,156.3V135L341.3,28.3z M444,262.8c2.4,6.8,4,13.9,4,21.5c0,35.4-28.6,64-64,64H170.7V263 L0,369.7V391l170.7,106.7v-85.3H384c70.7,0,128-57.3,128-128c0-21.5-5.8-41.4-15.2-59.2L444,262.8z"></path>
            </g>
        </svg>
    );
};

const ColorPickerButton = styled(Button)(
    ({ theme, color = "neutral", variant = "solid", size = "md" }) => ({
        ...resolveResponsiveMerge(
            theme,
            { color, variant, size },
            ({ color: c, variant: v, size: s }) => ({
                ...resolveColorPickerButtonStyles(theme, c)[v],
                ...resolveColorPickerButtonSize(theme, s),
            }),
        ),

        padding: 0,
    }),
);

const InputColor = forwardRef<HTMLInputElement, InputColorProps>(
    (
        {
            variant = "outlined",
            size = "md",
            startDecorator,
            endDecorator,
            fullWidth = false,
            disabled = false,
            showColorPicker = true,
            showAlpha = false,
            showRandom = false,
            value: colorProp,
            onChange,
            onAlphaChange,
            defaultValue,
            ...props
        },
        ref,
    ) => {
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

        const handleRandomColor = () => {
            const newColor = randomColor("hex", alpha);
            setColorDirectly(newColor);
            setPickerColor(hexToHsva(newColor));
            if (!isControlled) setInternalValue(newColor);
            onChange?.(newColor);
        };

        useEffect(() => {
            if (isControlled) {
                setColorDirectly(currentValue);
                try {
                    setPickerColor(hexToHsva(currentValue as string));
                } catch {
                    // Ignore invalid color input
                }
            }
        }, [currentValue]);

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
                    <DecoratorWrapper>
                        {startDecorator ??
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
                    </DecoratorWrapper>

                    <InputBase
                        {...(props as any)}
                        type="text"
                        value={inputValue}
                        onChange={handleOnChange}
                        onBlur={validate}
                        ref={ref}
                    />

                    <DecoratorWrapper>
                        {endDecorator ??
                            (showRandom && (
                                <IconButton
                                    color={validatedColor}
                                    variant={variant}
                                    onClick={handleRandomColor}
                                >
                                    <RandomIcon
                                        color={validatedColor}
                                        size={size}
                                    />
                                </IconButton>
                            ))}
                    </DecoratorWrapper>
                </InputRoot>
            </>
        );
    },
);

InputColor.displayName = "InputColor";

export { InputColor };
