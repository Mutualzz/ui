import type { InputColorProps } from "@components/web/InputColor/InputColor.types";
import type { InputNumberProps } from "@components/web/InputNumber/InputNumber.types";
import type { InputPasswordProps } from "@components/web/InputPassword/InputPassword.types";
import type { InputRootProps } from "@components/web/InputRoot/InputRoot.types";

export type InputProps =
    | ({ type?: "color" } & InputColorProps)
    | ({ type?: "password" } & InputPasswordProps)
    | ({ type?: "number" } & InputNumberProps)
    | InputRootProps;
