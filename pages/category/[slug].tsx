import type { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import { Category } from '@prezly/sdk/dist/types';

import { BasePageProps, PaginationProps } from 'types';
import { DEFAULT_PAGE_SIZE } from '@/utils/prezly/constants';

import { getPrezlyApi, getAssetsUrl } from '@/utils/prezly';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import { InfiniteStories, StoryWithContent } from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import Layout from '@/components/Layout';
import { PageSeo } from '@/components/seo';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
    category: Category;
    slug: string;
    pagination: PaginationProps;
}

const IndexPage: FunctionComponent<Props> = ({
    category,
    stories,
    categories,
    slug,
    newsroom,
    companyInformation,
    pagination,
}) => (
    <NewsroomContextProvider
        categories={categories}
        newsroom={newsroom}
        companyInformation={companyInformation}
        selectedCategory={category}
    >
        <PageSeo
            title={category.display_name}
            description={category.display_description as string}
            url={`${newsroom.url}/category/${slug}`}
            imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
        />
        <Layout>
            <div className="pt-10 lg:flex lg:flex-nowrap">
                <div className="lg:flex-grow">
                    <h3 className="uppercase text-gray-400 text-lg leading-6 mb-6 tracking-wider">Browsing Category</h3>
                    <h1 className="text-gray-50 font-extrabold mb-12 text-4xl">{category.display_name}</h1>
                    <InfiniteStories initialStories={stories} pagination={pagination} category={category} />
                </div>
                <Sidebar />
            </div>
        </Layout>
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const { slug } = context.params as { slug: string };

    const [categories, category, newsroom, companyInformation] = await Promise.all([
        api.getCategories(),
        api.getCategoryBySlug(slug),
        api.getNewsroom(),
        api.getCompanyInformation(),
    ]);

    if (!category) {
        return {
            notFound: true,
        };
    }

    const page = context.query.page && typeof context.query.page === 'string'
        ? Number(context.query.page)
        : undefined;

    const { stories, storiesTotal } = await api.getStoriesFromCategory(category, { page, include: ['content'] });

    return {
        props: {
            // TODO: This is temporary until return types from API are figured out
            stories: stories as StoryWithContent[],
            category,
            categories,
            newsroom,
            slug,
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
