import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { ExtendedStory } from '@prezly/sdk/dist/types';

import Icon from '../Icon';

interface Props {
    story: ExtendedStory;
}

const StoryStickyBar: FunctionComponent<Props> = ({ story }) => {
    const { newsroom_view, short } = story.links;

    const shareLink = short || newsroom_view;

    return (
        <div className="full-width lg:fixed lg:bottom-0 lg:bg-gray-800">
            <div
                className={classNames(
                    'lg:max-w-[1280px] lg:mx-auto px-6 lg:px-12 mb-60 lg:mb-0',
                    'lg:py-7 lg:flex lg:items-center lg:justify-between',
                )}
            >
                <p className="flex items-center">
                    Powered by
                    <a
                        href="https://www.prezly.com/"
                        className="ml-2 text-blue-400 hover:text-blue-500"
                    >
                        <Icon name="prezly-logo" className="w-auto h-5" />
                    </a>
                </p>

                {shareLink && (
                    <div className="hidden lg:flex lg:items-center">
                        <p>Share this story</p>

                        <div className="ml-6 relative flex items-center">
                            <label htmlFor="share-link" className="sr-only">Story sharing link</label>
                            <input
                                type="text"
                                name="share-link"
                                id="share-link"
                                readOnly
                                autoComplete="off"
                                value={shareLink}
                                className={classNames(
                                    'block w-64 py-1.5 px-3 pr-10 rounded-md',
                                    'bg-gray-700 border border-gray-600',
                                    'leading-7 overflow-ellipsis',
                                    'focus:outline-none focus:ring focus:ring-blue-300',
                                )}
                            />

                            <div className={classNames(
                                'absolute right-1.5',
                                'w-7 h-7 p-1 bg-gray-800 border border-gray-600 rounded-md',
                                'text-center text-blue-400 cursor-pointer',
                            )}
                            >
                                <Icon name="paste" className="w-[1.125rem] h-[1.125rem]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoryStickyBar;
