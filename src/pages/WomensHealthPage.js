import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '../services/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const WomensHealthPage = () => {
  const { t } = useTranslation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pregnancy');
  const [pregnancyData, setPregnancyData] = useState(null);
  const [lmpDate, setLmpDate] = useState('');
  const [weeksPassed, setWeeksPassed] = useState(0);
  
  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      if (auth.currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    
    checkLoginStatus();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchPregnancyData();
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Mock pregnancy data
  const mockPregnancyData = {
    lmpDate: '2023-08-15',
    dueDate: '2024-05-22',
    nextCheckupDate: '2023-12-20',
    nextCheckupDetails: 'डॉ. अमिता शर्मा के साथ अल्ट्रासाउंड अपॉइंटमेंट',
    currentWeek: 16,
    weightGain: '4.2 किलोग्राम',
    notes: 'महिला स्वास्थ्य शिविर में भाग लेने के लिए पंजीकरण करें'
  };
  
  // Fetch pregnancy data
  const fetchPregnancyData = async () => {
    try {
      setLoading(true);
      
      // In a real app, fetch from Firestore
      // const userId = auth.currentUser.uid;
      // const pregnancyDoc = await getDoc(doc(db, 'pregnancy-trackers', userId));
      // if (pregnancyDoc.exists()) {
      //   setPregnancyData(pregnancyDoc.data());
      // }
      
      // Using mock data for now
      setPregnancyData(mockPregnancyData);
      if (mockPregnancyData.lmpDate) {
        setLmpDate(mockPregnancyData.lmpDate);
        calculateWeeks(mockPregnancyData.lmpDate);
      }
      
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching pregnancy data:', error);
      setError('गर्भावस्था की जानकारी लोड करने में समस्या हुई।');
      setLoading(false);
    }
  };
  
  // Calculate pregnancy weeks
  const calculateWeeks = (lmpDateString) => {
    if (!lmpDateString) return;
    
    const lmpDate = new Date(lmpDateString);
    const today = new Date();
    
    // Calculate difference in milliseconds
    const differenceMs = today - lmpDate;
    
    // Convert to weeks
    const weeks = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 7));
    setWeeksPassed(weeks);
  };
  
  // Handle LMP date change
  const handleLmpDateChange = (e) => {
    const newDate = e.target.value;
    setLmpDate(newDate);
    calculateWeeks(newDate);
  };
  
  // Save pregnancy data
  const handleSavePregnancyData = async () => {
    if (!lmpDate) {
      setError('कृपया अंतिम मासिक धर्म की तारीख दर्ज करें।');
      return;
    }
    
    try {
      setLoading(true);
      
      // Calculate due date (40 weeks from LMP)
      const lmpDateObj = new Date(lmpDate);
      const dueDate = new Date(lmpDateObj);
      dueDate.setDate(dueDate.getDate() + 280); // 40 weeks * 7 days
      
      // Calculate next checkup (4 weeks from now)
      const nextCheckup = new Date();
      nextCheckup.setDate(nextCheckup.getDate() + 28);
      
      const updatedData = {
        lmpDate,
        dueDate: dueDate.toISOString().split('T')[0],
        nextCheckupDate: nextCheckup.toISOString().split('T')[0],
        nextCheckupDetails: 'नियमित जांच - डॉ. अमिता शर्मा',
        currentWeek: weeksPassed,
        updatedAt: new Date().toISOString()
      };
      
      // In a real app, save to Firestore
      // const userId = auth.currentUser.uid;
      // await setDoc(doc(db, 'pregnancy-trackers', userId), updatedData, { merge: true });
      
      // Update local state
      setPregnancyData({
        ...pregnancyData,
        ...updatedData
      });
      
      setLoading(false);
      
    } catch (error) {
      console.error('Error saving pregnancy data:', error);
      setError('गर्भावस्था की जानकारी सहेजने में समस्या हुई।');
      setLoading(false);
    }
  };
  
  const pregnancyTips = {
    first: [ // First trimester (weeks 1-12)
      'प्रतिदिन फोलिक एसिड सप्लीमेंट लें',
      'प्रतिदिन 8-10 घंटे की नींद लें',
      'हर 2-3 घंटे में थोड़ा-थोड़ा खाएं',
      'सुबह की उल्टी के लिए, बिस्तर से उठने से पहले कुछ नमकीन बिस्किट खाएं',
      'कच्चा मांस, अंडे, और अनपास्चुराइज्ड दूध से बचें',
      'धूम्रपान और शराब से पूरी तरह बचें',
      'डॉक्टर द्वारा सलाह न दी गई दवाइयां न लें'
    ],
    second: [ // Second trimester (weeks 13-26)
      'प्रतिदिन कैल्शियम और आयरन युक्त आहार लें',
      'हल्का योग या प्रेगनेंसी व्यायाम करें',
      'पेट और त्वचा पर मॉइस्चराइजर लगाएं',
      'बच्चे की हलचल नोट करें',
      'पीठ के बल न सोएं',
      'पर्याप्त प्रोटीन लें - दाल, दूध, पनीर, टोफू',
      'रेशेदार खाद्य पदार्थ खाएं - कब्ज से बचने के लिए'
    ],
    third: [ // Third trimester (weeks 27-40)
      'हल्की शारीरिक गतिविधि जारी रखें',
      'तैयारियाँ शुरू करें - कपड़े, पालना, अस्पताल का बैग',
      'रोजाना 8-12 गिलास पानी पिएं',
      'जंक फूड से बचें',
      'नियमित ब्रैक्सटन हिक्स संकुचन नोट करें',
      'लेबर के संकेतों के प्रति सतर्क रहें',
      'अतिरिक्त तकिए का उपयोग करके आरामदायक स्थिति में सोएं'
    ]
  };
  
  // Get current trimester tips
  const getCurrentTrimesterTips = () => {
    const week = weeksPassed || (pregnancyData?.currentWeek || 0);
    
    if (week < 13) {
      return pregnancyTips.first;
    } else if (week < 27) {
      return pregnancyTips.second;
    } else {
      return pregnancyTips.third;
    }
  };
  
  // Safety resources
  const safetyResources = [
    {
      title: 'महिला हेल्पलाइन (राष्ट्रीय)',
      number: '1091',
      description: '24x7 आपातकालीन सहायता और परामर्श'
    },
    {
      title: 'बिहार महिला हेल्पलाइन',
      number: '9304465780',
      description: 'बिहार राज्य में महिलाओं के लिए सहायता'
    },
    {
      title: 'एकीकृत बाल विकास सेवा',
      number: '1800-11-8888',
      description: 'गर्भवती महिलाओं और बच्चों के लिए सेवाएँ'
    },
    {
      title: 'पुलिस आपातकालीन नंबर',
      number: '100',
      description: 'आपातकालीन स्थिति में'
    }
  ];
  
  // Safety tips
  const safetyTips = [
    'अपने परिवार और दोस्तों को अपने आने-जाने की जानकारी दें',
    'हमेशा अपना मोबाइल फोन चार्ज करके रखें और आपातकालीन नंबर सेव करें',
    'अपने स्वास्थ्य को प्राथमिकता दें और किसी भी अनुचित दबाव को न स्वीकारें',
    'शारीरिक, मानसिक या भावनात्मक दुर्व्यवहार के किसी भी संकेत की रिपोर्ट करें',
    'आंगनवाड़ी कार्यकर्ता या ASHA कार्यकर्ता से नियमित संपर्क रखें',
    'अपने क्षेत्र के स्वास्थ्य केंद्र का पता और फोन नंबर पता करें',
    'अस्पताल जाने के लिए आपातकालीन परिवहन की व्यवस्था पहले से करें'
  ];
  
  if (loading && !pregnancyData) {
    return <div className="loading">जानकारी लोड हो रही है...</div>;
  }
  
  return (
    <div className="womens-health-page">
      <div className="container">
        <h1 className="page-title">महिला स्वास्थ्य</h1>
        
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'pregnancy' ? 'active' : ''}`}
            onClick={() => setActiveTab('pregnancy')}
          >
            गर्भावस्था ट्रैकर
          </button>
          <button 
            className={`tab-btn ${activeTab === 'safety' ? 'active' : ''}`}
            onClick={() => setActiveTab('safety')}
          >
            महिला सुरक्षा
          </button>
        </div>
        
        {activeTab === 'pregnancy' && (
          <div className="pregnancy-tracker-section">
            {isLoggedIn ? (
              <>
                <div className="tracker-header">
                  <h2>{t('pregnancy_tracker')}</h2>
                  {error && <div className="error-message">{error}</div>}
                </div>
                
                <div className="pregnancy-form">
                  <div className="form-group">
                    <label htmlFor="lmp-date" className="form-label">अंतिम मासिक धर्म की तारीख (LMP)</label>
                    <input
                      type="date"
                      id="lmp-date"
                      className="form-input"
                      value={lmpDate}
                      onChange={handleLmpDateChange}
                    />
                    <button 
                      className="btn btn-primary save-btn"
                      onClick={handleSavePregnancyData}
                    >
                      सेव करें
                    </button>
                  </div>
                </div>
                
                {pregnancyData && (
                  <div className="pregnancy-details">
                    <div className="pregnancy-stats">
                      <div className="stat-item">
                        <span className="stat-label">वर्तमान सप्ताह:</span>
                        <span className="stat-value">{weeksPassed || pregnancyData.currentWeek}</span>
                      </div>
                      
                      <div className="stat-item">
                        <span className="stat-label">अनुमानित डिलीवरी तिथि:</span>
                        <span className="stat-value">
                          {new Date(pregnancyData.dueDate).toLocaleDateString('hi-IN')}
                        </span>
                      </div>
                      
                      <div className="stat-item">
                        <span className="stat-label">{t('next_checkup')}:</span>
                        <span className="stat-value">
                          {new Date(pregnancyData.nextCheckupDate).toLocaleDateString('hi-IN')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="next-checkup-details">
                      <h3>अगली जांच विवरण</h3>
                      <p>{pregnancyData.nextCheckupDetails}</p>
                    </div>
                    
                    <div className="pregnancy-notes">
                      {pregnancyData.notes && (
                        <>
                          <h3>नोट्स</h3>
                          <p>{pregnancyData.notes}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="nutrition-tips">
                  <h3>{t('nutrition_tips')}</h3>
                  <div className="tips-audio-player">
                    <p>पोषण सलाह (भोजपुरी में ऑडियो)</p>
                    <audio controls>
                      <source src="/nutrition-tips-bhojpuri.mp3" type="audio/mpeg" />
                      आपका ब्राउज़र ऑडियो प्लेबैक का समर्थन नहीं करता है।
                    </audio>
                  </div>
                  
                  <h4>त्रैमासिक के अनुसार पोषण टिप्स</h4>
                  <ul className="trimester-tips">
                    {getCurrentTrimesterTips().map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="login-prompt">
                <p>गर्भावस्था ट्रैकर का उपयोग करने के लिए कृपया लॉगिन करें।</p>
                <a href="/auth" className="btn btn-primary">लॉगिन करें</a>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'safety' && (
          <div className="safety-section">
            <h2>{t('safety_tips')}</h2>
            
            <div className="helplines">
              <h3>{t('helpline')}</h3>
              <div className="helpline-cards">
                {safetyResources.map((resource, index) => (
                  <div key={index} className="helpline-card">
                    <h4>{resource.title}</h4>
                    <a href={`tel:${resource.number}`} className="helpline-number">
                      {resource.number}
                    </a>
                    <p>{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="safety-tips-list">
              <h3>सुरक्षा संबंधी सलाह</h3>
              <ul>
                {safetyTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="women-rights">
              <h3>महिलाओं के अधिकार</h3>
              <p>हर महिला को सम्मान, स्वास्थ्य देखभाल और सुरक्षा का अधिकार है।</p>
              <p>
                यदि आप किसी समस्या का सामना कर रही हैं, तो इस पेज पर दिए गए 
                किसी भी हेल्पलाइन नंबर पर कॉल करें। आपकी जानकारी गोपनीय रखी जाएगी।
              </p>
              <p>
                आंगनवाड़ी कार्यकर्ता या ASHA कार्यकर्ता भी आपकी मदद कर सकते हैं।
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomensHealthPage; 