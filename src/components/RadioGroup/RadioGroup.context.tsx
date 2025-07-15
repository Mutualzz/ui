import { createContext, type ChangeEvent } from "react";

export interface RadioGroupContextType {
    name?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(
    null,
);
