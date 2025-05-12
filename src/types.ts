export type Hex = `#${string}`;
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HSL = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type ColorLike = Hex | RGB | RGBA | HSL | HSLA;

export type Color =
    | "primary"
    | "neutral"
    | "success"
    | "danger"
    | "warning"
    | "info";

export type Variant = "plain" | "outlined" | "soft" | "solid";

export type TypographyDisplayKey =
    | "display-xs"
    | "display-sm"
    | "display-md"
    | "display-lg";
export type TypographyHeadingKey = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TypographyTitleKey = "title-sm" | "title-md" | "title-lg";
export type TypographyBodyKey = "body-xs" | "body-sm" | "body-md" | "body-lg";

export type TypographyLevel =
    | TypographyBodyKey
    | TypographyTitleKey
    | TypographyHeadingKey
    | TypographyDisplayKey;

export type TypographyLevelObj = {
    fontSize: string | number;
    lineHeight: string | number;
    fontWeight: string | number;
    letterSpacing: string | number;
};

export type Size = "sm" | "md" | "lg";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type Spacing = "xs" | "sm" | "md" | "lg" | "xl";

export interface Theme {
    id: string;
    name: string;
    description: string;
    type: "light" | "dark";
    colors: {
        common: {
            white: ColorLike;
            black: ColorLike;
        };

        // Base Colors
        primary: ColorLike;
        neutral: ColorLike;
        background: ColorLike;
        surface: ColorLike;

        // Feedback colors
        danger: ColorLike;
        warning: ColorLike;
        info: ColorLike;
        success: ColorLike;
    };
    typography: {
        fontFamily: string;
        colors: {
            primary: ColorLike;
            secondary: ColorLike;
            accent: ColorLike;
            disabled: ColorLike;
        };
        levels: {
            [key in TypographyLevel]: TypographyLevelObj;
        };
    };
    breakpoints: {
        values: { [key in Breakpoint]: number };
        up: (key: Breakpoint) => string;
        down: (key: Breakpoint) => string;
        between: (start: Breakpoint, end: Breakpoint) => string;
        only: (key: Breakpoint) => string;
        not: (key: Breakpoint) => string;
    };
    spacing: (factor: number) => string;
}

export type ThemeMode = "light" | "dark" | "system";
