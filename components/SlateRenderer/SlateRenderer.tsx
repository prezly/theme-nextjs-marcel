import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/story-content-format';
import {
    AttachmentNode,
    ContactNode,
    DividerNode,
    GalleryNode,
    HeadingNode,
    ImageNode,
    LinkNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    ParagraphNode,
    QuoteNode,
    StoryBookmarkNode,
    VariableNode,
} from '@prezly/story-content-format';
import type { PropsWithChildren } from 'react';

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
import { StoryBookmark } from './components/StoryBookmark';
import { Variable } from './components/Variable';

interface Props {
    nodes: Node | Node[];
}

function SlateRenderer({ nodes }: PropsWithChildren<Props>) {
    return (
        <Renderer nodes={nodes} defaultComponents>
            <Component match={ListNode.isListNode} component={List} />
            <Component match={ListItemNode.isListItemNode} component={ListItem} />
            <Component match={ListItemTextNode.isListItemTextNode} component={ListItemText} />
            <Component match={HeadingNode.isHeadingNode} component={Heading} />
            <Component match={ParagraphNode.isParagraphNode} component={Paragraph} />
            <Component match={ImageNode.isImageNode} component={Image} />
            <Component match={GalleryNode.isGalleryNode} component={Gallery} />
            <Component match={ContactNode.isContactNode} component={ContactCard} />
            <Component match={AttachmentNode.isAttachmentNode} component={Attachment} />
            <Component match={QuoteNode.isQuoteNode} component={Quote} />
            <Component match={LinkNode.isLinkNode} component={Link} />
            <Component match={DividerNode.isDividerNode} component={Divider} />
            <Component match={StoryBookmarkNode.isStoryBookmarkNode} component={StoryBookmark} />
            <Component match={VariableNode.isVariableNode} component={Variable} />
        </Renderer>
    );
}

export default SlateRenderer;
