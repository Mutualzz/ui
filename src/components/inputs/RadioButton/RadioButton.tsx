import styled from "@emotion/styled";
import { type ChangeEvent, type FC, useState } from "react";
import type { Size } from "../../../types";
import {
    resolveIconScaling,
    resolveRadioStyles,
    variantColors,
} from "./RadioButton.helpers";
import type { RadioButtonProps } from "./RadioButton.types";

const RadioWrapper = styled("label")<RadioButtonProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;

    ${({ disabled }) => disabled && "opacity: 0.5; pointer-events: none;"}
    ${({ size = "md" }) => resolveRadioStyles(size)};
`;

const HiddenRadio = styled("input")`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0;
    padding: 0;
    opacity: 0;
`;

const RadioControl = styled("span")<RadioButtonProps>`
    position: relative;
    width: 1em;
    height: 1em;
    border: 1px solid currentColor;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    ${({ theme, color = "primary", variant = "plain", checked }) =>
        variantColors(theme, color, checked)[variant]}

    input[type="radio"]:hover + & {
        ${({ theme, color = "primary", variant = "plain" }) =>
            variantColors(theme, color, true)[variant]}
    }
    input[type="radio"]:active + & {
        ${({ theme, color = "primary", variant = "plain" }) =>
            variantColors(theme, color, true)[variant]}
    }
    input[type="radio"]:focus-visible + & {
        box-shadow: 0 0 0 3px $
            ${({ theme, color = "primary" }) =>
                variantColors(theme, color, true).solid.backgroundColor};
        outline: none;
    }

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.5em;
        height: 0.5em;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: currentColor;
        opacity: ${({ checked }) => (checked ? 1 : 0)};
        transition: opacity 0.2s ease;
    }

    border-radius: 50%;
    padding: 0;
`;

const RadioLabel = styled("span")<{ rtl?: boolean }>`
    ${({ rtl }) => (rtl ? "margin-right: 0.5em;" : "margin-left: 0.5em;")}
`;

const IconWrapper = styled("span")<{ size?: Size | number }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    ${({ size = "md" }) => resolveIconScaling(size)};

    & > * {
        width: 100%;
        height: 100%;
    }
`;

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
