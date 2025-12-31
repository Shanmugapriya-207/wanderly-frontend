import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const bookingData = location.state || {
    destination: 'Paris, France',
    amount: 1200,
    travelers: 1,
    date: '2024-06-15'
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Generate receipt
      const receiptId = 'RCPT-' + Date.now().toString().slice(-8);
      alert(`✅ Payment Successful!\nReceipt ID: ${receiptId}\nAmount: $${bookingData.amount}\n\nA confirmation email has been sent.`);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', name: '💳 Credit/Debit Card', icon: 'fa-credit-card' },
    { id: 'upi', name: '📱 UPI Payment', icon: 'fa-mobile-alt' },
    { id: 'netbanking', name: '🏦 Net Banking', icon: 'fa-university' },
    { id: 'wallet', name: '👛 Wallet', icon: 'fa-wallet' }
  ];

  if (success) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow text-center">
              <div className="card-body py-5">
                <div className="display-1 text-success mb-4">✅</div>
                <h3>Payment Successful!</h3>
                <p className="text-muted">Your booking has been confirmed</p>
                
                <div className="card mt-4">
                  <div className="card-body text-start">
                    <h5>Booking Details:</h5>
                    <p><strong>Destination:</strong> {bookingData.destination}</p>
                    <p><strong>Travel Date:</strong> {bookingData.date}</p>
                    <p><strong>Travelers:</strong> {bookingData.travelers}</p>
                    <hr />
                    <h5>Payment Details:</h5>
                    <p><strong>Amount Paid:</strong> ${bookingData.amount}</p>
                    <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
                    <p><strong>Transaction ID:</strong> TXN-{Date.now().toString().slice(-10)}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary me-2" onClick={() => window.print()}>
                    🖨️ Print Receipt
                  </button>
                  <Link to="/dashboard" className="btn btn-success">
                    🏠 Go to Dashboard
                  </Link>
                </div>

                <div className="alert alert-info mt-4">
                  <h6>📧 Next Steps:</h6>
                  <ul className="mb-0 text-start">
                    <li>Confirmation email sent to your registered email</li>
                    <li>Travel documents will be available 7 days before travel</li>
                    <li>24/7 support: support@wanderly.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">💳 Complete Your Payment</h4>
            </div>
            
            <div className="card-body">
              <div className="row">
                {/* Order Summary */}
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h6>Order Summary</h6>
                    </div>
                    <div className="card-body">
                      <p><strong>Destination:</strong> {bookingData.destination}</p>
                      <p><strong>Travel Date:</strong> {bookingData.date}</p>
                      <p><strong>Travelers:</strong> {bookingData.travelers} person(s)</p>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <h5>Total Amount:</h5>
                        <h4 className="text-success">${bookingData.amount}</h4>
                      </div>
                      
                      <div className="alert alert-warning mt-3">
                        <small>
                          <strong>🛡️ Secure Payment:</strong><br />
                          • SSL encrypted<br />
                          • No card details stored<br />
                          • 100% secure checkout
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3">
                    <div className="card-body">
                      <h6>Supported Cards:</h6>
                      <div className="d-flex justify-content-between fs-4">
                        <span>💳</span>
                        <span>🔵</span>
                        <span>🟡</span>
                        <span>🟢</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="col-md-7">
                  <form onSubmit={handlePayment}>
                    <div className="mb-4">
                      <label className="form-label"><strong>Select Payment Method</strong></label>
                      <div className="row">
                        {paymentMethods.map(method => (
                          <div key={method.id} className="col-6 mb-2">
                            <div 
                              className={`card payment-method ${paymentMethod === method.id ? 'border-primary' : ''}`}
                              onClick={() => setPaymentMethod(method.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="card-body text-center py-2">
                                <div className="fs-4">{method.name.split(' ')[0]}</div>
                                <small>{method.name.split(' ').slice(1).join(' ')}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div>
                        <div className="mb-3">
                          <label>Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                            maxLength="19"
                            required
                          />
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>CVV</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                              maxLength="3"
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="mb-3">
                        <label>UPI ID</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="username@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                        <small className="text-muted">e.g., john.doe@oksbi, 9876543210@ybl</small>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="mb-3">
                        <label>Select Bank</label>
                        <select className="form-select" required>
                          <option value="">Choose your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                        </select>
                      </div>
                    )}

                    <div className="form-check mb-4">
                      <input type="checkbox" className="form-check-input" id="terms" required />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#policy">Cancellation Policy</a>
                      </label>
                    </div>

                    <div className="d-grid">
                      <button 
                        type="submit" 
                        className="btn btn-success btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing Payment...
                          </>
                        ) : (
                          `Pay $${bookingData.amount} Now`
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <Link to="/booking" className="text-decoration-none">
                        ← Back to Booking
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h6>🔒 Payment Security</h6>
              <div className="row text-center">
                <div className="col-3">
                  <div className="fs-4">🛡️</div>
                  <small>SSL Secured</small>
                </div>
                <div className="col-3">
                  <div className="fs-4">🔐</div>
                  <small>PCI DSS</small>
                </div>
                <div className="col-3">
                  <div className="fs-4">💰</div>
                  <small>100% Refund</small>
                </div>
                <div className="col-3">
                  <div className="fs-4">📞</div>
                  <small>24/7 Support</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;