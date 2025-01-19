import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FaBookOpen, FaSearch } from "react-icons/fa";
import "./Header.css";

const Icon = () => {
  const navigate = useNavigate();
  return (
    <FaBookOpen className="headerIcon" onClick={() => navigate("/home")} />
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="本を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
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
