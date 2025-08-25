
import { useEffect } from 'react';

export default function AboutUs() {

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
  return (
    <section style={{ fontFamily: 'sans-serif' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px' }}>
          About QuickWad
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Revolutionizing how you book everyday services — fast, professional, and at your fingertips.
        </p>
      </div>

      {/* Content Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 20px',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* Image */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO51rBWvtOWDy6QWcwul4jnRwiPN_I5Lk9Q3Dz2L5d15peNZsFXeHcd47WFclQthNDrxA&usqp=CAU"
            alt="Service team"
            style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* Text Content */}
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>
            Who We Are
          </h2>
          <p style={{ fontSize: '17px', color: '#4b5563', lineHeight: '1.8', marginBottom: '25px' }}>
            At <strong>QuickWad</strong>, we believe every home deserves professional care. From premium cleaning and appliance repairs to beauty and wellness services, our goal is to bring expertise to your doorstep.
          </p>
          <p style={{ fontSize: '17px', color: '#4b5563', lineHeight: '1.8' }}>
            Trusted by thousands, we focus on safety, convenience, and quality. Our skilled partners are trained and verified to give you peace of mind — always.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ background: '#f3f4f6', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#111827', marginBottom: '25px' }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8' }}>
            To make everyday services accessible, affordable, and reliable — all through the power of technology. We’re building a trusted ecosystem where users and service professionals thrive together.
          </p>
        </div>
      </div>
    </section>
  );
}
