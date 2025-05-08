import styled from "@emotion/styled";
import { useState, type ChangeEvent, type FC } from "react";
import { type Size } from "../../../types";
import {
    resolveCheckboxStyles,
    resolveIconScaling,
    variantColors,
} from "./Checkbox.helpers";
import { type CheckboxProps } from "./Checkbox.types";

const CheckboxWrapper = styled("label")<CheckboxProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;

    ${({ disabled }) => disabled && "opacity: 0.5; pointer-events: none;"}
    ${({ size = "md" }) => resolveCheckboxStyles(size)};
`;

const HiddenCheckbox = styled("input")`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0;
    padding: 0;
    opacity: 0;
`;

const CheckboxBox = styled("span")<CheckboxProps>`
    position: relative;
    width: 1em;
    height: 1em;
    border: 1px solid currentColor;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    ${({ theme, color = "primary", variant = "plain", checked }) =>
        variantColors(theme, color, checked)[variant]}

    input[type="checkbox"]:hover + & {
        ${({ theme, color = "primary", variant = "plain" }) =>
            variantColors(theme, color, true)[variant]}
    }

    input[type="checkbox"]:active + & {
        ${({ theme, color = "primary", variant = "plain" }) =>
            variantColors(theme, color, true)[variant]}
    }

    input[type="checkbox"]:focus-visible + & {
        box-shadow: 0 0 0 3px
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
        opacity: ${({ checked }) => (checked ? 1 : 0)};
        transition: opacity 0.2s ease;
    }

    border-radius: 4px;
    padding: 0;
`;

const CheckboxLabel = styled("span")<{ rtl?: boolean }>`
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

export const Checkbox: FC<CheckboxProps> = ({
    checked: controlledChecked,
    onChange,
    label,
    disabled,
    color = "primary",
    variant = "solid",
    size = "md",
    name,
    value,
    uncheckedIcon,
    checkedIcon,
    indeterminate,
    indeterminateIcon,
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
        <CheckboxWrapper disabled={disabled} size={size}>
            <HiddenCheckbox
                type="checkbox"
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
                ref={(el) => {
                    if (el) {
                        el.indeterminate = indeterminate ?? false;
                    }
                }}
            />
            {rtl && label && <CheckboxLabel rtl={rtl}>{label}</CheckboxLabel>}
            <CheckboxBox
                role="checkbox"
                aria-checked={isChecked}
                color={color}
                variant={variant}
                checked={isChecked}
                disabled={disabled}
                size={size}
                {...props}
            >
                {indeterminate ? (
                    indeterminateIcon ? (
                        <IconWrapper size={size}>
                            {indeterminateIcon}
                        </IconWrapper>
                    ) : (
                        <IconWrapper size={size}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                        </IconWrapper>
                    )
                ) : isChecked ? (
                    checkedIcon ? (
                        <IconWrapper size={size}>{checkedIcon}</IconWrapper>
                    ) : (
                        <IconWrapper size={size}>
                            <svg
                                viewBox="2 2 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="4 12 10 18 20 6" />
                            </svg>
                        </IconWrapper>
                    )
                ) : uncheckedIcon ? (
                    <IconWrapper size={size}>{uncheckedIcon}</IconWrapper>
                ) : null}
            </CheckboxBox>
            {!rtl && label && <CheckboxLabel rtl={rtl}>{label}</CheckboxLabel>}
        </CheckboxWrapper>
    );
};
