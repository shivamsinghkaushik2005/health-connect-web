import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">स्वास्थ्य कनेक्ट</h3>
            <p>
              स्वास्थ्य कनेक्ट एक टेलीमेडिसिन सेवा है जो आपको स्वास्थ्य देखभाल से जोड़ती है, चाहे आप कहीं भी हों।
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">{t('quick_links')}</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/">{t('home')}</Link>
              </li>
              <li className="footer-link">
                <Link to="/doctors">{t('doctors')}</Link>
              </li>
              <li className="footer-link">
                <Link to="/health-camps">{t('health_camps')}</Link>
              </li>
              <li className="footer-link">
                <Link to="/womens-health">{t('womens_health')}</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">{t('help_and_support')}</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/faq">अक्सर पूछे जाने वाले प्रश्न</Link>
              </li>
              <li className="footer-link">
                <Link to="/privacy-policy">गोपनीयता नीति</Link>
              </li>
              <li className="footer-link">
                <Link to="/terms">नियम और शर्तें</Link>
              </li>
              <li className="footer-link">
                <Link to="/contact">संपर्क करें</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">{t('contact_us')}</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="tel:+911234567890">फोन: +91 1234 567 890</a>
              </li>
              <li className="footer-link">
                <a href="mailto:info@swasthyaconnect.com">ईमेल: info@swasthyaconnect.com</a>
              </li>
              <li className="footer-link">
                पता: स्वास्थ्य भवन, नई दिल्ली - 110001
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} स्वास्थ्य कनेक्ट। सर्वाधिकार सुरक्षित। | पंजीकरण संख्या: XXXX-XXXXX-XXX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 