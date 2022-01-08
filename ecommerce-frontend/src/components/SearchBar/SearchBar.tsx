import React from 'react';
import styles from './SearchBar.module.css';
import { MdSearch } from "react-icons/md";

export interface SearchBarProps {
    onSearch?: (searchTerm: string) => void;
    placeholder?: string;
}

const SearchBar = ({ onSearch = () => {}, placeholder }: SearchBarProps) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputPlaceholder = isFocused ? '' : placeholder;
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <MdSearch className={styles.icon} width={"20px"} />
                <input
                    className={styles.input}
                    type="text"
                    placeholder={inputPlaceholder}
                    onChange={onChangeInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
}

export default SearchBar;