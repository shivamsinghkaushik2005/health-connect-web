import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/HomePage.css';

const HomePage = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Animation after component mount
  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Features with icons and descriptions
  const features = [
    {
      icon: '👨‍⚕️',
      title: t('findDoctors'),
      description: t('findDoctorsDescription'),
      link: '/find-doctors',
      color: '#4285F4'
    },
    {
      icon: '📱',
      title: t('videoConsultation'),
      description: t('videoConsultationDescription'),
      link: '/video-consultation',
      color: '#EA4335'
    },
    {
      icon: '💊',
      title: t('prescriptions'),
      description: t('prescriptionsDescription'),
      link: '/prescriptions',
      color: '#FBBC05'
    },
    {
      icon: '🏥',
      title: t('healthCamps'),
      description: t('healthCampsDescription'),
      link: '/health-camps',
      color: '#34A853'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      role: t('patient'),
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: t('testimonial1')
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: t('patient'),
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: t('testimonial2')
    },
    {
      id: 3,
      name: 'Dr. Anand Kumar',
      role: t('doctor'),
      image: 'https://randomuser.me/api/portraits/men/64.jpg',
      text: t('testimonial3')
    }
  ];

  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('welcome')}</h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
          <div className="hero-buttons">
            <Link to="/auth" className="primary-button">
              {t('getStarted')}
            </Link>
            <Link to="/find-doctors" className="secondary-button">
              {t('findDoctors')}
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/images/hero-doctor.png" 
            alt="Doctor with patient" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://img.freepik.com/free-photo/medical-banner-with-doctor-patient_23-2149611197.jpg';
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">{t('ourFeatures')}</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${activeFeature === index ? 'active' : ''}`}
              onClick={() => setActiveFeature(index)}
              style={{borderColor: feature.color}}
            >
              <div className="feature-icon" style={{backgroundColor: feature.color}}>
                <span>{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <Link to={feature.link} className="feature-link" style={{color: feature.color}}>
                {t('learnMore')} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section with Animation */}
      <section className="services-section">
        <div className="services-content">
          <h2 className="section-title">{t('ourServices')}</h2>
          <p className="section-description">{t('servicesDescription')}</p>
          <ul className="services-list">
            <li className="service-item">
              <span className="service-icon">✓</span>
              {t('service1')}
            </li>
            <li className="service-item">
              <span className="service-icon">✓</span>
              {t('service2')}
            </li>
            <li className="service-item">
              <span className="service-icon">✓</span>
              {t('service3')}
            </li>
            <li className="service-item">
              <span className="service-icon">✓</span>
              {t('service4')}
            </li>
          </ul>
          <Link to="/auth" className="primary-button">
            {t('signupNow')}
          </Link>
        </div>
        <div className="services-image">
          <div className="image-container">
            <img 
              src="/images/services.png" 
              alt="Healthcare services" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://img.freepik.com/free-vector/telemedicine-abstract-concept-vector-illustration-telemedicine-service-medical-consultation-online-doctor-appointment-laboratory-test-laboratory-test-request-e-prescription-abstract-metaphor_335657-6139.jpg';
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">{t('testimonials')}</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-rating">
                  ★★★★★
                </div>
              </div>
              <div className="testimonial-footer">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="testimonial-image" 
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">100,000+</span>
          <span className="stat-label">{t('users')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5,000+</span>
          <span className="stat-label">{t('doctors')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50,000+</span>
          <span className="stat-label">{t('consultations')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">4.8</span>
          <span className="stat-label">{t('rating')}</span>
        </div>
      </section>

      {/* Download App Section */}
      <section className="app-download-section">
        <div className="app-content">
          <h2 className="app-title">{t('downloadApp')}</h2>
          <p className="app-description">{t('downloadAppDescription')}</p>
          <div className="app-store-buttons">
            <a href="#" className="app-store-button">
              <img 
                src="/images/google-play.png" 
                alt="Google Play" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg';
                }}
              />
            </a>
            <a href="#" className="app-store-button">
              <img 
                src="/images/app-store.png" 
                alt="App Store" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg';
                }}
              />
            </a>
          </div>
        </div>
        <div className="app-image">
          <img 
            src="/images/app-mockup.png" 
            alt="Mobile app" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://img.freepik.com/free-vector/medical-app-concept-illustration_114360-3977.jpg';
            }}
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{t('healthConnect')}</h3>
            <p className="footer-description">{t('footerDescription')}</p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <span>📱</span>
              </a>
              <a href="#" className="social-icon">
                <span>💬</span>
              </a>
              <a href="#" className="social-icon">
                <span>📧</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">{t('quickLinks')}</h3>
            <ul className="footer-links">
              <li><Link to="/find-doctors">{t('findDoctors')}</Link></li>
              <li><Link to="/health-camps">{t('healthCamps')}</Link></li>
              <li><Link to="/womens-health">{t('womens_health')}</Link></li>
              <li><Link to="/auth">{t('login')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">{t('contactUs')}</h3>
            <address className="contact-info">
              <p>📍 123 Health Street, Medical District</p>
              <p>📞 +91 1234567890</p>
              <p>✉️ support@healthconnect.com</p>
            </address>
          </div>
        </div>
        <div className="copyright">
          &copy; 2023 Health Connect. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 