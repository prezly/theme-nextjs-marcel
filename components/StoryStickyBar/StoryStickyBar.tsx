import { LogoPrezly } from '@prezly/icons';
import type { ExtendedStory } from '@prezly/sdk';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import StoryShare from './StoryShare';

interface Props {
    story: ExtendedStory;
}

function StoryStickyBar({ story }: PropsWithChildren<Props>) {
    return (
        <div className="lg:full-width lg:fixed lg:bottom-0 lg:bg-neutral-800">
            <div
                className={classNames(
                    'lg:max-w-[1280px] lg:mx-auto lg:px-12 mb-10 lg:mb-0',
                    'lg:py-4 lg:flex lg:items-center lg:justify-between',
                )}
            >
                <p className="flex items-center">
                    Powered by
                    <a
                        href="https://www.prezly.com/"
                        className="ml-2 text-blue-400 hover:text-blue-500"
                    >
                        <LogoPrezly className="w-auto h-5" />
                    </a>
                </p>

                <StoryShare story={story} />
            </div>
        </div>
    );
}

export default StoryStickyBar;
