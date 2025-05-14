import { type ChangeEvent, type FC, useState } from "react";
import type { Size } from "../../../types";
import styled from "../../../utils/styled";
//import styled from "@emotion/styled";
import {
    resolveIconScaling,
    resolveRadioStyles,
    variantColors,
} from "./RadioButton.helpers";
import type { RadioButtonProps } from "./RadioButton.types";

const RadioWrapper = styled("label")<RadioButtonProps>(
    ({ disabled, size = "md" }) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.3s ease",
        ...(disabled && { opacity: 0.5, pointerEvents: "none" }),
        ...resolveRadioStyles(size),
    }),
);

const HiddenRadio = styled("input")({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    margin: 0,
    padding: 0,
    opacity: 0,
});

const RadioControl = styled("span")<RadioButtonProps>(({
    theme,
    color = "primary",
    variant = "plain",
    checked,
}) => {
    const baseStyles = {
        position: "relative" as const,
        width: "1em",
        height: "1em",
        border: "1px solid currentColor",
        boxSizing: "border-box" as const,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        borderRadius: "50%",
        padding: 0,
    };

    const variantStyle = variantColors(theme, color, checked)[variant];

    return {
        ...baseStyles,
        ...variantStyle,

        'input[type="radio"]:hover + &': variantColors(theme, color, true)[
            variant
        ],

        'input[type="radio"]:active + &': variantColors(theme, color, true)[
            variant
        ],

        'input[type="radio"]:focus-visible + &': {
            boxShadow: `0 0 0 3px ${variantColors(theme, color, true).solid.backgroundColor}`,
            outline: "none",
        },

        "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "0.5em",
            height: "0.5em",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            backgroundColor: "currentColor",
            opacity: checked ? 1 : 0,
            transition: "opacity 0.2s ease",
        },
    };
});

const RadioLabel = styled("span")<{ rtl?: boolean }>(({ rtl }) => ({
    ...(rtl ? { marginRight: "0.5em" } : { marginLeft: "0.5em" }),
}));

const IconWrapper = styled("span")<{ size?: Size | number }>(
    ({ size = "md" }) => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...resolveIconScaling(size),
        "& > *": {
            width: "100%",
            height: "100%",
        },
    }),
);

export const RadioButton: FC<RadioButtonProps> = ({
    checked: controlledChecked,
    onChange,
    label,
    disabled,
    color = "primary",
    variant = "solid",
    size = "md",
    name,
    value,
    checkedIcon,
    uncheckedIcon,
    rtl,
    ...props
}) => {
    const [internalChecked, setInternalChecked] = useState(false);
    const isChecked = controlledChecked ?? internalChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!controlledChecked) setInternalChecked(e.target.checked);
        onChange?.(e);
    };

    return (
        <RadioWrapper disabled={disabled} size={size}>
            <HiddenRadio
                type="radio"
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
            />
            {rtl && label && <RadioLabel>{label}</RadioLabel>}
            <RadioControl
                role="radio"
                aria-checked={isChecked}
                color={color}
                variant={variant}
                checked={isChecked}
                disabled={disabled}
                size={size}
                {...props}
            >
                {isChecked ? (
                    checkedIcon ? (
                        <IconWrapper size={size}>{checkedIcon}</IconWrapper>
                    ) : null
                ) : uncheckedIcon ? (
                    <IconWrapper size={size}>{uncheckedIcon}</IconWrapper>
                ) : null}
            </RadioControl>
            {!rtl && label && <RadioLabel>{label}</RadioLabel>}
        </RadioWrapper>
    );
};
