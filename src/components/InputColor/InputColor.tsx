import { Button } from "@components/Button/Button";
import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import { IconButton } from "@components/IconButton/IconButton";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import { Popover } from "@components/Popover/Popover";
import { useColorInput } from "@hooks/useColorInput";
import { useTheme } from "@hooks/useTheme";
import styled from "@styled";
import type {
    ColorLike,
    Responsive,
    Size,
    SizeValue,
    Variant,
} from "@ui-types";
import { getLuminance, resolveColorFromLuminance, resolveSize } from "@utils";
import { randomColor } from "@utils/randomColor";
import { resolveResponsiveMerge } from "@utils/responsive";
import { formatHex, formatHex8, rgb } from "culori";
import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
} from "react";
import ColorPicker from "react-best-gradient-color-picker";
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
    variant?: Responsive<Variant>;
}

const RandomIcon = ({ color, size, variant }: RandomIconProps) => {
    const { theme } = useTheme();

    const { size: resolvedSize, variant: resolvedVariant } =
        resolveResponsiveMerge(
            theme,
            { size, variant },
            ({ size: s, variant: v }) => ({
                size: resolveSize(theme, s, baseIconSize),
                variant: v,
            }),
        );

    let resolvedColor = color;
    if (resolvedVariant === "solid") {
        const bgLuminance = getLuminance(color);
        const luminatedColor = resolveColorFromLuminance(bgLuminance, theme);
        resolvedColor = luminatedColor;
    }

    return (
        <svg
            fill={resolvedColor}
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
            allowGradient = false,
            onChange,
            onAlphaChange,
            defaultValue,
            ...props
        },
        ref,
    ) => {
        const { theme } = useTheme();

        const [alpha, setAlpha] = useState(100);

        const isControlled = colorProp !== undefined;

        const [internalValue, setInternalValue] = useState<ColorLike>(
            defaultValue ?? randomColor("hex", alpha),
        );

        const currentValue = isControlled ? colorProp : internalValue;
        const [pickerColor, setPickerColor] = useState<string>(() => {
            try {
                return formatHex(currentValue) ?? "#fff";
            } catch {
                // If the color is invalid, fallback to a random color
                return randomColor("hex", alpha);
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
        } = useColorInput(currentValue, alpha, "hex", allowGradient);

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value as ColorLike;

            if (typeof newValue !== "string") return;

            handleChange(newValue);

            try {
                setPickerColor(newValue);
            } catch {
                // Ignore invalid color input
            }
            if (!isControlled) setInternalValue(newValue);

            onChange?.(newValue);
        };

        const handleNewColor = (newColor: string) => {
            const newColorRgb = rgb(newColor);
            if (!newColorRgb) return;

            let colorValue: string | undefined = undefined;
            let newAlpha = 0;
            if (newColorRgb.alpha) {
                newAlpha = Math.round(newColorRgb.alpha * 100);
                setAlpha(newAlpha);
                if (newAlpha < 100) colorValue = formatHex8(newColorRgb);
            } else colorValue = formatHex(newColorRgb);

            if (!colorValue) return;

            setColorDirectly(colorValue as ColorLike);
            setPickerColor(newColor);

            if (!isControlled) setInternalValue(colorValue as ColorLike);

            onChange?.(colorValue as ColorLike);
            onAlphaChange?.(newAlpha);
        };

        const handleRandomColor = () => {
            const newColor = randomColor("hex", alpha);
            setColorDirectly(newColor);
            setPickerColor(newColor);
            if (!isControlled) setInternalValue(newColor);
            onChange?.(newColor);
        };

        useEffect(() => {
            if (isControlled) {
                setColorDirectly(currentValue);
                try {
                    setPickerColor(currentValue as string);
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
                                        <div ref={popoverRef}>
                                            <ColorPicker
                                                hidePresets
                                                hideInputs
                                                hideInputType
                                                hideColorTypeBtns={
                                                    !allowGradient
                                                }
                                                hideEyeDrop
                                                hideOpacity={!showAlpha}
                                                hideAdvancedSliders
                                                hideColorGuide
                                                value={pickerColor}
                                                onChange={handleNewColor}
                                            />
                                        </div>
                                    }
                                    color={validatedColor}
                                    size={size}
                                    variant={variant}
                                >
                                    <ColorPickerButton
                                        size={size}
                                        color={validatedColor}
                                        variant={variant}
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
                                        variant={variant}
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
