import classNames from 'classnames';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import Icon from '../Icon';

import StoryShareUrl from './StoryShareUrl';

import styles from './StoryShareSocial.module.css';

interface Props {
    url: string;
    className?: string;
}

function StoryShareSocial({ url, className }: Props) {
    return (
        <div className={classNames(styles.container, className)}>
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
