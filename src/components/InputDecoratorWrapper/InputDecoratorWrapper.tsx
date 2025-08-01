import styled from "@styled";

const InputDecoratorWrapper = styled("div")({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    flexShrink: 0,
    overflow: "hidden",
    minWidth: 0,
    maxWidth: "25%",

    position: "relative",
    zIndex: 1,
});

InputDecoratorWrapper.displayName = "InputDecoratorWrapper";

export { InputDecoratorWrapper };
