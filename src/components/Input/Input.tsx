import { InputColor } from "@components/InputColor/InputColor";
import type { InputColorProps } from "@components/InputColor/InputColor.types";
import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import type { InputTextProps } from "@components/InputText/InputText.types";
import { InputNumber } from "../InputNumber/InputNumber";
import { InputPassword } from "../InputPassword/InputPassword";
import { InputText } from "../InputText/InputText";
import type { InputProps } from "./Input.types";

export const Input = (props: InputProps) => {
    switch (props.type) {
        case "number":
            return <InputNumber {...(props as InputNumberProps)} />;
        case "password":
            return <InputPassword {...(props as InputPasswordProps)} />;
        case "color":
            return <InputColor {...(props as InputColorProps)} />;
        case "text":
        default:
            return <InputText {...(props as InputTextProps)} />;
    }
};

export * from "@components/InputColor/InputColor";
export * from "@components/InputNumber/InputNumber";
export * from "@components/InputPassword/InputPassword";
export * from "@components/InputText/InputText";

export type * from "@components/InputColor/InputColor.types";
export type * from "@components/InputNumber/InputNumber.types";
export type * from "@components/InputPassword/InputPassword.types";
export type * from "@components/InputText/InputText.types";
