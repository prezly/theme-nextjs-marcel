import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { PropsWithChildren, ReactChild } from 'react';
import { Fragment } from 'react';

import { IconCaret, type IconComponentType } from '@/icons';
import { Button } from '@/ui';
import { makeComposableComponent } from '@/utils';

import Item from './DropdownItem';

import styles from './Dropdown.module.css';

type Props = {
    icon?: IconComponentType;
    label: ReactChild;
    className?: string;
    menuClassName?: string;
    buttonClassName?: string;
    withMobileDisplay?: boolean;
    hideCaret?: boolean;
};

function Dropdown({
    icon,
    label,
    className,
    menuClassName,
    buttonClassName,
    withMobileDisplay,
    children,
    hideCaret,
}: PropsWithChildren<Props>) {
    return (
        <Menu as="div" className={classNames(styles.container, className)}>
            {({ open }) => (
                <>
                    <Menu.Button as={Fragment}>
                        <Button
                            variation="navigation"
                            icon={icon}
                            className={classNames(styles.dropdownButton, buttonClassName, {
                                [styles.buttonWithMobileDisplay]: withMobileDisplay,
                                [styles.dropdownButtonActive]: open,
                            })}
                        >
                            {label}
                            {!hideCaret && (
                                <IconCaret
                                    width={14}
                                    height={14}
                                    className={classNames(styles.caret, {
                                        [styles.caretOpen]: open,
                                    })}
                                />
                            )}
                        </Button>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter={styles.transition}
                        enterFrom={styles.transitionOpenStart}
                        enterTo={styles.transitionOpenFinish}
                        leave={styles.transition}
                        leaveFrom={styles.transitionOpenFinish}
                        leaveTo={styles.transitionOpenStart}
                    >
                        <Menu.Items
                            as="ul"
                            className={classNames(styles.menu, menuClassName, {
                                [styles.withMobileDisplay]: withMobileDisplay,
                            })}
                        >
                            {children}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}

export default makeComposableComponent(Dropdown, { Item });
