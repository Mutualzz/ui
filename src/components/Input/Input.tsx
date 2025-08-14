import { InputColor } from "@components/InputColor/InputColor";
import type { InputColorProps } from "@components/InputColor/InputColor.types";
import { InputNumber } from "@components/InputNumber/InputNumber";
import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import { InputPassword } from "@components/InputPassword/InputPassword";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import type { InputRootProps } from "@components/InputRoot/InputRoot.types";
import { InputDefault } from "../InputDefault/InputDefault";
import type { InputProps } from "./Input.types";

const Input = (props: InputProps) => {
    switch (props.type) {
        case "color":
            return <InputColor {...(props as InputColorProps)} />;
        case "password":
            return <InputPassword {...(props as InputPasswordProps)} />;
        case "number":
            return <InputNumber {...(props as InputNumberProps)} />;
        default:
            return <InputDefault {...(props as InputRootProps)} />;
    }
};

Input.displayName = "Input";

export { Input };
