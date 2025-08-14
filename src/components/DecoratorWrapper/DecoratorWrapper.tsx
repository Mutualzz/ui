import styled from "@styled";

const DecoratorWrapper = styled("span")<{
    position?: "start" | "end";
    spacing?: string | number;
}>(({ position = "end", spacing = "0.5em" }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,

    fontSize: "inherit",
    color: "inherit",

    ...(position === "start" && {
        marginRight: spacing,
    }),
    ...(position === "end" && {
        marginLeft: spacing,
    }),

    flexShrink: 0,
    flexGrow: 0,
}));

DecoratorWrapper.displayName = "DecoratorWrapper";

export { DecoratorWrapper };
