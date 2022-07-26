import type { ExtendedStory } from '@prezly/sdk';
import Image from '@prezly/uploadcare-image';

import CategoryTag from '@/components/CategoryTag';
import StoryPublicationDate from '@/components/StoryPublicationDate';

type Props = {
    story: ExtendedStory;
};

function StoryHeader({ story }: Props) {
    const { title, subtitle, categories, header_image } = story;

    const headerImage = header_image ? JSON.parse(header_image) : undefined;

    return (
        <div className="">
            <div className="lg:flex lg:mx-auto">
                {headerImage && (
                    <div className="lg:w-1/2 lg:flex-shrink-0 relative h-[20rem] sm:h-auto min-h-[20rem]">
                        <Image
                            imageDetails={headerImage}
                            layout="fill"
                            alt={story.title}
                            objectFit="cover"
                            containerClassName="image-full-height"
                        />
                    </div>
                )}
                <div className="flex flex-col p-6 py-10 md:px-10 lg:px-16 lg:flex-grow lg:justify-center">
                    <div className={headerImage ? '' : 'w-full lg:max-w-[920px] lg:mx-auto'}>
                        {!!categories.length && (
                            <div className="flex mb-6">
                                {categories.map((category) => (
                                    <CategoryTag
                                        key={category.id}
                                        category={category}
                                        className="text-base bg-neutral-600 bg-opacity-60 mr-4"
                                    />
                                ))}
                            </div>
                        )}
                        <h1 className="text-neutral-100 font-bold text-3xl mb-6 lg:text-4xl">
                            {title}
                        </h1>

                        <h3 className="mb-6 text-neutral-300 text-lg leading-8">{subtitle}</h3>

                        <div className="lg:flex lg:items-center">
                            <StoryPublicationDate
                                story={story}
                                className="mb-8 lg:mb-0 lg:mr-6 text-neutral-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryHeader;
