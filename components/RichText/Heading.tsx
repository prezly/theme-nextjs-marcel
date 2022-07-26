import { HeadingNode } from '@prezly/story-content-format';
import type { PropsWithChildren } from 'react';

import { useNodeAlignmentClassNames } from '@/hooks';

interface Props {
    node: HeadingNode;
}

function Heading({ node, children }: PropsWithChildren<Props>) {
    const alignmentClassNames = useNodeAlignmentClassNames(node);
    if (node.type === HeadingNode.Type.HEADING_ONE) {
        return <h2 className={alignmentClassNames}>{children}</h2>;
    }

    return <h3 className={alignmentClassNames}>{children}</h3>;
}

export default Heading;
