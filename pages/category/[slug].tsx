import type { Category, Newsroom } from '@prezly/sdk/dist/types';
import {
    DEFAULT_PAGE_SIZE,
    getAssetsUrl,
    getNewsroomServerSideProps,
    processRequest,
    useCurrentCategory,
    useNewsroom,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';

import { PageSeo } from '@/components/seo';
import Layout from '@/modules/Layout';
import Sidebar from '@/modules/Sidebar';
import { InfiniteStories } from '@/modules/Stories';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps, PaginationProps, StoryWithContent } from 'types';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
    pagination: PaginationProps;
}

const IndexPage: FunctionComponent<Props> = ({ stories, pagination }) => {
    const router = useRouter();
    const category = useCurrentCategory() as Category;
    const newsroom = useNewsroom() as Newsroom;
    const { slug } = router.query;

    return (
        <>
            <PageSeo
                title={category.display_name}
                description={category.display_description as string}
                url={`${newsroom.url}/category/${slug}`}
                imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
            />
            <Layout>
                <InfiniteStories
                    initialStories={stories}
                    pagination={pagination}
                    category={category}
                />
            </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { api, serverSideProps } = await getNewsroomServerSideProps(context);

    const { slug } = context.params as { slug: string };
    const category = await api.getCategoryBySlug(slug);

    if (!category) {
        return {
            notFound: true,
        };
    }

    const { query } = context;
    const page = query.page && typeof query.page === 'string' ? Number(query.page) : undefined;

    const { localeCode } = serverSideProps.newsroomContextProps;

    const { stories, storiesTotal } = await api.getStoriesFromCategory(category, {
        page,
        include: ['content'],
        localeCode,
    });

    return processRequest(
        context,
        {
            ...serverSideProps,
            newsroomContextProps: {
                ...serverSideProps.newsroomContextProps,
                currentCategory: category,
            },
            stories: stories as StoryWithContent[],
            pagination: {
                itemsTotal: storiesTotal,
                currentPage: page ?? 1,
                pageSize: DEFAULT_PAGE_SIZE,
            },
            isTrackingEnabled: isTrackingEnabled(context),
            translations: await importMessages(localeCode),
        },
        `/category/${slug}`,
    );
};

export default IndexPage;
