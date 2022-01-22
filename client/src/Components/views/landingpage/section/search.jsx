import React from "react";
import { useState } from "react";

const SearchFeature = ({ searchFunction }) => {
  const [searchValue, setSearchValue] = useState("");

  const searchhandler = e => {
    setSearchValue(e.currentTarget.value);
    searchFunction(e.currentTarget.value);
  };

  return (
    <input
      placeholder="Search Your Taste"
      onChange={searchhandler}
      style={{
        width: 200,
        fontSize: "16px",
        border: "1px solid #ffc6d0",
        height: "25px",
        paddingLeft: "5px",
        borderRadius: "5px",
        background: "#FFF6FF"
      }}
      value={searchValue}
    />
  );
};

export default SearchFeature;
