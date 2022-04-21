import type { ComponentRenderers } from '@prezly/content-renderer-react-js';
import { Renderer } from '@prezly/content-renderer-react-js';
import type { ExtraStoryFields, Story } from '@prezly/sdk';
import { StoryFormatVersion } from '@prezly/sdk';
import type { ElementNode, Node } from '@prezly/slate-types';
import { isParagraphNode, isTextNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import { getDefaultComponents } from '@/components/SlateRenderer/SlateRenderer';

function isNodeEmpty(node: Node | ElementNode): boolean {
    if (isTextNode(node)) {
        return !node.text.length;
    }

    return !node.children.length || node.children.every(isNodeEmpty as any);
}

function getExcerptComponents(): ComponentRenderers {
    return {
        ...getDefaultComponents(),
        [PARAGRAPH_NODE_TYPE]: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
    };
}

function getNodeTextLength(node: Node | ElementNode): number {
    if (isTextNode(node)) {
        return node.text.length;
    }

    return (node.children as (Node | ElementNode)[]).reduce(
        (total: number, child) => total + getNodeTextLength(child),
        0,
    );
}

const MAX_NODE_INDEX_FOR_TEXT_NODES = 3;
const MAX_TOTAL_TEXT_LENGTH = 100;

export default function getStoryExcerpt(story: Story & Pick<ExtraStoryFields, 'content'>) {
    const { format_version, content } = story;

    // TODO: This needs testing
    if (format_version === StoryFormatVersion.HTML) {
        const dummy = document.createElement('div');
        dummy.innerHTML = content;

        const firstTextNode = Array.from(dummy.children).find((child) => !!child.textContent);

        if (!firstTextNode) {
            return null;
        }

        return (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: firstTextNode.outerHTML }} />
        );
    }

    const parsedContent = JSON.parse(content).children as Node[];
    const firstTextNodes: Node[] = [];

    // Find the earliest consecutive paragraph or text nodes to make excerpt from
    let textNodeIndex = parsedContent.findIndex(
        (node) => isParagraphNode(node) || isTextNode(node),
    );
    if (textNodeIndex === -1 || textNodeIndex > MAX_NODE_INDEX_FOR_TEXT_NODES) {
        return null;
    }

    let checkedNode = parsedContent[textNodeIndex];
    let totalTextLength = 0;
    while (
        textNodeIndex < parsedContent.length &&
        totalTextLength < MAX_TOTAL_TEXT_LENGTH &&
        checkedNode &&
        !isNodeEmpty(checkedNode) &&
        (isParagraphNode(checkedNode) || isTextNode(checkedNode))
    ) {
        firstTextNodes.push(checkedNode);
        totalTextLength += getNodeTextLength(checkedNode);
        textNodeIndex += 1;
        checkedNode = parsedContent[textNodeIndex];
    }

    if (!firstTextNodes.length) {
        return null;
    }

    return <Renderer nodes={firstTextNodes} components={getExcerptComponents()} />;
}
