import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import { useNewsroom } from '@prezly/theme-kit-nextjs';
import Image from '@prezly/uploadcare-image';
import classNames from 'classnames';

import type { StoryWithImage } from 'types';

import { getStoryThumbnail } from './lib';

type Props = {
    story: StoryWithImage | AlgoliaStory;
    className?: string;
    placeholderClassName?: string;
};

function StoryImage({ story, className, placeholderClassName }: Props) {
    const { name, newsroom_logo: logo } = useNewsroom();
    const image = getStoryThumbnail(story);

    if (image) {
        return (
            <Image
                imageDetails={image}
                alt={story.title}
                layout="fill"
                objectFit="cover"
                containerClassName={classNames('h-full block', className)}
                className="h-full"
            />
        );
    }

    return (
        <span
            className={classNames(
                'text-sm h-full flex items-center justify-center p-6 text-center uppercase font-bold border-l-gray-400 text-inherit bg-transparent',
                placeholderClassName,
            )}
        >
            {logo && (
                <Image
                    imageDetails={logo}
                    layout="fill"
                    objectFit="contain"
                    alt="No image"
                    className={classNames('h-full block', 'max-w-[16rem] max-h-16', className)}
                />
            )}
            {!logo && name}
        </span>
    );
}

export default StoryImage;
