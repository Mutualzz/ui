import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import { InputBase, InputRoot } from "@components/InputBase/InputBase";
import type { InputBaseProps } from "@components/InputBase/InputBase.types";
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
    }: InputBaseProps,
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
