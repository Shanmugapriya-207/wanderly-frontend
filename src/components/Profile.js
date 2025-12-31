import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || ''
      });
    }

    // Mock bookings data
    const mockBookings = [
      { id: 'WLY-1001', destination: 'Paris, France', date: '2024-06-15', status: 'Confirmed', amount: '$1200' },
      { id: 'WLY-1002', destination: 'Tokyo, Japan', date: '2024-07-20', status: 'Pending', amount: '$1500' },
      { id: 'WLY-1003', destination: 'Bali, Indonesia', date: '2024-05-10', status: 'Completed', amount: '$800' }
    ];
    setBookings(mockBookings);
  }, []);

  const handleSave = () => {
    // Update user in localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      alert(`Booking ${bookingId} cancelled successfully!`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column - Profile Info */}
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">👤 User Profile</h5>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center" 
                     style={{ width: '100px', height: '100px', fontSize: '40px' }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
              
              {editMode ? (
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows="2"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button onClick={handleSave} className="btn btn-success">Save Changes</button>
                    <button onClick={() => setEditMode(false)} className="btn btn-outline-secondary">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4>{user?.name || 'User Name'}</h4>
                  <p className="text-muted">{user?.email || 'user@example.com'}</p>
                  
                  <div className="text-start mt-4">
                    <p><strong>📱 Phone:</strong> {user?.phone || 'Not provided'}</p>
                    <p><strong>🏠 Address:</strong> {user?.address || 'Not provided'}</p>
                    <p><strong>🎯 Member Since:</strong> March 2024</p>
                    <p><strong>⭐ Status:</strong> <span className="badge bg-success">Active Member</span></p>
                  </div>
                  
                  <button onClick={() => setEditMode(true)} className="btn btn-primary mt-3 w-100">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card shadow mt-4">
            <div className="card-body">
              <h6>📊 Travel Stats</h6>
              <div className="row text-center">
                <div className="col-6">
                  <h4 className="text-primary">{bookings.length}</h4>
                  <small>Total Bookings</small>
                </div>
                <div className="col-6">
                  <h4 className="text-success">{bookings.filter(b => b.status === 'Completed').length}</h4>
                  <small>Trips Taken</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Bookings */}
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📅 My Bookings</h5>
              <Link to="/booking" className="btn btn-light btn-sm">
                + New Booking
              </Link>
            </div>
            <div className="card-body">
              {bookings.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No bookings yet</h5>
                  <p className="text-muted">Start your journey by booking a trip!</p>
                  <Link to="/destinations" className="btn btn-primary">
                    Browse Destinations
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id}>
                          <td><strong>{booking.id}</strong></td>
                          <td>{booking.destination}</td>
                          <td>{booking.date}</td>
                          <td>
                            <span className={`badge ${
                              booking.status === 'Confirmed' ? 'bg-success' :
                              booking.status === 'Pending' ? 'bg-warning' : 'bg-secondary'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td><strong>{booking.amount}</strong></td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              View
                            </button>
                            {booking.status !== 'Completed' && (
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="card shadow mt-4">
            <div className="card-body">
              <h6>💳 Payment Methods</h6>
              <div className="alert alert-warning">
                <p className="mb-0">No payment methods added yet.</p>
                <button className="btn btn-sm btn-primary mt-2">Add Payment Method</button>
              </div>
            </div>
          </div>

          <div className="card shadow mt-4">
            <div className="card-body">
              <h6>🎁 Loyalty Rewards</h6>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <div className="display-4">🏆</div>
                </div>
                <div>
                  <h5>Explorer Tier</h5>
                  <p className="mb-0">You have 250 points. Earn 750 more for Gold tier!</p>
                  <div className="progress mt-2" style={{ height: '10px' }}>
                    <div className="progress-bar" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;