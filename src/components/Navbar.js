import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user ? user.email : '';

  const [unreadCount] = useState(3);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          🌍 Wanderly
        </Link>

        {/* Hamburger button (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex flex-column flex-lg-row align-items-start align-items-lg-center mt-3 mt-lg-0">

            {isLoggedIn && (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/dashboard" className="btn btn-outline-primary">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/destinations" className="btn btn-outline-success">
                    🌴 Destinations
                  </Link>
                </li>

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/booking" className="btn btn-outline-info">
                    📝 Booking
                  </Link>
                </li>

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/reviews" className="btn btn-outline-warning">
                    ⭐ Reviews
                  </Link>
                </li>

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link
                    to="/notifications"
                    className="btn btn-outline-secondary position-relative"
                  >
                    📧 Notifications
                    {unreadCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/profile" className="btn btn-outline-info">
                    👤 My Profile
                  </Link>
                </li>

                {userEmail === 'admin@wanderly.com' && (
                  <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                    <Link to="/admin" className="btn btn-dark">
                      Admin Panel
                    </Link>
                  </li>
                )}
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/login" className="btn btn-outline-success">
                    Login
                  </Link>
                </li>

                <li className="nav-item mb-2 mb-lg-0">
                  <Link to="/register" className="btn btn-outline-primary">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
