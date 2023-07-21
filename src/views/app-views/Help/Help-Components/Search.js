import React from "react";
import "../Help.scss";

const Search = () => {
  return (
    <div className="relative">
      <input
        className="search-input"
        placeholder="What can we help with?"
        type="text"
      />
      <i className="fas fa-search search-input-logo"></i>
    </div>
  );
};

export default Search;
