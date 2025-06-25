import { useMemo } from "react";
import { parseBlocks } from "../../../utils/markdown/parseBlocks";
import { Box } from "../../layout/Box/Box";
import { renderBlock } from "./renderBlock";

export const MarkdownRenderer = ({ children }: { children: string }) => {
    const blocks = useMemo(() => parseBlocks(children), [children]);
    return <Box>{blocks.map((block, i) => renderBlock(block, i))}</Box>;
};
