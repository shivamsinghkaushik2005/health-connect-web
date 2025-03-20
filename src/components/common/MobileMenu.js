import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const MobileMenu = ({ isOpen, onClose, user, onSignOut }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;
  
  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <button className="close-menu-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li>
                <Link to="/" className="mobile-nav-link" onClick={onClose}>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="mobile-nav-link" onClick={onClose}>
                  {t('doctors')}
                </Link>
              </li>
              <li>
                <Link to="/health-camps" className="mobile-nav-link" onClick={onClose}>
                  {t('health_camps')}
                </Link>
              </li>
              <li>
                <Link to="/womens-health" className="mobile-nav-link" onClick={onClose}>
                  {t('womens_health')}
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link to="/dashboard" className="mobile-nav-link" onClick={onClose}>
                      {t('dashboard')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="mobile-nav-link" onClick={onClose}>
                      {t('profile')}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          <div className="mobile-menu-actions">
            <div className="mobile-language-selector">
              <p className="mobile-section-title">{t('select_language')}</p>
              <LanguageSelector />
            </div>
            
            {user ? (
              <button 
                onClick={() => {
                  onSignOut();
                  onClose();
                }} 
                className="btn btn-outline sign-out-btn"
              >
                {t('sign_out')}
              </button>
            ) : (
              <Link to="/auth" className="btn btn-primary sign-in-btn" onClick={onClose}>
                {t('sign_in')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 