import type { HeadingNode } from '@prezly/story-content-format';
import { Alignment } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: HeadingNode;
}

export function Title({ children, node }: Props) {
    return (
        <h1
            className={classNames('text-4xl font-bold text-neutral-100 mt-6', {
                'text-left': node.align === Alignment.LEFT,
                'text-center': node.align === Alignment.CENTER,
                'text-right': node.align === Alignment.RIGHT,
            })}
        >
            {children}
        </h1>
    );
}
