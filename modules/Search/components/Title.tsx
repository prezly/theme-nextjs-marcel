import { translations } from '@prezly/theme-kit-intl';
import { useIntl } from 'react-intl';

function Title() {
    const { formatMessage } = useIntl();

    return (
        <h1 className="text-4xl font-bold text-neutral-100 mt-6">
            {formatMessage(translations.search.fullResultsTitle)}
        </h1>
    );
}

export default Title;
