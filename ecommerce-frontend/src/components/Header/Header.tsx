import React from 'react';
import styles from './Header.module.css';
import SearchBar from '@components/SearchBar';

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
    return (
        <header className={styles.header}>
            <SearchBar />
        </header>
    )
}

export default Header;