import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { auth, db } from '../services/firebase';

const LabDashboard = () => {
  const { t } = useTranslation();
  const [testRequests, setTestRequests] = useState([]);
  const [testReports, setTestReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchData(authUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async (userId) => {
    try {
      // For demonstration, using mock data
      // In a real app, fetch from Firestore
      const mockTestRequests = [
        {
          id: '1',
          patientName: 'राधा सिंह',
          patientAge: 35,
          patientGender: 'महिला',
          doctorName: 'डॉ. सुनीता वर्मा',
          date: '2023-12-23',
          status: 'new',
          tests: ['कम्पलीट ब्लड काउंट (CBC)', 'थायरॉइड प्रोफाइल', 'लिपिड प्रोफाइल']
        },
        {
          id: '2',
          patientName: 'राम प्रसाद',
          patientAge: 52,
          patientGender: 'पुरुष',
          doctorName: 'डॉ. अमित खन्ना',
          date: '2023-12-23',
          status: 'collected',
          tests: ['रक्त शर्करा (फास्टिंग)', 'किडनी फंक्शन टेस्ट']
        },
        {
          id: '3',
          patientName: 'सीमा वर्मा',
          patientAge: 29,
          patientGender: 'महिला',
          doctorName: 'डॉ. अनिल गुप्ता',
          date: '2023-12-22',
          status: 'processing',
          tests: ['प्रेगनेंसी टेस्ट', 'जनरल डायग्नोसिस']
        }
      ];

      const mockTestReports = [
        {
          id: '1',
          patientName: 'विकास यादव',
          date: '2023-12-22',
          tests: ['रक्त शर्करा (पोस्ट प्रान्डियल)', 'HbA1c'],
          status: 'completed'
        },
        {
          id: '2',
          patientName: 'अंजलि शर्मा',
          date: '2023-12-21',
          tests: ['कम्पलीट ब्लड काउंट (CBC)', 'थायरॉइड प्रोफाइल'],
          status: 'completed'
        }
      ];

      setTestRequests(mockTestRequests);
      setTestReports(mockTestReports);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>लोड हो रहा है...</p>
      </div>
    );
  }

  // Get the status label in Hindi
  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'नया';
      case 'collected':
        return 'सैंपल कलेक्टेड';
      case 'processing':
        return 'प्रोसेसिंग';
      case 'completed':
        return 'पूर्ण';
      case 'delivered':
        return 'डिलीवर्ड';
      default:
        return status;
    }
  };

  return (
    <div className="lab-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="greeting">नमस्ते, डायग्नोसिस लैब!</h1>
          <p className="welcome-message">टेस्ट रिक्वेस्ट और रिपोर्ट्स प्रबंधित करें।</p>
        </div>

        {/* Quick Actions Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">त्वरित कार्य</h2>
          </div>
          <div className="features-grid">
            <Link to="/test-requests" className="feature-card">
              <div className="feature-icon">🩸</div>
              <h3 className="feature-title">टेस्ट रिक्वेस्ट</h3>
              <p className="feature-description">नए टेस्ट रिक्वेस्ट देखें और प्रबंधित करें</p>
            </Link>
            
            <Link to="/sample-collection" className="feature-card">
              <div className="feature-icon">💉</div>
              <h3 className="feature-title">सैंपल कलेक्शन</h3>
              <p className="feature-description">सैंपल कलेक्शन शेड्यूल करें और प्रबंधित करें</p>
            </Link>
            
            <Link to="/reports" className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">रिपोर्ट्स</h3>
              <p className="feature-description">टेस्ट रिपोर्ट्स बनाएँ और भेजें</p>
            </Link>
            
            <Link to="/test-catalog" className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">टेस्ट कैटलॉग</h3>
              <p className="feature-description">उपलब्ध टेस्ट और प्रोफाइल्स प्रबंधित करें</p>
            </Link>
          </div>
        </div>

        {/* New Test Requests Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">नए टेस्ट रिक्वेस्ट</h2>
            <Link to="/test-requests" className="btn btn-outline btn-sm">सभी देखें →</Link>
          </div>
          
          <div className="test-requests-container">
            {testRequests.length > 0 ? (
              testRequests.map((request) => (
                <div key={request.id} className={`test-request-card ${request.status}`}>
                  <div className="request-header">
                    <span className={`request-status ${request.status}`}>
                      {getStatusLabel(request.status)}
                    </span>
                    <span className="request-date">{request.date}</span>
                  </div>
                  
                  <div className="request-details">
                    <div className="patient-info">
                      <h3 className="patient-name">{request.patientName}</h3>
                      <p className="patient-demographics">
                        {request.patientAge} वर्ष, {request.patientGender}
                      </p>
                      <p className="doctor-name">डॉक्टर: {request.doctorName}</p>
                    </div>
                    
                    <div className="test-list">
                      <h4>टेस्ट:</h4>
                      <ul>
                        {request.tests.map((test, index) => (
                          <li key={index}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="request-actions">
                    {request.status === 'new' && (
                      <button className="btn btn-primary btn-sm">सैंपल कलेक्शन शेड्यूल करें</button>
                    )}
                    {request.status === 'collected' && (
                      <button className="btn btn-primary btn-sm">प्रोसेसिंग शुरू करें</button>
                    )}
                    {request.status === 'processing' && (
                      <button className="btn btn-primary btn-sm">रिपोर्ट अपलोड करें</button>
                    )}
                    <button className="btn btn-outline btn-sm">विवरण देखें</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-requests">
                <p>कोई नया टेस्ट रिक्वेस्ट नहीं है</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Reports Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">पूर्ण रिपोर्ट्स</h2>
            <Link to="/reports" className="btn btn-outline btn-sm">सभी रिपोर्ट्स देखें →</Link>
          </div>
          
          <div className="reports-container">
            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>रोगी का नाम</th>
                    <th>तारीख</th>
                    <th>टेस्ट</th>
                    <th>स्थिति</th>
                    <th>कार्य</th>
                  </tr>
                </thead>
                <tbody>
                  {testReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.patientName}</td>
                      <td>{report.date}</td>
                      <td>{report.tests.join(', ')}</td>
                      <td>{getStatusLabel(report.status)}</td>
                      <td className="report-actions">
                        <button className="btn btn-sm">रिपोर्ट देखें</button>
                        <button className="btn btn-outline btn-sm">भेजें</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard; 