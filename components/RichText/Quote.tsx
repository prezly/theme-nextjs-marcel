import { QuoteNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    node: QuoteNode;
}

function Quote({ node, children }: PropsWithChildren<Props>) {
    const alignment = node.align ?? QuoteNode.Alignment.LEFT; // default to left alignment if alignment is not present

    return (
        <blockquote
            className={classNames('story-blockquote', {
                'text-left border-l-[2px] border-gray-300 pl-4':
                    alignment === QuoteNode.Alignment.LEFT,
                'text-center border-l-[2px] border-gray-300 pl-4':
                    alignment === QuoteNode.Alignment.CENTER,
                'text-right border-r-[2px] border-gray-300 pr-4':
                    alignment === QuoteNode.Alignment.RIGHT,
            })}
        >
            {children}
        </blockquote>
    );
}

export default Quote;
