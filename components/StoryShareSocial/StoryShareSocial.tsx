import classNames from 'classnames';

import { IconFacebook, IconLinkedin, IconTwitter } from '@/icons';

import { SocialShareButton } from '../SocialMedia';

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
                <IconTwitter className={styles.icon} width={24} height={24} />
            </SocialShareButton>
            <SocialShareButton network="facebook" className={styles.button} url={url}>
                <IconFacebook className={styles.icon} width={24} height={24} />
            </SocialShareButton>
            <SocialShareButton network="linkedin" className={styles.button} url={url}>
                <IconLinkedin className={styles.icon} width={24} height={24} />
            </SocialShareButton>
            <StoryShareUrl url={url} />
        </div>
    );
}

export default StoryShareSocial;
