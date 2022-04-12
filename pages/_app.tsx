import { AnalyticsContextProvider } from '@prezly/analytics-nextjs';
import type { PageProps } from '@prezly/theme-kit-nextjs';
import { DEFAULT_LOCALE, LocaleObject, NewsroomContextProvider } from '@prezly/theme-kit-nextjs';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import type { BasePageProps } from 'types';

import '@prezly/uploadcare-image/build/styles.css';
import '../styles/globals.css';
import '../styles/slate-override.css';

function App({ Component, pageProps }: AppProps) {
    const { newsroomContextProps, translations, isTrackingEnabled, ...customPageProps } =
        pageProps as PageProps & BasePageProps;

    const { localeCode, newsroom, currentStory } = newsroomContextProps;
    const locale = useMemo(() => LocaleObject.fromAnyCode(localeCode), [localeCode]);

    return (
        <NewsroomContextProvider {...newsroomContextProps}>
            <IntlProvider
                locale={locale.toHyphenCode()}
                defaultLocale={DEFAULT_LOCALE}
                messages={translations}
            >
                <AnalyticsContextProvider
                    isEnabled={isTrackingEnabled}
                    newsroom={newsroom}
                    story={currentStory}
                >
                    <Component {...customPageProps} />
                </AnalyticsContextProvider>
            </IntlProvider>
        </NewsroomContextProvider>
    );
}

export default App;
