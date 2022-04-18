import { Router } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { LoadingBar } from '@/components';

import Sidebar from '../Sidebar';

import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
    const [isLoadingPage, setIsLoadingPage] = useState(false);

    useEffect(() => {
        function onRouteChangeStart() {
            setIsLoadingPage(true);
        }
        function routeChangeComplete() {
            setIsLoadingPage(false);
        }

        Router.events.on('routeChangeStart', onRouteChangeStart);
        Router.events.on('routeChangeComplete', routeChangeComplete);
        return () => {
            Router.events.off('routeChangeStart', onRouteChangeStart);
            Router.events.off('routeChangeComplete', routeChangeComplete);
        };
    }, []);

    return (
        <div className="lg:max-w-[1040px] lg:mx-auto">
            <Header />
            <div className="px-6">
                <div className="pt-10 lg:flex lg:flex-nowrap">
                    <div className="flex-grow">{children}</div>
                    <Sidebar />
                </div>
            </div>
            <LoadingBar isLoading={isLoadingPage} />
        </div>
    );
}

export default Layout;
