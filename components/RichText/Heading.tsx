import { HeadingNode } from '@prezly/story-content-format';
import type { PropsWithChildren } from 'react';

interface Props {
    node: HeadingNode;
}

function Heading({ node, children }: PropsWithChildren<Props>) {
    if (node.type === HeadingNode.Type.HEADING_ONE) {
        return <h2>{children}</h2>;
    }

    return <h3>{children}</h3>;
}

export default Heading;
