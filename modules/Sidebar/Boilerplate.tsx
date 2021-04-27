import { NewsroomCompanyInformation } from '@prezly/sdk';

type Props = {
    companyInformation: NewsroomCompanyInformation;
};

const Boilerplate = ({ companyInformation }: Props) => {
    const { name, about, address } = companyInformation;

    if (!about && !address) {
        return null;
    }

    return (
        <div className="mb-12 text-gray-400">
            <h2 className="text-lg leading-6 mb-4 font-bold">
                About
                {name && ' '}
                {name}
            </h2>

            {about && (
                <div
                    className="leading-7 mb-4"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: about }}
                />
            )}

            {address && (
                <address className="leading-7 not-italic">
                    {companyInformation.address}
                </address>
            )}
        </div>
    );
};

export default Boilerplate;
