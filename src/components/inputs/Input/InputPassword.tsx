import { useState, type Ref } from "react";
import type { InputPasswordProps } from "./Input.types";
import { DecoratorWrapper, InputBase, InputRoot } from "./InputBase";

const EyeOpenIcon = () => (
    <svg
        width="50%"
        height="50%"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
        <circle cx={12} cy={12} r={3} />
    </svg>
);

const EyeClosedIcon = () => (
    <svg
        width="50%"
        height="50%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.3 20.3 0 0 1 5.09-5.91M10.58 10.58A3 3 0 0 0 13.41 13.41M9.88 3.88A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a20.3 20.3 0 0 1-4.38 4.38M1 1l22 22" />
    </svg>
);

export const PasswordInput = (
    {
        color = "neutral",
        variant = "outlined",
        size = "md",
        startDecorator,
        endDecorator,
        fullWidth = false,
        error = false,
        disabled = false,
        iconVisible = true,
        showPasswordIcon,
        hidePasswordIcon,
        onTogglePassword,
        onShowPassword,
        onHidePassword,
        children,
        ...props
    }: InputPasswordProps,
    ref?: Ref<HTMLInputElement>,
) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => {
            const next = !prev;
            if (next && onShowPassword) onShowPassword();
            if (!next && onHidePassword) onHidePassword();
            if (onTogglePassword) onTogglePassword();
            return next;
        });
    };

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
                {...props}
                ref={ref}
                color={color}
                variant={variant}
                size={size as number}
                fullWidth={fullWidth}
                error={error}
                disabled={disabled}
                type={passwordVisible ? "text" : "password"}
            />
            {hasEnd ? (
                <DecoratorWrapper position="end" size={size}>
                    {endDecorator}
                </DecoratorWrapper>
            ) : (
                iconVisible && (
                    <DecoratorWrapper
                        position="end"
                        size={size}
                        onClick={() => {
                            togglePassword();
                        }}
                        css={{
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                    >
                        {passwordVisible
                            ? (hidePasswordIcon ?? <EyeOpenIcon />)
                            : (showPasswordIcon ?? <EyeClosedIcon />)}
                    </DecoratorWrapper>
                )
            )}
        </InputRoot>
    );
};
