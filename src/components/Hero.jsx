
import React, { useState } from 'react';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <h1>Your Home Services, On-Demand</h1>
        <p>Book trusted professionals for home cleaning, repairs, beauty services and more</p>
        
        <form className="hero-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="What service do you need today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px' }}>
            ✅ Verified Professionals
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px' }}>
            🛡️ Insured Services
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px' }}>
            ⭐ 4.8+ Rating
          </div>
        </div>
      </div>
    </section>
  );
}
