import { InputColor } from "@components/InputColor/InputColor";
import type { InputColorProps } from "@components/InputColor/InputColor.types";
import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import { InputOther } from "@components/InputOther/InputOther";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import type { InputTextProps } from "@components/InputText/InputText.types";
import { InputNumber } from "../InputNumber/InputNumber";
import { InputPassword } from "../InputPassword/InputPassword";
import { InputText } from "../InputText/InputText";
import type { InputProps, InputRootProps } from "./Input.types";

export const Input = (props: InputProps) => {
    switch (props.type) {
        case "number":
            return <InputNumber {...(props as InputNumberProps)} />;
        case "password":
            return <InputPassword {...(props as InputPasswordProps)} />;
        case "color":
            return <InputColor {...(props as InputColorProps)} />;
        case "text":
            return <InputText {...(props as InputTextProps)} />;
        default:
            return <InputOther {...(props as InputRootProps)} />;
    }
};

export * from "@components/InputColor/InputColor";
export * from "@components/InputNumber/InputNumber";
export * from "@components/InputPassword/InputPassword";
export * from "@components/InputText/InputText";
