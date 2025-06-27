import "@emotion/react";

import { type Theme as MzTheme } from "./types";

declare module "@emotion/react" {
    type Theme = MzTheme;
}
