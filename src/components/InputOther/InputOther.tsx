import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import type { InputRootProps } from "@components/Input/Input.types";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import type { Ref } from "react";

/**
 * InputOther component for entering any other types of data.
 */
const InputOther = (
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
    }: InputRootProps,
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

InputOther.displayName = "InputOther";

export { InputOther };
