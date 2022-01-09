import React from 'react';
import styles from './SecondaryMenu.module.css';
import Button from '@components/Button';
import Link from '@components/Link';

export interface SecondaryMenuItemProps {
    label: string;
    path: string;
}

export interface SecondaryMenuProps {
    items: SecondaryMenuItemProps[];
}

const SecondaryMenu = ({ items = []}: SecondaryMenuProps) => {
    const renderItem = ({ label, path }: SecondaryMenuItemProps) => {
        return (
            <div className={styles.item}>
                <Link href={path}>
                    <Button type="primary">{label}</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {items.map(renderItem)}
        </div>
    )
}

export default SecondaryMenu;