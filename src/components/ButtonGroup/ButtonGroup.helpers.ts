import type { CSSObject, Theme } from "@emotion/react";
import type { Color, ColorLike, Orientation, Variant } from "@ui-types";
import { darken, resolveColor } from "@utils";
import { formatHex8, parse } from "culori";

export const resolveButtonGroupStyles = (
    theme: Theme,
    orientation: Orientation,
    color: Color | ColorLike = "primary",
    variant: Variant = "solid",
    separatorColor?: Color | ColorLike,
): CSSObject => {
    const parsedColor = separatorColor
        ? parse(resolveColor(separatorColor, theme))
        : parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const horizontalBorders: Record<Variant, CSSObject> = {
        solid: {
            borderLeft: `1px solid ${formatHex8(separatorColor ? parsedColor : darken(parsedColor, 0.5))}`,
        },
        outlined: {},
        plain: {
            borderLeft: `1px solid ${formatHex8(separatorColor ? parsedColor : darken(parsedColor, 0.3))}`,
        },
        soft: {
            borderLeft: `1px solid ${formatHex8(separatorColor ? parsedColor : darken(parsedColor, 0.1))}`,
        },
    };

    const verticalBorders: Record<Variant, CSSObject> = {
        solid: {
            borderTop: `1px solid ${formatHex8(separatorColor ? parsedColor : darken(parsedColor, 0.5))}`,
        },
        outlined: {},
        plain: {
            borderTop: `1px solid ${formatHex8(separatorColor ? parsedColor : darken(parsedColor, 0.3))}`,
        },
        soft: {
            borderTop: `1px solid ${formatHex8(separatorColor ? parsedColor : darken(parsedColor, 0.1))}`,
        },
    };

    return orientation === "horizontal"
        ? {
              "&:first-of-type": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:not(:first-of-type):not(:last-of-type)": {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:last-of-type": {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
              },
              "&:not(:first-of-type)": horizontalBorders[variant],
          }
        : {
              "&:first-child": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:not(:first-child):not(:last-child)": {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:last-child": {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
              },
              "&:not(:first-child)": verticalBorders[variant],
          };
};
