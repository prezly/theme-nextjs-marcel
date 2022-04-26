import classNames from 'classnames';

interface Props {
    isLoading: boolean;
}

function LoadingBar({ isLoading }: Props) {
    return (
        <div
            className={classNames(
                'fixed top-0 left-0 right-0 h-[0.375rem] bg-gray-600 z-[999] animate-grow',
                isLoading ? 'block' : 'hidden',
            )}
        />
    );
}

export default LoadingBar;
