import type { ExtendedStory } from '@prezly/sdk';
import {
    getNewsroomServerSideProps,
    getPrezlyApi,
    processRequest,
    useCurrentStory,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import Layout from '@/modules/Layout';
import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

const Story = dynamic(() => import('@/modules/Story'), { ssr: true });

const StoryPreviewPage: NextPage<BasePageProps> = () => {
    const currentStory = useCurrentStory();

    return (
        <Layout>
            <Story story={currentStory as ExtendedStory} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<BasePageProps> = async (context) => {
    const api = getPrezlyApi(context.req);
    const { uuid } = context.params as { uuid: string };
    const story = await api.getStory(uuid);
    if (!story) {
        return { notFound: true };
    }

    const { serverSideProps } = await getNewsroomServerSideProps(context, { story });

    return processRequest(context, {
        ...serverSideProps,
        newsroomContextProps: {
            ...serverSideProps.newsroomContextProps,
            currentStory: story,
            embedStories: await api.getEmbedStories(story),
        },
        isTrackingEnabled: false,
        translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
    });
};

export default StoryPreviewPage;
