import { stringifyNode } from '@prezly/content-renderer-react-js';
import type { HeadingNode } from '@prezly/story-content-format';
import { Alignment } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: HeadingNode;
}

export function Subtitle({ children, node }: Props) {
    const text = stringifyNode(node).trim();
    if (text.length === 0) {
        return null;
    }

    return (
        <h3
            className={classNames('text-neutral-300 mt-3', {
                'text-left': node.align === Alignment.LEFT,
                'text-center': node.align === Alignment.CENTER,
                'text-right': node.align === Alignment.RIGHT,
            })}
        >
            {children}
        </h3>
    );
}
