import React from 'react';
import styles from './Layout.module.css';
import Header from '@components/Header';
import Menu from '@components/Menu';
import SecondaryMenu from '@components/SecondaryMenu';
import Spinner from '@components/Spinner';

export interface LayoutProps {
    useCategoriesBar?: boolean;
    children: React.ReactNode;
    withSecondaryMenu?: boolean;
    onSearch?: (searchTerm: string) => void;
    loading?: boolean;
}

const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Mis compras', path: '/purchases' },
    { label: 'Carrito', path: '/cart' },
];

const secondaryMenuItems = [
    { label: 'Todos', path: '/' },
    { label: 'Línea blanca', path: '/?category=WHITE' },
    { label: 'Línea marrón', path: '/?category=BROWN' },
    { label: 'Línea gris', path: '/?category=GRAY' },
    { label: 'Pequeños electrodomésticos', path: '/?category=SMALL_APPS' },
]

const Layout = ({ children, withSecondaryMenu, loading, onSearch }: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const onClickMenuButton = React.useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);
    const menuStateClass = isMenuOpen ? styles.menuOpen : '';

    return (
        <div className={`${styles.container} ${menuStateClass}`}>
            <div className={styles.menuContainer}>
                <Menu items={menuItems} />
            </div>
            <div className={styles.contentContainer}>
                <Header
                    onClickMenuButton={onClickMenuButton}
                    isMenuOpen={isMenuOpen}
                    searchPlaceholder="Buscar producto"
                    onSearch={onSearch}
                />
                {withSecondaryMenu && <SecondaryMenu items={secondaryMenuItems} />}
                {!loading && children}
                {loading && <div className={styles.layoutSpinner}><Spinner /></div>}
            </div>
        </div>
    )
}

export default Layout;