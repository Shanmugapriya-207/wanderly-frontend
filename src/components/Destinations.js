import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Destinations() {
  const [search, setSearch] = useState('');

  const destinations = [
    { id: 1, name: 'Paris', country: 'France', price: '₹90,000', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
    { id: 2, name: 'Tokyo', country: 'Japan', price: '₹1,12,000', image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c' },
    { id: 3, name: 'Bali', country: 'Indonesia', price: '₹60,000', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { id: 4, name: 'New York', country: 'USA', price: '₹1,35,000', image: 'https://images.unsplash.com/photo-1549924231-f129b911e442' },
    { id: 5, name: 'London', country: 'UK', price: '₹1,05,000', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' },
    { id: 6, name: 'Dubai', country: 'UAE', price: '₹1,20,000', image: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af' },
    { id: 7, name: 'Rome', country: 'Italy', price: '₹85,000', image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443' },
    { id: 8, name: 'Sydney', country: 'Australia', price: '₹1,25,000', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03' },
    { id: 9, name: 'Singapore', country: 'Singapore', price: '₹95,000', image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac' },
    { id: 10, name: 'Bangkok', country: 'Thailand', price: '₹65,000', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365' },
    { id: 11, name: 'Maldives', country: 'Maldives', price: '₹1,50,000', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21' },
    { id: 12, name: 'Barcelona', country: 'Spain', price: '₹90,000', image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c' },
    { id: 13, name: 'Amsterdam', country: 'Netherlands', price: '₹95,000', image: 'https://images.unsplash.com/photo-1459679749680-18eb1eb37418' },
    { id: 14, name: 'Venice', country: 'Italy', price: '₹92,000', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9' },
    { id: 15, name: 'Prague', country: 'Czech Republic', price: '₹80,000', image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49b' },
    { id: 16, name: 'Zurich', country: 'Switzerland', price: '₹1,15,000', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5' },
    { id: 17, name: 'Vienna', country: 'Austria', price: '₹90,000', image: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646' },
    { id: 18, name: 'Munich', country: 'Germany', price: '₹97,000', image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f' },
    { id: 19, name: 'Berlin', country: 'Germany', price: '₹90,000', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b' },
    { id: 20, name: 'Istanbul', country: 'Turkey', price: '₹75,000', image: 'https://images.unsplash.com/photo-1505739770795-6c8c3c8cdb2d' },
    { id: 21, name: 'Cairo', country: 'Egypt', price: '₹80,000', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' },
    { id: 22, name: 'Cape Town', country: 'South Africa', price: '₹1,05,000', image: 'https://images.unsplash.com/photo-1526481280691-3c8e8bca5a0d' },
    { id: 23, name: 'Rio de Janeiro', country: 'Brazil', price: '₹1,12,000', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { id: 24, name: 'Buenos Aires', country: 'Argentina', price: '₹1,08,000', image: 'https://images.unsplash.com/photo-1526401485004-2aa7f3c14c1c' },
    { id: 25, name: 'Los Angeles', country: 'USA', price: '₹1,20,000', image: 'https://images.unsplash.com/photo-1503264116251-35a269479413' },
    { id: 26, name: 'San Francisco', country: 'USA', price: '₹1,15,000', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29' },
    { id: 27, name: 'Las Vegas', country: 'USA', price: '₹1,08,000', image: 'https://images.unsplash.com/photo-1506045412240-22980140a405' },
    { id: 28, name: 'Toronto', country: 'Canada', price: '₹1,05,000', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365' },
    { id: 29, name: 'Vancouver', country: 'Canada', price: '₹1,10,000', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29' },
    { id: 30, name: 'Seoul', country: 'South Korea', price: '₹95,000', image: 'https://images.unsplash.com/photo-1549893074-0b7b9c1b38f3' },
    { id: 31, name: 'Hong Kong', country: 'China', price: '₹1,00,000', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03' }
  ];

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(search.toLowerCase()) ||
    dest.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Popular Destinations</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search destination or country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredDestinations.map(dest => (
          <div key={dest.id} className="col-md-3 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <img
                src={dest.image}
                alt={dest.name}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{dest.name}</h5>
                <p className="text-muted">{dest.country}</p>
                <span className="badge bg-success mb-3">{dest.price}</span>
                <div className="mt-3 d-grid gap-2">
                  <button className="btn btn-outline-primary btn-sm">
                    View Details
                  </button>
                  <Link to="/booking" className="btn btn-primary btn-sm">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredDestinations.length === 0 && (
          <p className="text-center text-muted">No destinations found</p>
        )}
      </div>
    </div>
  );
}

export default Destinations;
