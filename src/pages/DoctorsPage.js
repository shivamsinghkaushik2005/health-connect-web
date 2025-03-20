import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorsPage = () => {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [specialty, setSpecialty] = useState('');
  const [language, setLanguage] = useState('');
  const [fees, setFees] = useState('');
  
  // Specialties and languages for filter options
  const specialties = [
    'सभी',
    'बाल रोग विशेषज्ञ',
    'स्त्री रोग विशेषज्ञ',
    'हृदय रोग विशेषज्ञ',
    'सामान्य चिकित्सक',
    'त्वचा रोग विशेषज्ञ',
    'न्यूरोलॉजिस्ट'
  ];
  
  const languages = [
    'सभी',
    'हिंदी',
    'भोजपुरी',
    'अंग्रेजी'
  ];
  
  const feeRanges = [
    'सभी',
    '₹0-300',
    '₹300-500',
    '₹500-1000'
  ];
  
  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // In a real app, this would call the backend API
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctors`);
        // For now, we'll use dummy data
        
        // Simulate API call
        setTimeout(() => {
          const dummyDoctors = [
            {
              id: '1',
              name: 'डॉ. अमिता शर्मा',
              specialty: 'स्त्री रोग विशेषज्ञ',
              experience: '15 वर्ष',
              languages: ['हिंदी', 'भोजपुरी', 'अंग्रेजी'],
              fees: 500,
              rating: 4.8,
              available: true,
              verified: true,
              image: 'doctor-female.jpg'
            },
            {
              id: '2',
              name: 'डॉ. राजेश कुमार',
              specialty: 'बाल रोग विशेषज्ञ',
              experience: '10 वर्ष',
              languages: ['हिंदी', 'अंग्रेजी'],
              fees: 400,
              rating: 4.5,
              available: true,
              verified: true,
              image: 'doctor-male.jpg'
            },
            {
              id: '3',
              name: 'डॉ. संजीव मिश्रा',
              specialty: 'हृदय रोग विशेषज्ञ',
              experience: '20 वर्ष',
              languages: ['हिंदी', 'अंग्रेजी'],
              fees: 800,
              rating: 4.9,
              available: false,
              verified: true,
              image: 'doctor-male.jpg'
            },
            {
              id: '4',
              name: 'डॉ. प्रिया गुप्ता',
              specialty: 'सामान्य चिकित्सक',
              experience: '8 वर्ष',
              languages: ['हिंदी', 'भोजपुरी'],
              fees: 300,
              rating: 4.3,
              available: true,
              verified: true,
              image: 'doctor-female.jpg'
            }
          ];
          
          setDoctors(dummyDoctors);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        setError('डॉक्टरों की जानकारी लोड करने में समस्या हुई।');
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);
  
  // Filter doctors based on selected filters
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by specialty
    if (specialty && specialty !== 'सभी' && doctor.specialty !== specialty) {
      return false;
    }
    
    // Filter by language
    if (language && language !== 'सभी' && !doctor.languages.includes(language)) {
      return false;
    }
    
    // Filter by fees
    if (fees) {
      if (fees === '₹0-300' && doctor.fees > 300) return false;
      if (fees === '₹300-500' && (doctor.fees < 300 || doctor.fees > 500)) return false;
      if (fees === '₹500-1000' && (doctor.fees < 500 || doctor.fees > 1000)) return false;
    }
    
    return true;
  });
  
  return (
    <div className="doctors-page">
      <div className="container">
        <h1 className="page-title">{t('search_doctors')}</h1>
        
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="specialty">{t('specialty')}</label>
            <select 
              id="specialty" 
              value={specialty} 
              onChange={(e) => setSpecialty(e.target.value)}
              className="filter-select"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="language">{t('language')}</label>
            <select 
              id="language" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="filter-select"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="fees">{t('fees')}</label>
            <select 
              id="fees" 
              value={fees} 
              onChange={(e) => setFees(e.target.value)}
              className="filter-select"
            >
              {feeRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Doctors Listing */}
        {loading ? (
          <div className="loading">डॉक्टरों की जानकारी लोड हो रही है...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-image-container">
                    {/* This would be replaced with an actual image */}
                    <div className="doctor-image-placeholder">
                      {doctor.image}
                    </div>
                  </div>
                  
                  <div className="doctor-info">
                    <div className="doctor-header">
                      <h3 className="doctor-name">{doctor.name}</h3>
                      {doctor.verified && (
                        <span className="verified-badge">✓ {t('verified')}</span>
                      )}
                    </div>
                    
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p className="doctor-experience">
                      <span className="label">{t('experience')}:</span> {doctor.experience}
                    </p>
                    
                    <div className="doctor-languages">
                      <span className="label">{t('language')}:</span>
                      {doctor.languages.map((lang, index) => (
                        <span key={index} className="language-tag">
                          {lang}
                        </span>
                      ))}
                    </div>
                    
                    <div className="doctor-rating">
                      {'⭐'.repeat(Math.floor(doctor.rating))}
                      <span className="rating-number">({doctor.rating})</span>
                    </div>
                    
                    <div className="doctor-fees">
                      <span className="label">{t('fees')}:</span> ₹{doctor.fees}
                    </div>
                    
                    <div className="doctor-availability">
                      {doctor.available ? (
                        <span className="available">अभी उपलब्ध</span>
                      ) : (
                        <span className="unavailable">अभी उपलब्ध नहीं</span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/consultation/${doctor.id}`} 
                      className={`btn ${doctor.available ? 'btn-primary' : 'btn-disabled'}`}
                      disabled={!doctor.available}
                    >
                      {t('book_now')}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                कोई डॉक्टर नहीं मिला। कृपया अपने फिल्टर बदलें।
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage; 