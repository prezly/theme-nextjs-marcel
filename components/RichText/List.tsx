import type { ListItemNode, ListItemTextNode } from '@prezly/story-content-format';
import { Alignment, ListNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    node: ListNode;
}

export function List({ node, children }: PropsWithChildren<Props>) {
    const className = classNames('pl-6 my-4', {
        'list-decimal': node.type === ListNode.Type.NUMBERED,
        'list-disc': node.type === ListNode.Type.BULLETED,
    });

    const Tag = node.type === ListNode.Type.NUMBERED ? 'ol' : 'ul';

    return (
        <div
            className={classNames('flex', {
                'text-left justify-start': node.align === Alignment.LEFT,
                'text-center justify-center': node.align === Alignment.CENTER,
                'text-right justify-end': node.align === Alignment.RIGHT,
            })}
        >
            <Tag className={className}>{children}</Tag>
        </div>
    );
}

interface ListItemProps {
    node: ListItemNode;
}

export function ListItem({ children }: PropsWithChildren<ListItemProps>) {
    return <li>{children}</li>;
}

interface ListItemTextProps {
    node: ListItemTextNode;
}

export function ListItemText({ children }: PropsWithChildren<ListItemTextProps>) {
    return <>{children}</>;
}
