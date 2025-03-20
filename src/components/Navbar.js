import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/Navbar.css';

const Navbar = ({ user, auth }) => {
  const { t } = useTranslation();
  const isAdmin = user && (user.email === 'admin@example.com' || localStorage.getItem('userType') === 'admin');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          Health Connect
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">{t('home')}</Link>
        <Link to="/find-doctors" className="nav-link">{t('doctors')}</Link>
        <Link to="/pharmacies" className="nav-link">{t('pharmacies')}</Link>
        <Link to="/labs" className="nav-link">{t('diagnosticLabs')}</Link>
        <Link to="/health-camps" className="nav-link">{t('healthCamps')}</Link>
        <Link to="/womens-health" className="nav-link">{t('womens_health')}</Link>
      </div>
      
      <div className="navbar-right">
        <LanguageSwitcher />
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              {t('dashboard')}
            </Link>
            {isAdmin && (
              <Link to="/admin" className="nav-link admin-link">
                Admin
              </Link>
            )}
            <button 
              onClick={() => auth.signOut()} 
              className="auth-button logout-button"
            >
              {t('logout')}
            </button>
          </>
        ) : (
          <Link to="/auth" className="auth-button">
            {t('login')} / {t('signup')}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 