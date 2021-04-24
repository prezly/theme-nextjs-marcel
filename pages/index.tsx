import type { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';

import { BasePageProps } from 'types';
import { getPrezlyApi } from '@/utils/prezly';
import getAssetsUrl from '@/utils/prezly/getAssetsUrl';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import Layout from '@/components/Layout';
import Stories, { StoryWithContent } from '@/modules/Stories';
import Sidebar from '@/modules/Sidebar';
import { PageSeo } from '@/components/seo';

interface Props extends BasePageProps {
    stories: StoryWithContent[];
}

const IndexPage: FunctionComponent<Props> = ({
    stories,
    categories,
    newsroom,
    companyInformation,
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
                <Stories stories={stories} />
                <Sidebar />
            </div>
        </Layout>
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const [stories, categories, newsroom, companyInformation] = await Promise.all([
        api.getStories({ include: ['content'] }),
        api.getCategories(),
        api.getNewsroom(),
        api.getCompanyInformation(),
    ]);

    return {
        props: {
            // TODO: This is temporary until return types from API are figured out
            stories: stories as StoryWithContent[],
            categories,
            newsroom,
            companyInformation,
        },
    };
};

export default IndexPage;
