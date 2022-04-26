import { Transition } from '@headlessui/react';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Icon from '../Icon';

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
        <div className="flex items-center">
            <button
                type="button"
                className="text-[0] cursor-pointer appearance-none bg-none border-0 p-0 text-gray-200 hover:text-gray-500 focus:text-gray-500"
                onClick={handleCopyButtonClick}
                title={formatMessage(translations.actions.copyShareUrl)}
            >
                <Icon name="link" className="w-6 h-6" />
            </button>
            <Transition
                show={isTooltipShown}
                as={Fragment}
                enterFrom="opacity-0"
                enterTo="opacity-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className={classNames(
                        'absolute will-change-[opacity] left-0 right-0 top-0 bottom-0 flex items-center bg-gray-800 text-gray-200',
                        'transition-[opacity_0.4s_ease]',
                    )}
                >
                    <Icon name="link" className="mr-2 text-gray-300" />
                    <FormattedMessage {...translations.misc.shareUrlCopied} />
                </div>
            </Transition>
        </div>
    );
}

export default StoryShareUrl;
