import type { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import { Category } from '@prezly/sdk/dist/types';

import { BasePageProps } from 'types';

import { getPrezlyApi, getAssetsUrl } from '@/utils/prezly';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import Stories, { StoryWithContent } from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import Layout from '@/components/Layout';
import { PageSeo } from '@/components/seo';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
    category: Category;
    slug: string;
}

const IndexPage: FunctionComponent<Props> = ({
    category,
    stories,
    categories,
    slug,
    newsroom,
    companyInformation,
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
                    <Stories stories={stories} />
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

    const stories = await api.getStoriesFromCategory(category, { include: ['content'] });

    return {
        props: {
            // TODO: This is temporary until return types from API are figured out
            stories: stories as StoryWithContent[],
            category,
            categories,
            newsroom,
            slug,
            companyInformation,
        },
    };
};

export default IndexPage;
