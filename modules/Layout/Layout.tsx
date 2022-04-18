import type { PropsWithChildren } from 'react';

import Sidebar from '../Sidebar';

import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div className="lg:max-w-[1040px] lg:mx-auto">
            <Header />
            <div className="px-6">
                <div className="pt-10 lg:flex lg:flex-nowrap">
                    <div className="flex-grow">{children}</div>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}

export default Layout;
