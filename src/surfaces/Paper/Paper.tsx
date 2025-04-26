import { useTheme } from "@root/hooks/useTheme";
import { dynamicElevation } from "@root/utils/dynamicElevation";
import type { FC } from "react";
import type { PaperProps } from "./Paper.types";

export const Paper: FC<PaperProps> = ({
    display = "flex",
    direction,
    wrap,
    justifyContent,
    alignItems,
    alignContent,
    spacing,
    p,
    m,
    order,
    grow,
    shrink,
    basis,
    flex,
    alignSelf,
    pt,
    pr,
    pb,
    pl,
    mt,
    mr,
    mb,
    ml,
    px,
    py,
    mx,
    my,
    elevation = 0,
    children,
    ...props
}) => {
    if (elevation < 0 || elevation > 4)
        throw new Error("Elevation must be between 0 and 4");
    const { theme } = useTheme();

    return (
        <div
            css={{
                backgroundColor: dynamicElevation(
                    theme.colors.surface,
                    elevation,
                ),
                boxShadow: `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`,
                borderRadius: "0.75rem",
                transition: "all 0.2 ease",
                display,
                flexDirection: direction,
                justifyContent,
                alignItems,
                alignContent,
                flexWrap: wrap,
                gap: spacing,
                padding: p,
                margin: m,
                order,
                flexGrow: grow,
                flexShrink: shrink,
                flexBasis: basis,
                flex,
                alignSelf,
                paddingTop: pt,
                paddingRight: pr,
                paddingBottom: pb,
                paddingLeft: pl,
                marginTop: mt,
                marginRight: mr,
                marginBottom: mb,
                marginLeft: ml,
                paddingBlock: py,
                paddingInline: px,
                marginBlock: my,
                marginInline: mx,
            }}
            {...props}
        >
            {children}
        </div>
    );
};
