import emojiData from "emojibase-data/en/data.json";
import shortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import type { EmojiSuggestion } from "../types";

const emojiMap = emojiData.map((em) => ({
    shortcodes: shortcodes[em.hexcode] ?? [],
    ...em,
}));

export function getTwemojiUrl(name: string): string | null {
    const emoji = emojiMap.find(
        (e) =>
            e.shortcodes.includes(name) ||
            e.emoji === name ||
            e.skins?.some((s) => s.shortcodes?.includes(name)),
    );

    const target =
        emoji?.skins?.find((s) => s.shortcodes?.includes(name)) ?? emoji;

    if (!target) return null;

    return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/16.0.1/svg/${target.hexcode.toLowerCase()}.svg`;
}

export function getEmojiSuggestions(
    query: string,
    limit = 10,
): EmojiSuggestion[] {
    if (query.length < 1) return [];

    const lowerQuery = query.toLowerCase();
    const results: EmojiSuggestion[] = [];

    for (const emoji of emojiData) {
        if (emoji.shortcodes?.some((s) => s.startsWith(lowerQuery))) {
            results.push({
                emoji: emoji.emoji,
                shortcode: emoji.shortcodes[0],
            });
        }

        for (const skin of emoji.skins ?? []) {
            if (skin.shortcodes?.some((s) => s.startsWith(lowerQuery))) {
                results.push({
                    emoji: skin.emoji,
                    shortcode: skin.shortcodes[0],
                });
            }
        }

        if (results.length >= limit) break;
    }

    return results;
}
