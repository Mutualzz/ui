import type { InputColorProps } from "@components/InputColor/InputColor.types";
import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import type { InputRootProps } from "@components/InputRoot/InputRoot.types";

export type InputProps =
    | ({ type?: "color" } & InputColorProps)
    | ({ type?: "password" } & InputPasswordProps)
    | ({ type?: "number" } & InputNumberProps)
    | InputRootProps;
