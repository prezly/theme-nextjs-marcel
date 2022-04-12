import type { ExtendedStory } from '@prezly/sdk';
import classNames from 'classnames';
import { useRef, useState } from 'react';

import Icon from '../Icon';

interface Props {
    story: ExtendedStory;
}

function selectInputText(input: HTMLInputElement) {
    input.setSelectionRange(0, input.value.length);
}

function resetInputSelection(input: HTMLInputElement) {
    input.setSelectionRange(0, 0);
}

const TOOLTIP_HIDE_DELAY = 3000; // 3 seconds

function StoryShare({ story }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTooltipShown, setIsTooltipShown] = useState(false);

    const { newsroom_view, short } = story.links;

    const shareLink = short || newsroom_view;

    function handleInputClick() {
        selectInputText(inputRef.current!);
    }

    function handleCopyButtonClick() {
        const input = inputRef.current!;
        input.focus();
        selectInputText(input);
        // eslint-disable-next-line deprecation/deprecation
        document.execCommand('copy');
        resetInputSelection(input);
        input.blur();
        setIsTooltipShown(true);

        setTimeout(() => {
            setIsTooltipShown(false);
        }, TOOLTIP_HIDE_DELAY);
    }

    if (!shareLink) {
        return null;
    }

    return (
        <div className="hidden lg:flex lg:items-center">
            <p>Share this story</p>

            <div className="ml-6 relative flex items-center">
                <label htmlFor="share-link" className="sr-only">
                    Story sharing link
                </label>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <input
                    ref={inputRef}
                    type="text"
                    name="share-link"
                    id="share-link"
                    readOnly
                    autoComplete="off"
                    value={shareLink}
                    className={classNames(
                        'default-input',
                        'w-64 py-1.5 pr-10 bg-gray-700 overflow-ellipsis',
                    )}
                    // Selects full input value on click
                    onClick={handleInputClick}
                />

                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div
                    role="button"
                    tabIndex={0}
                    className={classNames(
                        'absolute right-1.5',
                        'w-7 h-7 p-1 bg-gray-800 border border-gray-600 rounded-md',
                        'text-center cursor-pointer text-white hover:border-blue-500 hover:text-blue-500',
                    )}
                    onClick={handleCopyButtonClick}
                    title="Copy share URL"
                >
                    <Icon name="paste" className="w-[1.125rem] h-[1.125rem]" />
                </div>

                <div
                    className={classNames(
                        'absolute left-0 right-0 top-0 bottom-0',
                        'flex items-center justify-center rounded-md',
                        'bg-gray-700 text-white border border-gray-600',
                        'transition-opacity duration-500',
                        isTooltipShown ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    )}
                >
                    URL copied!
                </div>
            </div>
        </div>
    );
}

export default StoryShare;
