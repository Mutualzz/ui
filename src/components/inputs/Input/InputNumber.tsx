import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import type { InputNumberProps } from "./Input.types";
import { DecoratorWrapper, InputBase, InputRoot } from "./InputBase";

export const InputNumber = ({
    color = "neutral",
    textColor = "inherit",
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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key, ctrlKey, metaKey, currentTarget } = e;
        const cursorPos = currentTarget.selectionStart ?? 0;
        const { value } = currentTarget;

        const allowedModifierKeys = [
            "Backspace",
            "Delete",
            "Tab",
            "Escape",
            "Enter",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
        ];

        const isCtrlOrMetaKey = ctrlKey || metaKey;
        const isDigit = /^\d$/.test(key);
        const isMinus = key === "-";
        const isDot = key === ".";

        if (
            allowedModifierKeys.includes(key) ||
            isDigit ||
            (isCtrlOrMetaKey && key.toLowerCase() === "a") ||
            (isCtrlOrMetaKey && key.toLowerCase() === "c") || // copy
            (isCtrlOrMetaKey && key.toLowerCase() === "v") || // paste
            (isCtrlOrMetaKey && key.toLowerCase() === "x") // cut
        )
            return;

        if (isMinus && cursorPos === 0 && !value.includes("-")) return;

        if (isDot && !value.includes(".")) return;

        e.preventDefault();
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text");
        if (!/^-?\d*(\.\d*)?$/.test(pasted.trim())) e.preventDefault();
    };

    return (
        <InputRoot
            color={color}
            textColor={textColor}
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
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
            />

            {endDecorator && (
                <DecoratorWrapper>{endDecorator}</DecoratorWrapper>
            )}
        </InputRoot>
    );
};
