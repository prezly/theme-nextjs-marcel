import translations from '@prezly/themes-intl-messages';
import { useIntl } from 'react-intl';

function Title() {
    const { formatMessage } = useIntl();

    return (
        <h1 className="text-4xl font-bold text-gray-100 mt-6">
            {formatMessage(translations.search.fullResultsTitle)}
        </h1>
    );
}

export default Title;
