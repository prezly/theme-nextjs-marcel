import { NewsroomCompanyInformation } from '@prezly/sdk';
import classNames from 'classnames';

type Props = {
    companyInformation: NewsroomCompanyInformation;
    className?: string;
};

// TODO: get the information to populate this form
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SubscriptionForm = ({ companyInformation, className }: Props) => (
    <form className={classNames('bg-gray-700 bg-opacity-40 rounded-xl p-6 mb-12', className)}>
        <h3 className="text-lg leading-6 font-bold mb-2 text-gray-200">Subscribe to our newsletter</h3>
        <p className="leading-7 text-gray-400 mb-6">Good news in your inbox weekly. No spam, unsubscribe at anytime.</p>

        <div className="mb-4">
            <label htmlFor="email" className="sr-only">Your Email</label>
            <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="elvis@presley.com"
                className={classNames(
                    'block w-full py-2.5 px-3 rounded-md',
                    'bg-gray-700 border border-gray-600',
                    'leading-7',
                    'focus:outline-none focus:ring focus:ring-blue-300',
                )}
            />
        </div>

        <button
            type="submit"
            className={classNames(
                'block w-full py-3 px-4 text-center',
                'border border-transparent shadow-sm rounded-md',
                'bg-blue-500 hover:bg-blue-600 active:bg-blue-400',
                'font-semibold leading-6 text-white',
                'focus:outline-none',
            )}
        >
            Subscribe
        </button>
    </form>
);

export default SubscriptionForm;
