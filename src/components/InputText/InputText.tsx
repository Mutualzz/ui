import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import type { InputProps } from "@components/Input/Input.types";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import type { Ref } from "react";

/**
 * InputText component for entering text.
 */
const InputText = (
    {
        color = "neutral",
        textColor = "inherit",
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
    }: InputProps,
    ref?: Ref<HTMLInputElement>,
) => {
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

            <InputBase ref={ref} type={type} {...props} />

            {endDecorator && (
                <DecoratorWrapper>{endDecorator}</DecoratorWrapper>
            )}
        </InputRoot>
    );
};

InputText.displayName = "InputText";

export { InputText };
