import { useAnalyticsContext } from '@prezly/analytics-nextjs';
import { IconArrowTop } from '@prezly/icons';
import { PageSeo, useNewsroom, useNewsroomContext } from '@prezly/theme-kit-nextjs';
import { LoadingBar, NotificationsBar, ScrollToTopButton } from '@prezly/themes-ui-components';
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
    const { notifications } = useNewsroomContext();
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();

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
            <PageSeo
                title={title}
                description={description}
                imageUrl={imageUrl}
                noindex={!isAnalyticsEnabled}
                nofollow={!isAnalyticsEnabled}
            />
            <Branding newsroom={newsroom} />
            <NotificationsBar notifications={notifications} />
            <Header />
            <div className="container">
                <div className="pt-10 lg:flex lg:flex-nowrap">
                    <div className="flex-grow">{children}</div>
                    {!hasError && <Sidebar />}
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
