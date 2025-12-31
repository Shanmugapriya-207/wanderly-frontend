import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0
  });

  // Mock data initialization
  useEffect(() => {
    // Mock users data
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', joined: '2024-01-15', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', joined: '2024-02-20', status: 'active' },
      { id: 3, name: 'Admin User', email: 'admin@wanderly.com', role: 'admin', joined: '2024-01-01', status: 'active' },
      { id: 4, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', joined: '2024-03-10', status: 'inactive' }
    ];

    // Mock bookings data
    const mockBookings = [
      { id: 'WLY-1001', user: 'John Doe', destination: 'Paris', date: '2024-06-15', status: 'confirmed', amount: 1200 },
      { id: 'WLY-1002', user: 'Jane Smith', destination: 'Tokyo', date: '2024-07-20', status: 'pending', amount: 1500 },
      { id: 'WLY-1003', user: 'Bob Wilson', destination: 'Bali', date: '2024-05-10', status: 'completed', amount: 800 },
      { id: 'WLY-1004', user: 'Alice Brown', destination: 'New York', date: '2024-08-05', status: 'cancelled', amount: 1800 }
    ];

    // Mock destinations data
    const mockDestinations = [
      { id: 1, name: 'Paris', country: 'France', price: 1200, status: 'active', bookings: 45 },
      { id: 2, name: 'Tokyo', country: 'Japan', price: 1500, status: 'active', bookings: 32 },
      { id: 3, name: 'Bali', country: 'Indonesia', price: 800, status: 'active', bookings: 67 },
      { id: 4, name: 'New York', country: 'USA', price: 1800, status: 'inactive', bookings: 23 }
    ];

    // Calculate stats
    const totalRevenue = mockBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, booking) => sum + booking.amount, 0);

    const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;

    setUsers(mockUsers);
    setBookings(mockBookings);
    setDestinations(mockDestinations);
    setStats({
      totalUsers: mockUsers.length,
      totalBookings: mockBookings.length,
      totalRevenue: totalRevenue,
      pendingBookings: pendingBookings
    });
  }, []);

  const handleUserAction = (userId, action) => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully!');
      }
    } else if (action === 'toggle') {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      ));
    }
  };

  const handleBookingAction = (bookingId, action) => {
    if (action === 'confirm') {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
      ));
      alert(`Booking ${bookingId} confirmed!`);
    } else if (action === 'cancel') {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
      alert(`Booking ${bookingId} cancelled!`);
    }
  };

  const handleDestinationAction = (destId, action) => {
    if (action === 'toggle') {
      setDestinations(destinations.map(dest =>
        dest.id === destId 
          ? { ...dest, status: dest.status === 'active' ? 'inactive' : 'active' }
          : dest
      ));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h4>📊 Admin Dashboard</h4>
            <div className="row mt-4">
              <div className="col-md-3 mb-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h5>Total Users</h5>
                    <h2>{stats.totalUsers}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h5>Total Bookings</h5>
                    <h2>{stats.totalBookings}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <h5>Pending Bookings</h5>
                    <h2>{stats.pendingBookings}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <h5>Total Revenue</h5>
                    <h2>${stats.totalRevenue}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5>Recent Activity</h5>
                <ul className="list-group">
                  <li className="list-group-item">✅ New booking from John Doe - Paris ($1200)</li>
                  <li className="list-group-item">👤 New user registration - Alice Brown</li>
                  <li className="list-group-item">⚠️ Booking WLY-1002 pending approval</li>
                  <li className="list-group-item">💰 Payment received for booking WLY-1001</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>👥 User Management</h4>
              <button className="btn btn-primary">+ Add New User</button>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><span className="badge bg-secondary">{user.role}</span></td>
                    <td>{user.joined}</td>
                    <td>
                      <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button 
                        className="btn btn-sm btn-outline-warning me-1"
                        onClick={() => handleUserAction(user.id, 'toggle')}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleUserAction(user.id, 'delete')}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'bookings':
        return (
          <div>
            <h4>📋 Booking Management</h4>
            <table className="table table-hover mt-3">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td><strong>{booking.id}</strong></td>
                    <td>{booking.user}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.date}</td>
                    <td>${booking.amount}</td>
                    <td>
                      <span className={`badge ${
                        booking.status === 'confirmed' ? 'bg-success' :
                        booking.status === 'pending' ? 'bg-warning' :
                        booking.status === 'completed' ? 'bg-info' : 'bg-danger'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            className="btn btn-sm btn-success me-1"
                            onClick={() => handleBookingAction(booking.id, 'confirm')}
                          >
                            Confirm
                          </button>
                          <button 
                            className="btn btn-sm btn-danger me-1"
                            onClick={() => handleBookingAction(booking.id, 'cancel')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="btn btn-sm btn-outline-primary">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'destinations':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>🌍 Destination Management</h4>
              <button className="btn btn-primary">+ Add Destination</button>
            </div>
            <div className="row">
              {destinations.map(dest => (
                <div key={dest.id} className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>{dest.name}</h5>
                          <p className="text-muted">{dest.country}</p>
                        </div>
                        <span className={`badge ${dest.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                          {dest.status}
                        </span>
                      </div>
                      <p><strong>Price:</strong> ${dest.price}</p>
                      <p><strong>Bookings:</strong> {dest.bookings}</p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-outline-primary">Edit</button>
                        <button 
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => handleDestinationAction(dest.id, 'toggle')}
                        >
                          {dest.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">⚙️ Admin Panel</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  📊 Dashboard
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  👥 User Management
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  📋 Booking Management
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'destinations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('destinations')}
                >
                  🌍 Destination Management
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'reports' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reports')}
                >
                  📈 Reports
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  ⚙️ Settings
                </button>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/dashboard" className="btn btn-outline-secondary w-100">
                ← Back to User View
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;