import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Mock data
  const mockUpcomingAppointments = [
    {
      id: 'apt1',
      doctorName: 'डॉ. अमिता शर्मा',
      specialty: 'स्त्री रोग विशेषज्ञ',
      date: '2023-12-15',
      time: '10:30',
      type: 'वीडियो परामर्श'
    }
  ];
  
  const mockNotifications = [
    {
      id: 'notif1',
      title: 'आपका अगला परामर्श कल है',
      description: 'डॉ. अमिता शर्मा के साथ आपका परामर्श कल सुबह 10:30 बजे है।',
      type: 'appointment',
      read: false,
      date: '2023-12-14'
    },
    {
      id: 'notif2',
      title: 'नया स्वास्थ्य शिविर',
      description: 'आपके क्षेत्र में 20 दिसंबर को एक नया स्वास्थ्य शिविर आयोजित किया जा रहा है।',
      type: 'camp',
      read: true,
      date: '2023-12-10'
    }
  ];
  
  // Health tips
  const healthTips = [
    {
      id: 'tip1',
      title: 'गर्भावस्था के दौरान स्वस्थ आहार',
      description: 'गर्भावस्था के दौरान पौष्टिक आहार लेना महत्वपूर्ण है। फल, सब्जियां, और प्रोटीन युक्त खाद्य पदार्थ शामिल करें।',
      icon: '🍎'
    },
    {
      id: 'tip2',
      title: 'नियमित व्यायाम के फायदे',
      description: 'हल्का व्यायाम आपके शारीरिक और मानसिक स्वास्थ्य को बेहतर बनाने में मदद करता है।',
      icon: '🏃‍♀️'
    },
    {
      id: 'tip3',
      title: 'पर्याप्त नींद का महत्व',
      description: '7-8 घंटे की अच्छी नींद आपके इम्यून सिस्टम को मजबूत बनाती है और तनाव को कम करती है।',
      icon: '😴'
    }
  ];
  
  // Quick access features
  const quickAccessFeatures = [
    {
      id: 'feature1',
      title: 'डॉक्टर से परामर्श',
      description: 'विशेषज्ञ डॉक्टरों से ऑनलाइन परामर्श लें',
      icon: '👩‍⚕️',
      link: '/doctors'
    },
    {
      id: 'feature2',
      title: 'स्वास्थ्य शिविर',
      description: 'आपके क्षेत्र में होने वाले स्वास्थ्य शिविरों की जानकारी',
      icon: '🏥',
      link: '/health-camps'
    },
    {
      id: 'feature3',
      title: 'महिला स्वास्थ्य',
      description: 'गर्भावस्था ट्रैकर और सुरक्षा टिप्स',
      icon: '👩‍🍼',
      link: '/womens-health'
    },
    {
      id: 'feature4',
      title: 'मेरा प्रोफाइल',
      description: 'अपना प्रोफाइल देखें और संपादित करें',
      icon: '👤',
      link: '/profile'
    },
    {
      id: 'feature5',
      title: 'ई-पर्चियाँ',
      description: 'अपनी सभी दवाओं की पर्चियाँ देखें',
      icon: '💊',
      link: '/prescriptions'
    },
    {
      id: 'feature6',
      title: 'वीडियो परामर्श',
      description: 'अपने डॉक्टर से वीडियो कॉल द्वारा बात करें',
      icon: '📹',
      link: '/video-consultation'
    }
  ];
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        // const currentUser = auth.currentUser;
        // if (!currentUser) {
        //   navigate('/auth');
        //   return;
        // }
        
        // In a real app, we would fetch from Firestore
        // const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        // if (userDoc.exists()) {
        //   setUserName(userDoc.data().name);
        // }
        
        // For demo, use mock data
        setUserName('सरिता देवी');
        setUpcomingAppointments(mockUpcomingAppointments);
        setNotifications(mockNotifications);
        
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('डेटा लोड करने में समस्या हुई। कृपया पुन: प्रयास करें।');
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('लॉगआउट करने में समस्या हुई। कृपया पुन: प्रयास करें।');
    }
  };
  
  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="greeting">नमस्ते, {userName}! 🙏</h1>
          <p className="welcome-message">स्वास्थ्य कनेक्ट में आपका स्वागत है</p>
        </div>
        
        {/* Quick Access Section */}
        <section className="dashboard-section">
          <h2 className="section-title">{t('quick_access')}</h2>
          <div className="features-grid">
            {quickAccessFeatures.map(feature => (
              <Link to={feature.link} key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Upcoming Appointments Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">{t('upcoming_appointments')}</h2>
            <Link to="/doctors" className="btn btn-outline btn-sm">
              नया परामर्श
            </Link>
          </div>
          
          <div className="appointments-container">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <span className="appointment-type">{appointment.type}</span>
                    <span className="appointment-date">
                      {new Date(appointment.date).toLocaleDateString('hi-IN')} | {appointment.time}
                    </span>
                  </div>
                  <div className="appointment-doctor">
                    <div className="doctor-avatar">
                      {appointment.doctorName.charAt(0)}
                    </div>
                    <div className="doctor-info">
                      <h3 className="doctor-name">{appointment.doctorName}</h3>
                      <p className="doctor-specialty">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="appointment-actions">
                    <button className="btn btn-primary join-btn">
                      परामर्श शुरू करें
                    </button>
                    <button className="btn btn-outline reschedule-btn">
                      रिशेड्यूल
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                कोई आगामी परामर्श नहीं है। नया परामर्श शेड्यूल करने के लिए 'नया परामर्श' पर क्लिक करें।
              </div>
            )}
          </div>
        </section>
        
        {/* Health Tips Section */}
        <section className="dashboard-section">
          <h2 className="section-title">{t('health_tips')}</h2>
          <div className="health-tips-slider">
            {healthTips.map(tip => (
              <div key={tip.id} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Notifications Section */}
        <section className="dashboard-section">
          <h2 className="section-title">{t('notifications')}</h2>
          <div className="notifications-container">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-card ${!notification.read ? 'unread' : ''}`}
                >
                  <div className="notification-header">
                    <h3 className="notification-title">{notification.title}</h3>
                    <span className="notification-date">
                      {new Date(notification.date).toLocaleDateString('hi-IN')}
                    </span>
                  </div>
                  <p className="notification-description">{notification.description}</p>
                </div>
              ))
            ) : (
              <div className="no-notifications">
                कोई नई सूचना नहीं है।
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 