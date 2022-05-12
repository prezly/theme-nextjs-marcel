import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import {
    isAttachmentNode,
    isContactNode,
    isDividerNode,
    isGalleryNode,
    isHeadingNode,
    isImageNode,
    isLinkNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isPlaceholderNode,
    isQuoteNode,
    isStoryBookmarkNode,
} from '@prezly/slate-types';
import type { PropsWithChildren } from 'react';
import '@prezly/content-renderer-react-js/styles.css';

import ContactCard from '@/components/ContactCard';
import {
    Divider,
    Heading,
    Link,
    List,
    ListItem,
    ListItemText,
    Paragraph,
    Quote,
} from '@/components/RichText';

import Attachment from './components/Attachment';
import Gallery from './components/Gallery';
import Image from './components/Image';
import Placeholder from './components/Placeholder';
import { StoryBookmark } from './components/StoryBookmark';

interface Props {
    nodes: Node | Node[];
}

function SlateRenderer({ nodes }: PropsWithChildren<Props>) {
    return (
        <Renderer nodes={nodes} defaultComponents>
            <Component match={isListNode} component={List} />
            <Component match={isListItemNode} component={ListItem} />
            <Component match={isListItemTextNode} component={ListItemText} />
            <Component match={isHeadingNode} component={Heading} />
            <Component match={isParagraphNode} component={Paragraph} />
            <Component match={isImageNode} component={Image} />
            <Component match={isGalleryNode} component={Gallery} />
            <Component match={isContactNode} component={ContactCard} />
            <Component match={isAttachmentNode} component={Attachment} />
            <Component match={isQuoteNode} component={Quote} />
            <Component match={isLinkNode} component={Link} />
            <Component match={isPlaceholderNode} component={Placeholder} />
            <Component match={isDividerNode} component={Divider} />
            <Component match={isStoryBookmarkNode} component={StoryBookmark} />
        </Renderer>
    );
}

export default SlateRenderer;
