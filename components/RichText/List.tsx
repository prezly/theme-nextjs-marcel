import { ListNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import { useNodeAlignmentClassNames } from '@/hooks';

interface Props {
    node: ListNode;
}

export function List({ node, children }: PropsWithChildren<Props>) {
    const alignmentClassNames = useNodeAlignmentClassNames(node);

    const className = classNames('pl-6 my-4', alignmentClassNames, {
        'list-decimal': node.type === ListNode.Type.NUMBERED,
        'list-disc': node.type === ListNode.Type.BULLETED,
    });

    if (node.type === ListNode.Type.NUMBERED) {
        return <ol className={className}>{children}</ol>;
    }

    return <ul className={className}>{children}</ul>;
}

export function ListItem({ children }: PropsWithChildren<{}>) {
    return <li>{children}</li>;
}

export function ListItemText({ children }: PropsWithChildren<{}>) {
    return <>{children}</>;
}
