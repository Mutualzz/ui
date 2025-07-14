import type { ChangeEvent, ReactNode } from "react";

export interface CheckboxGroupProps {
    /**
     * The name of the checkbox group.
     * This is used to group checkboxes together.
     */
    name: string;
    /**
     * The controlled value of the checkbox group.
     * This is an array of strings representing the values of the checked checkboxes.
     */
    value?: string[];
    /**
     * The default value of the checkbox group.
     * This is used when the checkbox group is uncontrolled.
     * If `value` is provided, this will be ignored.
     */
    defaultValue?: string[];
    /**
     * The function to call when the value of the checkbox group changes.
     * It receives the event and the new value as arguments.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string[]) => void;
    /**
     * Disables all checkboxes in the group.
     * When true, the checkboxes cannot be interacted with.
     */
    disabled?: boolean;
    /**
     * Makes the checkbox group into a row layout.
     * When true, the checkboxes will be displayed in a row.
     * When false, the checkboxes will be displayed in a column.
     */
    row?: boolean;
    /**
     * Checkbox items to render in the group.
     */
    children: ReactNode;
}
