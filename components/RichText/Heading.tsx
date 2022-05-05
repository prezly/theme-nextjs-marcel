import { HEADING_1_NODE_TYPE } from '@prezly/slate-types';
import type { HeadingNode } from '@prezly/slate-types';
import type { PropsWithChildren } from 'react';

interface Props {
    node: HeadingNode;
}

function Heading({ node, children }: PropsWithChildren<Props>) {
    if (node.type === HEADING_1_NODE_TYPE) {
        return <h2>{children}</h2>;
    }

    return <h3>{children}</h3>;
}

export default Heading;
