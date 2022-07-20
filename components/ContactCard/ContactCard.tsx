import { IconEmail, IconFacebook, IconGlobe, IconPhone, IconTwitter } from '@prezly/icons';
import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';

import getSocialHandles from './lib/getSocialHandles';

interface Props {
    node: ContactNode;
}

function ContactCard({ node }: Props) {
    const { contact } = node;
    const { avatar_url, name, description, company, email, phone, mobile, website } = contact;

    const { twitter, facebook } = getSocialHandles(contact);

    const subtitle = description && company ? `${description}, ${company}` : description;

    return (
        <div
            className={classNames(
                'text-gray-300 rounded-xl p-6 border-[1px] border-gray-600',
                'my-10',
            )}
        >
            <div className="flex items-center">
                {avatar_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className="block w-14 h-14 rounded mb-6 lg:mb-0 mr-4"
                        src={avatar_url}
                        alt={name}
                    />
                )}
                <div>
                    <h4 className="text-lg text-gray-200 font-semibold mb-1">{name}</h4>
                    {subtitle && <h5 className="text-gray-400">{subtitle}</h5>}
                </div>
            </div>
            <div className="mt-2 flex items-center flex-wrap">
                {email && (
                    <a href={`mailto:${email}`} className="default-link mr-6 flex items-center">
                        <IconEmail className="mr-2" width={16} height={16} />
                        {email}
                    </a>
                )}
                {website && (
                    <a href={`${website}`} className="default-link mr-6 flex items-center">
                        <IconGlobe className="mr-2" width={16} height={16} />
                        {website}
                    </a>
                )}
                {mobile && (
                    <a href={`tel:${mobile}`} className="default-link mr-6 flex items-center">
                        <IconPhone className="mr-2" width={16} height={16} />
                        {mobile}
                    </a>
                )}
                {phone && (
                    <a href={`tel:${phone}`} className="default-link mr-6 flex items-center">
                        <IconPhone className="mr-2" width={16} height={16} />
                        {phone}
                    </a>
                )}
                {twitter && (
                    <a
                        href={`https://twitter.com/${twitter}`}
                        className="default-link mr-6 flex items-center"
                    >
                        <IconTwitter className="mr-2" width={16} height={16} />
                        {`@${twitter}`}
                    </a>
                )}
                {facebook && (
                    <a
                        href={`https://facebook.com/${twitter}`}
                        className="default-link mr-6 flex items-center"
                    >
                        <IconFacebook className="mr-2" width={16} height={16} />
                        {`${facebook}`}
                    </a>
                )}
            </div>
        </div>
    );
}

export default ContactCard;
