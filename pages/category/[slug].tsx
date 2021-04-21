import type { FunctionComponent } from 'react';
import type { Story } from '@prezly/sdk';
import { GetServerSideProps } from 'next';
import { getPrezlyApi } from '@/utils/prezly';
import Layout from '@/components/Layout';
import Stories from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import { Category } from '@prezly/sdk/dist/types';
import { PageSeo } from '@/components/seo';
import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import { BasePageProps } from 'types';

interface Props extends BasePageProps {
    stories: Story[];
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
    >
        <PageSeo
            title={category.display_name}
            description={category.display_description as string}
            url={`${newsroom.url}/category/${slug}`}
            imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
        />
        <Layout>
            <div className="pt-10 lg:flex lg:flex-nowrap">
                <div>
                    <h3 className="uppercase text-gray-400 text-lg mb-6 tracking-wide">Browsing Category</h3>
                    <h1 className="text-gray-50 font-extrabold mb-12 text-4xl">{category.display_name}</h1>
                    <Stories stories={stories} />
                </div>
                <Sidebar companyInformation={companyInformation} />
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

    const stories = await api.getStoriesFromCategory(category);

    return {
        props: {
            stories,
            category,
            categories,
            newsroom,
            slug,
            companyInformation,
        },
    };
};

export default IndexPage;
