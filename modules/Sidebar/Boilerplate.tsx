import { NewsroomCompanyInformation } from '@prezly/sdk/dist/types';

type Props = {
    companyInformation: NewsroomCompanyInformation;
};

const MOCKED_BOILERPLATE = `
    <p>
        There's a lot of bad news in the world, so we wanted to take a moment to focus on the good things in life, 
        because even in the darkest night there are stars. ✨ 
        <br />
        <br />
        Have a nice story to recommend? Drop us a line!
    </p>
`;

const MOCKED_ADDRESS = '3517 W. Gray St. Utica, Pennsylvania 57867';

const Boilerplate = ({ companyInformation }: Props) => (
    <div className="mb-12">
        <h2 className="text-lg leading-6 mb-4 font-bold text-gray-300">
            About
            {' '}
            {companyInformation.name}
        </h2>

        <div
            className="text-gray-400 leading-7 mb-4"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: companyInformation.about || MOCKED_BOILERPLATE }}
        />

        <address className="text-gray-400 leading-7 not-italic">
            {companyInformation.address || MOCKED_ADDRESS}
        </address>
    </div>
);

export default Boilerplate;
