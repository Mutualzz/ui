import { useRef } from "react";
import type { InputNumberProps } from "./Input.types";
import { DecoratorWrapper, InputBase, InputRoot } from "./InputBase";

export const InputNumber = ({
    color = "neutral",
    variant = "outlined",
    size = "md",
    startDecorator,
    endDecorator,
    fullWidth = false,
    error = false,
    disabled = false,
    step = 1,
    min = -Infinity,
    max = Infinity,
    onChange,
    onIncrement,
    onDecrement,
    children,
    ...props
}: InputNumberProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <InputRoot
            color={color}
            variant={variant}
            size={size as number}
            fullWidth={fullWidth}
            error={error}
            disabled={disabled}
        >
            {startDecorator && (
                <DecoratorWrapper>{startDecorator}</DecoratorWrapper>
            )}

            <InputBase
                ref={inputRef}
                {...props}
                type="number"
                inputMode="decimal"
                onChange={onChange}
                min={min}
                max={max}
                step={step}
            />

            {endDecorator && (
                <DecoratorWrapper>{endDecorator}</DecoratorWrapper>
            )}
        </InputRoot>
    );
};
