import type { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';

import { BasePageProps, PaginationProps } from 'types';
import { getPrezlyApi, getAssetsUrl } from '@/utils/prezly';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import { InfiniteStories, StoryWithContent } from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import Layout from '@/components/Layout';

import { PageSeo } from '@/components/seo';
import { DEFAULT_PAGE_SIZE } from '@/utils/prezly/constants';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
    pagination: PaginationProps;
}

const IndexPage: FunctionComponent<Props> = ({
    stories,
    categories,
    newsroom,
    companyInformation,
    pagination,
}) => (
    <NewsroomContextProvider
        categories={categories}
        newsroom={newsroom}
        companyInformation={companyInformation}
    >
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
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);

    const page = context.query.page && typeof context.query.page === 'string'
        ? Number(context.query.page)
        : undefined;

    const [storiesPaginated, categories, newsroom, companyInformation] = await Promise.all([
        api.getStories({ page, include: ['content'] }),
        api.getCategories(),
        api.getNewsroom(),
        api.getCompanyInformation(),
    ]);

    const { stories, storiesTotal } = storiesPaginated;

    return {
        props: {
            // TODO: This is temporary until return types from API are figured out
            stories: stories as StoryWithContent[],
            categories,
            newsroom,
            companyInformation,
            pagination: {
                itemsTotal: storiesTotal,
                currentPage: page ?? 1,
                pageSize: DEFAULT_PAGE_SIZE,
            },
        },
    };
};

export default IndexPage;
