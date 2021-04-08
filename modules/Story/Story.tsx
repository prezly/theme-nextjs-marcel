import type { FunctionComponent } from 'react';
import type { ExtendedStory, Newsroom } from '@prezly/sdk/dist/types';
import SlateRenderer from 'components/SlateRenderer';
import { FormatVersion } from '@prezly/sdk/dist/types/Story';
import { StorySeo } from '@/components/seo';
import CategoryTag from '@/components/CategoryTag';
import StoryPublicationDate from '@/components/StoryPublicationDate';
import StoryStickyBar from '@/components/StoryStickyBar';
import classNames from 'classnames';
import Image from 'next/image';
import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import SubscriptionForm from '../Sidebar/SubscriptionForm';
import Boilerplate from '../Sidebar/Boilerplate';
import SocialLinks from '../Sidebar/SocialLinks';

type Props = {
    story: ExtendedStory;
    newsroom: Newsroom;
};

const Story: FunctionComponent<Props> = ({ story, newsroom }) => {
    if (!story) {
        return null;
    }

    const {
        title,
        subtitle,
        content,
        format_version,
        categories,
        header_image,
    } = story;

    const headerImage = header_image ? JSON.parse(header_image) : undefined;

    return (
        <>
            <StorySeo story={story} />
            <article>
                <div className="full-width bg-gray-700 py-6 md:py-20 z-0">
                    {headerImage && (
                        <Image
                            src={getAssetsUrl(headerImage.uuid)}
                            layout="fill"
                            objectFit="cover"
                            className="z-[-1]"
                        />
                    )}

                    <div className="px-6 md:px-10 lg:max-w-[1200px] lg:mx-auto">
                        <div className="bg-gray-800 bg-opacity-70 p-6 md:p-10">
                            <h1
                                className={classNames(
                                    'text-gray-50 font-extrabold text-3xl mb-8 text-center',
                                    'md:text-4xl md:text-left',
                                )}
                            >
                                {title}
                            </h1>

                            <div className="flex flex-col md:flex-row items-center">
                                {!!categories.length && (
                                    <div className="flex mb-3 md:mb-0 md:mr-6">
                                        {categories.map((category) => (
                                            <CategoryTag category={category} />
                                        ))}
                                    </div>
                                )}
                                <StoryPublicationDate story={story} className="text-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 lg:max-w-[920px] lg:mx-auto">
                    <h3 className="mb-10 font-semibold text-gray-300 text-xl">{subtitle}</h3>
                    {format_version === FormatVersion.HTML && (
                        // @ts-expect-error
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {format_version === FormatVersion.SLATEJS && (
                        <SlateRenderer nodes={JSON.parse(content as string)} />
                    )}
                </div>
            </article>

            <div className="lg:max-w-[920px] lg:mx-auto border-t border-gray-600 py-14 lg:pt-16 lg:flex lg:mb-64">
                <SubscriptionForm
                    newsroom={newsroom}
                    className="lg:w-80 lg:order-2 lg:ml-12 lg:flex-shrink-0 lg:mb-0"
                />
                <div>
                    <Boilerplate newsroom={newsroom} />
                    <SocialLinks newsroom={newsroom} />
                </div>
            </div>

            <StoryStickyBar story={story} />
        </>
    );
};

export default Story;
