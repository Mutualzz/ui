import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper.web";
import { InputBase } from "@components/InputBase/InputBase.web";
import type { InputRootProps } from "@components/InputRoot/InputRoot.types";
import { InputRoot } from "@components/InputRoot/InputRoot.web";
import { forwardRef } from "react";

/**
 * Input component for entering non-custom inputs.
 */
const InputDefault = forwardRef<HTMLInputElement, InputRootProps>(
    (
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
        ref,
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
    },
);

InputDefault.displayName = "InputDefault";

export { InputDefault };
