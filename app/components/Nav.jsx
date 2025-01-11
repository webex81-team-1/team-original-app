import "./Nav.css";

const Nav = () => {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#">Top</a>
            </li>
            <li className="nav-item">
              <a href="#">Map</a>
            </li>
            <li className="nav-item">
              <a href="#">Books</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
