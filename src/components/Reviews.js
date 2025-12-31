import React, { useState } from 'react';

function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Sarah M.', destination: 'Paris', rating: 5, comment: 'Amazing experience!', date: '2024-01-15', helpful: 12 },
    { id: 2, user: 'John D.', destination: 'Tokyo', rating: 4, comment: 'Great food and culture', date: '2024-02-10', helpful: 8 },
    { id: 3, user: 'Lisa P.', destination: 'Bali', rating: 5, comment: 'Perfect beach vacation', date: '2024-03-05', helpful: 15 }
  ]);

  const [newReview, setNewReview] = useState({
    destination: '',
    rating: 5,
    comment: '',
    anonymous: false
  });

  const destinations = ['Paris', 'Tokyo', 'Bali', 'New York', 'Switzerland'];

  const submitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: newReview.anonymous ? 'Anonymous' : 'You',
      destination: newReview.destination,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    setReviews([review, ...reviews]);
    setNewReview({ destination: '', rating: 5, comment: '', anonymous: false });
    alert('Review submitted successfully!');
  };

  const markHelpful = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">⭐ Traveler Reviews</h5>
            </div>
            <div className="card-body">
              {reviews.map(review => (
                <div key={review.id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6>{review.user}</h6>
                        <div className="text-warning">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          <span className="ms-2 text-dark">{review.rating}.0</span>
                        </div>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">{review.date}</small>
                        <br />
                        <small className="text-muted">{review.destination}</small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button 
                        className="btn btn-sm btn-outline-success"
                        onClick={() => markHelpful(review.id)}
                      >
                        👍 Helpful ({review.helpful})
                      </button>
                      <small className="text-muted">Report</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">✍️ Write a Review</h6>
            </div>
            <div className="card-body">
              <form onSubmit={submitReview}>
                <div className="mb-3">
                  <label>Destination</label>
                  <select 
                    className="form-select"
                    value={newReview.destination}
                    onChange={(e) => setNewReview({...newReview, destination: e.target.value})}
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label>Rating</label>
                  <div className="d-flex fs-3">
                    {[1,2,3,4,5].map(star => (
                      <span
                        key={star}
                        className={`cursor-pointer ${star <= newReview.rating ? 'text-warning' : 'text-secondary'}`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label>Your Review</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Share your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={newReview.anonymous}
                    onChange={(e) => setNewReview({...newReview, anonymous: e.target.checked})}
                  />
                  <label className="form-check-label">Post anonymously</label>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          <div className="card shadow mt-4">
            <div className="card-body">
              <h6>📊 Review Statistics</h6>
              <div className="text-center">
                <h2 className="text-primary">4.8</h2>
                <div className="text-warning fs-4">★★★★★</div>
                <p className="text-muted">Based on {reviews.length} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;