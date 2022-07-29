import HCaptcha from '@hcaptcha/react-hcaptcha';
import { getPrivacyPortalUrl, useCurrentLocale, useNewsroom } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, PropsWithChildren } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '@/components/Button';
import Input from '@/components/Input';

import { getLocaleCodeForCaptcha, validateEmail } from './utils';

import styles from './SubscriptionForm.module.css';

type Props = {
    className?: string;
    inlineForm?: boolean;
};

// eslint-disable-next-line prefer-destructuring
const NEXT_PUBLIC_HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

function SubscriptionForm({ className, inlineForm }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();
    const currentLocale = useCurrentLocale();
    const { formatMessage } = useIntl();

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState<string>();
    const [captchaToken, setCaptchaToken] = useState<string>();

    const captchaRef = useRef<HCaptcha>(null);

    function handleSubmit(event?: FormEvent<HTMLFormElement>) {
        try {
            setEmailError(undefined);
            setIsSubmitting(true);
            if (event) {
                event.preventDefault();
            }

            if (!captchaRef.current) {
                throw new Error(formatMessage(translations.errors.unknown));
            }

            const errorMessageDescriptor = validateEmail(email);
            if (errorMessageDescriptor) {
                throw new Error(formatMessage(errorMessageDescriptor));
            }

            if (!captchaToken) {
                captchaRef.current.execute();
                setIsSubmitting(false);
                return;
            }

            window.location.href = getPrivacyPortalUrl(newsroom, currentLocale, { email });
        } catch (error) {
            if (error instanceof Error) {
                setEmailError(error.message);
            }
            setIsSubmitting(false);
        }
    }

    function handleCaptchaVerify(token: string) {
        setCaptchaToken(token);
        handleSubmit();
    }

    // Clear the error when user types in a correct value
    useEffect(() => {
        setEmailError((error) => {
            if (error) {
                const errorMessageDescriptor = validateEmail(email);
                return errorMessageDescriptor ? formatMessage(errorMessageDescriptor) : undefined;
            }

            return error;
        });
    }, [email, formatMessage]);

    if (!newsroom.is_subscription_form_enabled) {
        return null;
    }

    return (
        <form
            className={classNames('bg-neutral-800 rounded-xl p-6 mb-12', className)}
            onSubmit={handleSubmit}
            noValidate
        >
            <h3 className="mb-6 text-lg font-semibold leading-8 text-neutral-100">
                <FormattedMessage {...translations.subscription.formTitle} />
            </h3>

            <div className={classNames(inlineForm && 'lg:flex')}>
                <div className={inlineForm ? 'flex-grow' : 'mb-4'}>
                    <Input
                        name="email"
                        type="email"
                        placeholder={formatMessage(translations.subscription.labelEmail)}
                        className="font-medium"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        helper={emailError}
                        isError={!!emailError}
                        isLoading={isSubmitting}
                    />
                </div>

                <Button fullWidth type="submit" variant="primary" loading={isSubmitting}>
                    <FormattedMessage {...translations.actions.subscribe} />
                </Button>

                <p className={styles.disclaimer}>
                    <FormattedMessage
                        {...translations.subscription.disclaimer}
                        values={{
                            subscribe: <FormattedMessage {...translations.actions.subscribe} />,
                            privacyPolicyLink: (
                                <a
                                    href={
                                        newsroom.custom_privacy_policy_link ??
                                        'https://www.prezly.com/privacy-policy'
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.disclaimerLink}
                                >
                                    <FormattedMessage
                                        {...translations.subscription.privacyPolicy}
                                    />
                                </a>
                            ),
                        }}
                    />
                </p>
            </div>

            {NEXT_PUBLIC_HCAPTCHA_SITEKEY && (
                <HCaptcha
                    sitekey={NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                    size="invisible"
                    ref={captchaRef}
                    onVerify={handleCaptchaVerify}
                    onExpire={() => setCaptchaToken(undefined)}
                    languageOverride={getLocaleCodeForCaptcha(currentLocale)}
                />
            )}
        </form>
    );
}

export default SubscriptionForm;
