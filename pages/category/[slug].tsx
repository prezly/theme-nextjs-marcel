import type { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Category, Newsroom } from '@prezly/sdk/dist/types';
import {
    getNewsroomServerSideProps,
    processRequest,
    useCurrentCategory,
    useNewsroom,
    DEFAULT_PAGE_SIZE,
    getAssetsUrl,
} from '@prezly/theme-kit-nextjs';

import { BasePageProps, PaginationProps, StoryWithContent } from 'types';
import { InfiniteStories } from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import Layout from '@/components/Layout';
import { PageSeo } from '@/components/seo';
import { importMessages, isTrackingEnabled } from '@/utils';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
    pagination: PaginationProps;
}

const IndexPage: FunctionComponent<Props> = ({ stories, pagination }) => {
    const router = useRouter();
    const category = useCurrentCategory() as Category;
    const newsroom = useNewsroom() as Newsroom;
    const slug = router.query.slug;

    return (
        <>
            <PageSeo
                title={category.display_name}
                description={category.display_description as string}
                url={`${newsroom.url}/category/${slug}`}
                imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
            />
            <Layout>
                <div className="pt-10 lg:flex lg:flex-nowrap">
                    <div className="lg:flex-grow">
                        <h3 className="uppercase text-gray-400 text-lg leading-6 mb-6 tracking-wider">
                            Browsing Category
                        </h3>
                        <h1 className="text-gray-50 font-bold mb-12 text-4xl">
                            {category.display_name}
                        </h1>
                        <InfiniteStories
                            initialStories={stories}
                            pagination={pagination}
                            category={category}
                        />
                    </div>
                    <Sidebar />
                </div>
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
