
import React, { useState } from 'react';

const serviceCategories = [
  {
    id: 1,
    name: 'Home Cleaning',
    icon: '🏠',
    description: 'Professional home cleaning services',
    serviceCount: 12,
    services: [
      { id: 101, name: 'Deep House Cleaning', price: 120, rating: 4.8, duration: '3-4 hours', description: 'Complete deep cleaning of your entire home' },
      { id: 102, name: 'Regular House Cleaning', price: 80, rating: 4.7, duration: '2-3 hours', description: 'Weekly/bi-weekly house cleaning' },
      { id: 103, name: 'Kitchen Deep Clean', price: 60, rating: 4.9, duration: '2 hours', description: 'Thorough kitchen cleaning including appliances' },
      { id: 104, name: 'Bathroom Deep Clean', price: 45, rating: 4.8, duration: '1.5 hours', description: 'Complete bathroom sanitization' },
      { id: 105, name: 'Carpet Cleaning', price: 80, rating: 4.6, duration: '2 hours', description: 'Professional carpet steam cleaning' },
      { id: 106, name: 'Window Cleaning', price: 40, rating: 4.7, duration: '1 hour', description: 'Interior and exterior window cleaning' }
    ]
  },
  {
    id: 2,
    name: 'Home Repairs',
    icon: '🔧',
    description: 'Expert repair and maintenance services',
    serviceCount: 15,
    services: [
      { id: 201, name: 'Plumbing Repair', price: 90, rating: 4.8, duration: '1-2 hours', description: 'Fix leaks, unclog drains, repair fixtures' },
      { id: 202, name: 'Electrical Work', price: 100, rating: 4.9, duration: '1-3 hours', description: 'Wiring, switches, outlet installation' },
      { id: 203, name: 'AC Service & Repair', price: 120, rating: 4.7, duration: '2-3 hours', description: 'AC maintenance and repair services' },
      { id: 204, name: 'Appliance Repair', price: 85, rating: 4.6, duration: '1-2 hours', description: 'Repair washing machines, refrigerators, etc.' },
      { id: 205, name: 'Painting Services', price: 200, rating: 4.8, duration: '4-6 hours', description: 'Interior and exterior painting' },
      { id: 206, name: 'Furniture Assembly', price: 50, rating: 4.7, duration: '1-2 hours', description: 'Assembly of furniture and fixtures' }
    ]
  },
  {
    id: 3,
    name: 'Beauty & Wellness',
    icon: '💆‍♀️',
    description: 'Professional beauty and wellness services',
    serviceCount: 18,
    services: [
      { id: 301, name: 'Hair Cut & Styling', price: 45, rating: 4.9, duration: '1 hour', description: 'Professional haircut and styling at home' },
      { id: 302, name: 'Facial Treatment', price: 80, rating: 4.8, duration: '1.5 hours', description: 'Relaxing facial treatment at your doorstep' },
      { id: 303, name: 'Massage Therapy', price: 100, rating: 4.9, duration: '1 hour', description: 'Therapeutic full body massage' },
      { id: 304, name: 'Manicure & Pedicure', price: 55, rating: 4.7, duration: '1.5 hours', description: 'Professional nail care services' },
      { id: 305, name: 'Makeup Services', price: 75, rating: 4.8, duration: '1 hour', description: 'Professional makeup for events' },
      { id: 306, name: 'Eyebrow Threading', price: 25, rating: 4.6, duration: '30 minutes', description: 'Precise eyebrow shaping' }
    ]
  },
  {
    id: 4,
    name: 'Appliance Services',
    icon: '📱',
    description: 'Device repair and maintenance',
    serviceCount: 10,
    services: [
      { id: 401, name: 'Phone Screen Repair', price: 80, rating: 4.7, duration: '1 hour', description: 'Screen replacement for all phone models' },
      { id: 402, name: 'Laptop Repair', price: 120, rating: 4.8, duration: '2-3 hours', description: 'Hardware and software laptop repairs' },
      { id: 403, name: 'TV Wall Mounting', price: 60, rating: 4.9, duration: '1 hour', description: 'Professional TV mounting service' },
      { id: 404, name: 'Microwave Repair', price: 70, rating: 4.6, duration: '1 hour', description: 'Microwave troubleshooting and repair' },
      { id: 405, name: 'Washing Machine Service', price: 90, rating: 4.7, duration: '1-2 hours', description: 'Washing machine repair and maintenance' }
    ]
  },
  {
    id: 5,
    name: 'Pest Control',
    icon: '🐛',
    description: 'Professional pest control solutions',
    serviceCount: 8,
    services: [
      { id: 501, name: 'General Pest Control', price: 100, rating: 4.8, duration: '2 hours', description: 'Complete pest control treatment' },
      { id: 502, name: 'Termite Treatment', price: 150, rating: 4.9, duration: '3 hours', description: 'Professional termite elimination' },
      { id: 503, name: 'Cockroach Control', price: 80, rating: 4.7, duration: '1.5 hours', description: 'Targeted cockroach elimination' },
      { id: 504, name: 'Bed Bug Treatment', price: 120, rating: 4.6, duration: '2-3 hours', description: 'Complete bed bug removal' }
    ]
  },
  {
    id: 6,
    name: 'Home Security',
    icon: '🔒',
    description: 'Security system installation and maintenance',
    serviceCount: 6,
    services: [
      { id: 601, name: 'CCTV Installation', price: 200, rating: 4.9, duration: '3-4 hours', description: 'Professional security camera setup' },
      { id: 602, name: 'Smart Lock Installation', price: 120, rating: 4.8, duration: '1 hour', description: 'Smart door lock installation' },
      { id: 603, name: 'Alarm System Setup', price: 180, rating: 4.7, duration: '2-3 hours', description: 'Home security alarm installation' }
    ]
  }
];

export default function ServiceCategories({ onServiceSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return (
      <section className="service-categories">
        <div className="categories-container">
          <button 
            className="btn btn-secondary" 
            style={{ marginBottom: '30px' }}
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
          
          <h2 className="section-title">{selectedCategory.name}</h2>
          <p className="section-subtitle">{selectedCategory.description}</p>
          
          <div className="services-grid">
            {selectedCategory.services.map(service => (
              <div key={service.id} className="service-card" onClick={() => onServiceSelect(service)}>
                <div className="service-image">
                  {selectedCategory.icon}
                </div>
                <div className="service-content">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                  <div className="service-price">${service.price}</div>
                  <div className="service-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">({service.rating}) • {service.duration}</span>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="service-categories">
      <div className="categories-container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Choose from our wide range of professional services</p>
        
        <div className="categories-grid">
          {serviceCategories.map(category => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <div className="services-count">{category.serviceCount} services available</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
