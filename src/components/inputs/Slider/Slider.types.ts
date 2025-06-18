import type {
    ChangeEvent,
    InputHTMLAttributes,
    MouseEvent,
    ReactNode,
    TouchEvent,
} from "react";
import type { Color, ColorLike, Size, Variant } from "../../../types";

export interface SliderMark {
    value: number;
    label?: ReactNode;
}

export type SliderOrientation = "horizontal" | "vertical";
export type SliderValueLabelDisplay = "off" | "on" | "auto";

export interface SliderProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "size" | "step" | "onChange" | "value" | "defaultValue"
    > {
    color?: Color | ColorLike;
    size?: Size | number;
    variant?: Variant;

    disabled?: boolean;

    orientation?: SliderOrientation;

    min?: number;
    max?: number;
    step?: number | null;

    defaultValue?: number | number[];
    value?: number | number[];

    disableSwap?: boolean;

    marks?: boolean | SliderMark[];

    valueLabelDisplay?: SliderValueLabelDisplay;
    valueLabelFormat?: string | ((value: number, index: number) => ReactNode);

    onChange?: (
        event: ChangeEvent<HTMLInputElement>,
        value: number | number[],
    ) => void;

    onChangeCommitted?: (
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
        value: number | number[],
    ) => void;

    getAriaLabel?: (index: number) => string;
    getAriaValueText?: (value: number, index: number) => string;

    // Takes up the full width of the parent container
    full?: boolean;
    // Custom length for the slider, useful for horizontal sliders
    length?: number;
}
