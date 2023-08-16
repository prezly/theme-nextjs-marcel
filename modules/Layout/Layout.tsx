import { Notification, Story } from '@prezly/sdk';
import {
    PageSeo,
    useCurrentStory,
    useNewsroom,
    useNewsroomContext,
} from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import { Router, useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { NotificationsBar } from '@/components';
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

const noIndex = process.env.VERCEL === '1';

function Layout({ title, description, imageUrl, hasError, children }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();
    const story = useCurrentStory();
    const { notifications } = useNewsroomContext();
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const { query, pathname } = useRouter();

    const isSecretUrl = pathname.startsWith('/s/');
    const isPreviewFlag = Object.keys(query).includes('preview');
    const isConfidentialStory = story && story.visibility === Story.Visibility.CONFIDENTIAL;

    const isPreview = isSecretUrl && (isPreviewFlag || !isConfidentialStory);

    const displayedNotifications = useMemo((): Notification[] => {
        if (isPreview) {
            return [
                ...notifications,
                {
                    id: 'preview-warning',
                    type: 'preview-warning',
                    style: Notification.Style.WARNING,
                    title: 'This is a preview with a temporary URL which will change after publishing.',
                    description: '',
                    actions: [],
                },
            ];
        }

        return notifications;
    }, [notifications, isPreview]);

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
                noindex={noIndex}
                nofollow={noIndex}
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
            </div>
        </>
    );
}

export default Layout;
