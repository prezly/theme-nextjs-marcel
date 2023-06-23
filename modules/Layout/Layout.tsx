import { useAnalyticsContext } from '@prezly/analytics-nextjs';
import type { Notification } from '@prezly/sdk';
import { PageSeo, useNewsroom, useNewsroomContext } from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import { Router, useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { MadeWithPrezly, NotificationsBar } from '@/components';
import { IconArrowTop } from '@/icons';
import { LoadingBar, ScrollToTopButton } from '@/ui';

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

const CookieConsentBar = dynamic(() => import('./CookieConsentBar'), {
    ssr: false,
});

function Layout({ title, description, imageUrl, hasError, children }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();
    const { notifications } = useNewsroomContext();
    const { isEnabled: isAnalyticsEnabled } = useAnalyticsContext();
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const { pathname } = useRouter();

    const displayedNotifications = useMemo(() => {
        if (pathname === '/s/[uuid]') {
            return [
                ...notifications,
                {
                    id: 'preview-warning',
                    type: 'preview-warning',
                    style: 'warning',
                    title: 'This is a preview with a temporary URL which will change after publishing.',
                    description: '',
                    actions: [],
                } as Notification,
            ];
        }

        return notifications;
    }, [notifications, pathname]);

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
            <NotificationsBar notifications={displayedNotifications} />
            <CookieConsentBar />
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
                {!newsroom.is_white_labeled && <MadeWithPrezly />}
            </div>
        </>
    );
}

export default Layout;
