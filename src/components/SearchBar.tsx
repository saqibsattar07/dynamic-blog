import React from "react";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchValue, setSearchValue } = props;
  return (
    <input
      placeholder="Search blog posts..."
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
    />
  );
};

export default SearchBar;
