import translations from '@prezly/themes-intl-messages';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Error from '@/components/Error';

function NotFoundError() {
    const { formatMessage } = useIntl();
    const router = useRouter();

    return (
        <Error
            action={() => router.push('/')}
            actionTitle={formatMessage(translations.actions.backToHomePage)}
            statusCode={404}
            title={formatMessage(translations.notFound.title)}
            description={formatMessage(translations.notFound.subtitle)}
        />
    );
}

export default NotFoundError;
