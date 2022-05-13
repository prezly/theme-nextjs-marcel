import { STORY_LINK, useAnalytics } from '@prezly/analytics-nextjs';
import type { LinkNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    node: LinkNode;
}

function Link({ node, children }: PropsWithChildren<Props>) {
    const { track } = useAnalytics();

    function handleClick() {
        track(STORY_LINK.CLICK, { href: node.href });
    }

    return (
        <a
            href={node.href}
            className={classNames(
                'text-gray-200 underline hover:text-blue-400 active:text-blue-500',
                'focus:text-blue-400 focus:outline-none',
            )}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}

export default Link;
