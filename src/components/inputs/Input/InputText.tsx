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
                <DecoratorWrapper size={size}>
                    {startDecorator}
                </DecoratorWrapper>
            )}

            <InputBase ref={ref} type={type} {...props} />

            {endDecorator && (
                <DecoratorWrapper size={size}>{endDecorator}</DecoratorWrapper>
            )}
        </InputRoot>
    );
};
