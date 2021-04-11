import type { FunctionComponent } from 'react';
import type { ExtendedStory, NewsroomCompanyInformation } from '@prezly/sdk/dist/types';
import SlateRenderer from 'components/SlateRenderer';
import { FormatVersion } from '@prezly/sdk/dist/types/Story';
import { StorySeo } from '@/components/seo';
import CategoryTag from '@/components/CategoryTag';
import StoryPublicationDate from '@/components/StoryPublicationDate';
import StoryStickyBar from '@/components/StoryStickyBar';
import SocialShare from '@/components/SocialShare';
import classNames from 'classnames';
import Image from 'next/image';
import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import SubscriptionForm from '../Sidebar/SubscriptionForm';
import Boilerplate from '../Sidebar/Boilerplate';
import SocialLinks from '../Sidebar/SocialLinks';

type Props = {
    story: ExtendedStory;
    companyInformation?: NewsroomCompanyInformation;
};

const Story: FunctionComponent<Props> = ({ story, companyInformation }) => {
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
                <div className="full-width bg-gray-700 bg-opacity-30">
                    <div className="lg:flex lg:max-w-[1600px] lg:mx-auto">
                        {headerImage && (
                            <div className="lg:w-1/2 lg:flex-shrink-0 relative min-h-[22rem] lg:min-h-[30rem]">
                                <Image
                                    src={getAssetsUrl(headerImage.uuid)}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <div className="flex flex-col p-6 py-10 lg:px-16 lg:flex-grow lg:justify-center">
                            {!!categories.length && (
                                <div className="flex mb-3">
                                    {categories.map((category) => (
                                        <CategoryTag category={category} />
                                    ))}
                                </div>
                            )}
                            <h1
                                className={classNames(
                                    'text-gray-50 font-extrabold text-3xl mb-6',
                                    'md:text-4xl',
                                )}
                            >
                                {title}
                            </h1>

                            <h3 className="mb-6 text-gray-400 text-lg">{subtitle}</h3>

                            <div className="lg:flex lg:items-center">
                                <StoryPublicationDate story={story} className="text-gray-400 mb-8 lg:mb-0 lg:mr-6" />
                                <SocialShare story={story} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 lg:max-w-[920px] lg:mx-auto">
                    {format_version === FormatVersion.HTML && (
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
                    companyInformation={companyInformation}
                    className="lg:w-80 lg:order-2 lg:ml-12 lg:flex-shrink-0 lg:mb-0"
                />
                <div>
                    <Boilerplate companyInformation={companyInformation} />
                    <SocialLinks companyInformation={companyInformation} />
                </div>
            </div>

            <StoryStickyBar story={story} />
        </>
    );
};

export default Story;
