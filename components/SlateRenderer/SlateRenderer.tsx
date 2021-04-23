import type { FunctionComponent } from 'react';
import { Node, Options, Renderer } from '@prezly/slate-renderer';
import {
    BULLETED_LIST_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    LINK_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    CONTACT_NODE_TYPE,
    ATTACHMENT_NODE_TYPE,
} from '@prezly/slate-types';
import '@prezly/slate-renderer/build/styles.css';

import Icon from '@/components/Icon';
import ContactCard from '@/components/ContactCard';
import Attachment from '../Attachment';

interface Props {
    nodes: Node | Node[];
}

const getDefaultOptions = (downgradeHeadings?: boolean): Options => ({
    [BULLETED_LIST_NODE_TYPE]: ({ children }) => (
        <ul className="list-disc pl-6 my-4">{children}</ul>
    ),
    [NUMBERED_LIST_NODE_TYPE]: ({ children }) => (
        <ol className="list-decimal pl-6 my-4">{children}</ol>
    ),
    [LIST_ITEM_NODE_TYPE]: ({ children }) => <li>{children}</li>,
    [LIST_ITEM_TEXT_NODE_TYPE]: ({ children }) => <>{children}</>,
    [HEADING_1_NODE_TYPE]: ({ children }) => {
        if (downgradeHeadings) {
            return <h3>{children}</h3>;
        }
        return (
            <h2>{children}</h2>
        );
    },
    [HEADING_2_NODE_TYPE]: ({ children }) => {
        if (downgradeHeadings) {
            return <h4>{children}</h4>;
        }

        return <h2>{children}</h2>;
    },
    [LINK_NODE_TYPE]: ({ children, node }) => (
        <a href={node.href} className="text-gray-200 underline hover:text-blue-400 active:text-blue-500">{children}</a>
    ),
    [PARAGRAPH_NODE_TYPE]: ({ children }) => <p className="mb-3">{children}</p>,
    [QUOTE_NODE_TYPE]: ({ children }) => (
        <blockquote className="story-blockquote">
            <Icon name="quote" className="story-blockquote-icon" />
            <span className="my-4 md:my-0 md:mx-4">{children}</span>
            <Icon name="quote" className="story-blockquote-icon story-blockquote-icon--inverted" />
        </blockquote>
    ),
    [DIVIDER_NODE_TYPE]: () => <hr className="my-10 border-gray-500" />,
    [CONTACT_NODE_TYPE]: ({ node }) => <ContactCard contact={node.contact} />,
    [ATTACHMENT_NODE_TYPE]: ({ node }) => <Attachment file={node.file} description={node.description} />,
});

const SlateRenderer: FunctionComponent<Props> = ({ nodes }) => <Renderer nodes={nodes} options={getDefaultOptions()} />;

export default SlateRenderer;
