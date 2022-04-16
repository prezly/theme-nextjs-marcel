import classNames from 'classnames';

import Layout from '@/modules/Layout';

interface Props {
    title: string;
    description?: string;
    statusCode?: number;
    action: () => void;
    actionTitle: string;
}

function Error({ action, actionTitle, title, description, statusCode }: Props) {
    return (
        <Layout>
            <div className="flex items-center justify-center w-full flex-col h-screen">
                <h2 className="text-5xl md:text-7xl lg:text-9xl">{statusCode}</h2>
                <p className="text-2xl md:text-3xl lg:text-5xl mb-6 font-bold">{title}</p>
                <p className="text-xl md:text-2xl lg:text-3xl mb-3 font-light">{description}</p>
                <button
                    className={classNames(
                        'block w-64 py-3 px-4 text-center mt-12',
                        'border border-transparent shadow-sm rounded-md',
                        'bg-blue-600 hover:bg-blue-500 active:bg-blue-400',
                        'font-medium leading-6 text-white',
                        'focus:outline-none',
                    )}
                    onClick={action}
                >
                    {actionTitle}
                </button>
            </div>
        </Layout>
    );
}

export default Error;
