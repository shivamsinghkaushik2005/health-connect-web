import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '../services/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import axios from 'axios';

const HealthCamps = () => {
  const { t } = useTranslation();
  
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  
  // Mock health camps data
  const mockCamps = [
    {
      id: '1',
      name: 'ग्रामीण स्वास्थ्य शिविर',
      location: 'प्राथमिक स्वास्थ्य केंद्र, पटना',
      date: '2023-12-15',
      time: '10:00 AM - 4:00 PM',
      specialists: ['बाल रोग विशेषज्ञ', 'स्त्री रोग विशेषज्ञ'],
      registrationRequired: true,
      availableSlots: 50,
      description: 'इस शिविर में गर्भवती महिलाओं और बच्चों के लिए विशेष जांच की जाएगी।',
      organizer: 'राष्ट्रीय स्वास्थ्य मिशन, बिहार'
    },
    {
      id: '2',
      name: 'नेत्र जांच शिविर',
      location: 'सामुदायिक भवन, नालंदा',
      date: '2023-12-18',
      time: '9:00 AM - 1:00 PM',
      specialists: ['नेत्र रोग विशेषज्ञ'],
      registrationRequired: true,
      availableSlots: 30,
      description: 'आंखों की जांच और मोतियाबिंद की पहचान के लिए विशेष शिविर।',
      organizer: 'लायंस क्लब, पटना'
    },
    {
      id: '3',
      name: 'मधुमेह जागरूकता शिविर',
      location: 'जिला अस्पताल, गया',
      date: '2023-12-20',
      time: '11:00 AM - 5:00 PM',
      specialists: ['जनरल फिजिशियन', 'डायबिटोलॉजिस्ट'],
      registrationRequired: false,
      availableSlots: null,
      description: 'मधुमेह के लक्षण, बचाव और नियंत्रण के बारे में जागरूकता शिविर।',
      organizer: 'बिहार स्वास्थ्य विभाग'
    },
    {
      id: '4',
      name: 'महिला स्वास्थ्य शिविर',
      location: 'आंगनवाड़ी केंद्र, मुजफ्फरपुर',
      date: '2023-12-25',
      time: '10:00 AM - 3:00 PM',
      specialists: ['स्त्री रोग विशेषज्ञ', 'स्तन कैंसर विशेषज्ञ'],
      registrationRequired: true,
      availableSlots: 40,
      description: 'महिलाओं के लिए विशेष स्वास्थ्य जांच, गर्भावस्था परामर्श और स्तन कैंसर जांच।',
      organizer: 'ASHA कार्यकर्ता संघ'
    },
    {
      id: '5',
      name: 'वैक्सीनेशन ड्राइव',
      location: 'विभिन्न गांव, दरभंगा',
      date: '2023-12-28',
      time: '9:00 AM - 6:00 PM',
      specialists: ['टीकाकरण विशेषज्ञ'],
      registrationRequired: false,
      availableSlots: null,
      description: '0-5 वर्ष के बच्चों के लिए नियमित टीकाकरण अभियान।',
      organizer: 'UNICEF और बिहार स्वास्थ्य विभाग'
    }
  ];
  
  // Fetch health camps data
  useEffect(() => {
    const fetchHealthCamps = async () => {
      try {
        setLoading(true);
        
        // In a real app, fetch from Firestore or API
        // const campsCollection = await getDocs(collection(db, 'health-camps'));
        // const campsData = campsCollection.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));
        
        // Using mock data for now
        setCamps(mockCamps);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching health camps:', error);
        setError('स्वास्थ्य शिविरों की जानकारी लोड करने में समस्या हुई।');
        setLoading(false);
      }
    };
    
    fetchHealthCamps();
  }, []);
  
  // Handle camp selection for registration
  const handleSelectCamp = (camp) => {
    setSelectedCamp(camp);
    setRegistrationSuccess(false);
    setRegistrationError(null);
    
    // If user is logged in, get phone number
    if (auth.currentUser) {
      setPhoneNumber(auth.currentUser.phoneNumber || '');
      // In a real app, you would fetch user's name from profile
      setName('');
    }
  };
  
  // Close registration modal
  const handleCloseModal = () => {
    setSelectedCamp(null);
    setPhoneNumber('');
    setName('');
    setRegistrationSuccess(false);
    setRegistrationError(null);
  };
  
  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistrationError(null);
    
    if (!phoneNumber || phoneNumber.length < 10) {
      setRegistrationError('कृपया एक वैध मोबाइल नंबर दर्ज करें।');
      return;
    }
    
    if (!name.trim()) {
      setRegistrationError('कृपया अपना नाम दर्ज करें।');
      return;
    }
    
    try {
      // In a real app, register in Firestore
      // await addDoc(collection(db, 'camp-registrations'), {
      //   campId: selectedCamp.id,
      //   userId: auth.currentUser ? auth.currentUser.uid : null,
      //   name,
      //   phoneNumber,
      //   registrationDate: Timestamp.now(),
      //   status: 'registered'
      // });
      
      // Simulate success for demo
      setTimeout(() => {
        setRegistrationSuccess(true);
      }, 1000);
      
    } catch (error) {
      console.error('Error registering for camp:', error);
      setRegistrationError('पंजीकरण में समस्या हुई। कृपया पुन: प्रयास करें।');
    }
  };
  
  // Group camps by date for calendar view
  const groupCampsByDate = () => {
    const groupedCamps = {};
    
    camps.forEach(camp => {
      const date = camp.date;
      if (!groupedCamps[date]) {
        groupedCamps[date] = [];
      }
      groupedCamps[date].push(camp);
    });
    
    return groupedCamps;
  };
  
  if (loading) {
    return <div className="loading">स्वास्थ्य शिविरों की जानकारी लोड हो रही है...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  const groupedCamps = groupCampsByDate();
  
  return (
    <div className="health-camps-page">
      <div className="container">
        <h1 className="page-title">{t('upcoming_camps')}</h1>
        
        <div className="camps-info">
          <p className="camps-description">
            आने वाले स्वास्थ्य शिविरों की जानकारी यहां दी गई है। आप अपने नजदीकी शिविर में पंजीकरण कर सकते हैं।
            शिविर में उपस्थित होने के लिए पंजीकरण पर्ची और आधार कार्ड साथ लाएं।
          </p>
        </div>
        
        <div className="calendar-view">
          {Object.keys(groupedCamps).sort().map(date => {
            const formattedDate = new Date(date).toLocaleDateString('hi-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            });
            
            return (
              <div key={date} className="date-section">
                <h2 className="date-header">{formattedDate}</h2>
                
                <div className="camps-grid">
                  {groupedCamps[date].map(camp => (
                    <div key={camp.id} className="camp-card">
                      <h3 className="camp-name">{camp.name}</h3>
                      
                      <div className="camp-details">
                        <p>
                          <span className="label">{t('location')}:</span> {camp.location}
                        </p>
                        <p>
                          <span className="label">{t('time')}:</span> {camp.time}
                        </p>
                        <p>
                          <span className="label">{t('specialists')}:</span>
                          <span className="specialists-list">
                            {camp.specialists.join(', ')}
                          </span>
                        </p>
                        <p className="camp-description">{camp.description}</p>
                        <p className="camp-organizer">
                          <span className="label">आयोजक:</span> {camp.organizer}
                        </p>
                      </div>
                      
                      {camp.registrationRequired ? (
                        <div className="camp-registration">
                          <p className="available-slots">
                            <span className="label">उपलब्ध स्लॉट:</span> {camp.availableSlots}
                          </p>
                          <button
                            className="btn btn-primary register-btn"
                            onClick={() => handleSelectCamp(camp)}
                          >
                            {t('register')}
                          </button>
                        </div>
                      ) : (
                        <div className="no-registration">
                          <p>पंजीकरण की आवश्यकता नहीं है। सीधे पहुंचें।</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Registration Modal */}
        {selectedCamp && (
          <div className="registration-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedCamp.name} - पंजीकरण</h2>
                <button className="close-btn" onClick={handleCloseModal}>&times;</button>
              </div>
              
              <div className="modal-body">
                {registrationSuccess ? (
                  <div className="registration-success">
                    <h3>पंजीकरण सफल!</h3>
                    <p>
                      आपका पंजीकरण {selectedCamp.name} के लिए सफलतापूर्वक हो गया है।
                      आपको एक SMS पुष्टिकरण भेजा जाएगा।
                    </p>
                    <p>
                      <strong>शिविर तिथि:</strong> {new Date(selectedCamp.date).toLocaleDateString('hi-IN')}
                    </p>
                    <p>
                      <strong>समय:</strong> {selectedCamp.time}
                    </p>
                    <p>
                      <strong>स्थान:</strong> {selectedCamp.location}
                    </p>
                    <button className="btn btn-primary" onClick={handleCloseModal}>
                      बंद करें
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="registration-form">
                    <p className="camp-info">
                      <strong>तिथि:</strong> {new Date(selectedCamp.date).toLocaleDateString('hi-IN')}
                      <br />
                      <strong>समय:</strong> {selectedCamp.time}
                      <br />
                      <strong>स्थान:</strong> {selectedCamp.location}
                    </p>
                    
                    {registrationError && (
                      <div className="error-message">{registrationError}</div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">पूरा नाम</label>
                      <input
                        type="text"
                        id="name"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">मोबाइल नंबर</label>
                      <div className="phone-input-container">
                        <span className="country-code">+91</span>
                        <input
                          type="tel"
                          id="phone"
                          className="form-input"
                          value={phoneNumber.startsWith('+91') ? phoneNumber.slice(3) : phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          pattern="[0-9]{10}"
                          maxLength="10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                        रद्द करें
                      </button>
                      <button type="submit" className="btn btn-primary">
                        पंजीकरण करें
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCamps; 