import { InputColor } from "@components/InputColor/InputColor";
import type { InputColorProps } from "@components/InputColor/InputColor.types";
import { InputNumber } from "@components/InputNumber/InputNumber";
import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import { InputPassword } from "@components/InputPassword/InputPassword";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import type { InputRootProps } from "@components/InputRoot/InputRoot.types";
import { forwardRef } from "react";
import { InputDefault } from "../InputDefault/InputDefault";
import type { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    switch (props.type) {
        case "color":
            return <InputColor ref={ref} {...(props as InputColorProps)} />;
        case "password":
            return (
                <InputPassword ref={ref} {...(props as InputPasswordProps)} />
            );
        case "number":
            return <InputNumber ref={ref} {...(props as InputNumberProps)} />;
        default:
            return <InputDefault ref={ref} {...(props as InputRootProps)} />;
    }
});

Input.displayName = "Input";

export { Input };
