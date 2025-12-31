import React, { useState, useEffect } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [emailSettings, setEmailSettings] = useState({
    bookingConfirmations: true,
    paymentReceipts: true,
    travelReminders: true,
    promotions: false,
    newsletter: true
  });

  useEffect(() => {
    // Mock notifications data
    const mockNotifications = [
      { id: 1, type: 'booking', title: 'Booking Confirmed', message: 'Your Paris trip is confirmed for June 15', time: '2 hours ago', read: false, emailSent: true },
      { id: 2, type: 'payment', title: 'Payment Received', message: 'Payment of $1200 received successfully', time: '1 day ago', read: true, emailSent: true },
      { id: 3, type: 'reminder', title: 'Travel Reminder', message: 'Your Tokyo trip is in 30 days', time: '2 days ago', read: false, emailSent: false },
      { id: 4, type: 'promotion', title: 'Special Offer', message: '20% off on Bali packages', time: '3 days ago', read: true, emailSent: true },
      { id: 5, type: 'system', title: 'Profile Updated', message: 'Your profile was updated successfully', time: '1 week ago', read: true, emailSent: true }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const sendTestEmail = (type) => {
    alert(`📧 Test ${type} email sent to your registered email address!`);
  };

  const updateEmailSettings = (key) => {
    setEmailSettings({...emailSettings, [key]: !emailSettings[key]});
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📧 Email Notifications</h5>
              {unreadCount > 0 && (
                <span className="badge bg-warning">{unreadCount} unread</span>
              )}
            </div>
            <div className="card-body">
              <div className="list-group">
                {notifications.map(notif => (
                  <div key={notif.id} className={`list-group-item list-group-item-action ${!notif.read ? 'bg-light' : ''}`}>
                    <div className="d-flex w-100 justify-content-between">
                      <div>
                        <h6 className="mb-1">
                          {!notif.read && <span className="badge bg-danger me-2">NEW</span>}
                          {notif.title}
                        </h6>
                        <p className="mb-1">{notif.message}</p>
                        <small className="text-muted">
                          {notif.emailSent ? '✅ Email sent' : '📤 Email pending'}
                        </small>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">{notif.time}</small>
                        <div className="mt-2">
                          {!notif.read && (
                            <button 
                              className="btn btn-sm btn-outline-success"
                              onClick={() => markAsRead(notif.id)}
                            >
                              Mark as read
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-outline-primary ms-1"
                            onClick={() => sendTestEmail(notif.type)}
                          >
                            Resend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">⚙️ Email Preferences</h6>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={emailSettings.bookingConfirmations}
                  onChange={() => updateEmailSettings('bookingConfirmations')}
                  id="bookings"
                />
                <label className="form-check-label" htmlFor="bookings">
                  Booking confirmations
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={emailSettings.paymentReceipts}
                  onChange={() => updateEmailSettings('paymentReceipts')}
                  id="payments"
                />
                <label className="form-check-label" htmlFor="payments">
                  Payment receipts
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={emailSettings.travelReminders}
                  onChange={() => updateEmailSettings('travelReminders')}
                  id="reminders"
                />
                <label className="form-check-label" htmlFor="reminders">
                  Travel reminders
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={emailSettings.promotions}
                  onChange={() => updateEmailSettings('promotions')}
                  id="promotions"
                />
                <label className="form-check-label" htmlFor="promotions">
                  Promotional offers
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={emailSettings.newsletter}
                  onChange={() => updateEmailSettings('newsletter')}
                  id="newsletter"
                />
                <label className="form-check-label" htmlFor="newsletter">
                  Monthly newsletter
                </label>
              </div>

              <button 
                className="btn btn-primary w-100 mt-3"
                onClick={() => sendTestEmail('test')}
              >
                Send Test Email
              </button>

              <div className="alert alert-info mt-4">
                <small>
                  <strong>ℹ️ Note:</strong><br />
                  • Emails are sent to your registered email address<br />
                  • Allow up to 5 minutes for delivery<br />
                  • Check spam folder if not received
                </small>
              </div>
            </div>
          </div>

          <div className="card shadow mt-4">
            <div className="card-body">
              <h6>📊 Email Statistics</h6>
              <div className="row text-center">
                <div className="col-6">
                  <h4 className="text-primary">24</h4>
                  <small>Emails Sent</small>
                </div>
                <div className="col-6">
                  <h4 className="text-success">22</h4>
                  <small>Delivered</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;