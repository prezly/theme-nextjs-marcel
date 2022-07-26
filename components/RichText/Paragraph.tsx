import { Alignment } from '@prezly/story-content-format';
import type { ParagraphNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

interface Props {
    node: ParagraphNode;
    children?: ReactNode;
}

function Paragraph({ children, node }: Props) {
    return (
        <p
            className={classNames('mb-3', {
                'text-left': node.align === Alignment.LEFT,
                'text-center': node.align === Alignment.CENTER,
                'text-right': node.align === Alignment.RIGHT,
            })}
        >
            {children}
        </p>
    );
}

export default Paragraph;
