import type { DrawerAnchor } from "./Drawer.types";

export const resolveAnchorStyles = (anchor: DrawerAnchor) => {
    switch (anchor) {
        case "left":
            return {
                top: 0,
                left: 0,
                height: "100%",
                width: 320,
                transform: "translateX(-100%)",
            };
        case "right":
            return {
                top: 0,
                right: 0,
                height: "100%",
                width: 320,
                transform: "translateX(100%)",
            };
        case "top":
            return {
                top: 0,
                left: 0,
                width: "100%",
                height: 320,
                transform: "translateY(-100%)",
            };
        case "bottom":
        default:
            return {
                bottom: 0,
                left: 0,
                width: "100%",
                height: 320,
                transform: "translateY(100%)",
            };
    }
};
