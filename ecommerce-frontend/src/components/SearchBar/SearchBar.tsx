import React from 'react';
import styles from './SearchBar.module.css';
import { MdSearch } from "react-icons/md";

export interface SearchBarProps {
    onSearch?: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchBar = ({ onSearch = () => {}, placeholder, className }: SearchBarProps) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const inputPlaceholder = isFocused ? '' : placeholder;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.innerContainer}>
                <MdSearch className={styles.icon} width={"20px"} />
                <input
                    className={styles.input}
                    type="text"
                    placeholder={inputPlaceholder}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
}

export default SearchBar;