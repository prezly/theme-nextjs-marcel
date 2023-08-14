import { Story as PrezlyStory } from '@prezly/sdk';
import { useCurrentStory } from '@prezly/theme-kit-nextjs';
import { getStoryPageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Layout from '@/modules/Layout';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

const Story = dynamic(() => import('@/modules/Story'), { ssr: true });

const StoryPage: NextPage<BasePageProps> = () => {
    const story = useCurrentStory();

    return (
        <Layout>
            <Story story={story!} />
        </Layout>
    );
};

export const getServerSideProps = getStoryPageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
    [PrezlyStory.FormatVersion.SLATEJS_V5],
);

export default StoryPage;
