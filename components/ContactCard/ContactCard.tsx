import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';

import Icon from '@/components/Icon';
import { capitalizeFirstLetter } from '@/utils/capitaliseFirstLetter';

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
                    {subtitle && (
                        <h5 className="text-gray-400">{capitalizeFirstLetter(subtitle)}</h5>
                    )}
                </div>
            </div>
            <div className="mt-2 flex items-center flex-wrap">
                {email && (
                    <a href={`mailto:${email}`} className="default-link mr-6 flex items-center">
                        <Icon name="email" className="w-4 h-4 mr-2" />
                        {email}
                    </a>
                )}
                {website && (
                    <a href={`${website}`} className="default-link mr-6 flex items-center">
                        <Icon name="web" className="w-4 h-4 mr-2" />
                        {website}
                    </a>
                )}
                {mobile && (
                    <a href={`tel:${mobile}`} className="default-link mr-6 flex items-center">
                        <Icon name="phone" className="w-4 h-4 mr-2" />
                        {mobile}
                    </a>
                )}
                {phone && (
                    <a href={`tel:${phone}`} className="default-link mr-6 flex items-center">
                        <Icon name="phone" className="w-4 h-4 mr-2" />
                        {phone}
                    </a>
                )}
                {twitter && (
                    <a
                        href={`https://twitter.com/${twitter}`}
                        className="default-link mr-6 flex items-center"
                    >
                        <Icon name="social-twitter" className="w-4 h-4 mr-2" />
                        {`@${twitter}`}
                    </a>
                )}
                {facebook && (
                    <a
                        href={`https://facebook.com/${twitter}`}
                        className="default-link mr-6 flex items-center"
                    >
                        <Icon name="social-facebook" className="w-4 h-4 mr-2" />
                        {`${facebook}`}
                    </a>
                )}
            </div>
        </div>
    );
}

export default ContactCard;
