import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlane, FaHotel, FaUmbrellaBeach, FaMountain, FaMapMarkedAlt, FaCalendarCheck, FaStar, FaBell, FaUserCircle, FaCreditCard } from 'react-icons/fa';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Quick links to all features
  const quickLinks = [
    { icon: <FaMapMarkedAlt />, label: 'Destinations', path: '/destinations', color: 'primary' },
    { icon: <FaCalendarCheck />, label: 'Booking', path: '/booking', color: 'success' },
    { icon: <FaStar />, label: 'Reviews', path: '/reviews', color: 'warning' },
    { icon: <FaBell />, label: 'Notifications', path: '/notifications', color: 'info' },
    { icon: <FaUserCircle />, label: 'My Profile', path: '/profile', color: 'secondary' },
    { icon: <FaCreditCard />, label: 'Payment', path: '/payment', color: 'danger' }
  ];

  // Popular destinations
  const popularDestinations = [
    { name: 'Paris', country: 'France', price: '$1200', emoji: '🗼' },
    { name: 'Tokyo', country: 'Japan', price: '$1500', emoji: '🌸' },
    { name: 'Bali', country: 'Indonesia', price: '$800', emoji: '🏝️' },
    { name: 'New York', country: 'USA', price: '$1800', emoji: '🗽' }
  ];

  return (
    <div className="container mt-4">
      {/* Welcome Header */}
      <div className="card shadow mb-4">
        <div className="card-body text-center py-4">
          {user && (
            <>
              <h1 className="display-6 gradient-text">Welcome back, {user.name}! 👋</h1>
              <p className="lead text-muted">Ready for your next adventure?</p>
              <p className="text-muted">{user.email}</p>
            </>
          )}
          
          {/* Admin Panel Button */}
          {user?.email === 'admin@wanderly.com' && (
            <Link to="/admin" className="btn btn-dark mt-2">
              ⚙️ Admin Panel
            </Link>
          )}
          
          <button onClick={handleLogout} className="btn btn-outline-danger ms-2">
            Logout
          </button>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3">Quick Access</h4>
          <div className="row">
            {quickLinks.map((link, index) => (
              <div key={index} className="col-md-4 col-lg-2 mb-3">
                <Link to={link.path} className="text-decoration-none">
                  <div className={`card text-center border-${link.color} border-2 hover-shadow`}>
                    <div className="card-body">
                      <div className={`fs-2 text-${link.color} mb-2`}>{link.icon}</div>
                      <h6 className="card-title">{link.label}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left Column - Travel Services */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">✈️ Travel Services</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <FaPlane className="text-primary fs-1 mb-3" />
                      <h5>Flights Booking</h5>
                      <p className="text-muted">Book domestic & international flights</p>
                      <Link to="/booking" className="btn btn-outline-primary btn-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <FaHotel className="text-success fs-1 mb-3" />
                      <h5>Hotels & Stays</h5>
                      <p className="text-muted">Find perfect accommodations</p>
                      <Link to="/destinations" className="btn btn-outline-success btn-sm">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <FaUmbrellaBeach className="text-warning fs-1 mb-3" />
                      <h5>Beach Vacations</h5>
                      <p className="text-muted">Relax at beautiful beach resorts</p>
                      <Link to="/destinations" className="btn btn-outline-warning btn-sm">
                        Find Beaches
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <FaMountain className="text-info fs-1 mb-3" />
                      <h5>Mountain Treks</h5>
                      <p className="text-muted">Adventure in the mountains</p>
                      <Link to="/destinations" className="btn btn-outline-info btn-sm">
                        Explore Mountains
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Popular Destinations */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🌟 Popular Destinations</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
                {popularDestinations.map((dest, index) => (
                  <div key={index} className="list-group-item border-0 mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fs-4 me-2">{dest.emoji}</span>
                        <strong>{dest.name}</strong>
                        <div className="text-muted small">{dest.country}</div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success">{dest.price}</div>
                        <Link to="/booking" className="btn btn-sm btn-outline-success mt-1">
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <Link to="/destinations" className="btn btn-success w-100">
                  View All Destinations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card shadow mt-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">📊 Your Travel Dashboard</h5>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="display-6 text-primary">0</div>
              <div className="text-muted">Upcoming Trips</div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="display-6 text-success">0</div>
              <div className="text-muted">Completed Trips</div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="display-6 text-warning">0</div>
              <div className="text-muted">Reviews Posted</div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="display-6 text-danger">$0</div>
              <div className="text-muted">Total Spent</div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <Link to="/booking" className="btn btn-primary me-2">
              ✈️ Book Your First Trip
            </Link>
            <Link to="/profile" className="btn btn-outline-secondary">
              👤 Complete Your Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;