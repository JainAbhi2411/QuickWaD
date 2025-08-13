import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
const apiUrl = import.meta.env.VITE_API_URL;


export default function ExploreAllServices() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the category data based on categoryId
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/service-categories/category/${categoryId}/services`, { withCredentials: true });
        //console.log("response" , response); // Replace with your API endpoint
        setCategory(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load category data');
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  //console.log("category" ,category );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return <section style={{ padding: '40px 20px', textAlign: 'center' }}>Loading...</section>;
  }

  if (error) {
    return (
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{error}</h1>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          ← Back to Home
        </button>
      </section>
    );
  }

  if (!category) {
    return (
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Category not found</h1>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          ← Back to Home
        </button>
      </section>
    );
  }

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <section style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            ← Back to Home
          </button>
          <div
            style={{
              background: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: '500',
            }}
          >
            Home / Services / {category.name}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>{category.icon}</div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '15px',
              color: '#1f2937',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            All {category.name} Services
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 30px auto',
              lineHeight: '1.6',
            }}
          >
            Explore our complete range of {category.name.toLowerCase()} services with detailed features and professional quality
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '20px',
              background: 'white',
              padding: '15px 30px',
              borderRadius: '50px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
            }}
          >
            <span style={{ color: '#6366f1', fontWeight: '600' }}>
              📊 {category.serviceCount} Services Available
            </span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              ⭐ 4.8+ Average Rating
            </span>
            <span style={{ color: '#f59e0b', fontWeight: '600' }}>
              🚀 Same Day Service
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '30px',
            marginBottom: '50px',
          }}
        >
          {category.services.map((service) => (
            <div
              key={service._id}
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                border: '1px solid #f1f5f9',
                transform: 'scale(1)',
              }}
              onClick={() => handleServiceClick(service._id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03) translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
              }}
            >
              {/* Service Image Header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '56px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                ></div>
                <div style={{ position: 'relative', zIndex: 2 }}>{service.image}</div>
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '25px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#059669',
                    zIndex: 3,
                  }}
                >
                  ⭐ {service.rating}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '25px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6366f1',
                    zIndex: 3,
                  }}
                >
                  {service.duration}
                </div>
              </div>

              {/* Service Content */}
              <div style={{ padding: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.3',
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{
                      color: '#6b7280',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Price & Duration */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '25px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '16px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#059669' }}>
                      ${service.price}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                      Starting price
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '16px',
                      fontWeight: '700',
                      boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
                    }}
                  >
                    Book Now
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      marginBottom: '15px',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    ✨ What's Included:
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '14px',
                          padding: '8px 0',
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: 'white',
                            flexShrink: 0,
                            fontWeight: '700',
                          }}
                        >
                          ✓
                        </div>
                        <span
                          style={{
                            color: '#374151',
                            fontWeight: '500',
                            lineHeight: '1.4',
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '24px',
            padding: '40px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>
            Need Help Choosing?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '25px', opacity: 0.9 }}>
            Our experts are here to help you find the perfect service for your needs
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                background: 'white',
                color: '#6366f1',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              📞 Call Expert
            </button>
            <button
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '12px',
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              💬 Chat Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
