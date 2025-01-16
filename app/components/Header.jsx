import { useState } from "react";
import { FaBookOpen, FaSearch } from "react-icons/fa";
import "./Header.css";

const Icon = () => {
  return <FaBookOpen className="icon" />;
};

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="本を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>
          <span>
            <FaSearch />
          </span>
        </button>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Icon></Icon>
        <Search></Search>
      </div>
    </header>
  );
};

export default Header;
