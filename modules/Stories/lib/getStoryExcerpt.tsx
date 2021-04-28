import { getDefaultOptions } from '@/components/SlateRenderer/SlateRenderer';
import { Story, ExtraStoryFields } from '@prezly/sdk';
import { FormatVersion } from '@prezly/sdk/dist/types/Story';
import { Node, Options, Renderer } from '@prezly/slate-renderer';
import {
    ElementNode,
    isParagraphNode,
    isTextNode,
    PARAGRAPH_NODE_TYPE,
} from '@prezly/slate-types';

function isNodeEmpty(node: Node | ElementNode<string>) {
    if (isTextNode(node)) {
        return !node.text.length;
    }

    return !node.children.length || node.children.every(isNodeEmpty);
}

const getExcerptOptions = (): Options => ({
    ...getDefaultOptions(),
    [PARAGRAPH_NODE_TYPE]: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
});

const MAX_NODE_INDEX_FOR_TEXT_NODES = 5;

export default function getStoryExcerpt(story: Story & Pick<ExtraStoryFields, 'content'>) {
    const { format_version, content } = story;

    // TODO: This needs testing
    if (format_version === FormatVersion.HTML) {
        const dummy = document.createElement('div');
        dummy.innerHTML = content;

        const firstTextNode = Array.from(dummy.children).find((child) => (
            !!child.textContent
        ));

        if (!firstTextNode) {
            return null;
        }

        return (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: firstTextNode.outerHTML }} />
        );
    }

    const parsedContent = (JSON.parse(content)).children as Node[];
    const firstTextNodes: Node[] = [];

    // Find the earliest consecutive paragraph or text nodes to make excerpt from
    let textNodeIndex = parsedContent.findIndex((node) => (
        isParagraphNode(node) || isTextNode(node)
    ));
    if (textNodeIndex === -1 || textNodeIndex > MAX_NODE_INDEX_FOR_TEXT_NODES) {
        return null;
    }

    let checkedNode = parsedContent[textNodeIndex];
    while (
        textNodeIndex < parsedContent.length
        && checkedNode
        && !isNodeEmpty(checkedNode)
        && (isParagraphNode(checkedNode) || isTextNode(checkedNode))
    ) {
        firstTextNodes.push(checkedNode);
        textNodeIndex += 1;
        checkedNode = parsedContent[textNodeIndex];
    }

    if (!firstTextNodes.length) {
        return null;
    }

    return <Renderer nodes={firstTextNodes} options={getExcerptOptions()} />;
}
