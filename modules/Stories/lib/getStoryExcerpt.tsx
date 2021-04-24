import { Story } from '@prezly/sdk/dist/types';
import { ExtraStoryFields, FormatVersion } from '@prezly/sdk/dist/types/Story';
import { Node } from '@prezly/slate-renderer';
import { ElementNode, isParagraphNode, isTextNode } from '@prezly/slate-types';
import SlateRenderer from '@/components/SlateRenderer';

function isNodeEmpty(node: Node | ElementNode<string>) {
    if (isTextNode(node)) {
        return !node.text.length;
    }

    return !node.children.length || node.children.every(isNodeEmpty);
}

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
    const firstTextNode = parsedContent.find((node) => isParagraphNode(node) || isTextNode(node));

    if (!firstTextNode || isNodeEmpty(firstTextNode)) {
        return null;
    }

    return <SlateRenderer nodes={firstTextNode} />;
}
