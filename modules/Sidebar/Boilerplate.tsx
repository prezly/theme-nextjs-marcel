import type { NewsroomCompanyInformation } from '@prezly/sdk';
import classNames from 'classnames';

import Icon from '@/components/Icon';

import styles from './Boilerplate.module.css';

type Props = {
    companyInformation: NewsroomCompanyInformation;
};

function Boilerplate({ companyInformation }: Props) {
    const { name, about, address, email, phone } = companyInformation;

    if (!about && !address) {
        return null;
    }

    return (
        <div className="mb-12 text-gray-300">
            <h2 className="text-lg leading-6 mb-4 font-semibold">
                About
                {name && ' '}
                {name}
            </h2>
            {about && (
                <div
                    className={classNames('leading-7 mb-4 text-sm', styles.boilerplate)}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: about }}
                />
            )}

            {email && (
                <a className="flex items-center mt-4 mb-4 text-sm" href={`mailto:${email}`}>
                    <Icon name="email" className="w-3.5 h-3.5 mr-2 text-primary" />
                    <span className="text-primary underline">{email}</span>
                </a>
            )}

            {phone && (
                <a className="flex items-center mt-4 mb-4 text-sm" href={`tel:${phone}`}>
                    <Icon name="phone" className="w-3.5 h-3.5 mr-2 text-primary" />
                    <span className="text-primary underline">{phone}</span>
                </a>
            )}

            {address && (
                <address className="leading-7 not-italic text-sm">
                    {companyInformation.address}
                </address>
            )}
        </div>
    );
}

export default Boilerplate;
