import type { InputRootProps } from "@components/InputRoot/InputRoot.types";
import type { ColorLike } from "@ui-types";

export interface InputColorProps
    extends Omit<
        InputRootProps,
        "onChange" | "type" | "value" | "defaultValue"
    > {
    /**
     * The type of the input element.
     *
     * @readonly
     * @default "color"
     */
    type?: "color";

    /**
     * Whether to show the color picker.
     * @default true
     */
    showColorPicker?: boolean;

    /**
     * Whether to show a random color button.
     * @default false
     */
    showRandom?: boolean;

    /**
     * Whether to show the alpha channel slider.
     * @default true
     */
    showAlpha?: boolean;

    /**
     * Whether to allow gradient colors.
     * @default false
     */
    allowGradient?: boolean;

    /**
     * The current alpha value (0-100)
     * @default 100
     */
    alpha?: number;

    /**
     * The current color value.
     */
    value?: ColorLike;

    defaultValue?: ColorLike;

    onChange?: (color: ColorLike) => void;
    onAlphaChange?: (alpha: number) => void;
}
