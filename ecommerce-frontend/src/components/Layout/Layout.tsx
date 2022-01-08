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
]

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.container}>
            <Menu items={menuItems} />
            <div className="innerContainer">
                <Header />
                {children}
            </div>
        </div>
    )
}

export default Layout;