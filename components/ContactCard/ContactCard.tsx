import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';

import { IconEmail, IconFacebook, IconGlobe, IconMobile, IconPhone, IconTwitter } from '@/icons';

import getSocialHandles from './lib/getSocialHandles';

interface Props {
    node: ContactNode;
}

function ContactCard({ node }: Props) {
    const { contact, layout, show_avatar } = node;
    const { avatar_url, name, description, company, email, phone, mobile } = contact;
    const website = contact.website ? new URL(contact.website) : null;

    const isCard = layout === 'card';
    const isSignature = layout === 'signature';

    const { twitter, facebook } = getSocialHandles(contact);

    const subtitle = description && company ? `${description}, ${company}` : description;

    return (
        <div
            className={classNames('text-neutral-300 my-10', {
                'rounded-xl p-6 border-[1px] border-neutral-600': isCard,
            })}
        >
            <div className="flex items-center">
                {avatar_url && show_avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className="block w-14 h-14 rounded mb-6 lg:mb-0 mr-4"
                        src={avatar_url}
                        alt={name}
                    />
                )}
                <div>
                    <h4 className="text-lg text-neutral-200 font-semibold">{name}</h4>
                    {subtitle && <h5 className="text-neutral-400">{subtitle}</h5>}
                </div>
            </div>
            {isCard && (
                <div className="mt-4 gap-x-4 gap-y-3 flex flex-col sm:flex-wrap sm:flex-row overflow-hidden">
                    {email && (
                        <a href={`mailto:${email}`} className="default-link flex items-center">
                            <IconEmail className="shrink-0 mr-2" width={16} height={16} />
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                                {email}
                            </span>
                        </a>
                    )}
                    {phone && (
                        <a
                            href={`tel:${phone}`}
                            className="default-link flex items-center text-ellipsis overflow-hidden"
                        >
                            <IconPhone className="shrink-0 mr-2" width={16} height={16} />
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                                {phone}
                            </span>
                        </a>
                    )}
                    {mobile && (
                        <a
                            href={`tel:${mobile}`}
                            className="default-link flex items-center text-ellipsis overflow-hidden"
                        >
                            <IconMobile className="shrink-0 mr-2" width={16} height={16} />
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                                {mobile}
                            </span>
                        </a>
                    )}
                    {website && (
                        <a
                            href={`${website}`}
                            className="default-link flex items-center overflow-hidden"
                        >
                            <IconGlobe className="shrink-0 mr-2" width={16} height={16} />
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                                {website.hostname}
                            </span>
                        </a>
                    )}
                    {facebook && (
                        <a
                            href={`https://facebook.com/${twitter}`}
                            className="default-link flex items-center"
                        >
                            <IconFacebook className="shrink-0 mr-2" width={16} height={16} />
                            {`${facebook}`}
                        </a>
                    )}
                    {twitter && (
                        <a
                            href={`https://twitter.com/${twitter}`}
                            className="default-link flex items-center"
                        >
                            <IconTwitter className="shrink-0 mr-2" width={16} height={16} />
                            {`@${twitter}`}
                        </a>
                    )}
                </div>
            )}
            {isSignature && (
                <div className="mt-4 flex flex-col gap-2 overflow-hidden">
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            E. {email}
                        </a>
                    )}
                    {phone && (
                        <a
                            href={`tel:${phone}`}
                            className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            P. {phone}
                        </a>
                    )}
                    {mobile && (
                        <a
                            href={`tel:${mobile}`}
                            className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            M. {mobile}
                        </a>
                    )}
                    {website && (
                        <a
                            href={`${website}`}
                            className="default-link text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            W. {website.hostname}
                        </a>
                    )}
                    <div className="flex gap-4 mt-4">
                        {facebook && (
                            <a href={`https://facebook.com/${twitter}`} className="default-link">
                                <IconFacebook className="mr-2" width={16} height={16} />
                            </a>
                        )}
                        {twitter && (
                            <a href={`https://twitter.com/${twitter}`} className="default-link">
                                <IconTwitter className="mr-2" width={16} height={16} />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactCard;
