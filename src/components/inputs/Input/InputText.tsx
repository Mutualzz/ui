import type { Ref } from "react";
import type { InputBaseProps } from "./Input.types";
import { DecoratorWrapper, InputBase, InputRoot } from "./InputBase";

export const InputText = (
    {
        color = "neutral",
        variant = "outlined",
        size = "md",
        startDecorator,
        endDecorator,
        fullWidth = false,
        error = false,
        disabled = false,
        type = "text",
        children,
        ...props
    }: InputBaseProps,
    ref?: Ref<HTMLInputElement>,
) => {
    const hasStart = !!startDecorator;
    const hasEnd = !!endDecorator;

    return (
        <InputRoot fullWidth={fullWidth}>
            {hasStart && (
                <DecoratorWrapper position="start" size={size}>
                    {startDecorator}
                </DecoratorWrapper>
            )}
            <InputBase
                ref={ref}
                color={color}
                variant={variant}
                size={size as number}
                fullWidth={fullWidth}
                error={error}
                disabled={disabled}
                type={type}
                {...props}
            />
            {hasEnd && (
                <DecoratorWrapper position="end" size={size}>
                    {endDecorator}
                </DecoratorWrapper>
            )}
        </InputRoot>
    );
};
