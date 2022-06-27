import { IconArrowTop } from '@prezly/icons';
import { PageSeo, useNewsroom } from '@prezly/theme-kit-nextjs';
import { LoadingBar, ScrollToTopButton } from '@prezly/themes-ui-components';
import { Router } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import Sidebar from '../Sidebar';

import Branding from './Branding';
import Header from './Header';

import styles from './Layout.module.css';

interface Props {
    title?: string;
    description?: string;
    imageUrl?: string;
    hasError?: boolean;
}

function Layout({ title, description, imageUrl, hasError, children }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();

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
        <>
            <PageSeo title={title} description={description} imageUrl={imageUrl} />
            <Branding newsroom={newsroom} />
            <div className="lg:max-w-[1088px] lg:mx-auto">
                <Header />
                <div className="px-6">
                    <div className="pt-10 lg:flex lg:flex-nowrap">
                        <div className="flex-grow">{children}</div>
                        {!hasError && <Sidebar />}
                    </div>
                </div>
                <LoadingBar isLoading={isLoadingPage} className={styles.loadingBar} />
                <ScrollToTopButton
                    className={styles.scrollToTop}
                    icon={IconArrowTop}
                    iconClassName={styles.scrollToTopIcon}
                />
            </div>
        </>
    );
}

export default Layout;
