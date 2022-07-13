import { Transition } from '@headlessui/react';
import { IconLink } from '@prezly/icons';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import styles from './StoryShareUrl.module.css';

interface Props {
    url: string;
}

const TOOLTIP_HIDE_DELAY = 3000; // 3 seconds

function StoryShareUrl({ url }: Props) {
    const [isTooltipShown, setIsTooltipShown] = useState(false);
    const { formatMessage } = useIntl();

    function handleCopyButtonClick() {
        window.navigator.clipboard.writeText(url);
        setIsTooltipShown(true);

        setTimeout(() => {
            setIsTooltipShown(false);
        }, TOOLTIP_HIDE_DELAY);
    }

    return (
        <div className={styles.container}>
            <button
                type="button"
                className={styles.paste}
                onClick={handleCopyButtonClick}
                title={formatMessage(translations.actions.copyShareUrl)}
            >
                <IconLink className={styles.icon} />
            </button>
            <Transition
                show={isTooltipShown}
                as={Fragment}
                enterFrom={styles.transitionStart}
                enterTo={styles.transitionFinish}
                leaveFrom={styles.transitionFinish}
                leaveTo={styles.transitionStart}
            >
                <div className={styles.message}>
                    <IconLink
                        className={classNames(styles.icon, 'mr-2')}
                        width="24px"
                        height="24px"
                    />
                    <FormattedMessage {...translations.misc.shareUrlCopied} />
                </div>
            </Transition>
        </div>
    );
}

export default StoryShareUrl;
