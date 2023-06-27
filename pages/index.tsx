import type { HomePageProps } from '@prezly/theme-kit-nextjs/server';
import { getHomepageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import type { FunctionComponent } from 'react';

import Layout from '@/modules/Layout';
import { InfiniteStories } from '@/modules/Stories';
import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

type Props = BasePageProps & HomePageProps;

const IndexPage: FunctionComponent<Props> = ({ stories, pagination }) => (
    <Layout>
        <InfiniteStories initialStories={stories} pagination={pagination} />
    </Layout>
);

export const getServerSideProps = getHomepageServerSideProps<BasePageProps>(
    async (context, { newsroomContextProps }) => ({
        isTrackingEnabled: isTrackingEnabled(context),
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default IndexPage;
