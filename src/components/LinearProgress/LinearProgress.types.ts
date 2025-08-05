import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";

export type LinearProgressAnimation =
    | "slide"
    | "wave"
    | "bounce"
    | "scale-in-out";

export interface LinearProgressProps {
    /**
     * The length of the progress bar.
     * Can be a predefined size or a custom value.
     *
     * @default "md"
     * @min 80
     * @max 240
     * @example "sm", "md", "lg", 150
     */
    length?: Size | number;
    /**
     * The thickness of the progress bar.
     * Can be a predefined size or a custom value.
     *
     * @default "md"
     * @min 4
     * @max 16
     * @example "sm", "md", "lg", 8
     */
    thickness?: Size | number;
    /**
     * The variant of the progress bar.
     *
     * @default "soft"
     * @example "plain", "solid", "soft", "outlined"
     */
    variant?: Variant;
    /**
     * The color of the progress bar.
     * Can be a color name or a color value.
     *
     * @default "primary"
     * @example "primary", "neutral", "success", "info", "warning", "danger", "#ff5733"
     */
    color?: Color | ColorLike;
    /**
     * The animation type for the indeterminate progress bar.
     *
     * @default "bounce"
     * @example "slide", "wave", "bounce", "scale-in-out"
     */
    animation?: LinearProgressAnimation;
    /**
     * Whether the progress bar is determinate or indeterminate.
     * If true, the `value` prop is used to determine the progress.
     * If false, the progress bar will animate indefinitely.
     *
     * @default false
     */
    determinate?: boolean;
    /**
     * The value of the progress bar when determinate.
     * Should be a number between 0 and 100.
     *
     * @default 0
     * @remarks This prop is only used when `determinate` is true.
     */
    value?: number;
}
