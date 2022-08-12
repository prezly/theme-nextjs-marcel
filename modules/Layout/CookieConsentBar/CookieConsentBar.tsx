import { CookieConsentBar as DefaultCookieConsentBar } from '@prezly/analytics-nextjs';
import { useCompanyInformation } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import Button from '../../../components/Button';

function CookieConsentBar() {
    const { cookie_statement: cookieStatement } = useCompanyInformation();

    return (
        <DefaultCookieConsentBar>
            {({ onAccept, onReject }) => (
                <div className="border-b border-primary-darkest py-12 mb-10">
                    <div className="container">
                        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4">
                            <div className="flex flex-col">
                                <p className="font-bold text-2xl mb-2">
                                    <FormattedMessage {...translations.cookieConsent.title} />
                                </p>
                                {cookieStatement ? (
                                    <div dangerouslySetInnerHTML={{ __html: cookieStatement }} />
                                ) : (
                                    <p>
                                        <FormattedMessage
                                            {...translations.cookieConsent.description}
                                        />
                                    </p>
                                )}
                            </div>
                            <div className="flex lg:justify-center lg:items-end flex-col">
                                <div className="flex md:flex-row flex-col gap-y-4 md:gap-y-0 md:gap-x-4 mb-4">
                                    <Button variant="outlined" onClick={onReject}>
                                        <FormattedMessage {...translations.cookieConsent.reject} />
                                    </Button>
                                    <Button onClick={onAccept}>
                                        <FormattedMessage {...translations.cookieConsent.accept} />
                                    </Button>
                                </div>
                                <p>
                                    <FormattedMessage {...translations.cookieConsent.notice} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DefaultCookieConsentBar>
    );
}

export default CookieConsentBar;
