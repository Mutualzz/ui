import "@emotion/react";
import { type Theme as MzTheme } from "@mutualzz/ui/src/types";

declare module "@emotion/react" {
    export type Theme = MzTheme;
}
