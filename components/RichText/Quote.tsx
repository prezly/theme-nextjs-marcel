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
            className={classNames('story-blockquote flex', {
                'justify-end text-right': alignment === QuoteNode.Alignment.RIGHT,
                'justify-center text-center': alignment === QuoteNode.Alignment.CENTER,
            })}
        >
            <div
                className={classNames('border-neutral-300', {
                    'border-l-[2px] pl-4':
                        alignment === QuoteNode.Alignment.LEFT ||
                        alignment === QuoteNode.Alignment.CENTER,
                    'border-r-[2px] pr-4': alignment === QuoteNode.Alignment.RIGHT,
                })}
            >
                {children}
            </div>
        </blockquote>
    );
}

export default Quote;
