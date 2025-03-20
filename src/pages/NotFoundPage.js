import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">पेज नहीं मिला</h2>
          <p className="error-message">
            क्षमा करें, आपके द्वारा खोजा गया पेज मौजूद नहीं है।
          </p>
          <div className="actions">
            <Link to="/" className="btn btn-primary back-home">
              {t('back_to_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 