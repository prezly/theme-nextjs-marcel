import type { FunctionComponent } from 'react';
import type { Story } from '@prezly/sdk';
import { Category, Newsroom, NewsroomCompanyInformation } from '@prezly/sdk/dist/types';
import { GetServerSideProps } from 'next';

import { getPrezlyApi } from '@/utils/prezly';
import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import Layout from '@/components/Layout';
import Stories from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import { PageSeo } from '@/components/seo';

type Props = {
    stories: Story[];
    categories: Array<Category>;
    newsroom: Newsroom;
    companyInformation?: NewsroomCompanyInformation;
};

const IndexPage: FunctionComponent<Props> = ({
    stories, categories, newsroom, companyInformation,
}) => (
    <NewsroomContextProvider categories={categories} newsroom={newsroom}>
        <PageSeo
            title={newsroom.display_name}
            description=""
            url={newsroom.url}
            imageUrl={getAssetsUrl(newsroom.newsroom_logo?.uuid as string)}
        />
        <Layout>
            <div className="pt-10 lg:flex lg:flex-nowrap">
                <Stories stories={stories} />
                <Sidebar companyInformation={companyInformation} />
            </div>
        </Layout>
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const stories = await api.getStories();
    const categories = await api.getCategories();
    const newsroom = await api.getNewsroom();
    const companyInformation = await api.getCompanyInformation();

    return {
        props: {
            stories, categories, newsroom, companyInformation,
        },
    };
};

export default IndexPage;
