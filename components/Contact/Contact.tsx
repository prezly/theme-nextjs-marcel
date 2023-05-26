import type { ContactNode } from '@prezly/story-content-format';

import { ContactCard } from './ContactCard';
import { ContactSignature } from './ContactSignature';

interface Props {
    node: ContactNode;
}

export function Contact({ node }: Props) {
    const { layout } = node;

    if (layout === 'signature') {
        return <ContactSignature node={node} />;
    }

    if (layout === 'card') {
        return <ContactCard node={node} />;
    }

    throw new Error('Unsupported contact layout');
}
