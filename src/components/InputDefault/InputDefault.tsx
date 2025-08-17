import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import type { InputRootProps } from "@components/InputRoot/InputRoot.types";
import type { Ref } from "react";

/**
 * Input component for entering non-custom inputs.
 */
const InputDefault = (
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
    }: InputRootProps,
    ref?: Ref<HTMLInputElement>,
) => {
    return (
        <InputRoot
            color={color as string}
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

InputDefault.displayName = "InputDefault";

export { InputDefault };
