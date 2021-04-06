import { Category, Newsroom } from '@prezly/sdk/dist/types';
import { FunctionComponent } from 'react';
import Header from './Header';

type Props = {
    categories?: Array<Category>;
    newsroom: Newsroom;
};

const Layout: FunctionComponent<Props> = ({ children, categories, newsroom }) => (
    <div className="px-6 md:px-10 lg:max-w-[1200px] lg:mx-auto">
        <Header newsroom={newsroom} categories={categories} />
        {children}
    </div>
);

export default Layout;
