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
                'justify-start': alignment === Alignment.LEFT,
                'justify-center': alignment === Alignment.CENTER,
                'justify-end': alignment === Alignment.RIGHT,
            })}
        >
            {(alignment === Alignment.LEFT || alignment === Alignment.CENTER) && (
                <div className="w-[2px] bg-gray-300 mr-4" aria-hidden="true" />
            )}
            <div
                className={classNames('my-4 md:my-0 text-gray-300', {
                    'text-left': alignment === Alignment.LEFT,
                    'text-center': alignment === Alignment.CENTER,
                    'text-right': alignment === Alignment.RIGHT,
                })}
            >
                {children}
            </div>
            {alignment === Alignment.RIGHT && (
                <div className="w-[2px] bg-gray-300 ml-4" aria-hidden="true" />
            )}
        </blockquote>
    );
}

export default Quote;
