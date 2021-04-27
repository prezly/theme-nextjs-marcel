import type { FunctionComponent } from 'react';
import type { ExtendedStory } from '@prezly/sdk';
import Image from 'next/image';

import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import CategoryTag from '@/components/CategoryTag';
import StoryPublicationDate from '@/components/StoryPublicationDate';
import SocialShare from '@/components/SocialShare';

type Props = {
    story: ExtendedStory;
};

const StoryHeader: FunctionComponent<Props> = ({ story }) => {
    const {
        title,
        subtitle,
        categories,
        header_image,
    } = story;

    const headerImage = header_image ? JSON.parse(header_image) : undefined;

    return (
        <div className="full-width bg-gray-700 bg-opacity-30">
            <div className="lg:flex lg:max-w-[1600px] lg:mx-auto">
                {headerImage && (
                    <div className="lg:w-1/2 lg:flex-shrink-0 relative min-h-[20rem]">
                        <Image
                            src={getAssetsUrl(headerImage.uuid)}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}
                <div className="flex flex-col p-6 py-10 md:px-10 lg:px-16 lg:flex-grow lg:justify-center">
                    <div className={headerImage ? '' : 'w-full lg:max-w-[920px] lg:mx-auto'}>
                        {!!categories.length && (
                            <div className="flex mb-3">
                                {categories.map((category) => (
                                    <CategoryTag key={category.id} category={category} />
                                ))}
                            </div>
                        )}
                        <h1 className="text-gray-50 font-extrabold text-3xl mb-6 lg:text-4xl">
                            {title}
                        </h1>

                        <h3 className="mb-6 text-gray-400 text-lg">{subtitle}</h3>

                        <div className="lg:flex lg:items-center">
                            <StoryPublicationDate
                                story={story}
                                className="text-gray-400 mb-8 lg:mb-0 lg:mr-6"
                            />
                            <SocialShare />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryHeader;
