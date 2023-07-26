// SearchBar.js
import React from 'react';

const SearchBar = ({ onSearch }) => {
    
  const handleInputChange = (event) => {
    console.log("InputChange")
    console.log(event.target.value, "VAL")
    onSearch(event.target.value);
  };

  return (
    <div className="input-group">
        <input
            type="text"
            className="form-control"
            placeholder="Search by player name"
            //onChange={handleInputChange}
        />
        <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={handleInputChange}>
                Search
            </button>
        </div>
    </div>
  );
};

export default SearchBar;
