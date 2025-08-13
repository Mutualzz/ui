import type { InputColorProps } from "@components/InputColor/InputColor.types";
import type { InputNumberProps } from "@components/InputNumber/InputNumber.types";
import type { InputPasswordProps } from "@components/InputPassword/InputPassword.types";
import type { InputRootProps } from "@components/InputRoot/InputRoot.types";
import type { InputTextProps } from "@components/InputText/InputText.types";

export type InputProps =
    | InputRootProps
    | InputColorProps
    | InputPasswordProps
    | InputNumberProps
    | InputTextProps;

export type * from "@components/InputColor/InputColor.types";
export type * from "@components/InputNumber/InputNumber.types";
export type * from "@components/InputPassword/InputPassword.types";
export type * from "@components/InputRoot/InputRoot.types";
