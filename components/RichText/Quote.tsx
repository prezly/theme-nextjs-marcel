import type { PropsWithChildren } from 'react';

import Icon from '../Icon';

function Quote({ children }: PropsWithChildren<{}>) {
    return (
        <blockquote className="story-blockquote">
            <Icon name="quote" className="story-blockquote-icon" />
            <span className="my-4 md:my-0 md:mx-4 text-gray-300">{children}</span>
            <Icon name="quote" className="story-blockquote-icon story-blockquote-icon--inverted" />
        </blockquote>
    );
}

export default Quote;
