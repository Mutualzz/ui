import { DecoratorWrapper } from "@components/DecoratorWrapper/DecoratorWrapper";
import { InputBase } from "@components/InputBase/InputBase";
import { InputRoot } from "@components/InputRoot/InputRoot";
import type { Ref } from "react";
import type { InputRootProps } from "./Input.types";

/**
 * Input component for entering non-custom inputs.
 */
const Input = (
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

Input.displayName = "Input";

export { Input };

export * from "@components/InputColor/InputColor";
export * from "@components/InputNumber/InputNumber";
export * from "@components/InputPassword/InputPassword";
export * from "@components/InputRoot/InputRoot";

export type * from "@components/InputColor/InputColor.types";
export type * from "@components/InputNumber/InputNumber.types";
export type * from "@components/InputPassword/InputPassword.types";
export type * from "@components/InputRoot/InputRoot.types";
