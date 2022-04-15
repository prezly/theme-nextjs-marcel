import type { PropsWithChildren } from 'react';

import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div className="px-6 md:px-0 lg:max-w-[1040px] lg:mx-auto">
            <Header />
            {children}
        </div>
    );
}

export default Layout;
