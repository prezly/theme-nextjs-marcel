import type { FunctionComponent } from 'react';
import type { ExtendedStory } from '@prezly/sdk';
import { FormatVersion } from '@prezly/sdk/dist/types/Story';

import { useCompanyInformation } from '@/hooks/useCompanyInformation';
import SlateRenderer from '@/components/SlateRenderer';
import { StorySeo } from '@/components/seo';
import StoryStickyBar from '@/components/StoryStickyBar';
import { SubscriptionForm, Boilerplate, SocialLinks } from '@/modules/Sidebar';

import StoryHeader from './StoryHeader';

type Props = {
    story: ExtendedStory;
};

const Story: FunctionComponent<Props> = ({ story }) => {
    const companyInformation = useCompanyInformation();

    const { format_version, content } = story;

    return (
        <>
            <StorySeo story={story} />
            <article>
                <StoryHeader story={story} />

                <div className="pt-10 py-6 lg:max-w-[920px] lg:mx-auto">
                    {format_version === FormatVersion.HTML && (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {format_version === FormatVersion.SLATEJS && (
                        <SlateRenderer nodes={JSON.parse(content)} />
                    )}
                </div>
            </article>

            {companyInformation && (
                <div className="lg:max-w-[920px] lg:mx-auto border-t border-gray-600 py-14 lg:pt-16 lg:flex lg:mb-64">
                    <SubscriptionForm
                        className="lg:w-80 lg:order-2 lg:ml-12 lg:flex-shrink-0 lg:mb-0"
                    />
                    <div className="flex-grow">
                        <Boilerplate companyInformation={companyInformation} />
                        <SocialLinks companyInformation={companyInformation} />
                    </div>
                </div>
            )}

            <StoryStickyBar story={story} />
        </>
    );
};

export default Story;
