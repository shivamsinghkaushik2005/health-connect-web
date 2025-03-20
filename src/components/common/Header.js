import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../../services/firebase';
import LanguageSelector from './LanguageSelector';

const Header = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/images/Health_Connect_Logo.jpg'} alt="स्वास्थ्य कनेक्ट" className="logo" />
          </Link>
          <Link to="/" className="site-title">
            स्वास्थ्य कनेक्ट
          </Link>
        </div>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-link">
                {t('home')}
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="nav-link">
                {t('doctors')}
              </Link>
            </li>
            <li>
              <Link to="/health-camps" className="nav-link">
                {t('health_camps')}
              </Link>
            </li>
            <li>
              <Link to="/womens-health" className="nav-link">
                {t('womens_health')}
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <LanguageSelector />
          
          {user ? (
            <div className="user-menu">
              <Link to="/dashboard" className="btn btn-outline btn-sm">
                {t('dashboard')}
              </Link>
              <Link to="/profile" className="btn btn-sm">
                {t('profile')}
              </Link>
              <button 
                onClick={handleSignOut} 
                className="btn btn-outline btn-sm"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary">
              {t('login')}
            </Link>
          )}
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="menu-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 