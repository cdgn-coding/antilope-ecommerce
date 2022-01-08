import React from 'react';
import styles from './Header.module.css';
import SearchBar from '@components/SearchBar';
import { MdMenu } from 'react-icons/md';

export interface HeaderProps {
    searchPlaceholder?: string;
    onSearch?: (searchTerm: string) => void;
    onClickMenuButton?: () => void;
}

const Header = (props: HeaderProps) => {
    return (
        <header className={styles.container}>
            <div className={styles.innerContainer}>
                <button
                    className={styles.menuButton}
                    onClick={props.onClickMenuButton}
                >
                    <MdMenu className={styles.iconMenu} />
                </button>
                <span className={styles.logo}>Antílope</span>
                <SearchBar
                    placeholder={props.searchPlaceholder}
                    onSearch={props.onSearch}
                    className={styles.searchBar}
                />
            </div>
        </header>
    )
}

export default Header;