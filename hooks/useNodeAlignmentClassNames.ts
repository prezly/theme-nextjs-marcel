import { Alignment } from '@prezly/story-content-format';
import type { HeadingNode, ListNode, ParagraphNode } from '@prezly/story-content-format';
import classNames from 'classnames';

export function useNodeAlignmentClassNames(node: HeadingNode | ListNode | ParagraphNode) {
    return classNames({
        'text-left': node.align === Alignment.LEFT,
        'text-center': node.align === Alignment.CENTER,
        'text-right': node.align === Alignment.RIGHT,
    });
}
