import { LocaleObject, useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

interface Props {
    href: string;
    localeCode?: string | false;
}

function Language({ href, localeCode, children }: PropsWithChildren<Props>) {
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    const localeUrl = localeCode ? getLinkLocaleSlug(LocaleObject.fromAnyCode(localeCode)) : false;
    const hrefWithLocale = localeUrl ? `/${localeUrl}${href.toString()}` : href.toString();

    return (
        <a
            href={hrefWithLocale}
            className={classNames(
                'px-4 leading-7 block',
                'hover:bg-gray-600 focus-visible:bg-gray-600',
                'active:bg-gray-500',
                'focus-visible:ring-inset focus-visible:ring-4',
                'focus-visible:ring-blue-300 focus:outline-none',
                'py-3',
            )}
        >
            {children}
        </a>
    );
}

export default Language;
