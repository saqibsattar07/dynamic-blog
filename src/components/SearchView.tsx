"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import PostCard from "./PostCard";

interface PostMetadata {
  title: string;
  bio: string;
  slug: string;
  prep_time: string;
  cook_time: string;
}

interface Props {
  postMetadata: PostMetadata[];
}

const SearchView = (props: Props) => {
  const { postMetadata } = props;
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="postsContainer">
        {postMetadata
          .filter((val) =>
            val?.title?.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
      </div>
    </>
  );
};

export default SearchView;
