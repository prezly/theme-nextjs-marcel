import {
    DEFAULT_PAGE_SIZE,
    getAssetsUrl,
    getNewsroomServerSideProps,
    processRequest,
    useNewsroom,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import type { FunctionComponent } from 'react';

import Layout from '@/components/Layout';
import { PageSeo } from '@/components/seo';
import Sidebar from '@/modules/Sidebar';
import { InfiniteStories } from '@/modules/Stories';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps, PaginationProps, StoryWithContent } from 'types';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
    pagination: PaginationProps;
}

const IndexPage: FunctionComponent<Props> = ({ stories, pagination }) => {
    const newsroom = useNewsroom();

    return (
        <>
            <PageSeo
                title={newsroom.display_name}
                description=""
                url={newsroom.url}
                imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
            />
            <Layout>
                <div className="pt-10 lg:flex lg:flex-nowrap">
                    <div className="flex-grow">
                        <InfiniteStories initialStories={stories} pagination={pagination} />
                    </div>
                    <Sidebar />
                </div>
            </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { api, serverSideProps } = await getNewsroomServerSideProps(context, {
        loadHomepageContacts: true,
    });

    const { query } = context;
    const page = query.page && typeof query.page === 'string' ? Number(query.page) : undefined;

    const { localeCode } = serverSideProps.newsroomContextProps;

    const storiesPaginated = await api.getStories({
        page,
        include: ['content'],
        localeCode,
    });
    const { stories, storiesTotal } = storiesPaginated;

    return processRequest(
        context,
        {
            ...serverSideProps,
            // TODO: This is temporary until return types from API are figured out
            stories: stories as StoryWithContent[],
            pagination: {
                itemsTotal: storiesTotal,
                currentPage: page ?? 1,
                pageSize: DEFAULT_PAGE_SIZE,
            },
            isTrackingEnabled: isTrackingEnabled(context),
            translations: await importMessages(localeCode),
        },
        '/',
    );
};

export default IndexPage;
