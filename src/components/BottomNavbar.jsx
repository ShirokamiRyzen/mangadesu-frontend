import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavbar = ({ mode, setMode }) => {
  const location = useLocation();

  useEffect(() => {
    // Restore the scroll position if it exists
    const savedPosition = sessionStorage.getItem(`scrollPosition-${location.pathname}`);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }

    // Event listener to clear sessionStorage when the user leaves the web
    const clearScrollPositions = () => {
      sessionStorage.clear();
    };
    window.addEventListener('beforeunload', clearScrollPositions);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', clearScrollPositions);
    };
  }, [location.pathname]);

  const saveScrollPosition = () => {
    sessionStorage.setItem(`scrollPosition-${location.pathname}`, window.scrollY);
  };

  const handleClick = (path) => {
    if (location.pathname !== path) {
      saveScrollPosition();
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <nav className={`navbar fixed-bottom ${mode === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"}`}>
      <div className="container d-flex justify-content-center">
        <ul className="nav">
          <li className="nav-item">
            <Link
              className={`nav-link d-flex flex-column align-items-center clickAnimation ${location.pathname === '/' ? 'active' : ''}`}
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.location.reload();
                } else {
                  handleClick('/');
                }
              }}
            >
              <i className="fas fa-home"></i>
              <span>Beranda</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex flex-column align-items-center clickAnimation ${location.pathname === '/history' ? 'active' : ''}`}
              to="/history"
              onClick={() => handleClick('/history')}
            >
              <i className="fas fa-history"></i>
              <span>History</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavbar;
