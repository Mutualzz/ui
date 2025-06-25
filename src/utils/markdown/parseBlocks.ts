import type { BundledLanguage } from "shiki";
import type { BlockToken } from "../../types";
import { tokenizeMarkdown } from "./tokenizeMarkdown";

export function parseBlocks(input: string): BlockToken[] {
    const lines = input.split(/\r?\n/);
    const blocks: BlockToken[] = [];

    let i = 0;
    let inCode = false;
    let codeBuffer: string[] = [];
    let currentLang: BundledLanguage | undefined;

    while (i < lines.length) {
        const line = lines[i].trimEnd();

        if (line.trim() === "") {
            i++;
            continue;
        }
        if (/^```/.test(line)) {
            const langMatch = RegExp(/^```(\w+)?/).exec(line);
            const lang = (langMatch?.[1] ?? undefined) as
                | BundledLanguage
                | undefined;

            if (inCode) {
                blocks.push({
                    type: "codeBlock",
                    content: codeBuffer.join("\n"),
                    language: currentLang,
                });
                codeBuffer = [];
                inCode = false;
                currentLang = undefined;
            } else {
                inCode = true;
                currentLang = lang;
            }

            i++;
            continue;
        }

        if (inCode) {
            codeBuffer.push(lines[i]);
            i++;
            continue;
        }

        if (/^#{1,6}\s/.test(line)) {
            const level = RegExp(/^#+/).exec(line)![0].length;
            const text = line.slice(level).trim();
            blocks.push({
                type: "heading",
                level,
                content: tokenizeMarkdown(text),
            });
            i++;
            continue;
        }

        if (line.startsWith(">")) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith(">")) {
                quoteLines.push(lines[i].replace(/^>\s?/, ""));
                i++;
            }
            blocks.push({
                type: "blockquote",
                content: parseBlocks(quoteLines.join("\n")),
            });
            continue;
        }

        const paraLines: string[] = [];
        while (i < lines.length) {
            const nextLine = lines[i].trim();
            if (
                nextLine === "" ||
                /^#{1,6}\s/.test(nextLine) ||
                nextLine.startsWith(">") ||
                nextLine.startsWith("```")
            ) {
                break;
            }
            paraLines.push(lines[i]);
            i++;
        }

        blocks.push({
            type: "paragraph",
            content: tokenizeMarkdown(paraLines.join("\n")),
        });
    }

    if (inCode && codeBuffer.length > 0) {
        blocks.push({
            type: "codeBlock",
            content: codeBuffer.join("\n"),
            language: currentLang,
        });
    }

    return blocks;
}
