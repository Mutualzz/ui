import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import type { Ref } from "react";
import type { InputTextProps } from "./InputText.types";

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
        children,
        type = "text",
        ...props
    }: InputTextProps,
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

            <InputBase {...props} ref={ref} type={type} />

            {endDecorator && (
                <DecoratorWrapper>{endDecorator}</DecoratorWrapper>
            )}
        </InputRoot>
    );
};

InputText.displayName = "InputText";

export { InputText };
