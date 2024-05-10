import type { LinkNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    node: LinkNode;
}

function Link({ node, children }: PropsWithChildren<Props>) {
    return (
        <a
            href={node.href}
            className={classNames(
                'text-neutral-200 underline hover:text-blue-400 active:text-blue-500',
                'focus:text-blue-400 focus:outline-none',
            )}
        >
            {children}
        </a>
    );
}

export default Link;
