import type { PropsWithChildren } from 'react';

import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div className="lg:max-w-[1040px] lg:mx-auto">
            <Header />
            <div className="px-6">{children}</div>
        </div>
    );
}

export default Layout;
