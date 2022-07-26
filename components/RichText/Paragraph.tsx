import type { ParagraphNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import { useNodeAlignmentClassNames } from '@/hooks';

interface Props {
    node: ParagraphNode;
    children?: ReactNode;
}

function Paragraph({ children, node }: Props) {
    const alignmentClassNames = useNodeAlignmentClassNames(node);
    return <p className={classNames('mb-3', alignmentClassNames)}>{children}</p>;
}

export default Paragraph;
