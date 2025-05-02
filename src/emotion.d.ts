import "@emotion/react";
import { Interpolation } from "@emotion/react";
import { type Theme as MzTheme } from "@ui/types";

declare module "@emotion/react" {
    export type Theme = MzTheme;

    export interface StyledComponent<
        Props extends {} = {},
        ThemeType extends Theme = Theme,
    > extends React.FC<
            Props &
                ComponentPropsWithRef<any> & {
                    sx?: Interpolation<ThemeType> | Interpolation<ThemeType>[];
                }
        > {}
}
