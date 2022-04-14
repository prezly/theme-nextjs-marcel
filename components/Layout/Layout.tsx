import type { PropsWithChildren } from 'react';

import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div className="px-6 md:px-10 lg:max-w-[1200px] lg:mx-auto">
            <Header />
            {children}
        </div>
    );
}

export default Layout;
