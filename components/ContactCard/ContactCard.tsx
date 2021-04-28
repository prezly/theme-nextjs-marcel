import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { PressContact } from '@prezly/slate-types';

import { capitalizeFirstLetter } from '@/utils/capitaliseFirstLetter';
import Icon from '@/components/Icon';
import getSocialHandles from './lib/getSocialHandles';

interface Props {
    contact: PressContact;
}

const ContactCard: FunctionComponent<Props> = ({ contact }) => {
    const {
        avatar_url,
        name,
        description,
        company,
        email,
        phone,
        mobile,
        website,
    } = contact;

    const { twitter, facebook } = getSocialHandles(contact);

    const subtitle = description && company
        ? `${description}, ${company}`
        : description;

    return (
        <div
            className={classNames(
                'default-well text-gray-300 rounded-xl p-6',
                'flex flex-col lg:flex-row items-center my-10',
            )}
        >
            {avatar_url && (
                <img
                    className="block w-20 h-20 rounded-full mb-6 lg:mb-0 lg:mr-8"
                    src={avatar_url}
                    alt={name}
                />
            )}
            <div>
                <h4 className="text-lg text-gray-200 font-semibold mb-1">{name}</h4>
                {subtitle && (
                    <h5 className="text-gray-400">{capitalizeFirstLetter(subtitle)}</h5>
                )}

                <div className="mt-6 lg:mt-4 flex flex-col lg:flex-row items-center">
                    {email && (
                        <a href={`mailto:${email}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="email" className="w-4 h-4 mr-2" />
                            {email}
                        </a>
                    )}
                    {website && (
                        <a href={`${website}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="web" className="w-4 h-4 mr-2" />
                            {website}
                        </a>
                    )}
                    {mobile && (
                        <a href={`tel:${mobile}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="phone" className="w-4 h-4 mr-2" />
                            {mobile}
                        </a>
                    )}
                    {phone && (
                        <a href={`tel:${phone}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="phone" className="w-4 h-4 mr-2" />
                            {phone}
                        </a>
                    )}
                    {twitter && (
                        <a href={`https://twitter.com/${twitter}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="social-twitter" className="w-4 h-4 mr-2" />
                            {`@${twitter}`}
                        </a>
                    )}
                    {facebook && (
                        <a href={`https://facebook.com/${twitter}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="social-facebook" className="w-4 h-4 mr-2" />
                            {`${facebook}`}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
