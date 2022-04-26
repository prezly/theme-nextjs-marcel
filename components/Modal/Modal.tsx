import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    dialogClassName?: string;
    wrapperClassName?: string;
    backdropClassName?: string;
}

// TODO: Add `title` and `buttons` props when they become needed
function Modal({
    id,
    isOpen,
    onClose,
    className,
    dialogClassName,
    wrapperClassName,
    backdropClassName,
    children,
}: PropsWithChildren<Props>) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                id={id}
                className={classNames(
                    'fixed top-0 right-0 bottom-0 left-0 z-10 overflow-y-auto',
                    dialogClassName,
                )}
                onClose={onClose}
            >
                <div
                    className={classNames(
                        'container ml-auto mr-auto min-w-[none] min-h-full text-center',
                        wrapperClassName,
                    )}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-[opacity_0.2s_ease]"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-[opacity_0.2s_ease]"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className={classNames(
                                'fixed top-0 right-0 bottom-0 left-0 bg-modalBg',
                                backdropClassName,
                            )}
                        />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition-[opacity_0.2s_ease,transform_0.2s_ease]"
                        enterFrom="opacity-0 transform-[translateY(-1*2rem)]"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition-[opacity_0.2s_ease,transform_0.2s_ease]"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 transform-[translateY(-1*2rem)]"
                    >
                        <div
                            className={classNames(
                                'shadow-xl rounded inline-block relative mx-2 mt-0 w-[calc(100%-1rem)] sm:w-full sm:max-w-[530px] overflow-hidden text-left bg-gray-700 sm:mt-[25vh]',
                                className,
                            )}
                        >
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;
