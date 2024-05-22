import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ mode }) => {
  const location = useLocation();

  const refreshPage = () => {
    if (location.pathname === '/') {
      window.location.reload();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${mode === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"} sticky-top`}>
      <div className="container">
        <Link className="navbar-brand fs-4" to="/" onClick={refreshPage}>
          <img src="/header.png" alt="header-vtuber" className="navbar-logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
