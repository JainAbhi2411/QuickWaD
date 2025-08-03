
import React, { useState } from 'react';

export default function Reviews({ serviceId, onClose }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const reviews = [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent service! The professional was very thorough and arrived exactly on time. My house has never been cleaner. Will definitely book again!',
      helpful: 24,
      verified: true,
      images: ['🏠', '✨']
    },
    {
      id: 2,
      user: 'John D.',
      rating: 5,
      date: '2024-01-14',
      comment: 'Great value for money. The team was professional and efficient. They even cleaned areas I didn\'t expect. Highly recommended!',
      helpful: 18,
      verified: true,
      images: []
    },
    {
      id: 3,
      user: 'Emily R.',
      rating: 4,
      date: '2024-01-12',
      comment: 'Good service overall. The professional was friendly and did a decent job. Only minor issue was they arrived 15 minutes late.',
      helpful: 12,
      verified: true,
      images: []
    },
    {
      id: 4,
      user: 'Mike W.',
      rating: 5,
      date: '2024-01-10',
      comment: 'Outstanding work! They went above and beyond what I expected. Very professional and courteous. The booking process was also very smooth.',
      helpful: 31,
      verified: true,
      images: ['🧽', '🧹']
    },
    {
      id: 5,
      user: 'Lisa K.',
      rating: 3,
      date: '2024-01-08',
      comment: 'Service was okay. The cleaning was adequate but not exceptional. The professional was nice though and finished in the expected time.',
      helpful: 7,
      verified: false,
      images: []
    }
  ];

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(review => review.rating === parseInt(filter));
  
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Reviews & Ratings</h1>
          <button onClick={onClose} className="btn btn-secondary">← Back</button>
        </div>

        {/* Rating Summary */}
        <div style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Overall Rating */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#059669', marginBottom: '8px' }}>
                {averageRating.toFixed(1)}
              </div>
              <div style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '8px' }}>
                {'⭐'.repeat(Math.round(averageRating))}
              </div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                Based on {reviews.length} reviews
              </div>
            </div>

            {/* Rating Breakdown */}
            <div>
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', width: '20px' }}>{rating}</span>
                  <span style={{ color: '#fbbf24' }}>⭐</span>
                  <div style={{ 
                    flex: 1, 
                    height: '8px', 
                    background: '#e5e7eb', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      background: '#fbbf24',
                      borderRadius: '4px'
                    }} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#6b7280', width: '30px' }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          
          {/* Rating Filter */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>Filter:</span>
            {['all', '5', '4', '3', '2', '1'].map(rating => (
              <button
                key={rating}
                onClick={() => setFilter(rating)}
                style={{
                  padding: '8px 15px',
                  border: filter === rating ? '2px solid #6366f1' : '1px solid #e5e7eb',
                  background: filter === rating ? '#f8faff' : 'white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {rating === 'all' ? 'All' : `${rating} ⭐`}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>Sort by:</span>
            {[
              { value: 'recent', label: 'Most Recent' },
              { value: 'helpful', label: 'Most Helpful' },
              { value: 'rating', label: 'Highest Rating' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                style={{
                  padding: '8px 15px',
                  border: sortBy === option.value ? '2px solid #6366f1' : '1px solid #e5e7eb',
                  background: sortBy === option.value ? '#f8faff' : 'white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {sortedReviews.map(review => (
            <div key={review.id} style={{ 
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              
              {/* Review Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', fontSize: '16px' }}>{review.user}</span>
                    {review.verified && (
                      <span style={{ 
                        background: '#059669', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(review.rating)}</span>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '15px' }}>
                {review.comment}
              </p>

              {/* Review Images */}
              {review.images.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  {review.images.map((image, index) => (
                    <div key={index} style={{ 
                      fontSize: '24px',
                      padding: '10px',
                      background: '#f9fafb',
                      borderRadius: '8px'
                    }}>
                      {image}
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button style={{ 
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  👍 Helpful ({review.helpful})
                </button>
                <button style={{ 
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '16px' }}>
            ✍️ Write a Review
          </button>
        </div>
      </div>
    </section>
  );
}
