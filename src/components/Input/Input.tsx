import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import { InputNumber } from "../InputNumber/InputNumber";
import { InputPassword } from "../InputPassword/InputPassword";
import { InputText } from "../InputText/InputText";
import type { InputProps } from "./Input.types";

export const Input = (
    props: InputProps | InputPasswordProps | InputNumberProps,
) => {
    switch (props.type) {
        case "number":
            return <InputNumber {...(props as InputNumberProps)} />;
        case "password":
            return <InputPassword {...(props as InputPasswordProps)} />;
        default:
            return <InputText {...(props as InputProps)} />;
    }
};
