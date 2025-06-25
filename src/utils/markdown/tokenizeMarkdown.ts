import emojiRegex from "emoji-regex";
import EMOJI_REGEX_SHORTCODE from "emojibase-regex/shortcode";
import type { InlineToken } from "../../types";

const EMOJI_UNICODE_REGEX = emojiRegex();

export function tokenizeMarkdown(input: string): InlineToken[] {
    let i = 0;

    function parseInline(endToken?: string): InlineToken[] {
        const tokens: InlineToken[] = [];
        let buffer = "";

        const flush = () => {
            if (buffer) {
                tokens.push({ type: "text", content: buffer });
                buffer = "";
            }
        };

        while (i < input.length) {
            if (endToken && input.startsWith(endToken, i)) {
                i += endToken.length;
                flush();
                return tokens;
            }

            // bold
            if (input.startsWith("**", i)) {
                const closeIndex = input.indexOf("**", i + 2);
                if (closeIndex !== -1) {
                    flush();
                    i += 2;
                    tokens.push({ type: "bold", content: parseInline("**") });
                    continue;
                } else {
                    // If no closing double asterisk, treat as normal text
                    buffer += "**";
                    i += 2;
                    continue;
                }
            }

            // italic
            if (input[i] === "*") {
                const closeIndex = input.indexOf("*", i + 1);
                if (closeIndex !== -1) {
                    flush();
                    i += 1;
                    tokens.push({ type: "italic", content: parseInline("*") });
                    continue;
                } else {
                    // If no closing asterisk, treat as normal text
                    buffer += "*";
                    i++;
                    continue;
                }
            }

            // strikethrough
            if (input.startsWith("~~", i)) {
                const closeIndex = input.indexOf("~~", i + 2);
                if (closeIndex !== -1) {
                    flush();
                    i += 2;
                    tokens.push({ type: "strike", content: parseInline("~~") });
                    continue;
                } else {
                    // If no closing strikethrough, treat as normal text
                    buffer += "~~";
                    i += 2;
                    continue;
                }
            }

            // spoiler
            if (input.startsWith("||", i)) {
                const closeIndex = input.indexOf("||", i + 2);
                if (closeIndex !== -1) {
                    flush();
                    i += 2;
                    tokens.push({
                        type: "spoiler",
                        content: parseInline("||"),
                    });
                    continue;
                } else {
                    // If no closing spoiler, treat as normal text
                    buffer += "||";
                    i += 2;
                    continue;
                }
            }

            // inline code
            if (input[i] === "`") {
                const end = input.indexOf("`", i + 1);
                if (end !== -1) {
                    flush();
                    const code = input.slice(i + 1, end);
                    tokens.push({ type: "inlineCode", content: code });
                    i = end + 1;
                    continue;
                } else {
                    // If no closing backtick, treat as normal text
                    buffer += "`";
                    i++;
                    continue;
                }
            }

            // emoji (shortcode)
            if (input[i] === ":" && input.indexOf(":", i + 1) !== -1) {
                const end = input.indexOf(":", i + 1);
                const shortcode = input.slice(i + 1, end);
                const candidate = `:${shortcode}:`;

                if (EMOJI_REGEX_SHORTCODE.test(candidate)) {
                    flush();
                    tokens.push({ type: "emoji", name: shortcode });
                    i = end + 1;
                    continue;
                }
            }

            const unicodeMatch = EMOJI_UNICODE_REGEX.exec(input.slice(i));
            if (unicodeMatch && unicodeMatch.index === 0) {
                flush();
                tokens.push({ type: "emoji", name: unicodeMatch[0] });
                i += unicodeMatch[0].length;
                continue;
            }

            // links
            if (input[i] === "[" && input.indexOf("]", i) > i) {
                const endLabel = input.indexOf("]", i);
                const startHref = input.indexOf("(", endLabel);
                const endHref = input.indexOf(")", startHref);
                if (startHref === endLabel + 1 && endHref > startHref) {
                    const label = input.slice(i + 1, endLabel);
                    const href = input.slice(startHref + 1, endHref);
                    flush();
                    tokens.push({ type: "link", label, href });
                    i = endHref + 1;
                    continue;
                }
            }

            buffer += input[i];
            i++;
        }

        flush();
        return tokens;
    }

    return parseInline();
}
