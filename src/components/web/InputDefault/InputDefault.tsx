import { DecoratorWrapper } from "@components/web/DecoratorWrapper/DecoratorWrapper";
import { InputBase } from "@components/web/InputBase/InputBase";
import { InputRoot } from "@components/web/InputRoot/InputRoot";
import type { InputRootProps } from "@components/web/InputRoot/InputRoot.types";
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
