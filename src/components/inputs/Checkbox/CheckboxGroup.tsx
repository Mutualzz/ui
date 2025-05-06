import styled from "@emotion/styled";
import {
    ChangeEvent,
    Children,
    cloneElement,
    FC,
    isValidElement,
    useState,
} from "react";
import { CheckboxGroupProps, CheckboxProps } from "./Checkbox.types";

const CheckboxGroupWrapper = styled("div")<{ row?: boolean }>`
    display: inline-flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    ${({ row }) =>
        row
            ? "& > * + * { margin-left: 0.5rem; }"
            : "& > * + * { margin-top: 0.5rem; }"};
`;

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    row,
    children,
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = controlledValue ?? internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        if (!controlledValue) setInternalValue(newVal);

        onChange?.(e, [...currentValue, newVal]);
    };

    const items = Children.map(children, (child) => {
        if (!isValidElement<CheckboxProps>(child)) return child;
        return cloneElement(child, {
            name,
            disabled: disabled ?? child.props.disabled,
            onChange: handleChange,
            checked: child.props.value === currentValue,
        });
    });

    return <CheckboxGroupWrapper row={row}>{items}</CheckboxGroupWrapper>;
};
