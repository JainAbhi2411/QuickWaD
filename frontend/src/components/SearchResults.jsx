
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');

  console.log(query);

 

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        // Make an API request to the backend to fetch search results
        const response = await axios.get(`${apiUrl}/api/services/search?q=${query}`, { withCredentials: true });
        setResults(response.data.services); // Save the results from backend into state
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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

  const handleServiceClick = (serviceId) => {
    navigate(`/search/service/${serviceId}`);
  };

  return (
    <section style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '60vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <>
            <div className="loading"><div className="spinner"></div></div>
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
              Searching for "{query}"...
            </p>
          </>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>Search Results</h1>
              <p style={{ fontSize: '18px', color: '#6b7280' }}>Found {results.length} services for "{query}"</p>
              
              {/* Sort options */}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
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
                      fontSize: '14px',
                      color: sortBy === option.value ? '#6366f1' : '#6b7280',
                      cursor: 'pointer'
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
                  <div key={service._id} className="service-card" onClick={() => handleServiceClick(service._id)}>
                    <div className="service-image">
                      {service.category === 'Home Cleaning' && '🏠'}
                      {service.category === 'Home Repairs' && '🔧'}
                      {service.category === 'Beauty & Wellness' && '💆‍♀️'}
                      {service.category === 'Appliance Services' && '📱'}
                      {service.category === 'Pest Control' && '🐛'}
                    </div>
                    <div className="service-content">
                      <div style={{ fontSize: '12px', color: '#6366f1', marginBottom: '8px' }}>{service.category}</div>
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                      <div className="service-price">${service.price}</div>
                      <div className="service-rating">
                        <span>⭐ {service.rating}</span>
                      </div>
                      <button className="btn btn-primary" style={{ width: '100%' }}>View Details</button>
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
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>No Results Found</h3>
                <p style={{ color: '#6b7280' }}>
                  We couldn't find any services matching "{query}". Try adjusting your search terms.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}