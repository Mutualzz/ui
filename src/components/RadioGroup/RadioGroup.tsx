import styled from "@emotion/styled";
import { type ChangeEvent, useState } from "react";
import { RadioGroupContext } from "./RadioGroup.context";
import type { RadioGroupProps } from "./RadioGroup.types";

const RadioGroupButtonWrapper = styled("div")<{ row?: boolean }>`
    display: inline-flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    ${({ row }) =>
        row
            ? "& > * + * { margin-left: 0.5rem; }"
            : "& > * + * { margin-top: 0.5rem; }"};
`;

RadioGroupButtonWrapper.displayName = "RadioGroupButtonWrapper";

/**
 * RadioGroup component for grouping radio buttons.
 * It allows for selecting one option from a set of radio buttons.
 * The component can be controlled or uncontrolled.
 * It supports different layouts (row or column) and can handle disabled states.
 * The `onChange` event handler is called when the selected radio button changes.
 * The `name` prop is used to group radio inputs, and the `value` prop
 * is used to set the selected value.
 * The `defaultValue` prop can be used to set the initial selected value.
 * The `children` prop allows for passing in radio button components.
 */
const RadioGroup = ({
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    row,
    children,
}: RadioGroupProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        newValue: string,
    ) => {
        if (!isControlled) setInternalValue(newValue);
        onChange?.(e, newValue);
    };

    return (
        <RadioGroupContext.Provider
            value={{
                name,
                value: currentValue,
                onChange: handleChange,
                disabled,
            }}
        >
            <RadioGroupButtonWrapper row={row}>
                {children}
            </RadioGroupButtonWrapper>
        </RadioGroupContext.Provider>
    );
};

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
