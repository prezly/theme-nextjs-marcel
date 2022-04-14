import translations from '@prezly/themes-intl-messages';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Error from '@/components/Error';

function InternalServerError() {
    const { formatMessage } = useIntl();
    const router = useRouter();

    return (
        <Error
            action={() => router.reload()}
            actionTitle={formatMessage(translations.actions.reload)}
            statusCode={500}
            title={formatMessage(translations.serverError.title)}
            description={formatMessage(translations.serverError.subtitle)}
        />
    );
}

export default InternalServerError;
