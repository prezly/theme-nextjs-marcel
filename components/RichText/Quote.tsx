import { Alignment } from '@prezly/slate-types';
import type { QuoteNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    node: QuoteNode;
}

function Quote({ node, children }: PropsWithChildren<Props>) {
    const alignment = node.align ?? Alignment.LEFT; // default to left alignment if alignment is not present

    return (
        <blockquote
            className={classNames('story-blockquote', {
                'text-left border-l-[2px] border-gray-300 pl-4': alignment === Alignment.LEFT,
                'text-center border-l-[2px] border-gray-300 pl-4': alignment === Alignment.CENTER,
                'text-right border-r-[2px] border-gray-300 pr-4': alignment === Alignment.RIGHT,
            })}
        >
            {children}
        </blockquote>
    );
}

export default Quote;
