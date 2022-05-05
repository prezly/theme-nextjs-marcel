import { PageSeo, useNewsroom } from '@prezly/theme-kit-nextjs';
import { Router } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { LoadingBar } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { useDevice } from '@/hooks/useDevice';

import Sidebar from '../Sidebar';

import Branding from './Branding';
import Header from './Header';

interface Props {
    title?: string;
    description?: string;
    imageUrl?: string;
    hasError?: boolean;
}

function Layout({ title, description, imageUrl, hasError, children }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();

    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

    const { isMobile } = useDevice();

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

    useEffect(() => {
        function scrollListener() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                setIsScrollToTopVisible(true);
            } else {
                setIsScrollToTopVisible(false);
            }
        }
        if (typeof window !== 'undefined') {
            window.onscroll = scrollListener;
        }

        return () => {
            if (window !== null) {
                window.onscroll = null;
            }
        };
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

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
                <LoadingBar isLoading={isLoadingPage} />
                <ScrollToTopButton
                    isVisible={isScrollToTopVisible && !isMobile}
                    onClick={scrollToTop}
                />
            </div>
        </>
    );
}

export default Layout;
