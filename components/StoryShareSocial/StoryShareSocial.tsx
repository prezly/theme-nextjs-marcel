import type { Story } from '@prezly/sdk';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import Icon from '../Icon';

import StoryShareUrl from './StoryShareUrl';

import styles from './StoryShareSocial.module.css';

interface Props {
    story: Story;
}

function StoryShareSocial({ story }: Props) {
    const url = story.links.short || story.links.newsroom_view;

    if (!url) {
        return null;
    }

    return (
        <div className={styles.container}>
            <TwitterShareButton className={styles.button} url={url}>
                <Icon name="twitter" className={styles.icon} />
            </TwitterShareButton>
            <FacebookShareButton className={styles.button} url={url}>
                <Icon name="facebook" className={styles.icon} />
            </FacebookShareButton>
            <LinkedinShareButton className={styles.button} url={url}>
                <Icon name="linkedin" className={styles.icon} />
            </LinkedinShareButton>
            <StoryShareUrl url={url} />
        </div>
    );
}

export default StoryShareSocial;
