import type { Properties } from "csstype";
import type { Color, ColorLike, Responsive, TypographyColor } from "../";

export interface HTMLPalleteProps {
    color?: Responsive<
        Color | TypographyColor | ColorLike | Properties["color"]
    >;
    bgColor?: Responsive<
        Color | TypographyColor | ColorLike | Properties["backgroundColor"]
    >;
}
