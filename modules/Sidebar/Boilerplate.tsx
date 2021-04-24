import { NewsroomCompanyInformation } from '@prezly/sdk/dist/types';

type Props = {
    companyInformation: NewsroomCompanyInformation;
};

const Boilerplate = ({ companyInformation }: Props) => {
    const { name, about, address } = companyInformation;

    if (!about && !address) {
        return null;
    }

    return (
        <div className="mb-12">
            <h2 className="text-lg leading-6 mb-4 font-bold text-gray-300">
                About
                {name && ' '}
                {name}
            </h2>

            {about && (
                <div
                    className="text-gray-400 leading-7 mb-4"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: about }}
                />
            )}

            {address && (
                <address className="text-gray-400 leading-7 not-italic">
                    {companyInformation.address}
                </address>
            )}
        </div>
    );
};

export default Boilerplate;
