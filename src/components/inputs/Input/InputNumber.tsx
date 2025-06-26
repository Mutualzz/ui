import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
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
    value: initialValue,
    ...props
}: InputNumberProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>(initialValue ?? "");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (val === "" || /^-?(?:\d+)?(?:\.\d*)?$/.test(val)) {
            setValue(val);
            onChange?.(e);
        } else {
            e.preventDefault();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        const raw = value.trim();

        const isNegativeOnly = raw === "-";
        const isEmpty = raw === "";

        let current: number;

        if (isEmpty || isNegativeOnly) {
            current = 0;
        } else {
            current = parseFloat(raw);
            if (isNaN(current)) return;
        }

        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                const next = Math.min(current + step, max);
                setValue(next.toString());
                onIncrement?.();
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                const next = Math.max(current - step, min);
                setValue(next.toString());
                onDecrement?.();
                break;
            }
        }
    };

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
                type="text"
                inputMode="decimal"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
