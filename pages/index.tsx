import type { HomePageProps } from '@prezly/theme-kit-nextjs';
import { getHomepageServerSideProps, useNewsroom } from '@prezly/theme-kit-nextjs';
import type { FunctionComponent } from 'react';

import Layout from '@/modules/Layout';
import { InfiniteStories } from '@/modules/Stories';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

type Props = BasePageProps & HomePageProps;

const IndexPage: FunctionComponent<Props> = ({ stories, pagination }) => {
    const newsroom = useNewsroom();

    return (
        <Layout title={newsroom.display_name}>
            <InfiniteStories initialStories={stories} pagination={pagination} />
        </Layout>
    );
};

export const getServerSideProps = getHomepageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default IndexPage;
