import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa'; // Make sure you install 'react-icons'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export default function ExploreOnlineServices() {
  const navigate = useNavigate();
  const [onlineServices, setOnlineServices] = useState([]);


  // State for managing filter, search, and sort options
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('price-asc');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Fetch online services from the backend API
  useEffect(() => {
    const fetchOnlineServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/online-services`); // Fetch data from backend
        setOnlineServices(response.data); // Set the data to state
      } catch (err) {
        console.error('Error fetching online services:', err);
      }
    };

    fetchOnlineServices();
  }, []);


  const handleServiceClick = (id) => {
    navigate(`/online-services/${id}`);
  };

  // Filter services based on search, category, price range, and other filters
  const filteredServices = onlineServices
    .filter(service => {
      return (
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter(service => {
      return selectedCategory === 'All' || service.badge === selectedCategory;
    })
    .filter(service => {
      return service.price >= priceRange[0] && service.price <= priceRange[1];
    })
    .filter(service => {
      return service.rating >= ratingFilter;
    })
    .filter(service => {
      return selectedTags.every(tag => service.tags.includes(tag));
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

  // Handle tag selection
  const handleTagChange = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '20px' }}>
            Explore All Online Services
          </h2>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Discover the wide range of expert services available to you. Choose the best services that fit your needs.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <div style={{ flex: '1', minWidth: '250px', marginRight: '20px' }}>
            <input
              type="text"
              placeholder="Search services..."
              style={{
                padding: '12px 15px',
                width: '40%',
                border: '4px solid #ccc',
                backgroundColor: '#fff',
                color: 'rgba(12, 79, 74, 0.91)  ',
                fontSize: '16px',
                outline: 'none',
                transition: 'box-shadow 0.3s ease',
                borderRadius: '50px',

                boxShadow: '0 2px 6px rgba(18, 9, 9, 0.91)',

              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Filter Icon Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              padding: '12px',
              background: '#bb82dcff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(30, 6, 6, 0.62)',
            }}
          >
            <FaFilter />
          </button>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              right: '0',
              width: '300px',
              height: '100%',
              backgroundColor: '#fff',
              padding: '20px',
              boxShadow: '-5px 0 15px rgba(3, 2, 2, 0.54)',
              zIndex: '1000',
              transition: 'transform 0.3s ease',
              transform: 'translateX(0)',
            }}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                left: '90%',
                background: 'transparent',
                border: 'none',
                fontSize: '25px',
                color: '#333',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Filters</h3>

            {/* Category Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', marginBottom: '8px' }}>Category</label>
              <select
                style={{
                  padding: '12px 15px',
                  width: '100%',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  color: '#333',
                  fontSize: '16px',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Popular">Popular</option>
                <option value="Premium">Premium</option>
                <option value="Tech">Tech</option>
                <option value="Business">Business</option>
                <option value="Creative">Creative</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', marginBottom: '8px' }}>Price Range</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, e.target.value])}
                style={{
                  width: '100%',
                  backgroundColor: '#ddd',
                  borderRadius: '5px',
                  height: '8px',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', marginBottom: '8px' }}>Minimum Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                style={{
                  padding: '12px 15px',
                  width: '100%',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  color: '#333',
                  fontSize: '16px',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>

            {/* Tag Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', marginBottom: '8px' }}>Tags</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Tech', 'Business', 'Creative'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    style={{
                      padding: '6px 12px',
                      background: selectedTags.includes(tag) ? '#007bff' : '#f0f0f0',
                      color: selectedTags.includes(tag) ? '#fff' : '#333',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', marginBottom: '8px' }}>Sort By</label>
              <select
                style={{
                  padding: '12px 15px',
                  width: '100%',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  color: '#333',
                  fontSize: '16px',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="price-asc">Price Low to High</option>
                <option value="price-desc">Price High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        )}
        {/* Service Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filteredServices.map((service) => (
            <div
              key={service._id}
              onClick={() => handleServiceClick(service._id)}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge */}
              {service.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: getBadgeColor(service.badge),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {service.badge}
                </div>
              )}

              {/* Service Icon & Header */}
              <div style={{ marginBottom: '25px' }}>
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(34, 42, 76, 0.3)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '3px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '17px',
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>{service.icon}</span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '8px', lineHeight: '1.3' }}>
                  {service.name}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '0' }}>
                  {service.description}
                </p>
              </div>

              {/* Price and Rating Section */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  padding: '15px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#059669', lineHeight: '1' }}>
                    ${service.price}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{service.duration}</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <span style={{ color: '#fbbf24', fontSize: '16px' }}>⭐</span>
                  <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '14px' }}>
                    {service.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to get badge color
const getBadgeColor = (badge) => {
  switch (badge) {
    case 'Popular':
      return '#ef4444';
    case 'Premium':
      return '#8b5cf6';
    case 'Business':
      return '#059669';
    case 'Tech':
      return '#3b82f6';
    case 'Creative':
      return '#f59e0b';
    default:
      return '#6b7280';
  }
};
