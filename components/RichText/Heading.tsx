import { Alignment, HeadingNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    node: HeadingNode;
}

function Heading({ node, children }: PropsWithChildren<Props>) {
    const className = classNames({
        'text-left': node.align === Alignment.LEFT,
        'text-center': node.align === Alignment.CENTER,
        'text-right': node.align === Alignment.RIGHT,
    });

    if (node.type === HeadingNode.Type.HEADING_ONE) {
        return <h2 className={className}>{children}</h2>;
    }

    return <h3 className={className}>{children}</h3>;
}

export default Heading;
