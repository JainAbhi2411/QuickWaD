
import React, { useState, useEffect } from 'react';

export default function SearchResults({ query, onServiceSelect }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');

  // Mock services data for search
  const allServices = [
    { id: 101, name: 'Deep House Cleaning', price: 120, rating: 4.8, category: 'Home Cleaning', description: 'Complete deep cleaning of your entire home' },
    { id: 102, name: 'Regular House Cleaning', price: 80, rating: 4.7, category: 'Home Cleaning', description: 'Weekly/bi-weekly house cleaning' },
    { id: 201, name: 'Plumbing Repair', price: 90, rating: 4.8, category: 'Home Repairs', description: 'Fix leaks, unclog drains, repair fixtures' },
    { id: 202, name: 'Electrical Work', price: 100, rating: 4.9, category: 'Home Repairs', description: 'Wiring, switches, outlet installation' },
    { id: 301, name: 'Hair Cut & Styling', price: 45, rating: 4.9, category: 'Beauty & Wellness', description: 'Professional haircut and styling at home' },
    { id: 302, name: 'Facial Treatment', price: 80, rating: 4.8, category: 'Beauty & Wellness', description: 'Relaxing facial treatment at your doorstep' },
    { id: 401, name: 'Phone Screen Repair', price: 80, rating: 4.7, category: 'Appliance Services', description: 'Screen replacement for all phone models' },
    { id: 501, name: 'General Pest Control', price: 100, rating: 4.8, category: 'Pest Control', description: 'Complete pest control treatment' }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate search API call
    setTimeout(() => {
      const searchResults = allServices.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
      setLoading(false);
    }, 800);
  }, [query]);

  const sortResults = (results, sortBy) => {
    switch (sortBy) {
      case 'price-low':
        return [...results].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...results].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...results].sort((a, b) => b.rating - a.rating);
      default:
        return results;
    }
  };

  const sortedResults = sortResults(results, sortBy);

  if (loading) {
    return (
      <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="loading">
            <div className="spinner"></div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
            Searching for "{query}"...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '60vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Search Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
            Search Results
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
            Found {results.length} services for "{query}"
          </p>
          
          {/* Sort Options */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '500', color: '#374151' }}>Sort by:</span>
            {[
              { value: 'relevance', label: 'Relevance' },
              { value: 'rating', label: 'Highest Rated' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                style={{
                  padding: '8px 16px',
                  border: sortBy === option.value ? '2px solid #6366f1' : '1px solid #e5e7eb',
                  background: sortBy === option.value ? '#f8faff' : 'white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: sortBy === option.value ? '#6366f1' : '#6b7280'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {sortedResults.length > 0 ? (
          <div className="services-grid">
            {sortedResults.map(service => (
              <div key={service.id} className="service-card" onClick={() => onServiceSelect(service)}>
                <div className="service-image">
                  {/* Service category icon mapping */}
                  {service.category === 'Home Cleaning' && '🏠'}
                  {service.category === 'Home Repairs' && '🔧'}
                  {service.category === 'Beauty & Wellness' && '💆‍♀️'}
                  {service.category === 'Appliance Services' && '📱'}
                  {service.category === 'Pest Control' && '🐛'}
                </div>
                <div className="service-content">
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6366f1', 
                    fontWeight: '500',
                    marginBottom: '8px',
                    textTransform: 'uppercase'
                  }}>
                    {service.category}
                  </div>
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                  <div className="service-price">${service.price}</div>
                  <div className="service-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">({service.rating})</span>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
              No Results Found
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '30px' }}>
              We couldn't find any services matching "{query}". Try adjusting your search terms.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary">
                Browse All Services
              </button>
              <button className="btn btn-primary">
                Get Help
              </button>
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {results.length > 0 && (
          <div style={{ 
            marginTop: '60px',
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Popular Searches
            </h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['house cleaning', 'plumbing', 'electrical', 'beauty', 'pest control', 'appliance repair'].map(term => (
                <button
                  key={term}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e7eb',
                    background: 'white',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#6b7280',
                    textTransform: 'capitalize'
                  }}
                  onClick={() => window.location.reload()} // This would trigger a new search in a real app
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
