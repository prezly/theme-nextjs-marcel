import { GetServerSideProps, NextPage } from 'next';
import {
    DUMMY_DEFAULT_LOCALE,
    getNewsroomServerSideProps,
    processRequest,
    useCurrentStory,
    getPrezlyApi,
} from '@prezly/theme-kit-nextjs';

import { BasePageProps } from 'types';
import Story from '@/modules/Story';
import Layout from '@/components/Layout';
import { importMessages, isTrackingEnabled } from '@/utils';

const StoryPage: NextPage<BasePageProps> = () => {
    const story = useCurrentStory();

    return (
        <Layout>
            <Story story={story!} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const api = getPrezlyApi(context.req);

    const { slug } = context.params as { slug?: string };
    const story = slug ? await api.getStoryBySlug(slug) : null;
    if (!story) {
        return { notFound: true };
    }

    const { serverSideProps } = await getNewsroomServerSideProps(context, { story });

    const { locale } = context;
    if (locale && locale !== DUMMY_DEFAULT_LOCALE) {
        return {
            redirect: {
                destination: `/${slug}`,
                permanent: true,
            },
        };
    }

    return processRequest(context, {
        ...serverSideProps,
        newsroomContextProps: {
            ...serverSideProps.newsroomContextProps,
            currentStory: story,
        },
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
    });
};

export default StoryPage;
