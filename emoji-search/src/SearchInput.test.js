import { render, screen } from '@testing-library/react';
import React from "react";
import ReactDOM from "react-dom";
import { describe } from 'yargs';
import EmojiResults from "./EmojiResults";
import SearchInput from "./SearchInput";


it("search renders without crashing", () => {
  const  handleSearchChange = event => {
        setState({
          filteredEmoji: filterEmoji(event.target.value, 20)
        });
      };
      
        render(   <SearchInput textChange={handleSearchChange} />)
});
