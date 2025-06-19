import styled from "@emotion/styled";
import {
    type ChangeEvent,
    Children,
    cloneElement,
    type FC,
    isValidElement,
    useState,
} from "react";
import { type RadioGroupProps, type RadioProps } from "./Radio.types";

const RadioGroupButtonWrapper = styled("div")<{ row?: boolean }>`
    display: inline-flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    ${({ row }) =>
        row
            ? "& > * + * { margin-left: 0.5rem; }"
            : "& > * + * { margin-top: 0.5rem; }"};
`;

export const RadioGroup: FC<RadioGroupProps> = ({
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

        onChange?.(e, newVal);
    };

    const items = Children.map(children, (child) => {
        if (!isValidElement<RadioProps>(child)) return child;
        return cloneElement(child, {
            name,
            disabled: disabled ?? child.props.disabled,
            onChange: handleChange,
            checked: child.props.value === currentValue,
        });
    });

    return <RadioGroupButtonWrapper row={row}>{items}</RadioGroupButtonWrapper>;
};
