import styled from "@emotion/styled";
import { type ChangeEvent, useState } from "react";
import { CheckboxGroupContext } from "./CheckboxGroup.context";
import type { CheckboxGroupProps } from "./CheckboxGroup.types";

const CheckboxGroupWrapper = styled("div")<{ row?: boolean }>`
    display: inline-flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    ${({ row }) =>
        row
            ? "& > * + * { margin-left: 0.5rem; }"
            : "& > * + * { margin-top: 0.5rem; }"};
`;

CheckboxGroupWrapper.displayName = "CheckboxGroupWrapper";

/**
 * CheckboxGroup component that renders a group of checkboxes.
 * It allows for controlled or uncontrolled state management of the checkboxes.
 * The component supports a `name` prop for grouping checkboxes, a `value` prop for controlled state,
 * a `defaultValue` for uncontrolled state, and an `onChange` callback for handling changes.
 * It also supports disabling all checkboxes in the group and arranging them in a row or column layout.
 * The `children` prop should contain Checkbox components or valid React elements
 */
const CheckboxGroup = ({
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    row,
    children,
}: CheckboxGroupProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? []);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        checked: boolean,
    ) => {
        const val = e.target.value;
        const newValue = checked
            ? Array.from(new Set([...currentValue, val])) // Deduplication
            : currentValue.filter((v) => v !== val);

        if (!isControlled) setInternalValue(newValue);
        onChange?.(e, newValue);
    };

    return (
        <CheckboxGroupContext.Provider
            value={{
                name,
                value: currentValue,
                onChange: (e, _) => handleChange(e, e.target.checked),
                disabled,
            }}
        >
            <CheckboxGroupWrapper row={row}>{children}</CheckboxGroupWrapper>
        </CheckboxGroupContext.Provider>
    );
};

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
