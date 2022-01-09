import React from 'react';
import styles from './Layout.module.css';
import Header from '@components/Header';
import Menu from '@components/Menu';

export interface LayoutProps {
    children: React.ReactNode;
}

const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Mis compras', path: '/purchases' },
    { label: 'Carrito', path: '/cart' },
];

const Layout = ({ children }: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const onClickMenuButton = React.useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);
    const menuStateClass = isMenuOpen ? styles.menuOpen : '';

    return (
        <div className={`${styles.container} ${menuStateClass}`}>
            <div className={styles.menuContainer}>
                <Menu items={menuItems} />
            </div>
            <div className={styles.contentContainer}>
                <Header onClickMenuButton={onClickMenuButton} isMenuOpen={isMenuOpen} />
                {children}
            </div>
        </div>
    )
}

export default Layout;