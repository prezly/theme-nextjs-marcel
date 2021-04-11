import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { PressContact } from '@prezly/slate-types';
import { capitalizeFirstLetter } from '@/utils/capitaliseFirstLetter';
import Icon from '../Icon';

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
        twitter,
    } = contact;

    const subtitle = description && company
        ? `${description}, ${company}`
        : description;

    return (
        <div
            className={classNames(
                'bg-gray-700 bg-opacity-40 text-gray-300 rounded-xl p-6',
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
                <h4 className="text-lg text-gray-200 font-bold mb-1">{name}</h4>
                {subtitle && (
                    <h5 className="text-gray-400">{capitalizeFirstLetter(subtitle)}</h5>
                )}

                <div className="mt-6 lg:mt-4 flex flex-col lg:flex-row items-center">
                    {email && (
                        <a href={`mailto:${email}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="email" className="transform scale-75 mr-2" />
                            {email}
                        </a>
                    )}
                    {mobile && (
                        <a href={`tel:${mobile}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="phone" className="transform scale-75 mr-2" />
                            {mobile}
                        </a>
                    )}
                    {phone && (
                        <a href={`tel:${phone}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="phone" className="transform scale-75 mr-2" />
                            {phone}
                        </a>
                    )}
                    {twitter && (
                        <a href={`https://twitter.com/${twitter}`} className="default-link lg:mr-6 flex items-center">
                            <Icon name="social-twitter" className="transform scale-75 mr-2" />
                            {`@${twitter}`}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
