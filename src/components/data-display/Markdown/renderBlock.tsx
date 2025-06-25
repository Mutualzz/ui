import type { JSX } from "@emotion/react/jsx-runtime";
import type { BlockToken, TypographyHeadingKey } from "../../../types";
import { CodeBlock } from "../CodeBlock/CodeBlock";
import { Typography } from "../Typography/Typography";
import { renderInline } from "./renderInline";

export function renderBlock(block: BlockToken, key: number): JSX.Element {
    switch (block.type) {
        case "paragraph":
            return (
                <Typography
                    sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    key={key}
                >
                    {renderInline(block.content)}
                </Typography>
            );

        case "heading": {
            const blockLevel = `h${block.level}` as TypographyHeadingKey;
            return (
                <Typography
                    sx={{ display: "block" }}
                    level={blockLevel}
                    key={key}
                >
                    {renderInline(block.content)}
                </Typography>
            );
        }

        case "blockquote":
            return (
                <blockquote
                    key={key}
                    css={{
                        display: "block",
                        borderLeft: "4px solid #666",
                        paddingLeft: "0.5rem",
                        margin: 0,
                    }}
                >
                    {block.content.map((b, i) => renderBlock(b, i))}
                </blockquote>
            );

        case "codeBlock": {
            return (
                <CodeBlock
                    key={key}
                    code={block.content}
                    language={block.language}
                />
            );
        }
    }
}
