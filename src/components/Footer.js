import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t('emergency_numbers')}</h3>
            <ul className="emergency-list">
              <li>
                <span className="emergency-title">आपातकालीन एम्बुलेंस:</span>
                <a href="tel:108">108</a>
              </li>
              <li>
                <span className="emergency-title">महिला हेल्पलाइन:</span>
                <a href="tel:1091">1091</a>
              </li>
              <li>
                <span className="emergency-title">बाल सहायता:</span>
                <a href="tel:1098">1098</a>
              </li>
              <li>
                <span className="emergency-title">प्रधानमंत्री जन आरोग्य योजना:</span>
                <a href="tel:14555">14555</a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>{t('government_schemes')}</h3>
            <ul className="schemes-list">
              <li>
                <a href="https://pmjay.gov.in/" target="_blank" rel="noopener noreferrer">
                  आयुष्मान भारत
                </a>
              </li>
              <li>
                <a href="https://www.nhm.gov.in/" target="_blank" rel="noopener noreferrer">
                  राष्ट्रीय स्वास्थ्य मिशन
                </a>
              </li>
              <li>
                <a href="https://pmsuraksha.in/" target="_blank" rel="noopener noreferrer">
                  प्रधानमंत्री सुरक्षा बीमा योजना
                </a>
              </li>
              <li>
                <a href="https://www.janaushadhi.gov.in/" target="_blank" rel="noopener noreferrer">
                  जन औषधि योजना
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>{t('partners')}</h3>
            <div className="partners-logo">
              <div className="partner-logo">NHM Bihar</div>
              <div className="partner-logo">AIIMS Patna</div>
              <div className="partner-logo">Bihar Health Department</div>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2023 स्वास्थ्य कनेक्ट - ग्रामीण बिहार के लिए टेलीमेडिसिन</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 