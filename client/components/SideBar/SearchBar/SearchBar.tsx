// components/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.css';
import textStyles from '../../Text/Text.module.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      const chatId = `chat_${Date.now()}`;
      router.push(`/chat?chatId=${chatId}&query=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={styles.searchInput}
        />
       
      </form>
      <div className={textStyles.copyright}>
        Powered by searJ.
      </div>
    </div>
  );
};

export default SearchBar;
