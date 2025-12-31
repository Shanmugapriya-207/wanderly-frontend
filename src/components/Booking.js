import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Booking() {
  const [booking, setBooking] = useState({
    destination: '',
    travelers: 1,
    date: '',
    package: 'standard'
  });

  const destinations = [
  { value: 'paris', label: 'Paris, France' },
  { value: 'tokyo', label: 'Tokyo, Japan' },
  { value: 'bali', label: 'Bali, Indonesia' },
  { value: 'newyork', label: 'New York, USA' },
  { value: 'london', label: 'London, UK' },
  { value: 'dubai', label: 'Dubai, UAE' },
  { value: 'rome', label: 'Rome, Italy' },
  { value: 'sydney', label: 'Sydney, Australia' },
  { value: 'singapore', label: 'Singapore, Singapore' },
  { value: 'bangkok', label: 'Bangkok, Thailand' },
  { value: 'maldives', label: 'Maldives, Maldives' },
  { value: 'barcelona', label: 'Barcelona, Spain' },
  { value: 'amsterdam', label: 'Amsterdam, Netherlands' },
  { value: 'venice', label: 'Venice, Italy' },
  { value: 'prague', label: 'Prague, Czech Republic' },
  { value: 'zurich', label: 'Zurich, Switzerland' },
  { value: 'vienna', label: 'Vienna, Austria' },
  { value: 'munich', label: 'Munich, Germany' },
  { value: 'berlin', label: 'Berlin, Germany' },
  { value: 'istanbul', label: 'Istanbul, Turkey' },
  { value: 'cairo', label: 'Cairo, Egypt' },
  { value: 'capetown', label: 'Cape Town, South Africa' },
  { value: 'riodejaneiro', label: 'Rio de Janeiro, Brazil' },
  { value: 'buenosaires', label: 'Buenos Aires, Argentina' },
  { value: 'losangeles', label: 'Los Angeles, USA' },
  { value: 'sanfrancisco', label: 'San Francisco, USA' },
  { value: 'lasvegas', label: 'Las Vegas, USA' },
  { value: 'toronto', label: 'Toronto, Canada' },
  { value: 'vancouver', label: 'Vancouver, Canada' },
  { value: 'seoul', label: 'Seoul, South Korea' },
  { value: 'hongkong', label: 'Hong Kong, China' }
];


  const packages = [
    { value: 'standard', label: 'Standard Package', price: 1200 },
    { value: 'premium', label: 'Premium Package', price: 1800 },
    { value: 'luxury', label: 'Luxury Package', price: 2500 }
  ];

  const calculateTotal = () => {
    const selectedPackage = packages.find(p => p.value === booking.package);
    return selectedPackage ? selectedPackage.price * booking.travelers : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Please use "Confirm Booking & Pay" to proceed to payment!');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">✈️ Book Your Dream Trip</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Destination</label>
                    <select
                      className="form-select"
                      value={booking.destination}
                      onChange={(e) => setBooking({ ...booking, destination: e.target.value })}
                      required
                    >
                      <option value="">Choose destination...</option>
                      {destinations.map(dest => (
                        <option key={dest.value} value={dest.value}>
                          {dest.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Number of Travelers</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max="10"
                      value={booking.travelers}
                      onChange={(e) => setBooking({ ...booking, travelers: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Travel Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={booking.date}
                      onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Package</label>
                    <select
                      className="form-select"
                      value={booking.package}
                      onChange={(e) => setBooking({ ...booking, package: e.target.value })}
                      required
                    >
                      {packages.map(pkg => (
                        <option key={pkg.value} value={pkg.value}>
                          {pkg.label} - ${pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="alert alert-info">
                  <h6>Package Details:</h6>
                  <ul className="mb-0">
                    <li><strong>Standard:</strong> Flight + 3-star Hotel</li>
                    <li><strong>Premium:</strong> Flight + 4-star Hotel + Tours</li>
                    <li><strong>Luxury:</strong> Flight + 5-star Hotel + All Inclusive</li>
                  </ul>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <h5>Booking Summary</h5>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-1">Destination:</p>
                        <p className="mb-1">Travelers:</p>
                        <p className="mb-1">Package:</p>
                        <hr />
                        <h6>Total Cost:</h6>
                      </div>
                      <div className="col-6 text-end">
                        <p className="mb-1">{booking.destination ? destinations.find(d => d.value === booking.destination)?.label : '--'}</p>
                        <p className="mb-1">{booking.travelers} person(s)</p>
                        <p className="mb-1">${packages.find(p => p.value === booking.package)?.price || 0}</p>
                        <hr />
                        <h4 className="text-primary">${calculateTotal()}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/destinations" className="btn btn-outline-secondary me-2">
                    ← Browse More
                  </Link>

                  {/* Updated: Link to Payment */}
                  <Link 
                    to="/payment" 
                    state={{
                      destination: booking.destination ? destinations.find(d => d.value === booking.destination)?.label : 'Destination',
                      amount: calculateTotal(),
                      travelers: booking.travelers,
                      date: booking.date
                    }}
                    className="btn btn-success"
                  >
                    Confirm Booking & Pay
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5>📋 Booking Policy</h5>
              <ul>
                <li>Full refund if cancelled 15 days before travel</li>
                <li>50% refund if cancelled 7 days before travel</li>
                <li>24/7 customer support during your trip</li>
                <li>Travel insurance available for $99</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
