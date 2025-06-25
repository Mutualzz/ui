import React from "react";
import type { InlineToken } from "../../../types";
import { getTwemojiUrl } from "../../../utils/emojis";
import { Paper } from "../../surfaces/Paper/Paper";
import { Typography } from "../Typography/Typography";

export function renderInline(tokens: InlineToken[]): React.ReactNode {
    return tokens.map((token, i) => {
        switch (token.type) {
            case "text": {
                const parts = token.content.split("\n");
                return parts.flatMap((part, j) =>
                    j < parts.length - 1
                        ? [part, <br key={`br-${i}-${j}`} />]
                        : [part],
                );
            }
            case "bold":
                return (
                    <Typography fontWeight="bold" key={i}>
                        {renderInline(token.content)}
                    </Typography>
                );
            case "italic":
                return (
                    <Typography fontStyle="italic" key={i}>
                        {renderInline(token.content)}
                    </Typography>
                );
            case "strike":
                return <del key={i}>{renderInline(token.content)}</del>;
            case "spoiler":
                return (
                    <Paper
                        display="block"
                        key={i}
                        css={{
                            backgroundColor: "#444",
                            color: "transparent",
                            borderRadius: 4,
                            padding: "0 4px",
                            cursor: "pointer",
                            whiteSpace: "pre-wrap",
                        }}
                        onClick={(e) => {
                            const el = e.currentTarget;
                            el.style.color =
                                el.style.color === "transparent"
                                    ? "inherit"
                                    : "transparent";
                        }}
                    >
                        {renderInline(token.content)}
                    </Paper>
                );
            case "inlineCode":
                return (
                    <code
                        key={i}
                        css={{
                            backgroundColor: "#222",
                            padding: "2px 4px",
                            borderRadius: 4,
                            fontFamily: "monospace",
                        }}
                    >
                        {token.content}
                    </code>
                );
            case "emoji": {
                const url = getTwemojiUrl(token.name);
                return url ? (
                    <img
                        key={i}
                        src={url}
                        alt={`:${token.name}:`}
                        css={{
                            width: "1em",
                            height: "1em",
                            verticalAlign: "middle",
                            display: "inline-block",
                            whiteSpace: "nowrap", // optional
                        }}
                    />
                ) : (
                    `:${token.name}:`
                );
            }
            case "link":
                return (
                    <a
                        key={i}
                        href={token.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        css={{
                            color: "#4ea1f3",
                            textDecoration: "underline",
                        }}
                    >
                        {token.label}
                    </a>
                );
        }
    });
}
