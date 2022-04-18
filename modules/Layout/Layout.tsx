import { Router } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { LoadingBar } from '@/components';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { useDevice } from '@/hooks/useDevice';

import Sidebar from '../Sidebar';

import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
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
            if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
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
            top: 1,
            behavior: 'smooth',
        });
    }

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
            <ScrollToTopButton
                isVisible={isScrollToTopVisible && !isMobile}
                onClick={scrollToTop}
            />
        </div>
    );
}

export default Layout;
