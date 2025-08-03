
import React, { useState, useEffect } from 'react';

export default function ClientReviews() {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      service: 'House Cleaning',
      rating: 5,
      comment: 'Absolutely fantastic service! The cleaning team was professional, thorough, and left my house spotless. They even cleaned areas I forgot to mention. Will definitely book again!',
      image: '👩‍💼',
      location: 'New York, NY',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      service: 'Plumbing Repair',
      rating: 5,
      comment: 'The plumber arrived exactly on time and fixed my leaky faucet within 30 minutes. Great communication throughout the process and fair pricing. Highly recommended!',
      image: '👨‍💻',
      location: 'San Francisco, CA',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      service: 'Beauty Services',
      rating: 5,
      comment: 'Had an amazing facial treatment at home. The beautician was skilled and professional. It felt like a spa experience in the comfort of my own space. Will book monthly!',
      image: '👩‍🎨',
      location: 'Miami, FL',
      date: '3 days ago'
    },
    {
      id: 4,
      name: 'David Thompson',
      service: 'AC Repair',
      rating: 5,
      comment: 'Quick response time and excellent service! My AC was fixed the same day I booked. The technician was knowledgeable and explained everything clearly. Great value for money.',
      image: '👨‍🔧',
      location: 'Austin, TX',
      date: '5 days ago'
    },
    {
      id: 5,
      name: 'Lisa Park',
      service: 'Interior Design',
      rating: 5,
      comment: 'The interior designer transformed my living room completely! Great attention to detail and stayed within budget. The 3D visualization helped me see the final result beforehand.',
      image: '👩‍🎯',
      location: 'Seattle, WA',
      date: '1 week ago'
    },
    {
      id: 6,
      name: 'Robert Wilson',
      service: 'Pest Control',
      rating: 5,
      comment: 'Professional and effective pest control service. They eliminated the ant problem completely and provided great tips for prevention. Very satisfied with the results!',
      image: '👨‍🌾',
      location: 'Phoenix, AZ',
      date: '4 days ago'
    }
  ];

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const stats = [
    { number: '50,000+', label: 'Happy Customers', icon: '😊' },
    { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
    { number: '10,000+', label: 'Services Completed', icon: '✅' },
    { number: '500+', label: 'Verified Professionals', icon: '👥' }
  ];

  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '15px' 
          }}>
            What Our Clients Say
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              background: 'white',
              textAlign: 'center',
              padding: '30px 20px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>
                {stat.icon}
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#6366f1',
                marginBottom: '5px'
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Review */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Quote Icon */}
            <div style={{ 
              fontSize: '48px', 
              color: '#6366f1', 
              opacity: 0.3,
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              "
            </div>

            {/* Review Content */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <p style={{ 
                fontSize: '20px', 
                lineHeight: '1.6', 
                color: '#374151',
                fontStyle: 'italic',
                maxWidth: '800px',
                margin: '0 auto 25px'
              }}>
                {reviews[currentReview].comment}
              </p>
              
              {/* Rating */}
              <div style={{ 
                color: '#fbbf24', 
                fontSize: '24px',
                marginBottom: '20px'
              }}>
                {'⭐'.repeat(reviews[currentReview].rating)}
              </div>

              {/* Customer Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <div style={{ 
                  fontSize: '48px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {reviews[currentReview].image}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700', fontSize: '18px', color: '#1f2937' }}>
                    {reviews[currentReview].name}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {reviews[currentReview].service} • {reviews[currentReview].location}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                    {reviews[currentReview].date}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '10px',
              marginTop: '30px'
            }}>
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: currentReview === index ? '#6366f1' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All Reviews Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '25px' 
        }}>
          {reviews.slice(0, 4).map((review) => (
            <div key={review.id} style={{ 
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.3s ease'
            }}>
              
              {/* Review Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '15px'
              }}>
                <div style={{ fontSize: '32px' }}>
                  {review.image}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#1f2937' }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {review.service}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#9ca3af' }}>
                  {review.date}
                </div>
              </div>

              {/* Rating */}
              <div style={{ 
                color: '#fbbf24', 
                fontSize: '16px',
                marginBottom: '12px'
              }}>
                {'⭐'.repeat(review.rating)}
              </div>

              {/* Comment */}
              <p style={{ 
                color: '#374151', 
                lineHeight: '1.5',
                fontSize: '14px',
                margin: '0'
              }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}>
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
}
