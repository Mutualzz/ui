import type { InputBaseProps, InputPasswordProps } from "./Input.types";
import { PasswordInput } from "./InputPassword";
import { TextInput } from "./InputText";

export const Input = (props: InputBaseProps | InputPasswordProps) => {
    switch (props.type) {
        case "password":
            return <PasswordInput {...(props as InputPasswordProps)} />;
        default:
            return <TextInput {...(props as InputBaseProps)} />;
    }
};
