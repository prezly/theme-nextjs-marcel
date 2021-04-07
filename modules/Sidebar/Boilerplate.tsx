import { Newsroom } from '@prezly/sdk/dist/types';

type Props = {
    newsroom: Newsroom;
};

// TODO: Find a way to fetch the boilerplate
const MOCKED_BOILERPLATE = (
    <>
        There&apos;s a lot of bad news in the world, so we wanted to take a moment to focus on the good things in life,
        {' '}
        because even in the darkest night there are stars.
        <br />
        <br />
        Have a nice story to recommend? Drop us a line!
    </>
);

const MOCKED_ADDRESS = '3517 W. Gray St. Utica, Pennsylvania 57867';

const Boilerplate = ({ newsroom }: Props) => (
    <div className="mb-12">
        <h2 className="text-lg leading-6 mb-4 font-bold text-gray-300">
            About
            {' '}
            {newsroom.display_name}
        </h2>

        <p className="text-gray-400 leading-7 mb-4">
            {MOCKED_BOILERPLATE}
        </p>

        <address className="text-gray-400 leading-7 not-italic">
            {MOCKED_ADDRESS}
        </address>
    </div>
);

export default Boilerplate;
