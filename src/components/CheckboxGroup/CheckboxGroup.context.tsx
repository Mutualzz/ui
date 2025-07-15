import { createContext, type ChangeEvent } from "react";

export interface CheckboxGroupContextType {
    name?: string;
    value?: string[];
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string[]) => void;
    disabled?: boolean;
}

export const CheckboxGroupContext =
    createContext<CheckboxGroupContextType | null>(null);
