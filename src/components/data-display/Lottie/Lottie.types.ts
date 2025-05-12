import type { HTMLAttributes } from "react";

export interface LottieProps extends HTMLAttributes<HTMLDivElement> {
    path: any;
    loop?: boolean;
    autoplay?: boolean;
}
