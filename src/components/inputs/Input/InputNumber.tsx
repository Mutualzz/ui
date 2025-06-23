import { useRef, type ChangeEvent, type FormEvent } from "react";
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
    onChange,
    onIncrement,
    onDecrement,
    children,
    ...props
}: InputNumberProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const hasStart = !!startDecorator;
    const hasEnd = !!endDecorator;

    const handleBeforeInput = (e: FormEvent<HTMLInputElement>) => {
        const input = e as unknown as InputEvent;
        const nextValue = inputRef.current?.value ?? "";

        const newChar = input.data ?? "";
        const selectionStart = inputRef.current?.selectionStart ?? 0;
        const selectionEnd = inputRef.current?.selectionEnd ?? 0;

        const proposedValue =
            nextValue.slice(0, selectionStart) +
            newChar +
            nextValue.slice(selectionEnd);

        if (newChar === "-" && selectionStart !== 0) {
            input.preventDefault();
            return;
        }

        // Regex: allows "", "-", "-123", "-123.45", "0.5", "123."
        // Improved regex to avoid super-linear backtracking
        const isValid = /^-?(?:\d+(\.\d*)?|\.\d*)?$/.test(proposedValue);

        if (!isValid) input.preventDefault(); // blocks invalid char
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (val === "" || /^-?\d+(\.\d*)?$/.test(val)) onChange?.(e);
        else e.preventDefault();
    };

    return (
        <InputRoot fullWidth={fullWidth}>
            {hasStart && (
                <DecoratorWrapper position="start" size={size}>
                    {startDecorator}
                </DecoratorWrapper>
            )}
            <InputBase
                ref={inputRef}
                color={color}
                variant={variant}
                size={size as number}
                fullWidth={fullWidth}
                error={error}
                disabled={disabled}
                {...props}
                type="text"
                inputMode="decimal"
                onChange={handleChange}
                onBeforeInput={handleBeforeInput as any}
            />
            {hasEnd && (
                <DecoratorWrapper position="end" size={size}>
                    {endDecorator}
                </DecoratorWrapper>
            )}
        </InputRoot>
    );
};
