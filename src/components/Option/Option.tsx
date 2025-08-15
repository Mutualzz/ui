import styled from "@styled";

import { SelectContext } from "@components/Select/Select.context";
import type { Size, SizeValue } from "@ui-types";
import { useContext } from "react";
import { resolveOptionSize, resolveOptionStyles } from "./Option.helpers";
import type { OptionProps } from "./Option.types";

const OptionWrapper = styled("div")<
    Omit<OptionProps, "value"> & {
        isSelected: boolean;
        size: Size | SizeValue | number;
    }
>(
    ({
        theme,
        color = "neutral",
        variant = "outlined",
        disabled,
        isSelected,
        size,
    }) => ({
        ...resolveOptionStyles(theme, color, isSelected)[variant],
        ...resolveOptionSize(theme, size),
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        outline: "none",
        transition: "background 0.2s",
    }),
);

const Option = ({
    value,
    disabled: disabledProp,
    color: colorProp = "neutral",
    variant: variantProp = "outlined",
    size: sizeProp = "md",
    label,
    children,
    ...props
}: OptionProps) => {
    const parent = useContext(SelectContext);

    const color = parent?.color ?? colorProp;
    const variant = parent?.variant ?? variantProp;
    const size = parent?.size ?? sizeProp;
    const disabled = parent?.disabled ?? disabledProp;

    const isSelected = parent?.multiple
        ? Array.isArray(parent.value) && parent.value.includes(value)
        : parent?.value === value;

    return (
        <OptionWrapper
            role="option"
            aria-selected={isSelected}
            color={color}
            variant={variant}
            size={size}
            isSelected={isSelected}
            aria-disabled={disabled}
            tabIndex={-1}
            data-value={value}
            data-label={label}
            data-selected={isSelected}
            data-disabled={disabled}
            onMouseDown={() => {
                if (!disabled) parent?.onSelect(value);
            }}
            {...props}
        >
            {children ?? label ?? value}
        </OptionWrapper>
    );
};

Option.displayName = "Option";

export { Option };
