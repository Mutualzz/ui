import { InputColor } from "@components/web/InputColor/InputColor";
import type { InputColorProps } from "@components/web/InputColor/InputColor.types";
import { InputNumber } from "@components/web/InputNumber/InputNumber";
import type { InputNumberProps } from "@components/web/InputNumber/InputNumber.types";
import { InputPassword } from "@components/web/InputPassword/InputPassword";
import type { InputPasswordProps } from "@components/web/InputPassword/InputPassword.types";
import type { InputRootProps } from "@components/web/InputRoot/InputRoot.types";
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
