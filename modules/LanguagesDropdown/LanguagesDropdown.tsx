import {
    getLanguageDisplayName,
    getUsedLanguages,
    LocaleObject,
    useCurrentLocale,
    useCurrentStory,
    useGetLinkLocaleSlug,
    useGetTranslationUrl,
    useLanguages,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { useMemo, useState } from 'react';

import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import Icon from '@/components/Icon';

import Language from './Language';

interface Props {
    className?: string;
}

function LanguagesDropdown({ className }: Props) {
    const currentLocale = useCurrentLocale();
    const languages = useLanguages();
    const getTranslationUrl = useGetTranslationUrl();
    const currentStory = useCurrentStory();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen((o) => !o);
    }
    function closeMenu() {
        setIsMenuOpen(false);
    }

    const currentLanguage = useMemo(
        () => languages.find((language) => language.code === currentLocale.toUnderscoreCode()),
        [currentLocale, languages],
    );

    const displayedLanguages = useMemo(() => {
        if (!languages.length) {
            return [];
        }

        return getUsedLanguages(languages).filter(
            (language) => language.code !== currentLocale.toUnderscoreCode(),
        );
    }, [currentLocale, languages]);

    // Don't show language selector if there are no other locale to choose
    if (!currentLanguage || displayedLanguages.length < 1) {
        return null;
    }

    return (
        <div className={classNames('md:relative flex items-center z-10', className)}>
            {isMenuOpen && (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div className="fixed top-0 left-0 right-0 bottom-0 z-[-1]" onClick={toggleMenu} />
            )}
            <Button
                content={
                    <>
                        <Icon name="globe" className="w-3.5 h-3.5 mr-1" />
                        <span>{getLanguageDisplayName(currentLanguage, languages)}</span>
                    </>
                }
                variation="tertiary"
                onClick={toggleMenu}
                className="uppercase"
                icon="caret"
                iconPlacement="right"
                isActive={isMenuOpen}
            />
            <Dropdown
                isMenuOpen={isMenuOpen}
                dropdownList={displayedLanguages.map((language) => {
                    const locale = LocaleObject.fromAnyCode(language.code);
                    const translationLink = getTranslationUrl(locale);

                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            key={locale.toHyphenCode()}
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                            role="menuitem"
                            onClick={closeMenu}
                        >
                            <Language
                                href={translationLink}
                                localeCode={
                                    currentStory && translationLink !== '/'
                                        ? false
                                        : getLinkLocaleSlug(locale)
                                }
                            >
                                {getLanguageDisplayName(language, languages)}
                            </Language>
                        </li>
                    );
                })}
            />
        </div>
    );
}

export default LanguagesDropdown;
