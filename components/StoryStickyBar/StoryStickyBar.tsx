import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { ExtendedStory } from '@prezly/sdk';

import Icon from '../Icon';
import StoryShare from './StoryShare';

interface Props {
    story: ExtendedStory;
}

const StoryStickyBar: FunctionComponent<Props> = ({ story }) => (
    <div className="lg:full-width lg:fixed lg:bottom-0 lg:bg-gray-800">
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
                    <Icon name="prezly-logo" className="w-auto h-5" />
                </a>
            </p>

            <StoryShare story={story} />
        </div>
    </div>
);

export default StoryStickyBar;
