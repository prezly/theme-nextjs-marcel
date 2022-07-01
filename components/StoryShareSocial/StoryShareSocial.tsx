import { IconFacebook, IconLinkedin, IconTwitter } from '@prezly/icons';
import { SocialShareButton } from '@prezly/themes-ui-components';
import classNames from 'classnames';

import StoryShareUrl from './StoryShareUrl';

import styles from './StoryShareSocial.module.css';

interface Props {
    url: string;
    className?: string;
}

function StoryShareSocial({ url, className }: Props) {
    return (
        <div className={classNames(styles.container, className)}>
            <SocialShareButton network="twitter" className={styles.button} url={url}>
                <IconTwitter className={styles.icon} />
            </SocialShareButton>
            <SocialShareButton network="facebook" className={styles.button} url={url}>
                <IconFacebook className={styles.icon} />
            </SocialShareButton>
            <SocialShareButton network="linkedin" className={styles.button} url={url}>
                <IconLinkedin className={styles.icon} />
            </SocialShareButton>
            <StoryShareUrl url={url} />
        </div>
    );
}

export default StoryShareSocial;
