import type { FC } from "react";

import { useTheme } from "../../../hooks/useTheme";

import styled from "../../../utils/styled";
import { resolveDividerColor, resolveDividerVariant } from "./Divider.helpers";
import type { DividerProps, DividerVariant } from "./Divider.types";

const DividerWrapper = styled("div")<{ isVertical?: boolean }>(
    ({ isVertical }) => ({
        position: "relative",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",

        ...(isVertical
            ? {
                  width: "auto",
                  height: "100%",
                  flex: "0 0 auto",
              }
            : {
                  width: "100%",
                  height: "1px",
              }),

        margin: isVertical ? "0 8px" : "8px 0",
    }),
);

const DividerLine = styled("span")<{
    isVertical: boolean;
    lineColor: string;
    variant: DividerVariant;
    grow?: boolean;
}>(({ isVertical, variant, lineColor, grow }) => ({
    flexGrow: grow ? 1 : 0,

    ...(isVertical ? { minHeight: "1rem" } : { minWidth: "1rem" }),
    ...resolveDividerVariant(isVertical, lineColor)[variant],
}));

const DividerText = styled("span")<{
    textColor: string;
    isVertical: boolean;
}>(({ isVertical, textColor }) => ({
    color: textColor,
    padding: isVertical ? "8px 0" : "0 8px",
    whiteSpace: "nowrap",
    fontSize: "14px",
}));

export const Divider: FC<DividerProps> = ({
    orientation = "horizontal",
    inset = "none",
    lineColor = "neutral",
    textColor = "neutral",
    variant = "solid",
    children,
}) => {
    const { theme } = useTheme();

    const isVertical = orientation === "vertical";
    const resolvedLineColor = resolveDividerColor(theme, lineColor);
    const resolvedTextColor = resolveDividerColor(theme, textColor);

    return (
        <DividerWrapper
            isVertical={isVertical}
            role="separator"
            aria-orientation={isVertical ? "vertical" : "horizontal"}
            css={{ color: resolvedLineColor }}
        >
            <DividerLine
                isVertical={isVertical}
                lineColor={resolvedLineColor}
                variant={variant}
                grow={inset !== "start"}
            />

            {children && (
                <DividerText
                    textColor={resolvedTextColor}
                    isVertical={isVertical}
                >
                    {children}
                </DividerText>
            )}

            <DividerLine
                isVertical={isVertical}
                lineColor={resolvedLineColor}
                variant={variant}
                grow={inset !== "end"}
            />
        </DividerWrapper>
    );
};
