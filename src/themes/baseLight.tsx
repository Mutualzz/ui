import type { Theme } from "../types";
import { typographyCommon } from "./commonValues";

export const baseLightTheme: Theme = {
    ...typographyCommon,
    id: "baseLight",
    name: "Silken Dawn",
    description: "Default Light Theme",
    type: "light",
    colors: {
        common: {
            white: "#FFFFFF",
            black: "#121212",
        },
        primary: "#A84E68",
        neutral: "#6A6A6A",
        background: "#F2F2F2",
        surface: "#E0E0E0",
        danger: "#B54254",
        warning: "#C78F2A",
        success: "#3D9242",
        info: "#496C99",
    },
};
