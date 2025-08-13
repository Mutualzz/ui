import type { InputRootProps } from "@components/InputRoot/InputRoot.types";

export interface InputTextProps
    extends Omit<InputRootProps, "onChange" | "type"> {
    type: "text";
}
