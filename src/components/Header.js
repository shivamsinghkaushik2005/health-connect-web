import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const Header = ({ user }) => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">स्वास्थ्य कनेक्ट</span>
          </Link>
          
          <nav className="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">होम</Link>
              </li>
              <li className="nav-item">
                <Link to="/doctors" className="nav-link">डॉक्टर</Link>
              </li>
              <li className="nav-item">
                <Link to="/health-camps" className="nav-link">स्वास्थ्य शिविर</Link>
              </li>
              <li className="nav-item">
                <Link to="/womens-health" className="nav-link">महिला स्वास्थ्य</Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">प्रोफाइल</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-outline logout-btn">
                      लॉगआउट
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/auth" className="btn btn-primary">लॉगिन</Link>
                </li>
              )}
            </ul>
          </nav>
          
          <div className="language-switcher">
            <button
              onClick={() => changeLanguage('hi')}
              className={i18n.language === 'hi' ? 'active' : ''}
            >
              हिंदी
            </button>
            <button
              onClick={() => changeLanguage('bh')}
              className={i18n.language === 'bh' ? 'active' : ''}
            >
              भोजपुरी
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={i18n.language === 'en' ? 'active' : ''}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 