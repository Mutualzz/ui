import type { Theme } from "@root/types";

export const sortThemes = (themes: Theme[]): Theme[] => {
    const priorityOrder: string[] = ["baseDark", "baseLight"];

    return [
        ...themes.filter((theme) => priorityOrder.includes(theme.id)),
        ...themes.filter((theme) => !priorityOrder.includes(theme.id)),
    ];
};
