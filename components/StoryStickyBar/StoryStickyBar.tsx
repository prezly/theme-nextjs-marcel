import type { ExtendedStory } from '@prezly/sdk';
import { useNewsroom } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import { LogoPrezly } from '@/icons';

import StoryShare from './StoryShare';

interface Props {
    story: ExtendedStory;
}

function StoryStickyBar({ story }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();

    return (
        <div className="lg:full-width lg:fixed lg:bottom-0 lg:bg-neutral-800">
            <div
                className={classNames(
                    'lg:max-w-[1280px] lg:mx-auto lg:px-12 mb-10 lg:mb-0',
                    'lg:py-4 lg:flex lg:items-center lg:justify-between',
                )}
            >
                {!newsroom.is_white_labeled && (
                    <p className="flex items-center">
                        Powered by
                        <a
                            href="https://prez.ly/storytelling-platform"
                            className="ml-2 text-blue-400 hover:text-blue-500"
                        >
                            <LogoPrezly className="w-auto h-5" />
                        </a>
                    </p>
                )}

                <StoryShare story={story} />
            </div>
        </div>
    );
}

export default StoryStickyBar;
