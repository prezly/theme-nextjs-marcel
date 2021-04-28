import classNames from 'classnames';

type Props = {
    className?: string;
    inlineForm?: boolean;
};

// TODO: get the information to populate this form
const SubscriptionForm = ({ className, inlineForm }: Props) => (
    <form className={classNames('default-well rounded-xl p-6 mb-12', className)}>
        <h3 className="text-lg leading-6 font-bold mb-2 text-gray-200">Subscribe to our newsletter</h3>
        <p className="leading-7 text-gray-400 mb-6">Good news in your inbox weekly. No spam, unsubscribe at anytime.</p>

        <div className={classNames(inlineForm && 'lg:flex')}>
            <div className={inlineForm ? 'flex-grow' : 'mb-4'}>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="elvis@presley.com"
                    className={classNames(
                        'default-input',
                        'w-full bg-white bg-opacity-5',
                    )}
                />
            </div>

            <button
                type="submit"
                className={classNames(
                    'block w-full py-3 px-4 text-center',
                    'border border-transparent shadow-sm rounded-md',
                    'bg-blue-600 hover:bg-blue-500 active:bg-blue-400',
                    'font-semibold leading-6 text-white',
                    'focus:outline-none',
                    inlineForm && 'lg:w-32 lg:ml-4',
                )}
            >
                Subscribe
            </button>
        </div>
    </form>
);

export default SubscriptionForm;
