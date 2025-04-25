import type { Theme, Themes } from "@mutualzz/ui/types";

export const sortThemes = (themes: Theme[]): Theme[] => {
    const priorityOrder: Themes[] = ["baseDark", "baseLight"];

    return [
        ...themes.filter((theme) => priorityOrder.includes(theme.id as Themes)),
        ...themes.filter(
            (theme) => !priorityOrder.includes(theme.id as Themes),
        ),
    ];
};
